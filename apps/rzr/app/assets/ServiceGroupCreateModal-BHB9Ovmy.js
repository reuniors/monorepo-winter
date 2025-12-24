import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-AVDGa64O.js";
import { aj as useIonRouter, h as IonHeader, i as IonToolbar, j as IonTitle, k as IonButtons, d as IonButton, l as IonIcon, m as closeOutline, b as IonContent } from "./vendor_ionic-DxHtCw90.js";
import { E as useShowNotification, I as IonModalExtended, f as urlPrefix } from "./App-Dg2revQP.js";
import { S as ServiceGroupBasicInfoStep } from "./ServiceGroupBasicInfoStep-BKk-cVUR.js";
function ServiceGroupCreateModal({
  isOpen,
  onDidDismiss,
  onSuccess
}) {
  const { t } = useTranslation();
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
  const handleExit = () => {
    onDidDismiss();
  };
  const handleCreateSuccess = (serviceGroupId) => {
    showSuccessNotification();
    onSuccess == null ? void 0 : onSuccess();
    onDidDismiss();
    if (!onSuccess) {
      router.push(
        "".concat(urlPrefix, "/podesavanja/usluge/groups/").concat(serviceGroupId),
        "root",
        "replace"
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      name: "service-group-create-modal",
      isOpen,
      onClose: onDidDismiss,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonTitle, { children: t("Nova grupa") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: onDidDismiss, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeOutline }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ServiceGroupBasicInfoStep,
          {
            serviceGroup: tempServiceGroup,
            onExit: handleExit,
            isBackDisabled: true,
            isLastPage: true,
            isCreate: true,
            onCreateSuccess: handleCreateSuccess
          }
        ) }) })
      ]
    }
  );
}
export {
  ServiceGroupCreateModal as S
};
