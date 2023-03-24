import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { SwaggerClientContext } from "../App";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import CreateButton from "../components/CreateButton";
import AutoHidingSnackbar from "../components/AutoHidingSnackbar";
import fetchUserReservations from "../api/fetchUserReservations";
import cancelReservation from "../api/cancelReservation";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import filterUpcomingReservations from "../utils/filterUpcomingReservations";

function Dashboard() {
  const client = useContext(SwaggerClientContext);

  const navigate = useNavigate();

  const today = new Date();
  const am = format(today, "a") == "AM" ? true : false;

  const [reservations, setReservations] = useState(null);
  const [availableParkingSpots, setAvailableParkingSpots] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const upcomingReservations = filterUpcomingReservations(reservations);
  const totalReservations = reservations?.length;
  const upcomingReservationTotal = upcomingReservations?.length;
  const availableParkingSpotsTotal = availableParkingSpots?.length;

  const infoCards = [
    {
      label: "Available parking spaces",
      value: availableParkingSpotsTotal,
      path: "/parking_overview",
      button: "See overview",
    },
    {
      label: "Upcoming reservations",
      value: upcomingReservationTotal,
      path: "/reservations",
      button: "See reservations",
    },
    {
      label: "Total reservations",
      value: totalReservations,
    },
  ];

  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

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
        setSuccess("Reservation was cancelled");
        handleClickSnack();
        setLoading(false);
      })
      .catch(handleError);
  };

  const filterAvailableParkingSpots = (parkingSpots) => {
    return parkingSpots?.filter((parkingSpot) => !parkingSpot.unavailable);
  };

  const upcomingReservationsColumns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      width: 200,
      valueGetter: (reservations) =>
        format(new Date(reservations.row.date), "dd/MM/yyyy"),
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        `${format(new Date(reservations.row.start_time), "hh:mm")} - ${format(
          new Date(reservations.row.end_time),
          "hh:mm"
        )}`,
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        `${reservations.row.vehicle?.make} ${reservations.row.vehicle?.model}`,
    },
    {
      field: "parking_spot_id",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "cancel",
      headerName: " ",
      sortable: false,
      width: 70,
      renderCell: (reservations) => {
        return (
          <IconButton
            aria-label="cancel reservation"
            color="error"
            onClick={() => handleClick(reservations.row.id)}
          >
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    fetchReservations();
    fetchParkingSpotAvailability(client, today, true, am)
      .then((result) => {
        setAvailableParkingSpots(
          filterAvailableParkingSpots(result?.available_parking_spots)
        );
        setLoading(false);
      })
      .catch(handleError);
  }, [client]);

  return (
    <Box>
      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          Information
        </Typography>
        <CreateButton
          handleClick={() => navigate("/parking_overview")}
          btnText="Create reservation +"
        />
      </Box>
      <Grid container>
        <Grid container justifyContent="space-between">
          {infoCards.map((card) => (
            <Grid key={card.label} item>
              <InfoCard
                text={card.label}
                number={card.value}
                button={card.button}
                path={card.path}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box sx={{ pt: 4 }}>
        <Typography variant="h6">Upcoming reservations</Typography>

        {loading ? (
          <CircularProgress />
        ) : upcomingReservations?.length ? (
          <Table
            data={upcomingReservations}
            columns={upcomingReservationsColumns}
          />
        ) : (
          <Alert sx={{ mt: 3 }} severity="info">
            You have no upcoming reservations
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
