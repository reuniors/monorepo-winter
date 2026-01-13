import { a2 as t, v as instance, e as reactExports, j as jsxRuntimeExports, a3 as yup } from "./vendor_react-BAn6__hR.js";
import { k as IonContent, p as IonFooter, f as IonToolbar, i as IonButtons, d as IonButton } from "./vendor_ionic-BUXN7OTv.js";
import { F as FieldType, b as useUser, x as useFormWithSchema, D as DynamicForm } from "./App-BeQxDD8i.js";
import { I as IonModalExtended } from "./index-DN_Fulfp.js";
const getAdministrationClientFormFields = (isPhoneNumberDisabled, fullNameOptions, handleAddNewOption) => [
  {
    keyName: "id",
    name: "fullName",
    data: {
      type: FieldType.Autocomplete,
      label: t("Pronađi korisnika"),
      options: fullNameOptions,
      handleAddNewOption
    },
    colClassNames: "border"
  }
];
const getClientFormFields = (isPhoneNumberDisabled, formDisabled = false) => [
  {
    keyName: "fullName",
    name: "fullName",
    data: {
      type: FieldType.Text,
      label: t("Ime i prezime")
    },
    gridSize: {
      size: "12"
    },
    disabled: formDisabled,
    required: true
  },
  {
    keyName: "phoneNumber",
    name: "phoneNumber",
    data: {
      type: FieldType.Text,
      label: t("Broj telefona")
    },
    gridSize: {
      size: "12"
    },
    disabled: isPhoneNumberDisabled || formDisabled,
    required: true
  },
  {
    keyName: "dateOfBirth",
    name: t("Datum rođenja"),
    data: {
      type: FieldType.Date,
      label: t("Datum rođenja"),
      inputProps: {
        presentation: "date",
        preferWheel: true,
        max: new Date(
          (/* @__PURE__ */ new Date()).setFullYear((/* @__PURE__ */ new Date()).getFullYear() - 15)
        ).toISOString(),
        locale: instance.language === "rs" ? "sr-Latn-RS" : "en-GB"
      },
      defaultValue: "1990-01-01"
    },
    gridSize: { size: "12" },
    disabled: formDisabled
  }
];
const clientSchema = yup.object().shape({
  id: yup.mixed().required().nullable(),
  fullName: yup.string().required("Ime i prezime je obavezno"),
  phoneNumber: yup.string().matches(/^[06]\d{6,11}$/, {
    message: t("Broj telefona mora početi sa 06 i imati od 6 do 12 cifara")
  }).required("Broj telefona je obavezan"),
  dateOfBirth: yup.string().required().nullable()
});
function ClientDataModal({
  isOpen,
  onCancel,
  onSave,
  cancelLabel,
  saveLabel,
  initialData
}) {
  var _a, _b, _c;
  const { userData } = useUser();
  const getDefaultFullName = () => {
    if (initialData == null ? void 0 : initialData.fullName) {
      return initialData.fullName;
    }
    if (userData) {
      if ("firstName" in userData && "lastName" in userData) {
        return "".concat(userData.firstName, " ").concat(userData.lastName).trim();
      }
      if ("name" in userData && typeof userData.name === "string") {
        return userData.name;
      }
    }
    return "";
  };
  const form = useFormWithSchema(clientSchema, {
    defaultValues: {
      id: (_a = initialData == null ? void 0 : initialData.id) != null ? _a : null,
      fullName: getDefaultFullName(),
      phoneNumber: (_b = initialData == null ? void 0 : initialData.phoneNumber) != null ? _b : "",
      dateOfBirth: (_c = initialData == null ? void 0 : initialData.dateOfBirth) != null ? _c : null
    }
  });
  const { handleSubmit, formState } = form;
  const formFields = getClientFormFields(false, false);
  const modalRef = reactExports.useRef(null);
  const firstInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a2, _b2, _c2;
    if (isOpen) {
      const defaultFullName = getDefaultFullName();
      const currentFullName = form.getValues("fullName");
      if (defaultFullName && !currentFullName) {
        form.setValue("fullName", defaultFullName);
      }
      if (initialData) {
        form.setValue("id", (_a2 = initialData.id) != null ? _a2 : null);
        form.setValue("phoneNumber", (_b2 = initialData.phoneNumber) != null ? _b2 : "");
        form.setValue("dateOfBirth", (_c2 = initialData.dateOfBirth) != null ? _c2 : null);
        if (initialData.fullName) {
          form.setValue("fullName", initialData.fullName);
        }
      }
    }
  }, [isOpen, initialData, userData, form]);
  const handleDidPresent = reactExports.useCallback(() => {
    setTimeout(() => {
      var _a2;
      const inputEl = firstInputRef.current || ((_a2 = modalRef.current) == null ? void 0 : _a2.querySelector("input"));
      inputEl == null ? void 0 : inputEl.focus();
    }, 100);
  }, []);
  const handleSave = reactExports.useCallback(
    handleSubmit((data) => {
      onSave(data);
    }),
    [handleSubmit, onSave]
  );
  const handleClose = reactExports.useCallback(() => {
    onCancel();
  }, [onCancel]);
  const handleCancelClick = reactExports.useCallback(() => {
    onCancel();
  }, [onCancel]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      ref: modalRef,
      isOpen,
      onClose: handleClose,
      name: "client-data-modal",
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      onDidPresent: handleDidPresent,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { color: "medium", onClick: handleCancelClick, children: cancelLabel != null ? cancelLabel : t("Odustani") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { color: "success", onClick: handleSave, children: saveLabel != null ? saveLabel : t("Sačuvaj") }) })
        ] }) })
      ]
    }
  );
}
export {
  ClientDataModal as C,
  getAdministrationClientFormFields as a,
  getClientFormFields as g
};
