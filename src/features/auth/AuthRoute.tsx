import { Navigate } from "react-router-dom";

export const AuthRoute = () => {
  const user = window.localStorage.getItem("userId");

  return (
    <div className="auth">
      <Navigate to={!user ? "/login" : "/home/dashboard"} />
    </div>
  );
};
