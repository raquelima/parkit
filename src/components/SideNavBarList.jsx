import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { List, Divider } from "@mui/material";
import CustomListItem from "./CustomListItem";
import { useLocation } from "react-router-dom";

const listItems = [
  {
    page: "Dashboard",
    path: "/dashboard",
    icon: <AssessmentIcon style={{ color: "white" }} />,
  },
  {
    page: "Reservations",
    path: "/reservations",
    icon: <EventIcon style={{ color: "white" }} />,
  },
  {
    page: "Parking Overview",
    path: "/parking_overview",
    icon: <DashboardIcon style={{ color: "white" }} />,
  },
];

function SideNavBarList() {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const location = useLocation();

  const buttonProps = (item, index) => ({
    selected: location.pathname === item.path,
    onClick: () => setSelectedIndex(index),
  });

  return (
    <List>
      <List>
        {listItems.map((item, index) => (
          <CustomListItem
            key={item.page}
            to={item.path}
            primary={item.page}
            icon={item.icon}
            buttonProps={buttonProps(item, index)}
          />
        ))}
      </List>
      <Divider />
      <List>
        <CustomListItem
          key="vehicles"
          to="/vehicles"
          primary="Vehicles"
          icon={<DriveEtaIcon style={{ color: "white" }} />}
          buttonProps={buttonProps(3)}
        />
      </List>
    </List>
  );
}

export default SideNavBarList;
