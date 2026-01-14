import { useState, useEffect } from "react";
import { isValidEmail } from "../../utils/isValidEmail";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../../service/data/auth";
import { type Error } from "../../@types/api";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { saveToken } = useAuthContext();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLoading(false);
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser(name, email, password);

      if (response.status === 201) {
        toast.success(
          response.data.message || "Usuário registrado com sucesso!"
        );
      }

      await signIn(true);
    } catch (error) {
      let err = error as Error;

      toast.error(
        err.response.data.message ||
          "Erro ao registrar usuário. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (isRegisterFlow: boolean) => {
    if (!email || !password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email, password);
      const newToken = response.data.token;
      saveToken(newToken);

      if (!isRegisterFlow) {
        toast.success("Login realizado com sucesso!");
      }

      navigate("/");
    } catch (error) {
      let err = error as Error;

      if (err.response.data.statusCode === 404) {
        toast.error("Usuário não encontrado. Verifique suas credenciais.");
        return;
      }

      toast.error(
        err.response.data.message ||
          "Erro ao entrar. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    handleEmailChange,
    name,
    handleNameChange,
    password,
    handlePasswordChange,
    confirmPassword,
    handleConfirmPasswordChange,
    loading,
    handleRegister,
    signIn,
  };
};
