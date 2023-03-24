import { Box, CircularProgress } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import { SwaggerClientContext, UserContext } from "../App";
import CreateReservationPanel from "../components/CreateReservationPanel";
import DateTimePicker from "../components/DateTimePicker";
import ParkingSpotOverview from "../components/ParkingSpotOverview";

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
  const [openPanel, setOpenPanel] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkingSpots(client)
      .then((result) => {
        setParkingSpots(result?.parking_spots);
        setLoading(false);
      })
      .catch((e) => {
        if (e.message === "401") {
          setUser(null);
        }
        if (e.message === "409") {
        }
        if (e.message === "500") {
        }
      });

    fetchParkingSpotAvailability(client, date, halfDay, am)
      .then((result) => {
        setAvailableParkingSpots(result?.available_parking_spots);
        setLoading(false);
      })
      .catch((e) => {
        if (e.message === "401") {
          setUser(null);
        }
        if (e.message === "409") {
        }
        if (e.message === "500") {
        }
      });
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
      />
    </Box>
  );
}

export default ParkingOverview;
