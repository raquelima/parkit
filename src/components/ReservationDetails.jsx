import { Box, Typography, Select, MenuItem, FormControl } from "@mui/material";
import { format } from "date-fns";
import car from "../assets/car.svg";

/**
 *
 * @param {*} selectedParkingSpot
 * @param {*} profileUser
 * @param {*} reservationDate
 * @param {*} reservationTime
 * @param {*} vehicles
 * @param {*} selectedVehicleId
 * @param {*} handleChange
 * @returns
 */
function ReservationDetails({
  selectedParkingSpot,
  profileUser,
  reservationDate,
  reservationTime,
  vehicles,
  selectedVehicleId,
  handleChange,
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
    <Box sx={{ pb: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 2,
        }}
      >
        <img src={car} height="150px" />
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
          <Select value={selectedVehicleId} onChange={handleChange}>
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
