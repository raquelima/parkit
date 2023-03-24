import {
  IconButton,
  Avatar,
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  Divider,
  Typography,
} from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { THEMECOLOR } from "../Constants";
import { DRAWERWIDTH } from "../Constants";
import profileImage from "../assets/profileImage.svg";
import ProfilePanel from "./ProfilePanel";
import fetchUser from "../api/fetchUser";
import { SwaggerClientContext } from "../App";
import fetchUserVehicles from "../api/fetchUserVehicles";
import fetchUserReservations from "../api/fetchUserReservations";
import { UserContext } from "../App";
import CustomSnackbar from "./CustomSnackBar";

function TopBar() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);
  const [profileUser, setProfileUser] = useState(null);
  const [totalVehicles, setTotalVehicles] = useState(null);
  const [totalReservations, setTotalReservations] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  const open = Boolean(anchorEl);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  const handleError = (e) => {
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "400") {
      setError("Oops something went wrong");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    Promise.all([
      fetchUser(client),
      fetchUserVehicles(client),
      fetchUserReservations(client),
    ])
      .then(([user, vehicles, reservations]) => {
        setProfileUser(user);
        setTotalVehicles(vehicles.length);
        setTotalReservations(reservations.length);
      })
      .catch(handleError);
  }, [client, setUser]);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWERWIDTH}px)`,
        ml: `${DRAWERWIDTH}px`,
        backgroundColor: THEMECOLOR,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ justifyContent: "flex-end", minHeight: 44 }}
      >
        <IconButton
          onClick={handleOpenMenu}
          aria-controls={open ? "profile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            src={profileImage}
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            borderRadius: "13px",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography fontWeight="bold" variant="h6" sx={{ pr: 6, pl: 2 }}>
          Raquel Lima
        </Typography>
        <Typography sx={{ pr: 6, pl: 2, pb: 1 }}>lima@adobe.com</Typography>
        <Divider />
        <MenuItem onClick={() => setOpenPanel(true)}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      <ProfilePanel
        user={profileUser}
        totalVehicles={totalVehicles}
        totalReservations={totalReservations}
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
      />
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity="error"
        message={error}
      />
    </AppBar>
  );
}

export default TopBar;
