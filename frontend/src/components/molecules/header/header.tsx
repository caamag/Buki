import Logo from "../../../../assets/logo.png";
import { CiShoppingCart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-screen h-30 border-b border-b-gray-200 flex justify-center">
      <div className="max-w-[1200px] w-full h-full flex items-center justify-between px-10">
        <NavLink to={"/"}>
          <img src={Logo} alt="Logo" className="h-16" />
        </NavLink>
        /*Aqui ficará a barra de search*/
        <div className="flex gap-15">
          <CiShoppingCart className="text-5xl text-red-700 cursor-pointer" />
          <RxAvatar className="text-5xl text-red-700 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
