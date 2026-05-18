import { api } from "../utils/api.utils"

export const getSuggestedCommunitiesApi = async () => {
    const res = await api.get("/api/community/suggested")
    return res.data;
}