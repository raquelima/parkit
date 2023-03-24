import { useState, useContext, useEffect } from "react";
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
import { SwaggerClientContext, UserContext } from "../App";
import ProfilePanel from "./ProfilePanel";
import CustomSnackbar from "./CustomSnackBar";
import fetchUser from "../api/fetchUser";
import fetchUserVehicles from "../api/fetchUserVehicles";
import fetchUserReservations from "../api/fetchUserReservations";
import profileImage from "../assets/profileImage.svg";
import { THEMECOLOR } from "../Constants";
import { DRAWERWIDTH } from "../Constants";
import AvatarMenu from "./AvatarMenu";

function TopBar() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [profileUser, setProfileUser] = useState(null);
  const [totalVehicles, setTotalVehicles] = useState(null);
  const [totalReservations, setTotalReservations] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openPanel, setOpenPanel] = useState(false);

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <AvatarMenu
          profileUser={profileUser}
          handleOpenMenu={handleOpenMenu}
          open={open}
          anchorEl={anchorEl}
          handleClose={handleClose}
          setOpenPanel={setOpenPanel}
          logout={logout}
        />
      </Toolbar>

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
