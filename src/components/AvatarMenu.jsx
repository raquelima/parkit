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

function AvatarMenu({
  profileUser,
  handleOpenMenu,
  open,
  anchorEl,
  handleClose,
  setOpenPanel,
  logout,
}) {
  return (
    <Box>
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
