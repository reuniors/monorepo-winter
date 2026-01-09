import { a6 as create$3, aL as create$5, aM as create$7, a7 as create$6, a0 as t, a3 as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-CMjr4Gvv.js";
import { al as useIonRouter, a$ as IonCard, b1 as IonCardHeader, b2 as IonCardTitle, l as IonIcon, aL as settingsOutline, b0 as IonCardContent, d as IonButton, s as saveOutline, n as IonSpinner, c as IonText } from "./vendor_ionic-7y52xm55.js";
import { a as getLocationSettingsFormFields } from "./location-settings.data-s8TDFGNi.js";
import { t as rzrApi, v as TagType } from "./index-BRkPMoDf.js";
import { J as transformStandardResponseToCamelCase, m as useGetFeLocationQuery, n as activeLocation, p as preloadedLocationData, x as useFormWithSchema, K as useShowNotification, D as DynamicForm } from "./App-D-OkzpaC.js";
import "./vendor_leaflet-0lyiJUDC.js";
import "./vendor_firebase-BM_4Mc6z.js";
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
  endpoints: (builder) => ({
    updateLocationSettings: builder.mutation({
      query: (data) => ({
        url: "locations/settings",
        method: "PUT",
        body: data
      }),
      invalidatesTags: [TagType.LOCATION],
      transformResponse: transformStandardResponseToCamelCase
    })
  })
});
const { useUpdateLocationSettingsMutation } = locationSettingsApi;
function LocationSettingsPage({
  isModalOpen,
  setIsModalOpen
}) {
  var _a, _b, _c;
  const { t: t2 } = useTranslation();
  const { goBack } = useIonRouter();
  const { data: locationResponse } = useGetFeLocationQuery(
    {
      slug: activeLocation
    },
    { skip: !!((_a = preloadedLocationData) == null ? void 0 : _a.id) }
  );
  const locationData = (_b = preloadedLocationData) != null ? _b : locationResponse == null ? void 0 : locationResponse.data;
  const currentSettings = (_c = locationData == null ? void 0 : locationData.settings) != null ? _c : defaultLocationSettings;
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
    message: t2("Podešavanja su uspešno sačuvana"),
    color: "success"
  });
  const [showErrorNotification] = useShowNotification({
    message: t2("Greška pri čuvanju podešavanja"),
    color: "danger"
  });
  const formFields = getLocationSettingsFormFields();
  const handleSubmit = (data) => {
    updateSettings({
      locationSlug: data.locationSlug,
      timezone: data.timezone,
      autoConfirmReservations: data.autoConfirmReservations,
      pauseBetweenReservations: data.pauseBetweenReservations
    }).then((result) => {
      var _a2;
      if ("data" in result && ((_a2 = result.data) == null ? void 0 : _a2.success)) {
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
      form.setValue(
        "autoConfirmReservations",
        currentSettings.autoConfirmReservations
      );
      form.setValue(
        "pauseBetweenReservations",
        currentSettings.pauseBetweenReservations
      );
    }
  }, [currentSettings, form]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: settingsOutline }),
      t2("Opšta podešavanja")
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IonButton,
        {
          type: "submit",
          expand: "block",
          disabled: updateSettingsResponse.isLoading,
          color: "success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: saveOutline, slot: "start" }),
            updateSettingsResponse.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) : t2("Sačuvaj podešavanja")
          ]
        }
      ) }),
      updateSettingsResponse.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: t2("Greška pri čuvanju podešavanja") }) })
    ] }) })
  ] }) });
}
export {
  LocationSettingsPage as default
};
