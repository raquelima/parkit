import { Box, Button } from "@mui/material";
import { THEMECOLOR } from "../Constants";

/**
 *
 * @param {Function} handleClick
 * @param {string} btnText
 * @param {Object} sx
 * @returns
 */
function CreateButton({ handleClick, btnText, sx }) {
  return (
    <Box sx={sx}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: THEMECOLOR,
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
