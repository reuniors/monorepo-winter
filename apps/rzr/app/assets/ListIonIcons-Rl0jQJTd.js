import { e as reactExports, R as React, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { C as IonGrid, D as IonRow, E as IonCol, d as IonButton, b as IonIcon, aC as arrowBackOutline } from "./vendor_ionic-BUXN7OTv.js";
import { ah as fetchIonIconsList } from "./App-BeQxDD8i.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./index-DN_Fulfp.js";
import "./vendor_firebase-BU9b2OVt.js";
function ListIonIcons({ onSelectIcon, searchIcon }) {
  const ionIconsList = fetchIonIconsList();
  const [selectedIcon, setSelectedIcon] = React.useState(
    void 0
  );
  const uniqueIonIconsList = reactExports.useMemo(
    () => ionIconsList.filter((icon, index) => {
      return !icon.key.includes("Outline") && !icon.key.includes("Sharp") && (searchIcon ? icon.key.includes(searchIcon) : true);
    }),
    [ionIconsList, searchIcon]
  );
  const selectedIconsList = reactExports.useMemo(
    () => selectedIcon ? ionIconsList.filter((icon) => {
      return icon.key.includes(selectedIcon.key);
    }) : [],
    [selectedIcon]
  );
  const handleSelectIcon = (icon) => () => {
    setSelectedIcon(icon);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonGrid, { children: [
    selectedIcon !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { onClick: () => setSelectedIcon(void 0), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: arrowBackOutline }),
      " Back"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: selectedIcon !== void 0 ? selectedIconsList.map((icon, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: () => onSelectIcon(icon), color: "default", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: icon.value }) }) }, index)) : uniqueIonIconsList.map((icon, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleSelectIcon(icon), color: "default", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: icon.value }) }) }, index)) })
  ] });
}
const ListIonIcons$1 = reactExports.memo(ListIonIcons);
export {
  ListIonIcons$1 as default
};
