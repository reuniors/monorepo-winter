import { ai as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-BVRDO8z9.js";
import { al as useIonRouter, n as IonSpinner, c as IonText, a_ as IonCard, a$ as IonCardContent, q as IonItem, E as IonLabel, w as IonSelect, x as IonSelectOption, b0 as IonCardHeader, b1 as IonCardTitle, l as IonIcon, a2 as constructOutline, d as IonButton, a6 as addOutline, bh as IonAccordionGroup, bi as IonAccordion, F as IonList, aI as createOutline } from "./vendor_ionic-CnFg9owC.js";
import { w as useGetFeLocationQuery, k as activeLocation, p as preloadedLocationData, x as useGetFeServiceCategoriesQuery, y as useGetFeServiceGroupsQuery, f as urlPrefix } from "./App-Bv-Um4fR.js";
import { S as ServiceGroupCreateModal } from "./ServiceGroupCreateModal-DINUS6EJ.js";
import "./vendor_leaflet-BdieFp9x.js";
import "./index-Ied8tlTH.js";
import "./vendor_firebase-DKsXaMug.js";
import "./ServiceGroupBasicInfoStep-B3pZrJQq.js";
function ServicesPage() {
  var _a, _b;
  const { t } = useTranslation();
  const router = useIonRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
  const [selectedActivity, setSelectedActivity] = reactExports.useState(null);
  const { data: locationResponse } = useGetFeLocationQuery(
    {
      slug: activeLocation
    },
    { skip: !!((_a = preloadedLocationData) == null ? void 0 : _a.id) }
  );
  const locationData = (_b = preloadedLocationData) != null ? _b : locationResponse == null ? void 0 : locationResponse.data;
  const hasMultipleActivities = (locationData == null ? void 0 : locationData.hasMultipleActivities) === true;
  const { data: categoriesResult } = useGetFeServiceCategoriesQuery(
    {
      locationSlug: activeLocation,
      active: true
    },
    { skip: !hasMultipleActivities }
  );
  const categories = (categoriesResult == null ? void 0 : categoriesResult.data) || (locationData == null ? void 0 : locationData.serviceCategories) || [];
  const {
    data: serviceGroupsResponse,
    isLoading,
    error
  } = useGetFeServiceGroupsQuery({
    locationSlug: activeLocation
  });
  const serviceGroups = (serviceGroupsResponse == null ? void 0 : serviceGroupsResponse.data) || [];
  const filteredServiceGroups = reactExports.useMemo(() => {
    if (!hasMultipleActivities || !selectedActivity) {
      return serviceGroups;
    }
    return serviceGroups.filter((group) => {
      var _a2, _b2;
      return (_b2 = (_a2 = group.serviceCategories) == null ? void 0 : _a2.some(
        (cat) => cat.id === selectedActivity.id
      )) != null ? _b2 : false;
    });
  }, [serviceGroups, selectedActivity, hasMultipleActivities]);
  const serviceGroupsSorted = [...filteredServiceGroups].sort((a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (a.sortOrder > b.sortOrder) return 1;
    return 0;
  });
  const handleEditGroup = (serviceGroupId) => {
    router.push("".concat(urlPrefix, "/podesavanja/usluge/groups/").concat(serviceGroupId));
  };
  const handleAddService = (serviceGroupId) => {
    router.push(
      "".concat(urlPrefix, "/podesavanja/usluge/services/novo/").concat(serviceGroupId)
    );
  };
  const handleEditService = (serviceId) => {
    router.push("".concat(urlPrefix, "/podesavanja/usluge/services/").concat(serviceId));
  };
  const handleCloseCreateModal = reactExports.useCallback(() => {
    setIsCreateModalOpen(false);
  }, []);
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
    hasMultipleActivities && categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Delatnost") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IonSelect,
        {
          value: selectedActivity == null ? void 0 : selectedActivity.id,
          placeholder: t("Izaberite delatnost"),
          onIonChange: (e) => {
            const categoryId = e.detail.value;
            const category = categories.find(
              (cat) => cat.id === categoryId
            );
            setSelectedActivity(category || null);
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: null, children: t("Sve delatnosti") }),
            categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: category.id, children: category.title }, category.id))
          ]
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: constructOutline }),
          t("Usluge")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButton, { size: "small", onClick: () => setIsCreateModalOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
          t("Nova grupa")
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: serviceGroupsSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding ion-text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema usluga za prikaz") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonAccordionGroup, { className: "flex flex-col gap-3", children: serviceGroupsSorted.map(
        (serviceGroup) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonAccordion,
          {
            value: "group-".concat(serviceGroup.id),
            className: "border border-gray-300 rounded-lg overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { slot: "header", color: "light", lines: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold", children: serviceGroup.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: serviceGroup.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonText, { color: "medium", children: [
                  t("Usluga"),
                  ": ",
                  serviceGroup.services.length
                ] }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { slot: "content", className: "ion-no-padding", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 p-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    IonButton,
                    {
                      expand: "block",
                      size: "small",
                      onClick: () => handleAddService(serviceGroup.id),
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
                        t("Dodaj uslugu")
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    IonButton,
                    {
                      expand: "block",
                      size: "small",
                      fill: "outline",
                      onClick: () => handleEditGroup(serviceGroup.id),
                      className: "flex-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: createOutline, slot: "start" }),
                        t("Edit grupe")
                      ]
                    }
                  )
                ] }),
                serviceGroup.services.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema servisa u ovoj grupi") }) }) }) : serviceGroup.services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IonItem,
                  {
                    button: true,
                    detail: true,
                    onClick: () => handleEditService(service.id),
                    className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: service.title }),
                      service.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600", children: service.description })
                    ] })
                  },
                  service.id
                ))
              ] })
            ]
          },
          serviceGroup.id
        )
      ) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceGroupCreateModal,
      {
        isOpen: isCreateModalOpen,
        onDidDismiss: handleCloseCreateModal
      }
    )
  ] });
}
export {
  ServicesPage as default
};
