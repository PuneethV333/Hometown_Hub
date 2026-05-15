import { useMutation } from "@tanstack/react-query"
import { fetchCitiesApi, fetchStatesApi } from "../Api/helper.api"

export const useFetchState = () => {
    return useMutation({
        mutationFn:fetchStatesApi,
        mutationKey:["states"],
    })
}

export const useFetchCities = () => {
    return useMutation({
        mutationFn:fetchCitiesApi,
        mutationKey:["states"],
    })
}