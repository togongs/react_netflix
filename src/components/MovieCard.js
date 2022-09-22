import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill, BsFillShieldFill, BsFilm } from "react-icons/bs";

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
        border: "none",
        paddingLeft: "0px",
        paddingRight: "0px",
        paddingBottom: "0px",
        paddingTop: "0px",
      }}
      onClick={() => {
        navigate(`/movies/${item.id}`);
      }}
    >
      <div className="overlay">
        <h3 className="title">{item.title}</h3>
        <div>
          {item.genre_ids.map((id, index) => (
            <Badge
              bg="danger"
              style={{
                marginRight: "10px",
              }}
              key={index}
            >
              {genreList.find((item) => item.id === id).name}
            </Badge>
          ))}
        </div>
        <div style={{ display: "flex" }}>
          <span
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BsFillShieldFill />
            {item.vote_average}
          </span>
          <span
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BsFillPeopleFill />
            {item.popularity}
          </span>
          <span
            style={{
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              color: "red",
              fontFamily: "fantasy",
            }}
          >
            {item.adult ? "청불" : "Under 18"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
