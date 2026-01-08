import { a3 as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-LOGlbA9o.js";
import { al as useIonRouter, a$ as IonCard, b1 as IonCardHeader, b2 as IonCardTitle, l as IonIcon, aI as createOutline, b0 as IonCardContent } from "./vendor_ionic-D94VuZ44.js";
import { a3 as useUpdateServiceMutation, J as useShowNotification, a5 as ServiceEditForm } from "./App-Byz-BlJA.js";
import "./vendor_leaflet-DPGBd-b-.js";
import "./index-DB6rcYif.js";
import "./vendor_firebase-BP40AiT5.js";
function ServiceEditPage({ service }) {
  const { t } = useTranslation();
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
  const handleSubmit = (data) => {
    updateService({
      ...data,
      id: service.id,
      sortOrder: service.sortOrder
    }).then((response) => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: createOutline }),
      t("Izmeni uslugu")
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceEditForm, { service, onSubmit: handleSubmit }) })
  ] }) });
}
export {
  ServiceEditPage as default
};
