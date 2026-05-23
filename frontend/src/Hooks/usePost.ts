/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPostApi,
  getCommunityPostApi,
  getPostApi,
  getUserPostApi,
  likePostApi,
} from "../Api/post.api";
import { Auth } from "../config/firebase.config";
import type { addPostPayloadType } from "../types/post.types";

export const useGetPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostApi(),
    enabled: !!Auth.currentUser,
    retry: false,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => likePostApi(postId),

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            posts: old.data?.posts?.map((post: any) => {
              if (post._id !== postId) return post;

              const isLiked = post.likedBy?.some(
                (id: any) => id?.toString() === postId,
              );

              return {
                ...post,
                likes: isLiked ? post.likes - 1 : post.likes + 1,
                likedBy: isLiked
                  ? post.likedBy.filter((id: any) => id?.toString() !== postId)
                  : [...(post.likedBy ?? []), postId],
              };
            }),
          },
        };
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["posts"], context?.previous);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: addPostPayloadType) => addPostApi(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user", "post"] });
    },

    onError: (err) => {
      console.error("Failed to create post:", err);
    },
  });
};

export const useGetCommunityPosts = (communityId: string) => {
  return useQuery({
    queryKey: ["post", "community", communityId],
    queryFn: () => getCommunityPostApi(communityId),
    enabled: !!Auth.currentUser && !!communityId,
    retry: false,
  });
};

export const useGetUserPost = () => {
  return useQuery({
    queryKey: ["user", "post"],
    queryFn: getUserPostApi,
    enabled: !!Auth.currentUser,
    retry: false,
  });
};
