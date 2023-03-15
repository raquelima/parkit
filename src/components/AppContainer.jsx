import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideNavBar from "./SideNavBar";

function AppContainer() {
  return (
    <Box sx={{ display: "flex" }}>
      <TopBar />
      <SideNavBar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      ></Box>
    </Box>
  );
}

export default AppContainer;
