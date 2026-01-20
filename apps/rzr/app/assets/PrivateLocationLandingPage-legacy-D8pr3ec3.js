;
(function () {
  System.register(['./vendor_react-legacy-DX-mYdP5.js', './vendor_ionic-legacy-DitOK8Rz.js', './App-legacy-D9i3zTWV.js', './vendor_leaflet-legacy-DW0hIt0g.js', './index-legacy-C1Nz3TCW.js', './vendor_firebase-legacy-CM5O5LjC.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, preloadedLocationData;
    return {
      setters: [module => {
        useTranslation = module.M;
        jsxRuntimeExports = module.j;
      }, module => {
        IonCard = module.b5;
        IonCardHeader = module.b7;
        IonCardTitle = module.b8;
        IonCardContent = module.b6;
        IonText = module.m;
      }, module => {
        preloadedLocationData = module.p;
      }, null, null, null],
      execute: function () {
        exports("default", PrivateLocationLandingPage);
        function PrivateLocationLandingPage() {
          const {
            t
          } = useTranslation();
          const title = preloadedLocationData?.title ?? preloadedLocationData?.name;
          const description = preloadedLocationData?.description ?? preloadedLocationData?.snippet ?? "";
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "ion-padding flex justify-center items-start",
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "w-full max-w-xl",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                    className: "text-center",
                    children: title || t("Privatna lokacija")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                  className: "space-y-3",
                  children: [description && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      className: "text-sm text-gray-700 dark:text-gray-300",
                      children: description
                    })
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      className: "mt-2",
                      children: t("Ova lokacija je privatna. Trenutno zakazivanje termina putem ovog sistema nije dostupno.")
                    })
                  })]
                })]
              })
            })
          });
        }
      }
    };
  });
})();
