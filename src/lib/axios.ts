import axios from "axios";

const API_URL = import.meta.env.VITE_GECKOAPI_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
  }
});