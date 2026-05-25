import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const COUNTRIES_NOW_BASE_URL = "https://countriesnow.space/api/v0.1";

interface CountriesNowResponse<T> {
  error: boolean;
  msg: string;
  data: T;
}

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

export const fetchStatesApi = async (): Promise<string[]> => {
  return INDIAN_STATES;
};

export const fetchCitiesApi = async (state: string): Promise<string[]> => {
  const res = await axios.post<CountriesNowResponse<string[]>>(
    `${COUNTRIES_NOW_BASE_URL}/countries/state/cities`,
    {
      country: "India",
      state,
    },
  );

  return res.data.data || [];
};

export const fetchTownsApi = async (town: string): Promise<string[]> => {
  if (!town) return [];

  return [];
};

export const useFetchStates = () => {
  return useQuery<string[], Error>({
    queryKey: ["states"],
    queryFn: fetchStatesApi,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    retry: 1,
  });
};

export const useFetchCities = (state: string) => {
  return useQuery<string[], Error>({
    queryKey: ["cities", state],

    queryFn: () => fetchCitiesApi(state),

    enabled: !!state,

    staleTime: Infinity,

    gcTime: 1000 * 60 * 60,

    retry: 1,
  });
};

export const useFetchTowns = (town: string) => {
  return useQuery<string[], Error>({
    queryKey: ["towns", town],

    queryFn: () => fetchTownsApi(town),

    enabled: !!town && town.trim().length > 2,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 0,
  });
};

export const useStateNames = () => {
  return INDIAN_STATES;
};

export const useCityNames = (state: string) => {
  const { data } = useFetchCities(state);

  return data || [];
};

export const useTownNames = (town: string) => {
  const { data } = useFetchTowns(town);

  return data || [];
};
