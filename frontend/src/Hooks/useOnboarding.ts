import { useMutation } from "@tanstack/react-query"
import { onBoardingApi } from "../Api/user.api"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"


export const useOnBoarding = () => {
    
    const navigate = useNavigate()
    return useMutation({
        mutationFn:onBoardingApi,
        mutationKey:["me"],
        
        onSuccess:() => {
            navigate("/home")
        },
        onError:() => {
            toast.error("on-boarding failed")
        }
    })
}