;
(function () {
  System.register(['./vendor_react-legacy-VZwyi0Js.js', './App-legacy-N9ek9vDT.js'], function (exports, module) {
    'use strict';

    var create$3, create$5, create$7, create$6, t, useTranslation, jsxRuntimeExports, convertEmptyStringToNull, generateSlugForValidation, useUser, FieldType, useFormWithSchema, useUpdateServiceGroupMutation, useCreateServiceGroupMutation, useShowNotification, DynamicForm, SimpleFormStepperActions, activeLocation;
    return {
      setters: [module => {
        create$3 = module.a1;
        create$5 = module.aL;
        create$7 = module.aM;
        create$6 = module.a2;
        t = module.a0;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        convertEmptyStringToNull = module.V;
        generateSlugForValidation = module.W;
        useUser = module.b;
        FieldType = module.F;
        useFormWithSchema = module.s;
        useUpdateServiceGroupMutation = module._;
        useCreateServiceGroupMutation = module.$;
        useShowNotification = module.E;
        DynamicForm = module.D;
        SimpleFormStepperActions = module.G;
        activeLocation = module.k;
      }],
      execute: function () {
        exports("S", ServiceGroupBasicInfoStep);
        const serviceGroupBasicInfoFormSchema = create$3().shape({
          title: create$6().required("Naziv je obavezan"),
          slug: create$6().required("Slug je obavezan").test("slug-validation", "Slug mora biti u ispravnom formatu", value => {
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
        const getServiceGroupBasicInfoFormFields = serviceGroupId => {
          const {
            isAdmin
          } = useUser();
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov"),
              translation: void 0
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug")
            },
            disabled: !isAdmin
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.TextArea,
              label: t("Opis"),
              translation: void 0
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivno")
            },
            disabled: !isAdmin
          }, {
            keyName: "type",
            name: "type",
            data: {
              type: FieldType.Select,
              label: t("Tip"),
              options: [{
                value: "0",
                text: t("Salon")
              }, {
                value: "1",
                text: t("Restoran")
              }]
            }
          }, {
            keyName: "inputType",
            name: "inputType",
            data: {
              type: FieldType.Select,
              label: t("Tip unosa"),
              options: [{
                value: "0",
                text: t("Checkbox")
              }, {
                value: "1",
                text: t("Radio")
              }, {
                value: "2",
                text: t("Select")
              }]
            }
          }, {
            keyName: "required",
            name: "required",
            data: {
              type: FieldType.Switch,
              label: t("Obavezno")
            }
          }, {
            keyName: "minSelected",
            name: "minSelected",
            data: {
              type: FieldType.Number,
              label: t("Minimalno izabrano")
            }
          }, {
            keyName: "maxSelected",
            name: "maxSelected",
            data: {
              type: FieldType.Number,
              label: t("Maksimalno izabrano")
            }
          }];
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
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceGroupBasicInfoFormSchema, {
            defaultValues: {
              title: serviceGroup.title || "",
              slug: serviceGroup.slug || "",
              description: serviceGroup.description || "",
              active: serviceGroup.active ?? true,
              type: serviceGroup.type ?? 0,
              inputType: serviceGroup.inputType ?? 0,
              required: serviceGroup.required ?? false,
              minSelected: serviceGroup.minSelected ?? 0,
              maxSelected: serviceGroup.maxSelected ?? 1
            }
          });
          const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
          const [createServiceGroup, createServiceGroupResponse] = useCreateServiceGroupMutation();
          const [showSuccessNotification] = useShowNotification({
            message: isCreate ? t("Grupa je uspešno kreirana") : t("Podaci o grupi su uspešno sačuvani"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: isCreate ? t("Greška pri kreiranju grupe") : t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const formFields = getServiceGroupBasicInfoFormFields();
          const isLoading = isCreate ? createServiceGroupResponse.isLoading : updateServiceGroupResponse.isLoading;
          const handleSubmit = data => {
            if (isCreate) {
              createServiceGroup({
                ...data,
                locationSlug: activeLocation
              }).then(response => {
                if ("data" in response && response.data?.data?.id) {
                  showSuccessNotification();
                  onCreateSuccess?.(response.data.data.id);
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
              }).then(response => {
                if ("data" in response && response.data?.success) {
                  showSuccessNotification();
                  if (isLastPage) {
                    onExit?.();
                  } else {
                    onNext?.();
                  }
                } else {
                  showErrorNotification();
                }
              }).catch(() => {
                showErrorNotification();
              });
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form,
              itemProps: {
                color: "light"
              }
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepperActions, {
              onAction: form.handleSubmit(handleSubmit),
              onBack,
              onExit,
              isBackDisabled,
              isLastPage,
              isLoading
            })]
          });
        }
      }
    };
  });
})();
