import { Box, Container } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import format from "date-fns/format";
import logo from "../assets/adobe.png";

function ParkingOverview() {
  const [dateTime, setDateTime] = useState(format(new Date(), "dd/MM/yyyy a"));
  return (
    <Box>
      <Box display="flex" justifyContent="center">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Controlled picker"
            value={dateTime}
            onChange={(newValue) => setDateTime(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
        sx={{
          border: 2,
          borderColor: "rgba(112,112,112,0.14)",
          borderRadius: 2,
          mt: 3,
        }}
      >
        <Box
          minHeight="60vh"
          minWidth="90vh"
          sx={{ borderRadius: 2, backgroundColor: "rgba(145,158,171,0.12)" }}
        >
          <img width="80px" src={logo} />
        </Box>
      </Box>
    </Box>
  );
}

export default ParkingOverview;
