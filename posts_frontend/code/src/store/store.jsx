import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '$reducers/postReducers';

const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;