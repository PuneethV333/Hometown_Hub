import { api } from "../utils/api.utils"

export const getMeApi = async () => {
    const res = await api.get('/api/user/getMe');
    return res.data;
}