import { Grid, Box, Typography, Button, CircularProgress } from "@mui/material";
import InfoCard from "../components/InfoCard";
import UpcomingTable from "../components/UpcomingTable";
import { THEMECOLOR } from "../Constants";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";

function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);
  const navigate = useNavigate();

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
          onClick={() => navigate("/parking_overview")}
        >
          Create reservation +
        </Button>
      </Box>
      <Grid container>
        <Grid container justifyContent="space-between">
          {[
            "Available parking spaces",
            "Upcoming reservations",
            "Total reservations",
          ].map((text) => (
            <Grid key={text} item>
              <InfoCard text={text} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Box>
        <Typography gutterBottom variant="h6" component="div">
          Upcoming reservations
        </Typography>

        {loading && <CircularProgress />}
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
