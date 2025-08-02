import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer, { logout } from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import themeReducer from "./slices/themeSlice";

const appReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  theme: themeReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
