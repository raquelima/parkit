import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import { THEMECOLOR } from "../Constants";
import CloseIcon from "@mui/icons-material/Close";
import createVehicle from "../api/createVehicle";

function CreateVehiclePanel({ client, openPanel, setOpenPanel }) {
  const [newVehicle, setNewVehicle] = useState({});
  const [ev, setEv] = useState(true);
  const labels = ["Manufacture", "Model", "Plate number"];
  const keys = ["make", "model", "licensePlateNumber"];

  const handleSaveInput = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    createVehicle(
      client,
      ev,
      newVehicle.licensePlateNumber,
      newVehicle.make,
      newVehicle.model
    )
      .then((result) => {
        fetchVehicles();
        setOpenPanel(false);
        setMessage(result?.response);
      })
      .catch((e) => {});
  };

  const handleToggle = (event, toggle) => {
    if (toggle !== null) {
      setEv(toggle);
    }
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
            onClick={() => setOpenPanel(false)}
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
            {labels.map((label, index) => (
              <Box key={keys[index]} sx={{ pt: 1 }}>
                <Typography>{label}</Typography>
                <TextField
                  size="small"
                  name={keys[index]}
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
          <Box sx={{ display: "flex", justifyContent: "center", pt: 55 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: THEMECOLOR,
                borderRadius: "4px",
                textTransform: "none",
              }}
              onClick={handleClick}
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
