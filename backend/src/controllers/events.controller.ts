import { Request, Response } from "express";
import { getError } from "../utils/error.utils";
import {
  addEventsServices,
  getEventsServices,
} from "../services/event.services";
import { addEventsReqBodySchema } from "../types/events.types";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const result = await getEventsServices(firebaseUid);

    return res.status(200).json({
      data: result.data,
      source: result.source,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};

export const addEvents = async (req: Request, res: Response) => {
  try {
    const firebaseUid = req.user?.firebaseUid;

    if (!firebaseUid) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const parsed = addEventsReqBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Invalid input", errors: parsed.error });
    }

    const result = await addEventsServices(firebaseUid, parsed.data);

    return res.status(200).json({
      message: "added successfully",
      data: result.data,
      success: result.success,
    });
  } catch (err) {
    res.status(500).json(getError(err));
  }
};
