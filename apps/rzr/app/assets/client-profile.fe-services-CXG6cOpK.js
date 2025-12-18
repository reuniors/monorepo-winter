import { e as reactExports, ba as Clipboard, aD as useTranslation, j as jsxRuntimeExports, av as parseISO, ay as format } from "./vendor_react-BF1Ucyx8.js";
import { a9 as useIonToast, n as IonSpinner, aX as IonCard, aZ as IonCardHeader, a_ as IonCardTitle, aY as IonCardContent, q as IonItem, l as IonIcon, ad as calendarOutline, E as IonLabel, c as IonText, a$ as checkmarkCircleOutline, bs as closeCircleOutline, ae as timeOutline, bx as walletOutline, d as IonButton, b1 as refreshOutline } from "./vendor_ionic-BiOFnPTY.js";
import { u as useGetClientStatisticsQuery } from "./statistics.fe-services-qa_lL4tc.js";
import { r as rzrApi } from "./index-DITQ5hEX.js";
import { A as transformStandardResponseToCamelCase, a2 as transformPaginationResponseToCamelCase } from "./App-DRZn74Za.js";
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
  useGetWorkerClientDataQuery as a,
  useGetClientProfilesQuery as b,
  useClipboard as u
};
