;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './reservation.services-legacy-DKhy1csD.js', './App-legacy-DhSLasgw.js', './vendor_ionic-legacy-C5RSb9DR.js', './appointment.constants-legacy-DGLfwUGc.js', './Pagination-legacy-6FjhlH8A.js', './NewsChyron-legacy-Cmc_kRKd.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-CL_X7O6r.js', './vendor_firebase-legacy-BEYs4Jgn.js', './news.fe-services-legacy-BdvwGbHk.js'], function (exports, module) {
    'use strict';

    var reactExports, jsxRuntimeExports, format, parseISO, useTranslation, useGetFeLocationClientReservationsQuery, urlPrefix, useUser, activeLocation, useGetFeWorkersQuery, SceletonLoader, IonItem, IonIcon, cutOutline, IonLabel, IonList, AppointmentStatus, Pagination, NewsChyron;
    return {
      setters: [module => {
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        format = module.aC;
        parseISO = module.az;
        useTranslation = module.a3;
      }, module => {
        useGetFeLocationClientReservationsQuery = module.e;
      }, module => {
        urlPrefix = module.f;
        useUser = module.b;
        activeLocation = module.m;
        useGetFeWorkersQuery = module.o;
        SceletonLoader = module.q;
      }, module => {
        IonItem = module.q;
        IonIcon = module.l;
        cutOutline = module.bH;
        IonLabel = module.F;
        IonList = module.G;
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
