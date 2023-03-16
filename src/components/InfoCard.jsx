import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { THEMECOLOR } from "../Constants";

function InfoCard() {
  return (
    <Card
      sx={{
        height: 175,
        width: 370,
        background: "linear-gradient(#303E4D, #C6545A)",
        borderRadius: "21px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Available Parking Spaces
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          3
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mr: 1, pb: 2 }}>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: THEMECOLOR,
            borderRadius: 16,
            textTransform: "none",
          }}
        >
          See overview
        </Button>
      </CardActions>
    </Card>
  );
}

export default InfoCard;
