import React, { createContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  login, 
  LoginInput, 
  UserAuthResponseOrNull,
  register, 
  RegisterInput,
} from "../api/auth.services";
import { AppEvents } from "../api/AppEvents";



interface AuthContextProps {
  auth: UserAuthResponseOrNull;
  onLogin: (params: LoginInput) => void;
  onLogout: () => void;
  onRegister: (params: RegisterInput) => void;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const defaultAuth = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")!) : null;

export const AuthContext = createContext<AuthContextProps>({
  auth: defaultAuth,
  onLogin: () => {},
  onLogout: () => {},
  onRegister: () => {},
});

export const AuthProvider: React.FC<Props> = ({children}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [auth, setAuth] = useState<UserAuthResponseOrNull>(defaultAuth);

  const handleLogin = async (params: LoginInput) => {
    try {
      const auth = await login(params);
      localStorage.setItem("auth", JSON.stringify(auth));
      setAuth(auth);

      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    }
    catch (err) {
      console.log(err);
      handleLogout();
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth(null);
    navigate("/login");
  }
  
  AppEvents.getInstance().on("logout", handleLogout);

  const handleRegister = async (params: RegisterInput) => {
    try {
      const auth = await register(params);
      localStorage.setItem("auth", JSON.stringify(auth));
      setAuth(auth);

      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    }
    catch(err) {
      console.log(err);
    }
  }


  const value = {
    auth,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRegister: handleRegister,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}