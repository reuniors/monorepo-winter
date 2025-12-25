import { e as reactExports, aD as useTranslation, j as jsxRuntimeExports, av as parseISO, ay as format } from "./vendor_react-CCLq7r1n.js";
import { U as UserAvatar } from "./UserAvatar-CW0kxEjH.js";
import { n as IonSpinner, a_ as IonCard, b0 as IonCardHeader, b1 as IonCardTitle, a$ as IonCardContent, q as IonItem, l as IonIcon, ad as calendarOutline, E as IonLabel, c as IonText, b2 as checkmarkCircleOutline, bv as closeCircleOutline, ae as timeOutline, bA as walletOutline, d as IonButton, ak as refreshOutline, bh as IonAccordionGroup, bi as IonAccordion, F as IonList, ah as mailOutline, bt as callOutline, aX as personOutline, ac as IonToggle, w as IonSelect, x as IonSelectOption, M as useIonAlert, a9 as useIonToast, bH as pencilOutline } from "./vendor_ionic-CVwFN5FQ.js";
import { u as useClipboard, b as useGetClientProfilesQuery, C as ClientStatistics } from "./client-profile.fe-services-6kijfYTr.js";
import { u as useGetFeClientDataQuery, b as useUpdateFeClientDataMutation } from "./client.services-BiY-JYai.js";
import { k as activeLocation, f as urlPrefix, b as useUser, a as useAppDispatch, c as useAppSelector, d as useRemoveConnectedDeviceMutation, a8 as useDeviceNotification, i as isPwa, a9 as isInstalled, aa as isWebView, C as ConditionalComponent } from "./App-BtUhbQB_.js";
import { C as ClientDataModal } from "./ClientDataModal-B7mKpMQL.js";
import { a as useGetWorkerStatisticsQuery } from "./statistics.fe-services-BbiMEVm3.js";
import { P as Pagination } from "./Pagination-Cm9Uh2gA.js";
import { m as getDeviceData, l as setShowLoginModal, u as getSavedTheme, n as setDeviceData, x as saveTheme, v as applyTheme } from "./index-C-L2pUlb.js";
import "./vendor_leaflet-Dv5yPm6v.js";
import "./vendor_firebase-DAp4wSRa.js";
const formatDate = (dateString) => {
  if (!dateString) return null;
  try {
    const date = parseISO(dateString);
    return format(date, "dd.MM.yyyy HH:mm");
  } catch (e) {
    return dateString;
  }
};
const formatPrice = (price) => {
  return new Intl.NumberFormat("sr-RS").format(price);
};
function WorkerStatistics({
  workerId,
  locationSlug
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [forceUpdate, setForceUpdate] = reactExports.useState(0);
  const { t } = useTranslation();
  const { data, isLoading } = useGetWorkerStatisticsQuery({
    workerId,
    locationSlug,
    forceUpdate
  });
  const handleForceRefresh = reactExports.useCallback(() => {
    setForceUpdate((prev) => prev + 1);
  }, []);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: t("N/A") });
  const formattedLastVisit = formatDate((_b = (_a = data.data) == null ? void 0 : _a.data) == null ? void 0 : _b.lastVisit);
  const formattedCostSum = formatPrice(((_d = (_c = data.data) == null ? void 0 : _c.data) == null ? void 0 : _d.costSum) || 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-left", children: t("Statistika radnika") }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Ukupno rezervacija"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_f = (_e = data.data) == null ? void 0 : _e.data) == null ? void 0 : _f.totalReservations) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: checkmarkCircleOutline, slot: "start", color: "success" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Potvrđene rezervacije"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "success", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_h = (_g = data.data) == null ? void 0 : _g.data) == null ? void 0 : _h.confirmedReservationsCount) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeCircleOutline, slot: "start", color: "danger" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Otkazane rezervacije"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ((_j = (_i = data.data) == null ? void 0 : _i.data) == null ? void 0 : _j.canceledReservationsCount) || 0 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Poslednja usluga"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formattedLastVisit || t("N/A") }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: walletOutline, slot: "start" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Ukupan iznos korišćenih usluga"),
          ":",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "primary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            formattedCostSum,
            " RSD"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { fill: "clear", onClick: handleForceRefresh, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: refreshOutline, slot: "start" }),
        t("Osveži")
      ] }) })
    ] })
  ] });
}
const ITEMS_PER_PAGE = 10;
function ClientProfilesList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const { setValue: copyToClipboard } = useClipboard();
  const { data, isLoading } = useGetClientProfilesQuery({
    locationSlug: activeLocation,
    page: currentPage,
    perPage: ITEMS_PER_PAGE
  });
  const handleEmailClick = (email) => {
    if (email) {
      copyToClipboard(email);
    }
  };
  const handlePhoneClick = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = "tel:".concat(phoneNumber);
    }
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  if (!(data == null ? void 0 : data.data)) return null;
  const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: t("Lista klijenata") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonAccordionGroup, { children: data.data.map((client) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonAccordion, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { slot: "header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: client.fullName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ion-text-end flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, className: "mr-1" }),
              client.confirmedReservationsCount
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { slot: "content", className: "ion-padding", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              IonItem,
              {
                lines: "none",
                button: !!(client.email || ((_a = client.user) == null ? void 0 : _a.email)),
                onClick: () => {
                  var _a2;
                  return handleEmailClick(client.email || ((_a2 = client.user) == null ? void 0 : _a2.email) || "");
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: mailOutline, slot: "start" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: client.email || ((_b = client.user) == null ? void 0 : _b.email) || t("Nije uneto") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              IonItem,
              {
                lines: "none",
                button: !!client.phoneNumber,
                onClick: () => handlePhoneClick(client.phoneNumber || ""),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: callOutline, slot: "start" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: client.phoneNumber || t("Nije uneto") })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              IonButton,
              {
                fill: "clear",
                routerLink: "".concat(urlPrefix, "/public-profile/").concat(client.id),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: personOutline, slot: "start" }),
                  t("Profil")
                ]
              }
            ) })
          ] })
        ] }, client.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          currentPage,
          totalPages,
          onPageChange: setCurrentPage,
          isLoading,
          className: "ion-padding-top"
        }
      )
    ] })
  ] });
}
function ClientSettingsCard({
  canUsePushOnThisDevice,
  notificationsEnabled,
  notificationsDisabled = false,
  themeMode,
  remindersEnabled,
  onPushToggle,
  onThemeChange,
  onRemindersToggle
}) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { className: "mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: t("Podešavanja") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "ion-no-padding", children: [
      canUsePushOnThisDevice && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Push notifikacije") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonToggle,
          {
            checked: notificationsEnabled,
            disabled: notificationsDisabled,
            onIonChange: (e) => onPushToggle(!!e.detail.checked)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Tema") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonSelect,
          {
            value: themeMode === null ? "system" : themeMode,
            onIonChange: (e) => onThemeChange(
              e.detail.value === "system" ? "system" : e.detail.value
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "light", children: t("Svetla") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "dark", children: t("Tamna") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: "system", children: t("Sistem") })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Podsetnik za rezervacije") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonToggle,
          {
            checked: remindersEnabled,
            onIonChange: (e) => onRemindersToggle(!!e.detail.checked)
          }
        )
      ] })
    ] })
  ] });
}
function Profile() {
  const { t } = useTranslation();
  const { userData, isOwnerOrWorker, isAdmin } = useUser();
  const dispatch = useAppDispatch();
  const deviceData = useAppSelector(getDeviceData);
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const [remindersEnabled, setRemindersEnabled] = reactExports.useState(false);
  const [themeMode, setThemeModeState] = reactExports.useState(null);
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const { data: clientData, isLoading } = useGetFeClientDataQuery();
  const [updateClient] = useUpdateFeClientDataMutation();
  const [removeConnectedDevice] = useRemoveConnectedDeviceMutation();
  const [isRequestingPermission, setIsRequestingPermission] = reactExports.useState(false);
  const deviceNotification = useDeviceNotification({
    onConnected: () => {
    },
    // Not used in Profile component
    connectDeviceInit: false
    // Don't auto-connect here
  });
  if (!userData) {
    dispatch(setShowLoginModal(true));
    return null;
  }
  const handleEditSubmit = reactExports.useCallback(
    async (formData) => {
      await updateClient({
        fullName: formData.fullName || "",
        phoneNumber: formData.phoneNumber,
        dateOfBirth: formData.dateOfBirth || void 0
      });
      setIsEditModalOpen(false);
    },
    [updateClient]
  );
  const handleCancel = reactExports.useCallback(() => {
    setIsEditModalOpen(false);
  }, []);
  const client = clientData == null ? void 0 : clientData.data;
  const canUsePushOnThisDevice = isPwa || isInstalled || isWebView;
  reactExports.useEffect(() => {
    setThemeModeState(getSavedTheme());
  }, []);
  const handleThemeChange = (value) => {
    const newTheme = value === "system" ? null : value;
    saveTheme(newTheme);
    applyTheme(newTheme);
    setThemeModeState(newTheme);
  };
  const handlePushToggle = reactExports.useCallback(
    async (enabled) => {
      var _a;
      dispatch(setDeviceData({ notificationsEnabled: enabled }));
      if (!enabled) {
        if (deviceData.notificationsToken) {
          try {
            await removeConnectedDevice({
              token: deviceData.notificationsToken,
              locationSlug: activeLocation || void 0
            }).unwrap();
          } catch (error) {
            console.error("Error removing connected device:", error);
          }
        }
        dispatch(setDeviceData({ notificationsToken: void 0 }));
        return;
      }
      const permissionStatus = (_a = deviceNotification == null ? void 0 : deviceNotification.getNotificationPermissionStatus) == null ? void 0 : _a.call(deviceNotification);
      if (permissionStatus === "denied") {
        presentAlert({
          header: t("Dozvola za notifikacije je blokirana"),
          message: t(
            'Dozvola za notifikacije je blokirana u browseru. Da biste je omogućili:\n\n1. Otvorite podešavanja browsera\n2. Idite na "Site Settings" ili "Podešavanja sajta"\n3. Pronađite ovu aplikaciju\n4. Promenite "Notifications" sa "Block" na "Allow"\n\nIli resetujte dozvole za ovaj sajt u browser podešavanjima.'
          ),
          buttons: [
            {
              text: t("Razumem"),
              role: "cancel"
            }
          ]
        });
        dispatch(setDeviceData({ notificationsEnabled: false }));
        return;
      }
      if (!(deviceNotification == null ? void 0 : deviceNotification.requestNotificationPermission)) {
        console.warn("Notification permission request not available");
        return;
      }
      setIsRequestingPermission(true);
      try {
        const permissionGranted = await deviceNotification.requestNotificationPermission();
        if (!permissionGranted) {
          dispatch(setDeviceData({ notificationsEnabled: false }));
        }
      } catch (error) {
        if (error instanceof Error && error.name === "NotificationPermissionBlocked") {
          presentAlert({
            header: t("Dozvola za notifikacije je blokirana"),
            message: t(
              'Dozvola za notifikacije je blokirana u browseru. Da biste je omogućili:\n\n1. Otvorite podešavanja browsera\n2. Idite na "Site Settings" ili "Podešavanja sajta"\n3. Pronađite ovu aplikaciju\n4. Promenite "Notifications" sa "Block" na "Allow"\n\nIli resetujte dozvole za ovaj sajt u browser podešavanjima.'
            ),
            buttons: [
              {
                text: t("Razumem"),
                role: "cancel"
              }
            ]
          });
        } else {
          console.error("Error requesting notification permission:", error);
          presentToast({
            message: t("Greška pri traženju dozvole za notifikacije"),
            duration: 3e3,
            color: "danger"
          });
        }
        dispatch(setDeviceData({ notificationsEnabled: false }));
      } finally {
        setIsRequestingPermission(false);
      }
    },
    [
      deviceNotification,
      dispatch,
      presentAlert,
      presentToast,
      removeConnectedDevice,
      deviceData.notificationsToken,
      activeLocation,
      t
    ]
  );
  const handleRemindersToggle = (enabled) => {
    setRemindersEnabled(enabled);
  };
  reactExports.useEffect(() => {
    var _a;
    if (isLoading) {
      return;
    }
    if (!client || ((_a = client.phoneNumber) == null ? void 0 : _a.length) === 0) {
      setIsEditModalOpen(true);
    }
  }, [clientData == null ? void 0 : clientData.data, client == null ? void 0 : client.phoneNumber, isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { className: "ion-text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { className: "ion-padding-top flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding-left flex items-center", children: [
          (client == null ? void 0 : client.fullName) && /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { fullName: client.fullName, size: 30 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-left ml-2", children: (client == null ? void 0 : client.fullName) || t("Nije uneto") })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: mailOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: userData.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: callOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: (client == null ? void 0 : client.phoneNumber) || t("Nije uneto") })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: (client == null ? void 0 : client.dateOfBirth) || t("Nije unet datum rođenja") })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { onClick: () => setIsEditModalOpen(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: pencilOutline, slot: "start" }),
            t("Uredi profil")
          ] }) })
        ] })
      ] }),
      client && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ClientSettingsCard,
        {
          canUsePushOnThisDevice,
          notificationsEnabled: deviceData.notificationsEnabled === true,
          notificationsDisabled: isRequestingPermission,
          themeMode,
          remindersEnabled,
          onPushToggle: handlePushToggle,
          onThemeChange: handleThemeChange,
          onRemindersToggle: handleRemindersToggle
        }
      ),
      activeLocation && client && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConditionalComponent,
        {
          condition: isOwnerOrWorker != null ? isOwnerOrWorker : false,
          render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkerStatistics,
            {
              workerId: userData.id || 0,
              locationSlug: activeLocation
            }
          ),
          renderElse: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClientStatistics,
            {
              clientId: client.id || 0,
              locationSlug: activeLocation
            }
          )
        }
      ),
      (isOwnerOrWorker || isAdmin) && /* @__PURE__ */ jsxRuntimeExports.jsx(ClientProfilesList, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClientDataModal,
      {
        isOpen: isEditModalOpen,
        onCancel: handleCancel,
        onSave: handleEditSubmit,
        initialData: client
      }
    )
  ] });
}
function ProfilePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {}) });
}
export {
  ProfilePage as default
};
