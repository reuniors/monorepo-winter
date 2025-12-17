;
(function () {
  System.register(['./index-legacy-D4YSxuaQ.js', './vendor_react-legacy-xICptfoc.js', './App-legacy-B3_9n1No.js'], function (exports, module) {
    'use strict';

    var rzrApi, TagType, humpsExports, transformStandardResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.r;
        TagType = module.o;
      }, module => {
        humpsExports = module.E;
      }, module => {
        transformStandardResponseToCamelCase = module.A;
      }],
      execute: function () {
        const newsApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getNewsList: builder.query({
              query: ({
                locationSlug,
                ...filters
              }) => ({
                url: "news",
                method: "GET",
                params: {
                  locationSlug,
                  ...filters
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.NEWS]
            }),
            getNewsOne: builder.query({
              query: ({
                id
              }) => ({
                url: `news/${id}`,
                method: "GET",
                params: {
                  id
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.NEWS]
            }),
            getActiveNews: builder.query({
              query: ({
                locationSlug
              }) => ({
                url: "news/active",
                method: "GET",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.NEWS]
            }),
            createNews: builder.mutation({
              query: body => ({
                url: "news",
                method: "POST",
                body: humpsExports.decamelizeKeys(body)
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.NEWS]
            }),
            updateNews: builder.mutation({
              query: body => ({
                url: `news/${body.id}`,
                method: "PUT",
                body: humpsExports.decamelizeKeys(body)
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.NEWS]
            }),
            deleteNews: builder.mutation({
              query: ({
                id
              }) => ({
                url: `news/${id}`,
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
        exports({
          u: useGetNewsListQuery,
          c: useGetNewsOneQuery,
          d: useGetActiveNewsQuery,
          a: useCreateNewsMutation,
          b: useUpdateNewsMutation
        });
      }
    };
  });
})();
