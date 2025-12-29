import { api } from "..";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/users", { name, email, password });
  return response;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth", { email, password });
  return response;
};
