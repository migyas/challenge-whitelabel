import { createContext, useEffect, useState } from "react";
import { getToken, removeToken, setToken } from "../../utils/authUtils";
import { NewUserFormData as LoginPayload } from "../../pages/SignUp";

type User = {
  nome: string;
  email: string;
};

export interface UseAuthProps {
  isAuth: boolean;
  loading: boolean;
  user: User | Record<string, any>;
  handleLogin(userData: LoginPayload, keepAuth?: boolean): Promise<void>;
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

  useEffect(() => {
    (async () => {
      const token = getToken();
      if (token && !isAuth) {
        setLoading(true);
        try {
          setUser({
            email: "admin@teste.com",
            name: "José Fernandes Silva",
          });
          setIsAuth(true);
        } catch (err) {
          console.log(err);
          setIsAuth(false);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleLogin = async (userData: LoginPayload, keepAuth?: boolean) => {
    setLoading(true);

    try {
      const data = await new Promise<{
        user: User;
        token: string;
      }>((resolve, reject) => {
        setTimeout(() => {
          if (
            userData.email === "admin@teste.com" &&
            userData.senha === "12345678"
          ) {
            resolve({
              user: {
                email: userData.email,
                nome: "José Fernandes Silva",
              },
              token:
                "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1ODUxNjk5MywiaWF0IjoxNjU4NTE2OTkzfQ.k0JkTc4LAH7R92TONUGYHCyahQUVWFrb1GFuFwjDTkg",
            });
          } else {
            reject(new Error("Usuário não encontrado"));
          }
        }, 2000);
      });
      // const { data: company } = await getEmpresaById(data.user.idEmpresa);
      setToken(JSON.stringify(data.token), keepAuth);
      // api.defaults.headers.Authorization = `Bearer ${data.token}`;
      setUser(data.user);
      setIsAuth(true);
      // history.push("/dashboard");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error((err as Error).message);
    }
  };

  const handleLogout = async () => {
    // setLoading(true);

    try {
      // await api.delete('/auth/logout');
      setIsAuth(false);
      setUser({});
      removeToken();
      // api.defaults.headers.Authorization = undefined;
      // history.push("/login");
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
