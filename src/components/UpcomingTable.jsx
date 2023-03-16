import { DataGrid } from "@mui/x-data-grid";
import { format } from "date-fns";
import { IconButton, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function UpcomingTable({ reservations }) {
  const columns = [
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

  return (
    <Box style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{
            border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(255,48,48,0.13)",
          },
        }}
        rows={reservations}
        columns={columns}
        loading={!reservations}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}

export default UpcomingTable;
