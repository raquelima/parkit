import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addWeeks } from "date-fns";

function DateTimePicker({
  today,
  reservationDate,
  reservationTime,
  setReservationDate,
  setReservationTime,
  setSelectedParkingSpot,
  setOpenPanel,
  setError,
  handleClickSnack,
}) {
  const maxDate = addWeeks(today, 2);
  const buttons = [
    { label: "AM", tooltip: "00:00 - 12:00" },
    { label: "PM", tooltip: "12:00 - 00:00" },
    { label: "FD", tooltip: "00:00 - 00:00" },
  ];

  const handleDate = (newDate) => {
    if (today <= newDate && newDate <= maxDate) {
      setReservationDate(newDate);
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    } else {
      setReservationDate(today);
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    }
  };

  const handleTime = (event, newTime) => {
    //Enforce value set copy paste from MUI
    if (newTime !== null) {
      setReservationTime(newTime);
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    }
  };

  const handleError = () => {
    setError("Enter valid date");
    handleClickSnack();
  };

  return (
    <Box display="flex" justifyItems="center">
      <Box display="inline-grid" justifyItems="center" margin="0 auto">
        <Typography variant="subtitle2" color="text.secondary">
          Select a date and time
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            sx={{ mt: 1 }}
            format="dd/MM/yyyy"
            disablePast={true}
            maxDate={maxDate}
            value={reservationDate}
            onChange={handleDate}
            onError={handleError}
          />
        </LocalizationProvider>
        <ToggleButtonGroup
          sx={{ pt: 1 }}
          size="small"
          exclusive
          value={reservationTime}
          onChange={handleTime}
        >
          {buttons.map((button) => (
            <ToggleButton
              key={button.label}
              value={button.label}
              aria-label={button.label}
            >
              <Tooltip key={button.label} title={button.tooltip} arrow>
                <span>{button.label}</span>
              </Tooltip>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}

export default DateTimePicker;
