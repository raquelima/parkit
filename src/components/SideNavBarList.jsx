import { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { List, Divider } from "@mui/material";
import CustomListItem from "./CustomListItem";

const icons = [
  <AssessmentIcon style={{ color: "white" }} />,
  <EventIcon style={{ color: "white" }} />,
  <DashboardIcon style={{ color: "white" }} />,
  <DriveEtaIcon style={{ color: "white" }} />,
];

const paths = ["/dashboard", "/reservations", "/parking_overview"];

const views = ["Dashboard", "Reservations", "Parking Overview"];

function SideNavBarList() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const buttonProps = (value) => ({
    selected: selectedIndex === value,
    onClick: () => setSelectedIndex(value),
  });

  return (
    <List>
      <List>
        {views.map((text, index) => (
          <CustomListItem
            key={text}
            to={paths[index]}
            primary={text}
            icon={icons[index]}
            buttonProps={buttonProps(index)}
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
