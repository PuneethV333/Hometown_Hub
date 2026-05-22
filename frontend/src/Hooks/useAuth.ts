import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "../Api/auth.api";
import toast from "react-hot-toast";

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["ResAuth"],

    mutationFn: authApi,

    retry: false,

    onError: (err) => {
      toast.error(err.message);
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
