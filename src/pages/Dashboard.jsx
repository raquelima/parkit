import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import CreateReservationButton from "../components/CreateReservationButton";
import { format } from "date-fns";
import { useContext, useState, useEffect } from "react";
import fetchUserReservations from "../api/fetchUserReservations";
import { SwaggerClientContext } from "../App";
import filterUpcoming from "../utils/filterUpcoming";
import cancelReservation from "../api/cancelReservation";
import fetchParkingSpotAvailability from "../api/fetchParkingSpotAvailability";

function Dashboard() {
  const client = useContext(SwaggerClientContext);

  const [reservations, setReservations] = useState(null);
  const [available, setAvailable] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const am = format(today, "a") == "AM" ? true : false;

  const upcomingReservations = filterUpcoming(reservations);
  const totalReservations = reservations?.length;
  const upcomingReservationTotal = upcomingReservations?.length;
  const availableParkingSpotsTotal = available?.length;

  const infoCardsText = [
    "Available parking spaces",
    "Upcoming reservations",
    "Total reservations",
  ];
  const infoCardsNumbers = [
    availableParkingSpotsTotal,
    upcomingReservationTotal,
    totalReservations,
  ];
  const infoCardsPaths = ["/parking_overview", "/reservations"];
  const infoCardsButtons = ["See overview", "See reservations"];

  const fetchReservations = () => {
    fetchUserReservations(client).then((result) => {
      setReservations(result?.reservations);
      setError(result?.error);
      setLoading(result?.loading);
    });
  };
  const handleClick = (id) => {
    cancelReservation(client, id).then(() => fetchReservations());
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
    fetchParkingSpotAvailability(client, today, true, am).then((result) => {
      setAvailable(result?.availableParkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
    });
  }, [client]);

  return (
    <Box>
      {error}
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          Today's information
        </Typography>
        <CreateReservationButton />
      </Box>
      <Grid container>
        <Grid container justifyContent="space-between">
          {infoCardsText.map((text, index) => (
            <Grid key={text} item>
              <InfoCard
                text={text}
                number={infoCardsNumbers[index]}
                button={infoCardsButtons[index]}
                path={infoCardsPaths[index]}
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
