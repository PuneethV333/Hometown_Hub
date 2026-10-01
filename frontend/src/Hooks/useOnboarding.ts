import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onBoardingApi } from "../Api/user.api";

export const useOnBoarding = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: onBoardingApi,
    mutationKey: ["me"],
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
};
