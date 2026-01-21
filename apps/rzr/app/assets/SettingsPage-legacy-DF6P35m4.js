;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './vendor_ionic-legacy-DvZl6sBE.js', './App-legacy-DtnUlzjS.js', './index-legacy-CFC1yKwU.js', './vendor_leaflet-legacy-DUCVU90d.js', './vendor_firebase-legacy-tNokQwyN.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, reactExports, IonList, IonItem, IonIcon, IonLabel, businessOutline, IonCard, IonCardHeader, IonCardTitle, settingsOutline, IonCardContent, colorPaletteOutline, IonSelect, IonSelectOption, useUser, useGetFeLocationQuery, activeLocation, preloadedLocationData, getSettingsOptions, urlPrefix, UserGroupCode, getSavedTheme, saveTheme, applyTheme;
    return {
      setters: [module => {
        useTranslation = module.M;
        jsxRuntimeExports = module.j;
        reactExports = module.e;
      }, module => {
        IonList = module.H;
        IonItem = module.r;
        IonIcon = module.b;
        IonLabel = module.G;
        businessOutline = module.aV;
        IonCard = module.b5;
        IonCardHeader = module.b7;
        IonCardTitle = module.b8;
        settingsOutline = module.aR;
        IonCardContent = module.b6;
        colorPaletteOutline = module.bR;
        IonSelect = module.y;
        IonSelectOption = module.z;
      }, module => {
        useUser = module.b;
        useGetFeLocationQuery = module.m;
        activeLocation = module.n;
        preloadedLocationData = module.p;
        getSettingsOptions = module.a9;
        urlPrefix = module.g;
        UserGroupCode = module.U;
      }, module => {
        getSavedTheme = module.K;
        saveTheme = module.O;
        applyTheme = module.L;
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
          const {
            isAdmin,
            isOwner,
            isWorker
          } = useUser();
          const [themeMode, setThemeModeState] = reactExports.useState(null);
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !activeLocation
          });
          const locationData = locationResponse?.data ?? preloadedLocationData;
          const hasMultipleActivities = locationData?.hasMultipleActivities === true || typeof locationData?.hasMultipleActivities === "number" && locationData.hasMultipleActivities === 1 || locationData?.has_multiple_activities === true || typeof locationData?.has_multiple_activities === "number" && locationData.has_multiple_activities === 1;
          const settingsOptions = reactExports.useMemo(() => {
            const baseOptions = getSettingsOptions(urlPrefix);
            if (hasMultipleActivities) {
              const delatnostiOption = {
                title: "Delatnosti",
                path: `${urlPrefix}/podesavanja/delatnosti`,
                icon: businessOutline
              };
              const uslugeIndex = baseOptions.findIndex(opt => opt.path.includes("/podesavanja/usluge"));
              if (uslugeIndex !== -1) {
                baseOptions.splice(uslugeIndex, 0, delatnostiOption);
              } else {
                baseOptions.push(delatnostiOption);
              }
            }
            const filteredOptions = baseOptions.filter(option => {
              if (!option.permissions || option.permissions.length === 0) {
                return true;
              }
              const hasPermission = isAdmin && option.permissions.includes(UserGroupCode.Admin) || isOwner && option.permissions.includes(UserGroupCode.Owner) || isWorker && option.permissions.includes(UserGroupCode.Worker);
              return hasPermission;
            });
            return filteredOptions;
          }, [urlPrefix, hasMultipleActivities, locationResponse?.data, preloadedLocationData, activeLocation, isAdmin, isOwner, isWorker]);
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
