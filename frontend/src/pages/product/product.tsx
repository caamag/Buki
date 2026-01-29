import { useParams } from "react-router-dom";
import useProduct from "./useProduct";

//components
import Loader from "../../components/atoms/loader/loader";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const helper = useProduct(id!);

  return (
    <div className="w-screen h-full min-h-[600px] flex justify-center items-center">
      <div className="w-full max-w-[1000px]">
        {helper.loading ? (
          <Loader />
        ) : helper.product ? (
          <div className="w-full flex justify-center gap-14">
            <img
              src={helper.product.image}
              alt={helper.product.name}
              className="max-w-[400px] max-h-[400px] object-contain"
            />

            <div className="w-full p-4">
              <h1 className="font-bold text-5xl mb-6 ">
                {helper.product.name}
              </h1>
              <p className="text-2xl mb-4">{helper.product.author}</p>
              <p className="text-2xl mb-10 text-">
                {helper.product.description}
              </p>
              <p className="font-bold text-4xl text-red-700">
                R$ {helper.product.price}
              </p>
              <button
                onClick={helper.handleAddToCart}
                className="w-[250px] p-4 bg-red-700 text mt-5 text-white text-[12px] cursor-pointer hover:bg-red-800 hover:text-gray-100 transition-all duration-150"
              >
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
