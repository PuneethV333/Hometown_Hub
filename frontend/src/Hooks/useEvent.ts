import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addEventsApi, getEventsApi } from "../Api/event.api";
import { Auth } from "../config/firebase.config";
import type { addEventsReqBodyType } from "../types/events.types";
import toast from "react-hot-toast";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getEventsApi,
    retry: false,
    enabled: !!Auth.currentUser,
    select: (res) => res.data,
  });
};

export const useAddEvents = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: addEventsReqBodyType) => addEventsApi(payload),
    mutationKey: ["add", "events"],
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: () => {
      toast.error("failed to created events");
    },
  });
};
