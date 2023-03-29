import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

/**
 * A functional component that renders a MUI DataGrid component representing a table
 * @param {Array} data - An array of data to be displayed in the table
 * @param {Array} columns - An array of columns to be displayed in the table
 * @returns {JSX.Element} The Table component
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
