import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = () => {
  const { auth } = useAuth();
  const location = useLocation();

  const loginOrRegister = location.pathname === '/login' || location.pathname === '/register';
  
  if(auth && loginOrRegister) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default PublicRoute;