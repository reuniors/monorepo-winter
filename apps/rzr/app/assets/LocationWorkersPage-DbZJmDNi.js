import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BF1Ucyx8.js";
import { aX as IonCard, aZ as IonCardHeader, a_ as IonCardTitle, l as IonIcon, aH as peopleOutline, aY as IonCardContent, n as IonSpinner, F as IonList, q as IonItem, a6 as addOutline, E as IonLabel, bb as IonAvatar, c as IonText, $ as chevronForwardOutline } from "./vendor_ionic-BiOFnPTY.js";
import { O as useGetAllWorkersQuery } from "./App-CoYlqvOT.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./index-BgzvshS9.js";
import "./vendor_firebase-Z856UVCm.js";
function LocationWorkersPage({
  locationSlug,
  onCreate,
  onEdit
}) {
  var _a;
  const { t } = useTranslation();
  const {
    data: workers,
    isLoading,
    isError
  } = useGetAllWorkersQuery({ locationSlug });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline }),
      t("Radnici")
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-red-500", children: t("Greška pri učitavanju radnika.") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { button: true, onClick: onCreate, color: "primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Dodaj radnika") })
      ] }),
      !((_a = workers == null ? void 0 : workers.data) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-gray-500", children: t("Nema radnika za ovu lokaciju.") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: workers.data.map((worker) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IonItem,
        {
          button: true,
          onClick: () => onEdit == null ? void 0 : onEdit(worker),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { slot: "start", className: "w-12 h-12", children: worker.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: worker.avatar.path,
                alt: "".concat(worker.firstName, " ").concat(worker.lastName)
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gray-300 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonIcon,
              {
                icon: peopleOutline,
                className: "text-gray-600"
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-semibold truncate", children: [
                worker.firstName,
                " ",
                worker.lastName
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonText,
                {
                  color: worker.active ? "success" : "medium",
                  className: "text-sm",
                  children: worker.active ? t("Aktivan") : t("Neaktivan")
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronForwardOutline, slot: "end" })
          ]
        },
        worker.id
      )) })
    ] }) })
  ] }) });
}
export {
  LocationWorkersPage as default
};
