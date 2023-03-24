import { useState, useContext, useEffect } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Drawer,
  List,
  Divider,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { UserContext } from "../App";
import fetchUserVehicles from "../api/fetchUserVehicles";
import createReservation from "../api/createReservation";
import fetchUser from "../api/fetchUser";
import { THEMECOLOR } from "../Constants";
import ReservationDetails from "./ReservationDetails";
import VehicleDetails from "./VehicleDetails";

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

        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ px: 3 }}>
            <ReservationDetails
              selectedParkingSpot={selectedParkingSpot}
              profileUser={profileUser}
              reservationDate={reservationDate}
              reservationTime={reservationTime}
              vehicles={vehicles}
              selectedVehicleId={selectedVehicleId}
              handleChange={handleChange}
            />
            <Divider />
            <VehicleDetails selectedVehicle={selectedVehicle} />
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
