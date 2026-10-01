import Community from "../models/community.models";
import User from "../models/user.models";
import { clearCache, getVal, setValKey } from "../utils/redis.utils";
import { AuthProvider } from "../types/express";
import { createCommunityReqBodyType } from "../types/community.types";

export const getSuggestedCommunitiesService = async (firebaseUid: string) => {
  try {
    const cacheKey = `suggestions:${firebaseUid}`;

    const cached = await getVal(cacheKey);

    if (cached) {
      return { data: JSON.parse(cached), source: "redis" };
    }

    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
      throw new Error("unauthorized");
    }

    const communities = await Community.find({
      _id: { $nin: user.myCommunities },
      $or: [{ "location.city": user.city }, { "location.state": user.state }],
    })
      .sort({ memberCount: -1 })
      .limit(5)
      .select("name type icon memberCount location")
      .lean();

    await setValKey(cacheKey, JSON.stringify(communities));

    return { data: communities, source: "db" };
  } catch (err) {
    throw err;
  }
};

export const getCommunityDataService = async (
  firebaseUid: string,
  communityId: string,
) => {
  try {
    const cacheKey = `community:${firebaseUid}:${communityId}`;

    const cached = await getVal(cacheKey);

    if (cached) {
      return { data: JSON.parse(cached), source: "redis" };
    }

    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
      throw new Error("unauthorized");
    }

    const community = await Community.findOne({ _id: communityId }).lean();

    if (!community) {
      throw new Error("Community not found");
    }

    await setValKey(cacheKey, JSON.stringify(community));

    return { data: community, source: "db" };
  } catch (err) {
    throw err;
  }
};

export const joinOrLeaveCommunityServices = async (
  firebaseUid: string,
  provider: AuthProvider,
  communityId: string,
) => {
  try {
    const community = await Community.findOne({ _id: communityId });

    if (!community) {
      throw new Error("no community found with this id");
    }

    const user = await User.findOne({ firebaseUid: firebaseUid });

    const isMember = user?.myCommunities.some(
      (x: any) => x.toString() === communityId,
    );

    await Community.findOneAndUpdate(
      { _id: communityId },
      isMember ? { $inc: { memberCount: -1 } } : { $inc: { memberCount: 1 } },
      { returnDocument: "after" },
    );

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: firebaseUid },
      isMember
        ? { $pull: { myCommunities: communityId } }
        : { $addToSet: { myCommunities: communityId } },
      { returnDocument: "after" },
    );

    await Promise.all([
      clearCache(`user:${firebaseUid}:${provider}`),
      clearCache(`community:${firebaseUid}:${communityId}`),
      clearCache(`suggestions:${firebaseUid}`),
      clearCache("post:*"),
      clearCache("events:*")
    ]);

    return { data: updatedUser, joined: !isMember };
  } catch (err) {
    throw err;
  }
};

export const createCommunityServices = async (
  firebaseUid: string,
  provider: AuthProvider,
  payload: createCommunityReqBodyType,
) => {
  const user = await User.findOne({ firebaseUid: firebaseUid });

  if (!user) {
    throw new Error("user not found");
  }

  const exists = await Community.findOne({ name: payload.name });
  if (exists) {
    throw new Error("Community with this name already exists");
  }

  const newCommunity = await Community.create({
    name: payload.name,
    createdBy: user._id,
    location: {
      town: payload.town,
      city: payload.city,
      state: payload.state,
    },
    type: payload.type,
    icon: payload.icon,
    memberCount: 1,
  });

  if (!newCommunity) {
    throw new Error("failed to create Community");
  }

  // A creator must be a member too; otherwise they cannot create the first post
  // and Admin/Moderator creators were previously omitted entirely.
  await User.findOneAndUpdate(
    { firebaseUid },
    {
      ...(user.role !== "Admin" && user.role !== "Moderator" ? { role: "Moderator" } : {}),
      $addToSet: { myCommunities: newCommunity._id },
    },
  );

  await Promise.all([
    clearCache(`user:${firebaseUid}:${provider}`),
    clearCache(`suggestions:${firebaseUid}`),
    clearCache("post:*"),
  ]);

  return { data: newCommunity };
};
