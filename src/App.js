import "./App.css";
import movieData from "./assets/data.json";
import FavoriteCard from "./components/FavoriteCard";
import MovieCard from "./components/MovieCard";
import SelectButton from "./components/SelectButton";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useState } from "react";
import { useEffect } from "react";

movieData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

const sortOptions = {
  none: "None",
  name: "Alphabetical Order",
  date: "Oldest to Newest",
};

const genreOptions = {
  none: "None",
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
  const [favoriteSet, setFavoriteSet] = useState(new Set());
  const [count, setCount] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [data, setData] = useState(movieData);
  const [filters, setFilters] = useState({ Genre: null, Rating: null });
  const [sortType, setSortType] = useState("none");
  const [isVisible, setIsVisible] = useState(false);

  // updates favorite list
  const update = (item) => {
    const updatedSet = new Set(favoriteSet);
    if (updatedSet.has(item)) {
      updatedSet.delete(item);
      setTotalTime(totalTime - item.duration);
    } else {
      updatedSet.add(item);
      setTotalTime(totalTime + item.duration);
    }

    setCount(updatedSet.size);
    setFavoriteSet(updatedSet);
  };

  // sorts based on sorting criteria selected by select button
  const handleSort = (criteria) => {
    setSortType(criteria);
  };

  // sets genre filter
  const handleGenreFilter = (criteria) => {
    const updatedFilters = { ...filters };
    if (criteria === "none") {
      updatedFilters["Genre"] = null;
    } else {
      updatedFilters["Genre"] = criteria;
    }
    setFilters(updatedFilters);
  };

  // sets rating filter
  const handleRatingFilter = (criteria) => {
    const updatedFilters = { ...filters };
    if (criteria === "none") {
      updatedFilters["Rating"] = null;
    } else {
      updatedFilters["Rating"] = criteria;
    }
    setFilters(updatedFilters);
  };

  // applies filter and then sort based on state vars
  const applyFilterAndSort = () => {
    let filteredData = [...movieData];
    if (filters["Genre"] !== null) {
      filteredData = filteredData.filter((item) => {
        return item.genre.includes(filters["Genre"]);
      });
    }

    if (filters["Rating"] !== null) {
      filteredData = filteredData.filter((item) => {
        return item.rating === filters["Rating"];
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

  // resets filter and sort
  const resetFilterSort = () => {
    setFilters({ Genre: null, Rating: null });
    setSortType("none");
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 40 ? setIsVisible(true) : setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    applyFilterAndSort();
  }, [filters, sortType]);

  return (
    <div className="app">
      <div className="header">
        <h1> Movie Tracker</h1>
      </div>
      <Divider flexItem color="#1769aa" />
      <div className="bodyContainer">
        <section id="favoriteSection" className="favoriteContainer">
          <h2 className="favoriteTitle">Favorites</h2>
          <div>
            <p>
              <span>Count: </span>
              {count} movies
            </p>
            <p>
              <span>Total Duration:</span> {totalTime} minutes
            </p>
          </div>
          <div className="favoriteList">
            {Array.from(favoriteSet)
              .reverse()
              .map((item) => (
                <FavoriteCard
                  image={item.image}
                  name={item.name}
                  date={item.date}
                  rating={item.rating}
                  duration={item.duration}
                  genre={item.genre}
                  desc={item.desc}
                  favorite={() => update(item)}
                />
              ))}
          </div>
        </section>
        <Divider flexItem color="#1769aa" />
        <div className="listContainer">
          <h2>
            Movie List {sortType === "name" ? "(A - Z)" : ""}
            {sortType === "date" ? "(Oldest - Newest)" : ""}
          </h2>
          <div className="buttonContainer">
            <SelectButton
              label="Sort By"
              onSelect={handleSort}
              menuItems={sortOptions}
              id="sort"
              sorts={sortType}
            ></SelectButton>
            <SelectButton
              label="Genre"
              onSelect={handleGenreFilter}
              menuItems={genreOptions}
              id="genre-filter"
              filters={filters}
            ></SelectButton>
            <SelectButton
              label="Rating"
              onSelect={handleRatingFilter}
              menuItems={ratingOptions}
              id="rating-filter"
              filters={filters}
            ></SelectButton>
            {sortType !== "none" || filters["Genre"] || filters["Rating"] ? (
              <div className="resetButton">
                <Button
                  size="medium"
                  className="resetButton"
                  variant="outlined"
                  onClick={resetFilterSort}
                >
                  Reset All
                </Button>
              </div>
            ) : (
              <div className="resetButton">
                <Button
                  size="medium"
                  className="resetButton"
                  variant="outlined"
                  disabled
                >
                  Reset All
                </Button>
              </div>
            )}
          </div>
          {(filters["Genre"] || filters["Rating"]) && (
            <caption>
              <span>Filters:</span> {filters["Genre"] ? filters["Genre"] : ""}
              {filters["Genre"] && filters["Rating"] ? ", " : ""}
              {filters["Rating"] ? filters["Rating"] : ""}
            </caption>
          )}
          <div className="movieList">
            {data.map((item, index) => (
              <MovieCard
                image={item.image}
                name={item.name}
                date={item.date}
                rating={item.rating}
                duration={item.duration}
                desc={item.desc}
                genre={item.genre}
                favorite={() => update(item)}
                currFavorites={Array.from(favoriteSet).map(
                  (obj) => obj["name"]
                )}
                onClick={handleGenreFilter}
              />
            ))}
          </div>
        </div>
      </div>
      {isVisible && (
        <button
          aria-label="scroll to top"
          className="scrollButton"
          onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
        >
          <ExpandLessIcon
            aria-hidden="false"
            aria-label="up arrow"
            fontSize="large"
            sx={{ color: "white" }}
          />
        </button>
      )}
    </div>
  );
}

export default App;
