import {UserData} from '@/pages/Users';
import {createContext, Dispatch, SetStateAction, useState} from 'react';

export interface UseUserProps {
  users: UserData[];
  userLogged: UserData;
  setUsers: Dispatch<SetStateAction<UserData[]>>;
  saveUserLoginLocalStorage: (findUser: UserData) => void;
}

export const UserContext = createContext<UseUserProps>({
  setUsers() {
    console.warn('user context not provider');
  },
  saveUserLoginLocalStorage() {
    console.warn('user context not provider');
  },
  users: [],
  userLogged: {} as UserData,
});

export const UserProvider = ({children}: {children?: React.ReactNode}) => {
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
      email: 'lojista@whitelabel.com',
      senha: '12345678',
      nivel: 'operator',
      corDeFundo: 'blue',
      id: 2,
    },
  ]);

  const saveUserLoginLocalStorage = (findUserLogged: UserData) => {
    console.log('entrou aqui');

    localStorage.setItem('login', JSON.stringify(findUserLogged));
  };

  const userLogged: UserData = JSON.parse(localStorage.getItem('login')!);

  return (
    <UserContext.Provider
      value={{
        setUsers,
        users,
        saveUserLoginLocalStorage,
        userLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
