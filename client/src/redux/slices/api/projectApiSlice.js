import { apiSlice } from "../apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Project", "Workspace"],
    }),
    getProject: builder.query({
      query: (id) => `/project/${id}`,
      providesTags: ["Project"],
    }),
  }),
});

export const { useCreateProjectMutation, useGetProjectQuery } = projectApiSlice;
