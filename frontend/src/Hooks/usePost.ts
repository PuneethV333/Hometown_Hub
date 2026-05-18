import { useQuery } from "@tanstack/react-query"
import { getPostApi } from "../Api/post.api"
import { Auth } from "../config/firebase.config"

export const useGetPost = ( page = 1,limit = 10) => {
    return useQuery({
        queryKey:["post",page,limit],
        queryFn:() => getPostApi(page,limit),
        select:(res) => res.data,
        enabled:!!Auth.currentUser,
        retry:false
    })
}