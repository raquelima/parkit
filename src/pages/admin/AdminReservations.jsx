import { useContext, useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { SwaggerClientContext, UserContext } from "../../App";
import { format } from "date-fns";
import Table from "../../components/Table";
import AutoHidingSnackbar from "../../components/AutoHidingSnackbar";
import fetchParkingSpots from "../../api/fetchParkingSpots";
import fetchAllReservations from "../../api/fetchAllReservations";
import getParkingSpotNumber from "../../utils/getParkingSpotNumberById";

/**
 * This a functional component that renders the admin reservations page
 * @returns {JSX.Element} The Admin Reservations component
 */
function AdminReservations() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [reservations, setReservations] = useState(null);
  console.log(reservations);

  const [parkingSpots, setParkingSpots] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //Display snackbar
  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  /**
   * Handles errors according to the error status
   * @param {Object} e An error object
   */
  const handleError = (e) => {
    setLoading(false);
    if (e.message === "401") {
      setUser(null);
    } else if (e.message === "400") {
      setError("Oops something went wrong");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  /**
   * Fetches user reservations
   */
  const fetchReservations = () => {
    fetchAllReservations(client)
      .then((result) => {
        setReservations(result);
        setLoading(false);
      })
      .catch(handleError);
  };

  const billingColumns = [
    {
      field: "user",
      headerName: "User",
      flex: 1,
      width: 200,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        `${format(new Date(reservation.row.start_time), "HH:mm")} - ${format(
          new Date(reservation.row.end_time),
          "HH:mm"
        )}`,
    },
    {
      field: "parkingSpotNumber",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        getParkingSpotNumber(parkingSpots, reservations.row.parking_spot_id),
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        reservations.row.vehicle?.license_plate_number,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      sortable: false,
      width: 200,
    },
  ];

  useEffect(() => {
    fetchReservations();
    fetchParkingSpots(client)
      .then((result) => {
        setParkingSpots(result?.parking_spots);
        setLoading(false);
      })
      .catch(handleError);
  }, [client]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Admin Reservations</Typography>
      </Box>

      <Box>
        {loading ? (
          <CircularProgress />
        ) : reservations?.length ? (
          <Table data={reservations} columns={billingColumns} admin={true} />
        ) : (
          <Alert sx={{ mt: 3 }} severity="info">
            You have no upcoming reservations
          </Alert>
        )}
      </Box>

      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error}
      />
    </Box>
  );
}

export default AdminReservations;
