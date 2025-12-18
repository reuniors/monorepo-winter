;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './vendor_ionic-legacy-DYIGQWbn.js', './statistics.fe-services-legacy-BulykTj4.js', './index-legacy-CCqKsr5S.js', './App-legacy-CrNw61cU.js'], function (exports, module) {
    'use strict';

    var reactExports, Clipboard, useTranslation, jsxRuntimeExports, parseISO, format, useIonToast, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, calendarOutline, IonLabel, IonText, checkmarkCircleOutline, closeCircleOutline, timeOutline, walletOutline, IonButton, refreshOutline, useGetClientStatisticsQuery, rzrApi, transformStandardResponseToCamelCase, transformPaginationResponseToCamelCase;
    return {
      setters: [module => {
        reactExports = module.e;
        Clipboard = module.ba;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        parseISO = module.av;
        format = module.ay;
      }, module => {
        useIonToast = module.a9;
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
      }, module => {
        useGetClientStatisticsQuery = module.u;
      }, module => {
        rzrApi = module.r;
      }, module => {
        transformStandardResponseToCamelCase = module.A;
        transformPaginationResponseToCamelCase = module.a2;
      }],
      execute: function () {
        exports({
          C: ClientStatistics,
          u: useClipboard
        });
        function useClipboard() {
          const [data, setData] = reactExports.useState();
          const [showCopyMessage] = useIonToast();
          async function getValue() {
            const ret = await Clipboard.read();
            setData(ret.value);
            return ret.value;
          }
          async function setValue(value) {
            await Clipboard.write({
              string: value
            });
            showCopyMessage({
              message: "Kopirano: " + value,
              duration: 1e3
            });
          }
          return {
            value: data,
            getValue,
            setValue
          };
        }
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
        function ClientStatistics({
          clientId,
          locationSlug
        }) {
          const [forceUpdate, setForceUpdate] = reactExports.useState(0);
          const {
            t
          } = useTranslation();
          const {
            data,
            isLoading
          } = useGetClientStatisticsQuery({
            clientId,
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
                  children: t("Statistika")
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
                    color: "warning",
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
                  children: [t("Poslednja poseta"), ":", " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
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
        const clientProfileApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getClientProfiles: builder.query({
              query: ({
                locationSlug,
                page = 1,
                perPage = 10
              }) => ({
                url: `/workers/clients`,
                method: "GET",
                params: {
                  locationSlug,
                  page,
                  perPage
                }
              }),
              transformResponse: transformPaginationResponseToCamelCase
            }),
            getWorkerClientData: builder.query({
              query: ({
                clientId
              }) => ({
                url: `/workers/client`,
                method: "GET",
                params: {
                  clientId
                }
              }),
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useGetClientProfilesQuery,
          useGetWorkerClientDataQuery
        } = clientProfileApi;
        exports({
          b: useGetClientProfilesQuery,
          a: useGetWorkerClientDataQuery
        });
      }
    };
  });
})();
