import { e as reactExports, j as jsxRuntimeExports, ay as format, av as parseISO, aD as useTranslation } from "./vendor_react-BF1Ucyx8.js";
import { e as useGetFeLocationClientReservationsQuery } from "./reservation.services-B_KsARLb.js";
import { f as urlPrefix, b as useUser, k as activeLocation, j as useGetFeWorkersQuery, l as SceletonLoader } from "./App-B7xuFYaY.js";
import { q as IonItem, l as IonIcon, bD as cutOutline, E as IonLabel, F as IonList } from "./vendor_ionic-BiOFnPTY.js";
import { a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import { P as Pagination } from "./Pagination-BwxqJSt-.js";
import { N as NewsChyron } from "./NewsChyron-BfOD2uQq.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./index-iCDvuKZG.js";
import "./vendor_firebase-Z856UVCm.js";
import "./news.fe-services-CyWqc1nC.js";
function AppointmentItem({ reservation, workersById }) {
  var _a;
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonItem,
    {
      className: "border m-2",
      routerLink: "".concat(urlPrefix, "/r/").concat(reservation.hash),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cutOutline, color, className: "mr-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: (_a = workersById == null ? void 0 : workersById[reservation.locationWorkerId]) == null ? void 0 : _a.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: format(parseISO(reservation.dateUtc), "dd.MM.yyyy HH:mm") })
      ]
    },
    reservation.hash
  );
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
      return (_a = locationWorkers == null ? void 0 : locationWorkers.data) == null ? void 0 : _a.reduce((acc, worker) => {
        acc[worker.id] = worker;
        return acc;
      }, {});
    },
    [locationWorkers]
  );
  if (isClientReservationsLoading || isWorkersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!workersById) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
    !(clientReservationsList == null ? void 0 : clientReservationsList.length) && /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { className: "border-t mt-4", children: t("Nema podataka") }),
    clientReservationsList == null ? void 0 : clientReservationsList.map((reservation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppointmentItem,
      {
        reservation,
        workersById
      },
      reservation.hash
    ))
  ] });
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
      return (_a = locationWorkers == null ? void 0 : locationWorkers.data) == null ? void 0 : _a.reduce((acc, worker) => {
        acc[worker.id] = worker;
        return acc;
      }, {});
    },
    [locationWorkers]
  );
  if (isClientReservationsLoading || isWorkersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!workersById) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
    !(clientReservationsList == null ? void 0 : clientReservationsList.length) && /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { className: "border-t mt-4", children: t("Nema podataka") }),
    clientReservationsList == null ? void 0 : clientReservationsList.map((reservation) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppointmentItem,
      {
        reservation,
        workersById
      },
      reservation.hash
    )),
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
