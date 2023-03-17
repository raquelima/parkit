import { Button } from "@mui/material";
import { THEMECOLOR } from "../Constants";
import { useNavigate } from "react-router-dom";

function CreateReservationButton() {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: THEMECOLOR,
        borderRadius: "4px",
        textTransform: "none",
      }}
      onClick={() => navigate("/parking_overview")}
    >
      Create reservation +
    </Button>
  );
}

export default CreateReservationButton;
