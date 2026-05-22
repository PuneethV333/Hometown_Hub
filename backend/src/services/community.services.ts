import Community from "../models/community.models";
import User from "../models/user.models";
import { clearCache, getVal, setValKey } from "../utils/redis.utils";
import { AuthProvider } from "../types/express";

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
    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
    throw new Error("unauthorized");
    }

    const cacheKey = `community:${firebaseUid}:${communityId}`;

    const cached = await getVal(cacheKey);

    if (cached) {
    return { data: JSON.parse(cached), source: "redis" };
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
provider:AuthProvider,
communityId: string,
) => {
try {
    
    const community = await Community.findOne({_id:communityId})
    
    
    if(!community){
        throw new Error("no community found with this id")
    }
    
    const user = await User.findOne({firebaseUid:firebaseUid});
    
    const isMember = user?.myCommunities.some((x) => x.equals(community._id));
    
    
    
    const updatedCommunity = await Community.findOneAndUpdate(
    { _id: communityId },
    isMember?
    { $inc: { memberCount: -1 } }:
    { $inc: { memberCount: 1 } },
    { returnDocument: "after" },
    );

    const updatedUser = await User.findOneAndUpdate(
    { firebaseUid: firebaseUid },
    isMember?
    {$pull:{myCommunities:communityId}}:
    {$addToSet:{myCommunities:communityId}},
    {returnDocument: "after"},
    );
    
    await clearCache(`user:${firebaseUid}:${provider}`)
    await clearCache(`community:${firebaseUid}:${communityId}`)
    
    return {data:updatedUser,joined:!isMember}
    
} catch (err) {
    throw err;
}
};
