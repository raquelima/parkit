import { Drawer, Toolbar, Typography, Divider } from "@mui/material";
import { DRAWERWIDTH } from "../Constants";
import { THEMECOLOR } from "../Constants";
import SideNavBarList from "./SideNavBarList";

function SideNavBar() {
  return (
    <Drawer
      sx={{
        width: DRAWERWIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWERWIDTH,
          boxSizing: "border-box",
          backgroundColor: THEMECOLOR,
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
