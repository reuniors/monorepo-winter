import { aD as useTranslation, aK as useParams, j as jsxRuntimeExports } from "./vendor_react-BF1Ucyx8.js";
import { aX as IonCard, aY as IonCardContent, n as IonSpinner, aZ as IonCardHeader, a_ as IonCardTitle, F as IonList, q as IonItem, l as IonIcon, ah as mailOutline, E as IonLabel, bq as callOutline, ad as calendarOutline, aT as personOutline } from "./vendor_ionic-BiOFnPTY.js";
import { U as UserAvatar } from "./UserAvatar-DUegii-o.js";
import { u as useClipboard, a as useGetWorkerClientDataQuery, C as ClientStatistics } from "./client-profile.fe-services-nJDPjWLT.js";
import { b as useUser, q as useIsBigScreen, k as activeLocation, C as ConditionalComponent } from "./App-B7xuFYaY.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./statistics.fe-services-ChzKi-Pg.js";
import "./index-iCDvuKZG.js";
import "./vendor_firebase-Z856UVCm.js";
function PublicProfilePage() {
  var _a, _b;
  const { t } = useTranslation();
  const { clientId } = useParams();
  const { isOwnerOrWorker, isAdmin } = useUser();
  const { setValue: copyToClipboard } = useClipboard();
  const isBigScreen = useIsBigScreen();
  if (!isOwnerOrWorker && !isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center", children: t("Nemate dozvolu za pristup ovoj stranici") }) }) }) });
  }
  const { data, isLoading, error } = useGetWorkerClientDataQuery({
    clientId
  });
  const handleEmailClick = (email) => {
    if (email && isBigScreen) {
      copyToClipboard(email);
    } else {
      window.open("mailto:".concat(email), "_blank");
    }
  };
  const handlePhoneClick = (phoneNumber) => {
    if (phoneNumber) {
      window.location.href = "tel:".concat(phoneNumber);
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  }
  if (error || !(data == null ? void 0 : data.data)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center", children: t("Profil nije pronađen") }) }) }) });
  }
  console.log(data, "data");
  const client = data.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { className: "ion-text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { className: "ion-padding-top flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding-left flex items-center", children: [
        client.fullName && /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { fullName: client.fullName, size: 30 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-left ml-2", children: client.fullName || t("Nije uneto") })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            lines: "none",
            button: !!((_a = client.user) == null ? void 0 : _a.email),
            onClick: () => {
              var _a2;
              return handleEmailClick(((_a2 = client.user) == null ? void 0 : _a2.email) || "");
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: mailOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: ((_b = client.user) == null ? void 0 : _b.email) || t("Nije uneto") })
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: client.dateOfBirth || t("Nije unet datum rođenja") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { lines: "none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: personOutline, slot: "start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
            t("ID klijenta"),
            ": ",
            client.id
          ] })
        ] })
      ] }) })
    ] }),
    activeLocation && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConditionalComponent,
      {
        condition: isOwnerOrWorker != null ? isOwnerOrWorker : false,
        render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ClientStatistics,
          {
            clientId: client.id || 0,
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
    )
  ] });
}
export {
  PublicProfilePage as default
};
