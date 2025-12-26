;
(function () {
  System.register(['./vendor_react-legacy-DonFScn3.js', './vendor_ionic-legacy-mZi8EIkK.js', './App-legacy-CxwuunNq.js', './vendor_leaflet-legacy-CSx1IcTV.js', './index-legacy-B6X2T6eC.js', './vendor_firebase-legacy-BNHQcAgT.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, closeOutline, IonContent, IonItem, IonLabel, IonInput, IonTextarea, IonToggle, IonSpinner, checkmarkOutline, useIonRouter, useIonAlert, IonText, IonCard, IonCardHeader, IonCardTitle, businessOutline, swapVerticalOutline, addOutline, IonCardContent, IonReorderGroup, IonReorder, createOutline, trashOutline, useCreateServiceCategoryMutation, useShowNotification, generateSlug, IonModalExtended, activeLocation, useGetFeServiceCategoriesQuery, useUpdateServiceCategoryMutation, useDeleteServiceCategoryMutation, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.ai;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        IonHeader = module.h;
        IonToolbar = module.i;
        IonTitle = module.j;
        IonButtons = module.k;
        IonButton = module.d;
        IonIcon = module.l;
        closeOutline = module.m;
        IonContent = module.b;
        IonItem = module.q;
        IonLabel = module.E;
        IonInput = module.r;
        IonTextarea = module.aa;
        IonToggle = module.ac;
        IonSpinner = module.n;
        checkmarkOutline = module.V;
        useIonRouter = module.al;
        useIonAlert = module.M;
        IonText = module.c;
        IonCard = module.a_;
        IonCardHeader = module.b0;
        IonCardTitle = module.b1;
        businessOutline = module.aP;
        swapVerticalOutline = module.by;
        addOutline = module.a6;
        IonCardContent = module.a$;
        IonReorderGroup = module.a5;
        IonReorder = module.Z;
        createOutline = module.aI;
        trashOutline = module.O;
      }, module => {
        useCreateServiceCategoryMutation = module.P;
        useShowNotification = module.E;
        generateSlug = module.Q;
        IonModalExtended = module.I;
        activeLocation = module.k;
        useGetFeServiceCategoriesQuery = module.x;
        useUpdateServiceCategoryMutation = module.R;
        useDeleteServiceCategoryMutation = module.T;
        urlPrefix = module.f;
      }, null, null, null],
      execute: function () {
        exports("default", ServiceCategoriesPage);
        function ServiceCategoryCreateModal({
          isOpen,
          onDidDismiss,
          onSuccess
        }) {
          const {
            t
          } = useTranslation();
          const [title, setTitle] = reactExports.useState("");
          const [slug, setSlug] = reactExports.useState("");
          const [description, setDescription] = reactExports.useState("");
          const [active, setActive] = reactExports.useState(true);
          const [createCategory, createCategoryResponse] = useCreateServiceCategoryMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Delatnost je uspešno kreirana"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri kreiranju delatnosti"),
            color: "danger"
          });
          reactExports.useEffect(() => {
            if (title) {
              const generated = generateSlug(title);
              setSlug(generated);
            }
          }, [title]);
          const handleSubmit = async () => {
            if (!title.trim()) {
              showErrorNotification();
              return;
            }
            try {
              const result = await createCategory({
                locationSlug: activeLocation,
                title: title.trim(),
                slug: slug.trim() || void 0,
                description: description.trim() || void 0,
                active
              }).unwrap();
              showSuccessNotification();
              setTitle("");
              setSlug("");
              setDescription("");
              setActive(true);
              onSuccess?.(result?.data?.id);
            } catch (error) {
              console.error("Error creating category:", error);
              showErrorNotification();
            }
          };
          const handleClose = reactExports.useCallback(() => {
            setTitle("");
            setSlug("");
            setDescription("");
            setActive(true);
            onDidDismiss();
          }, [onDidDismiss]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended, {
            name: "service-category-create-modal",
            isOpen,
            onClose: handleClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Nova delatnost")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    position: "stacked",
                    children: [t("Naslov"), " *"]
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                    value: title,
                    onIonInput: e => setTitle(e.detail.value),
                    placeholder: t("Unesite naslov delatnosti")
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    position: "stacked",
                    children: t("Slug")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                    value: slug,
                    onIonInput: e => setSlug(e.detail.value),
                    placeholder: t("Automatski generisan iz naslova"),
                    readonly: !!title
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    position: "stacked",
                    children: t("Opis")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTextarea, {
                    value: description,
                    onIonInput: e => setDescription(e.detail.value),
                    placeholder: t("Unesite opis delatnosti"),
                    rows: 4
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Aktivna")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: active,
                    onIonChange: e => setActive(e.detail.checked)
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding-top",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    expand: "block",
                    onClick: handleSubmit,
                    disabled: createCategoryResponse.isLoading || !title.trim(),
                    children: createCategoryResponse.isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                      name: "crescent"
                    }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: checkmarkOutline,
                        slot: "start"
                      }), t("Kreiraj")]
                    })
                  })
                })]
              })
            })]
          });
        }
        function ServiceCategoriesPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [sortMode, setSortMode] = reactExports.useState(false);
          const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
          const [presentAlert] = useIonAlert();
          const {
            data: categoriesResult,
            isLoading,
            error,
            refetch
          } = useGetFeServiceCategoriesQuery({
            locationSlug: activeLocation
          });
          const [createCategory, createCategoryResponse] = useCreateServiceCategoryMutation();
          const [updateCategory, updateCategoryResponse] = useUpdateServiceCategoryMutation();
          const [deleteCategory, deleteCategoryResponse] = useDeleteServiceCategoryMutation();
          const categories = categoriesResult?.data || [];
          const categoriesSorted = [...categories].sort((a, b) => {
            if (a.sortOrder < b.sortOrder) return -1;
            if (a.sortOrder > b.sortOrder) return 1;
            return 0;
          });
          const handleEditCategory = category => {
            router.push(`${urlPrefix}/podesavanja/delatnosti/edit/${category.id}`);
          };
          const handleDeleteCategory = async category => {
            await presentAlert({
              header: t("Obriši delatnost"),
              message: t("Da li ste sigurni da želite da obrišete delatnost?"),
              buttons: [{
                text: t("Otkaži"),
                role: "cancel"
              }, {
                text: t("Obriši"),
                role: "destructive",
                handler: async () => {
                  try {
                    await deleteCategory(category.id).unwrap();
                    refetch();
                  } catch (error2) {
                    console.error("Error deleting category:", error2);
                  }
                }
              }]
            });
          };
          const handleReorder = async event => {
            const categoryFrom = categoriesSorted[event.detail.from];
            const categoryTo = categoriesSorted[event.detail.to];
            try {
              await updateCategory({
                id: categoryFrom.id,
                sortOrder: categoryTo.sortOrder
              }).unwrap();
              refetch();
              event.detail.complete();
            } catch (error2) {
              console.error("Error reordering category:", error2);
              event.detail.complete(false);
            }
          };
          const handleCloseCreateModal = reactExports.useCallback(() => {
            setIsCreateModalOpen(false);
          }, []);
          const handleCreateSuccess = categoryId => {
            setIsCreateModalOpen(false);
            refetch().then(() => {
              if (categoryId) {
                router.push(`${urlPrefix}/podesavanja/delatnosti/edit/${categoryId}`);
              }
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
                children: t("Greška pri učitavanju delatnosti")
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "ion-padding",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: businessOutline
                    }), t("Delatnosti")]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex gap-2 justify-end",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      size: "small",
                      fill: sortMode ? "solid" : "outline",
                      onClick: () => setSortMode(!sortMode),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: swapVerticalOutline,
                        slot: "start"
                      }), t("Sortiraj")]
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      size: "small",
                      onClick: () => setIsCreateModalOpen(true),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: addOutline,
                        slot: "start"
                      }), t("Nova delatnost")]
                    })]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: categoriesSorted.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding ion-text-center",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Nema delatnosti za prikaz")
                  })
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonReorderGroup, {
                  disabled: !sortMode,
                  onIonItemReorder: handleReorder,
                  children: categoriesSorted.map(category => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: !sortMode,
                    onClick: !sortMode ? () => handleEditCategory(category) : void 0,
                    className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                        className: "font-medium",
                        children: category.title
                      }), category.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                        className: "text-sm text-gray-600 dark:text-gray-400 mt-1 truncate",
                        children: category.description
                      }), /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                        className: "text-xs text-gray-500 dark:text-gray-500 mt-1",
                        children: [t("Slug"), ": ", category.slug]
                      })]
                    }), sortMode ? /* @__PURE__ */jsxRuntimeExports.jsx(IonReorder, {
                      slot: "end"
                    }) : /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "flex gap-2",
                      slot: "end",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                        size: "small",
                        fill: "clear",
                        onClick: e => {
                          e.stopPropagation();
                          handleEditCategory(category);
                        },
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: createOutline
                        })
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                        size: "small",
                        fill: "clear",
                        color: "danger",
                        onClick: e => {
                          e.stopPropagation();
                          handleDeleteCategory(category);
                        },
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: trashOutline
                        })
                      })]
                    })]
                  }, category.id))
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceCategoryCreateModal, {
              isOpen: isCreateModalOpen,
              onDidDismiss: handleCloseCreateModal,
              onSuccess: handleCreateSuccess
            })]
          });
        }
      }
    };
  });
})();
