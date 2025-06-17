import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventReducer from './eventSlice';
import blogReducer from './blogSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    blog: blogReducer,
  },
});

export default store; 