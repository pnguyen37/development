import "./FavoriteCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function FavoriteCard(props) {
  return (
    <Card className="FavoriteCard">
      <img src={props.image} alt={props.name} className="favImage" />
      <div className="favText">
        <h4 className="favTitle">{props.name}</h4>
        <div className="favDetail">
          <span>{props.date}</span>
          <span>{props.rating}</span>
          <span>{props.duration} min</span>
        </div>
      </div>
      {/* <button onClick={() => props.favorite()}>Add to Cart</button> */}
    </Card>
  );
}
