import "./MovieCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState, useEffect } from "react";

export default function MovieCard(props) {
  const [buttonColor, setButtonColor] = useState("default");

  useEffect(() => {
    function changeButtonColor() {
      props.currFavorites.includes(props.name)
        ? setButtonColor("favorited")
        : setButtonColor("default");
    }
		changeButtonColor(); 
  }, [props.currFavorites, props.name]);

  return (
    <Card sx={{ color: "black" }} className="movieCard">
      <img src={props.image} alt={props.desc} className="cardImage" />
      <CardContent className="cardText">
        <h3 className="cardTitle">{props.name}</h3>
        <div className="cardDetail">
          <span>{props.date}</span>
          <span>{props.rating}</span>
          <span>{props.duration} min</span>
        </div>
        <div className="cardDetail">
          {props.genre.map((item, index) => (
            <div
              className="genreTag"
              onClick={() => props.onClick(item)}
              tabIndex="0"
            >
              <span>{item}</span>
            </div>
          ))}
          <div tabIndex="0" className="iconContainer">
            <FavoriteIcon
              aria-hidden="false"
              aria-label="favorite button"
              className={buttonColor === "default" ? "favIcon" : "redIcon"}
              fontSize="medium"
              onClick={() => props.favorite()}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
