import { aJ as useLocation, j as jsxRuntimeExports } from "./vendor_react-CZodnfjS.js";
import { bl as IonMenu, k as IonContent, H as IonList, bk as home, bo as business, bp as people, bq as sparklesOutline, br as clipboardOutline, bs as statsChart, bt as settings, ap as IonListHeader, bm as IonMenuToggle, r as IonItem, b as IonIcon, G as IonLabel, ba as IonBadge, bu as logOut } from "./vendor_ionic-DAnbjjdE.js";
import "./vendor_leaflet-DLEgU4Uz.js";
const AdministrationSidebar = () => {
  const location = useLocation();
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: home },
    { path: "/admin/locations", label: "Locations", icon: business },
    { path: "/admin/users", label: "Users", icon: people },
    { path: "/admin/wizards", label: "Wizards", icon: sparklesOutline, badge: "WIP" },
    { path: "/admin/questionnaires", label: "Questionnaires", icon: clipboardOutline, badge: "WIP" },
    { path: "/admin/statistics", label: "Statistics", icon: statsChart },
    { path: "/admin/settings", label: "Settings", icon: settings }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IonMenu,
    {
      contentId: "admin-main",
      type: "overlay",
      className: "border-r-2 border-black",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonContent, { className: "ion-no-padding", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white text-xl font-bold", children: "RZR Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white text-sm opacity-80", children: "Platform Management" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { lines: "none", className: "mt-0 pt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonListHeader, { children: "Navigation" }),
          menuItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonMenuToggle, { "auto-hide": "false", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonItem,
            {
              detail: false,
              routerLink: item.path,
              routerDirection: "none",
              className: location.pathname === item.path ? "selected" : "",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: item.icon, slot: "start" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: item.label }),
                item.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(IonBadge, { color: "warning", slot: "end", children: item.badge })
              ]
            }
          ) }, item.path))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { lines: "none", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonMenuToggle, { "auto-hide": "false", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            button: true,
            onClick: () => {
              window.location.href = "/zakazivanje";
            },
            className: "text-red-600",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: logOut, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: "Exit Admin" })
            ]
          }
        ) }) })
      ] })
    }
  );
};
export {
  AdministrationSidebar as default
};
