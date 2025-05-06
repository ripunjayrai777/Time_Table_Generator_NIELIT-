// Redux Store (redux/store.js)
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import roomReducer from "./Room/roomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
  },
});

export default store;
