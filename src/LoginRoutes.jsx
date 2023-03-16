import { Route, Routes } from "react-router-dom";
import Login from "./views/Login.jsx";

function LoginRoutes({ setUser }) {
  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser}/>} />
      <Route path="/" element={<Login setUser={setUser}/>} />
      <Route path="/*" element={<Login setUser={setUser}/>} />
    </Routes>
  );
}

export default LoginRoutes;
