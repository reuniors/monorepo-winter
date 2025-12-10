import { aD as useTranslation, j as jsxRuntimeExports, e as reactExports } from "./vendor_react-DUHraSvm.js";
import { F as IonList, q as IonItem, l as IonIcon, E as IonLabel, aW as IonCard, aX as IonCardHeader, aY as IonCardTitle, aE as settingsOutline, aZ as IonCardContent, bu as colorPaletteOutline, w as IonSelect, x as IonSelectOption } from "./vendor_ionic-COxsUFYm.js";
import { Y as getSettingsOptions, f as urlPrefix } from "./App-3ar7Cq0a.js";
import { t as getSavedTheme, v as saveTheme, u as applyTheme } from "./index-CiZrsLGn.js";
import "./vendor_leaflet-Lu2AnQEo.js";
import "./vendor_firebase-CC6UAdG5.js";
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
  const [themeMode, setThemeModeState] = reactExports.useState(null);
  const settingsOptions = getSettingsOptions(urlPrefix);
  reactExports.useEffect(() => {
    setThemeModeState(getSavedTheme());
  }, []);
  const handleThemeChange = (e) => {
    const value = e.detail.value;
    const newTheme = value === "system" ? null : value;
    saveTheme(newTheme);
    applyTheme(newTheme);
    setThemeModeState(newTheme);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: settingsOutline }),
      t("Podešavanja")
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "ion-no-padding", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: colorPaletteOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Tema") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonSelect,
          {
            value: themeMode === null ? "system" : themeMode,
            onIonChange: handleThemeChange,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "light", children: t("Svetla") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "dark", children: t("Tamna") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "system", children: t("Sistem") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SettingsListComponent, { options: settingsOptions })
    ] })
  ] }) });
}
export {
  SettingsPage as default
};
