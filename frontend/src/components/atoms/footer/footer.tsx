import Logo from "../../../../assets/Buki-logo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-screen p-10 flex justify-center border-t-2 border-gray-200">
      <div className="w-full max-w-[1200px] flex flex-col items-center">
        <img src={Logo} alt="" className="h-16" />
        <ul className="flex justify-center gap-10 mt-5">
          <li className="text-[12px]">
            <NavLink to="/categorie">Categorias</NavLink>
          </li>
          <li className="text-[12px]">
            <NavLink to="/">Página inicial</NavLink>
          </li>

          <li className="text-[12px]">
            <a href="https://wa.me/551966197683" target="blank">
              Contato
            </a>
          </li>
        </ul>

        <p className="text-[12px] mt-14 w-full text-center">
          &copy; 2025 Nome da Sua Empresa. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
