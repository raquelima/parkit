import { Chip } from "@mui/material";
import { format } from "date-fns";

function StatusChip({ date, cancelled }) {
  const today = format(new Date(), "yyyy-MM-dd");

  return cancelled ? (
    <Chip label="cancelled" size="small" color="error" />
  ) : today < date ? (
    <Chip label="upcoming" size="small" color="success" />
  ) : (
    <Chip label="overdue" size="small" color="warning" />
  );
}
export default StatusChip;
