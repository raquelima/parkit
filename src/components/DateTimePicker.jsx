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

/**
 * A functional component that renders the date and time pickers for the display of parking spots and creation of reservations
 * @param {Object} today - The current date and time object
 * @param {Object} reservationDate - The selected reservation date object
 * @param {string} reservationTime - The selected reservation time
 * @param {Function} setReservationDate - A function that sets the value of reservationDate
 * @param {Function} setReservationTime - A function that sets the value of reservationTime
 * @param {Function} setSelectedParkingSpot - A function that sets the value of selectedParkingSpot
 * @param {Function} setOpenPanel - A function that sets the value of openPanel
 * @param {Function} setError - A function that sets an error message
 * @param {Function} handleClickSnack - A function that displays a snackbar
 * @returns {JSX.Element} The DateTimePicker component
 */
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
  /**
   * When a date is selected the function checks whether the date is in the future and not more than two weeks in advance. It also closes the panel and unselects a selected parking spot.
   * @param {Object} newDate - The selected date object for the reservation
   */
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

  /**
   * Makes sure a toggle button is always selected when the a new value is selected and sets the new time in the state
   * @param {Event} event - An onChange event
   * @param {string} newTime
   */
  const handleTime = (event, newTime) => {
    //Enforce value set copy paste from MUI documentation
    if (newTime !== null) {
      setReservationTime(newTime);
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    }
  };

  /**
   * Displays a snackbar when a unvalid date was entered
   */
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
