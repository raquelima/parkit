import {
  Box,
  Typography,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

/**
 *
 * @param {*} handleSaveInput
 * @param {*} ev
 * @param {*} handleToggle
 * @returns
 */
function CreateVehicleInput({ handleSaveInput, ev, handleToggle }) {
  const fields = [
    { label: "Manufacture", key: "make" },
    { label: "Model", key: "model" },
    { label: "Plate number", key: "licensePlateNumber" },
  ];

  return (
    <Box sx={{ pb: 4 }}>
      <Typography fontWeight="bold" sx={{ pt: 4, pb: 1 }}>
        New vehicle
      </Typography>
      {fields.map((field) => (
        <Box key={field.key} sx={{ pt: 1 }}>
          <Typography>{field.label}</Typography>
          <TextField
            size="small"
            name={field.key}
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
          onChange={handleToggle}
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
export default CreateVehicleInput;
