import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";

function LoginRoutes({ user }) {
  return (
    <Routes>
      <Route path="/login" element={<Login user={user} />} />
      <Route path="/" element={<Login user={user} />} />
      <Route path="/*" element={<Login user={user} />} />
    </Routes>
  );
}

export default LoginRoutes;
