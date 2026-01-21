;
(function () {
  System.register(['./index-legacy-CYMNsaJ2.js'], function (exports, module) {
    'use strict';

    var rzrApi, transformStandardResponseToCamelCase, TagType, transformPaginationResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.v;
        transformStandardResponseToCamelCase = module.t;
        TagType = module.w;
        transformPaginationResponseToCamelCase = module.x;
      }],
      execute: function () {
        const workingShiftsApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeWorkingShiftsByDays: builder.query({
              query: params => ({
                url: `locations/working-shifts-days`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType.SHIFT,
                id: "LIST"
              }, TagType.USER]
            }),
            getFeWorkerWorkingShiftsByDays: builder.query({
              query: params => ({
                url: `locations/workers/shifts-by-days`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType.SHIFT_BY_DAYS,
                id: "LIST"
              }, TagType.USER]
            }),
            setFeWorkingDayShift: builder.mutation({
              query: body => ({
                url: `locations/set-working-day-shift`,
                method: "POST",
                body
              }),
              invalidatesTags: [{
                type: TagType.SHIFT_BY_DAYS,
                id: "LIST"
              }, {
                type: TagType.SHIFT,
                id: "LIST"
              }, TagType.USER]
            }),
            deleteFeWorkingDayShift: builder.mutation({
              query: body => ({
                url: `locations/delete-working-day-shift`,
                method: "DELETE",
                body
              }),
              invalidatesTags: [{
                type: TagType.SHIFT_BY_DAYS,
                id: "LIST"
              }, {
                type: TagType.SHIFT,
                id: "LIST"
              }, TagType.USER]
            }),
            getWorkingHours: builder.query({
              query: ({
                locationSlug,
                workerId
              }) => ({
                url: `location/working-hours`,
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
        exports({
          a: useGetFeWorkingShiftsByDaysQuery,
          u: useGetFeWorkerWorkingShiftsByDaysQuery,
          c: useSetFeWorkingDayShiftMutation,
          d: useDeleteFeWorkingDayShiftMutation,
          b: useGetWorkingHoursQuery
        });
      }
    };
  });
})();
