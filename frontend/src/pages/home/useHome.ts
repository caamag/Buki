import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../../service/data/products";
import { type ProductProps } from "../../@types/product";

export const useHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductProps[]>([]);
  useEffect(() => {
    (async () => {
      const data = await listProducts();
      setProducts(data);
    })();
  }, []);

  const goToCategories = () => {
    navigate("/categorie");
  };

  return {
    products,
    goToCategories,
  };
};
