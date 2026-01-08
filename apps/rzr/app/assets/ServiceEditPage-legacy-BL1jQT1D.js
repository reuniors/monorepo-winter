;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './vendor_ionic-legacy-C5RSb9DR.js', './App-legacy-CeIZSQzJ.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-SMp-2h98.js', './vendor_firebase-legacy-BEYs4Jgn.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, createOutline, IonCardContent, useUpdateServiceMutation, useShowNotification, ServiceEditForm;
    return {
      setters: [module => {
        useTranslation = module.a3;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.al;
        IonCard = module.a_;
        IonCardHeader = module.b0;
        IonCardTitle = module.b1;
        IonIcon = module.l;
        createOutline = module.aI;
        IonCardContent = module.a$;
      }, module => {
        useUpdateServiceMutation = module.a3;
        useShowNotification = module.J;
        ServiceEditForm = module.a5;
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
