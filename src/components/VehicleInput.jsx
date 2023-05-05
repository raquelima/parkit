import {
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

/**
 * A functional component that renders MUI Textfield for the input of vehicle details
 * @param {Function} handleSaveInput - A handler function that saves the user input
 * @param {boolean} ev - A boolean flag indicating whether the vehicle is electric
 * @param {Function} handleToggleSelection - A handler function that handles the selection of the time toggle buttons
 * @param {Object} vehicle - The vehicle to be edited
 * @returns {JSX.Element} The CreateVehicleInput component
 */
function VehicleInput({ handleSaveInput, ev, handleToggleSelection, vehicle }) {
  const fields = [
    { label: "Manufacture", key: "make" },
    { label: "Model", key: "model" },
    { label: "Plate number", key: "license_plate_number" },
  ];

  return (
    <Box sx={{ pb: 4, mt: 2 }}>
      {fields.map((field) => (
        <Box key={field.key} sx={{ pt: 1 }}>
          <Typography>{field.label}</Typography>
          <TextField
            size="small"
            name={field.key}
            value={vehicle ? vehicle[field.key] : ""}
            onChange={handleSaveInput}
            fullWidth
          />
        </Box>
      ))}
      <Box sx={{ pt: 1 }}>
        <Typography>Electric</Typography>
        <ToggleButtonGroup
          sx={{ pt: 1 }}
          size="small"
          name="ev"
          exclusive
          value={ev}
          onChange={handleToggleSelection}
          width={""}
        >
          <ToggleButton value={true} name="ev">
            Yes
          </ToggleButton>
          <ToggleButton value={false} name="ev">
            No
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}
export default VehicleInput;
