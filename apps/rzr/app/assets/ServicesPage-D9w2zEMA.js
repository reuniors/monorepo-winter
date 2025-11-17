import { aC as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-CwmcyK5O.js";
import { aj as useIonRouter, l as IonSpinner, u as IonText, aC as IonCard, aD as IonCardHeader, aK as IonCardTitle, i as IonIcon, aZ as settingsOutline, aE as IonCardContent, E as IonList, o as IonItem, a6 as addOutline, D as IonLabel, a4 as IonReorderGroup, Y as IonReorder } from "./vendor_ionic-Bx5nIVFZ.js";
import { x as useGetFeServiceGroupsQuery, j as activeLocation, y as useUpdateServiceGroupMutation, z as ShowLoading, f as urlPrefix } from "./App-CqwiZh2J.js";
import "./vendor_leaflet-ibnEmoJR.js";
import "./index-DJI0-CdA.js";
import "./vendor_firebase-O9nGtifs.js";
function ServicesPage() {
  const { t } = useTranslation();
  const router = useIonRouter();
  const [sortMode, setSortMode] = reactExports.useState(false);
  const {
    data: serviceGroupsResponse,
    isLoading,
    error,
    refetch
  } = useGetFeServiceGroupsQuery({
    locationSlug: activeLocation
  });
  const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
  const serviceGroups = (serviceGroupsResponse == null ? void 0 : serviceGroupsResponse.data) || [];
  const serviceGroupsSorted = [...serviceGroups].sort((a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (a.sortOrder > b.sortOrder) return 1;
    return 0;
  });
  const handleServiceGroupClick = (serviceGroupId) => {
    router.push("".concat(urlPrefix, "/podesavanja/usluge/groups/").concat(serviceGroupId));
  };
  const handleReorder = (event) => {
    const serviceGroupFrom = serviceGroupsSorted[event.detail.from];
    const serviceGroupTo = serviceGroupsSorted[event.detail.to];
    updateServiceGroup({
      ...serviceGroupFrom,
      sortOrder: serviceGroupTo.sortOrder
    }).then(() => {
      refetch();
      event.detail.complete();
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-text-center ion-padding", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Učitavanje...") })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: t("Greška pri učitavanju usluga") }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowLoading, { message: updateServiceGroupResponse.isLoading }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: settingsOutline }),
        t("Usluge")
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            button: true,
            routerLink: "".concat(urlPrefix, "/podesavanja/usluge/novo"),
            color: "primary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Nova grupa") })
            ]
          }
        ),
        serviceGroupsSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding ion-text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema usluga za prikaz") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonReorderGroup,
          {
            disabled: !sortMode,
            onIonItemReorder: handleReorder,
            children: serviceGroupsSorted.map(
              (serviceGroup) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                IonItem,
                {
                  button: !sortMode,
                  onClick: !sortMode ? () => handleServiceGroupClick(serviceGroup.id) : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: serviceGroup.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: serviceGroup.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonText, { color: "medium", children: [
                        t("Usluga"),
                        ": ",
                        serviceGroup.services.length
                      ] }) })
                    ] }),
                    sortMode && /* @__PURE__ */ jsxRuntimeExports.jsx(IonReorder, { slot: "end" })
                  ]
                },
                serviceGroup.id
              )
            )
          }
        ) })
      ] }) })
    ] })
  ] });
}
export {
  ServicesPage as default
};
