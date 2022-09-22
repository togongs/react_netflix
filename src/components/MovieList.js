import React from "react";
import { Badge, Col, Container, Row, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BsFillPeopleFill, BsFillShieldFill, BsFilm } from "react-icons/bs";

const MovieList = ({ sort }) => {
  const { popularMovies, genreList, sortedMovie } = useSelector(
    (state) => state.movie
  );
  const navigate = useNavigate();
  console.log("sortedMovie", sortedMovie);
  return (
    <>
      {sortedMovie
        ? sortedMovie?.map((item) => (
            <div
              className="movies-banner"
              style={{
                height: "550px",
                width: "350px",
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.backdrop_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "10px",
                cursor: "pointer",
                padding: "15px",
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
                <div style={{ flexDirection: "colum", marginLeft: "20px" }}>
                  <h3 className="title">{item.title}</h3>
                  <p style={{ color: "#9ac7fa" }}>
                    {/* {item.release_date.slice(0, 4)} */}
                    {item.release_date}
                  </p>
                </div>
              </div>
              <div className="hahaha">
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge
                      bg="danger"
                      style={{
                        padding: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
                </div>
                <p className="overview">{item.overview}</p>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BsFillShieldFill />
                    {item.vote_average}
                  </div>
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BsFillPeopleFill />
                    {item.popularity}
                  </div>
                  <div
                    style={{
                      color: "red",
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "fantasy",
                    }}
                  >
                    {item.adult === false ? "Under 18" : ""}
                  </div>
                </div>
              </div>
            </div>
          ))
        : popularMovies?.results?.map((item) => (
            <div
              className="img-banner"
              style={{
                height: "550px",
                width: "350px",
                backgroundImage:
                  "url(" +
                  `https://www.themoviedb.org/t/p/w220_and_h330_face${item.backdrop_path}` +
                  ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                margin: "10px",
                cursor: "pointer",
                padding: "15px",
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
                <div style={{ flexDirection: "colum", marginLeft: "20px" }}>
                  <h3 className="title">{item.title}</h3>
                  <p style={{ color: "#9ac7fa" }}>
                    {item.release_date.slice(0, 4)}
                  </p>
                </div>
              </div>
              <div className="hahaha">
                <div>
                  {item.genre_ids.map((id) => (
                    <Badge
                      bg="danger"
                      style={{
                        padding: "10px",
                        marginRight: "10px",
                        marginTop: "10px",
                      }}
                    >
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
                </div>
                <p className="overview">{item.overview}</p>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BsFillShieldFill />
                    {item.vote_average}
                  </div>
                  <div
                    style={{
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <BsFillPeopleFill />
                    {item.popularity}
                  </div>
                  <div
                    style={{
                      color: "red",
                      marginRight: "10px",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "fantasy",
                    }}
                  >
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
