import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getCurrentUserData } from "../service/data/auth";
import { type User } from "../@types/user";

interface TokenContextType {
  token: string;
  saveToken: (token: string) => void;
  invalidateToken: () => void;
  currentUser: User | null;
  setupLoading: boolean;
}

const AuthContext = createContext<TokenContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [setupLoading, setSetupLoading] = useState<boolean>(false);
  const [token, setToken] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const tokenFromStorage = localStorage.getItem("authToken");
      if (tokenFromStorage) {
        setSetupLoading(true);
        setToken(tokenFromStorage);

        const userData = await getCurrentUserData();
        setCurrentUser(userData.data);
        setSetupLoading(false);
      }
    })();
  }, []);

  const saveToken = async (token: string) => {
    setToken(token);
    localStorage.setItem("authToken", token);

    const userData = await getCurrentUserData();
    setCurrentUser(userData.data);
  };

  const invalidateToken = () => {
    setToken("");
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    console.log(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{ token, saveToken, invalidateToken, currentUser, setupLoading }}
    >
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
