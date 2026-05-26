import type { onBoardingReqBodyType } from "../types/user.types";
import { api } from "../utils/api.utils"

export const getMeApi = async () => {
    const res = await api.get('/api/user/getMe');
    return res.data;
}

export const onBoardingApi = async (payload:onBoardingReqBodyType) => {
    const res = await api.post('/api/user/on-boarding',payload);
    return res.data
}

export const getAdminApi = async () => {
    const res = await api.get('/api/user/admin/stats')
    return res.data
}