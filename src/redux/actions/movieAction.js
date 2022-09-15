import api from "../api";
import { movieActions } from "../reducers/movieReducer";

// 일반 function으로 비동기처리
function getMovies() {
  return async (dispatch) => {
    try {
      // loading 도착전
      dispatch(movieActions.loadingSuccess({ loading: true }));

      const popularMovieApi = api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const topRateApi = api.get(
        `/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const upComingApi = api.get(
        `/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const genreApi = api.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      // 1번의 await로 병렬적으로 동시에 실행 전부 resolve될때까지 대기 :: 퍼포먼스 향상
      let [popularMovies, topRateMovies, upComingMovies, genreList] =
        await Promise.all([popularMovieApi, topRateApi, upComingApi, genreApi]);

      //   dispatch({
      //     type: "GET_MOVIES_SUCCESS",
      //     payload: {
      //       popularMovies: popularMovies.data,
      //       topRateMovies: topRateMovies.data,
      //       upComingMovies: upComingMovies.data,
      //     },
      //   });

      // loading 도착 후
      dispatch(
        movieActions.getAllMovies({
          popularMovies,
          topRateMovies,
          upComingMovies,
          genreList,
        })
      );
    } catch (error) {
      //   dispatch({ type: "GET_MOVIES_FAILURE" });
      dispatch(movieActions.loadingFailure({ loading: false }));
    }
  };
}

function detailMovie(id) {
  return async (dispatch) => {
    try {
      // loading 도착전
      dispatch(movieActions.loadingSuccess({ loading: true }));

      const selectedMovieApi = api.get(
        `/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      const reviewsApi = api.get(
        `/movie/${id}/reviews?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      const recommendedMovieApi = api.get(
        `/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );

      const genreApi = api.get(
        `/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      let [selected, reviews, recommended, genreList] = await Promise.all([
        selectedMovieApi,
        reviewsApi,
        recommendedMovieApi,
        genreApi,
      ]);

      // loading 도착 후
      dispatch(
        movieActions.getSelectedMovie({
          selected,
          reviews,
          recommended,
          genreList,
        })
      );
    } catch (error) {
      dispatch(movieActions.loadingFailure({ loading: false }));
    }
  };
}

function trailer(id) {
  return async (dispatch) => {
    try {
      const tailerApi = await api.get(
        `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      dispatch(movieActions.movieTrailer({ tailerApi }));
      console.log("트레일러??", tailerApi);
    } catch (error) {}
  };
}

function pagination(page, size) {
  return async (dispatch) => {
    try {
      // API Endpoint 구성방식
      // page는 현재 페이지, size는 한 페이지 내에서 보여줄 아이템의 개수이다.
      const popularMovieApi = await api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&size=${size}`
      );
      dispatch(movieActions.pagination({ popularMovieApi }));
      console.log("popularMovieApi", popularMovieApi);
    } catch (error) {}
  };
}

function search(searchQuery) {
  return async (dispatch) => {
    const searchApi = await api.get(
      `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`
    );
    dispatch(movieActions.search({ searchApi }));
    console.log("searchApi????????", searchApi);
  };
}

export const movieAction = {
  getMovies,
  detailMovie,
  trailer,
  pagination,
  search,
};
