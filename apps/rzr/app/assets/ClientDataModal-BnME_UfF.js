import { a0 as t, v as instance, e as reactExports, j as jsxRuntimeExports, a4 as yup } from "./vendor_react-AVDGa64O.js";
import { b as IonContent, o as IonFooter, i as IonToolbar, k as IonButtons, d as IonButton } from "./vendor_ionic-DxHtCw90.js";
import { F as FieldType, s as useFormWithSchema, I as IonModalExtended, D as DynamicForm } from "./App-D50-L2s0.js";
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
  var _a, _b, _c, _d;
  const form = useFormWithSchema(clientSchema, {
    defaultValues: {
      id: (_a = initialData == null ? void 0 : initialData.id) != null ? _a : null,
      fullName: (_b = initialData == null ? void 0 : initialData.fullName) != null ? _b : "",
      phoneNumber: (_c = initialData == null ? void 0 : initialData.phoneNumber) != null ? _c : "",
      dateOfBirth: (_d = initialData == null ? void 0 : initialData.dateOfBirth) != null ? _d : null
    }
  });
  const { handleSubmit, formState } = form;
  const formFields = getClientFormFields(false, false);
  const modalRef = reactExports.useRef(null);
  const firstInputRef = reactExports.useRef(null);
  const handleDidPresent = reactExports.useCallback(() => {
    setTimeout(() => {
      var _a2;
      const inputEl = firstInputRef.current || ((_a2 = modalRef.current) == null ? void 0 : _a2.querySelector("input"));
      inputEl == null ? void 0 : inputEl.focus();
    }, 100);
  }, []);
  const handleSave = handleSubmit((data) => {
    onSave(data);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      ref: modalRef,
      isOpen,
      onClose: onCancel,
      name: "client-data-modal",
      initialBreakpoint: 1,
      breakpoints: [0, 1],
      onDidPresent: handleDidPresent,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { color: "medium", onClick: onCancel, children: cancelLabel != null ? cancelLabel : t("Odustani") }) }),
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
