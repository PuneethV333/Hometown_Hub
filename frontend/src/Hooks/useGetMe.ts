import { useQuery } from "@tanstack/react-query";

import { getMeApi } from "../Api/user.api";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],

    queryFn: getMeApi,

    retry: false,

    select: (res) => res.data,

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,
  });
};
