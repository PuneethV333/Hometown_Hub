import type { addEventsReqBodyType } from "../types/events.types";
import { api } from "../utils/api.utils"

export const getEventsApi = async () => {
    const res = await api.get("/api/event/get");
    return res.data;
}

export const addEventsApi = async (payload:addEventsReqBodyType) => {
    const res = await api.post("/api/event/add",payload);
    return res.data
}