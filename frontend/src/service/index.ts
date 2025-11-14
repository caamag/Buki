import axios from "axios";

const api = axios.create();
api.interceptors.request.use((config) => {
  config.baseURL = "http://localhost:3000/api/";
  return config;
});

export { api };
