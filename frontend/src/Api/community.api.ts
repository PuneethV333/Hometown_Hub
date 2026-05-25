import type { createCommunityReqBodyType } from "../types/community.types";
import { api } from "../utils/api.utils";

export const getSuggestedCommunitiesApi = async () => {
  const res = await api.get("/api/community/suggested");
  return res.data;
};

export const getCommunityDataApi = async (communityId: string) => {
  const res = await api.get(`/api/community/${communityId}`);
  return res.data;
};

export const joinLeaveCommunityApi = async (communityId: string) => {
  const res = await api.post(`/api/community/join/leave/${communityId}`);
  return res.data;
};

export const createCommunityApi = async (payload: createCommunityReqBodyType) => {
  const res = await api.post("/api/community/create", payload);
  return res.data
};
