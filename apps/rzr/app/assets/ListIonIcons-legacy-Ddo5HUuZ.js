;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './vendor_ionic-legacy-C5RSb9DR.js', './App-legacy-DhSLasgw.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-CL_X7O6r.js', './vendor_firebase-legacy-BEYs4Jgn.js'], function (exports, module) {
    'use strict';

    var reactExports, React, jsxRuntimeExports, IonGrid, IonRow, IonCol, IonButton, IonIcon, arrowBackOutline, fetchIonIconsList;
    return {
      setters: [module => {
        reactExports = module.e;
        React = module.R;
        jsxRuntimeExports = module.j;
      }, module => {
        IonGrid = module.B;
        IonRow = module.C;
        IonCol = module.D;
        IonButton = module.d;
        IonIcon = module.l;
        arrowBackOutline = module.az;
      }, module => {
        fetchIonIconsList = module.af;
      }, null, null, null],
      execute: function () {
        function ListIonIcons({
          onSelectIcon,
          searchIcon
        }) {
          const ionIconsList = fetchIonIconsList();
          const [selectedIcon, setSelectedIcon] = React.useState(void 0);
          const uniqueIonIconsList = reactExports.useMemo(() => ionIconsList.filter((icon, index) => {
            return !icon.key.includes("Outline") && !icon.key.includes("Sharp") && (searchIcon ? icon.key.includes(searchIcon) : true);
          }), [ionIconsList, searchIcon]);
          const selectedIconsList = reactExports.useMemo(() => selectedIcon ? ionIconsList.filter(icon => {
            return icon.key.includes(selectedIcon.key);
          }) : [], [selectedIcon]);
          const handleSelectIcon = icon => () => {
            setSelectedIcon(icon);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
            children: [selectedIcon !== void 0 && /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: () => setSelectedIcon(void 0),
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: arrowBackOutline
                  }), " Back"]
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: selectedIcon !== void 0 ? selectedIconsList.map((icon, index) => /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: () => onSelectIcon(icon),
                  color: "default",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: icon.value
                  })
                })
              }, index)) : uniqueIonIconsList.map((icon, index) => /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSelectIcon(icon),
                  color: "default",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: icon.value
                  })
                })
              }, index))
            })]
          });
        }
        const ListIonIcons$1 = exports("default", reactExports.memo(ListIonIcons));
      }
    };
  });
})();
