;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './vendor_ionic-legacy-DYIGQWbn.js', './statistics.fe-services-legacy-uvt8IxGs.js', './App-legacy-D5D6TSxV.js', './vendor_leaflet-legacy-DKuaEqMF.js', './index-legacy-D1XlU8IL.js', './vendor_firebase-legacy-Bicf26rb.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, refreshOutline, IonCardContent, IonItem, calendarOutline, IonLabel, IonText, checkmarkCircleOutline, closeCircleOutline, peopleOutline, personOutline, walletOutline, useGetLocationStatisticsQuery, activeLocation;
    return {
      setters: [module => {
        reactExports = module.e;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        IonSpinner = module.n;
        IonCard = module.aX;
        IonCardHeader = module.aZ;
        IonCardTitle = module.a_;
        IonButton = module.d;
        IonIcon = module.l;
        refreshOutline = module.b1;
        IonCardContent = module.aY;
        IonItem = module.q;
        calendarOutline = module.ad;
        IonLabel = module.E;
        IonText = module.c;
        checkmarkCircleOutline = module.a$;
        closeCircleOutline = module.bs;
        peopleOutline = module.aH;
        personOutline = module.aT;
        walletOutline = module.bx;
      }, module => {
        useGetLocationStatisticsQuery = module.b;
      }, module => {
        activeLocation = module.k;
      }, null, null, null],
      execute: function () {
        exports("default", OwnerHomePage);
        const formatPrice = price => {
          return new Intl.NumberFormat("sr-RS", {
            style: "currency",
            currency: "RSD"
          }).format(price);
        };
        function LocationStatistics({
          locationSlug
        }) {
          const [forceUpdate, setForceUpdate] = reactExports.useState(0);
          const {
            t
          } = useTranslation();
          const {
            data,
            isLoading
          } = useGetLocationStatisticsQuery({
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
          const formattedCostSum = formatPrice(data.data?.data?.costSum || 0);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "text-left flex items-center justify-between",
                  children: [t("Statistika"), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "clear",
                    size: "small",
                    onClick: handleForceRefresh,
                    disabled: isLoading,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: refreshOutline
                    })
                  })]
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: calendarOutline,
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Ukupno rezervacija")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  children: data.data?.data?.totalReservations || 0
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: checkmarkCircleOutline,
                  slot: "start",
                  color: "success"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Potvrđene rezervacije")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  color: "success",
                  children: data.data?.data?.confirmedReservationsCount || 0
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: closeCircleOutline,
                  slot: "start",
                  color: "danger"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Otkazane rezervacije")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  color: "danger",
                  children: data.data?.data?.canceledReservationsCount || 0
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: peopleOutline,
                  slot: "start",
                  color: "primary"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Ukupno radnika")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  color: "primary",
                  children: data.data?.data?.totalWorkers || 0
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: personOutline,
                  slot: "start",
                  color: "secondary"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Ukupno klijenata")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  color: "secondary",
                  children: data.data?.data?.totalClients || 0
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: walletOutline,
                  slot: "start",
                  color: "warning"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Ukupan prihod")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  slot: "end",
                  className: "font-bold",
                  color: "warning",
                  children: formattedCostSum
                })]
              })]
            })]
          });
        }
        function OwnerHomePage() {
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: activeLocation && /* @__PURE__ */jsxRuntimeExports.jsx(LocationStatistics, {
              locationSlug: activeLocation
            })
          });
        }
      }
    };
  });
})();
