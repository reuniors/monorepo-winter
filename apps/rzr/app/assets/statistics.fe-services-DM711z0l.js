import { t as rzrApi, v as TagType } from "./index-B1uhtDiW.js";
import { H as transformStandardResponseToCamelCase } from "./App-Zs0gdlX8.js";
const statisticsApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientStatistics: builder.query({
      query: ({ clientId, locationSlug, forceUpdate }) => ({
        url: "statistics/client",
        method: "GET",
        params: { clientId, locationSlug, forceUpdate }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.CLIENT]
    }),
    getWorkerStatistics: builder.query({
      query: ({ workerId, locationSlug, forceUpdate }) => ({
        url: "statistics/worker",
        method: "GET",
        params: { workerId, locationSlug, forceUpdate }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.LOCATION_WORKERS]
    }),
    getLocationStatistics: builder.query({
      query: ({ locationSlug, forceUpdate }) => ({
        url: "statistics/location",
        method: "GET",
        params: { locationSlug, forceUpdate }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.LOCATION]
    })
  })
});
const {
  useGetClientStatisticsQuery,
  useGetWorkerStatisticsQuery,
  useGetLocationStatisticsQuery
} = statisticsApi;
export {
  useGetWorkerStatisticsQuery as a,
  useGetLocationStatisticsQuery as b,
  useGetClientStatisticsQuery as u
};
