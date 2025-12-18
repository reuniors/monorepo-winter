;
(function () {
  System.register(['./vendor_react-legacy-BvXhJo_m.js', './UserAvatar-legacy-CLlHjpHm.js', './vendor_ionic-legacy-dqJd8vxA.js', './client-profile.fe-services-legacy-iVi9JZaQ.js', './client.services-legacy-Bvc7hz7-.js', './App-legacy-CvwW-QEB.js', './ClientDataModal-legacy-Cg9U15OQ.js', './statistics.fe-services-legacy-D6-MAUko.js', './Pagination-legacy-C0Hgdats.js', './index-legacy-S1xpwRMt.js', './vendor_leaflet-legacy-DGSDSOBP.js', './vendor_firebase-legacy-G_df00wk.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, parseISO, format, UserAvatar, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, calendarOutline, IonLabel, IonText, checkmarkCircleOutline, closeCircleOutline, timeOutline, walletOutline, IonButton, refreshOutline, IonAccordionGroup, IonAccordion, IonList, mailOutline, callOutline, personOutline, IonToggle, IonSelect, IonSelectOption, pencilOutline, useClipboard, useGetClientProfilesQuery, ClientStatistics, useGetFeClientDataQuery, useUpdateFeClientDataMutation, activeLocation, urlPrefix, useUser, useAppDispatch, useAppSelector, isPwa, isInstalled, isWebView, ConditionalComponent, ClientDataModal, useGetWorkerStatisticsQuery, Pagination, getDeviceData, setShowLoginModal, getSavedTheme, saveTheme, applyTheme, setDeviceData;
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
        closeCircleOutline = module.bt;
        timeOutline = module.ae;
        walletOutline = module.by;
        IonButton = module.d;
        refreshOutline = module.b1;
        IonAccordionGroup = module.bf;
        IonAccordion = module.bg;
        IonList = module.F;
        mailOutline = module.ah;
        callOutline = module.br;
        personOutline = module.aT;
        IonToggle = module.ac;
        IonSelect = module.w;
        IonSelectOption = module.x;
        pencilOutline = module.bF;
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
        useAppSelector = module.c;
        isPwa = module.i;
        isInstalled = module.a8;
        isWebView = module.a9;
        ConditionalComponent = module.C;
      }, module => {
        ClientDataModal = module.C;
      }, module => {
        useGetWorkerStatisticsQuery = module.a;
      }, module => {
        Pagination = module.P;
      }, module => {
        getDeviceData = module.k;
        setShowLoginModal = module.j;
        getSavedTheme = module.q;
        saveTheme = module.v;
        applyTheme = module.t;
        setDeviceData = module.l;
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
        function ClientSettingsCard({
          canUsePushOnThisDevice,
          notificationsEnabled,
          themeMode,
          remindersEnabled,
          onPushToggle,
          onThemeChange,
          onRemindersToggle
        }) {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            className: "mt-4",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                children: t("Podešavanja")
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              className: "ion-no-padding",
              children: [canUsePushOnThisDevice && /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "full",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Push notifikacije")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                  checked: notificationsEnabled,
                  onIonChange: e => onPushToggle(!!e.detail.checked)
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "full",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Tema")
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSelect, {
                  value: themeMode === null ? "system" : themeMode,
                  onIonChange: e => onThemeChange(e.detail.value === "system" ? "system" : e.detail.value),
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "light",
                    children: t("Svetla")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "dark",
                    children: t("Tamna")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "system",
                    children: t("Sistem")
                  })]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Podsetnik za rezervacije")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                  checked: remindersEnabled,
                  onIonChange: e => onRemindersToggle(!!e.detail.checked)
                })]
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
          const deviceData = useAppSelector(getDeviceData);
          const [isEditModalOpen, setIsEditModalOpen] = reactExports.useState(false);
          const [remindersEnabled, setRemindersEnabled] = reactExports.useState(false);
          const [themeMode, setThemeModeState] = reactExports.useState(null);
          const {
            data: clientData,
            isLoading
          } = useGetFeClientDataQuery();
          const [updateClient] = useUpdateFeClientDataMutation();
          if (!userData) {
            dispatch(setShowLoginModal(true));
            return null;
          }
          const handleEditSubmit = reactExports.useCallback(async formData => {
            await updateClient({
              fullName: formData.fullName || "",
              phoneNumber: formData.phoneNumber,
              dateOfBirth: formData.dateOfBirth || void 0
            });
            setIsEditModalOpen(false);
          }, [updateClient]);
          const handleCancel = reactExports.useCallback(() => {
            setIsEditModalOpen(false);
          }, []);
          const client = clientData?.data;
          const canUsePushOnThisDevice = isPwa || isInstalled || isWebView;
          reactExports.useEffect(() => {
            setThemeModeState(getSavedTheme());
          }, []);
          const handleThemeChange = value => {
            const newTheme = value === "system" ? null : value;
            saveTheme(newTheme);
            applyTheme(newTheme);
            setThemeModeState(newTheme);
          };
          const handlePushToggle = enabled => {
            dispatch(setDeviceData({
              notificationsEnabled: enabled
            }));
          };
          const handleRemindersToggle = enabled => {
            setRemindersEnabled(enabled);
          };
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
              }), client && /* @__PURE__ */jsxRuntimeExports.jsx(ClientSettingsCard, {
                canUsePushOnThisDevice,
                notificationsEnabled: deviceData.notificationsEnabled === true,
                themeMode,
                remindersEnabled,
                onPushToggle: handlePushToggle,
                onThemeChange: handleThemeChange,
                onRemindersToggle: handleRemindersToggle
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
