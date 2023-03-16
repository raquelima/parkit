import { Route, Routes } from "react-router-dom";
import Login from "./views/Login.jsx";

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default LoginRoutes;
