import { a3 as useTranslation, e as reactExports, j as jsxRuntimeExports, aC as format, az as parseISO } from "./vendor_react-CMjr4Gvv.js";
import { e as useGetFeLocationClientReservationsQuery } from "./reservation.services-DUz-U_Xc.js";
import { g as urlPrefix, b as useUser, n as activeLocation, q as useGetFeWorkersQuery, r as SceletonLoader } from "./App-CNuYiPPZ.js";
import { q as IonItem, l as IonIcon, bI as cutOutline, F as IonLabel, ad as calendarOutline, d as IonButton, G as IonList } from "./vendor_ionic-7y52xm55.js";
import { a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import { P as Pagination } from "./Pagination-DJUTaDgw.js";
import { N as NewsChyron } from "./NewsChyron-CR-FVFoo.js";
import "./vendor_leaflet-0lyiJUDC.js";
import "./index-DHw_Gx8b.js";
import "./vendor_firebase-BM_4Mc6z.js";
import "./news.fe-services-hiE9_URR.js";
function AppointmentItem({ reservation, workersById }) {
  var _a;
  const { t } = useTranslation();
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
  const workerName = ((_a = workersById == null ? void 0 : workersById[reservation.locationWorkerId]) == null ? void 0 : _a.fullName) || t("Nepoznat radnik");
  const discountText = reservation.discount ? " -".concat(Math.round(reservation.discount / reservation.servicesCost * 100), "%") : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonItem,
    {
      className: "mb-2 rounded-lg hover:opacity-80 transition-opacity",
      routerLink: "".concat(urlPrefix, "/r/").concat(reservation.hash),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cutOutline, color, className: "mr-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            workerName,
            discountText
          ] }),
          reservation.dateUtc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500", children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm") })
        ] })
      ]
    },
    reservation.hash
  );
}
function EmptyAppointmentsState({
  isArchive = false,
  onBookNew
}) {
  const { t } = useTranslation();
  const handleBookNew = () => {
    if (onBookNew) {
      onBookNew();
    } else {
      window.location.href = "".concat(urlPrefix, "/zakazi-novo");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonIcon,
      {
        icon: calendarOutline,
        className: "text-gray-400 dark:text-gray-500",
        style: { fontSize: "80px" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-100", children: isArchive ? t("Nema arhiviranih termina") : t("Nemate aktivnih termina") }),
    !isArchive && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-300 text-center mb-6", children: t("Zakažite novi termin da biste počeli") }),
    !isArchive && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { color: "dark", size: "small", onClick: handleBookNew, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Zakažite nov termin") })
    ] })
  ] });
}
function ActiveAppointmentsList() {
  const { t } = useTranslation();
  const { userData } = useUser();
  const { data: clientReservations, isLoading: isClientReservationsLoading } = useGetFeLocationClientReservationsQuery(
    {
      locationSlug: activeLocation,
      archive: 0
    },
    {
      skip: !(userData == null ? void 0 : userData.id)
      // pollingInterval: 15000,
    }
  );
  const { data: locationWorkers, isLoading: isWorkersLoading } = useGetFeWorkersQuery({
    locationSlug: activeLocation
  });
  const clientReservationsList = clientReservations == null ? void 0 : clientReservations.data;
  const workersById = reactExports.useMemo(
    () => {
      var _a;
      return (_a = locationWorkers == null ? void 0 : locationWorkers.data) == null ? void 0 : _a.reduce(
        (acc, worker) => {
          acc[worker.id] = worker;
          return acc;
        },
        {}
      );
    },
    [locationWorkers]
  );
  if (isClientReservationsLoading || isWorkersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!workersById) {
    return null;
  }
  if (!(clientReservationsList == null ? void 0 : clientReservationsList.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyAppointmentsState, { isArchive: false });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: clientReservationsList.map((reservation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppointmentItem,
    {
      reservation,
      workersById
    },
    reservation.hash
  )) });
}
function ArchivedAppointmentsList() {
  const { t } = useTranslation();
  const { userData } = useUser();
  const [page, setPage] = reactExports.useState(1);
  const { data: clientReservations, isLoading: isClientReservationsLoading } = useGetFeLocationClientReservationsQuery(
    {
      locationSlug: activeLocation,
      archive: 1,
      page,
      perPage: 10
    },
    {
      skip: !(userData == null ? void 0 : userData.id)
    }
  );
  const { data: locationWorkers, isLoading: isWorkersLoading } = useGetFeWorkersQuery({
    locationSlug: activeLocation
  });
  const clientReservationsList = clientReservations == null ? void 0 : clientReservations.data;
  const workersById = reactExports.useMemo(
    () => {
      var _a;
      return (_a = locationWorkers == null ? void 0 : locationWorkers.data) == null ? void 0 : _a.reduce(
        (acc, worker) => {
          acc[worker.id] = worker;
          return acc;
        },
        {}
      );
    },
    [locationWorkers]
  );
  if (isClientReservationsLoading || isWorkersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!workersById) {
    return null;
  }
  if (!(clientReservationsList == null ? void 0 : clientReservationsList.length)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyAppointmentsState, { isArchive: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: clientReservationsList.map((reservation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppointmentItem,
      {
        reservation,
        workersById
      },
      reservation.hash
    )) }),
    (clientReservations == null ? void 0 : clientReservations.total) && clientReservations.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Pagination,
      {
        currentPage: page,
        totalPages: clientReservations.lastPage,
        onPageChange: setPage
      }
    )
  ] });
}
function AppointmentPage({ activeStep = 0 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsChyron, { className: "ion-margin" }),
    activeStep === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ActiveAppointmentsList, {}),
    activeStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ArchivedAppointmentsList, {})
  ] });
}
export {
  AppointmentPage as default
};
