import { Box } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import fetchVehicles from "../api/fetchUserVehicles";
import { SwaggerClientContext } from "../App";
import CreateReservationPanel from "../components/CreateReservationPanel";
import DateTimePicker from "../components/DateTimePicker";
import ParkingSpotOverview from "../components/ParkingSpotOverview";

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

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParkingSpots(client).then((result) => {
      setParkingSpots(result?.parkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
    });
    fetchParkingSpotAvailability(client, date, halfDay, am).then((result) => {
      setAvailableParkingSpots(result?.availableParkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
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
      <ParkingSpotOverview
        parkingSpots={parkingSpots}
        availableParkingSpots={availableParkingSpots}
        selectedParkingSpot={selectedParkingSpot}
        setSelectedParkingSpot={setSelectedParkingSpot}
        setOpenPanel={setOpenPanel}
      />
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
