import { s as sharedApi, T as TagType } from "./index-Ied8tlTH.js";
const testNotificationApi = sharedApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query({
      query: ({ locationSlug, page = 1, perPage = 20, search }) => ({
        url: "admin/users",
        params: { locationSlug, page, perPage, search }
      }),
      providesTags: (result) => result ? [
        ...result.data.data.map(({ id }) => ({
          type: TagType.ADMIN_USERS,
          id
        })),
        { type: TagType.ADMIN_USERS, id: "LIST" }
      ] : [{ type: TagType.ADMIN_USERS, id: "LIST" }]
    }),
    getUserConnectedDevices: builder.query({
      query: ({ locationSlug, userId }) => ({
        url: "admin/users/".concat(userId, "/connected-devices"),
        params: { locationSlug }
      }),
      providesTags: (result, error, { userId }) => [
        { type: TagType.USER_DEVICES, id: userId }
      ]
    }),
    sendTestNotification: builder.mutation({
      query: (body) => ({
        url: "admin/notifications/test",
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
export {
  useGetUserConnectedDevicesQuery as a,
  useSendTestNotificationMutation as b,
  useGetAdminUsersQuery as u
};
