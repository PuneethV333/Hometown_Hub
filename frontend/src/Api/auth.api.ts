import type { authResType } from "../types/auth.types";
import { api } from "../utils/api.utils"

export const authApi = async ():Promise<authResType> => {
    const res = await api.post("/api/auth/");
    return res.data
}

