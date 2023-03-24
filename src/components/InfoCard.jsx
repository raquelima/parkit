import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { THEMECOLOR } from "../Constants";
import { useNavigate } from "react-router-dom";

/**
 *
 * @param {*} text
 * @param {*} number
 * @param {*} button
 * @param {*} path
 * @returns
 */
function InfoCard({ text, number, button, path }) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: 175,
        width: 330,
        background:
          "linear-gradient(rgb(155,173,192,0.84), rgb(198,84,90,0.84))",
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
          {number ? number : 0}
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
