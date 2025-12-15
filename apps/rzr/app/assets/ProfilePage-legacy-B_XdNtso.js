;
(function () {
  System.register(['./vendor_react-legacy-VZwyi0Js.js', './UserAvatar-legacy-BnhNXGU_.js', './vendor_ionic-legacy-DGRHWrdu.js', './client-profile.fe-services-legacy-nYcqQyVF.js', './client.services-legacy-C6vIiYB3.js', './App-legacy-Ca-wFRma.js', './ClientDataModal-legacy-DnuIQOip.js', './statistics.fe-services-legacy-DRQQAHvv.js', './Pagination-legacy-BwJV4Kku.js', './index-legacy-Bqvn9yKL.js', './vendor_leaflet-legacy-CfYyL1ry.js', './vendor_firebase-legacy-BVpRmQ4X.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, parseISO, format, UserAvatar, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, calendarOutline, IonLabel, IonText, checkmarkCircleOutline, closeCircleOutline, timeOutline, walletOutline, IonButton, refreshOutline, IonAccordionGroup, IonAccordion, IonList, mailOutline, callOutline, personOutline, pencilOutline, useClipboard, useGetClientProfilesQuery, ClientStatistics, useGetFeClientDataQuery, useUpdateFeClientDataMutation, activeLocation, urlPrefix, useUser, useAppDispatch, ConditionalComponent, ClientDataModal, useGetWorkerStatisticsQuery, Pagination, setShowLoginModal;
    return {
      setters: [module => {
        reactExports = module.e;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        parseISO = module.av;
        format = module.ay;
      }, module => {
        UserAvatar = module.U;
      }, module => {
        IonSpinner = module.n;
        IonCard = module.aX;
        IonCardHeader = module.aZ;
        IonCardTitle = module.a_;
        IonCardContent = module.aY;
        IonItem = module.q;
        IonIcon = module.l;
        calendarOutline = module.ad;
        IonLabel = module.E;
        IonText = module.c;
        checkmarkCircleOutline = module.a$;
        closeCircleOutline = module.bs;
        timeOutline = module.ae;
        walletOutline = module.bx;
        IonButton = module.d;
        refreshOutline = module.b1;
        IonAccordionGroup = module.be;
        IonAccordion = module.bf;
        IonList = module.F;
        mailOutline = module.ah;
        callOutline = module.bq;
        personOutline = module.aT;
        pencilOutline = module.bC;
      }, module => {
        useClipboard = module.u;
        useGetClientProfilesQuery = module.b;
        ClientStatistics = module.C;
      }, module => {
        useGetFeClientDataQuery = module.u;
        useUpdateFeClientDataMutation = module.b;
      }, module => {
        activeLocation = module.k;
        urlPrefix = module.f;
        useUser = module.b;
        useAppDispatch = module.a;
        ConditionalComponent = module.C;
      }, module => {
        ClientDataModal = module.C;
      }, module => {
        useGetWorkerStatisticsQuery = module.a;
      }, module => {
        Pagination = module.P;
      }, module => {
        setShowLoginModal = module.j;
      }, null, null],
      execute: function () {
        exports("default", ProfilePage);
        const formatDate = dateString => {
          if (!dateString) return null;
          try {
            const date = parseISO(dateString);
            return format(date, "dd.MM.yyyy HH:mm");
          } catch (e) {
            return dateString;
          }
        };
        const formatPrice = price => {
          return new Intl.NumberFormat("sr-RS").format(price);
        };
        function WorkerStatistics({
          workerId,
          locationSlug
        }) {
          const [forceUpdate, setForceUpdate] = reactExports.useState(0);
          const {
            t
          } = useTranslation();
          const {
            data,
            isLoading
          } = useGetWorkerStatisticsQuery({
            workerId,
            locationSlug,
            forceUpdate
          });
          const handleForceRefresh = reactExports.useCallback(() => {
            setForceUpdate(prev => prev + 1);
          }, []);
          if (isLoading) return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
          if (!data) return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            children: t("N/A")
          });
          const formattedLastVisit = formatDate(data.data?.data?.lastVisit);
          const formattedCostSum = formatPrice(data.data?.data?.costSum || 0);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-left",
                  children: t("Statistika radnika")
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: calendarOutline,
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [t("Ukupno rezervacija"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "primary",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("strong", {
                      children: data.data?.data?.totalReservations || 0
                    })
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: checkmarkCircleOutline,
                  slot: "start",
                  color: "success"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [t("Potvrđene rezervacije"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "success",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("strong", {
                      children: data.data?.data?.confirmedReservationsCount || 0
                    })
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: closeCircleOutline,
                  slot: "start",
                  color: "danger"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [t("Otkazane rezervacije"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "danger",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("strong", {
                      children: data.data?.data?.canceledReservationsCount || 0
                    })
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: timeOutline,
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [t("Poslednja usluga"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("strong", {
                      children: formattedLastVisit || t("N/A")
                    })
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: walletOutline,
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [t("Ukupan iznos korišćenih usluga"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "primary",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs("strong", {
                      children: [formattedCostSum, " RSD"]
                    })
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-text-center ion-padding-top",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  fill: "clear",
                  onClick: handleForceRefresh,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: refreshOutline,
                    slot: "start"
                  }), t("Osveži")]
                })
              })]
            })]
          });
        }
        const ITEMS_PER_PAGE = 10;
        function ClientProfilesList() {
          const {
            t
          } = useTranslation();
          const [currentPage, setCurrentPage] = reactExports.useState(1);
          const {
            setValue: copyToClipboard
          } = useClipboard();
          const {
            data,
            isLoading
          } = useGetClientProfilesQuery({
            locationSlug: activeLocation,
            page: currentPage,
            perPage: ITEMS_PER_PAGE
          });
          const handleEmailClick = email => {
            if (email) {
              copyToClipboard(email);
            }
          };
          const handlePhoneClick = phoneNumber => {
            if (phoneNumber) {
              window.location.href = `tel:${phoneNumber}`;
            }
          };
          if (isLoading) return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
          if (!data?.data) return null;
          const totalPages = Math.ceil(data.total / ITEMS_PER_PAGE);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                children: t("Lista klijenata")
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAccordionGroup, {
                children: data.data.map(client => /* @__PURE__ */jsxRuntimeExports.jsxs(IonAccordion, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    slot: "header",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: client.fullName
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                      className: "ion-text-end flex items-center",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: calendarOutline,
                        className: "mr-1"
                      }), client.confirmedReservationsCount]
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                    slot: "content",
                    className: "ion-padding",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      lines: "none",
                      button: !!(client.email || client.user?.email),
                      onClick: () => handleEmailClick(client.email || client.user?.email || ""),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: mailOutline,
                        slot: "start"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: client.email || client.user?.email || t("Nije uneto")
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      lines: "none",
                      button: !!client.phoneNumber,
                      onClick: () => handlePhoneClick(client.phoneNumber || ""),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: callOutline,
                        slot: "start"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: client.phoneNumber || t("Nije uneto")
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "ion-text-center ion-padding-top",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                        fill: "clear",
                        routerLink: `${urlPrefix}/public-profile/${client.id}`,
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: personOutline,
                          slot: "start"
                        }), t("Profil")]
                      })
                    })]
                  })]
                }, client.id))
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
                currentPage,
                totalPages,
                onPageChange: setCurrentPage,
                isLoading,
                className: "ion-padding-top"
              })]
            })]
          });
        }
        function Profile() {
          const {
            t
          } = useTranslation();
          const {
            userData,
            isOwnerOrWorker,
            isAdmin
          } = useUser();
          const dispatch = useAppDispatch();
          const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
          const {
            data: clientData,
            isLoading
          } = useGetFeClientDataQuery();
          const [updateClient] = useUpdateFeClientDataMutation();
          if (!userData) {
            dispatch(setShowLoginModal(true));
            return null;
          }
          const handleEditSubmit = async formData => {
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
          const client = clientData?.data;
          reactExports.useEffect(() => {
            if (isLoading) {
              return;
            }
            if (!client || client.phoneNumber?.length === 0) {
              setIsEditModalOpen(true);
            }
          }, [clientData?.data, client?.phoneNumber, isLoading]);
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                  className: "ion-text-left",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                    className: "ion-padding-top flex items-center justify-between",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "ion-padding-left flex items-center",
                      children: [client?.fullName && /* @__PURE__ */jsxRuntimeExports.jsx(UserAvatar, {
                        fullName: client.fullName,
                        size: 30
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                        className: "ion-padding-left ml-2",
                        children: client?.fullName || t("Nije uneto")
                      })]
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      lines: "none",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: mailOutline,
                        slot: "start"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: userData.email
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      lines: "none",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: callOutline,
                        slot: "start"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: client?.phoneNumber || t("Nije uneto")
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      lines: "none",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: calendarOutline,
                        slot: "start"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: client?.dateOfBirth || t("Nije unet datum rođenja")
                      })]
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-text-center ion-padding-top",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      onClick: () => setIsEditModalOpen(true),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: pencilOutline,
                        slot: "start"
                      }), t("Uredi profil")]
                    })
                  })]
                })]
              }), activeLocation && client && /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                condition: isOwnerOrWorker ?? false,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(WorkerStatistics, {
                  workerId: userData.id || 0,
                  locationSlug: activeLocation
                }),
                renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx(ClientStatistics, {
                  clientId: client.id || 0,
                  locationSlug: activeLocation
                })
              }), (isOwnerOrWorker || isAdmin) && /* @__PURE__ */jsxRuntimeExports.jsx(ClientProfilesList, {})]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ClientDataModal, {
              isOpen: isEditModalOpen,
              onCancel: handleCancel,
              onSave: handleEditSubmit,
              initialData: client
            })]
          });
        }
        function ProfilePage() {
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(Profile, {})
          });
        }
      }
    };
  });
})();
