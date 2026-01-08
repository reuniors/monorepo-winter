;
(function () {
  System.register(['./vendor_react-legacy-CFXrDSu1.js', './vendor_ionic-legacy-kFTPXAWE.js', './App-legacy-DT3CUYN8.js', './vendor_leaflet-legacy-DzrMDhpu.js', './index-legacy-D7f7Ap3o.js', './vendor_firebase-legacy-BISQ33kA.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, preloadedLocationData;
    return {
      setters: [module => {
        useTranslation = module.a3;
        jsxRuntimeExports = module.j;
      }, module => {
        IonCard = module.a$;
        IonCardHeader = module.b1;
        IonCardTitle = module.b2;
        IonCardContent = module.b0;
        IonText = module.c;
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
