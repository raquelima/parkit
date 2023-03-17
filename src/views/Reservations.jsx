import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { THEMECOLOR } from "../Constants";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import { reservationsColumns } from "../columns";
import CreateReservationButton from "../components/CreateReservationButton";

function Reservations() {
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your reservations</Typography>
       <CreateReservationButton />
      </Box>

      {loading ? (
        <CircularProgress />
      ) : reservations ? (
        <Table data={reservations} columns={reservationsColumns} />
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}

export default Reservations;
