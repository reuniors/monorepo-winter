;
(function () {
  System.register(['./vendor_react-legacy-BlcubaNj.js', './vendor_ionic-legacy-DMDRhAuO.js', './App-legacy-B_CrLuzT.js', './index-legacy-D4TPg-pG.js', './vendor_leaflet-legacy-C0625EaZ.js', './vendor_firebase-legacy-Cowo1GnG.js'], function (exports, module) {
    'use strict';

    var create$3, create$5, create$7, create$6, t, useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, settingsOutline, IonCardContent, IonButton, saveOutline, IonSpinner, IonText, FieldType, transformStandardResponseToCamelCase, useGetFeLocationQuery, activeLocation, preloadedLocationData, useFormWithSchema, useShowNotification, DynamicForm, rzrApi, TagType;
    return {
      setters: [module => {
        create$3 = module.a1;
        create$5 = module.aM;
        create$7 = module.aL;
        create$6 = module.a2;
        t = module.a0;
        useTranslation = module.ap;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        IonCard = module.aC;
        IonCardHeader = module.aD;
        IonCardTitle = module.aK;
        IonIcon = module.i;
        settingsOutline = module.aW;
        IonCardContent = module.aE;
        IonButton = module.h;
        saveOutline = module.s;
        IonSpinner = module.l;
        IonText = module.u;
      }, module => {
        FieldType = module.F;
        transformStandardResponseToCamelCase = module.t;
        useGetFeLocationQuery = module.p;
        activeLocation = module.h;
        preloadedLocationData = module.q;
        useFormWithSchema = module.n;
        useShowNotification = module.o;
        DynamicForm = module.D;
      }, module => {
        rzrApi = module.r;
        TagType = module.o;
      }, null, null],
      execute: function () {
        exports("default", LocationSettingsPage);
        const locationSettingsFormSchema = create$3().shape({
          locationSlug: create$6().required(t("Polje je obavezno")),
          timezone: create$6().required(t("Polje je obavezno")),
          autoConfirmReservations: create$7().required(),
          pauseBetweenReservations: create$5().min(0, t("Vrednost mora biti 0 ili veća")).max(120, t("Vrednost mora biti 120 ili manja")).required(t("Polje je obavezno"))
        });
        const getLocationSettingsFormFields = () => [{
          keyName: "timezone",
          name: "timezone",
          data: {
            type: FieldType.Select,
            label: t("Vremenska zona"),
            options: [{
              value: "Europe/Belgrade",
              text: "Europe/Belgrade (GMT+1)"
            }, {
              value: "Europe/London",
              text: "Europe/London (GMT+0)"
            }, {
              value: "Europe/Paris",
              text: "Europe/Paris (GMT+1)"
            }, {
              value: "Europe/Berlin",
              text: "Europe/Berlin (GMT+1)"
            }, {
              value: "Europe/Rome",
              text: "Europe/Rome (GMT+1)"
            }, {
              value: "Europe/Madrid",
              text: "Europe/Madrid (GMT+1)"
            }, {
              value: "America/New_York",
              text: "America/New_York (GMT-5)"
            }, {
              value: "America/Los_Angeles",
              text: "America/Los_Angeles (GMT-8)"
            }, {
              value: "Asia/Tokyo",
              text: "Asia/Tokyo (GMT+9)"
            }, {
              value: "Asia/Shanghai",
              text: "Asia/Shanghai (GMT+8)"
            }, {
              value: "Australia/Sydney",
              text: "Australia/Sydney (GMT+10)"
            }]
          },
          gridSize: {
            size: "12"
          }
        }, {
          keyName: "autoConfirmReservations",
          name: "autoConfirmReservations",
          data: {
            type: FieldType.Switch,
            label: t("Automatsko potvrđivanje rezervacija")
          },
          gridSize: {
            size: "12"
          }
        }, {
          keyName: "pauseBetweenReservations",
          name: "pauseBetweenReservations",
          data: {
            type: FieldType.Number,
            label: t("Pauza između rezervacija (minuti)")
          },
          gridSize: {
            size: "12"
          }
        }];
        const defaultLocationSettings = {
          timezone: "Europe/Belgrade",
          autoConfirmReservations: false,
          pauseBetweenReservations: 0
        };
        const locationSettingsApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            updateLocationSettings: builder.mutation({
              query: data => ({
                url: `locations/settings`,
                method: "PUT",
                body: data
              }),
              invalidatesTags: [TagType.LOCATION],
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useUpdateLocationSettingsMutation
        } = locationSettingsApi;
        function LocationSettingsPage({
          isModalOpen,
          setIsModalOpen
        }) {
          const {
            t
          } = useTranslation();
          const {
            goBack
          } = useIonRouter();
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          const currentSettings = locationData?.settings ?? defaultLocationSettings;
          const form = useFormWithSchema(locationSettingsFormSchema, {
            defaultValues: {
              locationSlug: activeLocation,
              timezone: currentSettings.timezone,
              autoConfirmReservations: currentSettings.autoConfirmReservations,
              pauseBetweenReservations: currentSettings.pauseBetweenReservations
            }
          });
          const [updateSettings, updateSettingsResponse] = useUpdateLocationSettingsMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Podešavanja su uspešno sačuvana"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju podešavanja"),
            color: "danger"
          });
          const formFields = getLocationSettingsFormFields();
          const handleSubmit = data => {
            updateSettings({
              locationSlug: data.locationSlug,
              timezone: data.timezone,
              autoConfirmReservations: data.autoConfirmReservations,
              pauseBetweenReservations: data.pauseBetweenReservations
            }).then(result => {
              if ("data" in result && result.data?.success) {
                goBack();
              }
            });
          };
          reactExports.useEffect(() => {
            if (updateSettingsResponse.isSuccess) {
              showSuccessNotification();
              setIsModalOpen(false);
            }
          }, [updateSettingsResponse.isSuccess]);
          reactExports.useEffect(() => {
            if (updateSettingsResponse.isError) {
              showErrorNotification();
            }
          }, [updateSettingsResponse.isError]);
          reactExports.useEffect(() => {
            if (currentSettings) {
              form.setValue("timezone", currentSettings.timezone);
              form.setValue("autoConfirmReservations", currentSettings.autoConfirmReservations);
              form.setValue("pauseBetweenReservations", currentSettings.pauseBetweenReservations);
            }
          }, [currentSettings, form]);
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "ion-padding",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: settingsOutline
                    }), t("Opšta podešavanja")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
                  onSubmit: form.handleSubmit(handleSubmit),
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                    fields: formFields,
                    form
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-padding-top",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      type: "submit",
                      expand: "block",
                      disabled: updateSettingsResponse.isLoading,
                      color: "success",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: saveOutline,
                        slot: "start"
                      }), updateSettingsResponse.isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                        name: "crescent"
                      }) : t("Sačuvaj podešavanja")]
                    })
                  }), updateSettingsResponse.isError && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-padding-top",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      color: "danger",
                      children: t("Greška pri čuvanju podešavanja")
                    })
                  })]
                })
              })]
            })
          });
        }
      }
    };
  });
})();
