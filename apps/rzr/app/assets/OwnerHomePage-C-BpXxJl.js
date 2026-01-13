import { e as reactExports, M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { o as IonSpinner, b2 as IonCard, b4 as IonCardHeader, b5 as IonCardTitle, d as IonButton, b as IonIcon, an as refreshOutline, b3 as IonCardContent, r as IonItem, ag as calendarOutline, G as IonLabel, m as IonText, b6 as checkmarkCircleOutline, bw as closeCircleOutline, aP as peopleOutline, a_ as personOutline, bE as walletOutline } from "./vendor_ionic-BUXN7OTv.js";
import { b as useGetLocationStatisticsQuery } from "./statistics.fe-services-BZQN40MK.js";
import { n as activeLocation } from "./App-FZ41U8hJ.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./index-7S9lYcjM.js";
import "./vendor_firebase-BU9b2OVt.js";
const formatPrice = (price) => {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD"
  }).format(price);
};
function LocationStatistics({ locationSlug }) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const [forceUpdate, setForceUpdate] = reactExports.useState(0);
  const { t } = useTranslation();
  const { data, isLoading } = useGetLocationStatisticsQuery({
    locationSlug,
    forceUpdate
  });
  const handleForceRefresh = reactExports.useCallback(() => {
    setForceUpdate((prev) => prev + 1);
  }, []);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("N/A") });
  const formattedCostSum = formatPrice(((_b = (_a = data.data) == null ? void 0 : _a.data) == null ? void 0 : _b.costSum) || 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left flex items-center justify-between", children: [
      t("Statistika"),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonButton,
        {
          fill: "clear",
          size: "small",
          onClick: handleForceRefresh,
          disabled: isLoading,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: refreshOutline })
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Ukupno rezervacija") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", children: ((_d = (_c = data.data) == null ? void 0 : _c.data) == null ? void 0 : _d.totalReservations) || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: checkmarkCircleOutline, slot: "start", color: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Potvrđene rezervacije") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", color: "success", children: ((_f = (_e = data.data) == null ? void 0 : _e.data) == null ? void 0 : _f.confirmedReservationsCount) || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeCircleOutline, slot: "start", color: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Otkazane rezervacije") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", color: "danger", children: ((_h = (_g = data.data) == null ? void 0 : _g.data) == null ? void 0 : _h.canceledReservationsCount) || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline, slot: "start", color: "primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Ukupno radnika") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", color: "primary", children: ((_j = (_i = data.data) == null ? void 0 : _i.data) == null ? void 0 : _j.totalWorkers) || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: personOutline, slot: "start", color: "secondary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Ukupno klijenata") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", color: "secondary", children: ((_l = (_k = data.data) == null ? void 0 : _k.data) == null ? void 0 : _l.totalClients) || 0 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: walletOutline, slot: "start", color: "warning" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Ukupan prihod") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { slot: "end", className: "font-bold", color: "warning", children: formattedCostSum })
      ] })
    ] })
  ] });
}
function OwnerHomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: activeLocation && /* @__PURE__ */ jsxRuntimeExports.jsx(LocationStatistics, { locationSlug: activeLocation }) });
}
export {
  OwnerHomePage as default
};
