import { a3 as useTranslation, j as jsxRuntimeExports } from "./vendor_react-B3gTLzrh.js";
import { a_ as IonCard, b0 as IonCardHeader, b1 as IonCardTitle, a$ as IonCardContent, c as IonText } from "./vendor_ionic-Bk4xGa1M.js";
import { p as preloadedLocationData } from "./App-DX1X7twZ.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./index-DnKyBibG.js";
import "./vendor_firebase-Pt9WfZwV.js";
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
