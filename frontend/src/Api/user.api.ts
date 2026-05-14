import { api } from "../utils/api.utils"

export const getMeApi = async () => {
    const res = await api.get('/api/data/getMe');
    return res.data;
}