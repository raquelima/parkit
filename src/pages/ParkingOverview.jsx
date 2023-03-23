import { Box, CircularProgress } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import { SwaggerClientContext } from "../App";
import CreateReservationPanel from "../components/CreateReservationPanel";
import DateTimePicker from "../components/DateTimePicker";
import ParkingSpotOverview from "../components/ParkingSpotOverview";
import useRequestExecutor from "../hooks/useRequestExecutor";

function ParkingOverview() {
  const client = useContext(SwaggerClientContext);

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

  useRequestExecutor(
    client,
    () => fetchParkingSpots(client),
    (result) => {
      setParkingSpots(result?.parking_spots);
      setLoading(false);
    }
  );

  useRequestExecutor(
    client,
    () => fetchParkingSpotAvailability(client, date, halfDay, am),
    (result) => {
      setAvailableParkingSpots(result?.available_parking_spots);
      setLoading(false);
    }
  );

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
