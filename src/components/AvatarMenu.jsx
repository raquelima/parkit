import {
  IconButton,
  Avatar,
  MenuItem,
  Menu,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import profileImage from "../assets/profileImage.svg";

/**
 * A functional component that renders a MUI Menu with Profile and Logout options
 * @param {Object} profileUser - The logged in user object
 * @param {boolean} openMenu - A boolean flag indicating whether the Snackbar should be displayed
 * @param {Function} handleOpenMenu - The handler function that sets the value of anchorEl
 * @param {Function} handleCloseMenu - The handler function that sets the value of anchorEl to null
 * @param {HTMLElement} anchorEl - An HTML element that is used to set the position of the menu.
 * @param {Function} setOpenPanel - A function that sets the value of the profile panel
 * @param {Function} logout - A function that logs out the user
 * @returns {JSX.Element} The AvatarMenu component
 */
function AvatarMenu({
  profileUser,
  openMenu,
  handleOpenMenu,
  handleCloseMenu,
  anchorEl,
  setOpenPanel,
  logout,
}) {
  return (
    <Box>
      <IconButton
        onClick={handleOpenMenu}
        aria-controls={openMenu ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
      >
        <Avatar
          src={profileImage}
          sx={{
            width: "30px",
            height: "30px",
          }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={openMenu}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
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
          {profileUser?.first_name + " " + profileUser?.last_name}
        </Typography>
        <Typography sx={{ pr: 6, pl: 2, pb: 1 }}>
          {profileUser?.username}
        </Typography>
        <Divider />
        <MenuItem onClick={() => setOpenPanel(true)}>Profile</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default AvatarMenu;
