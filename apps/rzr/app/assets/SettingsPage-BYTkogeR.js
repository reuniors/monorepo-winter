import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-D2bpVGXr.js";
import { E as IonList, o as IonItem, i as IonIcon, D as IonLabel, aS as IonCard, aT as IonCardHeader, aU as IonCardTitle, aE as settingsOutline, aV as IonCardContent } from "./vendor_ionic-31A1eU6n.js";
import { Y as getSettingsOptions, f as urlPrefix } from "./App-NJG84E_P.js";
import "./vendor_leaflet-DZM5QjPU.js";
import "./index-D3Szu2cc.js";
import "./vendor_firebase-DcKiwNms.js";
function SettingsListComponent({
  options,
  onItemClick
}) {
  const { t } = useTranslation();
  const handleClick = (path) => {
    if (onItemClick) {
      onItemClick(path);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonItem,
    {
      button: true,
      detail: true,
      routerLink: option.path,
      onClick: () => handleClick(option.path),
      color: option.color,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: option.icon, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t(option.title) })
      ]
    },
    option.path
  )) });
}
function SettingsPage() {
  const { t } = useTranslation();
  const settingsOptions = getSettingsOptions(urlPrefix);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: settingsOutline }),
      t("Podešavanja")
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsListComponent, { options: settingsOptions }) })
  ] }) });
}
export {
  SettingsPage as default
};
