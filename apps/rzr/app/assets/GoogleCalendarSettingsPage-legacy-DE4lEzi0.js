;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './index-legacy-BVEqw4ar.js', './vendor_leaflet-legacy-Dzs4-G2p.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, useGoogleLogin, jsxRuntimeExports, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonIcon, calendarOutline, IonCardContent, IonItem, IonLabel, IonButton, refreshOutline, IonToggle, IonText, IonAlert, rzrApi, TagType;
    return {
      setters: [module => {
        useTranslation = module.M;
        reactExports = module.e;
        useGoogleLogin = module.bc;
        jsxRuntimeExports = module.j;
      }, module => {
        IonSpinner = module.o;
        IonCard = module.b2;
        IonCardHeader = module.b4;
        IonCardTitle = module.b5;
        IonIcon = module.b;
        calendarOutline = module.ag;
        IonCardContent = module.b3;
        IonItem = module.r;
        IonLabel = module.G;
        IonButton = module.d;
        refreshOutline = module.an;
        IonToggle = module.af;
        IonText = module.m;
        IonAlert = module.aB;
      }, module => {
        rzrApi = module.t;
        TagType = module.v;
      }, null],
      execute: function () {
        exports("default", GoogleCalendarSettingsPage);
        const googleCalendarApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getGoogleCalendarSettings: builder.query({
              query: () => ({
                url: "locations/google-calendar/settings",
                method: "GET"
              }),
              providesTags: [{
                type: TagType.USER,
                id: "google-calendar-settings"
              }]
            }),
            connectGoogleCalendar: builder.mutation({
              query: body => ({
                url: "locations/google-calendar/connect",
                method: "POST",
                body
              }),
              invalidatesTags: [{
                type: TagType.USER,
                id: "google-calendar-settings"
              }]
            }),
            updateGoogleCalendarSettings: builder.mutation({
              query: settings => ({
                url: "locations/google-calendar/settings",
                method: "PUT",
                body: settings
              }),
              invalidatesTags: [{
                type: TagType.USER,
                id: "google-calendar-settings"
              }]
            }),
            syncGoogleCalendar: builder.mutation({
              query: () => ({
                url: "locations/google-calendar/sync",
                method: "POST"
              }),
              invalidatesTags: [{
                type: TagType.RESERVATION,
                id: "LIST"
              }, {
                type: TagType.USER,
                id: "google-calendar-settings"
              }]
            }),
            getGoogleCalendarEvents: builder.query({
              query: ({
                limit = 20
              } = {}) => ({
                url: "locations/google-calendar/events?limit=" + limit,
                method: "GET"
              }),
              providesTags: [{
                type: TagType.USER,
                id: "google-calendar-events"
              }]
            })
          })
        });
        const {
          useGetGoogleCalendarSettingsQuery,
          useConnectGoogleCalendarMutation,
          useUpdateGoogleCalendarSettingsMutation,
          useSyncGoogleCalendarMutation,
          useGetGoogleCalendarEventsQuery
        } = googleCalendarApi;
        function GoogleCalendarSettingsPage() {
          const {
            t
          } = useTranslation();
          const [showAlert, setShowAlert] = reactExports.useState(false);
          const [alertMessage, setAlertMessage] = reactExports.useState("");
          const {
            data: settingsResponse,
            isLoading
          } = useGetGoogleCalendarSettingsQuery();
          const [updateSettings] = useUpdateGoogleCalendarSettingsMutation();
          const [syncCalendar, {
            isLoading: isSyncing
          }] = useSyncGoogleCalendarMutation();
          const [connectCalendar, {
            isLoading: isConnecting
          }] = useConnectGoogleCalendarMutation();
          const {
            data: eventsResponse,
            isLoading: isEventsLoading
          } = useGetGoogleCalendarEventsQuery({
            limit: 20
          });
          const settings = settingsResponse?.data || {
            syncToCalendar: true,
            syncFromCalendar: true,
            blockOverlappingSlots: true,
            allowOverlappingWithApproval: false,
            googleEmail: null,
            isConnected: false
          };
          const updateSetting = async (key, value) => {
            const newSettings = {
              ...settings,
              [key]: value
            };
            await updateSettings(newSettings);
          };
          const googleLogin = useGoogleLogin({
            onSuccess: async tokenResponse => {
              const result = await connectCalendar({
                accessToken: tokenResponse.access_token
              });
              if ("data" in result) {
                setAlertMessage(t("Google Calendar uspešno povezan!"));
              } else {
                setAlertMessage(t("Greška pri povezivanju Google Calendar-a"));
              }
              setShowAlert(true);
            },
            onError: () => {
              setAlertMessage(t("Greška pri autentifikaciji"));
              setShowAlert(true);
            },
            scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events"
          });
          const handleConnectOrSync = async () => {
            if (!settings.isConnected) {
              googleLogin();
              return;
            }
            const result = await syncCalendar();
            if ("data" in result) {
              setAlertMessage(t("Sinhronizacija je uspešno završena"));
            } else {
              setAlertMessage(t("Greška pri sinhronizaciji kalendara"));
            }
            setShowAlert(true);
          };
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding ion-text-center",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "ion-padding",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: calendarOutline
                  }), t("Podešavanja")]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                className: "ion-no-padding",
                children: [settings.googleEmail && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                      children: t("Status konekcije")
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                      children: [t("Povezan sa"), ": ", settings.googleEmail]
                    })]
                  })
                }), !settings.isConnected && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                  color: "warning",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                      children: t("Google Calendar nije povezan")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Molimo povežite vaš Google Calendar nalog da bi omogućili sinhronizaciju.")
                    })]
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    fill: "solid",
                    color: settings.isConnected ? "primary" : "success",
                    slot: "start",
                    onClick: handleConnectOrSync,
                    disabled: isSyncing || isConnecting,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: refreshOutline,
                      slot: "start"
                    }), isSyncing ? t("Sinhronizacija...") : isConnecting ? t("Povezivanje...") : settings.isConnected ? t("Sinhronizuj") : t("Poveži Google Calendar")]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                      children: settings.isConnected ? t("Sinhronizacija sa Google Calendar") : t("Povezivanje sa Google Calendar")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: settings.isConnected ? t("Kliknite da sinhronizujete rezervacije sa Google Calendar") : t("Kliknite da povežete vaš Google Calendar nalog")
                    })]
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Sinhronizuj u kalendar")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: settings.syncToCalendar,
                    onIonChange: e => updateSetting("syncToCalendar", e.detail.checked),
                    disabled: !settings.isConnected
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Sinhronizuj iz kalendara")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: settings.syncFromCalendar,
                    onIonChange: e => updateSetting("syncFromCalendar", e.detail.checked),
                    disabled: !settings.isConnected
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Blokiraj preklapajuće termine")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: settings.blockOverlappingSlots,
                    onIonChange: e => updateSetting("blockOverlappingSlots", e.detail.checked),
                    disabled: !settings.isConnected
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Dozvoli preklapanje uz odobrenje")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: settings.allowOverlappingWithApproval,
                    onIonChange: e => updateSetting("allowOverlappingWithApproval", e.detail.checked),
                    disabled: !settings.isConnected
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Ove opcije vam omogućavaju da kontrolišete kako se vaše rezervacije sinhronizuju sa Google Calendar.")
                    })
                  })
                }), settings.isConnected && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "ion-padding",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "primary",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                      children: t("Nedavni događaji iz Google Calendar")
                    })
                  }), isEventsLoading && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-text-center ion-padding",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
                  }), !isEventsLoading && eventsResponse?.data?.length === 0 && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Nema događaja za prikaz")
                    })
                  }), !isEventsLoading && eventsResponse?.data && eventsResponse.data.length > 0 && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "space-y-2",
                    children: eventsResponse.data.map(e => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      lines: "full",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                          children: e.summary || t("Bez naslova")
                        }), /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                          children: [new Date(e.startTimeUtc).toLocaleString(), " → ", new Date(e.endTimeUtc).toLocaleString()]
                        }), e.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          className: "ion-color-medium",
                          children: e.description
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          className: "ion-color-medium",
                          children: e.isExternal ? t("Eksterni događaj") : t("Rezervacija")
                        })]
                      })
                    }, e.id))
                  })]
                })]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonAlert, {
              isOpen: showAlert,
              onDidDismiss: () => setShowAlert(false),
              header: t("Obaveštenje"),
              message: alertMessage,
              buttons: [t("OK")]
            })]
          });
        }
      }
    };
  });
})();
