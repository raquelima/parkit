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

function TopBar({ setUser }) {
  const client = useContext(SwaggerClientContext);
  const [profileUser, setProfileUser] = useState(null);
  const [totalVehicles, setTotalVehicles] = useState(null);
  const [totalReservations, setTotalReservations] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  const open = Boolean(anchorEl);

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
    fetchUser(client).then((result) => {
      setProfileUser(result?.user);
    });
    fetchUserVehicles(client).then((result) => {
      setTotalVehicles(result?.vehicles?.length);
    });
    fetchUserReservations(client).then((result) => {
      setTotalReservations(result?.reservations?.length);
    });
  }, [client]);

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
    </AppBar>
  );
}

export default TopBar;
