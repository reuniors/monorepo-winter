import { a3 as useTranslation, j as jsxRuntimeExports, e as reactExports } from "./vendor_react-B3gTLzrh.js";
import { G as IonList, q as IonItem, l as IonIcon, F as IonLabel, aP as businessOutline, a_ as IonCard, b0 as IonCardHeader, b1 as IonCardTitle, aL as settingsOutline, a$ as IonCardContent, bE as colorPaletteOutline, x as IonSelect, y as IonSelectOption } from "./vendor_ionic-Bk4xGa1M.js";
import { b as useUser, l as useGetFeLocationQuery, m as activeLocation, p as preloadedLocationData, a8 as getSettingsOptions, f as urlPrefix, a9 as UserGroupCode } from "./App-DX1X7twZ.js";
import { x as getSavedTheme, A as saveTheme, y as applyTheme } from "./index-DnKyBibG.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./vendor_firebase-Pt9WfZwV.js";
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
  var _a;
  const { t } = useTranslation();
  const { isAdmin, isOwner, isWorker } = useUser();
  const [themeMode, setThemeModeState] = reactExports.useState(null);
  const { data: locationResponse } = useGetFeLocationQuery(
    {
      slug: activeLocation
    },
    { skip: !activeLocation }
  );
  const locationData = (_a = locationResponse == null ? void 0 : locationResponse.data) != null ? _a : preloadedLocationData;
  const hasMultipleActivities = (locationData == null ? void 0 : locationData.hasMultipleActivities) === true || typeof (locationData == null ? void 0 : locationData.hasMultipleActivities) === "number" && locationData.hasMultipleActivities === 1 || (locationData == null ? void 0 : locationData.has_multiple_activities) === true || typeof (locationData == null ? void 0 : locationData.has_multiple_activities) === "number" && locationData.has_multiple_activities === 1;
  const settingsOptions = reactExports.useMemo(() => {
    const baseOptions = getSettingsOptions(urlPrefix);
    console.log("🔍 SettingsPage Debug:", {
      activeLocation,
      locationResponse: locationResponse == null ? void 0 : locationResponse.data,
      preloadedLocationData,
      locationData,
      hasMultipleActivitiesCamelCase: locationData == null ? void 0 : locationData.hasMultipleActivities,
      hasMultipleActivitiesSnakeCase: locationData == null ? void 0 : locationData.has_multiple_activities,
      hasMultipleActivities,
      baseOptionsCount: baseOptions.length
    });
    if (hasMultipleActivities) {
      const delatnostiOption = {
        title: "Delatnosti",
        path: "".concat(urlPrefix, "/podesavanja/delatnosti"),
        icon: businessOutline
      };
      const uslugeIndex = baseOptions.findIndex(
        (opt) => opt.path.includes("/podesavanja/usluge")
      );
      console.log("🔍 Adding Delatnosti option:", {
        uslugeIndex,
        delatnostiOption
      });
      if (uslugeIndex !== -1) {
        baseOptions.splice(uslugeIndex, 0, delatnostiOption);
      } else {
        baseOptions.push(delatnostiOption);
      }
    } else {
      console.log(
        "🔍 NOT adding Delatnosti option - hasMultipleActivities is false"
      );
    }
    const filteredOptions = baseOptions.filter((option) => {
      if (!option.permissions || option.permissions.length === 0) {
        return true;
      }
      const hasPermission = isAdmin && option.permissions.includes(UserGroupCode.Admin) || isOwner && option.permissions.includes(UserGroupCode.Owner) || isWorker && option.permissions.includes(UserGroupCode.Worker);
      console.log("🔍 Permission check for:", {
        title: option.title,
        requiredPermissions: option.permissions,
        hasPermission
      });
      return hasPermission;
    });
    return filteredOptions;
  }, [
    urlPrefix,
    hasMultipleActivities,
    locationResponse == null ? void 0 : locationResponse.data,
    preloadedLocationData,
    activeLocation,
    isAdmin,
    isOwner,
    isWorker
  ]);
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
