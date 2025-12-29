import { NavLink } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useAuth } from "./useAuth";

const Login = () => {
  const auth = useAuth();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-10">
      <img src={Logo} alt="" className="w-44" />

      <div className="w-full max-w-[450px] height-full max-h-[550px] p-[25px] border rounded-2xl border-gray-300 flex flex-col justify-center gap-6 border-hide-mobile">
        <h2 className="text-center text-4xl font-bold">Entrar</h2>
        <p className="text-center text-2xl text-gray-400">
          Bem-vindo de volta!
        </p>

        <p className="text-[14px]">Email</p>
        <input
          type="email"
          className="border border-gray-300 rounded-2xl p-4 text-2xl outline-none -mt-5"
          value={auth.email}
          onChange={auth.handleEmailChange}
        />

        <p className="text-[14px]">Senha</p>
        <input
          type="password"
          className="border border-gray-300 rounded-2xl p-4 px-2 text-2xl outline-none -mt-5"
          value={auth.password}
          onChange={auth.handlePasswordChange}
        />

        <button
          className="bg-red-700 text-white rounded-2xl py-4 text-2xl hover:bg-red-800 transition mt-2 cursor-pointer disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
          onClick={auth.signIn}
          disabled={auth.loading}
        >
          Entrar
        </button>

        <p className="text-[12px]">
          Novo por aqui?{" "}
          <NavLink to="/register" className="text-red-700 hover:underline">
            Crie uma conta
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
