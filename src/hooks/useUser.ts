import {useContext} from 'react';
import {UserContext} from '@/context/Users';

export default function useUser() {
  const {users, setUsers, userLogged, saveUserLoginLocalStorage} =
    useContext(UserContext);

  return {
    users,
    setUsers,
    userLogged,
    saveUserLoginLocalStorage,
  };
}