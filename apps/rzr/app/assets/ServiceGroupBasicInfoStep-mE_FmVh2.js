import { a1 as create$3, aL as create$5, aM as create$7, a2 as create$6, a0 as t, aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BF1Ucyx8.js";
import { U as convertEmptyStringToNull, V as generateSlugForValidation, b as useUser, F as FieldType, r as useFormWithSchema, Z as useUpdateServiceGroupMutation, _ as useCreateServiceGroupMutation, B as useShowNotification, D as DynamicForm, E as SimpleFormStepperActions, k as activeLocation } from "./App-B7xuFYaY.js";
const serviceGroupBasicInfoFormSchema = create$3().shape({
  title: create$6().required("Naziv je obavezan"),
  slug: create$6().required("Slug je obavezan").test("slug-validation", "Slug mora biti u ispravnom formatu", (value) => {
    if (!value) return false;
    return generateSlugForValidation(value) === value;
  }),
  description: create$6().transform(convertEmptyStringToNull).nullable().defined(),
  active: create$7().required(),
  type: create$5().required(),
  inputType: create$5().required(),
  required: create$7().required(),
  minSelected: create$5().min(0, "Minimalno mora biti 0").required(),
  maxSelected: create$5().min(1, "Maksimalno mora biti najmanje 1").required()
});
const getServiceGroupBasicInfoFormFields = (serviceGroupId) => {
  const { isAdmin } = useUser();
  return [
    {
      keyName: "title",
      name: "title",
      data: {
        type: FieldType.Text,
        label: t("Naslov"),
        translation: void 0
      }
    },
    {
      keyName: "slug",
      name: "slug",
      data: {
        type: FieldType.Text,
        label: t("Slug")
      },
      disabled: !isAdmin
    },
    {
      keyName: "description",
      name: "description",
      data: {
        type: FieldType.TextArea,
        label: t("Opis"),
        translation: void 0
      }
    },
    {
      keyName: "active",
      name: "active",
      data: {
        type: FieldType.Switch,
        label: t("Aktivno")
      },
      disabled: !isAdmin
    },
    {
      keyName: "type",
      name: "type",
      data: {
        type: FieldType.Select,
        label: t("Tip"),
        options: [
          { value: "0", text: t("Salon") },
          { value: "1", text: t("Restoran") }
        ]
      }
    },
    {
      keyName: "inputType",
      name: "inputType",
      data: {
        type: FieldType.Select,
        label: t("Tip unosa"),
        options: [
          { value: "0", text: t("Checkbox") },
          { value: "1", text: t("Radio") },
          { value: "2", text: t("Select") }
        ]
      }
    },
    {
      keyName: "required",
      name: "required",
      data: {
        type: FieldType.Switch,
        label: t("Obavezno")
      }
    },
    {
      keyName: "minSelected",
      name: "minSelected",
      data: {
        type: FieldType.Number,
        label: t("Minimalno izabrano")
      }
    },
    {
      keyName: "maxSelected",
      name: "maxSelected",
      data: {
        type: FieldType.Number,
        label: t("Maksimalno izabrano")
      }
    }
  ];
};
function ServiceGroupBasicInfoStep({
  serviceGroup,
  onNext,
  onBack,
  onExit,
  isBackDisabled = false,
  isLastPage = false,
  isCreate = false,
  onCreateSuccess
}) {
  var _a, _b, _c, _d, _e, _f;
  const { t: t2 } = useTranslation();
  const form = useFormWithSchema(serviceGroupBasicInfoFormSchema, {
    defaultValues: {
      title: serviceGroup.title || "",
      slug: serviceGroup.slug || "",
      description: serviceGroup.description || "",
      active: (_a = serviceGroup.active) != null ? _a : true,
      type: (_b = serviceGroup.type) != null ? _b : 0,
      inputType: (_c = serviceGroup.inputType) != null ? _c : 0,
      required: (_d = serviceGroup.required) != null ? _d : false,
      minSelected: (_e = serviceGroup.minSelected) != null ? _e : 0,
      maxSelected: (_f = serviceGroup.maxSelected) != null ? _f : 1
    }
  });
  const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
  const [createServiceGroup, createServiceGroupResponse] = useCreateServiceGroupMutation();
  const [showSuccessNotification] = useShowNotification({
    message: isCreate ? t2("Grupa je uspešno kreirana") : t2("Podaci o grupi su uspešno sačuvani"),
    color: "success"
  });
  const [showErrorNotification] = useShowNotification({
    message: isCreate ? t2("Greška pri kreiranju grupe") : t2("Greška pri čuvanju podataka"),
    color: "danger"
  });
  const formFields = getServiceGroupBasicInfoFormFields();
  const isLoading = isCreate ? createServiceGroupResponse.isLoading : updateServiceGroupResponse.isLoading;
  const handleSubmit = (data) => {
    if (isCreate) {
      createServiceGroup({
        ...data,
        locationSlug: activeLocation
      }).then((response) => {
        var _a2, _b2;
        if ("data" in response && ((_b2 = (_a2 = response.data) == null ? void 0 : _a2.data) == null ? void 0 : _b2.id)) {
          showSuccessNotification();
          onCreateSuccess == null ? void 0 : onCreateSuccess(response.data.data.id);
        } else {
          showErrorNotification();
        }
      }).catch(() => {
        showErrorNotification();
      });
    } else {
      updateServiceGroup({
        ...data,
        id: serviceGroup.id
      }).then((response) => {
        var _a2;
        if ("data" in response && ((_a2 = response.data) == null ? void 0 : _a2.success)) {
          showSuccessNotification();
          if (isLastPage) {
            onExit == null ? void 0 : onExit();
          } else {
            onNext == null ? void 0 : onNext();
          }
        } else {
          showErrorNotification();
        }
      }).catch(() => {
        showErrorNotification();
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DynamicForm,
      {
        fields: formFields,
        form,
        itemProps: { color: "light" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepperActions,
      {
        onAction: form.handleSubmit(handleSubmit),
        onBack,
        onExit,
        isBackDisabled,
        isLastPage,
        isLoading
      }
    )
  ] });
}
export {
  ServiceGroupBasicInfoStep as S
};
