import { api } from "..";

export const clearEspecificItemFromCart = async (cartId: string) => {
  return await api.delete(`api/shop-cart/${cartId}`);
};

export const cleanShopCart = async (userId: string) => {
  return await api.delete(`shop-cart?user-id=${userId}`);
};
