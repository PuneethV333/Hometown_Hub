import { api } from "../utils/api.utils";

export const getPostApi = async () => {
  const res = await api.get("/api/posts");
  return res.data;
};


export const likePostApi = async (id:string) => {
    const res = await api.post(`/api/posts/${id}/like`)
    return res.data
}