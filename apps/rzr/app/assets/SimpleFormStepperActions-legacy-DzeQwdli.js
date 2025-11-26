;
(function () {
  System.register(['./vendor_react-legacy-8eT2sGuL.js', './vendor_ionic-legacy-Das9dW4a.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonLoading, IonButton, IonIcon, exitOutline, arrowBackOutline, saveOutline, cloudUploadOutline, arrowForwardOutline;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        IonLoading = module.ag;
        IonButton = module.d;
        IonIcon = module.l;
        exitOutline = module.an;
        arrowBackOutline = module.bp;
        saveOutline = module.s;
        cloudUploadOutline = module.S;
        arrowForwardOutline = module.bq;
      }],
      execute: function () {
        exports("S", SimpleFormStepperActions);
        function SimpleFormStepperActions({
          onBack,
          onAction,
          onExit,
          showBack = true,
          showAction = true,
          backText,
          actionText,
          actionIcon,
          className = "flex justify-between p-4",
          isBackDisabled = false,
          isLastPage = false,
          isLoading = false,
          loadingMessage,
          uploadingImages = 0,
          isUploadOnly = false
        }) {
          const {
            t
          } = useTranslation();
          const isUpload = uploadingImages > 0;
          const getActionButtonText = () => {
            if (actionText) {
              return actionText;
            }
            if (isUpload) {
              return `(${uploadingImages}) ${t("Upload slika")}`;
            }
            if (isUploadOnly) {
              return t("Nastavi");
            }
            if (isLastPage) {
              return t("Sačuvaj i izađi");
            }
            return t("Sačuvaj i nastavi");
          };
          const getActionButtonIcon = () => {
            let icon = saveOutline;
            let color = "success";
            if (actionIcon) {
              icon = actionIcon;
              color = "primary";
            } else if (isUpload) {
              icon = cloudUploadOutline;
              color = "warning";
            } else if (isUploadOnly) {
              icon = arrowForwardOutline;
              color = "primary";
            }
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon,
              className: "mr-2",
              color
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [isLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: isLoading,
              message: loadingMessage || t("Čuvanje...")
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "h-20 trasnsparent"
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: `${className}  bottom-0 fixed w-full z-10 bg-black max-w-[900px]`,
              children: [showBack && /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                children: isBackDisabled ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onExit || onBack,
                  fill: "outline",
                  color: "danger",
                  style: {
                    borderColor: "var(--ion-color-danger)",
                    color: "var(--ion-color-danger)"
                  },
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: exitOutline,
                    slot: "start"
                  }), t("Izlaz")]
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onBack,
                  fill: "outline",
                  color: "primary",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: arrowBackOutline,
                    slot: "start"
                  }), backText || t("Nazad")]
                })
              }), showAction && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex gap-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onAction,
                  color: "light",
                  disabled: isLoading,
                  children: [getActionButtonIcon(), " ", getActionButtonText()]
                })
              })]
            })]
          });
        }
      }
    };
  });
})();
