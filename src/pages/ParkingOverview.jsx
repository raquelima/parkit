import { useState, useEffect, useContext } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { SwaggerClientContext, UserContext } from "../App";
import CreateReservationPanel from "../components/CreateReservationPanel";
import DateTimePicker from "../components/DateTimePicker";
import ParkingSpotOverview from "../components/ParkingSpotOverview";
import CustomSnackbar from "../components/CustomSnackBar";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import { THEMECOLOR } from "../Constants";

function ParkingOverview() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const today = new Date();
  const [reservationDate, setReservationDate] = useState(today);
  const [reservationTime, setReservationTime] = useState("AM");
  const halfDay =
    reservationTime === "AM" || reservationTime === "PM" ? true : false;
  const am = reservationTime === "AM" ? true : false;

  const [parkingSpots, setParkingSpots] = useState(null);
  const [availableParkingSpots, setAvailableParkingSpots] = useState(null);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openPanel, setOpenPanel] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackbar(true);
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

  const fetchAvailableParkingSpots = () => {
    fetchParkingSpotAvailability(client, reservationDate, halfDay, am)
      .then((result) => {
        setAvailableParkingSpots(result?.available_parking_spots);
        setLoading(false);
      })
      .catch(handleError);
  };

  useEffect(() => {
    Promise.all([
      fetchParkingSpots(client),
      fetchParkingSpotAvailability(client, reservationDate, halfDay, am),
    ])
      .then(([parkingSpotsResult, availableParkingSpotsResult]) => {
        setParkingSpots(parkingSpotsResult?.parking_spots);
        setAvailableParkingSpots(
          availableParkingSpotsResult?.available_parking_spots
        );
        setLoading(false);
      })
      .catch(handleError);
  }, [client, reservationDate, reservationTime]);

  return (
    <Box overflow="hidden">
      <DateTimePicker
        today={today}
        reservationDate={reservationDate}
        reservationTime={reservationTime}
        setReservationDate={setReservationDate}
        setReservationTime={setReservationTime}
        setSelectedParkingSpot={setSelectedParkingSpot}
        setOpenPanel={setOpenPanel}
        setError={setError}
        handleClickSnack={handleClickSnack}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Typography fontWeight="bold" color={THEMECOLOR}>
            Parking Overview
          </Typography>
          <ParkingSpotOverview
            parkingSpots={parkingSpots}
            availableParkingSpots={availableParkingSpots}
            selectedParkingSpot={selectedParkingSpot}
            setSelectedParkingSpot={setSelectedParkingSpot}
            setOpenPanel={setOpenPanel}
          />
        </Box>
      )}

      <CreateReservationPanel
        client={client}
        selectedParkingSpot={selectedParkingSpot}
        reservationDate={reservationDate}
        reservationTime={reservationTime}
        halfDay={halfDay}
        am={am}
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        setSelectedParkingSpot={setSelectedParkingSpot}
        setError={setError}
        setSuccess={setSuccess}
        handleClickSnack={handleClickSnack}
        fetchAvailableParkingSpots={fetchAvailableParkingSpots}
      />
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />
    </Box>
  );
}

export default ParkingOverview;
