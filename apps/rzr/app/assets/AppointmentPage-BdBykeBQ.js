import { e as reactExports, j as jsxRuntimeExports, aC as format, az as parseISO, a3 as useTranslation } from "./vendor_react-B3gTLzrh.js";
import { e as useGetFeLocationClientReservationsQuery } from "./reservation.services-o7CNV4r2.js";
import { f as urlPrefix, b as useUser, m as activeLocation, o as useGetFeWorkersQuery, q as SceletonLoader } from "./App-Zs0gdlX8.js";
import { q as IonItem, l as IonIcon, bH as cutOutline, F as IonLabel, G as IonList } from "./vendor_ionic-Bk4xGa1M.js";
import { a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import { P as Pagination } from "./Pagination-VueKNBeE.js";
import { N as NewsChyron } from "./NewsChyron-D9wcD8f1.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./index-B1uhtDiW.js";
import "./vendor_firebase-Pt9WfZwV.js";
import "./news.fe-services-CKhKJ2Ds.js";
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
