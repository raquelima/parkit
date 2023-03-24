import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

/**
 *
 * @param {*} data
 * @param {*} columns
 * @returns
 */
function Table({ data, columns }) {
  return (
    <Box sx={{ height: "80vh", width: "100%", pt: 2 }}>
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
