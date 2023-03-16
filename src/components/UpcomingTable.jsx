import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";

function UpcomingTable({ reservations }) {
  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      valueGetter: (reservations) =>
        format(new Date(reservations.row.date), "dd/MM/yyyy"),
    },
    {
      field: "duration",
      headerName: "Duration",
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
      sortable: false,
      width: 200,
      valueGetter: (reservations) =>
        `${reservations.row.vehicle.make} ${reservations.row.vehicle.model}`,
    },
    {
      field: "parking_spot_id",
      headerName: "Parking spot",
      sortable: false,
      width: 200,
    },
    { field: "status", headerName: "Status", sortable: false, width: 200 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={reservations}
        columns={columns}
        loading={!reservations}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default UpcomingTable;
