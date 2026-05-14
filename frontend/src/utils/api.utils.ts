import axios from "axios";
import { config } from "../config/data.config";
import { Auth } from "../config/firebase.config";

export const api = axios.create({
  baseURL: config.backend_url,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const user = Auth.currentUser;

    if (user) {
      const token = await user.getIdToken();

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);
