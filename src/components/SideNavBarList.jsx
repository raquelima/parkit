import { useState } from "react";
import { useLocation } from "react-router-dom";
import { List, Divider, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CustomListItem from "./CustomListItem";

const listItems = [
  {
    page: "Dashboard",
    path: "/dashboard",
    icon: <AssessmentIcon sx={{ color: "white" }} />,
  },
  {
    page: "Reservations",
    path: "/reservations",
    icon: <EventIcon sx={{ color: "white" }} />,
  },
  {
    page: "Parking Overview",
    path: "/parking_overview",
    icon: <DashboardIcon sx={{ color: "white" }} />,
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
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" fontWeight={300} sx={{ pl: "18px" }}>
          Booking
        </Typography>
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
        <Typography
          variant="subtitle2"
          fontWeight={300}
          sx={{ pl: "18px", pt: 1 }}
        >
          Management
        </Typography>
        <List>
          <CustomListItem
            key="vehicles"
            to="/vehicles"
            primary="Vehicles"
            icon={<DriveEtaIcon style={{ color: "white" }} />}
            buttonProps={buttonProps(3)}
          />
        </List>
      </Box>
    </List>
  );
}

export default SideNavBarList;
