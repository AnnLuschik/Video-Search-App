import { createSlice } from '@reduxjs/toolkit';

const apiKey = 'AIzaSyDgkvG57b0sI7NJ5sYG4-16W7aC3hjRet0';

const removeDuplicates = (arr, nextArr) => Array.from(new Set([...arr, ...nextArr]
  .map((item) => JSON.stringify(item))))
  .map((item) => JSON.parse(item));

const initialState = {
  searchParams: null,
  responseData: null,
  loading: false,
  loadingMore: false,
  errorMessage: null,
};

export const youtubeSearchSlice = createSlice({
  name: 'youtubeSearch',
  initialState,
  reducers: {
    getVideosRequest: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.searchParams = {
        value: action.payload,
        start: '',
      };
    },
    getVideosSuccess: (state, action) => {
      state.responseData = action.payload;
      state.loading = false;
    },
    getVideosFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    getMoreVideosRequest: (state) => {
      state.loadingMore = true;
      state.errorMessage = null;
    },
    getMoreVideosSuccess: (state, action) => {
      state.loadingMore = false;
      // state.responseData = {
      //   ...action.payload,
      //   items: [...state.responseData.items, ...action.payload.items],
      // };
      state.responseData = {
        ...action.payload,
        items: removeDuplicates(state.responseData.items, action.payload.items),
      };
    },
    getMoreVideosFailure: (state, action) => {
      state.loadingMore = false;
      state.errorMessage = action.payload;
    },
    getVideoByIdRequest: (state, action) => {
      state.loading = true;
      state.errorMessage = null;
      state.searchParams = {
        value: action.payload.value,
        start: action.payload.start,
      };
    },
    getVideoByIdSuccess: (state, action) => {
      state.responseData = action.payload;
      state.loading = false;
    },
    getVideoByIdFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const {
  getVideosRequest, getVideosSuccess, getVideosFailure,
  getMoreVideosRequest, getMoreVideosSuccess, getMoreVideosFailure,
  getVideoByIdRequest, getVideoByIdSuccess, getVideoByIdFailure,
} = youtubeSearchSlice.actions;

export const youtubeSelector = (state) => state.youtubeSearch;

export function fetchVideos(payload) {
  return async (dispatch) => {
    dispatch(getVideosRequest(payload));

    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${payload}&type=video&key=${apiKey}`);
      const data = await response.json();
      if (data.error) {
        throw data.error;
      }
      dispatch(getVideosSuccess(data));
    } catch (error) {
      dispatch(getVideosFailure(error.message));
    }
  };
}

export function fetchMoreVideos() {
  return async (dispatch, getState) => {
    dispatch(getMoreVideosRequest());

    const { youtube: { searchParams: { value }, responseData: { nextPageToken } } } = getState();

    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${value}&pageToken=${nextPageToken}&type=video&key=${apiKey}`);
      const data = await response.json();

      dispatch(getMoreVideosSuccess(data));
    } catch (error) {
      dispatch(getMoreVideosFailure(error));
    }
  };
}

export function fetchVideoById(payload) {
  return async (dispatch) => {
    dispatch(getVideoByIdRequest(payload));

    try {
      const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${payload.value}&key=${apiKey}`);
      const data = await response.json();
      dispatch(getVideoByIdSuccess(data));
    } catch (error) {
      dispatch(getVideoByIdFailure(error.message));
    }
  };
}

export default youtubeSearchSlice.reducer;
