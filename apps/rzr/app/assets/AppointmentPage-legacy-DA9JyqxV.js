;
(function () {
  System.register(['./vendor_react-legacy-CFXrDSu1.js', './reservation.services-legacy-CTTpUHNj.js', './App-legacy-DT3CUYN8.js', './vendor_ionic-legacy-kFTPXAWE.js', './appointment.constants-legacy-DGLfwUGc.js', './Pagination-legacy-BxNr8-04.js', './NewsChyron-legacy-9XUsLKr3.js', './vendor_leaflet-legacy-DzrMDhpu.js', './index-legacy-D7f7Ap3o.js', './vendor_firebase-legacy-BISQ33kA.js', './news.fe-services-legacy-ByMtuCkR.js'], function (exports, module) {
    'use strict';

    var reactExports, jsxRuntimeExports, format, parseISO, useTranslation, useGetFeLocationClientReservationsQuery, urlPrefix, useUser, activeLocation, useGetFeWorkersQuery, SceletonLoader, IonItem, IonIcon, cutOutline, IonLabel, calendarOutline, IonButton, IonList, AppointmentStatus, Pagination, NewsChyron;
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
        cutOutline = module.bI;
        IonLabel = module.F;
        calendarOutline = module.ad;
        IonButton = module.d;
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
          const workerName = workersById?.[reservation.locationWorkerId]?.fullName || "Nepoznat radnik";
          const discountText = reservation.discount ? ` -${Math.round(reservation.discount / reservation.servicesCost * 100)}%` : "";
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            className: "mb-2 rounded-lg hover:opacity-80 transition-opacity",
            routerLink: `${urlPrefix}/r/${reservation.hash}`,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon: cutOutline,
              color,
              className: "mr-2"
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("h3", {
                children: [workerName, discountText]
              }), reservation.dateUtc && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-sm text-gray-400 dark:text-gray-500",
                children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm")
              })]
            })]
          }, reservation.hash);
        }
        function EmptyAppointmentsState({
          isArchive = false,
          onBookNew
        }) {
          const {
            t
          } = useTranslation();
          const handleBookNew = () => {
            if (onBookNew) {
              onBookNew();
            } else {
              window.location.href = `${urlPrefix}/zakazi-novo`;
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "flex flex-col items-center justify-center py-16 px-4",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "mb-6",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: calendarOutline,
                className: "text-gray-400 dark:text-gray-500",
                style: {
                  fontSize: "80px"
                }
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx("h2", {
              className: "text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100",
              children: isArchive ? t("Nema arhiviranih termina") : t("Nemate aktivnih termina")
            }), !isArchive && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
              className: "text-gray-500 dark:text-gray-300 text-center mb-6",
              children: t("Zakažite novi termin da biste počeli")
            }), !isArchive && /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              color: "dark",
              size: "small",
              onClick: handleBookNew,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: calendarOutline,
                slot: "start"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                children: t("Zakažite nov termin")
              })]
            })]
          });
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
          if (!clientReservationsList?.length) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(EmptyAppointmentsState, {
              isArchive: false
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
            children: clientReservationsList.map(reservation => /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentItem, {
              reservation,
              workersById
            }, reservation.hash))
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
          if (!clientReservationsList?.length) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(EmptyAppointmentsState, {
              isArchive: true
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
              children: clientReservationsList.map(reservation => /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentItem, {
                reservation,
                workersById
              }, reservation.hash))
            }), clientReservations?.total && clientReservations.total > 0 && /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
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
