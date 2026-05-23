import Community from "../models/community.models";
import Event from "../models/event.models";
import User from "../models/user.models";
import { addEventsReqBodyType } from "../types/events.types";
import { clearCache, getVal, setValKey } from "../utils/redis.utils";

export const getEventsServices = async (firebaseUid: string) => {
  try {
    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
      throw new Error("user not found");
    }

    const cacheKey = `events:${firebaseUid}:upcoming`;

    const cached = await getVal(cacheKey);

    if (cached) {
      return { data: JSON.parse(cached), source: "redis" };
    }

    const now = new Date();

    const events = await Event.find({
      community: { $in: user.myCommunities },
      status: { $ne: "past" },
      startDate: { $gte: now },
    })
      .sort({ startDate: 1 })
      .limit(5)
      .populate("community", "name icon")
      .populate("createdBy", "name photoUrl")
      .lean();

    await setValKey(cacheKey, JSON.stringify(events));

    return { data: events, source: "db" };
  } catch (err) {
    throw err;
  }
};

export const addEventsServices = async (
  firebaseUid: string,
  payload: addEventsReqBodyType,
) => {
  const user = await User.findOne({ firebaseUid });

  if (!user || user.role === "User") {
    const err: any = new Error("Unauthorized");
    err.status = 403;
    throw err;
  }

  const community = await Community.findById(payload.community);

  if (!community) {
    const err: any = new Error("Community not found");
    err.status = 404;
    throw err;
  }

  // fix — ObjectId comparison
  if (community.createdBy.toString() !== user._id.toString()) {
    const err: any = new Error("Only community creator can create events");
    err.status = 403;
    throw err;
  }

  const event = await Event.create({
    createdBy: user._id,
    community: payload.community,
    startDate: payload.startDate,
    endDate: payload.endDate,
    location: payload.location,
    title: payload.title,
    description: payload.description,
  });

  await clearCache(`events:${firebaseUid}:upcoming`);

  return { data: event, success: true };
};
