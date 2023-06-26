import DashboardIcon from "@mui/icons-material/Dashboard";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventIcon from "@mui/icons-material/Event";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PaymentsIcon from "@mui/icons-material/Payments";
import PeopleIcon from "@mui/icons-material/People";

export const DRAWER_WIDTH = 225;

export const THEME_COLOR = "#303E4D";

export const STATUS_CHIPS = {
  cancelled: {
    color: "#D83B3B",
    backgroundColor: "rgba(255,201,201,0.8)",
  },
  upcoming: {
    color: "#67CEAD",
    backgroundColor: "#E5F8F2",
  },
  ongoing: {
    color: "#30689C",
    backgroundColor: "#ADE5FF",
  },
  overdue: {
    color: "#F7C692",
    backgroundColor: "rgba(252,233,212,0.86)",
  },
};

export const NAV_ITEM_LIST = [
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
    page: "My Vehicles",
    path: "/vehicles",
    icon: <DriveEtaIcon sx={{ color: "white" }} />,
  },
  {
    page: "My Billing",
    path: "/billing",
    icon: <PaymentsIcon sx={{ color: "white" }} />,
  },
  {
    page: "Reservations",
    path: "/admin/reservations",
    icon: <EventIcon sx={{ color: "wheat" }} />,
  },
  {
    page: "Billing",
    path: "/admin/billing",
    icon: <PaymentsIcon sx={{ color: "wheat" }} />,
  },
  {
    page: "Parking spots",
    path: "/admin/parking_spots",
    icon: <DashboardIcon sx={{ color: "wheat" }} />,
  },
  {
    page: "Users",
    path: "/admin/users",
    icon: <PeopleIcon sx={{ color: "wheat" }} />,
  },
  {
    page: "Vehicles",
    path: "/admin/vehicles",
    icon: <DriveEtaIcon sx={{ color: "wheat" }} />,
  },
  {
    page: "Parking policy",
    path: "https://adobe.sharepoint.com/sites/BaselWorkplaceCommittee/SitePages/New-Office-Parking-Policy.aspx#automobile-parking",
    icon: "",
  },
  {
    page: "Help",
    path: "https://adobe.sharepoint.com/sites/BaselWorkplaceCommittee/SitePages/New-Office-Parking-Help.aspx",
    icon: "",
  },
  {
    page: "Slack us (#parkit-support)",
    path: "https://cq-dev.slack.com/archives/C04RF8TK1AT",
    icon: "",
  },
  {
    page: "Report issue",
    path: "https://github.com/berufsbildung-basel/parkit-service/issues",
    icon: "",
  },
];
