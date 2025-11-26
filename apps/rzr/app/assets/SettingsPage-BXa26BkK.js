import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-DIPb0ryL.js";
import { F as IonList, q as IonItem, l as IonIcon, E as IonLabel, aS as IonCard, aT as IonCardHeader, aU as IonCardTitle, aE as settingsOutline, aV as IonCardContent } from "./vendor_ionic-Be4hhgUj.js";
import { Y as getSettingsOptions, f as urlPrefix } from "./App-BV4viTVE.js";
import "./vendor_leaflet-73gyo1Vx.js";
import "./index-CyIFz9O8.js";
import "./vendor_firebase-B4BzB2N5.js";
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
