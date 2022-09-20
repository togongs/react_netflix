import React, { useEffect } from "react";
import { movieAction } from "../redux/actions/movieAction";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../components/Banner";
import MovieSlide from "../components/MovieSlide";
import ClipLoader from "react-spinners/ClipLoader";
import { getMovies } from "../redux/reducers/movieReducer";

// redux에서 api처리는? -> redux middleware에서 call
const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, topRateMovies, upComingMovies, loading } = useSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  // loading true : 데이터 도착 전
  if (loading) {
    return <ClipLoader color="#fff" loading={loading} size={150} />;
  }
  // loading false : 데이터 도착 후
  return (
    <div>
      {console.log("popularMovies", popularMovies)}
      <Banner movie={popularMovies?.results[0]} />

      <div style={{ width: "80%", margin: "0 auto" }}>
        <h1>Popular Movie</h1>
        <MovieSlide movies={popularMovies} />
        <h1>Top rated Movie</h1>
        <MovieSlide movies={topRateMovies} />
        <h1>Upcoming Movie</h1>
        <MovieSlide movies={upComingMovies} />
      </div>
    </div>
  );
};

export default Home;
