import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
  selectedPost: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    fetchPostsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPostsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    fetchPostsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
    },
    createPostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createPostSuccess: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    createPostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updatePostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updatePostSuccess: (state, action) => {
      state.loading = false;
      const index = state.posts.findIndex((post) => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    updatePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletePostStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    deletePostFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  setSelectedPost,
  createPostStart,
  createPostSuccess,
  createPostFailure,
  updatePostStart,
  updatePostSuccess,
  updatePostFailure,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = blogSlice.actions;

export default blogSlice.reducer; 