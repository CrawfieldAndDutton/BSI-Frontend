import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import customerReducer from "./customerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    customer: customerReducer,
  },
});

export default store;
