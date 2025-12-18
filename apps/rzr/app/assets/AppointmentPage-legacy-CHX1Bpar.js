;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './reservation.services-legacy-A9N9c31t.js', './App-legacy-D5YdjsCt.js', './vendor_ionic-legacy-DYIGQWbn.js', './appointment.constants-legacy-DGLfwUGc.js', './Pagination-legacy-DGU8NEfe.js', './NewsChyron-legacy-Dh0Fcfpd.js', './vendor_leaflet-legacy-DKuaEqMF.js', './index-legacy-I-Rab3Iu.js', './vendor_firebase-legacy-Bicf26rb.js', './news.fe-services-legacy-CQ8x6JvG.js'], function (exports, module) {
    'use strict';

    var reactExports, jsxRuntimeExports, format, parseISO, useTranslation, useGetFeLocationClientReservationsQuery, urlPrefix, useUser, activeLocation, useGetFeWorkersQuery, SceletonLoader, IonItem, IonIcon, cutOutline, IonLabel, IonList, AppointmentStatus, Pagination, NewsChyron;
    return {
      setters: [module => {
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        format = module.ay;
        parseISO = module.av;
        useTranslation = module.aD;
      }, module => {
        useGetFeLocationClientReservationsQuery = module.e;
      }, module => {
        urlPrefix = module.f;
        useUser = module.b;
        activeLocation = module.k;
        useGetFeWorkersQuery = module.j;
        SceletonLoader = module.l;
      }, module => {
        IonItem = module.q;
        IonIcon = module.l;
        cutOutline = module.bD;
        IonLabel = module.E;
        IonList = module.F;
      }, module => {
        AppointmentStatus = module.a;
      }, module => {
        Pagination = module.P;
      }, module => {
        NewsChyron = module.N;
      }, null, null, null, null],
      execute: function () {
        exports("default", AppointmentPage);
        function AppointmentItem({
          reservation,
          workersById
        }) {
          const color = reactExports.useMemo(() => {
            switch (reservation.status) {
              case AppointmentStatus.DRAFT:
                return "secondary";
              case AppointmentStatus.PENDING:
                return "warning";
              case AppointmentStatus.CONFIRMED:
                return "success";
              case AppointmentStatus.CANCELLED:
                return "danger";
              default:
                return "primary";
            }
          }, [reservation]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            className: "border m-2",
            routerLink: `${urlPrefix}/r/${reservation.hash}`,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon: cutOutline,
              color,
              className: "mr-2"
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
              children: workersById?.[reservation.locationWorkerId]?.fullName
            }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
              children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm")
            })]
          }, reservation.hash);
        }
        function ActiveAppointmentsList() {
          const {
            t
          } = useTranslation();
          const {
            userData
          } = useUser();
          const {
            data: clientReservations,
            isLoading: isClientReservationsLoading
          } = useGetFeLocationClientReservationsQuery({
            locationSlug: activeLocation,
            archive: 0
          }, {
            skip: !userData?.id
            // pollingInterval: 15000,
          });
          const {
            data: locationWorkers,
            isLoading: isWorkersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const clientReservationsList = clientReservations?.data;
          const workersById = reactExports.useMemo(() => locationWorkers?.data?.reduce((acc, worker) => {
            acc[worker.id] = worker;
            return acc;
          }, {}), [locationWorkers]);
          if (isClientReservationsLoading || isWorkersLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (!workersById) {
            return null;
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
            children: [!clientReservationsList?.length && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              className: "border-t mt-4",
              children: t("Nema podataka")
            }), clientReservationsList?.map(reservation => /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentItem, {
              reservation,
              workersById
            }, reservation.hash))]
          });
        }
        function ArchivedAppointmentsList() {
          const {
            t
          } = useTranslation();
          const {
            userData
          } = useUser();
          const [page, setPage] = reactExports.useState(1);
          const {
            data: clientReservations,
            isLoading: isClientReservationsLoading
          } = useGetFeLocationClientReservationsQuery({
            locationSlug: activeLocation,
            archive: 1,
            page,
            perPage: 10
          }, {
            skip: !userData?.id
          });
          const {
            data: locationWorkers,
            isLoading: isWorkersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const clientReservationsList = clientReservations?.data;
          const workersById = reactExports.useMemo(() => locationWorkers?.data?.reduce((acc, worker) => {
            acc[worker.id] = worker;
            return acc;
          }, {}), [locationWorkers]);
          if (isClientReservationsLoading || isWorkersLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (!workersById) {
            return null;
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
            children: [!clientReservationsList?.length && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              className: "border-t mt-4",
              children: t("Nema podataka")
            }), clientReservationsList?.map(reservation => /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentItem, {
              reservation,
              workersById
            }, reservation.hash)), clientReservations?.total && clientReservations.total > 0 && /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
              currentPage: page,
              totalPages: clientReservations.lastPage,
              onPageChange: setPage
            })]
          });
        }
        function AppointmentPage({
          activeStep = 0
        }) {
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(NewsChyron, {
              className: "ion-margin"
            }), activeStep === 0 && /* @__PURE__ */jsxRuntimeExports.jsx(ActiveAppointmentsList, {}), activeStep === 1 && /* @__PURE__ */jsxRuntimeExports.jsx(ArchivedAppointmentsList, {})]
          });
        }
      }
    };
  });
})();
