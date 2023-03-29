import { useState, useContext, useEffect } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { SwaggerClientContext, UserContext } from "../App";
import ProfilePanel from "./ProfilePanel";
import AvatarMenu from "./AvatarMenu";
import AutoHidingSnackbar from "./AutoHidingSnackbar";
import fetchUser from "../api/fetchUser";
import fetchUserVehicles from "../api/fetchUserVehicles";
import fetchUserReservations from "../api/fetchUserReservations";
import { THEME_COLOR } from "../Constants";
import { DRAWER_WIDTH } from "../Constants";

/**
 * A functional component that renders a MUI AppBar component representing the top bar
 * @returns {JSX.Element} The TopBar component
 */
function TopBar() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [profileUser, setProfileUser] = useState(null);
  const [totalVehicles, setTotalVehicles] = useState(null);
  const [totalReservations, setTotalReservations] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [openPanel, setOpenPanel] = useState(false);

  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  /**
   * Sets the anchor element to open the menu
   * @param {Event} event - The event object
   */
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Sets the anchor element to null to close the menu
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  /**
   * Displays Snackbar
   */
  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  /**
   * Handles the error
   * @param {Object} e - An error object
   */
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

  //Logs out the user by clearing Local Storage a triggering a rerender
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
        setTotalVehicles(vehicles?.length);
        setTotalReservations(reservations?.length);
      })
      .catch(handleError);
  }, [client, setUser]);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        ml: `${DRAWER_WIDTH}px`,
        backgroundColor: THEME_COLOR,
      }}
    >
      <Toolbar
        variant="dense"
        sx={{ justifyContent: "flex-end", minHeight: 44 }}
      >
        <AvatarMenu
          profileUser={profileUser}
          openMenu={openMenu}
          handleOpenMenu={handleOpenMenu}
          handleCloseMenu={handleCloseMenu}
          anchorEl={anchorEl}
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
      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity="error"
        message={error}
      />
    </AppBar>
  );
}

export default TopBar;
