import { e as reactExports, a3 as useTranslation, j as jsxRuntimeExports, az as parseISO, aC as format, ai as SwiperSlide, a0 as t, a1 as yup, aU as isPast, aV as addMinutes } from "./vendor_react-CMjr4Gvv.js";
import { b as useGetOneFeReservationQuery, c as useUpdateFeReservationMutation } from "./reservation.services-DUz-U_Xc.js";
import { n as activeLocation, r as SceletonLoader, A as fromUtcDateTimeToTime, s as getPathBySize, S as SwiperWrapper, x as useFormWithSchema, D as DynamicForm, b as useUser, g as urlPrefix, C as ConditionalComponent, B as IonAlertConfirmation, l as useQueryParamsHook, L as LayoutMainPage } from "./App-CNuYiPPZ.js";
import { q as IonItem, B as IonGrid, C as IonRow, D as IonCol, l as IonIcon, bl as calendarClearOutline, ad as calendarOutline, ae as timeOutline, bq as pricetagOutline, j as IonTitle, b4 as IonBadge, br as alertCircleOutline, bs as hourglassOutline, bt as helpOutline, d as IonButton, o as IonFooter, i as IonToolbar, aX as personOutline, bu as closeCircleOutline, bv as personRemoveOutline, b3 as checkmarkCircleOutline, u as useIonToast, al as useIonRouter } from "./vendor_ionic-7y52xm55.js";
import { A as APPOINTMENT_STATUS_LABELS, a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import { L as LazyLoadImgStandard, p as preloadCoverImg } from "./logo-square-SX63CiNV.js";
import { a as useGetFeLocationClientsQuery, u as useGetFeClientDataQuery } from "./client.services-Dy_mNmiR.js";
import { g as getClientFormFields, a as getAdministrationClientFormFields, C as ClientDataModal } from "./ClientDataModal-DFg2By-q.js";
import "./vendor_leaflet-0lyiJUDC.js";
import "./index-DHw_Gx8b.js";
import "./vendor_firebase-BM_4Mc6z.js";
function ConfirmReservation({ reservationHash }) {
  var _a, _b, _c, _d, _e, _f;
  const { t: t2 } = useTranslation();
  const { data: reservationResponse, isLoading: isReservationLoading } = useGetOneFeReservationQuery({
    locationSlug: activeLocation,
    reservationHash
  });
  const reservationData = reservationResponse == null ? void 0 : reservationResponse.data;
  if (isReservationLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!reservationData || !reservationData.dateUtc) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { color: "danger", children: t2("Došlo je do greške!") });
  }
  const date = parseISO(reservationData.dateUtc);
  const dateFormatted = format(date, "dd.MM.yyyy");
  const timeFormatted = fromUtcDateTimeToTime(date);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonGrid, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LazyLoadImgStandard,
        {
          src: getPathBySize(
            (_b = (_a = reservationData.locationWorker) == null ? void 0 : _a.avatar) == null ? void 0 : _b.pathByResolution
          ),
          preloadImg: preloadCoverImg,
          className: "h-16 w-16 rounded-full object-cover flex-shrink-0"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-semibold mb-0 flex items-center", children: (_c = reservationData.locationWorker) == null ? void 0 : _c.fullName })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "border-2 rounded-2xl border-amber-300 text-md text-center py-2",
        children: reservationData.friendlyCode || reservationData.hash
      }
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarClearOutline, className: "mr-2" }),
        t2("Status")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "flex items-center h-full ".concat(reservationData.status === AppointmentStatus.CONFIRMED ? "text-green-500" : reservationData.status === AppointmentStatus.CANCELLED || reservationData.status === AppointmentStatus.NO_SHOW ? "text-red-500" : ""),
          children: t2(APPOINTMENT_STATUS_LABELS[reservationData.status])
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, className: "mr-2" }),
        t2("Datum")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { className: "flex items-center", children: dateFormatted })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, className: "mr-2" }),
        t2("Vreme")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { className: "flex items-center", children: timeFormatted })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: pricetagOutline, className: "mr-2" }),
        t2("Cena usluga")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCol, { className: "flex items-center", children: [
        reservationData.originalCost && reservationData.discount && /* @__PURE__ */ jsxRuntimeExports.jsx("s", { className: "text-rose-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: reservationData.originalCost }) }),
        " ",
        reservationData.servicesCost,
        " RSD"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonTitle, { children: [
      t2("Usluge"),
      " [",
      (_e = (_d = reservationData.services) == null ? void 0 : _d.length) != null ? _e : 0,
      "]"
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperWrapper, { slidesPerView: "auto", spaceBetween: 12, children: (_f = reservationData.services) == null ? void 0 : _f.map((service) => {
      var _a2, _b2;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { style: { width: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { className: "p-2", color: "warning", children: [
        service.title,
        ((_a2 = service.pivot) == null ? void 0 : _a2.quantity) && service.pivot.quantity > 1 ? " x".concat((_b2 = service.pivot) == null ? void 0 : _b2.quantity) : ""
      ] }) }, service.id);
    }) }) }) }),
    reservationData.notice && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { color: "warning", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: alertCircleOutline, className: "mr-2" }),
        t2("Napomena")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { className: "flex items-center", children: reservationData.notice })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: hourglassOutline, className: "mr-2" }),
        t2("Trajanje usluga")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCol, { className: "flex items-center", children: [
        reservationData.servicesDuration,
        " min"
      ] })
    ] }),
    reservationData.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: helpOutline, className: "mr-2", color: "danger" }),
        t2("Razlog")
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCol, { className: "flex items-center", children: reservationData.reason })
    ] })
  ] });
}
const ConfirmReservation$1 = reactExports.memo(ConfirmReservation);
const schema$1 = yup.object().shape({
  id: yup.mixed().required().nullable(),
  fullName: yup.string().required(),
  // yup validation (phone number) must start with 0, and have 5-10 digits
  phoneNumber: yup.string().matches(/^[0]\d{6,11}$/, {
    message: t("Broj telefona mora početi sa 0 i imati od 6 do 12 cifara")
  }).required(),
  dateOfBirth: yup.string().required().nullable()
});
function ClientForm({
  clientData,
  onSave,
  disabledPhoneNumber,
  scrollToBottom,
  formDisabled,
  showSaveButton
}) {
  var _a, _b, _c, _d;
  useTranslation();
  const form = useFormWithSchema(schema$1, {
    defaultValues: {
      id: (_a = clientData == null ? void 0 : clientData.id) != null ? _a : null,
      fullName: (_b = clientData == null ? void 0 : clientData.fullName) != null ? _b : "",
      phoneNumber: (_c = clientData == null ? void 0 : clientData.phoneNumber) != null ? _c : "",
      dateOfBirth: (_d = clientData == null ? void 0 : clientData.dateOfBirth) != null ? _d : null
    }
  });
  const { handleSubmit } = form;
  const formFields = getClientFormFields(
    disabledPhoneNumber != null ? disabledPhoneNumber : false,
    formDisabled
  );
  const firstName = form.watch("fullName");
  const phoneNumber = form.watch("phoneNumber");
  const onSubmit = (data) => {
    onSave(data);
  };
  const handleForm = () => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 100);
  };
  reactExports.useEffect(() => {
    if (firstName && phoneNumber) {
      handleSubmit(onSubmit)();
    }
  }, [firstName, phoneNumber]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    if (clientData) {
      form.setValue("id", (_a2 = clientData.id) != null ? _a2 : null);
      form.setValue("fullName", clientData.fullName);
      form.setValue("phoneNumber", clientData.phoneNumber);
      form.setValue("dateOfBirth", (_b2 = clientData.dateOfBirth) != null ? _b2 : null);
    }
  }, [clientData]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit(onSubmit),
      onClick: scrollToBottom ? handleForm : void 0,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form }),
        showSaveButton && /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { type: "submit", color: "success", children: t("Sačuvaj") })
      ]
    }
  );
}
const schema = yup.object().shape({
  id: yup.mixed().required().nullable(),
  fullName: yup.string().required().nullable(),
  phoneNumber: yup.string().required(),
  dateOfBirth: yup.string().required().nullable()
});
function AdministrationClientForm({
  clients,
  onSave,
  disabledPhoneNumber
}) {
  const [selectedClientData, setSelectedClientData] = reactExports.useState(void 0);
  const form = useFormWithSchema(schema, {
    defaultValues: {
      id: null,
      fullName: "",
      phoneNumber: ""
    }
  });
  const { handleSubmit, watch } = form;
  const clientId = watch("id");
  const clientOptions = reactExports.useMemo(
    () => {
      var _a;
      return (_a = clients.map((client) => {
        var _a2, _b;
        return {
          value: (_b = (_a2 = client.id) == null ? void 0 : _a2.toString()) != null ? _b : "",
          text: "".concat(client.fullName, " - ").concat(client.phoneNumber)
        };
      })) != null ? _a : [];
    },
    [clients]
  );
  const formFields = getAdministrationClientFormFields(
    disabledPhoneNumber != null ? disabledPhoneNumber : false,
    clientOptions,
    () => {
    }
  );
  reactExports.useEffect(() => {
    var _a, _b;
    if (!clientId) {
      setSelectedClientData(void 0);
      return;
    }
    const existingClient = clients.find(
      (client) => {
        var _a2;
        return ((_a2 = client.id) == null ? void 0 : _a2.toString()) === clientId;
      }
    );
    if (existingClient) {
      setSelectedClientData(existingClient);
      onSave({
        id: (_a = existingClient.id) != null ? _a : null,
        fullName: existingClient.fullName,
        phoneNumber: existingClient.phoneNumber,
        dateOfBirth: (_b = existingClient.dateOfBirth) != null ? _b : null
      });
    } else {
      setSelectedClientData({
        id: void 0,
        fullName: clientId ? clientId.toString() : "",
        phoneNumber: "",
        dateOfBirth: void 0,
        email: "",
        userId: 0
      });
    }
  }, [clientId]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    selectedClientData && /* @__PURE__ */ jsxRuntimeExports.jsx(ClientForm, { onSave, clientData: selectedClientData }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form })
  ] });
}
function EditClient({
  onSave,
  scrollToBottom,
  editDisabled,
  showSaveButton
}) {
  var _a;
  const { data: clientsResponse, isLoading: isClientDataLoading } = useGetFeLocationClientsQuery({
    locationSlug: activeLocation
  });
  const clients = (_a = clientsResponse == null ? void 0 : clientsResponse.data) != null ? _a : [];
  const { isOwnerOrWorker } = useUser();
  const { data: clientResponse } = useGetFeClientDataQuery(void 0, {
    skip: !!isOwnerOrWorker
  });
  const clientData = clientResponse == null ? void 0 : clientResponse.data;
  if (isClientDataLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (isOwnerOrWorker) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(AdministrationClientForm, { onSave, clients });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ClientForm,
    {
      onSave,
      clientData,
      scrollToBottom,
      formDisabled: editDisabled,
      showSaveButton
    }
  );
}
function ReservationFooter({
  client,
  existingClient,
  isOwnerOrWorker,
  isOwnerOrWorkerOrAdmin,
  validUser,
  disableCancel,
  clientExists,
  reservationStatus,
  isLoadingReservation,
  isReservationInPast,
  onClientDataChange,
  onShowClientModal,
  onCancelClick,
  onNoShowClick,
  onConfirmClick
}) {
  const { t: t2 } = useTranslation();
  if (isLoadingReservation) {
    return null;
  }
  const hasMultipleActions = !(isReservationInPast && !isOwnerOrWorkerOrAdmin) || !!reservationStatus && reservationStatus !== AppointmentStatus.CONFIRMED;
  const justifyActions = hasMultipleActions ? "justify-between" : "justify-center";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { color: "light", children: [
    client && client.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      IonButton,
      {
        routerLink: "".concat(urlPrefix, "/public-profile/").concat(client.id),
        fill: "outline",
        color: "primary",
        style: {
          borderColor: "var(--ion-color-primary)",
          color: "var(--ion-color-primary)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: personOutline, slot: "start" }),
          client.fullName,
          " - ",
          client.phoneNumber
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConditionalComponent,
      {
        condition: !existingClient && !isOwnerOrWorker,
        render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonButton,
          {
            color: "dark",
            className: "text-amber-400 animate-bounce",
            onClick: onShowClientModal,
            children: t2("Popunite podatke o vama")
          }
        ),
        renderElse: () => /* @__PURE__ */ jsxRuntimeExports.jsx(EditClient, { onSave: onClientDataChange, scrollToBottom: true })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConditionalComponent,
      {
        condition: !(isReservationInPast && !isOwnerOrWorkerOrAdmin),
        render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center ".concat(justifyActions, " w-full pb-2"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConditionalComponent,
            {
              condition: isReservationInPast && isOwnerOrWorkerOrAdmin,
              render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                IonButton,
                {
                  fill: "outline",
                  color: "danger",
                  onClick: onNoShowClick || onCancelClick,
                  disabled: !validUser || disableCancel,
                  style: {
                    borderColor: "var(--ion-color-danger)",
                    color: "var(--ion-color-danger)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: personRemoveOutline, slot: "start" }),
                    t2("Nije se pojavio")
                  ]
                }
              ),
              renderElse: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ConditionalComponent,
                {
                  condition: !isReservationInPast,
                  render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    IonButton,
                    {
                      slot: "start",
                      fill: "outline",
                      color: "danger",
                      size: "default",
                      onClick: onCancelClick,
                      disabled: !validUser || disableCancel,
                      style: {
                        borderColor: "var(--ion-color-danger)",
                        color: "var(--ion-color-danger)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeCircleOutline, slot: "start" }),
                        t2("Otkaži")
                      ]
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConditionalComponent,
            {
              condition: reservationStatus !== AppointmentStatus.CONFIRMED,
              render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                IonButton,
                {
                  slot: "end",
                  color: "success",
                  size: "default",
                  className: "text-white z-10",
                  disabled: !validUser || disableCancel,
                  onClick: () => {
                    if (clientExists) {
                      onConfirmClick();
                    } else {
                      onShowClientModal();
                    }
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: checkmarkCircleOutline, className: "mr-2" }),
                    reservationStatus === AppointmentStatus.DRAFT ? t2("Potvrda rezervacije") : t2("Potvrdi")
                  ]
                }
              )
            }
          )
        ] })
      }
    )
  ] }) });
}
function ReservationActions({
  showCancelConfirmation,
  showClientModal,
  existingClient,
  saveLabel,
  isNoShow,
  onCancelConfirm,
  onNoShowConfirm,
  onCancelDismiss,
  onClientSave,
  onClientCancel
}) {
  const { t: t2 } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ClientDataModal,
      {
        isOpen: showClientModal,
        onCancel: onClientCancel,
        onSave: onClientSave,
        saveLabel: saveLabel || t2("Sačuvaj i potvrdi"),
        initialData: existingClient
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonAlertConfirmation,
      {
        confirmAction: isNoShow ? onNoShowConfirm || onCancelConfirm : onCancelConfirm,
        isOpen: showCancelConfirmation,
        message: isNoShow ? t2("Da li ste sigurni da klijent nije došao na rezervaciju?") : t2("Da li ste sigurni da želite da otkažete rezervaciju?"),
        confirmCssClass: isNoShow ? "!text-orange-600" : "!text-rose-600",
        onDidDismiss: onCancelDismiss,
        inputs: [
          {
            name: "reason",
            type: "text",
            placeholder: isNoShow ? t2("Unesite napomenu (opciono)") : t2("Unesite razlog otkazivanja")
          }
        ]
      }
    )
  ] });
}
function ConfirmReservationPage({
  match
}) {
  var _a, _b;
  const { t: t2 } = useTranslation();
  const hash = match.params.reservationHash;
  const [clientData, setClientData] = reactExports.useState(
    void 0
  );
  const [showSuccessToast] = useIonToast();
  const { push, goBack } = useIonRouter();
  const { isOwnerOrWorker, isAdmin, userData } = useUser();
  const [showCancelConfirmation, setShowCancelConfirmation] = reactExports.useState(false);
  const [showClientModal, setShowClientModal] = reactExports.useState(false);
  const { data: queryParams } = useQueryParamsHook({});
  const hasBackToHome = (_a = queryParams["backToHome"]) != null ? _a : false;
  const [updateReservation, updateReservationResult] = useUpdateFeReservationMutation();
  const { data: reservationResponse, isLoading: isReservationLoading } = useGetOneFeReservationQuery({
    locationSlug: activeLocation,
    reservationHash: hash
  });
  const reservationData = reservationResponse == null ? void 0 : reservationResponse.data;
  const clientExists = !!(clientData == null ? void 0 : clientData.fullName) && !!(clientData == null ? void 0 : clientData.phoneNumber);
  const existingClient = reservationData == null ? void 0 : reservationData.client;
  const goToAppointments = () => {
    push("".concat(urlPrefix, "/t/termini"), "back");
  };
  const handleConfirm = () => {
    if (!clientData) {
      return;
    }
    updateReservation({
      locationSlug: activeLocation,
      reservationHash: hash,
      clientData,
      status: AppointmentStatus.CONFIRMED,
      saveClient: !isOwnerOrWorker
    }).then((result) => {
      var _a2;
      if ("data" in result && ((_a2 = result.data) == null ? void 0 : _a2.success)) {
        goToAppointments();
        showSuccessToast({
          message: t2("Rezervacija je uspešno potvrđena"),
          duration: 3e3,
          color: "success"
        });
      }
    });
  };
  const handleCancel = (data) => {
    updateReservation({
      locationSlug: activeLocation,
      reservationHash: hash,
      status: AppointmentStatus.CANCELLED,
      reason: data == null ? void 0 : data.reason
    }).then((result) => {
      var _a2;
      if ("data" in result && ((_a2 = result.data) == null ? void 0 : _a2.success)) {
        goToAppointments();
        showSuccessToast({
          message: t2("Rezervacija je uspešno otkazana"),
          duration: 3e3,
          color: "danger"
        });
      }
    });
    showCancelConfirmation && setShowCancelConfirmation(false);
  };
  const handleNoShow = (data) => {
    updateReservation({
      locationSlug: activeLocation,
      reservationHash: hash,
      status: AppointmentStatus.NO_SHOW,
      reason: data == null ? void 0 : data.reason
    }).then((result) => {
      var _a2;
      if ("data" in result && ((_a2 = result.data) == null ? void 0 : _a2.success)) {
        goToAppointments();
        showSuccessToast({
          message: t2('Rezervacija je označena kao "Nije se pojavio"'),
          duration: 3e3,
          color: "warning"
        });
      }
    });
    showCancelConfirmation && setShowCancelConfirmation(false);
  };
  const isReservationInPast = (reservationData == null ? void 0 : reservationData.dateUtc) && (reservationData == null ? void 0 : reservationData.servicesDuration) ? isPast(
    addMinutes(
      parseISO(reservationData.dateUtc),
      reservationData.servicesDuration
    )
  ) : false;
  const validUser = isOwnerOrWorker || !(reservationData == null ? void 0 : reservationData.client) || (userData == null ? void 0 : userData.id) === reservationData.client.userId;
  const handleClientData = (data) => {
    setClientData(data);
  };
  const disableCancel = reservationData && (reservationData.status === AppointmentStatus.CANCELLED || reservationData.status === AppointmentStatus.NO_SHOW);
  const handleClientModalSave = (data) => {
    setClientData(data);
    setShowClientModal(false);
    handleConfirm();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    LayoutMainPage,
    {
      title: t2("Potvrda rezervacije"),
      titleSlot: "start",
      hasBackButton: true,
      backButtonUrl: hasBackToHome ? "".concat(urlPrefix, "/t/termini") : void 0,
      showLoadingMessage: updateReservationResult.isLoading,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReservationFooter,
        {
          client: (_b = reservationData == null ? void 0 : reservationData.client) != null ? _b : void 0,
          existingClient: existingClient != null ? existingClient : void 0,
          isOwnerOrWorker,
          validUser,
          disableCancel: !!disableCancel,
          clientExists,
          reservationStatus: reservationData == null ? void 0 : reservationData.status,
          isLoadingReservation: isReservationLoading,
          isReservationInPast,
          isOwnerOrWorkerOrAdmin: isOwnerOrWorker || isAdmin,
          onClientDataChange: handleClientData,
          onShowClientModal: () => setShowClientModal(true),
          onCancelClick: () => setShowCancelConfirmation(true),
          onNoShowClick: () => setShowCancelConfirmation(true),
          onConfirmClick: handleConfirm
        }
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ConfirmReservation$1, { reservationHash: hash }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReservationActions,
          {
            showCancelConfirmation,
            showClientModal,
            existingClient: existingClient != null ? existingClient : void 0,
            saveLabel: t2("Sačuvaj i potvrdi"),
            isNoShow: isReservationInPast && (isOwnerOrWorker || isAdmin),
            onCancelConfirm: handleCancel,
            onNoShowConfirm: handleNoShow,
            onCancelDismiss: () => setShowCancelConfirmation(false),
            onClientSave: handleClientModalSave,
            onClientCancel: () => setShowClientModal(false)
          }
        )
      ]
    }
  );
}
export {
  ConfirmReservationPage as default
};
