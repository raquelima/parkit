import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect, useContext } from "react";
import { addWeeks } from "date-fns";
import logo from "../assets/adobe.png";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import { SwaggerClientContext } from "../App";
import ParkingSpot from "../components/ParkingSpot";

function ParkingOverview() {
  const today = new Date();
  const maxDate = addWeeks(today, 2);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("AM");
  const buttons = ["AM", "PM", "FD"];

  const client = useContext(SwaggerClientContext);
  const [parkingSpots, setParkingSpots] = useState(null);
  const [availableParkingSpots, setAvailableParkingSpots] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDate = (newDate) => {
    setDate(newDate);
  };
  const handleTime = (event, newTime) => {
    //Enforce value set copy paste from MUI
    if (newTime !== null) {
      setTime(newTime);
    }
  };

  const handleError = () => {
    //replace
    console.log("please enter correct date");
  };

  //takes available spots array and checks if current spot id is in the array, if yes returns true
  const checkAvailability = (availableParkingSpotsArray, parkingSpotId) => {
    return availableParkingSpotsArray?.some(
      (availableParkingSpot) => availableParkingSpot.id == parkingSpotId
    );
  };

  useEffect(() => {
    fetchParkingSpots(client).then((result) => {
      setParkingSpots(result?.parkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
    });
    fetchParkingSpotAvailability(client, date, time).then((result) => {
      setAvailableParkingSpots(result?.availableParkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
    });
  }, [client, date, time]);

  return (
    <Box overflow="hidden">
      <Box display="flex" justifyItems="center">
        <Box display="inline-grid" justifyItems="center" margin="0 auto">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {/*add warning for invalid date input*/}
            <DatePicker
              sx={{ mt: 1 }}
              label="Date"
              format="dd/MM/yyyy"
              disablePast={true}
              maxDate={maxDate}
              value={date}
              onChange={handleDate}
              onError={handleError}
            />
          </LocalizationProvider>
          <ToggleButtonGroup
            sx={{ pt: 1 }}
            size="small"
            exclusive
            value={time}
            onChange={handleTime}
          >
            {buttons.map((time) => (
              <ToggleButton key={time} value={time} aria-label={time}>
                {time}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
        sx={{
          border: 2,
          borderColor: "rgba(112,112,112,0.14)",
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Box
          minHeight="55vh"
          minWidth="80vh"
          sx={{ borderRadius: 2, backgroundColor: "rgba(145,158,171,0.12)" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              pt: 4,
            }}
          >
            <img width="80px" src={logo} />
          </Box>
          <Box sx={{ pl: 14, pt: 2 }}>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              {parkingSpots?.slice(0, 2).map((parkingSpot) => (
                <ParkingSpot
                  key={parkingSpot.id}
                  number={parkingSpot.number}
                  disabled={parkingSpot.unavailable}
                  charger={parkingSpot.charger_available}
                  available={checkAvailability(
                    availableParkingSpots,
                    parkingSpot.id
                  )}
                />
              ))}
            </Box>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end" }}
            >
              {parkingSpots?.slice(2).map((parkingSpot) => (
                <ParkingSpot
                  key={parkingSpot.id}
                  number={parkingSpot.number}
                  disabled={parkingSpot.unavailable}
                  availableParkingSpots={availableParkingSpots}
                  charger={parkingSpot.charger_available}
                  available={checkAvailability(
                    availableParkingSpots,
                    parkingSpot.id
                  )}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ParkingOverview;
