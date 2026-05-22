import axios from "axios";
import { config } from "../config/data.config";

export const fetchStatesApi = async () => {
  const res = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      country: "India",
    },
  );
  return res.data;
};

export const fetchCitiesApi = async (state: string) => {
    console.log(config.geoapifyAPIKey);
    
  const res = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/state/cities",
    {
      country: "India",
      state,
    },
  );
  return res.data;
};
export const fetchTownsApi = async (text: string) => {
  const res = await axios.get(
    "https://api.geoapify.com/v1/geocode/autocomplete",
    {
      params: {
        text,
        type: "suburb",
        filter: "countrycode:in",
        limit: 10,
        apiKey: config.geoapifyAPIKey
      },
    }
  );

  return res.data;
};