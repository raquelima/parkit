import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideNavBar from "./SideNavBar";
import AppRoutes from "../routes/AppRoutes";
import LoginRoutes from "../routes/LoginRoutes";

function RouteContainer({ user }) {
  return !user ? (
    <LoginRoutes user={user} />
  ) : (
    <Box sx={{ display: "flex" }}>
      <TopBar userId={user.userId} />
      <SideNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default RouteContainer;
