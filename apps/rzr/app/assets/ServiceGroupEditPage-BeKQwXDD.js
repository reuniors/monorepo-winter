import { aC as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-CwmcyK5O.js";
import { aj as useIonRouter, aC as IonCard, aD as IonCardHeader, aK as IonCardTitle, i as IonIcon, a$ as createOutline, aE as IonCardContent, aP as IonAccordionGroup, aQ as IonAccordion, o as IonItem, D as IonLabel, a1 as constructOutline, E as IonList, a6 as addOutline, u as IonText, a4 as IonReorderGroup, Y as IonReorder } from "./vendor_ionic-Bx5nIVFZ.js";
import { w as useGetFeServiceGroupsQuery, h as activeLocation, z as useUpdateServiceMutation, x as useUpdateServiceGroupMutation, y as ShowLoading, A as ServiceGroupEditForm, e as urlPrefix } from "./App-DPiy04Om.js";
import "./vendor_leaflet-ibnEmoJR.js";
import "./index-BxZPnDwj.js";
import "./vendor_firebase-O9nGtifs.js";
function ServiceGroupEditPage({
  serviceGroupId
}) {
  var _a;
  const { t } = useTranslation();
  const router = useIonRouter();
  const {
    data: serviceGroupsResponse,
    isLoading,
    error,
    refetch
  } = useGetFeServiceGroupsQuery({
    locationSlug: activeLocation
  });
  const [updateService, updateServiceResponse] = useUpdateServiceMutation();
  const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
  const serviceGroup = serviceGroupsResponse == null ? void 0 : serviceGroupsResponse.data.find(
    (sg) => sg.id === serviceGroupId
  );
  const handleServiceClick = (serviceId) => {
    router.push("".concat(urlPrefix, "/podesavanja/usluge/services/").concat(serviceId));
  };
  const [sortMode, setSortMode] = reactExports.useState(false);
  const servicesSorted = [...(_a = serviceGroup == null ? void 0 : serviceGroup.services) != null ? _a : []].sort((a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (a.sortOrder > b.sortOrder) return 1;
    return 0;
  });
  const handleReorder = (event) => {
    const serviceFrom = servicesSorted[event.detail.from];
    const serviceTo = servicesSorted[event.detail.to];
    updateService({
      ...serviceFrom,
      sortOrder: serviceTo.sortOrder
    }).then(() => {
      refetch();
      event.detail.complete();
    });
    event.detail.complete();
  };
  const handleSubmit = (data) => {
    updateServiceGroup({
      ...data,
      id: serviceGroupId
    }).then((response) => {
      if ("data" in response) {
        router.goBack();
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowLoading, { message: updateServiceResponse.isLoading }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: createOutline }),
        t("Izmeni grupu usluga")
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonAccordionGroup, { children: serviceGroup && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonAccordion, { value: "edit-data", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { slot: "header", color: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          t("Editovanje podataka o grupi"),
          " - ",
          serviceGroup == null ? void 0 : serviceGroup.title
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { slot: "content", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ServiceGroupEditForm,
          {
            serviceGroup,
            onSubmit: handleSubmit
          }
        ) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: constructOutline }),
        t("Usluge u grupi")
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            button: true,
            color: "primary",
            routerLink: serviceGroup ? "".concat(urlPrefix, "/podesavanja/usluge/services/novo/").concat(serviceGroup.id) : void 0,
            disabled: !serviceGroup,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Nova usluga") })
            ]
          }
        ),
        servicesSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding ion-text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema usluga u ovoj grupi") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonReorderGroup,
          {
            disabled: !sortMode,
            onIonItemReorder: handleReorder,
            children: servicesSorted.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              IonItem,
              {
                button: !sortMode,
                onClick: !sortMode ? () => handleServiceClick(service.id) : void 0,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: service.title }),
                    service.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 mt-1 truncate", children: service.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: service.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: service.price }) })
                  ] }),
                  sortMode && /* @__PURE__ */ jsxRuntimeExports.jsx(IonReorder, { slot: "end" })
                ]
              },
              service.id
            ))
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ServiceGroupEditPage as default
};
