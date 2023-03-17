import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import { useContext } from "react";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import CreateReservationButton from "../components/CreateReservationButton";
import filterById from "../logic/filterById";
import filterUpcoming from "../logic/filterUpcoming";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import cancelReservation from "../logic/cancelReservation";

function Dashboard() {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);

  const filteredReservations = filterById(reservations, userId);
  const upcomingReservation = filterUpcoming(filteredReservations);

  const totalReservations = filteredReservations?.length;
  const upcomingReservationTotal = upcomingReservation?.length;

  const infoCardsText = [
    "Available parking spaces",
    "Upcoming reservations",
    "Total reservations",
  ];
  const infoCardsNumbers = [3, upcomingReservationTotal, totalReservations];
  const infoCardsPaths = ["/parking_overview", "/reservations"];
  const infoCardsButtons = ["See overview", "See reservations"];

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
      renderCell: () => {
        return (
          <IconButton
            aria-label="cancel reservation"
            color="error"
            onClick={cancelReservation(reservations.row.id, client).then(
              useFetchReservations(client)
            )}
          >
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
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
        ) : upcomingReservation.length ? (
          <Table
            data={upcomingReservation}
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
