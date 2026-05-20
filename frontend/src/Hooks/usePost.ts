/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostApi, likePostApi } from "../Api/post.api";
import { Auth } from "../config/firebase.config";

export const useGetPost = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["post", page, limit],
    queryFn: () => getPostApi(page, limit),
    select: (res) => res.data,
    enabled: !!Auth.currentUser,
    retry: false,
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string ) => likePostApi(postId),

    onMutate: async (postId ) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previous = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts", 1, 10], (old: any) => ({
        ...old,
        data: old?.data?.map((post: any) =>
          post._id === postId
            ? {
                ...post,
                likes: post.liked ? post.likes - 1 : post.likes + 1,
                liked: !post.liked,
              }
            : post,
        ),
      }));

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
