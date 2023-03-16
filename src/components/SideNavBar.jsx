import { Drawer, Toolbar, Typography, Divider } from "@mui/material";
import { drawerWidth } from "../Constants";
import { themeColor } from "../Constants";
import SideNavBarList from "./SideNavBarList";

function SideNavBar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: themeColor,
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar variant="dense">
        <Typography>ParkIT</Typography>
      </Toolbar>
      <Divider />
      <SideNavBarList />
    </Drawer>
  );
}

export default SideNavBar;
