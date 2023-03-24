import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { SwaggerClientContext, UserContext } from "../App";
import StatusChip from "../components/StatusChip";
import Table from "../components/Table";
import CreateButton from "../components/CreateButton";
import CustomSnackbar from "../components/CustomSnackBar";
import fetchUserReservations from "../api/fetchUserReservations";
import cancelReservation from "../api/cancelReservation";
import fetchParkingSpots from "../api/fetchParkingSpots";

function Reservations() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const navigate = useNavigate();

  const [reservations, setReservations] = useState(null);
  const [parkingSpots, setParkingSpots] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const getParkingSpotNumber = (id) => {
    return parkingSpots
      ?.filter((parkingSpot) => parkingSpot.id === id)
      .map((parkingSpot) => {
        return parkingSpot.number;
      });
  };

  const getReservationStatus = (reservation) => {
    let status;
    const cancelled = reservation.row.cancelled;
    const startTime = reservation.row.start_time;

    cancelled
      ? (status = "cancelled")
      : now < startTime
      ? (status = "upcoming")
      : (status = "overdue");

    return status;
  };

  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  const handleError = (e) => {
    setLoading(false);
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "400") {
      setError("Oops something went wrong");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  const fetchReservations = () => {
    fetchUserReservations(client)
      .then((result) => {
        setReservations(result);
        setLoading(false);
      })
      .catch(handleError);
  };

  const handleClick = (id) => {
    cancelReservation(client, id)
      .then(() => {
        fetchReservations();
        setError(null);
        setSuccess("Reservation was cancelled");
        handleClickSnack();
      })
      .catch(handleError);
  };

  const reservationsColumns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      width: 200,
      valueGetter: (reservation) =>
        format(new Date(reservation.row.date), "dd/MM/yyyy"),
    },
    {
      field: "duration",
      headerName: "Duration",
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
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        `${reservation.row.vehicle?.make} ${reservation.row.vehicle?.model}`,
    },
    {
      field: "plateNumber",
      headerName: "Plate number",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        reservation.row.vehicle?.license_plate_number,
    },
    {
      field: "parkingSpotNumber",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        getParkingSpotNumber(reservation.row.parking_spot_id),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      width: 200,
      renderCell: (reservation) => {
        let status = getReservationStatus(reservation);

        return <StatusChip status={status} />;
      },
      valueGetter: (reservation) => {
        let status = getReservationStatus(reservation);

        return status;
      },
    },
    {
      field: "cancel",
      headerName: " ",
      sortable: false,
      width: 70,
      renderCell: (reservation) => {
        const startTime = reservation.row.start_time;
        const cancelled = reservation.row.cancelled;
        const upcoming = now < startTime ? true : false;

        if (upcoming && !cancelled) {
          return (
            <IconButton
              aria-label="cancel reservation"
              color="error"
              onClick={() => handleClick(reservation.row.id)}
            >
              <CloseIcon />
            </IconButton>
          );
        }
      },
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your reservations</Typography>
        <CreateButton
          handleClick={() => navigate("/parking_overview")}
          btnText="Create reservation +"
        />
      </Box>

      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />

      {loading ? (
        <CircularProgress />
      ) : reservations?.length ? (
        <Table data={reservations} columns={reservationsColumns} />
      ) : (
        <Alert sx={{ mt: 3 }} severity="info">
          You have no reservations
        </Alert>
      )}
    </Box>
  );
}

export default Reservations;
