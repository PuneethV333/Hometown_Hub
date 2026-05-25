import type { addCommentPayloadType } from "../types/comment.types";
import { api } from "../utils/api.utils";

export const addCommentApi = async (payload:addCommentPayloadType) => {
    const res = await api.post("/api/comments/add",payload)
    return res.data
}
