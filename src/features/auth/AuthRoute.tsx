import { Navigate } from "react-router-dom";

export const AuthRoute = () => {
  return (
    <div className="auth">
      <Navigate
        to={
          !window.localStorage.getItem("userId") ? "/login" : "/home/dashboard"
        }
      />
    </div>
  );
};
