import { useNavigate } from "react-router-dom";

export const useHome = () => {
  const navigate = useNavigate();

  const goToCategories = () => {
    navigate("/categorie");
  };

  return {
    goToCategories,
  };
};
