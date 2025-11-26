import { e as reactExports, b0 as Clipboard, j as jsxRuntimeExports, aD as useTranslation, av as parseISO, ay as format } from "./vendor_react-B_SHD62b.js";
import { a9 as useIonToast, aR as IonAvatar, n as IonSpinner, aS as IonCard, aU as IonCardHeader, aV as IonCardTitle, aW as IonCardContent, q as IonItem, l as IonIcon, ad as calendarOutline, E as IonLabel, c as IonText, b4 as checkmarkCircleOutline, bk as closeCircleOutline, ae as timeOutline, bs as walletOutline, d as IonButton, bt as refreshOutline } from "./vendor_ionic-DsqPkyBY.js";
import { u as useGetClientStatisticsQuery } from "./statistics.fe-services-pGtZJ7M8.js";
import { r as rzrApi } from "./index-CQxQA23_.js";
import { v as transformStandardResponseToCamelCase, Z as transformPaginationResponseToCamelCase } from "./App-5MUv5Yp_.js";
function useClipboard() {
  const [data, setData] = reactExports.useState();
  const [showCopyMessage] = useIonToast();
  async function getValue() {
    const ret = await Clipboard.read();
    setData(ret.value);
    return ret.value;
  }
  async function setValue(value) {
    await Clipboard.write({
      string: value
    });
    showCopyMessage({
      message: "Kopirano: " + value,
      duration: 1e3
    });
  }
  return {
    value: data,
    getValue,
    setValue
  };
}
const UserAvatar = ({
  fullName,
  size = 48
}) => {
  const getInitials = (name) => {
    const names = name.split(" ");
    if (names.length >= 2) {
      return "".concat(names[0][0]).concat(names[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };
  const getRandomColor = (name) => {
    const colors = [
      "#FF6B6B",
      // Red
      "#4ECDC4",
      // Teal
      "#45B7D1",
      // Blue
      "#96CEB4",
      // Green
      "#FFEEAD",
      // Yellow
      "#D4A5A5",
      // Pink
      "#9B59B6",
      // Purple
      "#3498DB"
      // Light Blue
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };
  const initials = getInitials(fullName);
  const backgroundColor = getRandomColor(fullName);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IonAvatar,
    {
      style: {
        width: "".concat(size, "px"),
        height: "".concat(size, "px"),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color: "#FFFFFF",
        fontSize: "".concat(size * 0.4, "px"),
        fontWeight: "bold"
      },
      children: initials
    }
  );
};
const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    const date = parseISO(dateString);
    return format(date, "dd.MM.yyyy HH:mm");
  } catch (e) {
    return dateString;
  }
};
const formatPrice = (price) => {
  return new Intl.NumberFormat("sr-RS").format(price);
};
function ClientStatistics({
  clientId,
  locationSlug
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [forceUpdate, setForceUpdate] = reactExports.useState(0);
  const { t } = useTranslation();
  const { data, isLoading } = useGetClientStatisticsQuery({
    clientId,
    locationSlug,
    forceUpdate
  });
  const handleForceRefresh = reactExports.useCallback(() => {
    setForceUpdate((prev) => prev + 1);
  }, []);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("N/A") });
  const formattedLastVisit = formatDate((_b = (_a = data.data) == null ? void 0 : _a.data) == null ? void 0 : _b.lastVisit);
  const formattedCostSum = formatPrice(((_d = (_c = data.data) == null ? void 0 : _c.data) == null ? void 0 : _d.costSum) || 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-left", children: t("Statistika") }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Ukupno rezervacija"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "warning", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_f = (_e = data.data) == null ? void 0 : _e.data) == null ? void 0 : _f.totalReservations) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: checkmarkCircleOutline, slot: "start", color: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Potvrđene rezervacije"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "success", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_h = (_g = data.data) == null ? void 0 : _g.data) == null ? void 0 : _h.confirmedReservationsCount) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeCircleOutline, slot: "start", color: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Otkazane rezervacije"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_j = (_i = data.data) == null ? void 0 : _i.data) == null ? void 0 : _j.canceledReservationsCount) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Poslednja poseta"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formattedLastVisit || t("N/A") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: walletOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Ukupan iznos korišćenih usluga"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            formattedCostSum,
            " RSD"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { fill: "clear", onClick: handleForceRefresh, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: refreshOutline, slot: "start" }),
        t("Osveži")
      ] }) })
    ] })
  ] });
}
const clientProfileApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientProfiles: builder.query({
      query: ({ locationSlug, page = 1, perPage = 10 }) => ({
        url: "/workers/clients",
        method: "GET",
        params: {
          locationSlug,
          page,
          perPage
        }
      }),
      transformResponse: transformPaginationResponseToCamelCase
    }),
    getWorkerClientData: builder.query({
      query: ({ clientId }) => ({
        url: "/workers/client",
        method: "GET",
        params: {
          clientId
        }
      }),
      transformResponse: transformStandardResponseToCamelCase
    })
  })
});
const { useGetClientProfilesQuery, useGetWorkerClientDataQuery } = clientProfileApi;
export {
  ClientStatistics as C,
  UserAvatar as U,
  useGetWorkerClientDataQuery as a,
  useGetClientProfilesQuery as b,
  useClipboard as u
};
