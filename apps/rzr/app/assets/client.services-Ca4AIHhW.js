import { r as rzrApi, o as TagType } from "./index-B8xlO4-Z.js";
import { E as humpsExports } from "./vendor_react-AVDGa64O.js";
import { _ as transformPaginationResponseToCamelCase, B as transformStandardResponseToCamelCase } from "./App-oqSqwiE_.js";
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
