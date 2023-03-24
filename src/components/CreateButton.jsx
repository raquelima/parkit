import { Box, Button } from "@mui/material";
import { THEMECOLOR } from "../Constants";

function CreateButton({ handleClick, text }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pt: 7 }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: THEMECOLOR,
          borderRadius: "4px",
          textTransform: "none",
        }}
        onClick={() => handleClick()}
      >
        {text}
      </Button>
    </Box>
  );
}
export default CreateButton;
