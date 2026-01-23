import Logo from "../../../../assets/Buki-logo.png";
import { CiShoppingCart } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { useHeader } from "./useHeader";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const helper = useHeader();
  const navigate = useNavigate();

  return (
    <header className="w-screen h-30 border-b border-b-gray-200 flex justify-center">
      <div className="max-w-[1200px] w-full h-full flex items-center justify-between px-10">
        <NavLink to={"/"}>
          <img src={Logo} alt="Logo" className="h-16" />
        </NavLink>
        <div className="flex gap-15 relative">
          <CiShoppingCart className="text-5xl text-red-700 cursor-pointer" />
          <RxAvatar
            className="text-5xl text-red-700 cursor-pointer"
            onClick={helper.toggleUserMenu}
          />

          {helper.showUserMenu && (
            <div
              ref={helper.menuRef}
              className="w-[100px] absolute top-18 right-0 bg-white border border-gray-300 p-4"
            >
              <ul className="w-full text-center">
                <li
                  className="m-4 text-[12px] cursor-pointer transition-colors duration-200 hover:text-red-700"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Conta
                </li>
                {helper.currentUser ? (
                  <li
                    className="m-4 text-[12px] cursor-pointer transition-colors duration-200 hover:text-red-700"
                    onClick={helper.logOut}
                  >
                    Sair
                  </li>
                ) : (
                  <li
                    className="m-4 text-[12px] cursor-pointer transition-colors duration-200 hover:text-red-700"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Entrar
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
