import { j as jsxRuntimeExports, ay as format, av as parseISO, Z as useForm, a3 as Controller, aD as useTranslation, e as reactExports } from "./vendor_react-BF1Ucyx8.js";
import { bB as globeOutline, ap as logoAndroid, ao as logoApple, aX as IonCard, aY as IonCardContent, l as IonIcon, bc as checkmarkCircle, b0 as IonBadge, q as IonItem, E as IonLabel, r as IonInput, aa as IonTextarea, w as IonSelect, x as IonSelectOption, a9 as useIonToast, n as IonSpinner, c as IonText, aZ as IonCardHeader, a_ as IonCardTitle, d as IonButton, bC as send } from "./vendor_ionic-BiOFnPTY.js";
import { k as activeLocation } from "./App-6W6KSFDi.js";
import { a as useGetUserConnectedDevicesQuery, b as useSendTestNotificationMutation } from "./test-notification.services-DzLgCPUO.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./index-BwTcFpeZ.js";
import "./vendor_firebase-Z856UVCm.js";
const platformIcons = {
  ios: logoApple,
  android: logoAndroid,
  web: globeOutline
};
const platformNames = {
  ios: "iOS",
  android: "Android",
  web: "Web"
};
function DeviceCard({ device, isSelected, onSelect }) {
  const platformIcon = platformIcons[device.platform] || globeOutline;
  const platformName = platformNames[device.platform] || "Unknown";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    IonCard,
    {
      button: true,
      onClick: onSelect,
      className: "m-0 relative ".concat(isSelected ? "border-2 border-green-500 bg-green-500/10" : "border border-gray-300 dark:border-gray-700"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "p-4", children: [
        isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonIcon,
          {
            icon: checkmarkCircle,
            className: "absolute top-2 right-2 text-2xl text-green-500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center ".concat(isSelected ? "bg-green-500/20" : "bg-gray-200 dark:bg-gray-700"),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonIcon,
              {
                icon: platformIcon,
                className: "text-3xl text-gray-700 dark:text-gray-300"
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-center mb-2 line-clamp-2", children: device.deviceName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonBadge, { color: "primary", className: "text-xs", children: platformName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 mt-3 text-xs text-gray-600 dark:text-gray-400", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-2 h-2 rounded-full ".concat(device.isActive ? "bg-green-500" : "bg-gray-400")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: device.isActive ? "Aktivan" : "Neaktivan" })
          ] }),
          device.lastUsedAt && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: format(parseISO(device.lastUsedAt), "dd.MM.yyyy HH:mm") })
        ] })
      ] })
    }
  );
}
function NotificationForm({
  formRef,
  onSubmit,
  isSubmitting
}) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
      type: "info",
      level: 1,
      data: ""
    }
  });
  const onSubmitForm = (formData) => {
    let parsedData;
    if (formData.data && formData.data.trim()) {
      try {
        parsedData = JSON.parse(formData.data);
      } catch (error) {
        alert("Invalid JSON format in Data field");
        return;
      }
    }
    onSubmit({
      title: formData.title,
      body: formData.body,
      type: formData.type,
      level: formData.level,
      data: parsedData
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      ref: formRef,
      onSubmit: handleSubmit(onSubmitForm),
      className: "space-y-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { position: "stacked", children: [
            "Naslov ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controller,
            {
              name: "title",
              control,
              rules: { required: "Naslov je obavezan" },
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonInput,
                {
                  ...field,
                  placeholder: "Unesite naslov notifikacije",
                  disabled: isSubmitting,
                  onIonInput: (e) => field.onChange(e.detail.value)
                }
              )
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.title.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { position: "stacked", children: [
            "Tekst ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controller,
            {
              name: "body",
              control,
              rules: { required: "Tekst je obavezan" },
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonTextarea,
                {
                  ...field,
                  placeholder: "Unesite tekst notifikacije",
                  rows: 4,
                  disabled: isSubmitting,
                  onIonInput: (e) => field.onChange(e.detail.value)
                }
              )
            }
          ),
          errors.body && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.body.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { position: "stacked", children: "Tip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controller,
            {
              name: "type",
              control,
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                IonSelect,
                {
                  ...field,
                  placeholder: "Izaberite tip",
                  disabled: isSubmitting,
                  onIonChange: (e) => field.onChange(e.detail.value),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "info", children: "Info" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "success", children: "Success" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "warning", children: "Warning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "error", children: "Error" })
                  ]
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { position: "stacked", children: "Nivo (1-5)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controller,
            {
              name: "level",
              control,
              rules: {
                min: { value: 1, message: "Minimum je 1" },
                max: { value: 5, message: "Maksimum je 5" }
              },
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonInput,
                {
                  ...field,
                  type: "number",
                  min: 1,
                  max: 5,
                  placeholder: "1",
                  disabled: isSubmitting,
                  onIonInput: (e) => field.onChange(Number(e.detail.value))
                }
              )
            }
          ),
          errors.level && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.level.message })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { position: "stacked", children: "Data (JSON, opciono)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Controller,
            {
              name: "data",
              control,
              render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonTextarea,
                {
                  ...field,
                  placeholder: '{"key": "value"}',
                  rows: 3,
                  disabled: isSubmitting,
                  onIonInput: (e) => field.onChange(e.detail.value)
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-1", children: "Opciono: dodatni podaci u JSON formatu" })
        ] })
      ]
    }
  );
}
function UserDevicesPage({
  match
}) {
  const { t } = useTranslation();
  const [presentToast] = useIonToast();
  const userId = parseInt(match.params.userId, 10);
  const [selectedDevice, setSelectedDevice] = reactExports.useState(
    null
  );
  const formRef = reactExports.useRef(null);
  const { data, isLoading, error } = useGetUserConnectedDevicesQuery({
    locationSlug: activeLocation,
    userId
  });
  const [sendNotification, { isLoading: isSending }] = useSendTestNotificationMutation();
  const handleDeviceSelect = (device) => {
    setSelectedDevice(device.id === (selectedDevice == null ? void 0 : selectedDevice.id) ? null : device);
  };
  const handleSendNotification = async (formData) => {
    var _a;
    if (!selectedDevice) {
      presentToast({
        message: t("Molimo izaberite uređaj"),
        duration: 3e3,
        color: "warning"
      });
      return;
    }
    try {
      const result = await sendNotification({
        locationSlug: activeLocation,
        deviceId: selectedDevice.deviceId,
        ...formData
      }).unwrap();
      if (result.success) {
        presentToast({
          message: t("Notifikacija uspešno poslata!"),
          duration: 3e3,
          color: "success"
        });
      }
    } catch (err) {
      presentToast({
        message: ((_a = err == null ? void 0 : err.data) == null ? void 0 : _a.message) || t("Greška pri slanju notifikacije"),
        duration: 3e3,
        color: "danger"
      });
    }
  };
  const handleSubmitClick = () => {
    if (formRef.current) {
      const submitEvent = new Event("submit", {
        bubbles: true,
        cancelable: true
      });
      formRef.current.dispatchEvent(submitEvent);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Greška pri učitavanju uređaja") }) }) }),
    !isLoading && !error && (data == null ? void 0 : data.data) && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { className: "mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: data.data.user.fullName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
          data.data.user.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
            "Email: ",
            data.data.user.email
          ] }),
          data.data.user.phoneNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
            "Telefon: ",
            data.data.user.phoneNumber
          ] })
        ] })
      ] }),
      data.data.devices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Korisnik nema povezanih uređaja") }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold mb-4", children: t("Izaberite uređaj") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6", children: data.data.devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeviceCard,
          {
            device,
            isSelected: (selectedDevice == null ? void 0 : selectedDevice.id) === device.id,
            onSelect: () => handleDeviceSelect(device)
          },
          device.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: t("Kreiraj notifikaciju") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NotificationForm,
              {
                formRef,
                onSubmit: handleSendNotification,
                isSubmitting: isSending
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonButton,
              {
                expand: "block",
                color: "primary",
                size: "large",
                disabled: !selectedDevice || isSending,
                onClick: handleSubmitClick,
                children: isSending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { slot: "start" }),
                  t("Slanje...")
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: send, slot: "start" }),
                  t("Pošalji notifikaciju")
                ] })
              }
            ) })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  UserDevicesPage as default
};
