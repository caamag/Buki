import { useHome } from "./useHome";

const Home = () => {
  const helper = useHome();

  return (
    <div className="max-w-[1000px] mx-auto py-[50px] px-10 text-gray-800">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl text-center font-bold mt-10">
          Descubra seu próximo universo
        </h1>
        <p className="text-2xl text-center mt-5 text-gray-800">
          Explore um mundo de livros do seu jeito
        </p>

        <button
          onClick={helper.goToCategories}
          className="w-[250px] p-4 bg-red-700 text mt-5 text-white text-2xl cursor-pointer hover:bg-red-800 hover:text-gray-100 transition-all duration-150"
        >
          Explorar categorias
        </button>
      </div>
    </div>
  );
};

export default Home;
