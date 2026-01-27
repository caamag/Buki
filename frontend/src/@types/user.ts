export type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  cartItems: Array<{
    id: number;
    productId: number;
    quantity: number;
  }>;
};
