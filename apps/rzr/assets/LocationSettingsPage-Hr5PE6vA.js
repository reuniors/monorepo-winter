import { a1 as create$3, aM as create$5, aL as create$7, a2 as create$6, a0 as t, ap as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-Dna2AK9N.js";
import { aj as useIonRouter, aC as IonCard, aD as IonCardHeader, aK as IonCardTitle, i as IonIcon, aW as settingsOutline, aE as IonCardContent, h as IonButton, s as saveOutline, l as IonSpinner, u as IonText } from "./vendor_ionic-DxRiTffW.js";
import { F as FieldType, t as transformStandardResponseToCamelCase, p as useGetFeLocationQuery, h as activeLocation, q as preloadedLocationData, n as useFormWithSchema, o as useShowNotification, D as DynamicForm } from "./App-D9vbFQN1.js";
import { r as rzrApi, o as TagType } from "./index-DWAtctn1.js";
import "./vendor_leaflet-DNRNsWmZ.js";
import "./vendor_firebase-BjBnt0gj.js";
const locationSettingsFormSchema = create$3().shape({
  locationSlug: create$6().required(t("Polje je obavezno")),
  timezone: create$6().required(t("Polje je obavezno")),
  autoConfirmReservations: create$7().required(),
  pauseBetweenReservations: create$5().min(0, t("Vrednost mora biti 0 ili veća")).max(120, t("Vrednost mora biti 120 ili manja")).required(t("Polje je obavezno"))
});
const getLocationSettingsFormFields = () => [
  {
    keyName: "timezone",
    name: "timezone",
    data: {
      type: FieldType.Select,
      label: t("Vremenska zona"),
      options: [
        { value: "Europe/Belgrade", text: "Europe/Belgrade (GMT+1)" },
        { value: "Europe/London", text: "Europe/London (GMT+0)" },
        { value: "Europe/Paris", text: "Europe/Paris (GMT+1)" },
        { value: "Europe/Berlin", text: "Europe/Berlin (GMT+1)" },
        { value: "Europe/Rome", text: "Europe/Rome (GMT+1)" },
        { value: "Europe/Madrid", text: "Europe/Madrid (GMT+1)" },
        { value: "America/New_York", text: "America/New_York (GMT-5)" },
        { value: "America/Los_Angeles", text: "America/Los_Angeles (GMT-8)" },
        { value: "Asia/Tokyo", text: "Asia/Tokyo (GMT+9)" },
        { value: "Asia/Shanghai", text: "Asia/Shanghai (GMT+8)" },
        { value: "Australia/Sydney", text: "Australia/Sydney (GMT+10)" }
      ]
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "autoConfirmReservations",
    name: "autoConfirmReservations",
    data: {
      type: FieldType.Switch,
      label: t("Automatsko potvrđivanje rezervacija")
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "pauseBetweenReservations",
    name: "pauseBetweenReservations",
    data: {
      type: FieldType.Number,
      label: t("Pauza između rezervacija (minuti)")
    },
    gridSize: { size: "12" }
  }
];
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
