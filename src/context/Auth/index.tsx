import {createContext, useEffect, useState} from 'react';
import {removeToken, setToken} from '@/utils/authUtils';
import {NewUserFormData as LoginPayload, NewUserFormData} from '@/pages/SignUp';
import {redirect} from 'react-router-dom';
import {api} from '@/services/api';

type User = {
  id: number;
  nome: string;
  email: string;
};

export interface UseAuthProps {
  isAuth: boolean;
  loading: boolean;
  user: NewUserFormData | Record<string, any>;
  handleLogin(userData: NewUserFormData, keepAuth?: boolean): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext<UseAuthProps>({
  async handleLogin() {
    console.warn('auth context not provider');
  },
  async handleLogout() {
    console.warn('auth context not provider');
  },
  isAuth: false,
  loading: false,
  user: {},
});

export const AuthProvider = ({children}: {children?: React.ReactNode}) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<NewUserFormData | Record<string, any>>({});

  useEffect(() => {
    (async () => {
      const {data} = await api.get('login');
      setUser(data);
    })();
  }, []);

  async function handleLogin(userData: LoginPayload, keepAuth?: boolean) {
    try {
      setLoading(true);
      await api.post('login', userData);
      setIsAuth(true);
      setToken(JSON.stringify(userData.email), keepAuth);
      redirect('/');
      window.location.reload();
    } catch {
      throw new Error('Erro na API');
    } finally {
      setLoading(false);
    }
  }

  // const handleLogin = async (userData: LoginPayload, keepAuth?: boolean) => {
  //   setLoading(true);

  //   try {

  //   } catch (err) {
  //     setLoading(false);
  //     throw new Error('Usuário não encontrado');
  //   }
  // };

  const handleLogout = async () => {
    setLoading(true);

    try {
      await api.put(`login`);
      setIsAuth(false);
      setUser({});
      removeToken();
      redirect('/signin');
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
