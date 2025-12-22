import { AiOutlineLoading } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <AiOutlineLoading className="animate-spin text-5xl text-primary" />
    </div>
  );
};

export default Loader;
