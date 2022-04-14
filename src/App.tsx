import { Routes, Route } from "react-router-dom";
import { AuthRoute } from "./features/auth/AuthRoute";
import { Register } from "./features/register/Register";
import { NullPage } from "./features/null/NullPage";

import "./App.css";
import { Login } from "features/login/Login";
import { Dashboard } from "features/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthRoute />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NullPage />} />
      </Routes>
    </div>
  );
}

export default App;
