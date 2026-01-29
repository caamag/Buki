import { api } from "..";
import { type CreateCartPayload } from "../../@types/carte";

export const clearEspecificItemFromCart = async (cartId: string) => {
  return await api.delete(`/shop-cart/${cartId}`);
};

export const cleanShopCart = async (userId: string) => {
  return await api.delete(`shop-cart?user-id=${userId}`);
};

export const addItemToCart = async (body: CreateCartPayload) => {
  return await api.post("shop-cart", body);
};
