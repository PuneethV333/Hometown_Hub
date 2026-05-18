import { useQuery } from "@tanstack/react-query"
import { getEventsApi } from "../Api/event.api"
import { Auth } from "../config/firebase.config"

export const useGetEvents = () => {
    return useQuery({
        queryKey:["events"],
        queryFn:getEventsApi,
        retry:false,
        enabled:!!Auth.currentUser,
        select:(res) => res.data
    })
}