import { Grid, Box, Typography, Button } from "@mui/material";
import InfoCard from "../components/InfoCard";
import UpcomingTable from "../components/UpcomingTable";
import { THEMECOLOR } from "../Constants";
import { useContext } from "react";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";

function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const {reservations} = useFetchReservations(client);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography gutterBottom variant="h6" component="div">
          Today's Information
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: THEMECOLOR,
            borderRadius: "4px",
            textTransform: "none",
          }}
        >
          Create reservation +
        </Button>
      </Box>
      <Grid container>
        <Grid container justifyContent="space-between">
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <InfoCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box>
        <Typography gutterBottom variant="h6" component="div">
          Upcoming reservations
        </Typography>
        {reservations ? (
          <UpcomingTable reservations={reservations} />
        ) : (
          <p>No reservations found</p>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
