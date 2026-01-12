import { M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { b2 as IonCard, b4 as IonCardHeader, b5 as IonCardTitle, b3 as IonCardContent, m as IonText } from "./vendor_ionic-BUXN7OTv.js";
import { p as preloadedLocationData } from "./App-B5pHjPTF.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./index-BKBFZx2T.js";
import "./vendor_firebase-BU9b2OVt.js";
function PrivateLocationLandingPage() {
  var _a, _b, _c, _d, _e, _f, _g;
  const { t } = useTranslation();
  const title = (_c = (_a = preloadedLocationData) == null ? void 0 : _a.title) != null ? _c : (_b = preloadedLocationData) == null ? void 0 : _b.name;
  const description = (_g = (_f = (_d = preloadedLocationData) == null ? void 0 : _d.description) != null ? _f : (_e = preloadedLocationData) == null ? void 0 : _e.snippet) != null ? _g : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding flex justify-center items-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { className: "text-center", children: title || t("Privatna lokacija") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "space-y-3", children: [
      description && /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: description }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2", children: t(
        "Ova lokacija je privatna. Trenutno zakazivanje termina putem ovog sistema nije dostupno."
      ) }) })
    ] })
  ] }) }) });
}
export {
  PrivateLocationLandingPage as default
};
