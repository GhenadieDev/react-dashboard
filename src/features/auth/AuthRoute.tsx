import { Dashboard } from "../dashboard/Dashboard";
import { Login } from "../login/Login";

export const AuthRoute = () => {
  const user = window.localStorage.getItem("userId");

  return <div className="auth">{!user ? <Login /> : <Dashboard />}</div>;
};
