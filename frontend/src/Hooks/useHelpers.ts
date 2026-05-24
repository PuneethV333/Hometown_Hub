/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { config } from "../config/data.config";

const GEOAPIFY_KEY = config.geoapifyAPIKey;



interface GeoProperty {
  name?: string;
  state_code?: string;
  suburb?: string;
  place_id?: string;
  [key: string]: any;
}

interface GeoFeature {
  properties: GeoProperty;
  [key: string]: any;
}

export interface GeoApiResponse {
  features: GeoFeature[];
  [key: string]: any;
}



const fetchLocationApi = async (
  text: string,
  type: "state" | "city" | "suburb",
  limit: number
): Promise<GeoApiResponse> => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/autocomplete",
    {
      params: {
        text,
        type,
        filter: "countrycode:in",
        limit,
        apiKey: GEOAPIFY_KEY,
      },
    }
  );
  return res.data;
};

export const fetchStatesApi = (): Promise<GeoApiResponse> =>
  fetchLocationApi("state", "state", 30);

export const fetchCitiesApi = (state: string): Promise<GeoApiResponse> =>
  fetchLocationApi(state, "city", 20);

export const fetchTownsApi = (town: string): Promise<GeoApiResponse> =>
  fetchLocationApi(town, "suburb", 15);




export const useFetchStates = () => {
  return useQuery<GeoApiResponse, Error>({
    queryKey: ["states"],
    queryFn: fetchStatesApi,
    staleTime: Infinity, 
    retry: 2,
    gcTime: 1000 * 60 * 60, 
  });
};


export const useFetchCities = (state: string) => {
  return useQuery<GeoApiResponse, Error>({
    queryKey: ["cities", state],
    queryFn: () => fetchCitiesApi(state),
    enabled: !!state && state.length > 0,
    staleTime: Infinity,
    retry: 2,
    gcTime: 1000 * 60 * 60,
  });
};


 
export const useFetchTowns = (town: string) => {
  return useQuery<GeoApiResponse, Error>({
    queryKey: ["towns", town],
    queryFn: () => fetchTownsApi(town),
    enabled: !!town && town.trim().length > 2,
    staleTime: 1000 * 60 * 5, 
    retry: 1,
    gcTime: 1000 * 60 * 10,
  });
};




export const useStateNames = () => {
  const { data } = useFetchStates();
  return (
    data?.features
      ?.map((feature) => feature.properties.name)
      .filter(Boolean) as string[]
  ) || [];
};


export const useCityNames = (state: string) => {
  const { data } = useFetchCities(state);
  return (
    data?.features
      ?.map((feature) => feature.properties.name)
      .filter(Boolean) as string[]
  ) || [];
};


export const useTownNames = (town: string) => {
  const { data } = useFetchTowns(town);
  return (
    data?.features
      ?.map((feature) => feature.properties.suburb)
      .filter(Boolean) as string[]
  ) || [];
};