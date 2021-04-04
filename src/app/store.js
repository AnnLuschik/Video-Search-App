import { configureStore } from '@reduxjs/toolkit';
import youtubeSearchReducer from '../YouTube/searchSlice';

export default configureStore({
  reducer: {
    youtube: youtubeSearchReducer,
  },
});
