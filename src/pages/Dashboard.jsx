import {
  Grid,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import CreateReservationButton from "../components/CreateReservationButton";
import { format } from "date-fns";
import { useContext, useState, useEffect } from "react";
import fetchReservations from "../utils/fetchReservations";
import { SwaggerClientContext } from "../App";
import filterById from "../utils/filterById";
import filterUpcoming from "../utils/filterUpcoming";

function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const filteredReservations = filterById(reservations, userId);
  const upcomingReservations = filterUpcoming(filteredReservations);
  const totalReservations = filteredReservations?.length;
  const upcomingReservationTotal = upcomingReservations?.length;

  const infoCardsText = [
    "Available parking spaces",
    "Upcoming reservations",
    "Total reservations",
  ];
  const infoCardsNumbers = [3, upcomingReservationTotal, totalReservations];
  const infoCardsPaths = ["/parking_overview", "/reservations"];
  const infoCardsButtons = ["See overview", "See reservations"];

  const cancelReservation = (id) => {
    client?.apis["reservations"].cancelReservation({ id: id }).then(() =>
      //twice in code
      fetchReservations(client).then((result) => {
        setReservations(result?.reservations);
        setError(result?.error);
        setLoading(result?.loading);
      })
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
        `${reservations.row.vehicle.make} ${reservations.row.vehicle.model}`,
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
            onClick={() => cancelReservation(reservations.row.id)}
          >
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    fetchReservations(client).then((result) => {
      setReservations(result?.reservations);
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
          <p>No upcoming reservations</p>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
