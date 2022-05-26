import { useNavigate } from "react-router-dom";
import { Home } from "features/home/Home";
import { Login } from "../login/Login";
import { useEffect } from "react";

export const AuthRoute = () => {
  const user = window.localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/home/dashboard");
    }
  }, [navigate, user]);

  return <div className="auth">{!user ? <Login /> : <Home />}</div>;
};
