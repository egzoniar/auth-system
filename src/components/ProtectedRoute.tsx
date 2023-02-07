import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { auth } = useAuth();
  
  const location = useLocation();

  return (
    auth ? <Outlet /> : <Navigate to='/login' state={{from: location}} replace />
  );
};

export default ProtectedRoute;