import { r as rzrApi, o as TagType } from "./index-DITQ5hEX.js";
import { E as humpsExports } from "./vendor_react-BF1Ucyx8.js";
import { A as transformStandardResponseToCamelCase } from "./App-DRZn74Za.js";
const newsApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getNewsList: builder.query({
      query: ({ locationSlug, ...filters }) => ({
        url: "news",
        method: "GET",
        params: { locationSlug, ...filters }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.NEWS]
    }),
    getNewsOne: builder.query({
      query: ({ id }) => ({
        url: "news/".concat(id),
        method: "GET",
        params: { id }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.NEWS]
    }),
    getActiveNews: builder.query({
      query: ({ locationSlug }) => ({
        url: "news/active",
        method: "GET",
        params: { locationSlug }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.NEWS]
    }),
    createNews: builder.mutation(
      {
        query: (body) => ({
          url: "news",
          method: "POST",
          body: humpsExports.decamelizeKeys(body)
        }),
        transformResponse: transformStandardResponseToCamelCase,
        invalidatesTags: [TagType.NEWS]
      }
    ),
    updateNews: builder.mutation(
      {
        query: (body) => ({
          url: "news/".concat(body.id),
          method: "PUT",
          body: humpsExports.decamelizeKeys(body)
        }),
        transformResponse: transformStandardResponseToCamelCase,
        invalidatesTags: [TagType.NEWS]
      }
    ),
    deleteNews: builder.mutation({
      query: ({ id }) => ({
        url: "news/".concat(id),
        method: "DELETE"
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.NEWS]
    })
  })
});
const {
  useGetNewsListQuery,
  useGetNewsOneQuery,
  useGetActiveNewsQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation
} = newsApi;
export {
  useCreateNewsMutation as a,
  useUpdateNewsMutation as b,
  useGetNewsOneQuery as c,
  useGetActiveNewsQuery as d,
  useGetNewsListQuery as u
};
