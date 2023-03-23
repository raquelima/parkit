import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
} from "@mui/material";
import { THEMECOLOR } from "../Constants";
import CloseIcon from "@mui/icons-material/Close";
import profileImage from "../assets/profileImage.svg";

function ProfilePanel({
  user,
  totalVehicles,
  totalReservations,
  openPanel,
  setOpenPanel,
}) {
  const profileLabels = ["Email", "Username", "Preferred language"];

  const profileDetails = [
    user?.email,
    user?.username,
    user?.preferred_language,
  ];

  const totalLabels = ["Total vehicles:", "Total reservations:"];

  const totalDetails = [totalVehicles, totalReservations];

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
            {profileLabels.map((label, index) => (
              <Box key={label} sx={{ pt: 1 }}>
                <Typography fontWeight="bold">{label}</Typography>
                <Typography>{profileDetails[index]}</Typography>
              </Box>
            ))}
            {totalLabels.map((label, index) => (
              <Box key={label} sx={{ pt: 1, display: "flex" }}>
                <Typography fontWeight="bold" sx={{ pr: 1 }}>
                  {label}
                </Typography>
                <Typography>{totalDetails[index]}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </List>
    </Drawer>
  );
}
export default ProfilePanel;
