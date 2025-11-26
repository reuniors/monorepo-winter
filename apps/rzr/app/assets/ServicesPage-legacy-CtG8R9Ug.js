;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './App-legacy-BZWqGSgH.js', './vendor_leaflet-legacy-BBJO0vvi.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, reactExports, useIonRouter, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, closeOutline, IonContent, IonCard, IonCardContent, saveOutline, IonSpinner, IonText, IonCardHeader, IonCardTitle, constructOutline, addOutline, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, createOutline, useCreateServiceGroupMutation, useShowNotification, useFormWithSchema, getServiceGroupEditFormFields, DynamicForm, serviceGroupEditFormSchema, activeLocation, urlPrefix, useGetFeServiceGroupsQuery;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        reactExports = module.e;
      }, module => {
        useIonRouter = module.aj;
        IonModal = module.f;
        IonHeader = module.h;
        IonToolbar = module.i;
        IonTitle = module.j;
        IonButtons = module.k;
        IonButton = module.d;
        IonIcon = module.l;
        closeOutline = module.m;
        IonContent = module.b;
        IonCard = module.aS;
        IonCardContent = module.aV;
        saveOutline = module.s;
        IonSpinner = module.n;
        IonText = module.c;
        IonCardHeader = module.aT;
        IonCardTitle = module.aU;
        constructOutline = module.a1;
        addOutline = module.a6;
        IonAccordionGroup = module.bl;
        IonAccordion = module.bm;
        IonItem = module.q;
        IonLabel = module.E;
        IonList = module.F;
        createOutline = module.aC;
      }, module => {
        useCreateServiceGroupMutation = module.H;
        useShowNotification = module.z;
        useFormWithSchema = module.m;
        getServiceGroupEditFormFields = module.J;
        DynamicForm = module.D;
        serviceGroupEditFormSchema = module.K;
        activeLocation = module.h;
        urlPrefix = module.f;
        useGetFeServiceGroupsQuery = module.N;
      }, null, null, null],
      execute: function () {
        exports("default", ServicesPage);
        function ServiceGroupCreateModal({
          isOpen,
          onDidDismiss
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [createServiceGroup, createResponse] = useCreateServiceGroupMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Grupa je uspešno kreirana"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri kreiranju grupe"),
            color: "danger"
          });
          const form = useFormWithSchema(serviceGroupEditFormSchema, {
            defaultValues: {
              title: "",
              slug: "",
              description: "",
              active: true,
              type: 0,
              required: false,
              minSelected: 0,
              maxSelected: 1
            }
          });
          const formFields = getServiceGroupEditFormFields();
          const handleSubmit = () => {
            form.handleSubmit(data => {
              createServiceGroup({
                ...data,
                locationSlug: activeLocation
              }).then(response => {
                if ("data" in response && response.data?.data?.id) {
                  showSuccessNotification();
                  onDidDismiss();
                  form.reset();
                  router.push(`${urlPrefix}/podesavanja/usluge/groups/${response.data.data.id}`, "root", "replace");
                } else {
                  showErrorNotification();
                }
              }).catch(() => {
                showErrorNotification();
              });
            })();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen,
            onDidDismiss,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Nova grupa")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onDidDismiss,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                      fields: formFields,
                      form
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  expand: "block",
                  onClick: handleSubmit,
                  disabled: createResponse.isLoading,
                  className: "mt-4",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: saveOutline,
                    slot: "start"
                  }), t("Sačuvaj")]
                })]
              })
            })]
          });
        }
        function ServicesPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
          const {
            data: serviceGroupsResponse,
            isLoading,
            error
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const serviceGroups = serviceGroupsResponse?.data || [];
          const serviceGroupsSorted = [...serviceGroups].sort((a, b) => {
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
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
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
                          }), t("Dodaj servis")]
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
              onDidDismiss: () => setIsCreateModalOpen(false)
            })]
          });
        }
      }
    };
  });
})();
