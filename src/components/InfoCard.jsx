import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { THEMECOLOR } from "../Constants";
import { useNavigate } from "react-router-dom";

function InfoCard({ text, button, path }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: 175,
        width: 370,
        background: "linear-gradient(rgb(93,121,152,0.5), rgb(198,84,90,1))",
        borderRadius: "21px",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" sx={{ fontWeight: "300" }}>
          {text}
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          sx={{ color: THEMECOLOR, fontWeight: "bold" }}
        >
          3
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mr: 1, pb: 2 }}>
        {button && (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: THEMECOLOR,
              borderRadius: 16,
              textTransform: "none",
            }}
            onClick={() => navigate(path)}
          >
            {button}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default InfoCard;