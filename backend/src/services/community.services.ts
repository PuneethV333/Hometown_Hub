import Community from "../models/community.models";
import User from "../models/user.models";
import { getVal, setValKey } from "../utils/redis.utils";

export const getSuggestedCommunitiesService = async (firebaseUid: string) => {
  try {
    const cacheKey = `suggestions:${firebaseUid}`;

    const cached = await getVal(cacheKey);

    // if (cached) {
    //   return { data: JSON.parse(cached), source: "redis" };
    // }

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
