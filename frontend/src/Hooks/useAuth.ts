import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../Api/auth.api";

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["ResAuth"],

    mutationFn: authApi,

    retry: false,

    onError: (err) => {
      console.log(err);
    },

    onSuccess: (res) => {
      if (res.data.isProfileComplete) {
        navigate("/home");
      } else {
        navigate("/on-boarding");
      }
    },
  });
};
