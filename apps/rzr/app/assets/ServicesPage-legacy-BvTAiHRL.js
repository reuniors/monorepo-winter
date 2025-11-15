;
(function () {
  System.register(['./vendor_react-legacy-C8AS9NmP.js', './vendor_ionic-legacy-CuGnV08n.js', './App-legacy-7GAegB_G.js', './vendor_leaflet-legacy-B9TijiPT.js', './index-legacy-C87uIFki.js', './vendor_firebase-legacy-CxYHnyKv.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonSpinner, IonText, IonCard, IonCardHeader, IonCardTitle, IonIcon, settingsOutline, IonCardContent, IonList, IonItem, addOutline, IonLabel, IonReorderGroup, IonReorder, useGetFeServiceGroupsQuery, activeLocation, useUpdateServiceGroupMutation, ShowLoading, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.aC;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        IonSpinner = module.l;
        IonText = module.u;
        IonCard = module.aC;
        IonCardHeader = module.aD;
        IonCardTitle = module.aK;
        IonIcon = module.i;
        settingsOutline = module.aZ;
        IonCardContent = module.aE;
        IonList = module.E;
        IonItem = module.o;
        addOutline = module.a6;
        IonLabel = module.D;
        IonReorderGroup = module.a4;
        IonReorder = module.Y;
      }, module => {
        useGetFeServiceGroupsQuery = module.w;
        activeLocation = module.h;
        useUpdateServiceGroupMutation = module.x;
        ShowLoading = module.y;
        urlPrefix = module.e;
      }, null, null, null],
      execute: function () {
        exports("default", ServicesPage);
        function ServicesPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [sortMode, setSortMode] = reactExports.useState(false);
          const {
            data: serviceGroupsResponse,
            isLoading,
            error,
            refetch
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
          const serviceGroups = serviceGroupsResponse?.data || [];
          const serviceGroupsSorted = [...serviceGroups].sort((a, b) => {
            if (a.sortOrder < b.sortOrder) return -1;
            if (a.sortOrder > b.sortOrder) return 1;
            return 0;
          });
          const handleServiceGroupClick = serviceGroupId => {
            router.push(`${urlPrefix}/podesavanja/usluge/groups/${serviceGroupId}`);
          };
          const handleReorder = event => {
            const serviceGroupFrom = serviceGroupsSorted[event.detail.from];
            const serviceGroupTo = serviceGroupsSorted[event.detail.to];
            updateServiceGroup({
              ...serviceGroupFrom,
              sortOrder: serviceGroupTo.sortOrder
            }).then(() => {
              refetch();
              event.detail.complete();
            });
          };
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-text-center ion-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                name: "crescent"
              }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                children: t("Učitavanje...")
              })]
            });
          }
          if (error) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-text-center ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: "danger",
                children: t("Greška pri učitavanju usluga")
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ShowLoading, {
              message: updateServiceGroupResponse.isLoading
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: settingsOutline
                    }), t("Usluge")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: serviceGroupsSorted.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding ion-text-center",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Nema usluga za prikaz")
                  })
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    routerLink: `${urlPrefix}/podesavanja/usluge/novo`,
                    color: "primary",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: t("Nova grupa")
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonReorderGroup, {
                    disabled: !sortMode,
                    onIonItemReorder: handleReorder,
                    children: serviceGroupsSorted.map(serviceGroup => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      button: !sortMode,
                      onClick: !sortMode ? () => handleServiceGroupClick(serviceGroup.id) : void 0,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                          children: serviceGroup.title
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: serviceGroup.description
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                            color: "medium",
                            children: [t("Usluga"), ": ", serviceGroup.services.length]
                          })
                        })]
                      }), sortMode && /* @__PURE__ */jsxRuntimeExports.jsx(IonReorder, {
                        slot: "end"
                      })]
                    }, serviceGroup.id))
                  })]
                })
              })]
            })]
          });
        }
      }
    };
  });
})();
