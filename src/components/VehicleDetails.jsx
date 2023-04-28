import { Box, Typography } from "@mui/material";

/**
 * A functional component that renders the selected vehicle details
 * @param {Object} selectedVehicle - The selected vehicle object
 * @returns {JSX.Element} The VehicleDetails component
 */
function VehicleDetails({ selectedVehicle }) {
  const vehicleDetails = [
    {
      label: "Make",
      value: selectedVehicle?.make,
    },
    {
      label: "Model",
      value: selectedVehicle?.model,
    },
    {
      label: "Electric",
      value: selectedVehicle?.ev ? "Yes" : "No",
    },
    {
      label: "Plate nr.",
      value: selectedVehicle?.license_plate_number,
    },
  ];

  return (
    <Box>
      <Typography
        fontWeight="bold"
        color="text.secondary"
        sx={{ pt: 4, pb: 1 }}
      >
        Details
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {selectedVehicle &&
          vehicleDetails.map((item) => (
            <Box key={item.label} sx={{ pt: 1, pr: 4 }}>
              <Typography fontWeight="bold" color="text.secondary">
                {item.label}
              </Typography>
              <Typography color="text.secondary">{item.value}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}
export default VehicleDetails;
