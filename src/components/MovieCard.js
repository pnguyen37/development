import "./MovieCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Chip from "@mui/material/Chip";
import { useState } from "react";

export default function MovieCard(props) {
  const [buttonColor, setButtonColor] = useState("default");

  const handleClick = () => {
    if (buttonColor === "default") {
      setButtonColor("primary");
    } else {
      setButtonColor("default");
    }
    props.favorite();
  };

  return (
    <Card className="MovieCard">
      {/* <CardMedia img={props.image} alt={props.name} className="cardImage"/> */}
      <img src={props.image} alt={props.name} className="cardImage" />
      <CardContent className="cardText">
        <h2 className="cardTitle">{props.name}</h2>
        <div className="cardDetail">
          <span>{props.date}</span>
          <span>{props.rating}</span>
          <span>{props.duration} min</span>
        </div>
        <div className="cardDetail">
          {props.genre.map((item, index) => (
            <div className="genreTag">
              {item}
            </div>
          ))}
        </div>
        <FavoriteIcon
          className={buttonColor === "default" ? "favIcon" : "redIcon"}
          onClick={() => handleClick()}
        />
      </CardContent>
    </Card>
  );
}
