import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { format } from "date-fns";
import car from "../assets/car.svg";

/**
 * A functional component that renders reservation details
 * @param {Object} selectedParkingSpot - The selected parking spot object
 * @param {Object} profileUser - The logged in user object
 * @param {Object} reservationDate - The reservation date object
 * @param {string} reservationTime - The reservation time
 * @param {Array} vehicles - An array with all user vehicles
 * @param {string} selectedVehicleId - The ID of the selected vehicle for the reservation
 * @param {Function} handleSetSelectedVehicleId - A handler function that sets the selectedVehicleId value when the user selects a vehicle
 * @returns {JSX.Element} The ReservationDetails component
 */
function ReservationDetails({
  selectedParkingSpot,
  profileUser,
  reservationDate,
  reservationTime,
  vehicles,
  selectedVehicleId,
  handleSetSelectedVehicleId,
}) {
  const reservationDetails = [
    {
      label: "Reserve for",
      value: profileUser?.first_name + " " + profileUser?.last_name,
    },
    {
      label: "Date",
      value: format(reservationDate, "dd/MM/yyyy"),
    },
    {
      label: "Duration",
      value:
        reservationTime == "AM"
          ? "AM: 00:00-12:00"
          : reservationTime == "PM"
          ? " PM: 12:00-00:00"
          : "FD: 00:00-00:00",
    },
    {
      label: "Vehicle",
    },
  ];
  return (
    <Box sx={{ pb: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: 2,
          pb: 1,
        }}
      >
        <img src={car} height="120px" />
        <Typography fontWeight="bold" color="text.secondary">
          Nr. {selectedParkingSpot?.number}
        </Typography>
        <Typography color="text.secondary">
          {selectedParkingSpot?.charger_available ? "EV " : "Standard "}
          Parking Space
        </Typography>
      </Box>
      {reservationDetails.map((item) => (
        <Box key={item.label} sx={{ pt: 1 }}>
          <Typography fontWeight="bold" color="text.secondary">
            {item.label}
          </Typography>
          <Typography color="text.secondary">{item.value}</Typography>
        </Box>
      ))}
      <FormControl sx={{ minWidth: 120 }} size="small">
        {vehicles && (
          <Select
            value={selectedVehicleId}
            onChange={handleSetSelectedVehicleId}
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.make + " " + vehicle.model}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}
export default ReservationDetails;
