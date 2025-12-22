import { useParams } from "react-router-dom";
import useProduct from "./useProduct";

//components
import Loader from "../../components/atoms/loader/loader";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading } = useProduct(id!);

  return (
    <div className="w-screen h-full min-h-[600px] flex justify-center items-center">
      <div className="w-full max-w-[1000px]">
        {loading ? (
          <Loader />
        ) : product ? (
          <div className="w-full flex justify-center gap-14">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-[400px] max-h-[400px] object-contain"
            />

            <div className="w-full p-4">
              <h1 className="font-bold text-5xl mb-6 ">{product.name}</h1>
              <p className="text-2xl mb-4">{product.author}</p>
              <p className="text-2xl mb-10 text-">{product.description}</p>
              <p className="font-bold text-4xl text-red-700">
                R$ {product.price}
              </p>
              <button className="w-[250px] p-4 bg-red-700 text mt-5 text-white text-[12px] cursor-pointer hover:bg-red-800 hover:text-gray-100 transition-all duration-150">
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        ) : (
          <p>Product not found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
