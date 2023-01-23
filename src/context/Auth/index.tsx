import {createContext} from 'react';
import {redirect} from 'react-router-dom';

export interface UseAuthProps {
  handleLogin(): Promise<void>;
  handleLogout(): Promise<void>;
}

export const AuthContext = createContext<UseAuthProps>({
  async handleLogin() {
    console.warn('auth context not provider');
  },
  async handleLogout() {
    console.warn('auth context not provider');
  },
});

export const AuthProvider = ({children}: {children?: React.ReactNode}) => {
  async function handleLogin() {
    try {
      redirect('/users');
      window.location.reload();
    } catch {
      throw new Error('Erro na API');
    }
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem('login');
      redirect('/signin');
      window.location.reload();
    } catch (err) {
      throw new Error((err as Error).message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
