import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUserData } from "../service/data/auth";

interface TokenContextType {
  token: string;
  saveToken: (token: string) => void;
  invalidateToken: () => void;
}

const AuthContext = createContext<TokenContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const tokenFromStorage = localStorage.getItem("authToken");
      if (tokenFromStorage) {
        setToken(tokenFromStorage);

        const userData = await getCurrentUserData();
        console.log(userData);
      }
    })();
  }, []);

  const saveToken = (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);
  };

  const invalidateToken = () => {
    setToken("");
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ token, saveToken, invalidateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
