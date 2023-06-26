import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { format } from "date-fns";
import { SwaggerClientContext, UserContext } from "../App";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import CreateButton from "../components/CreateButton";
import AutoHidingSnackbar from "../components/AutoHidingSnackbar";
import fetchUserReservations from "../api/fetchUserReservations";
import cancelReservation from "../api/cancelReservation";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";
import fetchParkingSpots from "../api/fetchParkingSpots";
import filterUpcomingReservations from "../utils/filterUpcomingReservations";
import getParkingSpotNumberById from "../utils/getParkingSpotNumberById";

/**
 * This a functional component that renders the dashboard
 * @returns {JSX.Element} The Dashboard component
 */
function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const navigate = useNavigate();

  const today = new Date();
  const am = format(today, "a") == "AM" ? true : false;

  const [reservations, setReservations] = useState(null);
  const [availableParkingSpots, setAvailableParkingSpots] = useState(null);
  const [parkingSpots, setParkingSpots] = useState(null);

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
    fetchUserReservations(client)
      .then((result) => {
        setReservations(result);
        setLoading(false);
      })
      .catch(handleError);
  };

  /**
   * Cancels reservation by using the given ID then fetches reservations
   * @param {string} id - The ID of the reservation to be cancelled
   */
  const handleCancelReservation = (id) => {
    cancelReservation(client, id)
      .then(() => {
        fetchReservations();
        setSuccess("Reservation was cancelled");
        handleClickSnack();
        setLoading(false);
      })
      .catch(handleError);
  };

  /**
   * Filters out disabled parking spots out of available parking spots array
   * @param {Array} availableParkingSpots - An array of available parking spots
   * @returns {Array} An array of available and not disabled parking spots
   */
  const filterDisabledParkingSpots = (availableParkingSpots) => {
    return availableParkingSpots?.filter(
      (parkingSpot) => !parkingSpot.unavailable
    );
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
      field: "parkingSpotNumber",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        getParkingSpotNumberById(
          parkingSpots,
          reservations.row.parking_spot_id
        ),
    },
    {
      field: "cancel",
      headerName: " ",
      sortable: false,
      width: 70,
      renderCell: (reservations) => {
        return (
          <Tooltip arrow title="Cancel Reservation">
            <IconButton
              aria-label="cancel reservation"
              color="error"
              onClick={() => handleCancelReservation(reservations.row.id)}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  useEffect(() => {
    fetchReservations();

    Promise.all([
      fetchParkingSpotAvailability(client, today, true, am),
      fetchParkingSpots(client),
    ])
      .then(([availableParkingSpots, parkingSpots]) => {
        setAvailableParkingSpots(
          filterDisabledParkingSpots(
            availableParkingSpots?.available_parking_spots
          )
        );
        setParkingSpots(parkingSpots?.parking_spots);
        setLoading(false);
      })
      .catch(handleError);
  }, [client]);

  return (
    <Box>
      <Box
        pb={{ md: 2, lg: 2 }}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
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
            <Box
              key={card.label}
              component={Grid}
              display={{ xs: "none", sm: "block" }}
              item
            >
              <InfoCard
                label={card.label}
                number={card.value}
                btnText={card.button}
                path={card.path}
              />
            </Box>
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

      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />
    </Box>
  );
}

export default Dashboard;
