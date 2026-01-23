import { useState, useEffect } from "react";
import { type ProductProps } from "../../../@types/product";
import { getProductById } from "../../../service/data/products";
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

  return {
    product,
    loading,
  };
};
