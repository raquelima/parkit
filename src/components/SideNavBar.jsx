import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { drawerWidth } from "./Constants";
import { themeColor } from "./Constants";

const icons = [
  <AssessmentIcon style={{ color: "white" }} />,
  <EventIcon style={{ color: "white" }} />,
  <DashboardIcon style={{ color: "white" }} />,
];

function SideNavBar() {
  return (
    <Drawer
      PaperProps={{
        sx: {
          backgroundColor: themeColor,
          color: "white",
          width: drawerWidth,
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar variant="dense">
        <Typography>ParkIT</Typography>
      </Toolbar>
      <Divider />
      <List>
        {["Dashboard", "Reservations", "Parking Overview"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{icons[index]}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DriveEtaIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary={"Vehicles"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default SideNavBar;
