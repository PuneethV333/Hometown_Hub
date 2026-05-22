import { useQuery } from "@tanstack/react-query";

import { getMeApi } from "../Api/user.api";
import type { userType } from "../types/user.types";
import { Auth } from "../config/firebase.config";

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeApi,
    retry: false,
    select: (res) => res.data as userType,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!Auth.currentUser,
  });
};  
