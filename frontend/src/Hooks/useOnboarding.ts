import { useMutation } from "@tanstack/react-query";
import { onBoardingApi } from "../Api/user.api";

export const useOnBoarding = () => {
  return useMutation({
    mutationFn: onBoardingApi,
    mutationKey: ["me"],
  });
};
