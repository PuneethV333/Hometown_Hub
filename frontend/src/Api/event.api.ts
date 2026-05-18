import { api } from "../utils/api.utils"

export const getEventsApi = async () => {
    const res = await api.get("/api/event/get");
    return res.data;
}