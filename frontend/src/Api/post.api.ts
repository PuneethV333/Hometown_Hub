import type { addPostPayloadType } from "../types/post.types";
import { api } from "../utils/api.utils";
 
export const getPostApi = async () => {
  const res = await api.get("/api/posts");
  return res.data;
};

export const likePostApi = async (id:string) => {
    const res = await api.post(`/api/posts/${id}/like`)
    return res.data
}

export const addPostApi = async (payload:addPostPayloadType) => {
    const res = await api.post("/api/posts/add",payload);
    return res.data
}

export const getCommunityPostApi = async (communityId:string) => {
    const res = await api.get(`/api/posts/community/${communityId}`)
    return res.data;
}

export const getUserPostApi = async () => {
    const res = await api.get('/api/posts/user');
    return res.data
}