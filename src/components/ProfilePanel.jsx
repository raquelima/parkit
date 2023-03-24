import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import profileImage from "../assets/profileImage.svg";
import { THEMECOLOR } from "../Constants";

function ProfilePanel({
  user,
  totalVehicles,
  totalReservations,
  openPanel,
  setOpenPanel,
}) {
  const profileDetails = [
    { label: "Email", value: user?.email },
    { label: "Username", value: user?.username },
    { label: "Preferred language", value: user?.preferred_language },
  ];

  const totalDetails = [
    { label: "Total vehicles:", value: totalVehicles },
    { label: "Total reservations:", value: totalReservations },
  ];

  const handleClosePanel = () => {
    setOpenPanel(false);
  };

  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
        },
      }}
      variant="persistent"
      anchor="right"
      open={openPanel}
    >
      <List disablePadding>
        <Toolbar
          variant="dense"
          sx={{
            minHeight: 44,
            backgroundColor: THEMECOLOR,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography color="white">Profile</Typography>
          <IconButton
            aria-label="close panel"
            onClick={handleClosePanel}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: 3,
          }}
        >
          <img src={profileImage} height="150px" />
          <Typography sx={{ pt: 1 }}>
            {user?.first_name + " " + user?.last_name}
          </Typography>
        </Box>
        <Box sx={{ px: 3 }}>
          <Box sx={{ pb: 4 }}>
            {profileDetails.map((item) => (
              <Box key={item.label} sx={{ pt: 1 }}>
                <Typography fontWeight="bold">{item.label}</Typography>
                <Typography>{item.value}</Typography>
              </Box>
            ))}
            {totalDetails.map((item) => (
              <Box key={item.label} sx={{ pt: 1, display: "flex" }}>
                <Typography fontWeight="bold" sx={{ pr: 1 }}>
                  {item.label}
                </Typography>
                <Typography>{item.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </List>
    </Drawer>
  );
}
export default ProfilePanel;
