;
(function () {
  System.register(['./vendor_react-legacy-CFXrDSu1.js', './vendor_ionic-legacy-kFTPXAWE.js', './App-legacy-DT3CUYN8.js'], function (exports, module) {
    'use strict';

    var create$3, create$7, create$6, create$5, t, instance, useTranslation, reactExports, jsxRuntimeExports, IonItem, IonLabel, IonToggle, IonButton, IonIcon, saveOutline, IonSpinner, FieldType, useFormWithSchema, activeLocation, DynamicForm;
    return {
      setters: [module => {
        create$3 = module.a6;
        create$7 = module.aM;
        create$6 = module.a7;
        create$5 = module.aL;
        t = module.a0;
        instance = module.v;
        useTranslation = module.a3;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        IonItem = module.q;
        IonLabel = module.F;
        IonToggle = module.ac;
        IonButton = module.d;
        IonIcon = module.l;
        saveOutline = module.s;
        IonSpinner = module.n;
      }, module => {
        FieldType = module.F;
        useFormWithSchema = module.w;
        activeLocation = module.m;
        DynamicForm = module.D;
      }],
      execute: function () {
        exports("N", NewsForm);
        const newsFormSchema = create$3().shape({
          title: create$6().min(2, t("Naslov mora imati najmanje 2 karaktera")).max(255, t("Naslov ne može biti duži od 255 karaktera")).required(t("Naslov je obavezan")),
          description: create$6().min(10, t("Opis mora imati najmanje 10 karaktera")).max(1e3, t("Opis ne može biti duži od 1000 karaktera")).required(t("Opis je obavezan")),
          level: create$5().min(1, t("Nivo mora biti između 1 i 10")).max(10, t("Nivo mora biti između 1 i 10")).required(t("Nivo je obavezan")),
          type: create$6().oneOf(["news", "chyron", "alert"], t("Nevažeći tip vesti")).required(t("Tip vesti je obavezan")),
          status: create$6().oneOf(["draft", "pending", "approved"], t("Nevažeći status")).required(t("Status je obavezan")),
          locationSlug: create$6().required(t("Lokacija je obavezna")),
          activatedAtUtc: create$6().required(),
          deactivatedAtUtc: create$6().required(),
          showActivationDates: create$7().optional()
        }).test("activation-dates", t("Datum deaktivacije mora biti nakon datuma aktivacije"), function (value) {
          const {
            activatedAtUtc,
            deactivatedAtUtc
          } = value;
          if (activatedAtUtc && deactivatedAtUtc) {
            const activatedDate = new Date(activatedAtUtc);
            const deactivatedDate = new Date(deactivatedAtUtc);
            if (deactivatedDate <= activatedDate) {
              return this.createError({
                message: t("Datum deaktivacije mora biti nakon datuma aktivacije"),
                path: "deactivatedAtUtc"
              });
            }
          }
          return true;
        });
        const getNewsFormFields = showActivationDates => [{
          keyName: "title",
          name: "title",
          data: {
            type: FieldType.Text,
            label: t("Naslov")
          },
          gridSize: {
            size: "12"
          },
          required: true
        }, {
          keyName: "description",
          name: "description",
          data: {
            type: FieldType.TextArea,
            label: t("Opis"),
            maxlength: 1e3,
            rows: 4
          },
          gridSize: {
            size: "12"
          },
          required: true
        }, {
          keyName: "type",
          name: "type",
          data: {
            type: FieldType.Select,
            label: t("Tip vesti"),
            placeholder: t("Izaberite tip vesti"),
            options: [{
              value: "chyron",
              text: t("Kajron")
            }, {
              value: "news",
              text: t("Vesti")
            }, {
              value: "alert",
              text: t("Upozorenja")
            }]
          },
          gridSize: {
            size: "12",
            sizeMd: "6"
          },
          required: true
        }, {
          keyName: "level",
          name: "level",
          data: {
            type: FieldType.Select,
            label: t("Nivo važnosti"),
            placeholder: t("Izaberite nivo važnosti"),
            options: Array.from({
              length: 10
            }, (_, i) => ({
              value: String(i + 1),
              text: `${i + 1} - ${t(`Nivo ${i + 1}`)}`
            }))
          },
          gridSize: {
            size: "12",
            sizeMd: "6"
          },
          required: true
        }, {
          keyName: "status",
          name: "status",
          data: {
            type: FieldType.Select,
            label: t("Status"),
            placeholder: t("Izaberite status"),
            options: [{
              value: "draft",
              text: t("Draft")
            }, {
              value: "pending",
              text: t("Na čekanju")
            }, {
              value: "approved",
              text: t("Odobreno")
            }]
          },
          gridSize: {
            size: "12",
            sizeMd: "6"
          },
          required: true
        }, {
          keyName: "activatedAtUtc",
          name: "activatedAtUtc",
          data: {
            type: FieldType.DateTime,
            label: t("Aktiviraj od"),
            inputProps: {
              preferWheel: true,
              locale: instance.language === "rs" ? "sr-Latn-RS" : "en-GB"
            }
          },
          gridSize: {
            size: "12",
            sizeMd: "6"
          }
        }, {
          keyName: "deactivatedAtUtc",
          name: "deactivatedAtUtc",
          data: {
            type: FieldType.DateTime,
            label: t("Deaktiviraj od"),
            inputProps: {
              preferWheel: true,
              locale: instance.language === "rs" ? "sr-Latn-RS" : "en-GB"
            }
          },
          gridSize: {
            size: "12",
            sizeMd: "6"
          }
        }];
        function NewsForm({
          news,
          onSubmit,
          isLoading = false,
          isEdit = false
        }) {
          const {
            t
          } = useTranslation();
          const [showActivationDates, setShowActivationDates] = reactExports.useState(false);
          const form = useFormWithSchema(newsFormSchema, {
            defaultValues: {
              title: "",
              description: "",
              level: 5,
              type: "news",
              status: "draft",
              locationSlug: activeLocation,
              activatedAtUtc: void 0,
              deactivatedAtUtc: void 0,
              showActivationDates: false
            }
          });
          reactExports.useEffect(() => {
            if (news) {
              const hasActivationDates = !!news.activatedAtUtc || !!news.deactivatedAtUtc;
              setShowActivationDates(hasActivationDates);
              form.reset({
                title: news.title,
                description: news.description,
                level: news.level,
                type: news.type,
                status: news.status,
                locationSlug: activeLocation,
                activatedAtUtc: news.activatedAtUtc || void 0,
                deactivatedAtUtc: news.deactivatedAtUtc || void 0,
                showActivationDates: hasActivationDates
              });
            }
          }, [news, form]);
          const handleSubmit = form.handleSubmit(data => {
            const submitData = {
              ...data
            };
            if (typeof submitData.level === "string") {
              submitData.level = parseInt(submitData.level, 10);
            }
            onSubmit(submitData);
          });
          const handleActivationDatesChange = checked => {
            setShowActivationDates(checked);
            form.setValue("showActivationDates", checked);
            if (!checked) {
              form.setValue("activatedAtUtc", void 0);
              form.setValue("deactivatedAtUtc", void 0);
            }
          };
          const formFields = getNewsFormFields();
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: handleSubmit,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form,
              callback: field => {
                if (field.keyName === "showActivationDates") {
                  return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: t("Aktivacioni datumi")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                      checked: showActivationDates,
                      onIonChange: e => handleActivationDatesChange(e.detail.checked)
                    })]
                  });
                }
                return null;
              }
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding-top",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                type: "submit",
                expand: "block",
                disabled: isLoading,
                color: "success",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: saveOutline,
                  slot: "start"
                }), isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  name: "crescent"
                }) : t(isEdit ? "Sačuvaj izmene" : "Kreiraj vest")]
              })
            })]
          });
        }
      }
    };
  });
})();
