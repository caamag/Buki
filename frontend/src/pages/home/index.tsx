import { useHome } from "./useHome";

const Home = () => {
  const helper = useHome();

  return (
    <div className="max-w-[1200px] mx-auto py-[50px] px-10 text-gray-800">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl text-center font-bold mt-10">
          Descubra seu próximo universo
        </h1>
        <p className="text-2xl text-center mt-5 text-gray-800">
          Explore um mundo de livros do seu jeito
        </p>

        <button
          onClick={helper.goToCategories}
          className="w-[250px] p-4 bg-red-700 text mt-5 text-white text-[12px] cursor-pointer hover:bg-red-800 hover:text-gray-100 transition-all duration-150"
        >
          Explorar categorias
        </button>
      </div>

      <div className="w-full flex flex-wrap gap-5 mt-10 justify-between">
        {helper.products.map((product) => (
          <div className="w-[200px]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[250px] w-auto mb-4 transition-transform duration-300 hover:scale-105"
            />
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <p className="text-[20px]">
              <span className="text-[12px]">R$</span> {product.price}
            </p>
            <button className="bg-red-700 text-white py-4 px-14 rounded mt-4 text-[12px] cursor-pointer hover:bg-red-800 hover:text-gray-100 transition-all duration-150">
              Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
