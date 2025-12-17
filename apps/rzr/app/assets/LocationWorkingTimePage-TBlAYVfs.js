import { E as humpsExports, j as jsxRuntimeExports, a0 as t, a1 as create$3, aN as create$2, aL as create$5, aM as create$7, a2 as create$6, aD as useTranslation, e as reactExports, Z as useForm, $ as o } from "./vendor_react-BF1Ucyx8.js";
import { F as IonList, q as IonItem, E as IonLabel, b as IonContent, o as IonFooter, n as IonSpinner, aX as IonCard, aZ as IonCardHeader, a_ as IonCardTitle, l as IonIcon, ae as timeOutline, aY as IonCardContent, aH as peopleOutline, bb as IonAvatar, aC as IonSegment, aD as IonSegmentButton } from "./vendor_ionic-BiOFnPTY.js";
import { A as transformStandardResponseToCamelCase, n as fromUtcHM, F as FieldType, j as useGetFeWorkersQuery, I as IonModalExtended, D as DynamicForm, M as ModalActionButtons, k as activeLocation } from "./App-1S9VL0F5.js";
import { r as rzrApi, o as TagType } from "./index-CK-pTz1a.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./vendor_firebase-Z856UVCm.js";
const workingHoursApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    // Location Working Hours
    getLocationWorkingHours: builder.query({
      query: ({ locationSlug }) => ({
        url: "location-admin/working-hours",
        method: "GET",
        params: { locationSlug }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.LOCATION_WORKING_HOURS]
    }),
    createLocationWorkingHours: builder.mutation({
      query: (body) => ({
        url: "location-admin/working-hours",
        method: "POST",
        body: humpsExports.decamelizeKeys(body)
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.LOCATION_WORKING_HOURS]
    }),
    updateLocationWorkingHours: builder.mutation({
      query: (body) => ({
        url: "location-admin/working-hours/".concat(body.id),
        method: "PUT",
        body: humpsExports.decamelizeKeys(body)
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.LOCATION_WORKING_HOURS]
    }),
    deleteLocationWorkingHours: builder.mutation({
      query: ({ id, locationSlug }) => ({
        url: "location-admin/working-hours/".concat(id),
        method: "DELETE",
        params: { location_slug: locationSlug, id }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.LOCATION_WORKING_HOURS]
    }),
    // Worker Working Hours
    getWorkerWorkingHours: builder.query({
      query: ({ locationSlug }) => ({
        url: "worker-admin/working-hours",
        method: "GET",
        params: { locationSlug }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [TagType.WORKER_WORKING_HOURS]
    }),
    createWorkerWorkingHours: builder.mutation({
      query: (body) => ({
        url: "worker-admin/working-hours",
        method: "POST",
        body: humpsExports.decamelizeKeys(body)
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.WORKER_WORKING_HOURS]
    }),
    updateWorkerWorkingHours: builder.mutation({
      query: (body) => ({
        url: "worker-admin/working-hours/".concat(body.id),
        method: "PUT",
        body: humpsExports.decamelizeKeys(body)
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.WORKER_WORKING_HOURS]
    }),
    deleteWorkerWorkingHours: builder.mutation({
      query: ({ id, workerId }) => ({
        url: "worker-admin/working-hours/".concat(id),
        method: "DELETE",
        params: { worker_id: workerId, id }
      }),
      transformResponse: transformStandardResponseToCamelCase,
      invalidatesTags: [TagType.WORKER_WORKING_HOURS]
    })
  })
});
const {
  // Location Working Hours
  useGetLocationWorkingHoursQuery,
  useCreateLocationWorkingHoursMutation,
  useUpdateLocationWorkingHoursMutation,
  useDeleteLocationWorkingHoursMutation,
  // Worker Working Hours
  useGetWorkerWorkingHoursQuery,
  useCreateWorkerWorkingHoursMutation,
  useUpdateWorkerWorkingHoursMutation,
  useDeleteWorkerWorkingHoursMutation
} = workingHoursApi;
const DAYS_OF_WEEK = [
  { code: "mon", name: "Ponedeljak", short: "Pon" },
  { code: "tue", name: "Utorak", short: "Uto" },
  { code: "wed", name: "Sreda", short: "Sre" },
  { code: "thu", name: "Četvrtak", short: "Čet" },
  { code: "fri", name: "Petak", short: "Pet" },
  { code: "sat", name: "Subota", short: "Sub" },
  { code: "sun", name: "Nedelja", short: "Ned" }
];
const DayChip = ({ codes }) => {
  var _a, _b;
  if (!codes || codes.length === 0) return null;
  const dayOrder = DAYS_OF_WEEK.map((d) => d.code);
  const orderedCodes = codes.slice().sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  if (orderedCodes.length === 0) return null;
  const firstDay = (_a = DAYS_OF_WEEK.find((d) => d.code === orderedCodes[0])) == null ? void 0 : _a.short;
  if (orderedCodes.length === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center w-20 h-16 text-white bg-gray-700 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: firstDay }) });
  }
  const lastDay = (_b = DAYS_OF_WEEK.find(
    (d) => d.code === orderedCodes[orderedCodes.length - 1]
  )) == null ? void 0 : _b.short;
  const indices = orderedCodes.map((c) => dayOrder.indexOf(c));
  const isConsecutive = indices.every(
    (val, i, arr) => i === 0 || val === arr[i - 1] + 1
  );
  if (orderedCodes.length === 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center w-20 h-16 text-white bg-gray-700 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
        firstDay,
        ","
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold ml-1", children: lastDay })
    ] });
  }
  if (isConsecutive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center w-20 h-16 text-white bg-gray-700 rounded-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
        firstDay,
        " -"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold ml-1", children: lastDay })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center w-24 h-16 text-white bg-gray-700 rounded-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold", children: [
      firstDay,
      ", ...,"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold ml-1", children: lastDay })
  ] });
};
function WorkingHoursList({
  workingHours,
  onEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: workingHours.map((shift) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonItem,
    {
      className: "mb-2 border-0 rounded-lg",
      lines: "none",
      onClick: () => onEdit(shift),
      button: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DayChip, { codes: shift.daysCodes }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col py-2", slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { className: "text-lg font-semibold text-white", children: [
          fromUtcHM(shift.timeFromUtc),
          " - ",
          fromUtcHM(shift.timeToUtc)
        ] }) })
      ]
    },
    shift.id
  )) });
}
const getWorkingHoursFormFields = (workers, workerVisible) => [
  {
    keyName: "workerId",
    name: "workerId",
    data: {
      label: t("Radnik"),
      type: FieldType.Select,
      options: workers.map((worker) => ({
        value: worker.id.toString(),
        text: worker.fullName
      }))
    },
    visible: workerVisible,
    gridSize: { size: "12" }
  },
  {
    keyName: "workingTime",
    name: "workingTime",
    data: {
      type: FieldType.WorkingHoursSingle,
      label: t("Radno vreme")
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "pausesUtc",
    name: "pausesUtc",
    data: {
      type: FieldType.WorkingHours,
      label: t("Pauze"),
      addNewLabel: t("Dodaj pauzu"),
      modalTitle: t("Nova pauza"),
      defaultTimeFrom: "12:00",
      defaultTimeTo: "12:30",
      defaultDays: ["mon", "tue", "wed", "thu", "fri"]
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "shift",
    name: "shift",
    data: {
      type: FieldType.Select,
      label: t("Shift"),
      options: [
        { value: "1", text: t("1") },
        { value: "2", text: t("2") },
        { value: "3", text: t("3") },
        { value: "4", text: t("4") },
        { value: "5", text: t("5") }
      ]
    }
  },
  {
    keyName: "active",
    name: "active",
    data: {
      type: FieldType.Switch,
      label: t("Aktivno")
    }
  }
];
const workingHoursFormSchema = create$3().shape({
  workerId: create$6(),
  workingTime: create$3().shape({
    timeFromUtc: create$6().required(t("Polje je obavezno")),
    timeToUtc: create$6().required(t("Polje je obavezno")),
    daysCodes: create$2().of(create$6().required()).min(1, t("Morate izabrati bar jedan dan")).required(),
    name: create$6().required(t("Polje je obavezno"))
  }).required(),
  active: create$7().required(),
  shift: create$5().required(),
  pausesUtc: create$2().of(
    create$3().shape({
      timeFromUtc: create$6().required(t("Polje je obavezno")),
      timeToUtc: create$6().required(t("Polje je obavezno")),
      daysCodes: create$2().of(create$6().required()).min(1, t("Morate izabrati bar jedan dan")).required()
    })
  )
});
function WorkingHoursForm({
  isOpen,
  onDidDismiss,
  locationSlug,
  activeSegment,
  workingTime,
  activeWorkerId
}) {
  var _a, _b;
  const { t: t2 } = useTranslation();
  const isWorkerSegment = activeSegment === "worker";
  const dynamicSchema = reactExports.useMemo(() => {
    return workingHoursFormSchema.shape({
      workerId: isWorkerSegment ? create$6().required(t2("Polje je obavezno")) : create$6()
    });
  }, [isWorkerSegment, t2]);
  const { data: workersData } = useGetFeWorkersQuery(
    { locationSlug },
    { skip: !isWorkerSegment }
  );
  const form = useForm({
    resolver: o(dynamicSchema),
    defaultValues: {
      workerId: (activeWorkerId == null ? void 0 : activeWorkerId.toString()) || "",
      workingTime,
      pausesUtc: (workingTime == null ? void 0 : workingTime.pausesUtc) || [],
      active: (_a = workingTime == null ? void 0 : workingTime.active) != null ? _a : true,
      shift: (_b = workingTime == null ? void 0 : workingTime.shift) != null ? _b : 1
    }
  });
  const fields = reactExports.useMemo(
    () => getWorkingHoursFormFields((workersData == null ? void 0 : workersData.data) || [], isWorkerSegment),
    [workersData, form.getValues, isWorkerSegment]
  );
  const [createLocationHours] = useCreateLocationWorkingHoursMutation();
  const [updateLocationHours] = useUpdateLocationWorkingHoursMutation();
  const [deleteLocationHours] = useDeleteLocationWorkingHoursMutation();
  const [createWorkerHours] = useCreateWorkerWorkingHoursMutation();
  const [updateWorkerHours] = useUpdateWorkerWorkingHoursMutation();
  const [deleteWorkerHours] = useDeleteWorkerWorkingHoursMutation();
  const isEditMode = !!workingTime;
  const onSubmit = async (data) => {
    const payload = {
      locationSlug,
      timeFromUtc: data.workingTime.timeFromUtc,
      timeToUtc: data.workingTime.timeToUtc,
      daysCodes: data.workingTime.daysCodes || [],
      name: data.workingTime.name,
      active: data.active,
      shift: data.shift,
      pausesUtc: data.pausesUtc || []
    };
    try {
      if (!isWorkerSegment) {
        if (isEditMode) {
          await updateLocationHours({ ...payload, id: workingTime.id });
        } else {
          await createLocationHours(payload);
        }
      } else {
        if (isEditMode) {
          await updateWorkerHours({
            ...payload,
            id: workingTime.id
          });
        } else if (data.workerId) {
          await createWorkerHours({
            ...payload,
            workerId: data.workerId
          });
        }
      }
      onDidDismiss();
    } catch (e) {
      console.error(e);
    }
  };
  const handleDelete = async () => {
    if (!workingTime) return;
    try {
      if (!isWorkerSegment) {
        await deleteLocationHours({ id: workingTime.id, locationSlug });
      } else if (activeWorkerId) {
        await deleteWorkerHours({
          id: workingTime.id,
          workerId: activeWorkerId
        });
      }
      onDidDismiss();
    } catch (e) {
      console.error(e);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      name: "working-hours-form",
      isOpen,
      onClose: onDidDismiss,
      title: isEditMode ? t2("Izmeni radno vreme") : t2("Dodaj radno vreme"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.handleSubmit(onSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields, form }) }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModalActionButtons,
          {
            onSave: form.handleSubmit(onSubmit),
            onCancel: onDidDismiss,
            onDelete: handleDelete,
            isSaving: form.formState.isSubmitting,
            isSaveDisabled: !form.formState.isValid,
            showDelete: isEditMode
          }
        ) })
      ]
    }
  );
}
function LocationWorkingHoursSection({
  locationSlug
}) {
  const { t: t2 } = useTranslation();
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
  const handleShowEditForm = (workingTime) => {
    setActiveWorkingTime(workingTime);
    setShowAddForm(true);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-red-500", children: t2("Greška pri učitavanju radnog vremena") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline }),
        t2("Radno vreme lokala")
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "p-0", children: !(workingHours == null ? void 0 : workingHours.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 text-gray-500", children: t2("Nema definisanog radnog vremena") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        onDidDismiss: () => setShowAddForm(false),
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
  const { t: t2 } = useTranslation();
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
  const handleShowEditForm = (workerId) => (workingTime) => {
    setActiveWorkingTime(workingTime);
    setActiveWorkerId(workerId);
    setShowAddForm(true);
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-8 text-red-500", children: t2("Greška pri učitavanju radnog vremena radnika") });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline }),
        t2("Radno vreme radnika")
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: workers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-4 text-gray-500", children: t2("Nema definisanog radnog vremena radnika") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { children: workers.map((worker) => {
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
          !((_b = worker.workingHours) == null ? void 0 : _b.length) ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-2 text-gray-400 ml-10", children: t2("Nema definisanog radnog vremena") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
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
        onDidDismiss: () => setShowAddForm(false),
        locationSlug,
        activeSegment: "worker",
        workingTime: activeWorkingTime,
        activeWorkerId
      },
      "".concat(activeWorkerId, "-").concat(activeWorkingTime == null ? void 0 : activeWorkingTime.id)
    )
  ] });
}
function LocationWorkingTimePage({
  isModalOpen,
  setIsModalOpen
}) {
  const { t: t2 } = useTranslation();
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t2("Lokal") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonSegmentButton, { value: "worker", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t2("Radnici") })
          ] })
        ]
      }
    ),
    activeSegment === "location" && /* @__PURE__ */ jsxRuntimeExports.jsx(LocationWorkingHoursSection, { locationSlug: activeLocation }),
    activeSegment === "worker" && /* @__PURE__ */ jsxRuntimeExports.jsx(WorkersWorkingHoursSection, { locationSlug: activeLocation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkingHoursForm,
      {
        isOpen: isModalOpen,
        onDidDismiss: () => setIsModalOpen(false),
        locationSlug: activeLocation,
        activeSegment,
        workingTime: void 0,
        activeWorkerId: void 0
      }
    )
  ] });
}
export {
  LocationWorkingTimePage as default
};
