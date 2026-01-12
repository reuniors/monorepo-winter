;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './App-legacy-D9oxjjHj.js', './ServiceGroupCreateModal-legacy-BG3kmqbp.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-BzFlzlbx.js', './vendor_firebase-legacy-D-vUgmbk.js', './ServiceGroupBasicInfoStep-legacy-DyyggPBA.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonSpinner, IonText, IonCard, IonCardContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonCardHeader, IonCardTitle, IonIcon, constructOutline, IonButton, addOutline, IonAccordionGroup, IonAccordion, IonList, createOutline, useGetFeLocationQuery, activeLocation, preloadedLocationData, useGetFeServiceCategoriesQuery, useGetFeServiceGroupsQuery, urlPrefix, ServiceGroupCreateModal;
    return {
      setters: [module => {
        useTranslation = module.M;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.ao;
        IonSpinner = module.o;
        IonText = module.m;
        IonCard = module.b2;
        IonCardContent = module.b3;
        IonItem = module.r;
        IonLabel = module.G;
        IonSelect = module.y;
        IonSelectOption = module.z;
        IonCardHeader = module.b4;
        IonCardTitle = module.b5;
        IonIcon = module.b;
        constructOutline = module.a6;
        IonButton = module.d;
        addOutline = module.aa;
        IonAccordionGroup = module.bl;
        IonAccordion = module.bm;
        IonList = module.H;
        createOutline = module.aL;
      }, module => {
        useGetFeLocationQuery = module.m;
        activeLocation = module.n;
        preloadedLocationData = module.p;
        useGetFeServiceCategoriesQuery = module.o;
        useGetFeServiceGroupsQuery = module.z;
        urlPrefix = module.g;
      }, module => {
        ServiceGroupCreateModal = module.S;
      }, null, null, null, null],
      execute: function () {
        exports("default", ServicesPage);
        function ServicesPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
          const [selectedActivity, setSelectedActivity] = reactExports.useState(null);
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          const hasMultipleActivities = locationData?.hasMultipleActivities === true;
          const {
            data: categoriesResult
          } = useGetFeServiceCategoriesQuery({
            locationSlug: activeLocation,
            active: true
          }, {
            skip: !hasMultipleActivities
          });
          const categories = categoriesResult?.data || locationData?.serviceCategories || [];
          const {
            data: serviceGroupsResponse,
            isLoading,
            error
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const serviceGroups = serviceGroupsResponse?.data || [];
          const filteredServiceGroups = reactExports.useMemo(() => {
            if (!hasMultipleActivities || !selectedActivity) {
              return serviceGroups;
            }
            return serviceGroups.filter(group => {
              return group.serviceCategories?.some(cat => cat.id === selectedActivity.id) ?? false;
            });
          }, [serviceGroups, selectedActivity, hasMultipleActivities]);
          const serviceGroupsSorted = [...filteredServiceGroups].sort((a, b) => {
            if (a.sortOrder < b.sortOrder) return -1;
            if (a.sortOrder > b.sortOrder) return 1;
            return 0;
          });
          const handleEditGroup = serviceGroupId => {
            router.push(`${urlPrefix}/podesavanja/usluge/groups/${serviceGroupId}`);
          };
          const handleAddService = serviceGroupId => {
            router.push(`${urlPrefix}/podesavanja/usluge/services/novo/${serviceGroupId}`);
          };
          const handleEditService = serviceId => {
            router.push(`${urlPrefix}/podesavanja/usluge/services/${serviceId}`);
          };
          const handleCloseCreateModal = reactExports.useCallback(() => {
            setIsCreateModalOpen(false);
          }, []);
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
            children: [hasMultipleActivities && categories.length > 0 && /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              className: "mb-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Delatnost")
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSelect, {
                    value: selectedActivity?.id,
                    placeholder: t("Izaberite delatnost"),
                    onIonChange: e => {
                      const categoryId = e.detail.value;
                      const category = categories.find(cat => cat.id === categoryId);
                      setSelectedActivity(category || null);
                    },
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                      value: null,
                      children: t("Sve delatnosti")
                    }), categories.map(category => /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                      value: category.id,
                      children: category.title
                    }, category.id))]
                  })]
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: constructOutline
                    }), t("Usluge")]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    size: "small",
                    onClick: () => setIsCreateModalOpen(true),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), t("Nova grupa")]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: serviceGroupsSorted.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding ion-text-center",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Nema usluga za prikaz")
                  })
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonAccordionGroup, {
                  className: "flex flex-col gap-3",
                  children: serviceGroupsSorted.map(serviceGroup => /* @__PURE__ */jsxRuntimeExports.jsxs(IonAccordion, {
                    value: `group-${serviceGroup.id}`,
                    className: "border border-gray-300 rounded-lg overflow-hidden",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      slot: "header",
                      color: "light",
                      lines: "none",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                          className: "font-semibold",
                          children: serviceGroup.title
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: serviceGroup.description
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                          children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                            color: "medium",
                            children: [t("Usluga"), ": ", serviceGroup.services.length]
                          })
                        })]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                      slot: "content",
                      className: "ion-no-padding",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        className: "flex gap-2 p-3",
                        children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                          expand: "block",
                          size: "small",
                          onClick: () => handleAddService(serviceGroup.id),
                          className: "flex-1",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                            icon: addOutline,
                            slot: "start"
                          }), t("Dodaj uslugu")]
                        }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                          expand: "block",
                          size: "small",
                          fill: "outline",
                          onClick: () => handleEditGroup(serviceGroup.id),
                          className: "flex-1",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                            icon: createOutline,
                            slot: "start"
                          }), t("Edit grupe")]
                        })]
                      }), serviceGroup.services.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                          children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                            color: "medium",
                            children: t("Nema servisa u ovoj grupi")
                          })
                        })
                      }) : serviceGroup.services.map(service => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        button: true,
                        detail: true,
                        onClick: () => handleEditService(service.id),
                        className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
                        children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                            className: "font-medium",
                            children: service.title
                          }), service.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                            className: "text-sm text-gray-600",
                            children: service.description
                          })]
                        })
                      }, service.id))]
                    })]
                  }, serviceGroup.id))
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupCreateModal, {
              isOpen: isCreateModalOpen,
              onDidDismiss: handleCloseCreateModal
            })]
          });
        }
      }
    };
  });
})();
