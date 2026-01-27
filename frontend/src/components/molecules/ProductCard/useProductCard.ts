import { useState, useEffect } from "react";
import { type ProductProps } from "../../../@types/product";
import { getProductById } from "../../../service/data/products";
import { clearEspecificItemFromCart } from "../../../service/data/shopCart";
import { toast } from "react-toastify";

export const useProductCard = ({ id }: { id: number }) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getProductById(id.toString());
        setProduct(data);
      } catch (error) {
        toast.error("Erro ao carregar o produto.");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleDeleteItem = async (cartId: number) => {
    try {
      setLoading(true);
      const response = await clearEspecificItemFromCart(cartId.toString());

      if (response.status === 200) {
        window.location.reload();
      } else {
        toast.error("Erro ao remover o item do carrinho.");
      }
    } catch (error) {
      toast.error("Erro ao remover o item do carrinho.");
      console.error("Error removing item from cart:", error);
    } finally {
      setLoading(false);
    }
  };
  return {
    product,
    loading,
    handleDeleteItem,
  };
};
