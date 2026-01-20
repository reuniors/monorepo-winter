import { j as jsxRuntimeExports, a2 as t, aC as format, az as parseISO, e as reactExports } from "./vendor_react-g1Lb8P9R.js";
import { g as urlPrefix, n as activeLocation, r as SceletonLoader, P as Pagination } from "./App-BTZwZ6xb.js";
import { c as useGetUserNotificationsQuery } from "./client.services-CxQTZrpi.js";
import { r as IonItem, b as IonIcon, bP as notificationsCircle, G as IonLabel, H as IonList } from "./vendor_ionic-XqfGltiy.js";
import { a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import "./vendor_leaflet-BPPv1iLj.js";
import "./index-BVYNZAUg.js";
import "./vendor_firebase-DofBCW2C.js";
function NotificationItem({ notification }) {
  var _a;
  const reservation = (_a = notification.clientReservations) == null ? void 0 : _a[0];
  const reservationLink = reservation ? "".concat(urlPrefix, "/r/").concat(reservation.hash) : void 0;
  const reservationStatus = reservation == null ? void 0 : reservation.status;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonItem,
    {
      routerLink: reservationLink,
      className: "mb-2 rounded-lg hover:opacity-80 transition-opacity",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonIcon,
          {
            icon: notificationsCircle,
            className: "mr-2",
            color: reservationStatus === AppointmentStatus.CONFIRMED ? "success" : reservationStatus === AppointmentStatus.CANCELLED ? "danger" : reservationStatus === AppointmentStatus.PENDING ? "warning" : "medium"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: t("".concat(notification.description)) }),
          reservation && reservation.dateUtc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500", children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm") })
        ] })
      ]
    }
  );
}
function NotificationsList() {
  var _a, _b;
  const [currentPage, setCurrentPage] = reactExports.useState(0);
  const { data: notificationsResponse, isLoading: isNotificationsLoading } = useGetUserNotificationsQuery({
    locationSlug: activeLocation,
    page: currentPage
  });
  const notifications = notificationsResponse == null ? void 0 : notificationsResponse.data;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  if (isNotificationsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
      !(notifications == null ? void 0 : notifications.length) && /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { className: "border-t mt-4", children: t("Nema podataka") }),
      notifications == null ? void 0 : notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationItem, { notification }, notification.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pagination,
      {
        totalPages: (_a = notificationsResponse == null ? void 0 : notificationsResponse.lastPage) != null ? _a : 0,
        currentPage: (_b = notificationsResponse == null ? void 0 : notificationsResponse.currentPage) != null ? _b : 0,
        onPageChange: handlePageChange
      }
    )
  ] });
}
function NotificationPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsList, {}) });
}
export {
  NotificationPage as default
};
