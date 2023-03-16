import { Box, Toolbar } from "@mui/material";
import TopBar from "./TopBar";
import SideNavBar from "./SideNavBar";
import AppRoutes from "../AppRoutes";
import LoginRoutes from "../LoginRoutes";

function RouteContainer({ user, setUser }) {
  return !user ? (
    <LoginRoutes setUser={setUser} />
  ) : (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideNavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <AppRoutes />
      </Box>
    </Box>
  );
}

export default RouteContainer;
