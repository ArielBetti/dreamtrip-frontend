import BackdropLoader from "@/components/compose/BackdropLoading";
import { ROUTE } from "@/routes/routes";
import { useAuthActions, useToken, useUser } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  // zustand: states
  const user = useUser();
  const token = useToken();

  // zustand: actions
  const { logout } = useAuthActions();

  useEffect(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    if (!user && !token) return navigate(ROUTE.login);
    return logout();
  }, [user, token, logout, navigate]);

  return <BackdropLoader open />;
};

export default Logout;
