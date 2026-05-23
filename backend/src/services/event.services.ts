import Event from "../models/event.models";
import User from "../models/user.models";
import { getVal, setValKey } from "../utils/redis.utils";

export const getEventsServices = async (firebaseUid: string) => {
  try {
    const user = await User.findOne({ firebaseUid: firebaseUid });

    if (!user) {
      throw new Error("user not found");
    }

    const cacheKey = `events:${firebaseUid}:upcoming`;

    const cached = await getVal(cacheKey);

    if (cached) {
      return {data:JSON.parse(cached),source:"redis"}
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

    return {data:events,source:"db"};
  } catch (err) {
    throw err;
  }
};
