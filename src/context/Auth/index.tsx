import {createContext, Dispatch, SetStateAction, useState} from 'react';
import {removeToken, setToken} from '@/utils/authUtils';
import {redirect} from 'react-router-dom';
import {NewUserFormData} from '@/pages/Users/UserSchema';
import {UserData} from '@/pages/Users';

type SignInProps = {
  email: string;
  senha: string;
};

export interface UseAuthProps {
  isAuth: boolean;
  loading: boolean;
  user: NewUserFormData | Record<string, any>;
  users: UserData[];
  setUsers: Dispatch<SetStateAction<UserData[]>>;
  handleLogin(userData: SignInProps, keepAuth?: boolean): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext<UseAuthProps>({
  async handleLogin() {
    console.warn('auth context not provider');
  },
  async handleLogout() {
    console.warn('auth context not provider');
  },
  setUsers() {
    console.warn('auth context not provider');
  },
  users: [],
  isAuth: false,
  loading: false,
  user: {},
});

export const AuthProvider = ({children}: {children?: React.ReactNode}) => {
  const [users, setUsers] = useState<UserData[]>([
    {
      nome: 'Usuário 1',
      telefone: '(61)9 9386-8323',
      email: 'admin@whitelabel.com',
      senha: '12345678',
      nivel: 'admin',
      corDeFundo: 'gray',
      id: 1,
    },
    {
      nome: 'Usuário 2',
      telefone: '(61)9 9386-8323',
      email: 'admin@whitelabel.com',
      senha: '12345678',
      nivel: 'operator',
      corDeFundo: 'blue',
      id: 2,
    },
  ]);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<NewUserFormData | Record<string, any>>({});

  async function handleLogin(userData: NewUserFormData, keepAuth?: boolean) {
    try {
      setLoading(true);
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

  const handleLogout = async () => {
    setLoading(true);

    try {
      // await api.put(`login`);
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
        setUsers,
        users,
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
