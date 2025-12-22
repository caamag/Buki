import { api } from "..";
import { type ProductProps } from "../../@types/product";

export const listProducts = async (): Promise<ProductProps[]> => {
  const response = await api.get("/products");
  return response.data.data;
};

export const getProductById = async (id: string): Promise<ProductProps> => {
  const response = await api.get(`/products/${id}`);
  return response.data.data;
};
