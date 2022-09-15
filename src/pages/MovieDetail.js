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
      <div>
        <div
          className="card"
          style={{
            backgroundImage:
              "url(" +
              `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${selectedMovie.poster_path}` +
              ")",
          }}
        >
          포스터
        </div>

        <div>
          <p>{selectedMovie?.title}</p>
          {console.log("selectedMovie", selectedMovie)}
          <div style={{ display: "flex" }}>
            {selectedMovie?.genres?.map((item) => (
              <Badge bg="danger" style={{ padding: "10px", margin: "10px" }}>
                {item.name}
              </Badge>
            ))}
          </div>
          <p>{selectedMovie?.vote_average}</p>
          <p>{selectedMovie?.overview}</p>
          <p>{selectedMovie?.revenue}</p>
          <p>{selectedMovie?.release_date}</p>
        </div>
      </div>

      <>
        {/* {console.log(trailer.map((item) => console.log(item.key)))} */}

        <Button variant="primary" onClick={handleShow}>
          Watch trailer
        </Button>

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
      </>

      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="REVIEWS">
          <div>
            {console.log("reviews", reviews)}
            {reviews?.results?.map((item) => (
              <div style={{ border: "4px solid white", padding: "20px" }}>
                <div>{item.author}</div>
                <div>{item.content}</div>
              </div>
            ))}
          </div>
        </Tab>
        <Tab eventKey="profile" title="RELATED MOVIES">
          {console.log("추천영화", recommend)}
          <Row>
            {recommend?.results?.map((item) => (
              <div
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
                }}
              >
                <h2>{item.title}</h2>
                <p>
                  {item.genre_ids.map((id) => (
                    <Badge bg="danger">
                      {/* {console.log("genreList", genreList)} */}
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
                </p>
                <p>{item.vote_average}</p>
                <p>{item.popularity}</p>
                <p>{item.adult === false ? "Under 18" : ""}</p>
              </div>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default MovieDetail;
