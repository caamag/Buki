import { useState, useEffect } from "react";
import { isValidEmail } from "../../utils/isValidEmail";
import { toast } from "react-toastify";
import { registerUser } from "../../service/data/auth";
import { type Error } from "../../@types/api";

export const useAuth = () => {
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
  };
};
