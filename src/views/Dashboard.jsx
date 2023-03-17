import { Grid, Box, Typography, Button, CircularProgress } from "@mui/material";
import InfoCard from "../components/InfoCard";
import Table from "../components/Table";
import { THEMECOLOR } from "../Constants";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import { upcomingReservationsColumns } from "../columns";

function Dashboard() {
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);
  const navigate = useNavigate();

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}>
        <Typography gutterBottom variant="h6" component="div">
          Today's information
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
      <Box sx={{ pt: 4 }}>
        <Typography variant="h6">Upcoming reservations</Typography>

        {loading && <CircularProgress />}
        {reservations ? (
          <Table data={reservations} columns={upcomingReservationsColumns} />
        ) : (
          <p>No reservations found</p>
        )}
      </Box>
    </Box>
  );
}

export default Dashboard;
