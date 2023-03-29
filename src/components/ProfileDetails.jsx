import { Box, Typography } from "@mui/material";
import profileImage from "../assets/profileImage.svg";

/**
 * A functional component that renders profile details
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @param {number} totalVehicles - The total number of vehicles
 * @param {number} totalReservations - The total number of reservations
 * @returns {JSX.Element} The ProfileDetails component
 */
function ProfileDetails({ user, totalVehicles, totalReservations }) {
  const userDetails = [
    { label: "Email", value: user?.email },
    { label: "Username", value: user?.username },
    { label: "Preferred language", value: user?.preferred_language },
  ];

  const totalDetails = [
    { label: "Total vehicles:", value: totalVehicles },
    { label: "Total reservations:", value: totalReservations },
  ];
  return (
    <Box>
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
          {userDetails.map((item) => (
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
    </Box>
  );
}
export default ProfileDetails;
