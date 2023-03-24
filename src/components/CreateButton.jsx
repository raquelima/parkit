import { Box, Button } from "@mui/material";
import { THEMECOLOR } from "../Constants";

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
