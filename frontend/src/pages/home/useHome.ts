import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../../service/data/products";
import { type ProductProps } from "../../@types/product";

export const useHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const data = await listProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const goToCategories = () => {
    navigate("/categorie");
  };

  return {
    products,
    goToCategories,
    loading,
  };
};
