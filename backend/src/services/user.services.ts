import User from "../models/user.models";
import { getVal, setValKey } from "../utils/redis.utils";

export const getCurrentUser = async (firebaseUid: string) => {
  const cacheKey = `user:${firebaseUid}`;

  const cached = await getVal(cacheKey);

  if (cached) {
    return {
      user: JSON.parse(cached),
      source: "redis",
    };
  }

  const user = await User.findOne({
    firebaseUid,
  }).lean();

  if (!user) {
    return null;
  }

  await setValKey(cacheKey, JSON.stringify(user), 3600);

  return {
    user,

    source: "db",
  };
};
