import { createContext, useState } from "react";
import { removeToken, setToken } from "../../utils/authUtils";
import { NewUserFormData as LoginPayload } from "../../pages/SignUp";
import { redirect } from "react-router-dom";

type User = {
  nome: string;
  email: string;
};

export interface UseAuthProps {
  isAuth: boolean;
  loading: boolean;
  user: User | Record<string, any>;
  handleLogin(userData: User, keepAuth?: boolean): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext<UseAuthProps>({
  async handleLogin() {
    console.warn("auth context not provider");
  },
  async handleLogout() {
    console.warn("auth context not provider");
  },
  isAuth: false,
  loading: false,
  user: {},
});

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | Record<string, any>>({});

  const handleLogin = async (userData: LoginPayload, keepAuth?: boolean) => {
    setLoading(true);
    try {
      setIsAuth(true);
      setUser(userData);
      setToken(JSON.stringify(userData.email), keepAuth);
      redirect("/");
      setLoading(false);
      window.location.reload();
    } catch (err) {
      setLoading(false);
      throw new Error((err as Error).message);
    }
  };

  const handleLogout = async () => {
    setLoading(true);

    try {
      setIsAuth(false);
      setUser({});
      removeToken();
      redirect("/signin");
      window.location.reload();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        isAuth,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
