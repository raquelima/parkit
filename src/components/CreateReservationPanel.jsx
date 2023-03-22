import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { THEMECOLOR } from "../Constants";
import CloseIcon from "@mui/icons-material/Close";
import car from "../assets/car.svg";
import { format } from "date-fns";
import fetchUserVehicles from "../api/fetchUserVehicles";

function CreateReservationPanel({
  client,
  selectedParkingSpot,
  date,
  time,
  openPanel,
  setOpenPanel,
  setSelectedParkingSpot,
}) {
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const selectedVehicle = vehicles?.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );

  const reservationLabels = ["Reserve for", "Date", "Duration", "Vehicle"];
  const reservationDetails = ["Raquel Lima", format(date, "dd/MM/yyyy"), time];

  const vehicleLabels = ["Manufacture", "Model", "Electric", "Plate number"];
  const vehicleDetails = [
    selectedVehicle?.make,
    selectedVehicle?.model,
    selectedVehicle?.ev ? "Yes" : "No",
    selectedVehicle?.license_plate_number,
  ];

  const handleClosePanel = () => {
    setOpenPanel(false);
    setSelectedParkingSpot(null);
  };

  const handleChange = (event) => {
    setSelectedVehicleId(event.target.value);
  };

  useEffect(() => {
    fetchUserVehicles(client).then((result) => {
      setVehicles(result?.vehicles);
      setSelectedVehicleId(result?.vehicles[0].id);
    });
  }, [client]);

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
          <Typography color="white">Create Reservation</Typography>
          <IconButton
            aria-label="close panel"
            onClick={handleClosePanel}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 2,
          }}
        >
          <img src={car} height="150px" />
          <Typography>Nr. {selectedParkingSpot?.number}</Typography>
          <Typography>
            {selectedParkingSpot?.charger_available ? "EV " : "Standard "}
            Parking Space
          </Typography>
        </Box>
        <Box sx={{ px: 3 }}>
          <Box sx={{ pb: 4 }}>
            {reservationLabels.map((label, index) => (
              <Box key={label} sx={{ pt: 1 }}>
                <Typography fontWeight="bold">{label}</Typography>
                <Typography>{reservationDetails[index]}</Typography>
              </Box>
            ))}
            <FormControl sx={{ minWidth: 120 }} size="small">
              {vehicles && (
                <Select value={selectedVehicleId} onChange={handleChange}>
                  {vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.make + " " + vehicle.model}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>
          <Divider />
          <Typography fontWeight="bold" sx={{ pt: 4, pb: 1 }}>
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
              vehicleLabels.map((label, index) => (
                <Box key={label} sx={{ pt: 1, pr: 4 }}>
                  <Typography fontWeight="bold">{label}</Typography>
                  <Typography>{vehicleDetails[index]}</Typography>
                </Box>
              ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", pt: 7 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: THEMECOLOR,
                borderRadius: "4px",
                textTransform: "none",
              }}
            >
              Reserve Space
            </Button>
          </Box>
        </Box>
      </List>
    </Drawer>
  );
}
export default CreateReservationPanel;
