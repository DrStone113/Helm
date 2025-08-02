import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_URL = "http://localhost:8800/api";

const API_URL = import.meta.env.VITE_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL + "/api",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Task", "Workspace", "Project"],
  endpoints: () => ({}),
});
