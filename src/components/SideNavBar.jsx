import { Drawer, Toolbar, Typography, Divider } from "@mui/material";
import SideNavBarList from "./SideNavBarList";
import logo from "../assets/adobeLogoSmall.png";
import { DRAWER_WIDTH } from "../Constants";
import { THEME_COLOR } from "../Constants";

/**
 * A functional component that renders a MUI Drawer component representing the side navigation bar
 * @returns {JSX.Element} The SideNavBar component
 */
function SideNavBar() {
  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: THEME_COLOR,
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: 44,
        }}
      >
        <img src={logo} width={23} height={20} />
        <Divider
          orientation="vertical"
          sx={{ backgroundColor: "white", mx: 1, height: "18px" }}
        />
        <Typography variant="h6">ParkIt</Typography>
      </Toolbar>
      <Divider />
      <SideNavBarList />
    </Drawer>
  );
}

export default SideNavBar;
