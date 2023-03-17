import { Box, Typography, CircularProgress } from "@mui/material";
import { useContext } from "react";
import useFetchReservations from "../hooks/useFetchReservations";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import CreateReservationButton from "../components/CreateReservationButton";
import filterById from "../logic/filterById";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StatusChip from "../components/StatusChip";

function Reservations() {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const client = useContext(SwaggerClientContext);
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  const { reservations, loading } = useFetchReservations(client);
  const filteredReservations = filterById(reservations, userId);

  const cancelReservation = (id) => {
    client?.apis["reservations"]
      .cancelReservation({ id: id })
      .then(() => useFetchReservations(client));
  };

  const reservationsColumns = [
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
      field: "plateNumber",
      headerName: "Plate number",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        reservations.row.vehicle.license_plate_number,
    },
    {
      field: "parking_spot_id",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      width: 200,
      renderCell: (reservations) => {
        let status;
        const cancelled = reservations.row.cancelled;
        const startTime = reservations.row.start_time;

        cancelled
          ? (status = "cancelled")
          : now < startTime
          ? (status = "upcoming")
          : (status = "overdue");

        return <StatusChip status={status} />;
      },
    },
    {
      field: "cancel",
      headerName: " ",
      sortable: false,
      width: 70,
      renderCell: (reservations) => {
        const startTime = reservations.row.start_time;
        const cancelled = reservations.row.cancelled;
        const upcoming = now < startTime ? true : false;

        if (upcoming && !cancelled) {
          return (
            <IconButton
              aria-label="cancel reservation"
              color="error"
              onClick={() => {
                cancelReservation(reservations.row.id);
              }}
            >
              <CloseIcon />
            </IconButton>
          );
        }
      },
    },
  ];

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
