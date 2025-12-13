;
(function () {
  System.register(['./index-legacy-kz2gdOez.js', './vendor_react-legacy-HHx4U8Zg.js', './App-legacy-DfjKzIk2.js'], function (exports, module) {
    'use strict';

    var rzrApi, TagType, humpsExports, transformStandardResponseToCamelCase;
    return {
      setters: [module => {
        rzrApi = module.r;
        TagType = module.o;
      }, module => {
        humpsExports = module.E;
      }, module => {
        transformStandardResponseToCamelCase = module.t;
      }],
      execute: function () {
        const serviceCategoryApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeServiceCategories: builder.query({
              query: ({
                locationSlug,
                active
              }) => ({
                url: `locations/service-categories`,
                method: "GET",
                params: {
                  locationSlug,
                  ...(active !== void 0 && {
                    active: active ? 1 : 0
                  })
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.APP_LANG, TagType.SERVICES_GROUPS]
            }),
            createServiceCategory: builder.mutation({
              query: data => {
                const {
                  locationSlug,
                  active,
                  ...rest
                } = data;
                return {
                  url: `locations/service-categories/create`,
                  method: "POST",
                  body: {
                    ...humpsExports.decamelizeKeys(rest),
                    locationSlug,
                    // Keep locationSlug as camelCase
                    active: active !== void 0 ? active ? 1 : 0 : void 0
                  }
                };
              },
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.APP_LANG, TagType.SERVICES_GROUPS]
            }),
            updateServiceCategory: builder.mutation({
              query: data => {
                const {
                  serviceGroupIds,
                  active,
                  ...rest
                } = data;
                return {
                  url: `locations/service-categories/update`,
                  method: "PUT",
                  body: {
                    ...humpsExports.decamelizeKeys(rest),
                    serviceGroupIds,
                    // Keep serviceGroupIds as camelCase
                    active: active !== void 0 ? active ? 1 : 0 : void 0
                  }
                };
              },
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.APP_LANG, TagType.SERVICES_GROUPS]
            }),
            deleteServiceCategory: builder.mutation({
              query: id => ({
                url: `locations/service-categories/delete/${id}`,
                method: "DELETE"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.APP_LANG, TagType.SERVICES_GROUPS]
            })
          })
        });
        const {
          useGetFeServiceCategoriesQuery,
          useCreateServiceCategoryMutation,
          useUpdateServiceCategoryMutation,
          useDeleteServiceCategoryMutation
        } = serviceCategoryApi;
        exports({
          u: useGetFeServiceCategoriesQuery,
          a: useCreateServiceCategoryMutation,
          b: useUpdateServiceCategoryMutation,
          c: useDeleteServiceCategoryMutation
        });
      }
    };
  });
})();
