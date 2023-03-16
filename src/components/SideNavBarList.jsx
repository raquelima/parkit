import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const icons = [
  <AssessmentIcon style={{ color: "white" }} />,
  <EventIcon style={{ color: "white" }} />,
  <DashboardIcon style={{ color: "white" }} />,
  <DriveEtaIcon style={{ color: "white" }} />,
];

const paths = ["/dashboard", "/reservations", "/parking_overview"];

const views = ["Dashboard", "Reservations", "Parking Overview"];

let CustomListItem = ({ to, primary, icon }) => (
  <ListItem component={Link} to={to} disablePadding>
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItemButton>
  </ListItem>
);

function SideNavBarList() {
  return (
    <List>
      <List>
        {views.map((text, index) => (
          <CustomListItem
            key={text}
            to={paths[index]}
            primary={text}
            icon={icons[index]}
          />
        ))}
      </List>
      <Divider />
      <List>
        <CustomListItem
          key="vehicles"
          to="/vehicles"
          primary="Vehicles"
          icon={icons[3]}
        />
      </List>
    </List>
  );
}

export default SideNavBarList;
