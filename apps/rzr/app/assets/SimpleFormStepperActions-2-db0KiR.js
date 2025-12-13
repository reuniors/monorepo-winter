import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-DSVIR5Ln.js";
import { ag as IonLoading, d as IonButton, l as IonIcon, an as exitOutline, bu as arrowBackOutline, s as saveOutline, S as cloudUploadOutline, bv as arrowForwardOutline } from "./vendor_ionic-DMW4l-HL.js";
function SimpleFormStepperActions({
  onBack,
  onAction,
  onExit,
  showBack = true,
  showAction = true,
  backText,
  actionText,
  actionIcon,
  className = "flex justify-between p-4",
  isBackDisabled = false,
  isLastPage = false,
  isLoading = false,
  loadingMessage,
  uploadingImages = 0,
  isUploadOnly = false
}) {
  const { t } = useTranslation();
  const isUpload = uploadingImages > 0;
  const getActionButtonText = () => {
    if (actionText) {
      return actionText;
    }
    if (isUpload) {
      return "(".concat(uploadingImages, ") ").concat(t("Upload slika"));
    }
    if (isUploadOnly) {
      return t("Nastavi");
    }
    if (isLastPage) {
      return t("Sačuvaj i izađi");
    }
    return t("Sačuvaj i nastavi");
  };
  const getActionButtonIcon = () => {
    let icon = saveOutline;
    let color = "success";
    if (actionIcon) {
      icon = actionIcon;
      color = "primary";
    } else if (isUpload) {
      icon = cloudUploadOutline;
      color = "warning";
    } else if (isUploadOnly) {
      icon = arrowForwardOutline;
      color = "primary";
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon, className: "mr-2", color });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonLoading,
      {
        isOpen: isLoading,
        message: loadingMessage || t("Čuvanje...")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 trasnsparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "".concat(className, "  bottom-0 fixed w-full z-10 bg-black max-w-[900px]"),
        children: [
          showBack && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isBackDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              onClick: onExit || onBack,
              fill: "outline",
              color: "danger",
              style: {
                borderColor: "var(--ion-color-danger)",
                color: "var(--ion-color-danger)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: exitOutline, slot: "start" }),
                t("Izlaz")
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { onClick: onBack, fill: "outline", color: "primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: arrowBackOutline, slot: "start" }),
            backText || t("Nazad")
          ] }) }),
          showAction && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { onClick: onAction, color: "light", disabled: isLoading, children: [
            getActionButtonIcon(),
            " ",
            getActionButtonText()
          ] }) })
        ]
      }
    )
  ] });
}
export {
  SimpleFormStepperActions as S
};
