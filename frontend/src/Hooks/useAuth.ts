import { useQuery } from "@tanstack/react-query"
import * as authApi from "../Api/auth.api"

export const useAuth = () => {
    return useQuery({
        queryKey:['ResAuth'],
        queryFn:authApi.authApi,
        select:(res) => res.data,
        retry:false,
        staleTime: 5 * 60 * 1000,
    })
}

