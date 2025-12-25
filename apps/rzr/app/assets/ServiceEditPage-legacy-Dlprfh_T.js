;
(function () {
  System.register(['./vendor_react-legacy-yeQ-Nqpl.js', './vendor_ionic-legacy-DdPNGOLm.js', './App-legacy-DRWtf8eI.js', './vendor_leaflet-legacy-Cr0PaNC7.js', './index-legacy-Bog12BrJ.js', './vendor_firebase-legacy-CPHztqRU.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, createOutline, IonCardContent, useUpdateServiceMutation, useShowNotification, ServiceEditForm;
    return {
      setters: [module => {
        useTranslation = module.aD;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        IonCard = module.aY;
        IonCardHeader = module.a_;
        IonCardTitle = module.a$;
        IonIcon = module.l;
        createOutline = module.aH;
        IonCardContent = module.aZ;
      }, module => {
        useUpdateServiceMutation = module.a1;
        useShowNotification = module.E;
        ServiceEditForm = module.a3;
      }, null, null, null],
      execute: function () {
        exports("default", ServiceEditPage);
        function ServiceEditPage({
          service
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [updateService, updateServiceResponse] = useUpdateServiceMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Podaci su uspešno sačuvani"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const handleSubmit = data => {
            updateService({
              ...data,
              id: service.id,
              sortOrder: service.sortOrder
            }).then(response => {
              if ("data" in response) {
                router.goBack();
              }
            });
          };
          reactExports.useEffect(() => {
            if (updateServiceResponse.isSuccess) {
              showSuccessNotification();
            }
          }, [updateServiceResponse.isSuccess]);
          reactExports.useEffect(() => {
            if (updateServiceResponse.isError) {
              showErrorNotification();
            }
          }, [updateServiceResponse.isError]);
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: createOutline
                    }), t("Izmeni uslugu")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceEditForm, {
                  service,
                  onSubmit: handleSubmit
                })
              })]
            })
          });
        }
      }
    };
  });
})();
