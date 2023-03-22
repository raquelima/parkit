import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  Button,
  TextField,
} from "@mui/material";
import { THEMECOLOR } from "../Constants";
import CloseIcon from "@mui/icons-material/Close";

function CreateVehiclePanel({ openPanel, setOpenPanel }) {
  const labels = ["Manufacture", "Model", "Plate number", "Electric"];

  const handleClosePanel = () => {
    setOpenPanel(false);
  };

  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
        },
      }}
      variant="persistent"
      anchor="right"
      open={openPanel}
    >
      <List disablePadding>
        <Toolbar
          variant="dense"
          sx={{
            minHeight: 44,
            backgroundColor: THEMECOLOR,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography color="white">Create Vehicle</Typography>
          <IconButton
            aria-label="close panel"
            onClick={handleClosePanel}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box sx={{ px: 3 }}>
          <Box sx={{ pb: 4 }}>
            <Typography fontWeight="bold" sx={{ pt: 4, pb: 1 }}>
              New vehicle
            </Typography>
            {labels.map((label) => (
              <Box key={label} sx={{ pt: 1 }}>
                <Typography>{label}</Typography>
                <TextField size="small" fullWidth />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 55 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: THEMECOLOR,
                borderRadius: "4px",
                textTransform: "none",
              }}
              onClick={() => handleClick()}
            >
              Add vehicle
            </Button>
          </Box>
        </Box>
      </List>
    </Drawer>
  );
}
export default CreateVehiclePanel;
