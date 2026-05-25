import Community from "../models/community.models";
import Event from "../models/event.models";
import Post from "../models/post.models";
import User from "../models/user.models";
import { onBoardingReqBodyType } from "../types/onBoardingReqBody.types";
import { getVal, setValKey } from "../utils/redis.utils";

export const getCurrentUser = async (
  firebaseUid: string,
  provider: "google" | "email",
) => {
  const cacheKey = `user:${firebaseUid}:${provider}`;

  const cached = await getVal(cacheKey);

  if (cached) {
    return {
      user: JSON.parse(cached),
      source: "redis",
    };
  }

  const user = await User.findOne({
    firebaseUid,
  })
    .populate("myCommunities")
    .lean();

  if (!user) {
    return null;
  }

  await setValKey(cacheKey, JSON.stringify(user), 3600);

  return {
    user,
    source: "db",
  };
};

export const onBoardingHelper = async (
  payload: onBoardingReqBodyType,
  firebaseUid: string,
  provider: "google" | "email",
) => {
  try {
    if (!payload || !firebaseUid) {
      throw new Error("inputs not provided");
    }
    const cacheKey = `user:${firebaseUid}:${provider}`;

    const user = await User.findOneAndUpdate(
      { firebaseUid },
      {
        email: payload.email,
        name: payload.name,
        phoneNumber: payload.phoneNumber,
        gender: payload.gender,
        city: payload.city,
        dob: payload.dob,
        state: payload.state,
        town: payload.town,
        isProfileComplete: true,
      },
      { returnDocument: "after" },
    ).lean();

    await setValKey(cacheKey, JSON.stringify(user), 3600);

    return user;
  } catch (err) {
    throw err;
  }
};

export const adminDataServices = async (firebaseUid: string) => {
  const cacheKey = `admin:${firebaseUid}`;

  const cached = await getVal(cacheKey);

  if (cached) {
    return {
      data: JSON.parse(cached),
      source: "redis",
    };
  }

  const user = await User.findOne({ firebaseUid: firebaseUid });

  if (!user || user.role !== "Admin") {
    throw new Error("unauthorized");
  }

  const [
    totalUsers,
    totalCommunities,
    totalPosts,
    upcomingEvents,
    ongoingEvents,
    pastEvents,
  ] = await Promise.all([
    User.countDocuments(),
    Community.countDocuments(),
    Post.countDocuments(),
    Event.countDocuments({ status: "upcoming" }),
    Event.countDocuments({ status: "ongoing" }),
    Event.countDocuments({ status: "past" }),
  ]);

  const data = {
    totalUsers,
    totalCommunities,
    totalPosts,
    events: {
      upcoming: upcomingEvents,
      ongoing: ongoingEvents,
      past: pastEvents,
      total: upcomingEvents + ongoingEvents + pastEvents,
    },
  };

  await setValKey(cacheKey, JSON.stringify(data));

  return {
    data: data,
    source: "db",
  };
};
