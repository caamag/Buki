import { useProductCard } from "./useProductCard";
import { NavLink } from "react-router-dom";

interface ProductCardProps {
  id: number;
  quantity: number;
}

const ProductCard = ({ id, quantity }: ProductCardProps) => {
  const { product, loading } = useProductCard({ id });

  return (
    <div className="w-full h-80 bg-gray-100 p-10 border border-gray-200 rounded flex flex-col gap-4">
      {loading ? (
        <div>
          <p>Carregando...</p>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-between">
          <div className="w-full h-full flex gap-10">
            <img src={product?.image} alt={product?.name} className="h-full" />

            <div className="h-full flex justify-center flex-col">
              <h3 className="text-[20px] font-medium">{product?.name}</h3>
              <p className="text-[14px] text-gray-600">
                Quantidade: {quantity}
              </p>
              <p className="text-gray-800 font-semibold text-[14px]">
                R$ {(product?.price || 0) * quantity}
              </p>
            </div>
          </div>

          <div>
            <button className="w-full bg-blue-500 text-white py-4 px-6 text-[14px] hover:bg-blue-700 transition mt-2 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">
              Finalizar compra
            </button>
            <NavLink to={`/product/${product?.id}`}>
              <button className="w-full bg-gray-100 border border-blue-500 text-blue-700 py-4 px-6 text-[14px] hover:bg-blue-700 hover:text-white transition mt-2 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">
                Ver detalhes
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
