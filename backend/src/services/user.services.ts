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
      { new: true, runValidators: true },
    ).lean();

    await setValKey(cacheKey, JSON.stringify(user), 3600);

    return user;
  } catch (err) {
    throw err;
  }
};
