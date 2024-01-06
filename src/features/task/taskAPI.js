import { apiSlice } from "../api/apiSlice";

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
    getTasks: builder.query({
      query: () => "/tasks",
    }),
    addTask: builder.mutation({
      query: (data) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          if (res?.data?.id) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                draft.push(res.data);
              })
            );
          }
        } catch (error) {
          console.log("Error occure!");
        }
      },
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const delResult = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) =>
            // eslint-disable-next-line eqeqeq
            draft.filter((t) => t.id != arg)
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          delResult.undo();
        }
      },
    }),
    changeTaskStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: { status },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const Result = dispatch(
          apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
            // eslint-disable-next-line eqeqeq
            const draftTask = draft.find((t) => t.id == arg.id);
            draftTask.status = arg.status;
          })
        );
        try {
          const res = await queryFulfilled;
          if (res?.meta?.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getTask",
                arg.id.toString(),
                (draft) => {
                  draft.status = arg.status;
                }
              )
            );
          }
        } catch (error) {
          Result.undo();
        }
      },
    }),
    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          if (res?.meta?.response?.status === 200) {
            dispatch(
              apiSlice.util.updateQueryData("getTasks", undefined, (draft) => {
                // eslint-disable-next-line eqeqeq
                const draftTask = draft.find((t) => t.id == arg.id);
                draftTask.taskName = arg.data.taskName;
                draftTask.teamMember = arg.data.teamMember;
                draftTask.project = arg.data.project;
                draftTask.deadline = arg.data.deadline;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getTask",
                arg.id.toString(),
                (draft) => {
                  draft.taskName = arg.data.taskName;
                  draft.teamMember = arg.data.teamMember;
                  draft.project = arg.data.project;
                  draft.deadline = arg.data.deadline;
                }
              )
            );
          }
        } catch (error) {
          console.log("Error occure!");
        }
      },
    }),
  }),
});

export const {
  useGetTaskQuery,
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useChangeTaskStatusMutation,
  useEditTaskMutation,
} = taskApi;
