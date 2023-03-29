import { Chip } from "@mui/material";
import { STATUS_CHIPS } from "../Constants";

/**
 * A functional component that renders a MUI Chip component with custom style representing the reservation status chip
 * @param {number} status - The status of the reservation
 * @returns {JSX.Element} The StatusChip component
 */
function StatusChip({ status }) {
  const { color, backgroundColor } = STATUS_CHIPS[status];
  return (
    <Chip
      label={status}
      size="small"
      sx={{ color, backgroundColor, fontWeight: "bold" }}
    />
  );
}
export default StatusChip;
