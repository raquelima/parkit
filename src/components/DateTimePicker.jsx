import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addWeeks } from "date-fns";

function DateTimePicker({
  today,
  date,
  time,
  setDate,
  setTime,
  setSelectedParkingSpot,
  setOpenPanel,
}) {
  const maxDate = addWeeks(today, 2);
  const buttons = ["AM", "PM", "FD"];

  const handleDate = (newDate) => {
    setDate(newDate);
    setSelectedParkingSpot(null);
    setOpenPanel(false);
  };

  const handleTime = (event, newTime) => {
    //Enforce value set copy paste from MUI
    if (newTime !== null) {
      setTime(newTime);
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    }
  };

  const handleError = () => {
    //replace
    console.log("please enter correct date");
  };

  return (
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
  );
}

export default DateTimePicker;
