import { Box, CircularProgress } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import { SwaggerClientContext, UserContext } from "../App";
import CreateReservationPanel from "../components/CreateReservationPanel";
import DateTimePicker from "../components/DateTimePicker";
import ParkingSpotOverview from "../components/ParkingSpotOverview";
import CustomSnackbar from "../components/CustomSnackBar";

function ParkingOverview() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const today = new Date();
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("AM");
  const halfDay = time === "AM" || time === "PM" ? true : false;
  const am = time === "AM" ? true : false;

  const [parkingSpots, setParkingSpots] = useState(null);
  const [availableParkingSpots, setAvailableParkingSpots] = useState(null);
  const [selectedParkingSpot, setSelectedParkingSpot] = useState(null);
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchParkingSpots(client),
      fetchParkingSpotAvailability(client, date, halfDay, am),
    ])
      .then(([parkingSpotsResult, availableParkingSpotsResult]) => {
        setParkingSpots(parkingSpotsResult?.parking_spots);
        setAvailableParkingSpots(
          availableParkingSpotsResult?.available_parking_spots
        );
        setLoading(false);
      })
      .catch(handleError);
  }, [client, date, time]);

  return (
    <Box overflow="hidden">
      <DateTimePicker
        today={today}
        date={date}
        time={time}
        setDate={setDate}
        setTime={setTime}
        setSelectedParkingSpot={setSelectedParkingSpot}
        setOpenPanel={setOpenPanel}
        setError={setError}
        handleClickSnack={handleClickSnack}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <ParkingSpotOverview
          parkingSpots={parkingSpots}
          availableParkingSpots={availableParkingSpots}
          selectedParkingSpot={selectedParkingSpot}
          setSelectedParkingSpot={setSelectedParkingSpot}
          setOpenPanel={setOpenPanel}
        />
      )}

      <CreateReservationPanel
        client={client}
        selectedParkingSpot={selectedParkingSpot}
        date={date}
        time={time}
        halfDay={halfDay}
        am={am}
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        setSelectedParkingSpot={setSelectedParkingSpot}
        setError={setError}
        setSuccess={setSuccess}
        handleClickSnack={handleClickSnack}
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
