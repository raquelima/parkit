import { useState } from "react";
import { useLocation } from "react-router-dom";
import { List, Divider, Typography, Box } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NavListitem from "./NavListitem";

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
  {
    page: "Vehicle",
    path: "/vehicles",
    icon: <DriveEtaIcon sx={{ color: "white" }} />,
  },
];

/**
 * A functional component that renders MUI List components representing the list of the side navigation bar
 * @returns {JSX.Element} The SideNavBarList component
 */
function SideNavBarList({ open }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const location = useLocation();

  /**
   * Returns an object with button properties for a given item and index
   * @param {Object} item - The item for which button properties are being generated
   * @param {number} index - The index of the item in the list
   * @returns {Object} An object with two properties:
   *  selected: A boolean indicating if the item is currently selected based on the current location.
   *  onClick: A function to set the selected index to the current index.
   */
  const buttonProps = (item, index) => ({
    selected: location.pathname === item.path,
    onClick: () => setSelectedIndex(index),
  });

  return (
    <List>
      <Box sx={{ px: 1 }}>
        {open && (
          <Typography
            variant="subtitle2"
            fontWeight={300}
            color="white"
            sx={{ pl: "18px" }}
          >
            Booking
          </Typography>
        )}
        <List>
          {listItems.slice(0, 3).map((item, index) => (
            <NavListitem
              key={item.page}
              to={item.path}
              primary={item.page}
              icon={item.icon}
              buttonProps={buttonProps(item, index)}
            />
          ))}
        </List>
        <Divider />
        {open && (
          <Typography
            variant="subtitle2"
            fontWeight={300}
            color="white"
            sx={{ pl: "18px", pt: 1 }}
          >
            Management
          </Typography>
        )}
        <List>
          <NavListitem
            key="vehicles"
            to="/vehicles"
            primary="Vehicles"
            icon={<DriveEtaIcon style={{ color: "white" }} />}
            buttonProps={buttonProps(listItems[3], 3)}
          />
        </List>
      </Box>
    </List>
  );
}

export default SideNavBarList;
