import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-CDpfJxnK.js";
import { aj as useIonRouter, f as IonModal, h as IonHeader, i as IonToolbar, j as IonTitle, k as IonButtons, d as IonButton, l as IonIcon, m as closeOutline, b as IonContent } from "./vendor_ionic-ZVUk9kYn.js";
import { E as useShowNotification, f as urlPrefix } from "./App-CTu3eXM2.js";
import { S as ServiceGroupBasicInfoStep } from "./ServiceGroupBasicInfoStep-DwxYty58.js";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonModal, { isOpen, onDidDismiss, children: [
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
  ] });
}
export {
  ServiceGroupCreateModal as S
};
