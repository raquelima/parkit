import { Box, Tooltip } from "@mui/material";
import EvStationIcon from "@mui/icons-material/EvStation";
import WarningIcon from "@mui/icons-material/Warning";

function ParkingSpot({ number, disabled, charger, available }) {
  const bgColor = disabled || !available ? "rgba(145,158,171,0.25)" : "#95DB9A";
  const cursor = disabled || !available ? "false" : "pointer";
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {charger && (
        <Tooltip title="EV Charger">
          <EvStationIcon fontSize="large" />
        </Tooltip>
      )}
      <Box
        sx={{
          bgcolor: bgColor,
          pb: "3px",
          mr: 2,
          mb: 2,
          borderRadius: "9px",
          height: "100px",
          width: "75px",
          cursor: cursor,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {disabled ? (
          <Tooltip title="Unavailable">
            <WarningIcon color="error" fontSize="large" />
          </Tooltip>
        ) : (
          number
        )}
      </Box>
    </Box>
  );
}

export default ParkingSpot;
