import { useMutation } from "@tanstack/react-query"
import { fetchCitiesApi,fetchTownsApi, fetchStatesApi } from "../Api/helper.api"

export const useFetchState = () => {
    return useMutation({
        mutationFn:fetchStatesApi,
        mutationKey:["states"],
    })
}

export const useFetchCities = () => {
    return useMutation({
        mutationFn:fetchCitiesApi,
        mutationKey:["city"],
    })
}

export const useFetchTowns = () => {
  return useMutation({
    mutationFn: (text: string) => fetchTownsApi(text),
    mutationKey: ["towns"],
  });
};