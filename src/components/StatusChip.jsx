import { Chip } from "@mui/material";

function StatusChip({ status }) {
  return status === "cancelled" ? (
    <Chip
      label={status}
      size="small"
      sx={{
        color: "#D83B3B",
        backgroundColor: "rgba(255,201,201,0.8)",
        fontWeight: "bold",
      }}
    />
  ) : status === "upcoming" ? (
    <Chip
      label={status}
      size="small"
      sx={{ color: "#67CEAD", backgroundColor: "#E5F8F2", fontWeight: "bold" }}
    />
  ) : (
    <Chip
      label={status}
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
