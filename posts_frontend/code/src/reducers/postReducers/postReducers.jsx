import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const postApiURL = "http://localhost:3000/posts"

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(postApiURL);
  return response.data?.posts;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  const response = await axios.post(postApiURL, post);
  return response.data?.post;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (post) => {
  const response = await axios.put(`${postApiURL}/${post.id}`, post);
  return response.data?.post;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const response = await axios.delete(`${postApiURL}/${id}`);
  return response.data?.post;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post.id === action.payload.id);
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(post => post.id !== action.payload.id);
      });
  },
});

export default postsSlice.reducer;