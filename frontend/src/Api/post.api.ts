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
