;
(function () {
  System.register(['./index-legacy-D1XlU8IL.js', './vendor_react-legacy-B0yst0tN.js', './App-legacy-D5D6TSxV.js'], function (exports, module) {
    'use strict';

    var rzrApi, TagType, humpsExports, transformPaginationResponseToCamelCase, transformStandardResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.r;
        TagType = module.o;
      }, module => {
        humpsExports = module.E;
      }, module => {
        transformPaginationResponseToCamelCase = module.a2;
        transformStandardResponseToCamelCase = module.A;
      }],
      execute: function () {
        const clientApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeClientData: builder.query({
              query: () => ({
                url: `users/client-data`,
                method: "GET"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.CLIENT, TagType.USER]
            }),
            updateFeClientData: builder.mutation({
              query: body => ({
                url: `users/client`,
                method: "POST",
                body: humpsExports.decamelizeKeys(body)
              }),
              invalidatesTags: [TagType.CLIENT]
            }),
            getFeLocationClients: builder.query({
              query: params => ({
                url: `locations/clients`,
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.USER]
            }),
            getUserNotifications: builder.query({
              query: params => ({
                url: `users/notifications`,
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
        exports({
          u: useGetFeClientDataQuery,
          b: useUpdateFeClientDataMutation,
          a: useGetFeLocationClientsQuery,
          c: useGetUserNotificationsQuery
        });
      }
    };
  });
})();
