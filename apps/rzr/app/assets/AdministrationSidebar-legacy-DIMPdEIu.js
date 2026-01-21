;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './vendor_ionic-legacy-DvZl6sBE.js', './vendor_leaflet-legacy-DUCVU90d.js'], function (exports, module) {
    'use strict';

    var useLocation, jsxRuntimeExports, IonMenu, IonContent, IonList, home, business, people, sparklesOutline, clipboardOutline, statsChart, settings, IonListHeader, IonMenuToggle, IonItem, IonIcon, IonLabel, IonBadge, logOut;
    return {
      setters: [module => {
        useLocation = module.aJ;
        jsxRuntimeExports = module.j;
      }, module => {
        IonMenu = module.bl;
        IonContent = module.k;
        IonList = module.H;
        home = module.bk;
        business = module.bo;
        people = module.bp;
        sparklesOutline = module.bq;
        clipboardOutline = module.br;
        statsChart = module.bs;
        settings = module.bt;
        IonListHeader = module.ap;
        IonMenuToggle = module.bm;
        IonItem = module.r;
        IonIcon = module.b;
        IonLabel = module.G;
        IonBadge = module.ba;
        logOut = module.bu;
      }, null],
      execute: function () {
        const AdministrationSidebar = exports("default", () => {
          const location = useLocation();
          const menuItems = [{
            path: "/admin/dashboard",
            label: "Dashboard",
            icon: home
          }, {
            path: "/admin/locations",
            label: "Locations",
            icon: business
          }, {
            path: "/admin/users",
            label: "Users",
            icon: people
          }, {
            path: "/admin/wizards",
            label: "Wizards",
            icon: sparklesOutline,
            badge: "WIP"
          }, {
            path: "/admin/questionnaires",
            label: "Questionnaires",
            icon: clipboardOutline,
            badge: "WIP"
          }, {
            path: "/admin/statistics",
            label: "Statistics",
            icon: statsChart
          }, {
            path: "/admin/settings",
            label: "Settings",
            icon: settings
          }];
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonMenu, {
            contentId: "admin-main",
            type: "overlay",
            className: "border-r-2 border-black",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
              className: "ion-no-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "bg-primary p-4",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                  className: "text-white text-xl font-bold",
                  children: "RZR Admin"
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "text-white text-sm opacity-80",
                  children: "Platform Management"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                lines: "none",
                className: "mt-0 pt-0",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonListHeader, {
                  children: "Navigation"
                }), menuItems.map(item => /* @__PURE__ */jsxRuntimeExports.jsx(IonMenuToggle, {
                  "auto-hide": "false",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    detail: false,
                    routerLink: item.path,
                    routerDirection: "none",
                    className: location.pathname === item.path ? "selected" : "",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: item.icon,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: item.label
                    }), item.badge && /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                      color: "warning",
                      slot: "end",
                      children: item.badge
                    })]
                  })
                }, item.path))]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                lines: "none",
                className: "mt-4",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonMenuToggle, {
                  "auto-hide": "false",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    onClick: () => {
                      window.location.href = "/zakazivanje";
                    },
                    className: "text-red-600",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: logOut,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: "Exit Admin"
                    })]
                  })
                })
              })]
            })
          });
        });
      }
    };
  });
})();
