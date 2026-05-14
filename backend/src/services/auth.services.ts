import User from "../models/user.models";
import { setValKey } from "../utils/redis.utils";

export const handleAuth = async (
  firebaseUid: string,
  provider: "google" | "email",
) => {
  let user = await User.findOne({ firebaseUid: firebaseUid }).lean();
  let isNewUser = false;

  if (!user) {
    const newUser = new User({ firebaseUid: firebaseUid, authProvider: provider });
    await newUser.save();
    user = newUser.toObject();
    isNewUser = true;
  }

  const cacheKey = `session:${user.firebaseUid}:${user.authProvider}`;
  await setValKey(cacheKey, JSON.stringify(user), 3600);

  return { user, isNewUser };
};
