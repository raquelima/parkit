import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { THEME_COLOR } from "../Constants";
import { useNavigate } from "react-router-dom";

/**
 * A functional component that renders a MUI Card component for the displaying of information
 * @param {string} label - A label to be displayed in the card
 * @param {number} number - A number to be displayed in the card
 * @param {string} btnText - The card button text
 * @param {string} path - The path that the card button must navigate to
 * @returns {JSX.Element} The InfoCard component
 */
function InfoCard({ label, number, btnText, path }) {
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
          {label}
        </Typography>
        <Typography
          gutterBottom
          variant="h4"
          sx={{ color: THEME_COLOR, fontWeight: "bold" }}
        >
          {number ? number : 0}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end", mr: 1, pb: 2 }}>
        {btnText && (
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: THEME_COLOR,
              borderRadius: 16,
              textTransform: "none",
            }}
            onClick={() => navigate(path)}
          >
            {btnText}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default InfoCard;
