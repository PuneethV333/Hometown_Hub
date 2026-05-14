import { useMutation } from "@tanstack/react-query";

import * as authApi from "../Api/auth.api";

import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["ResAuth"],

    mutationFn: authApi.authApi,

    retry: false,

    onError: (err) => {
    //todo:add toast
      console.log(err);
    },

    onSuccess: (res) => {
        //todo: add toast
      if (res.data.isProfileComplete) {
        navigate("/home");
      } else {
        navigate("/on-boarding");
      }
    },
  });
};
