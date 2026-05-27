/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCommunityApi,
  getCommunityDataApi,
  getSuggestedCommunitiesApi,
  joinLeaveCommunityApi,
} from "../Api/community.api";
import { Auth } from "../config/firebase.config";
import type { userType } from "../types/user.types";

import toast from "react-hot-toast";

export const useGetSuggestedCommunities = () => {
  return useQuery({
    queryFn: getSuggestedCommunitiesApi,
    queryKey: ["suggestedCommunities"],
    retry: false,
    select: (res) => res.data,
    enabled: !!Auth.currentUser,
  });
};

interface me {
  data: userType;
  source: string;
}

export const useGetCommunity = (communityId: string) => {
  return useQuery({
    queryKey: ["community", communityId],
    queryFn: () => getCommunityDataApi(communityId),
    retry: false,
    enabled: !!Auth.currentUser && !!communityId,
  });
};

export const useJoinLeaveCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (communityId: string) => joinLeaveCommunityApi(communityId),

    onMutate: async (communityId) => {
      await queryClient.cancelQueries({
        queryKey: ["community", communityId],
      });

      await queryClient.cancelQueries({
        queryKey: ["me"],
      });

      await queryClient.cancelQueries({
        queryKey: ["suggestedCommunities"],
      });

      const prevCommunity = queryClient.getQueryData([
        "community",
        communityId,
      ]);

      const prevUser = queryClient.getQueryData<me>(["me"]);

      queryClient.setQueryData(["community", communityId], (old: any) => {
        if (!old?.data || !prevUser?.data) return old;

        const isMember = prevUser.data.myCommunities?.some(
          (x: any) => x?.toString() === communityId || x?._id === communityId,
        );

        return {
          ...old,
          data: {
            ...old.data,
            memberCount: isMember
              ? old.data.memberCount - 1
              : old.data.memberCount + 1,
          },
        };
      });

      queryClient.setQueryData(["me"], (old: any) => {
        if (!old?.data) return old;

        const isMember = old.data.myCommunities?.some(
          (x: any) => x?.toString() === communityId || x?._id === communityId,
        );

        return {
          ...old,
          data: {
            ...old.data,
            myCommunities: isMember
              ? old.data.myCommunities.filter(
                  (x: any) =>
                    x?.toString() !== communityId && x?._id !== communityId,
                )
              : [...old.data.myCommunities, communityId],
          },
        };
      });

      return {
        prevCommunity,
        prevUser,
      };
    },

    onError: (_err, communityId, context) => {
      queryClient.setQueryData(
        ["community", communityId],
        context?.prevCommunity,
      );

      queryClient.setQueryData(["me"], context?.prevUser);
    },

    onSettled: (_data, _err, communityId) => {
      queryClient.invalidateQueries({
        queryKey: ["community", communityId],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
};

export const useCreateCommunity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCommunityApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "post"],
      });

      queryClient.invalidateQueries({ queryKey: ["suggestedCommunities"] });

      toast.success("Community created");
    },

    onError: () => {
      toast.error("Failed to create community");
    },
  });
};
