;
(function () {
  System.register(['./index-legacy-Db4Np-d0.js', './App-legacy-ZC0v4nxy.js'], function (exports, module) {
    'use strict';

    var rzrApi, TagType, transformStandardResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.r;
        TagType = module.o;
      }, module => {
        transformStandardResponseToCamelCase = module.t;
      }],
      execute: function () {
        const statisticsApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getClientStatistics: builder.query({
              query: ({
                clientId,
                locationSlug,
                forceUpdate
              }) => ({
                url: "statistics/client",
                method: "GET",
                params: {
                  clientId,
                  locationSlug,
                  forceUpdate
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.CLIENT]
            }),
            getWorkerStatistics: builder.query({
              query: ({
                workerId,
                locationSlug,
                forceUpdate
              }) => ({
                url: "statistics/worker",
                method: "GET",
                params: {
                  workerId,
                  locationSlug,
                  forceUpdate
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.LOCATION_WORKERS]
            }),
            getLocationStatistics: builder.query({
              query: ({
                locationSlug,
                forceUpdate
              }) => ({
                url: "statistics/location",
                method: "GET",
                params: {
                  locationSlug,
                  forceUpdate
                }
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
        exports({
          u: useGetClientStatisticsQuery,
          a: useGetWorkerStatisticsQuery,
          b: useGetLocationStatisticsQuery
        });
      }
    };
  });
})();
