import { useState, useContext, useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { UserContext } from "../App";
import fetchUserVehicles from "../api/fetchUserVehicles";
import createReservation from "../api/createReservation";
import fetchUser from "../api/fetchUser";
import car from "../assets/car.svg";
import { THEMECOLOR } from "../Constants";

function CreateReservationPanel({
  client,
  selectedParkingSpot,
  reservationDate,
  reservationTime,
  halfDay,
  am,
  openPanel,
  setOpenPanel,
  setSelectedParkingSpot,
  setError,
  setSuccess,
  handleClickSnack,
}) {
  const setUser = useContext(UserContext);

  const [profileUser, setProfileUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const selectedVehicle = vehicles?.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );

  const reservationDetails = [
    {
      label: "Reserve for",
      value: profileUser?.first_name + " " + profileUser?.last_name,
    },
    {
      label: "Date",
      value: format(reservationDate, "dd/MM/yyyy"),
    },
    {
      label: "Duration",
      value:
        reservationTime == "AM"
          ? "AM: 00:00-12:00"
          : reservationTime == "PM"
          ? " PM: 12:00-00:00"
          : "FD: 00:00-00:00",
    },
    {
      label: "Vehicle",
    },
  ];

  const vehicleDetails = [
    {
      label: "Manufacture",
      value: selectedVehicle?.make,
    },
    {
      label: "Model",
      value: selectedVehicle?.model,
    },
    {
      label: "Electric",
      value: selectedVehicle?.ev ? "Yes" : "No",
    },
    {
      label: "Plate number",
      value: selectedVehicle?.license_plate_number,
    },
  ];

  const handleClosePanel = () => {
    setOpenPanel(false);
    setSelectedParkingSpot(null);
  };

  const handleChange = (event) => {
    setSelectedVehicleId(event.target.value);
  };

  const handleClick = () => {
    createReservation(
      client,
      selectedParkingSpot?.id,
      profileUser?.id,
      selectedVehicleId,
      format(reservationDate, "yyyy-MM-dd").toString(),
      halfDay,
      am
    )
      .then(() => {
        setSuccess("Reservation was created");
        handleClickSnack();
        setOpenPanel(false);
      })
      .catch((e) => {
        if (e.message === "401") {
          setUser(null);
          handleClickSnack();
        } else if (e.message === "409") {
          setError("Conflict");
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
  };

  const handleError = (e) => {
    setLoading(false);
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "400") {
      setError("Oops something went wrong");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  useEffect(() => {
    Promise.all([fetchUserVehicles(client), fetchUser(client)])
      .then(([vehicles, user]) => {
        setVehicles(vehicles);
        setSelectedVehicleId(vehicles[0]?.id);
        setProfileUser(user);
        setLoading(false);
      })
      .catch(handleError);
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
          <Typography fontWeight="bold" color="text.secondary">
            Nr. {selectedParkingSpot?.number}
          </Typography>
          <Typography color="text.secondary">
            {selectedParkingSpot?.charger_available ? "EV " : "Standard "}
            Parking Space
          </Typography>
        </Box>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ px: 3 }}>
            <Box sx={{ pb: 4 }}>
              {reservationDetails.map((item) => (
                <Box key={item.label} sx={{ pt: 1 }}>
                  <Typography fontWeight="bold" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography color="text.secondary">{item.value}</Typography>
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
            <Typography
              fontWeight="bold"
              color="text.secondary"
              sx={{ pt: 4, pb: 1 }}
            >
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
                vehicleDetails.map((item) => (
                  <Box key={item.label} sx={{ pt: 1, pr: 4 }}>
                    <Typography fontWeight="bold" color="text.secondary">
                      {item.label}
                    </Typography>
                    <Typography color="text.secondary">{item.value}</Typography>
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
                onClick={() => handleClick()}
              >
                Reserve Space
              </Button>
            </Box>
          </Box>
        )}
      </List>
    </Drawer>
  );
}
export default CreateReservationPanel;
