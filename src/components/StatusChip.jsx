import { Chip } from "@mui/material";

const statuschips = {
  cancelled: {
    color: "#D83B3B",
    backgroundColor: "rgba(255,201,201,0.8)",
  },
  upcoming: {
    color: "#67CEAD",
    backgroundColor: "#E5F8F2",
  },
  ongoing: {
    color: "#30689C",
    backgroundColor: "#ADE5FF",
  },
  overdue: {
    color: "#F7C692",
    backgroundColor: "rgba(252,233,212,0.86)",
  },
};

function StatusChip({ status }) {
  const { color, backgroundColor } = statuschips[status];
  return (
    <Chip
      label={status}
      size="small"
      sx={{ color, backgroundColor, fontWeight: "bold" }}
    />
  );
}
export default StatusChip;
