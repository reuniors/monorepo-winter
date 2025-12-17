import { r as rzrApi, u as TagId, o as TagType } from "./index-CyEsMI4q.js";
import { E as humpsExports } from "./vendor_react-Begs2_df.js";
import { A as transformStandardResponseToCamelCase, a2 as transformPaginationResponseToCamelCase } from "./App-Bv0n3nAb.js";
const reservationApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeReservation: builder.mutation({
      query: (body) => ({
        url: "locations/reservations/create-new",
        method: "POST",
        body
      }),
      invalidatesTags: [
        { type: TagType.RESERVATION, id: TagId.LIST },
        TagType.USER_NOTIFICATIONS
      ]
    }),
    updateFeReservation: builder.mutation({
      query: ({ clientData, ...body }) => ({
        url: "locations/reservations/update",
        method: "PUT",
        body: {
          ...body,
          clientData: humpsExports.decamelizeKeys(clientData)
        }
      }),
      invalidatesTags: (result) => {
        var _a;
        return [
          { type: TagType.RESERVATION, id: TagId.LIST },
          { type: TagType.RESERVATION, id: (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.hash },
          TagType.USER_NOTIFICATIONS
        ];
      }
    }),
    getOneFeReservation: builder.query({
      query: (params) => ({
        url: "locations/reservations/get-one",
        method: "GET",
        params
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: (result) => {
        var _a;
        return [
          { type: TagType.RESERVATION, id: (_a = result == null ? void 0 : result.data) == null ? void 0 : _a.hash },
          TagType.USER
        ];
      }
    }),
    getFeLocationReservations: builder.query({
      query: (params) => ({
        url: "locations/reservations",
        method: "GET",
        params
      }),
      transformResponse: transformPaginationResponseToCamelCase,
      providesTags: [
        { type: TagType.RESERVATION, id: TagId.LIST },
        TagType.USER
      ]
    }),
    getFeLocationClientReservations: builder.query({
      query: (params) => ({
        url: "locations/reservations/client",
        method: "GET",
        params
      }),
      transformResponse: transformPaginationResponseToCamelCase,
      providesTags: [
        { type: TagType.RESERVATION, id: TagId.LIST },
        TagType.USER
      ]
    }),
    getFePromoCodeData: builder.query({
      query: (params) => ({
        url: "locations/promo-codes/find",
        method: "GET",
        params
      }),
      transformResponse: transformStandardResponseToCamelCase
    })
  })
});
const {
  useCreateFeReservationMutation,
  useGetOneFeReservationQuery,
  useUpdateFeReservationMutation,
  useGetFeLocationReservationsQuery,
  useGetFeLocationClientReservationsQuery,
  useGetFePromoCodeDataQuery
} = reservationApi;
export {
  useGetFePromoCodeDataQuery as a,
  useGetOneFeReservationQuery as b,
  useUpdateFeReservationMutation as c,
  useGetFeLocationReservationsQuery as d,
  useGetFeLocationClientReservationsQuery as e,
  useCreateFeReservationMutation as u
};
