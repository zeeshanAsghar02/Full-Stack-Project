import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    createEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createEventSuccess: (state, action) => {
      state.loading = false;
      state.events.push(action.payload);
    },
    createEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateEventSuccess: (state, action) => {
      state.loading = false;
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    updateEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEventStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false;
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
    deleteEventFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  setSelectedEvent,
  createEventStart,
  createEventSuccess,
  createEventFailure,
  updateEventStart,
  updateEventSuccess,
  updateEventFailure,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,
} = eventSlice.actions;

export default eventSlice.reducer; 