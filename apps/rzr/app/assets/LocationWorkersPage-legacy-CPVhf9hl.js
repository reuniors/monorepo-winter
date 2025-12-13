;
(function () {
  System.register(['./vendor_react-legacy-j-OXaHGn.js', './vendor_ionic-legacy-B27OJI2l.js', './App-legacy-C1PSXo8s.js', './vendor_leaflet-legacy-aVamlEE1.js', './index-legacy-DzaXWAZQ.js', './vendor_firebase-legacy-BLL9XPHC.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, IonCard, IonCardHeader, IonCardTitle, IonIcon, peopleOutline, IonCardContent, IonSpinner, IonList, IonItem, addOutline, IonLabel, IonAvatar, IonText, chevronForwardOutline, useGetAllWorkersQuery;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        IonCard = module.aT;
        IonCardHeader = module.aW;
        IonCardTitle = module.aX;
        IonIcon = module.l;
        peopleOutline = module.aF;
        IonCardContent = module.aU;
        IonSpinner = module.n;
        IonList = module.F;
        IonItem = module.q;
        addOutline = module.a6;
        IonLabel = module.E;
        IonAvatar = module.b7;
        IonText = module.c;
        chevronForwardOutline = module.$;
      }, module => {
        useGetAllWorkersQuery = module.G;
      }, null, null, null],
      execute: function () {
        exports("default", LocationWorkersPage);
        function LocationWorkersPage({
          locationSlug,
          onCreate,
          onEdit
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: workers,
            isLoading,
            isError
          } = useGetAllWorkersQuery({
            locationSlug
          });
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: peopleOutline
                    }), t("Radnici")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex justify-center p-8",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
                }) : isError ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center p-8 text-red-500",
                  children: t("Greška pri učitavanju radnika.")
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    onClick: onCreate,
                    color: "primary",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: t("Dodaj radnika")
                    })]
                  }), !workers?.data?.length ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "text-center p-8 text-gray-500",
                    children: t("Nema radnika za ovu lokaciju.")
                  }) : /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                    children: workers.data.map(worker => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      button: true,
                      onClick: () => onEdit?.(worker),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
                        slot: "start",
                        className: "w-12 h-12",
                        children: worker.avatar ? /* @__PURE__ */jsxRuntimeExports.jsx("img", {
                          src: worker.avatar.path,
                          alt: `${worker.firstName} ${worker.lastName}`
                        }) : /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                          className: "w-full h-full bg-gray-300 rounded-full flex items-center justify-center",
                          children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                            icon: peopleOutline,
                            className: "text-gray-600"
                          })
                        })
                      }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsxs("h2", {
                          className: "font-semibold truncate",
                          children: [worker.firstName, " ", worker.lastName]
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                            color: worker.active ? "success" : "medium",
                            className: "text-sm",
                            children: worker.active ? t("Aktivan") : t("Neaktivan")
                          })
                        })]
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: chevronForwardOutline,
                        slot: "end"
                      })]
                    }, worker.id))
                  })]
                })
              })]
            })
          });
        }
      }
    };
  });
})();
