;
(function () {
  System.register(['./vendor_react-legacy-DV1SlEeb.js', './vendor_ionic-legacy-E6_G7KHN.js', './App-legacy-BXPALOm4.js', './vendor_leaflet-legacy-DEZLfQ5q.js', './index-legacy-gc8LmLQA.js', './vendor_firebase-legacy-auYnrKck.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonCard, IonCardHeader, IonCardTitle, IonIcon, createOutline, IonCardContent, IonAccordionGroup, IonAccordion, IonItem, IonLabel, constructOutline, IonList, addOutline, IonText, IonReorderGroup, IonReorder, useGetFeServiceGroupsQuery, activeLocation, useUpdateServiceMutation, useUpdateServiceGroupMutation, ShowLoading, ServiceGroupEditForm, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.aC;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        IonCard = module.aC;
        IonCardHeader = module.aD;
        IonCardTitle = module.aK;
        IonIcon = module.i;
        createOutline = module.a$;
        IonCardContent = module.aE;
        IonAccordionGroup = module.aP;
        IonAccordion = module.aQ;
        IonItem = module.o;
        IonLabel = module.D;
        constructOutline = module.a1;
        IonList = module.E;
        addOutline = module.a6;
        IonText = module.u;
        IonReorderGroup = module.a4;
        IonReorder = module.Y;
      }, module => {
        useGetFeServiceGroupsQuery = module.x;
        activeLocation = module.j;
        useUpdateServiceMutation = module.A;
        useUpdateServiceGroupMutation = module.y;
        ShowLoading = module.z;
        ServiceGroupEditForm = module.B;
        urlPrefix = module.f;
      }, null, null, null],
      execute: function () {
        exports("default", ServiceGroupEditPage);
        function ServiceGroupEditPage({
          serviceGroupId
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const {
            data: serviceGroupsResponse,
            isLoading,
            error,
            refetch
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const [updateService, updateServiceResponse] = useUpdateServiceMutation();
          const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
          const serviceGroup = serviceGroupsResponse?.data.find(sg => sg.id === serviceGroupId);
          const handleServiceClick = serviceId => {
            router.push(`${urlPrefix}/podesavanja/usluge/services/${serviceId}`);
          };
          const [sortMode, setSortMode] = reactExports.useState(false);
          const servicesSorted = [...(serviceGroup?.services ?? [])].sort((a, b) => {
            if (a.sortOrder < b.sortOrder) return -1;
            if (a.sortOrder > b.sortOrder) return 1;
            return 0;
          });
          const handleReorder = event => {
            const serviceFrom = servicesSorted[event.detail.from];
            const serviceTo = servicesSorted[event.detail.to];
            updateService({
              ...serviceFrom,
              sortOrder: serviceTo.sortOrder
            }).then(() => {
              refetch();
              event.detail.complete();
            });
            event.detail.complete();
          };
          const handleSubmit = data => {
            updateServiceGroup({
              ...data,
              id: serviceGroupId
            }).then(response => {
              if ("data" in response) {
                router.goBack();
              }
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ShowLoading, {
              message: updateServiceResponse.isLoading
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: createOutline
                    }), t("Izmeni grupu usluga")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonAccordionGroup, {
                  children: serviceGroup && /* @__PURE__ */jsxRuntimeExports.jsxs(IonAccordion, {
                    value: "edit-data",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      slot: "header",
                      color: "light",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [t("Editovanje podataka o grupi"), " - ", serviceGroup?.title]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      slot: "content",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupEditForm, {
                        serviceGroup,
                        onSubmit: handleSubmit
                      })
                    })]
                  })
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: constructOutline
                    }), t("Usluge u grupi")]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    color: "primary",
                    routerLink: serviceGroup ? `${urlPrefix}/podesavanja/usluge/services/novo/${serviceGroup.id}` : void 0,
                    disabled: !serviceGroup,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: t("Nova usluga")
                    })]
                  }), servicesSorted.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-padding ion-text-center",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      color: "medium",
                      children: t("Nema usluga u ovoj grupi")
                    })
                  }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonReorderGroup, {
                    disabled: !sortMode,
                    onIonItemReorder: handleReorder,
                    children: servicesSorted.map(service => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                      button: !sortMode,
                      onClick: !sortMode ? () => handleServiceClick(service.id) : void 0,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                          children: service.title
                        }), service.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          className: "text-sm text-gray-600 mt-1 truncate",
                          children: service.description
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: service.name
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                            color: "medium",
                            children: service.price
                          })
                        })]
                      }), sortMode && /* @__PURE__ */jsxRuntimeExports.jsx(IonReorder, {
                        slot: "end"
                      })]
                    }, service.id))
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
