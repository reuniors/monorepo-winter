;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './vendor_ionic-legacy-C5RSb9DR.js', './App-legacy-DhSLasgw.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-CL_X7O6r.js', './vendor_firebase-legacy-BEYs4Jgn.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonText, preloadedLocationData;
    return {
      setters: [module => {
        useTranslation = module.a3;
        jsxRuntimeExports = module.j;
      }, module => {
        IonCard = module.a_;
        IonCardHeader = module.b0;
        IonCardTitle = module.b1;
        IonCardContent = module.a$;
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
