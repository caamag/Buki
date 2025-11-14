import { api } from ".";
import { type ProductProps } from "../@types/product";

export const listProducts = async (): Promise<ProductProps[]> => {
  return await api.get("/products");
};
