import { e as reactExports, R as React, j as jsxRuntimeExports } from "./vendor_react-LOGlbA9o.js";
import { B as IonGrid, C as IonRow, D as IonCol, d as IonButton, l as IonIcon, az as arrowBackOutline } from "./vendor_ionic-D94VuZ44.js";
import { ag as fetchIonIconsList } from "./App-Byz-BlJA.js";
import "./vendor_leaflet-DPGBd-b-.js";
import "./index-DB6rcYif.js";
import "./vendor_firebase-BP40AiT5.js";
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
