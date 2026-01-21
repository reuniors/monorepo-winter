;
(function () {
  System.register(['./index-legacy-CYMNsaJ2.js', './vendor_react-legacy-CSf8zLqi.js'], function (exports, module) {
    'use strict';

    var rzrApi, transformStandardResponseToCamelCase, TagId, TagType, transformPaginationResponseToCamelCase, humpsExports;
    return {
      setters: [module => {
        rzrApi = module.v;
        transformStandardResponseToCamelCase = module.t;
        TagId = module.M;
        TagType = module.w;
        transformPaginationResponseToCamelCase = module.x;
      }, module => {
        humpsExports = module.E;
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
