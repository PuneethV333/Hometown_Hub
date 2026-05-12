import { Request, Response } from "express";
import User from "../models/user.models";
import { getError } from "../utils/error.utils";
import { setValKey } from "../utils/redis.utils";

export const authViaGoogle = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    let user = await User.findOne({ firebaseId: firebaseUid }).lean();
    let isNewUser = false;

    if (!user) {
      const newUser = new User({ firebaseId: firebaseUid });
      await newUser.save();
      user = newUser.toObject();
      isNewUser = true;
    }

    const cacheKey = `session:${user._id}`;
    await setValKey(cacheKey, JSON.stringify(user), 3600);

    return res.status(isNewUser ? 201 : 200).json({
      data: user,
      message: isNewUser ? "User created" : "User exists",
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
