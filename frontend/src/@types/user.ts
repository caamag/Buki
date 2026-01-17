export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  cartItems: Array<{
    productId: number;
    quantity: number;
  }>;
};
