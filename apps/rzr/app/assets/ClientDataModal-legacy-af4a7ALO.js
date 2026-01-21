;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './vendor_ionic-legacy-DvZl6sBE.js', './App-legacy-DtnUlzjS.js', './index-legacy-CFC1yKwU.js'], function (exports, module) {
    'use strict';

    var t, instance, reactExports, jsxRuntimeExports, yup, IonContent, IonFooter, IonToolbar, IonButtons, IonButton, FieldType, useUser, useFormWithSchema, DynamicForm, IonModalExtended;
    return {
      setters: [module => {
        t = module.a2;
        instance = module.v;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        yup = module.a3;
      }, module => {
        IonContent = module.k;
        IonFooter = module.p;
        IonToolbar = module.f;
        IonButtons = module.i;
        IonButton = module.d;
      }, module => {
        FieldType = module.F;
        useUser = module.b;
        useFormWithSchema = module.x;
        DynamicForm = module.D;
      }, module => {
        IonModalExtended = module.I;
      }],
      execute: function () {
        exports("C", ClientDataModal);
        const getAdministrationClientFormFields = exports("a", (isPhoneNumberDisabled, fullNameOptions, handleAddNewOption) => [{
          keyName: "id",
          name: "fullName",
          data: {
            type: FieldType.Autocomplete,
            label: t("Pronađi korisnika"),
            options: fullNameOptions,
            handleAddNewOption
          },
          colClassNames: "border"
        }]);
        const getClientFormFields = exports("g", (isPhoneNumberDisabled, formDisabled = false) => [{
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
        }, {
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
        }, {
          keyName: "dateOfBirth",
          name: t("Datum rođenja"),
          data: {
            type: FieldType.Date,
            label: t("Datum rođenja"),
            inputProps: {
              presentation: "date",
              preferWheel: true,
              max: new Date((/* @__PURE__ */new Date()).setFullYear((/* @__PURE__ */new Date()).getFullYear() - 15)).toISOString(),
              locale: instance.language === "rs" ? "sr-Latn-RS" : "en-GB"
            },
            defaultValue: "1990-01-01"
          },
          gridSize: {
            size: "12"
          },
          disabled: formDisabled
        }]);
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
          const {
            userData
          } = useUser();
          const getDefaultFullName = () => {
            if (initialData?.fullName) {
              return initialData.fullName;
            }
            if (userData) {
              if ("firstName" in userData && "lastName" in userData) {
                return `${userData.firstName} ${userData.lastName}`.trim();
              }
              if ("name" in userData && typeof userData.name === "string") {
                return userData.name;
              }
            }
            return "";
          };
          const form = useFormWithSchema(clientSchema, {
            defaultValues: {
              id: initialData?.id ?? null,
              fullName: getDefaultFullName(),
              phoneNumber: initialData?.phoneNumber ?? "",
              dateOfBirth: initialData?.dateOfBirth ?? null
            }
          });
          const {
            handleSubmit,
            formState
          } = form;
          const formFields = getClientFormFields(false, false);
          const modalRef = reactExports.useRef(null);
          const firstInputRef = reactExports.useRef(null);
          reactExports.useEffect(() => {
            if (isOpen) {
              const defaultFullName = getDefaultFullName();
              const currentFullName = form.getValues("fullName");
              if (defaultFullName && !currentFullName) {
                form.setValue("fullName", defaultFullName);
              }
              if (initialData) {
                form.setValue("id", initialData.id ?? null);
                form.setValue("phoneNumber", initialData.phoneNumber ?? "");
                form.setValue("dateOfBirth", initialData.dateOfBirth ?? null);
                if (initialData.fullName) {
                  form.setValue("fullName", initialData.fullName);
                }
              }
            }
          }, [isOpen, initialData, userData, form]);
          const handleDidPresent = reactExports.useCallback(() => {
            setTimeout(() => {
              const inputEl = firstInputRef.current || modalRef.current?.querySelector("input");
              inputEl?.focus();
            }, 100);
          }, []);
          const handleSave = reactExports.useCallback(handleSubmit(data => {
            onSave(data);
          }), [handleSubmit, onSave]);
          const handleClose = reactExports.useCallback(() => {
            onCancel();
          }, [onCancel]);
          const handleCancelClick = reactExports.useCallback(() => {
            onCancel();
          }, [onCancel]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended, {
            ref: modalRef,
            isOpen,
            onClose: handleClose,
            name: "client-data-modal",
            initialBreakpoint: 1,
            breakpoints: [0, 1],
            onDidPresent: handleDidPresent,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              className: "ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("form", {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                  fields: formFields,
                  form
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "start",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    color: "medium",
                    onClick: handleCancelClick,
                    children: cancelLabel ?? t("Odustani")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    color: "success",
                    onClick: handleSave,
                    children: saveLabel ?? t("Sačuvaj")
                  })
                })]
              })
            })]
          });
        }
      }
    };
  });
})();
