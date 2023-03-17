import { Chip } from "@mui/material";
import { format } from "date-fns";

function StatusChip({ startTime, cancelled }) {
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

  return cancelled ? (
    <Chip
      label="cancelled"
      size="small"
      sx={{
        color: "#D83B3B",
        backgroundColor: "rgba(255,201,201,0.8)",
        fontWeight: "bold",
      }}
    />
  ) : now < startTime ? (
    <Chip
      label="upcoming"
      size="small"
      sx={{ color: "#67CEAD", backgroundColor: "#E5F8F2", fontWeight: "bold" }}
    />
  ) : (
    <Chip
      label="overdue"
      size="small"
      sx={{
        color: "#F7C692",
        backgroundColor: "rgba(252,233,212,0.86)",
        fontWeight: "bold",
      }}
    />
  );
}
export default StatusChip;
