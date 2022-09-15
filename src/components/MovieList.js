import React from "react";
import { Badge, Col, Container, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

const MovieList = ({ sort }) => {
  const { popularMovies, genreList } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  return (
    <>
      {sort
        ? sort.map((item) => (
            <div
              className="movies-banner"
              style={{
                height: "550px",
                width: "350px",
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "10px",
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`); // 1.과제
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt=""
                  width={70}
                  height={100}
                  style={{}}
                />
                <h1>{item.title}</h1>
              </div>
              <div className="hahaha">
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger">
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
                </div>
                <p>{item.overview}</p>
                <div style={{ display: "flex" }}>
                  <div>{item.vote_average}</div>
                  <div>{item.popularity}</div>
                  <div style={{ color: "red", fontSize: "700" }}>
                    {item.adult === false ? "Under 18" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))
        : popularMovies?.results?.map((item) => (
            <div
              className="movies-banner"
              style={{
                height: "550px",
                width: "350px",
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "10px",
              }}
              onClick={() => {
                navigate(`/movies/${item.id}`); // 1.과제
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                  alt=""
                  width={70}
                  height={100}
                  style={{}}
                />
                <h1>{item.title}</h1>
              </div>
              <div className="hahaha">
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger">
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
                </div>
                <p>{item.overview}</p>
                <div style={{ display: "flex" }}>
                  <div>{item.vote_average}</div>
                  <div>{item.popularity}</div>
                  <div style={{ color: "red", fontSize: "700" }}>
                    {item.adult === false ? "Under 18" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default MovieList;
