import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "./features/auth/AuthRoute";
import { Register } from "./features/register/Register";
import { NullPage } from "./features/null/NullPage";

import "./App.css";
import { Login } from "features/login/Login";
import { Dashboard } from "features/dashboard/Dashboard";
import { Users } from "features/users/pages/Users";
import { Posts } from "features/posts/pages/Posts";
import { Home } from "features/home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthRoute />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
        </Route>
        <Route path="*" element={<NullPage />} />
      </Routes>
    </div>
  );
}

export default App;
