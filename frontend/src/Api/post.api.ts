import { api } from "../utils/api.utils";

export const getPostApi = async (page = 1, limit = 10) => {
  const res = await api.get("/api/posts", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};


export const likePostApi = async (id:string) => {
    const res = await api.post(`/api/posts/${id}/like`)
    return res.data
}