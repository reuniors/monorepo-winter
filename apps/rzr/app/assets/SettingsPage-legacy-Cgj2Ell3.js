;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './App-legacy-BZWqGSgH.js', './vendor_leaflet-legacy-BBJO0vvi.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonList, IonItem, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, settingsOutline, IonCardContent, getSettingsOptions, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        IonList = module.F;
        IonItem = module.q;
        IonIcon = module.l;
        IonLabel = module.E;
        IonCard = module.aS;
        IonCardHeader = module.aT;
        IonCardTitle = module.aU;
        settingsOutline = module.aE;
        IonCardContent = module.aV;
      }, module => {
        getSettingsOptions = module.Y;
        urlPrefix = module.f;
      }, null, null, null],
      execute: function () {
        exports("default", SettingsPage);
        function SettingsListComponent({
          options,
          onItemClick
        }) {
          const {
            t
          } = useTranslation();
          const handleClick = path => {
            if (onItemClick) {
              onItemClick(path);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
            children: options.map(option => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              button: true,
              detail: true,
              routerLink: option.path,
              onClick: () => handleClick(option.path),
              color: option.color,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: option.icon,
                slot: "start"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                children: t(option.title)
              })]
            }, option.path))
          });
        }
        function SettingsPage() {
          const {
            t
          } = useTranslation();
          const settingsOptions = getSettingsOptions(urlPrefix);
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "ion-padding",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: settingsOutline
                  }), t("Podešavanja")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(SettingsListComponent, {
                  options: settingsOptions
                })
              })]
            })
          });
        }
      }
    };
  });
})();
