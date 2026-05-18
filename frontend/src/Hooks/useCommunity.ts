import { useQuery } from "@tanstack/react-query"
import { getSuggestedCommunitiesApi } from "../Api/community.api"
import { Auth } from "../config/firebase.config"

export const useGetSuggestedCommunities = () => {
    return useQuery({
        queryFn:getSuggestedCommunitiesApi,
        queryKey:["suggestedCommunities"],
        retry:false,
        select:(res) => res.data,
        enabled:!!Auth.currentUser
    })
}