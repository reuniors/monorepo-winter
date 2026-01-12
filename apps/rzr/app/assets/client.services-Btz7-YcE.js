import { t as rzrApi, v as TagType } from "./index-Cx2ECeB9.js";
import { I as humpsExports } from "./vendor_react-BAn6__hR.js";
import { a2 as transformPaginationResponseToCamelCase, H as transformStandardResponseToCamelCase } from "./App-D8jX3fz5.js";
const clientApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getFeClientData: builder.query({
      query: () => ({
        url: "users/client-data",
        method: "GET"
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.CLIENT, TagType.USER]
    }),
    updateFeClientData: builder.mutation({
      query: (body) => ({
        url: "users/client",
        method: "POST",
        body: humpsExports.decamelizeKeys(body)
      }),
      invalidatesTags: [TagType.CLIENT]
    }),
    getFeLocationClients: builder.query({
      query: (params) => ({
        url: "locations/clients",
        method: "GET",
        params
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.USER]
    }),
    getUserNotifications: builder.query({
      query: (params) => ({
        url: "users/notifications",
        method: "GET",
        params
      }),
      transformResponse: transformPaginationResponseToCamelCase,
      providesTags: [TagType.USER_NOTIFICATIONS]
    })
  })
});
const {
  useGetFeClientDataQuery,
  useUpdateFeClientDataMutation,
  useGetFeLocationClientsQuery,
  useGetUserNotificationsQuery
} = clientApi;
export {
  useGetFeLocationClientsQuery as a,
  useUpdateFeClientDataMutation as b,
  useGetUserNotificationsQuery as c,
  useGetFeClientDataQuery as u
};
