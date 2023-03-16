import { Grid, Box, Typography, Button } from "@mui/material";
import InfoCard from "../components/InfoCard";
import UpcomingTable from "../components/UpcomingTable";
import { THEMECOLOR } from "../Constants";
import { useEffect, useState, useContext } from "react";
import { SwaggerClientContext } from "../App";

function Dashboard() {
  const client = useContext(SwaggerClientContext);

  const [reservations, setReservations] = useState(null);

  const fetchReservations = () => {
    if (client?.apis?.reservations) {
      (async () => {
        client.apis.reservations
          .listReservations()
          .then((response) => {
            Promise.all(
              response.body.reservations.map((element) => {
                return client.apis["parking-spots"]
                  .getParkingSpot({ id: element.parking_spot_id })
                  .then((response) => {
                    console.log(response);
                  });
              })
            ).then(() => setReservations(response.body.reservations));
          })
          .catch((e) => {
            setServerMessage(
              `An error occurred: ${e.statusCode} - ${e.response?.statusText}`
            );
          });
      })();
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [client]);

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
