import { apiSlice } from "../apiSlice";

export const workspaceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "/workspace/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Workspace"],
    }),
    getWorkspaces: builder.query({
      query: () => "/workspace",
      providesTags: ["Workspace"],
    }),
    getWorkspace: builder.query({
      query: (id) => `/workspace/${id}`,
      providesTags: ["Workspace"],
    }),
  }),
});

export const {
  useCreateWorkspaceMutation,
  useGetWorkspacesQuery,
  useGetWorkspaceQuery,
} = workspaceApiSlice;
