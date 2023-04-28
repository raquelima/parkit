import { Box, Tooltip } from "@mui/material";
import EvStationIcon from "@mui/icons-material/EvStation";
import BlockIcon from "@mui/icons-material/Block";

/**
 * A functional component that renders a parking spot
 * @param {number} number - The parking spot number
 * @param {boolean} disabled - A boolean flag indicating whether the parking spot is disabled
 * @param {boolean} charger - A boolean flag indicating whether the parking spot offers an ev charger
 * @param {boolean} available - A boolean flag indicating whether the parking spot is available
 * @param {boolean} selected - A boolean flag indicating whether the parking spot is selected
 * @param {Function} onClick - A function that handles the selection of the parking spot
 * @returns {JSX.Element} The ParkingSpot component
 */
function ParkingSpot({
  number,
  disabled,
  charger,
  available,
  selected,
  onClick,
}) {
  const bgColor = disabled || !available ? "rgba(145,158,171,0.25)" : "#95DB9A";
  const cursor = disabled || !available ? "default" : "pointer";
  const border = selected ? "3px solid #3881D6" : 0;

  const handleSelect = () => {
    if (available && !disabled) {
      onClick();
    }
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          pb: "3px",
          mr: 2,
          mb: 2,
          bgcolor: bgColor,
          border: border,
          borderRadius: "9px",
          height: "100px",
          width: "75px",
          cursor: cursor,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
        onClick={handleSelect}
      >
        {charger ? (
          <Tooltip title="EV Charger">
            <EvStationIcon fontSize="large" sx={{ pt: 1, pl: "4px" }} />
          </Tooltip>
        ) : (
          <Box />
        )}
        {disabled ? (
          <Tooltip title="Unavailable">
            <BlockIcon color="error" fontSize="large" />
          </Tooltip>
        ) : (
          number
        )}
      </Box>
    </Box>
  );
}

export default ParkingSpot;
