;
(function () {
  System.register(['./vendor_react-legacy-CWUgxXrv.js', './vendor_ionic-legacy-CtJTU_-p.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, IonButton, IonIcon, chevronBack, chevronForward;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
      }, module => {
        IonButton = module.h;
        IonIcon = module.i;
        chevronBack = module.bs;
        chevronForward = module.bt;
      }],
      execute: function () {
        const Pagination = exports("P", ({
          currentPage,
          totalPages,
          onPageChange,
          isLoading = false,
          className = ""
        }) => {
          const handlePrevPage = () => {
            if (currentPage > 1 && !isLoading) {
              onPageChange(currentPage - 1);
            }
          };
          const handleNextPage = () => {
            if (currentPage < totalPages && !isLoading) {
              onPageChange(currentPage + 1);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: `flex items-center justify-center gap-4 ${className}`,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              fill: "clear",
              onClick: handlePrevPage,
              disabled: currentPage === 1 || isLoading,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: chevronBack
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
              className: "text-sm",
              children: [currentPage, "/", totalPages]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              fill: "clear",
              onClick: handleNextPage,
              disabled: currentPage === totalPages || isLoading,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: chevronForward
              })
            })]
          });
        });
      }
    };
  });
})();
