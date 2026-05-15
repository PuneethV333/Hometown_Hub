import axios from "axios"

export const fetchStatesApi = async () => {
    const res = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/states",
    {
      country: "India",
    }
  );
  return res.data
}

export const fetchCitiesApi = async (state:string) => {
    const res = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/state/cities",
    {
      country: "India",
      state,
    }
  );  
  return res.data
}