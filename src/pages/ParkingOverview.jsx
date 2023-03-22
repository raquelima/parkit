import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { addWeeks } from "date-fns";
import logo from "../assets/adobe.png";

function ParkingOverview() {
  const today = new Date();
  const maxDate = addWeeks(today, 2);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState("AM");
  const buttons = ["AM", "PM", "FD"];

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
    console.log("please enter correct date");
  };

  return (
    <Box overflow="hidden">
      <Box display="flex" justifyItems="center">
        <Box display="inline-grid" justifyItems="center" margin="0 auto">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          minHeight="60vh"
          minWidth="90vh"
          sx={{ borderRadius: 2, backgroundColor: "rgba(145,158,171,0.12)" }}
        >
          <img width="80px" src={logo} />
        </Box>
      </Box>
    </Box>
  );
}

export default ParkingOverview;