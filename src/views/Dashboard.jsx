import { Grid, Box, Typography, CircularProgress } from "@mui/material";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import { useContext } from "react";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import { upcomingReservationsColumns } from "../columns";
import CreateReservationButton from "../components/CreateReservationButton";
import filterById from "../logic/filterById";

function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);
  const filteredReservations = filterById(reservations);

  const infoCards = [
    "Available parking spaces",
    "Upcoming reservations",
    "Total reservations",
  ];
  const infoCardsPaths = ["/parking_overview", "/reservations"];
  const infoCardsButtons = ["See overview", "See reservations"];

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
          {infoCards.map((text, index) => (
            <Grid key={text} item>
              <InfoCard
                text={text}
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
        ) : filteredReservations.length ? (
          <Table
            data={filteredReservations}
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
