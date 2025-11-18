;
(function () {
  System.register(['./vendor_react-legacy-CWUgxXrv.js', './App-legacy-DluTxaR-.js', './vendor_ionic-legacy-CtJTU_-p.js', './appointment.constants-legacy-DGLfwUGc.js', './Pagination-legacy-C92Ge7XN.js', './vendor_leaflet-legacy-SWrD2G_G.js', './index-legacy-DzHmmkBv.js', './vendor_firebase-legacy-BNPMIeNn.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, t, format, parseISO, reactExports, urlPrefix, useGetUserNotificationsQuery, activeLocation, SceletonLoader, IonItem, IonIcon, notificationsCircle, IonLabel, IonList, AppointmentStatus, Pagination;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
        t = module.a0;
        format = module.ay;
        parseISO = module.av;
        reactExports = module.e;
      }, module => {
        urlPrefix = module.f;
        useGetUserNotificationsQuery = module.a0;
        activeLocation = module.h;
        SceletonLoader = module.S;
      }, module => {
        IonItem = module.o;
        IonIcon = module.i;
        notificationsCircle = module.bw;
        IonLabel = module.D;
        IonList = module.E;
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
            className: "border m-2",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon: notificationsCircle,
              className: "mr-2",
              color: reservationStatus === AppointmentStatus.CONFIRMED ? "success" : reservationStatus === AppointmentStatus.CANCELLED ? "danger" : reservationStatus === AppointmentStatus.PENDING ? "warning" : "medium"
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
              children: t(`${notification.description}`)
            }), reservation && reservation.dateUtc && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
              children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm")
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
