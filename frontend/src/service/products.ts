import { api } from ".";
import { type ProductProps } from "../@types/product";

export const listProducts = async (): Promise<ProductProps[]> => {
  const response = await api.get("/products");
  return response.data.data;
};
