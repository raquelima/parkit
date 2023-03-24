import { Chip } from "@mui/material";
import { STATUSCHIPS } from "../Constants";

/**
 *
 * @param {*} status
 * @returns
 */
function StatusChip({ status }) {
  const { color, backgroundColor } = STATUSCHIPS[status];
  return (
    <Chip
      label={status}
      size="small"
      sx={{ color, backgroundColor, fontWeight: "bold" }}
    />
  );
}
export default StatusChip;
