import { Box, Typography, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import CreateReservationButton from "../components/CreateReservationButton";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StatusChip from "../components/StatusChip";
import fetchUserReservations from "../api/fetchUserReservations";
import cancelReservation from "../api/cancelReservation";
import fetchParkingSpots from "../api/fetchParkingSpots";

function Reservations() {
  const client = useContext(SwaggerClientContext);

  const [reservations, setReservations] = useState(null);
  const [parkingSpots, setParkingSpots] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  const fetchReservations = () => {
    fetchUserReservations(client).then((result) => {
      setReservations(result?.reservations);
      setError(result?.error);
      setLoading(result?.loading);
    });
  };

  const getParkingSpotNumber = (id) => {
    return parkingSpots
      ?.filter((parkingSpot) => parkingSpot.id === id)
      .map((parkingSpot) => {
        return parkingSpot.number;
      });
  };

  const handleClick = (id) => {
    cancelReservation(client, id).then(() => fetchReservations());
  };

  const reservationsColumns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      width: 200,
      valueGetter: (reservation) =>
        format(new Date(reservation.row.date), "dd/MM/yyyy"),
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        `${format(new Date(reservation.row.start_time), "hh:mm")} - ${format(
          new Date(reservation.row.end_time),
          "hh:mm"
        )}`,
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        `${reservation.row.vehicle?.make} ${reservation.row.vehicle?.model}`,
    },
    {
      field: "plateNumber",
      headerName: "Plate number",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        reservation.row.vehicle?.license_plate_number,
    },
    {
      field: "parkingSpotNumber",
      headerName: "Parking spot",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (reservation) =>
        getParkingSpotNumber(reservation.row.parking_spot_id),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      sortable: false,
      width: 200,
      renderCell: (reservation) => {
        let status;
        const cancelled = reservation.row.cancelled;
        const startTime = reservation.row.start_time;

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
      renderCell: (reservation) => {
        const startTime = reservation.row.start_time;
        const cancelled = reservation.row.cancelled;
        const upcoming = now < startTime ? true : false;

        if (upcoming && !cancelled) {
          return (
            <IconButton
              aria-label="cancel reservation"
              color="error"
              onClick={() => handleClick(reservation.row.id)}
            >
              <CloseIcon />
            </IconButton>
          );
        }
      },
    },
  ];

  useEffect(() => {
    fetchReservations();
    fetchParkingSpots(client).then((result) => {
      setParkingSpots(result?.parkingSpots);
      setError(result?.error);
      setLoading(result?.loading);
    });
  }, [client]);

  return (
    <Box>
      {error}
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
      ) : reservations?.length ? (
        <Table data={reservations} columns={reservationsColumns} />
      ) : (
        <p>No reservations found</p>
      )}
    </Box>
  );
}

export default Reservations;
