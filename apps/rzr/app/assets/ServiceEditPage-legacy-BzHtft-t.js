;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './App-legacy-OqtQecgU.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-Cdf7FWKJ.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, createOutline, IonCardContent, useUpdateServiceMutation, useShowNotification, ServiceEditForm;
    return {
      setters: [module => {
        useTranslation = module.M;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.ao;
        IonCard = module.b2;
        IonCardHeader = module.b4;
        IonCardTitle = module.b5;
        IonIcon = module.b;
        createOutline = module.aL;
        IonCardContent = module.b3;
      }, module => {
        useUpdateServiceMutation = module.a5;
        useShowNotification = module.J;
        ServiceEditForm = module.a7;
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
