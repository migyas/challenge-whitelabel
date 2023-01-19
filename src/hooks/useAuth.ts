import { useContext } from "react";
import { AuthContext } from "../context/Auth";

export default function useAuth() {
  const { handleLogin, handleLogout, isAuth, loading, user } =
    useContext(AuthContext);

  return {
    handleLogin,
    handleLogout,
    isAuth,
    loading,
    user,
  };
}
