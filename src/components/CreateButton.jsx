import { Box, Button } from "@mui/material";
import { THEME_COLOR } from "../Constants";

/**
 * A functional component that renders a MUI Button
 * @param {Function} handleClick - The function that the Button should execute
 * @param {string} btnText - The text to be displayed on the Button
 * @param {Object} sx - The custom styles for the Box component
 * @returns {JSX.Element} The CreateButton component
 */
function CreateButton({ handleClick, btnText, sx }) {
  return (
    <Box sx={sx}>
      <Button
        variant="contained"
        type="submit"
        sx={{
          backgroundColor: THEME_COLOR,
          borderRadius: "4px",
          textTransform: "none",
        }}
        onClick={handleClick}
      >
        {btnText}
      </Button>
    </Box>
  );
}
export default CreateButton;
