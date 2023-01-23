import {UserData} from '@/pages/Users';
import {createContext, Dispatch, SetStateAction, useState} from 'react';

export interface UseUserProps {
  users: UserData[];
  userLogged: UserData;
  setUsers: Dispatch<SetStateAction<UserData[]>>;
  removeUserInLocalStorage: (userId: number) => void;
  saveUserLoginLocalStorage: (findUser: UserData) => void;
  createNewUserInLocalStorage: (findUser: UserData) => void;
}

export const UserContext = createContext<UseUserProps>({
  setUsers() {
    console.warn('user context not provider');
  },
  saveUserLoginLocalStorage() {
    console.warn('user context not provider');
  },
  createNewUserInLocalStorage() {
    console.warn('user context not provider');
  },
  removeUserInLocalStorage() {
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

  const createNewUserInLocalStorage = (newUser: UserData) => {
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  };
  const removeUserInLocalStorage = (userId: number) => {
    const filteredUser = users.filter((user) => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(filteredUser));
  };

  const saveUserLoginLocalStorage = (findUserLogged: UserData) => {
    localStorage.setItem('login', JSON.stringify(findUserLogged));
  };

  const userLogged: UserData = JSON.parse(localStorage.getItem('login')!);

  return (
    <UserContext.Provider
      value={{
        setUsers,
        users,
        createNewUserInLocalStorage,
        removeUserInLocalStorage,
        saveUserLoginLocalStorage,
        userLogged,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
