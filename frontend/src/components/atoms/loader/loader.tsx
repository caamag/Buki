import { AiOutlineLoading } from "react-icons/ai";

interface LoaderProps {
  size?: string;
}

const Loader = ({ size = "5xl" }: LoaderProps) => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <AiOutlineLoading className={`animate-spin text-${size} text-primary`} />
    </div>
  );
};

export default Loader;
