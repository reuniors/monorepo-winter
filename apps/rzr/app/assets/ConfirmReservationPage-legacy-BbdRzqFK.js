;
(function () {
  System.register(['./vendor_react-legacy-Dr5RK8rs.js', './App-legacy-COHPHKDC.js', './vendor_ionic-legacy-BouRDOo5.js', './appointment.constants-legacy-DGLfwUGc.js', './ClientDataModal-legacy-BoCwdbxM.js', './vendor_leaflet-legacy-5Hsu9Ykl.js', './index-legacy-BHIGnBEX.js', './vendor_firebase-legacy-DZHWzyZG.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, parseISO, format, SwiperSlide, t, yup, isPast, addMinutes, useGetOneFeReservationQuery, activeLocation, SceletonLoader, fromUtcDateTimeToTime, LazyLoadImgStandard, preloadCoverImg, getPathBySize, SwiperWrapper, useFormWithSchema, DynamicForm, useGetFeLocationClientsQuery, useUser, useGetFeClientDataQuery, urlPrefix, ConditionalComponent, IonAlertConfirmation, useQueryParamsHook, useUpdateFeReservationMutation, LayoutMainPage, IonItem, IonGrid, IonRow, IonCol, IonIcon, calendarClearOutline, calendarOutline, timeOutline, pricetagOutline, IonTitle, IonBadge, alertCircleOutline, hourglassOutline, helpOutline, IonButton, IonFooter, personOutline, IonToolbar, useIonToast, useIonRouter, APPOINTMENT_STATUS_LABELS, AppointmentStatus, getClientFormFields, getAdministrationClientFormFields, ClientDataModal;
    return {
      setters: [module => {
        reactExports = module.e;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        parseISO = module.av;
        format = module.ay;
        SwiperSlide = module.af;
        t = module.a0;
        yup = module.a4;
        isPast = module.aW;
        addMinutes = module.aN;
      }, module => {
        useGetOneFeReservationQuery = module.g;
        activeLocation = module.h;
        SceletonLoader = module.S;
        fromUtcDateTimeToTime = module.j;
        LazyLoadImgStandard = module.L;
        preloadCoverImg = module.p;
        getPathBySize = module.k;
        SwiperWrapper = module.l;
        useFormWithSchema = module.m;
        DynamicForm = module.D;
        useGetFeLocationClientsQuery = module.n;
        useUser = module.b;
        useGetFeClientDataQuery = module.o;
        urlPrefix = module.f;
        ConditionalComponent = module.C;
        IonAlertConfirmation = module.I;
        useQueryParamsHook = module.q;
        useUpdateFeReservationMutation = module.r;
        LayoutMainPage = module.s;
      }, module => {
        IonItem = module.q;
        IonGrid = module.A;
        IonRow = module.B;
        IonCol = module.C;
        IonIcon = module.l;
        calendarClearOutline = module.b0;
        calendarOutline = module.ad;
        timeOutline = module.ae;
        pricetagOutline = module.be;
        IonTitle = module.j;
        IonBadge = module.a_;
        alertCircleOutline = module.bf;
        hourglassOutline = module.bg;
        helpOutline = module.bh;
        IonButton = module.d;
        IonFooter = module.o;
        personOutline = module.aQ;
        IonToolbar = module.i;
        useIonToast = module.a9;
        useIonRouter = module.aj;
      }, module => {
        APPOINTMENT_STATUS_LABELS = module.A;
        AppointmentStatus = module.a;
      }, module => {
        getClientFormFields = module.g;
        getAdministrationClientFormFields = module.a;
        ClientDataModal = module.C;
      }, null, null, null],
      execute: function () {
        exports("default", ConfirmReservationPage);
        function ConfirmReservation({
          reservationHash
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: reservationResponse,
            isLoading: isReservationLoading
          } = useGetOneFeReservationQuery({
            locationSlug: activeLocation,
            reservationHash
          });
          const reservationData = reservationResponse?.data;
          if (isReservationLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (!reservationData || !reservationData.dateUtc) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              color: "danger",
              children: t("Došlo je do greške!")
            });
          }
          const date = parseISO(reservationData.dateUtc);
          const dateFormatted = format(date, "dd.MM.yyyy");
          const timeFormatted = fromUtcDateTimeToTime(date);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center justify-center gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(LazyLoadImgStandard, {
                    src: getPathBySize(reservationData.locationWorker?.avatar?.pathByResolution),
                    preloadImg: preloadCoverImg,
                    className: "h-16 w-16 rounded-full object-cover flex-shrink-0"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "text-lg font-semibold mb-0 flex items-center",
                    children: reservationData.locationWorker?.fullName
                  })]
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "border-2 rounded-2xl border-amber-300 text-md text-center py-2",
                  children: reservationData.friendlyCode || reservationData.hash
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: calendarClearOutline,
                    className: "mr-2"
                  }), t("Status")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  className: `flex items-center h-full ${reservationData.status === AppointmentStatus.CONFIRMED ? "text-green-500" : reservationData.status === AppointmentStatus.CANCELLED || reservationData.status === AppointmentStatus.NO_SHOW ? "text-red-500" : ""}`,
                  children: t(APPOINTMENT_STATUS_LABELS[reservationData.status])
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: calendarOutline,
                    className: "mr-2"
                  }), t("Datum")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                className: "flex items-center",
                children: dateFormatted
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: timeOutline,
                    className: "mr-2"
                  }), t("Vreme")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                className: "flex items-center",
                children: timeFormatted
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: pricetagOutline,
                    className: "mr-2"
                  }), t("Cena usluga")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                className: "flex items-center",
                children: [reservationData.originalCost && reservationData.discount && /* @__PURE__ */jsxRuntimeExports.jsx("s", {
                  className: "text-rose-600",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                    children: reservationData.originalCost
                  })
                }), " ", reservationData.servicesCost, " RSD"]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonTitle, {
                    children: [t("Usluge"), " [", reservationData.services?.length ?? 0, "]"]
                  })
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
                  slidesPerView: "auto",
                  spaceBetween: 12,
                  children: reservationData.services?.map(service => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                    style: {
                      width: "auto"
                    },
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonBadge, {
                      className: "p-2",
                      color: "warning",
                      children: [service.title, service.pivot?.quantity && service.pivot.quantity > 1 ? ` x${service.pivot?.quantity}` : ""]
                    })
                  }, service.id))
                })
              })
            }), reservationData.notice && /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  color: "warning",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: alertCircleOutline,
                    className: "mr-2"
                  }), t("Napomena")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                className: "flex items-center",
                children: reservationData.notice
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: hourglassOutline,
                    className: "mr-2"
                  }), t("Trajanje usluga")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                className: "flex items-center",
                children: [reservationData.servicesDuration, " min"]
              })]
            }), reservationData.reason && /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: helpOutline,
                    className: "mr-2",
                    color: "danger"
                  }), t("Razlog")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                className: "flex items-center",
                children: reservationData.reason
              })]
            })]
          });
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
          useTranslation();
          const form = useFormWithSchema(schema$1, {
            defaultValues: {
              id: clientData?.id ?? null,
              fullName: clientData?.fullName ?? "",
              phoneNumber: clientData?.phoneNumber ?? "",
              dateOfBirth: clientData?.dateOfBirth ?? null
            }
          });
          const {
            handleSubmit
          } = form;
          const formFields = getClientFormFields(disabledPhoneNumber ?? false, formDisabled);
          const firstName = form.watch("fullName");
          const phoneNumber = form.watch("phoneNumber");
          const onSubmit = data => {
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
            if (clientData) {
              form.setValue("id", clientData.id ?? null);
              form.setValue("fullName", clientData.fullName);
              form.setValue("phoneNumber", clientData.phoneNumber);
              form.setValue("dateOfBirth", clientData.dateOfBirth ?? null);
            }
          }, [clientData]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: handleSubmit(onSubmit),
            onClick: scrollToBottom ? handleForm : void 0,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form
            }), showSaveButton && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              type: "submit",
              color: "success",
              children: t("Sačuvaj")
            })]
          });
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
          const {
            handleSubmit,
            watch
          } = form;
          const clientId = watch("id");
          const clientOptions = reactExports.useMemo(() => clients.map(client => ({
            value: client.id?.toString() ?? "",
            text: `${client.fullName} - ${client.phoneNumber}`
          })) ?? [], [clients]);
          const formFields = getAdministrationClientFormFields(disabledPhoneNumber ?? false, clientOptions, () => {});
          reactExports.useEffect(() => {
            if (!clientId) {
              setSelectedClientData(void 0);
              return;
            }
            const existingClient = clients.find(client => client.id?.toString() === clientId);
            if (existingClient) {
              setSelectedClientData(existingClient);
              onSave({
                id: existingClient.id ?? null,
                fullName: existingClient.fullName,
                phoneNumber: existingClient.phoneNumber,
                dateOfBirth: existingClient.dateOfBirth ?? null
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
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [selectedClientData && /* @__PURE__ */jsxRuntimeExports.jsx(ClientForm, {
              onSave,
              clientData: selectedClientData
            }), /* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form
            })]
          });
        }
        function EditClient({
          onSave,
          scrollToBottom,
          editDisabled,
          showSaveButton
        }) {
          const {
            data: clientsResponse,
            isLoading: isClientDataLoading
          } = useGetFeLocationClientsQuery({
            locationSlug: activeLocation
          });
          const clients = clientsResponse?.data ?? [];
          const {
            isOwnerOrWorker
          } = useUser();
          const {
            data: clientResponse
          } = useGetFeClientDataQuery(void 0, {
            skip: !!isOwnerOrWorker
          });
          const clientData = clientResponse?.data;
          if (isClientDataLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (isOwnerOrWorker) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(AdministrationClientForm, {
              onSave,
              clients
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(ClientForm, {
            onSave,
            clientData,
            scrollToBottom,
            formDisabled: editDisabled,
            showSaveButton
          });
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
          const {
            t
          } = useTranslation();
          if (isLoadingReservation) {
            return null;
          }
          const hasMultipleActions = !(isReservationInPast && !isOwnerOrWorkerOrAdmin) || !!reservationStatus && reservationStatus !== AppointmentStatus.CONFIRMED;
          const justifyActions = hasMultipleActions ? "justify-between" : "justify-center";
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonFooter, {
            className: "bg-black",
            children: [client && client.id ? /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              button: true,
              routerLink: `${urlPrefix}/public-profile/${client.id}`,
              className: "text-blue-400",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: personOutline
                }), client.fullName, " - ", client.phoneNumber]
              })
            }) : /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
              condition: !existingClient && !isOwnerOrWorker,
              render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                button: true,
                color: "dark",
                className: "text-amber-400 animate-bounce",
                onClick: onShowClientModal,
                children: t("Popunite podatke o vama")
              }),
              renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(EditClient, {
                  onSave: onClientDataChange,
                  scrollToBottom: true
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
              condition: !(isReservationInPast && !isOwnerOrWorkerOrAdmin),
              render: () => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: `flex items-center ${justifyActions} w-full pb-2`,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                  condition: isReservationInPast && isOwnerOrWorkerOrAdmin,
                  render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    color: "danger",
                    onClick: onNoShowClick || onCancelClick,
                    disabled: !validUser || disableCancel,
                    children: t("Nije se pojavio")
                  }),
                  renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                    condition: !isReservationInPast,
                    render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                      slot: "start",
                      color: "danger",
                      size: "default",
                      onClick: onCancelClick,
                      disabled: !validUser || disableCancel,
                      children: t("Otkaži")
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                  condition: !!reservationStatus && reservationStatus !== AppointmentStatus.CONFIRMED,
                  render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    slot: "end",
                    color: "success",
                    size: "default",
                    className: "text-white",
                    disabled: !validUser || disableCancel,
                    onClick: () => {
                      if (clientExists) {
                        onConfirmClick();
                      } else {
                        onShowClientModal();
                      }
                    },
                    children: t("Potvrdi")
                  })
                })]
              })
            })]
          });
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
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ClientDataModal, {
              isOpen: showClientModal,
              onCancel: onClientCancel,
              onSave: onClientSave,
              saveLabel: saveLabel || t("Sačuvaj i potvrdi"),
              initialData: existingClient
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonAlertConfirmation, {
              confirmAction: isNoShow ? onNoShowConfirm || onCancelConfirm : onCancelConfirm,
              isOpen: showCancelConfirmation,
              message: isNoShow ? t("Da li ste sigurni da klijent nije došao na rezervaciju?") : t("Da li ste sigurni da želite da otkažete rezervaciju?"),
              confirmCssClass: isNoShow ? "!text-orange-600" : "!text-rose-600",
              onDidDismiss: onCancelDismiss,
              inputs: [{
                name: "reason",
                type: "text",
                placeholder: isNoShow ? t("Unesite napomenu (opciono)") : t("Unesite razlog otkazivanja")
              }]
            })]
          });
        }
        function ConfirmReservationPage({
          match
        }) {
          const {
            t
          } = useTranslation();
          const hash = match.params.reservationHash;
          const [clientData, setClientData] = reactExports.useState(void 0);
          const [showSuccessToast] = useIonToast();
          const {
            push,
            goBack
          } = useIonRouter();
          const {
            isOwnerOrWorker,
            isAdmin,
            userData
          } = useUser();
          const [showCancelConfirmation, setShowCancelConfirmation] = reactExports.useState(false);
          const [showClientModal, setShowClientModal] = reactExports.useState(false);
          const {
            data: queryParams
          } = useQueryParamsHook({});
          const hasBackToHome = queryParams["backToHome"] ?? false;
          const [updateReservation, updateReservationResult] = useUpdateFeReservationMutation();
          const {
            data: reservationResponse,
            isLoading: isReservationLoading
          } = useGetOneFeReservationQuery({
            locationSlug: activeLocation,
            reservationHash: hash
          });
          const reservationData = reservationResponse?.data;
          const clientExists = !!clientData?.fullName && !!clientData?.phoneNumber;
          const existingClient = reservationData?.client;
          const goToAppointments = () => {
            push(`${urlPrefix}/t/termini`, "back");
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
            }).then(result => {
              if ("data" in result && result.data?.success) {
                goToAppointments();
                showSuccessToast({
                  message: t("Rezervacija je uspešno potvrđena"),
                  duration: 3e3,
                  color: "success"
                });
              }
            });
          };
          const handleCancel = data => {
            updateReservation({
              locationSlug: activeLocation,
              reservationHash: hash,
              status: AppointmentStatus.CANCELLED,
              reason: data?.reason
            }).then(result => {
              if ("data" in result && result.data?.success) {
                goToAppointments();
                showSuccessToast({
                  message: t("Rezervacija je uspešno otkazana"),
                  duration: 3e3,
                  color: "danger"
                });
              }
            });
            showCancelConfirmation && setShowCancelConfirmation(false);
          };
          const handleNoShow = data => {
            updateReservation({
              locationSlug: activeLocation,
              reservationHash: hash,
              status: AppointmentStatus.NO_SHOW,
              reason: data?.reason
            }).then(result => {
              if ("data" in result && result.data?.success) {
                goToAppointments();
                showSuccessToast({
                  message: t('Rezervacija je označena kao "Nije se pojavio"'),
                  duration: 3e3,
                  color: "warning"
                });
              }
            });
            showCancelConfirmation && setShowCancelConfirmation(false);
          };
          const isReservationInPast = reservationData?.dateUtc && reservationData?.servicesDuration ? isPast(addMinutes(parseISO(reservationData.dateUtc), reservationData.servicesDuration)) : false;
          const validUser = isOwnerOrWorker || !reservationData?.client || userData?.id === reservationData.client.userId;
          const handleClientData = data => {
            setClientData(data);
          };
          const disableCancel = reservationData && (reservationData.status === AppointmentStatus.CANCELLED || reservationData.status === AppointmentStatus.NO_SHOW);
          const handleClientModalSave = data => {
            setClientData(data);
            setShowClientModal(false);
            handleConfirm();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(LayoutMainPage, {
            title: t("Potvrda rezervacije"),
            titleSlot: "start",
            hasBackButton: true,
            backButtonUrl: hasBackToHome ? `${urlPrefix}/t/termini` : void 0,
            showLoadingMessage: updateReservationResult.isLoading,
            footer: /* @__PURE__ */jsxRuntimeExports.jsx(ReservationFooter, {
              client: reservationData?.client ?? void 0,
              existingClient: existingClient ?? void 0,
              isOwnerOrWorker,
              validUser,
              disableCancel: !!disableCancel,
              clientExists,
              reservationStatus: reservationData?.status,
              isLoadingReservation: isReservationLoading,
              isReservationInPast,
              isOwnerOrWorkerOrAdmin: isOwnerOrWorker || isAdmin,
              onClientDataChange: handleClientData,
              onShowClientModal: () => setShowClientModal(true),
              onCancelClick: () => setShowCancelConfirmation(true),
              onNoShowClick: () => setShowCancelConfirmation(true),
              onConfirmClick: handleConfirm
            }),
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConfirmReservation$1, {
              reservationHash: hash
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ReservationActions, {
              showCancelConfirmation,
              showClientModal,
              existingClient: existingClient ?? void 0,
              saveLabel: t("Sačuvaj i potvrdi"),
              isNoShow: isReservationInPast && (isOwnerOrWorker || isAdmin),
              onCancelConfirm: handleCancel,
              onNoShowConfirm: handleNoShow,
              onCancelDismiss: () => setShowCancelConfirmation(false),
              onClientSave: handleClientModalSave,
              onClientCancel: () => setShowClientModal(false)
            })]
          });
        }
      }
    };
  });
})();
