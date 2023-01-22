import {useContext} from 'react';
import {AuthContext} from '@/context/Auth';

export default function useAuth() {
  const {handleLogin, handleLogout, isAuth, loading, users, setUsers} =
    useContext(AuthContext);

  return {
    users,
    setUsers,
    handleLogin,
    handleLogout,
    isAuth,
    loading,
  };
}
