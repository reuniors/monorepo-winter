;
(function () {
  System.register(['./vendor_react-legacy-BZeT-WEv.js', './vendor_ionic-legacy-FEPq4Efg.js', './App-legacy-D_TQFFiD.js', './index-legacy-yzMe94ue.js', './vendor_leaflet-legacy-_lyC0eWM.js', './vendor_firebase-legacy-_Nh6fmKA.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, reactExports, IonList, IonItem, IonIcon, IonLabel, IonCard, IonCardHeader, IonCardTitle, settingsOutline, IonCardContent, colorPaletteOutline, IonSelect, IonSelectOption, getSettingsOptions, urlPrefix, getSavedTheme, saveTheme, applyTheme;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        reactExports = module.e;
      }, module => {
        IonList = module.F;
        IonItem = module.q;
        IonIcon = module.l;
        IonLabel = module.E;
        IonCard = module.aW;
        IonCardHeader = module.aX;
        IonCardTitle = module.aY;
        settingsOutline = module.aE;
        IonCardContent = module.aZ;
        colorPaletteOutline = module.bu;
        IonSelect = module.w;
        IonSelectOption = module.x;
      }, module => {
        getSettingsOptions = module.Y;
        urlPrefix = module.f;
      }, module => {
        getSavedTheme = module.t;
        saveTheme = module.v;
        applyTheme = module.u;
      }, null, null],
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
          const [themeMode, setThemeModeState] = reactExports.useState(null);
          const settingsOptions = getSettingsOptions(urlPrefix);
          reactExports.useEffect(() => {
            setThemeModeState(getSavedTheme());
          }, []);
          const handleThemeChange = e => {
            const value = e.detail.value;
            const newTheme = value === "system" ? null : value;
            saveTheme(newTheme);
            applyTheme(newTheme);
            setThemeModeState(newTheme);
          };
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
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                className: "ion-no-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: colorPaletteOutline,
                    slot: "start"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Tema")
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSelect, {
                    value: themeMode === null ? "system" : themeMode,
                    onIonChange: handleThemeChange,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                      value: "light",
                      children: t("Svetla")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                      value: "dark",
                      children: t("Tamna")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                      value: "system",
                      children: t("Sistem")
                    })]
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(SettingsListComponent, {
                  options: settingsOptions
                })]
              })]
            })
          });
        }
      }
    };
  });
})();
