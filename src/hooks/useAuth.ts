import {useContext} from 'react';
import {AuthContext} from '@/context/Auth';

export default function useAuth() {
  const {handleLogin, handleLogout} = useContext(AuthContext);

  return {
    handleLogin,
    handleLogout,
  };
}
