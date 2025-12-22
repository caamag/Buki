import { useState, useEffect } from "react";
import { type ProductProps } from "../../@types/product";
import { getProductById } from "../../service/data/products";

const useProduct = (id: string) => {
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const productSelected = await getProductById(id);
        setProduct(productSelected);
      } catch (error) {
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

export default useProduct;
