import { Sort } from "@mui/icons-material";
import "./App.css";
import movieData from "./assets/data.json";
import FavoriteCard from "./components/FavoriteCard";
import MovieCard from "./components/MovieCard";
import SelectButton from "./components/SelectButton";
import { useState } from "react";
import {useEffect} from "react";

movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

const sortOptions = {
  "none": "None",
  name: "Alphabetical Order",
  date: "Oldest to Newest",
};

const genreOptions = {
  "none": "None",
  Action: "Action",
  Adventure: "Adventure",
  Animation: "Animation",
  Comedy: "Comedy",
  Crime: "Crime",
  Drama: "Drama",
  Family: "Family",
  Fantasy: "Fantasy",
  Horror: "Horror",
  Music: "Music",
  Mystery: "Mystery",
  Romance: "Romance",
  "Sci-Fi": "Sci-Fi",
  Thriller: "Thriller",
};

const ratingOptions = {
  none: "None",
  PG: "PG",
  "PG-13": "PG-13",
  R: "R",
  "TV-14": "TV-14",
};

function App() {
  const [favoriteMap, setFavoriteMap] = useState(new Set());
  const [count, setCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [data, setData] = useState(movieData);
  const [filters, setFilters] = useState({ genre: null, rating: null });
  const [sortType, setSortType] = useState("none");

  // updates favorite list
  const update = (item) => {
    const updatedSet = new Set(favoriteMap);
    if (updatedSet.has(item)) {
      updatedSet.delete(item);
      setTotalTime(totalTime - item.duration);
    } else {
      updatedSet.add(item);
      setTotalTime(totalTime + item.duration);
    }

    setCount(updatedSet.size);
    setFavoriteMap(updatedSet);
  };

  // sorts based on sorting criteria selected by select button
  const handleSort = (criteria) => {
    setSortType(criteria);
  };

  // filtering functionality
  const handleGenreFilter = (criteria) => {
    const updatedFilters = { ...filters };
    if (criteria === "none") {
      updatedFilters["genre"] = null;
    } else {
      updatedFilters["genre"] = criteria;
    }
    setFilters(updatedFilters);
  };

  const handleRatingFilter = (criteria) => {
    const updatedFilters = { ...filters };
    if (criteria === "none") {
      updatedFilters["rating"] = null;
    } else {
      updatedFilters["rating"] = criteria;
    }
    setFilters(updatedFilters);
  };

  const applyFilterAndSort = () => {
    console.log("here")
    let filteredData = [...movieData];
    console.log(filters["genre"]);
    if (filters["genre"] !== null) {
      filteredData = filteredData.filter((item) => {
        return item.genre.includes(filters["genre"]);
      });
    }

    if (filters["rating"] !== null) {
      filteredData = filteredData.filter((item) => {
        return item.rating === filters["rating"];
      });
    }

    if (sortType !== "none") {
      const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortType] < b[sortType]) return -1;
        if (a[sortType] > b[sortType]) return 1;
        return 0;
      });
      setData(sortedData);
    } else {
      setData(filteredData);
    }
  };

  useEffect(() => {
    console.log(filters)
    applyFilterAndSort();
  }, [filters, sortType]);

  return (
    <div className="App">
      <div className="ListContainer">
        <h1>Movies</h1>
        <SelectButton
          label="Sort By"
          onSelect={handleSort}
          menuItems={sortOptions}
        ></SelectButton>
        <SelectButton
          label="Genre"
          onSelect={handleGenreFilter}
          menuItems={genreOptions}
        ></SelectButton>
        <SelectButton
          label="Rating"
          onSelect={handleRatingFilter}
          menuItems={ratingOptions}
        ></SelectButton>
        <div className="MovieList">
          {data.map((item, index) => (
            <MovieCard
              image={item.image}
              name={item.name}
              date={item.date}
              rating={item.rating}
              duration={item.duration}
              genre={item.genre}
              favorite={() => update(item)}
            />
          ))}
        </div>
      </div>
      <div className="FavoriteList">
        <h2>Favorites</h2>
        {Array.from(favoriteMap).map((item) => (
          <FavoriteCard
            image={item.image}
            name={item.name}
            date={item.date}
            rating={item.rating}
            duration={item.duration}
          />
        ))}
        <p>Count: {count} movies</p>
        <p>Total Duration: {totalTime} minutes</p>
      </div>
    </div>
  );
}

export default App;
