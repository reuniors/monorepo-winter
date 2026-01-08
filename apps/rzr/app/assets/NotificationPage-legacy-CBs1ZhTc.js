;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './App-legacy-CeIZSQzJ.js', './client.services-legacy-DgpKSMzK.js', './vendor_ionic-legacy-C5RSb9DR.js', './appointment.constants-legacy-DGLfwUGc.js', './Pagination-legacy-6FjhlH8A.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-SMp-2h98.js', './vendor_firebase-legacy-BEYs4Jgn.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, t, format, parseISO, reactExports, urlPrefix, activeLocation, SceletonLoader, useGetUserNotificationsQuery, IonItem, IonIcon, notificationsCircle, IonLabel, IonList, AppointmentStatus, Pagination;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
        t = module.a0;
        format = module.aC;
        parseISO = module.az;
        reactExports = module.e;
      }, module => {
        urlPrefix = module.f;
        activeLocation = module.m;
        SceletonLoader = module.q;
      }, module => {
        useGetUserNotificationsQuery = module.c;
      }, module => {
        IonItem = module.q;
        IonIcon = module.l;
        notificationsCircle = module.bJ;
        IonLabel = module.F;
        IonList = module.G;
      }, module => {
        AppointmentStatus = module.a;
      }, module => {
        Pagination = module.P;
      }, null, null, null],
      execute: function () {
        exports("default", NotificationPage);
        function NotificationItem({
          notification
        }) {
          const reservation = notification.clientReservations?.[0];
          const reservationLink = reservation ? `${urlPrefix}/r/${reservation.hash}` : void 0;
          const reservationStatus = reservation?.status;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            routerLink: reservationLink,
            className: "mb-2 rounded-lg hover:opacity-80 transition-opacity",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon: notificationsCircle,
              className: "mr-2",
              color: reservationStatus === AppointmentStatus.CONFIRMED ? "success" : reservationStatus === AppointmentStatus.CANCELLED ? "danger" : reservationStatus === AppointmentStatus.PENDING ? "warning" : "medium"
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                children: t(`${notification.description}`)
              }), reservation && reservation.dateUtc && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-sm text-gray-400 dark:text-gray-500",
                children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm")
              })]
            })]
          });
        }
        function NotificationsList() {
          const [currentPage, setCurrentPage] = reactExports.useState(0);
          const {
            data: notificationsResponse,
            isLoading: isNotificationsLoading
          } = useGetUserNotificationsQuery({
            locationSlug: activeLocation,
            page: currentPage
          });
          const notifications = notificationsResponse?.data;
          const handlePageChange = page => {
            setCurrentPage(page);
          };
          if (isNotificationsLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              children: [!notifications?.length && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                className: "border-t mt-4",
                children: t("Nema podataka")
              }), notifications?.map(notification => /* @__PURE__ */jsxRuntimeExports.jsx(NotificationItem, {
                notification
              }, notification.id))]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
              totalPages: notificationsResponse?.lastPage ?? 0,
              currentPage: notificationsResponse?.currentPage ?? 0,
              onPageChange: handlePageChange
            })]
          });
        }
        function NotificationPage() {
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NotificationsList, {})
          });
        }
      }
    };
  });
})();
