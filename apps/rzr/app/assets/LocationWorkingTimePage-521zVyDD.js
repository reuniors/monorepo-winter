import { M as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-qB5C-kEe.js";
import { o as IonSpinner, b2 as IonCard, b4 as IonCardHeader, b5 as IonCardTitle, b as IonIcon, ah as timeOutline, d as IonButton, aa as addOutline, b3 as IonCardContent, aP as peopleOutline, H as IonList, bi as IonAvatar, G as IonLabel, aJ as IonSegment, aK as IonSegmentButton } from "./vendor_ionic-Dg_6JWqB.js";
import { B as useGetLocationWorkingHoursQuery, W as WorkingHoursList, E as WorkingHoursForm, G as useGetWorkerWorkingHoursQuery, n as activeLocation } from "./App-CXosnGFT.js";
import "./vendor_leaflet-qZKAsj11.js";
import "./index-DHkbSrdz.js";
import "./vendor_firebase-BHFFFgOS.js";
function LocationWorkingHoursSection({
  locationSlug
}) {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [activeWorkingTime, setActiveWorkingTime] = reactExports.useState(void 0);
  const {
    data: workingHoursResponse,
    isLoading,
    error
  } = useGetLocationWorkingHoursQuery({
    locationSlug
  });
  const workingHours = (workingHoursResponse == null ? void 0 : workingHoursResponse.data) || [];
  const handleShowEditForm = reactExports.useCallback((workingTime) => {
    setActiveWorkingTime(workingTime);
    setShowAddForm(true);
  }, []);
  const handleAddWorkingTime = reactExports.useCallback(() => {
    setActiveWorkingTime(void 0);
    setShowAddForm(true);
  }, []);
  const handleCloseForm = reactExports.useCallback(() => {
    setShowAddForm(false);
    setActiveWorkingTime(void 0);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-red-500", children: t("Greška pri učitavanju radnog vremena") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline }),
          t("Radno vreme lokala")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonButton,
          {
            size: "small",
            onClick: handleAddWorkingTime,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
              t("Dodaj radno vreme")
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "p-0", children: !(workingHours == null ? void 0 : workingHours.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 text-gray-500", children: t("Nema definisanog radnog vremena") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        WorkingHoursList,
        {
          workingHours,
          onEdit: handleShowEditForm
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkingHoursForm,
      {
        isOpen: showAddForm,
        onDidDismiss: handleCloseForm,
        locationSlug,
        activeSegment: "location",
        workingTime: activeWorkingTime
      },
      "".concat(activeWorkingTime == null ? void 0 : activeWorkingTime.id)
    )
  ] });
}
function WorkersWorkingHoursSection({
  locationSlug
}) {
  const { t } = useTranslation();
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [activeWorkerId, setActiveWorkerId] = reactExports.useState(
    void 0
  );
  const [activeWorkingTime, setActiveWorkingTime] = reactExports.useState(void 0);
  const {
    data: workersResponse,
    isLoading,
    error
  } = useGetWorkerWorkingHoursQuery({
    locationSlug
  });
  const workers = (workersResponse == null ? void 0 : workersResponse.data) || [];
  const handleAddWorkerHours = reactExports.useCallback(() => {
    setActiveWorkingTime(void 0);
    setActiveWorkerId(void 0);
    setShowAddForm(true);
  }, []);
  const handleShowEditForm = reactExports.useCallback(
    (workerId) => (workingTime) => {
      setActiveWorkingTime(workingTime);
      setActiveWorkerId(workerId);
      setShowAddForm(true);
    },
    []
  );
  const handleCloseForm = reactExports.useCallback(() => {
    setShowAddForm(false);
    setActiveWorkingTime(void 0);
    setActiveWorkerId(void 0);
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-red-500", children: t("Greška pri učitavanju radnog vremena radnika") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline }),
          t("Radno vreme radnika")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonButton,
          {
            size: "small",
            onClick: handleAddWorkerHours,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
              t("Dodaj radno vreme")
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: workers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 text-gray-500", children: t("Nema definisanog radnog vremena radnika") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: workers.map((worker) => {
        var _a, _b;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { className: "w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: ((_a = worker.avatar) == null ? void 0 : _a.fileName) || "".concat("/app/", "public/projects/rzr/images/avatar.svg"),
                alt: worker.fullName
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { className: "font-medium", children: worker.fullName })
          ] }),
          !((_b = worker.workingHours) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-2 text-gray-400 ml-10", children: t("Nema definisanog radnog vremena") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            WorkingHoursList,
            {
              workingHours: worker.workingHours,
              onEdit: handleShowEditForm(worker.id)
            }
          )
        ] }, worker.id);
      }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkingHoursForm,
      {
        isOpen: showAddForm,
        onDidDismiss: handleCloseForm,
        locationSlug,
        activeSegment: "worker",
        workingTime: activeWorkingTime,
        activeWorkerId
      },
      "".concat(activeWorkerId, "-").concat(activeWorkingTime == null ? void 0 : activeWorkingTime.id)
    )
  ] });
}
function LocationWorkingTimePage() {
  const { t } = useTranslation();
  const [activeSegment, setActiveSegment] = reactExports.useState(
    "location"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      IonSegment,
      {
        value: activeSegment,
        onIonChange: (e) => setActiveSegment(e.detail.value),
        className: "mb-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonSegmentButton, { value: "location", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Lokal") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonSegmentButton, { value: "worker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Radnici") })
          ] })
        ]
      }
    ),
    activeSegment === "location" && /* @__PURE__ */ jsxRuntimeExports.jsx(LocationWorkingHoursSection, { locationSlug: activeLocation }),
    activeSegment === "worker" && /* @__PURE__ */ jsxRuntimeExports.jsx(WorkersWorkingHoursSection, { locationSlug: activeLocation })
  ] });
}
export {
  LocationWorkingTimePage as default
};
