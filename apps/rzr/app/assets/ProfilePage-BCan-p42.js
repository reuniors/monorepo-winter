import { e as reactExports, aD as useTranslation, j as jsxRuntimeExports, av as parseISO, ay as format } from "./vendor_react-DUHraSvm.js";
import { h as activeLocation, f as urlPrefix, b as useUser, a as useAppDispatch, o as useGetFeClientDataQuery, $ as useUpdateFeClientDataMutation, U as UserAvatar, C as ConditionalComponent } from "./App-3ar7Cq0a.js";
import { n as IonSpinner, aW as IonCard, aX as IonCardHeader, aY as IonCardTitle, aZ as IonCardContent, q as IonItem, l as IonIcon, ad as calendarOutline, E as IonLabel, c as IonText, b6 as checkmarkCircleOutline, bn as closeCircleOutline, ae as timeOutline, bv as walletOutline, d as IonButton, b7 as refreshOutline, aU as IonAccordionGroup, aV as IonAccordion, F as IonList, ah as mailOutline, bl as callOutline, aQ as personOutline, bz as pencilOutline } from "./vendor_ionic-COxsUFYm.js";
import { u as useClipboard, b as useGetClientProfilesQuery, C as ClientStatistics } from "./client-profile.fe-services-C9snqo9c.js";
import { C as ClientDataModal } from "./ClientDataModal-CD2cZdoZ.js";
import { a as useGetWorkerStatisticsQuery } from "./statistics.fe-services-BAlduTxf.js";
import { P as Pagination } from "./Pagination-D0n9Bkg1.js";
import { j as setShowLoginModal } from "./index-CiZrsLGn.js";
import "./vendor_leaflet-Lu2AnQEo.js";
import "./vendor_firebase-CC6UAdG5.js";
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
function Profile() {
  const { t } = useTranslation();
  const { userData, isOwnerOrWorker, isAdmin } = useUser();
  const dispatch = useAppDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
  const { data: clientData, isLoading } = useGetFeClientDataQuery();
  const [updateClient] = useUpdateFeClientDataMutation();
  if (!userData) {
    dispatch(setShowLoginModal(true));
    return null;
  }
  const handleEditSubmit = async (formData) => {
    await updateClient({
      fullName: formData.fullName || "",
      phoneNumber: formData.phoneNumber,
      dateOfBirth: formData.dateOfBirth || void 0
    });
    setIsEditModalOpen(false);
  };
  const handleCancel = reactExports.useCallback(() => {
    setIsEditModalOpen(false);
  }, []);
  const client = clientData == null ? void 0 : clientData.data;
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
