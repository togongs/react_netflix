import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "../redux/actions/movieAction";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Container,
  Row,
  Tabs,
  Tab,
  Badge,
  Button,
  Modal,
} from "react-bootstrap";
import YouTube from "react-youtube";
import { detailMovie, Trailer } from "../redux/reducers/movieReducer";
import { BsFillPeopleFill, BsFillShieldFill, BsFilm } from "react-icons/bs";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { selectedMovie, reviews, recommend, loading, genreList, trailer } =
    useSelector((state) => state.movie);
  const { id } = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  // api 호출
  useEffect(() => {
    console.log("detail action으로");
    dispatch(detailMovie(id));
    dispatch(Trailer(id));
  }, []);

  if (loading) {
    return <ClipLoader color="#fff" loading={loading} size={150} />;
  }

  return (
    <Container>
      <div className="detail-container">
        <img
          className="detail-card"
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie.poster_path}`}
        />

        <div style={{ marginLeft: "40px" }}>
          {console.log("selectedMovie", selectedMovie)}
          <div style={{ display: "flex" }}>
            {selectedMovie?.genres?.map((item) => (
              <Badge
                bg="danger"
                style={{ padding: "10px", marginRight: "10px" }}
              >
                {item.name}
              </Badge>
            ))}
          </div>
          <p style={{ fontSize: "65px" }}>{selectedMovie?.title}</p>
          <p style={{ fontSize: "36px" }}>{selectedMovie?.tagline}</p>

          <div style={{ display: "flex" }}>
            <p
              style={{
                marginRight: "10px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BsFillShieldFill />
              {selectedMovie?.vote_average}
            </p>

            <p
              style={{
                marginRight: "10px",
                fontSize: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BsFillPeopleFill />
              {selectedMovie?.popularity}
            </p>
            <p
              style={{
                marginRight: "10px",
                fontSize: "22px",
                fontWeight: "800",
                color: "red",
              }}
            >
              {selectedMovie?.adult ? "청불" : "Under 18"}
            </p>
          </div>
          <hr />
          <p>{selectedMovie?.overview}</p>
          <hr />
          <p>
            <Badge
              bg="danger"
              style={{
                padding: "5px",
                marginRight: "10px",
                fontSize: "15px",
                width: "120px",
                fontWeight: "400",
              }}
            >
              Budget
            </Badge>
            ${selectedMovie?.budget}
          </p>
          <p>
            <Badge
              bg="danger"
              style={{
                padding: "5px",
                marginRight: "10px",
                fontSize: "15px",
                width: "120px",
                fontWeight: "400",
              }}
            >
              Revenue
            </Badge>
            ${selectedMovie?.revenue}
          </p>
          <p>
            <Badge
              bg="danger"
              style={{
                padding: "5px",
                marginRight: "10px",
                fontSize: "15px",
                width: "120px",
                fontWeight: "400",
              }}
            >
              Release Day
            </Badge>
            {selectedMovie?.release_date}
          </p>
          <p>
            <Badge
              bg="danger"
              style={{
                padding: "5px",
                marginRight: "10px",
                fontSize: "15px",
                width: "120px",
                fontWeight: "400",
              }}
            >
              Runing Time
            </Badge>
            {selectedMovie?.runtime} Minute
          </p>
          <hr />
          <Button
            variant="black"
            onClick={handleShow}
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#fe4536",
              display: "flex",
              alignItems: "center",
            }}
          >
            <BsFilm />
            Watch trailer
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} animation={false} size="xl">
        <Modal.Body>
          {selectedMovie?.id === trailer?.id && (
            <YouTube
              videoId={trailer?.results?.key}
              opts={opts}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        {console.log("reviews", reviews)}
        <Tab eventKey="home" title={`REVIEWS (${reviews?.results?.length})`}>
          <div
            style={{
              border: "4px solid white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {reviews?.results?.map((item) => (
              <div
                style={{
                  padding: "20px",
                  width: "90%",
                  borderBottom: "1px solid white",
                }}
              >
                <div>{item.author}</div>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        </Tab>

        {console.log("추천영화", recommend)}
        <Tab
          eventKey="profile"
          title={`RELATED MOVIES (${recommend?.results?.length})`}
        >
          <Row>
            {recommend?.results?.map((item) => (
              <div
                className="recommend-card"
                style={{
                  backgroundImage:
                    "url(" +
                    `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` +
                    ")",
                  width: "40%",
                  height: "300px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  margin: "10px auto",
                  paddingLeft: "0px",
                  paddingRight: "0px",
                }}
              >
                <div className="overlay">
                  <h1>{item.title}</h1>
                  <p>
                    {item.genre_ids.map((id) => (
                      <Badge
                        bg="danger"
                        style={{ padding: "10px", marginRight: "10px" }}
                      >
                        {genreList.find((item) => item.id === id).name}
                      </Badge>
                    ))}
                  </p>

                  <div style={{ display: "flex" }}>
                    <p
                      style={{
                        marginRight: "10px",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BsFillShieldFill />
                      {item.vote_average}
                    </p>
                    <p
                      style={{
                        marginRight: "10px",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BsFillPeopleFill />
                      {item.popularity}
                    </p>
                    <p
                      style={{
                        marginRight: "10px",
                        fontSize: "20px",
                        display: "flex",
                        alignItems: "center",
                        color: "red",
                        fontFamily: "fantasy",
                      }}
                    >
                      {item.adult === false ? "Under 18" : ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MovieDetail;
