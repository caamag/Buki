import { useState, useEffect } from "react";
import { type ProductProps } from "../../@types/product";
import { getProductById } from "../../service/data/products";
import { addItemToCart } from "../../service/data/shopCart";
import { type CreateCartPayload } from "../../@types/carte";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/authContext";

const useProduct = (id: string) => {
  const { currentUser } = useAuthContext();
  const [product, setProduct] = useState<ProductProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const productSelected = await getProductById(id);
        setProduct(productSelected);
      } catch (error) {
        toast.error("Erro ao carregar o produto. Tente novamente mais tarde.");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleAddToCart = async () => {
    setLoading(true);

    if (!product || !currentUser) {
      console.log("User not logged in or product not found");
      return;
    }

    const payload: CreateCartPayload = {
      userId: currentUser.id,
      productId: product.id,
      quantity: quantity ?? 1,
    };

    try {
      const response = await addItemToCart(payload);
      console.log(response);

      if (response.status === 201) {
        toast.success("Produto adicionado ao carrinho!");
        return;
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente mais tarde.");
      console.error("Error adding item to cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const plusOneQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const minusOneQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return {
    product,
    loading,
    handleAddToCart,
    plusOneQuantity,
    minusOneQuantity,
    quantity,
  };
};

export default useProduct;
