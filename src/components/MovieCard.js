import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const navigate = useNavigate();
  const { genreList } = useSelector((state) => state.movie);
  return (
    <div
      className="card"
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        border: "none  ",
      }}
      onClick={() => {
        navigate(`/movies/${item.id}`);
      }}
    >
      <div className="overlay">
        <h1>{item.title}</h1>
        <div>
          {item.genre_ids.map((id) => (
            // <p>{id}</p>
            <Badge bg="danger">
              {genreList.find((item) => item.id === id).name}
            </Badge>
          ))}
        </div>
        <div>
          <span>{item.vote_average}</span>
          <span>{item.adult ? "청불" : "Under 18"}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
