;
(function () {
  System.register(['./index-legacy-CXapdytT.js', './vendor_react-legacy-B0yst0tN.js', './App-legacy-DELDG8Vs.js'], function (exports, module) {
    'use strict';

    var rzrApi, TagId, TagType, humpsExports, transformStandardResponseToCamelCase, transformPaginationResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.r;
        TagId = module.u;
        TagType = module.o;
      }, module => {
        humpsExports = module.E;
      }, module => {
        transformStandardResponseToCamelCase = module.A;
        transformPaginationResponseToCamelCase = module.a2;
      }],
      execute: function () {
        const reservationApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            createFeReservation: builder.mutation({
              query: body => ({
                url: `locations/reservations/create-new`,
                method: "POST",
                body
              }),
              invalidatesTags: [{
                type: TagType.RESERVATION,
                id: TagId.LIST
              }, TagType.USER_NOTIFICATIONS]
            }),
            updateFeReservation: builder.mutation({
              query: ({
                clientData,
                ...body
              }) => ({
                url: `locations/reservations/update`,
                method: "PUT",
                body: {
                  ...body,
                  clientData: humpsExports.decamelizeKeys(clientData)
                }
              }),
              invalidatesTags: result => [{
                type: TagType.RESERVATION,
                id: TagId.LIST
              }, {
                type: TagType.RESERVATION,
                id: result?.data?.hash
              }, TagType.USER_NOTIFICATIONS]
            }),
            getOneFeReservation: builder.query({
              query: params => ({
                url: `locations/reservations/get-one`,
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: result => [{
                type: TagType.RESERVATION,
                id: result?.data?.hash
              }, TagType.USER]
            }),
            getFeLocationReservations: builder.query({
              query: params => ({
                url: `locations/reservations`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType.RESERVATION,
                id: TagId.LIST
              }, TagType.USER]
            }),
            getFeLocationClientReservations: builder.query({
              query: params => ({
                url: `locations/reservations/client`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType.RESERVATION,
                id: TagId.LIST
              }, TagType.USER]
            }),
            getFePromoCodeData: builder.query({
              query: params => ({
                url: `locations/promo-codes/find`,
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
        exports({
          u: useCreateFeReservationMutation,
          b: useGetOneFeReservationQuery,
          c: useUpdateFeReservationMutation,
          d: useGetFeLocationReservationsQuery,
          e: useGetFeLocationClientReservationsQuery,
          a: useGetFePromoCodeDataQuery
        });
      }
    };
  });
})();
