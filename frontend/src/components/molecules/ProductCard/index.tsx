import { useProductCard } from "./useProductCard";
import { NavLink } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import Loader from "../../atoms/loader/loader";

interface ProductCardProps {
  id: number;
  quantity: number;
  cartId: number;
}

const ProductCard = ({ id, quantity, cartId }: ProductCardProps) => {
  const { product, loading, handleDeleteItem } = useProductCard({ id });

  return (
    <div className="w-full h-80 bg-gray-100 p-10 border border-gray-200 rounded flex flex-col gap-4">
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-between relative">
          <button
            onClick={() => {
              handleDeleteItem(cartId);
            }}
            className="absolute top-0 right-4 text-gray-400 hover:text-gray-600 transition cursor-pointer"
          >
            <GoTrash size={20} />
          </button>
          <div className="w-full h-full flex gap-10">
            <img src={product?.image} alt={product?.name} className="h-full" />

            <div className="h-full flex justify-center flex-col">
              <h3 className="text-[20px] font-medium">{product?.name}</h3>
              <p className="text-[14px] text-gray-600">
                Quantidade: {quantity}
              </p>
              <p className="text-gray-800 font-semibold text-[14px]">
                R$ {product?.price || 0}
              </p>
            </div>
          </div>
          <div>
            <button className="w-full bg-blue-500 text-white py-4 px-6 text-[14px] hover:bg-blue-700 transition mt-2 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">
              Finalizar compra
            </button>
            <NavLink to={`/product/${product?.id}`}>
              <button className="w-full bg-gray-100 border border-blue-500 text-blue-700 py-2 px-6 text-[14px] hover:bg-blue-500 hover:text-white transition mt-2 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed">
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
