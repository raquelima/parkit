import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideNavBar from "./SideNavBar";
import AppRoutes from "../routes/AppRoutes";
import LoginRoutes from "../routes/LoginRoutes";

function RouteContainer({ user, setUser }) {
  return !user ? (
    <LoginRoutes setUser={setUser} />
  ) : (
    <Box sx={{ display: "flex" }}>
      <TopBar user={user} />
      <SideNavBar />
      <Box component="main" sx={{ flexGrow: 1, p: 10 }}>
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default RouteContainer;
