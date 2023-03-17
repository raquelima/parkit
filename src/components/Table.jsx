import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

function Table({ data, columns }) {
  return (
    <Box sx={{ height: 400, width: "100%", pt: 2 }}>
      <DataGrid
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(255,48,48,0.13)",
          },
        }}
        rows={data}
        columns={columns}
        loading={!data}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </Box>
  );
}

export default Table;
