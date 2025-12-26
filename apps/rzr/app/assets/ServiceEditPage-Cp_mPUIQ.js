import { ai as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-BVRDO8z9.js";
import { al as useIonRouter, a_ as IonCard, b0 as IonCardHeader, b1 as IonCardTitle, l as IonIcon, aI as createOutline, a$ as IonCardContent } from "./vendor_ionic-CnFg9owC.js";
import { a3 as useUpdateServiceMutation, J as useShowNotification, a5 as ServiceEditForm } from "./App-oS9wePv1.js";
import "./vendor_leaflet-BdieFp9x.js";
import "./index-CRN2Hrtc.js";
import "./vendor_firebase-DKsXaMug.js";
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
