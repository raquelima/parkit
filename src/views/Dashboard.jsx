import { Grid, Box, Typography, Button } from "@mui/material";
import InfoCard from "../components/InfoCard";
import { THEMECOLOR } from "../Constants";

function Dashboard() {
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
      </Box>
    </Box>
  );
}

export default Dashboard;
