import { M as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { ao as useIonRouter, e as IonHeader, f as IonToolbar, h as IonTitle, i as IonButtons, d as IonButton, b as IonIcon, j as closeOutline, k as IonContent } from "./vendor_ionic-BUXN7OTv.js";
import { J as useShowNotification, g as urlPrefix } from "./App-DPj5tmUk.js";
import { S as ServiceGroupBasicInfoStep } from "./ServiceGroupBasicInfoStep-uycKFRcZ.js";
import { I as IonModalExtended } from "./index-DDjfk2Xy.js";
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
  const handleClose = reactExports.useCallback(() => {
    onDidDismiss();
  }, [onDidDismiss]);
  const handleExit = reactExports.useCallback(() => {
    onDidDismiss();
  }, [onDidDismiss]);
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
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonTitle, { children: t("Nova grupa") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeOutline }) }) })
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
