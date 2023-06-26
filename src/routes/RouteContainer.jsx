import { Box } from "@mui/material";
import LoginRoutes from "./LoginRoutes";
import AppRoutes from "./AppRoutes";
import AppLayout from "../components/layout/AppLayout";
/**
 * A functional component that conditionally renders the routes and layout of the application
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @returns {JSX.Element} The RouteContainer component
 */
function RouteContainer({ user }) {
  return !user ? (
    <LoginRoutes user={user} />
  ) : (
    <Box sx={{ display: "flex" }}>
      <AppLayout />
      <Box
        component="main"
        px={{ xs: 0, sm: 9, md: 9, lg: 9 }}
        sx={{ flexGrow: 1, pt: 10 }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default RouteContainer;
