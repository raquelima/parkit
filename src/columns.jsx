import { format } from "date-fns";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StatusChip from "./components/StatusChip";

const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

export const reservationsColumns = [
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
        : now > startTime
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
      const upcoming = now > startTime ? true : false;

      if (upcoming) {
        return (
          <IconButton aria-label="cancel reservation" color="error">
            <CloseIcon />
          </IconButton>
        );
      }
    },
  },
];

export const upcomingReservationsColumns = [
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
    field: "parking_spot_id",
    headerName: "Parking spot",
    flex: 1,
    sortable: false,
    width: 200,
  },
  {
    field: "cancel",
    headerName: " ",
    sortable: false,
    width: 70,
    renderCell: (cellValues) => {
      return (
        <IconButton
          aria-label="cancel reservation"
          color="error"
          onClick={(event) => {
            handleClick(event, cellValues);
          }}
        >
          <CloseIcon />
        </IconButton>
      );
    },
  },
];
