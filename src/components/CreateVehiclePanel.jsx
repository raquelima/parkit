import { useState, useContext } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { UserContext } from "../App";
import createVehicle from "../api/createVehicle";
import { THEMECOLOR } from "../Constants";

function CreateVehiclePanel({
  client,
  openPanel,
  setOpenPanel,
  fetchVehicles,
  setError,
  setSuccess,
  handleClickSnack,
}) {
  const setUser = useContext(UserContext);

  const [newVehicle, setNewVehicle] = useState({});
  const [ev, setEv] = useState(true);

  const fields = [
    { label: "Manufacture", key: "make" },
    { label: "Model", key: "model" },
    { label: "Plate number", key: "licensePlateNumber" },
  ];

  const handleSaveInput = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };

  const handleError = (e) => {
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "409") {
      setError("Vehicle with the same plate number already exists");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  const handleClick = () => {
    createVehicle(
      client,
      ev,
      newVehicle.licensePlateNumber,
      newVehicle.make,
      newVehicle.model
    )
      .then(() => {
        fetchVehicles();
        setSuccess("Vehicle was created");
        handleClickSnack();
        setOpenPanel(false);
      })
      .catch(handleError);
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
          <Typography color="white">Add Vehicle</Typography>
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
