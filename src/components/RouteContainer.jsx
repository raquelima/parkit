import { Box } from "@mui/material";
import LoginRoutes from "../routes/LoginRoutes";
import AppRoutes from "../routes/AppRoutes";
import AppLayout from "./AppLayout";
/**
 * A functional component that condionally renders the routes and layout of the application
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @returns {JSX.Element} The RouteContainer component
 */
function RouteContainer({ user }) {
  return !user ? (
    <LoginRoutes user={user} />
  ) : (
    <Box sx={{ display: "flex" }}>
      <AppLayout />
      <Box component="main" sx={{ flexGrow: 1, px: 9, pt: 10 }}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default RouteContainer;
