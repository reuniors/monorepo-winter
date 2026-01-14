;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './App-legacy-DZgevgqC.js', './ServiceGroupBasicInfoStep-legacy-BctaOAw-.js', './index-legacy-CuEOqhSX.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, closeOutline, IonContent, useShowNotification, urlPrefix, ServiceGroupBasicInfoStep, IonModalExtended;
    return {
      setters: [module => {
        useTranslation = module.M;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.ao;
        IonHeader = module.e;
        IonToolbar = module.f;
        IonTitle = module.h;
        IonButtons = module.i;
        IonButton = module.d;
        IonIcon = module.b;
        closeOutline = module.j;
        IonContent = module.k;
      }, module => {
        useShowNotification = module.J;
        urlPrefix = module.g;
      }, module => {
        ServiceGroupBasicInfoStep = module.S;
      }, module => {
        IonModalExtended = module.I;
      }],
      execute: function () {
        exports("S", ServiceGroupCreateModal);
        function ServiceGroupCreateModal({
          isOpen,
          onDidDismiss,
          onSuccess
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [showSuccessNotification] = useShowNotification({
            message: t("Grupa je uspešno kreirana"),
            color: "success"
          });
          useShowNotification({
            message: t("Greška pri kreiranju grupe"),
            color: "danger"
          });
          const tempServiceGroup = {
            id: 0,
            title: "",
            name: "",
            slug: "",
            description: "",
            active: true,
            type: 0,
            inputType: 0,
            sortOrder: 0,
            required: false,
            minSelected: 0,
            maxSelected: 1,
            services: []
          };
          const handleClose = reactExports.useCallback(() => {
            onDidDismiss();
          }, [onDidDismiss]);
          const handleExit = reactExports.useCallback(() => {
            onDidDismiss();
          }, [onDidDismiss]);
          const handleCreateSuccess = serviceGroupId => {
            showSuccessNotification();
            onSuccess?.();
            onDidDismiss();
            if (!onSuccess) {
              router.push(`${urlPrefix}/podesavanja/usluge/groups/${serviceGroupId}`, "root", "replace");
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended, {
            name: "service-group-create-modal",
            isOpen,
            onClose: handleClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Nova grupa")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "max-w-4xl mx-auto ion-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupBasicInfoStep, {
                  serviceGroup: tempServiceGroup,
                  onExit: handleExit,
                  isBackDisabled: true,
                  isLastPage: true,
                  isCreate: true,
                  onCreateSuccess: handleCreateSuccess
                })
              })
            })]
          });
        }
      }
    };
  });
})();
