import axios from "axios";
import { config } from "../config/data.config";

const GEOAPIFY_KEY = config.geoapifyAPIKey;

export const fetchStatesApi = async () => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/autocomplete",
    {
      params: {
        text: "state",
        type: "state",
        filter: "countrycode:in",
        limit: 30,
        apiKey: GEOAPIFY_KEY,
      },
    },
  );
  return res.data;
};

export const fetchCitiesApi = async (state: string) => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/autocomplete",
    {
      params: {
        text: state,
        type: "city",
        filter: "countrycode:in",
        limit: 20,
        apiKey: GEOAPIFY_KEY,
      },
    },
  );
  return res.data;
};

export const fetchTownsApi = async (city: string) => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/autocomplete",
    {
      params: {
        text: city,
        type: "suburb",
        filter: "countrycode:in",
        limit: 15,
        apiKey: GEOAPIFY_KEY,
      },
    },
  );
  return res.data;
};