;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './location-settings.data-legacy-Bp9nXW_D.js', './index-legacy-Cdf7FWKJ.js', './App-legacy-OqtQecgU.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var create$3, create$5, create$7, create$6, t, useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, settingsOutline, IonCardContent, IonButton, saveOutline, IonSpinner, IonText, getLocationSettingsFormFields, rzrApi, TagType, transformStandardResponseToCamelCase, useGetFeLocationQuery, activeLocation, preloadedLocationData, useFormWithSchema, useShowNotification, DynamicForm;
    return {
      setters: [module => {
        create$3 = module.a7;
        create$5 = module.aL;
        create$7 = module.aM;
        create$6 = module.a8;
        t = module.a2;
        useTranslation = module.M;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.ao;
        IonCard = module.b2;
        IonCardHeader = module.b4;
        IonCardTitle = module.b5;
        IonIcon = module.b;
        settingsOutline = module.aO;
        IonCardContent = module.b3;
        IonButton = module.d;
        saveOutline = module.s;
        IonSpinner = module.o;
        IonText = module.m;
      }, module => {
        getLocationSettingsFormFields = module.a;
      }, module => {
        rzrApi = module.t;
        TagType = module.v;
      }, module => {
        transformStandardResponseToCamelCase = module.H;
        useGetFeLocationQuery = module.m;
        activeLocation = module.n;
        preloadedLocationData = module.p;
        useFormWithSchema = module.x;
        useShowNotification = module.J;
        DynamicForm = module.D;
      }, null, null],
      execute: function () {
        exports("default", LocationSettingsPage);
        const locationSettingsPageFormSchema = create$3().shape({
          locationSlug: create$6().required(t("Polje je obavezno")),
          timezone: create$6().required(t("Vremenska zona je obavezna")),
          autoConfirmReservations: create$7().required(),
          pauseBetweenReservations: create$5().required()
        });
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
          const form = useFormWithSchema(locationSettingsPageFormSchema, {
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
