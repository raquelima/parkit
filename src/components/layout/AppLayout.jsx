import { useState } from "react";
import { IconButton, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TopBar from "./TopBar";
import { styled } from "@mui/material/styles";
import SideNavBarList from "./SideNavBarList";
import { DRAWER_WIDTH, THEME_COLOR } from "../../Constants";

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.down("sm")]: {
    width: 0,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  backgroundColor: THEME_COLOR,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

/**
 * Functional component that represents the layout of the application, which consists of a top bar and a side navigation bar.
 * @returns {JSX.Element} JSX Element representing the application layout
 */
function AppLayout() {
  const [open, setOpen] = useState(false);
  return (
    <Box>
      <CssBaseline />
      <TopBar open={open} setOpen={setOpen} />
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: THEME_COLOR,
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(!open)}>
            <ChevronLeftIcon sx={{ color: "white" }} />
          </IconButton>
        </DrawerHeader>
        <SideNavBarList open={open} />
      </Drawer>
    </Box>
  );
}
export default AppLayout;
