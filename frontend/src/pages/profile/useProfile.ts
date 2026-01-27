import { useState } from "react";
import { cleanShopCart } from "../../service/data/shopCart";
import { useAuthContext } from "../../context/authContext";
import { toast } from "react-toastify";

export const useProfile = () => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClearCart = async () => {
    try {
      setLoading(true);
      const response = await cleanShopCart(currentUser?.id.toString() || "");

      if (response.status === 200) {
        window.location.reload();
      } else {
        toast.error("Erro ao limpar o carrinho.");
      }
    } catch (error) {
      toast.error("Erro inesperado. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleClearCart,
  };
};
