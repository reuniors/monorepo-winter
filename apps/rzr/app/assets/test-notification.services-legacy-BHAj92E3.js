;
(function () {
  System.register(['./index-legacy-C5NlRqhK.js'], function (exports, module) {
    'use strict';

    var sharedApi, TagType;
    return {
      setters: [module => {
        sharedApi = module.s;
        TagType = module.a;
      }],
      execute: function () {
        const testNotificationApi = sharedApi.injectEndpoints({
          endpoints: builder => ({
            getAdminUsers: builder.query({
              query: ({
                locationSlug,
                page = 1,
                perPage = 20,
                search
              }) => ({
                url: `admin/users`,
                params: {
                  locationSlug,
                  page,
                  perPage,
                  search
                }
              }),
              providesTags: result => result ? [...result.data.data.map(({
                id
              }) => ({
                type: TagType.ADMIN_USERS,
                id
              })), {
                type: TagType.ADMIN_USERS,
                id: "LIST"
              }] : [{
                type: TagType.ADMIN_USERS,
                id: "LIST"
              }]
            }),
            getUserConnectedDevices: builder.query({
              query: ({
                locationSlug,
                userId
              }) => ({
                url: `admin/users/${userId}/connected-devices`,
                params: {
                  locationSlug
                }
              }),
              providesTags: (result, error, {
                userId
              }) => [{
                type: TagType.USER_DEVICES,
                id: userId
              }]
            }),
            sendTestNotification: builder.mutation({
              query: body => ({
                url: `admin/notifications/test`,
                method: "POST",
                body
              })
            })
          })
        });
        const {
          useGetAdminUsersQuery,
          useGetUserConnectedDevicesQuery,
          useSendTestNotificationMutation
        } = testNotificationApi;
        exports({
          u: useGetAdminUsersQuery,
          a: useGetUserConnectedDevicesQuery,
          b: useSendTestNotificationMutation
        });
      }
    };
  });
})();
