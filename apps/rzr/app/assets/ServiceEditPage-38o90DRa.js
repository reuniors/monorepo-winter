import { aD as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-CcaSbe82.js";
import { aj as useIonRouter, aX as IonCard, aZ as IonCardHeader, a_ as IonCardTitle, l as IonIcon, aE as createOutline, aY as IonCardContent } from "./vendor_ionic-CzUq-n1w.js";
import { Y as useUpdateServiceMutation, E as useShowNotification, a1 as ServiceEditForm } from "./App-Mqz5oeDp.js";
import "./vendor_leaflet-DOGRMO2m.js";
import "./index-B651NyBa.js";
import "./vendor_firebase-B4S_IzfU.js";
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
