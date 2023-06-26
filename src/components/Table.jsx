import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton style={{ color: "#303E4D" }} />
      <GridToolbarFilterButton style={{ color: "#303E4D" }} />
      <GridToolbarDensitySelector style={{ color: "#303E4D" }} />
      <GridToolbarExport style={{ color: "#303E4D" }} />
    </GridToolbarContainer>
  );
}

/**
 * A functional component that renders a MUI DataGrid component representing a table
 * @param {Array} data - An array of data to be displayed in the table
 * @param {Array} columns - An array of columns to be displayed in the table
 * @returns {JSX.Element} The Table component
 */
function Table({ data, columns, admin }) {
  return (
    <Box sx={{ height: "80vh", width: "100%", pt: 2 }}>
      <DataGrid
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgb(255,48,48,0.13)",
          },
        }}
        density="compact"
        rows={data}
        columns={columns}
        loading={!data}
        pageSize={5}
        rowsPerPageOptions={[5]}
        slots={admin && { toolbar: CustomToolbar }}
      />
    </Box>
  );
}

export default Table;
