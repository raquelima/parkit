import { Box, Typography, CircularProgress } from "@mui/material";
import { useContext } from "react";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import { reservationsColumns } from "../columns";
import CreateReservationButton from "../components/CreateReservationButton";
import filterById from "../logic/filterById";

function Reservations() {
  const client = useContext(SwaggerClientContext);
  const { reservations, loading } = useFetchReservations(client);
  const filteredReservations = filterById(reservations);

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
      ) : filteredReservations.length ? (
        <Table data={filteredReservations} columns={reservationsColumns} />
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}

export default Reservations;
