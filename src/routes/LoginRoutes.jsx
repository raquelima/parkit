import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login.jsx";

/**
 * This is a functional component that renders the login routes
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @returns {JSX.Element} The LoginRoutes component
 */
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
