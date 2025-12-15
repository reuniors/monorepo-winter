import { r as rzrApi, o as TagType } from "./index-B651NyBa.js";
import { E as humpsExports } from "./vendor_react-CcaSbe82.js";
import { a0 as transformPaginationResponseToCamelCase, t as transformStandardResponseToCamelCase } from "./App-Mqz5oeDp.js";
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
