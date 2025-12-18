import { r as rzrApi, o as TagType } from "./index-CC8Rp0im.js";
import { A as transformStandardResponseToCamelCase, a2 as transformPaginationResponseToCamelCase } from "./App-BRoMxjGu.js";
const workingShiftsApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeWorkingShiftsByDays: builder.query({
      query: (params) => ({
        url: "locations/working-shifts-days",
        method: "GET",
        params
      }),
      transformResponse: transformPaginationResponseToCamelCase,
      providesTags: [{ type: TagType.SHIFT, id: "LIST" }, TagType.USER]
    }),
    getFeWorkerWorkingShiftsByDays: builder.query({
      query: (params) => ({
        url: "locations/workers/shifts-by-days",
        method: "GET",
        params
      }),
      transformResponse: transformPaginationResponseToCamelCase,
      providesTags: [{ type: TagType.SHIFT_BY_DAYS, id: "LIST" }, TagType.USER]
    }),
    setFeWorkingDayShift: builder.mutation({
      query: (body) => ({
        url: "locations/set-working-day-shift",
        method: "POST",
        body
      }),
      invalidatesTags: [
        { type: TagType.SHIFT_BY_DAYS, id: "LIST" },
        { type: TagType.SHIFT, id: "LIST" },
        TagType.USER
      ]
    }),
    deleteFeWorkingDayShift: builder.mutation({
      query: (body) => ({
        url: "locations/delete-working-day-shift",
        method: "DELETE",
        body
      }),
      invalidatesTags: [
        { type: TagType.SHIFT_BY_DAYS, id: "LIST" },
        { type: TagType.SHIFT, id: "LIST" },
        TagType.USER
      ]
    }),
    getWorkingHours: builder.query({
      query: ({ locationSlug, workerId }) => ({
        url: "location/working-hours",
        params: {
          locationSlug,
          workerId
        },
        method: "GET"
      }),
      transformResponse: transformStandardResponseToCamelCase
    })
  })
});
const {
  useGetFeWorkingShiftsByDaysQuery,
  useGetFeWorkerWorkingShiftsByDaysQuery,
  useSetFeWorkingDayShiftMutation,
  useDeleteFeWorkingDayShiftMutation,
  useGetWorkingHoursQuery
} = workingShiftsApi;
export {
  useGetFeWorkingShiftsByDaysQuery as a,
  useGetWorkingHoursQuery as b,
  useSetFeWorkingDayShiftMutation as c,
  useDeleteFeWorkingDayShiftMutation as d,
  useGetFeWorkerWorkingShiftsByDaysQuery as u
};
