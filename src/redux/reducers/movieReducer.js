import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../api";

let initialState = {
  popularMovies: {},
  topRateMovies: {},
  upComingMovies: {},
  loading: true,
  genreList: [],
  selectedMovie: "",
  reviews: "",
  recommend: "",
  trailer: "",
};

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async (data, thunkAPI) => {
    try {
      //  dispatch(movieActions.loadingSuccess({ loading: true }));

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

      let [popularMovies, topRateMovies, upComingMovies, genreList] =
        await Promise.all([popularMovieApi, topRateApi, upComingApi, genreApi]);

      let totalApi = {
        popularMovies,
        topRateMovies,
        upComingMovies,
        genreList,
      };
      console.log("totalApi", totalApi);
      return thunkAPI.fulfillWithValue(totalApi);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const detailMovie = createAsyncThunk(
  "movie/detailMovie",
  async (data, thunkAPI) => {
    const id = data;
    try {
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

      let totalApi = {
        selected,
        reviews,
        recommended,
        genreList,
      };
      return thunkAPI.fulfillWithValue(totalApi);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const Trailer = createAsyncThunk(
  "movie/trailer",
  async (data, thunkAPI) => {
    const id = data;
    try {
      const tailerApi = await api.get(
        `/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      return thunkAPI.fulfillWithValue(tailerApi);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pagination = createAsyncThunk(
  "movie/pagination",
  async (data, thunkAPI) => {
    const { page, size } = data;
    try {
      const popularMovieApi = await api.get(
        `/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&size=${size}`
      );
      return thunkAPI.fulfillWithValue(popularMovieApi);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const search = createAsyncThunk(
  "movie/search",
  async (data, thunkAPI) => {
    const { searchQuery } = data;
    try {
      const searchApi = await api.get(
        `/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&include_adult=false`
      );
      return thunkAPI.fulfillWithValue(searchApi);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadingSuccess(state, action) {
      state.loading = action.payload.loading;
    },
    // getAllMovies(state, action) {
    //   state.popularMovies = action.payload.popularMovies.data;
    //   state.topRateMovies = action.payload.topRateMovies.data;
    //   state.upComingMovies = action.payload.upComingMovies.data;
    //   state.genreList = action.payload.genreList.data.genres;
    //   state.loading = false;
    // },
    getSelectedMovie(state, action) {
      state.selectedMovie = action.payload.selected.data;
      state.reviews = action.payload.reviews.data;
      state.recommend = action.payload.recommended.data;
      state.genreList = action.payload.genreList.data.genres;
      state.loading = false;
    },
    movieTrailer(state, action) {
      state.trailer = action.payload.tailerApi.data;
    },
    pagination(state, action) {
      state.popularMovies = action.payload.popularMovieApi.data;
    },
    search(state, action) {
      state.popularMovies = action.payload.searchApi.data;
    },
    loadingFailure(state, action) {
      state.loading = action.payload.loading;
    },
  },
  extraReducers: {
    [getMovies.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
      state.loading = true;
    },
    [getMovies.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.popularMovies = action.payload.popularMovies.data;
      state.topRateMovies = action.payload.topRateMovies.data;
      state.upComingMovies = action.payload.upComingMovies.data;
      state.genreList = action.payload.genreList.data.genres;
      state.loading = false;
    },
    [getMovies.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.loading = true;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [detailMovie.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
      state.loading = true;
    },
    [detailMovie.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.selectedMovie = action.payload.selected.data;
      state.reviews = action.payload.reviews.data;
      state.recommend = action.payload.recommended.data;
      state.genreList = action.payload.genreList.data.genres;
      state.loading = false;
    },
    [detailMovie.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.loading = true;
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [Trailer.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [Trailer.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.trailer = action.payload.data;
    },
    [Trailer.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [pagination.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [pagination.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.popularMovies = action.payload.data;
    },
    [pagination.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },

    [search.pending]: (state, action) => {
      console.log("pending 상태", action); // Promise가 pending일때 dispatch
    },
    [search.fulfilled]: (state, action) => {
      console.log("fulfilled 상태", action); // Promise가 fullfilled일 때 dispatch
      state.popularMovies = action.payload.data;
    },
    [search.rejected]: (state, action) => {
      console.log("rejected 상태", action); // Promise가 rejected일 때 dispatch
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const movieActions = movieSlice.actions;
export default movieSlice.reducer;
