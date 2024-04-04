import "./FavoriteCard.css";
import Card from "@mui/material/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function FavoriteCard(props) {

  return (
    <Card className="favoriteCard">
      <img src={props.image} alt={props.desc} className="favImage" />
      <div className="favText">
        <h3 className="favTitle">{props.name}</h3>
        <div className="favDetail limitWidth">
          <span>{props.date}</span>
          <span>{props.rating}</span>
          <span>{props.duration} min</span>
        </div>
      </div>
      <div tabIndex="0" className="closeContainer">
        <FavoriteIcon
          aria-hidden="false"
          aria-label="remove"
          className="redCloseIcon"
          onClick={() => props.favorite()}
        ></FavoriteIcon>
      </div>
    </Card>
  );
}
