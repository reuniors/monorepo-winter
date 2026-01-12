import { M as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { e as IonHeader, f as IonToolbar, h as IonTitle, i as IonButtons, d as IonButton, b as IonIcon, j as closeOutline, k as IonContent, r as IonItem, G as IonLabel, t as IonInput, ad as IonTextarea, af as IonToggle, o as IonSpinner, Z as checkmarkOutline, ao as useIonRouter, Q as useIonAlert, m as IonText, b2 as IonCard, b4 as IonCardHeader, b5 as IonCardTitle, aS as businessOutline, bC as swapVerticalOutline, aa as addOutline, b3 as IonCardContent, a9 as IonReorderGroup, a2 as IonReorder, aL as createOutline, S as trashOutline } from "./vendor_ionic-BUXN7OTv.js";
import { T as useCreateServiceCategoryMutation, J as useShowNotification, V as generateSlug, n as activeLocation, o as useGetFeServiceCategoriesQuery, X as useUpdateServiceCategoryMutation, Y as useDeleteServiceCategoryMutation, g as urlPrefix } from "./App-D8jX3fz5.js";
import { I as IonModalExtended } from "./index-Cx2ECeB9.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./vendor_firebase-BU9b2OVt.js";
function ServiceCategoryCreateModal({
  isOpen,
  onDidDismiss,
  onSuccess
}) {
  const { t } = useTranslation();
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
    var _a;
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
      onSuccess == null ? void 0 : onSuccess((_a = result == null ? void 0 : result.data) == null ? void 0 : _a.id);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      name: "service-category-create-modal",
      isOpen,
      onClose: handleClose,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonTitle, { children: t("Nova delatnost") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeOutline }) }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { position: "stacked", children: [
              t("Naslov"),
              " *"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonInput,
              {
                value: title,
                onIonInput: (e) => setTitle(e.detail.value),
                placeholder: t("Unesite naslov delatnosti")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { position: "stacked", children: t("Slug") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonInput,
              {
                value: slug,
                onIonInput: (e) => setSlug(e.detail.value),
                placeholder: t("Automatski generisan iz naslova"),
                readonly: !!title
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { position: "stacked", children: t("Opis") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonTextarea,
              {
                value: description,
                onIonInput: (e) => setDescription(e.detail.value),
                placeholder: t("Unesite opis delatnosti"),
                rows: 4
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t("Aktivna") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonToggle,
              {
                checked: active,
                onIonChange: (e) => setActive(e.detail.checked)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            IonButton,
            {
              expand: "block",
              onClick: handleSubmit,
              disabled: createCategoryResponse.isLoading || !title.trim(),
              children: createCategoryResponse.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: checkmarkOutline, slot: "start" }),
                t("Kreiraj")
              ] })
            }
          ) })
        ] }) })
      ]
    }
  );
}
function ServiceCategoriesPage() {
  const { t } = useTranslation();
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
  const categories = (categoriesResult == null ? void 0 : categoriesResult.data) || [];
  const categoriesSorted = [...categories].sort((a, b) => {
    if (a.sortOrder < b.sortOrder) return -1;
    if (a.sortOrder > b.sortOrder) return 1;
    return 0;
  });
  const handleEditCategory = (category) => {
    router.push("".concat(urlPrefix, "/podesavanja/delatnosti/edit/").concat(category.id));
  };
  const handleDeleteCategory = async (category) => {
    await presentAlert({
      header: t("Obriši delatnost"),
      message: t("Da li ste sigurni da želite da obrišete delatnost?"),
      buttons: [
        {
          text: t("Otkaži"),
          role: "cancel"
        },
        {
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
        }
      ]
    });
  };
  const handleReorder = async (event) => {
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
  const handleCreateSuccess = (categoryId) => {
    setIsCreateModalOpen(false);
    refetch().then(() => {
      if (categoryId) {
        router.push("".concat(urlPrefix, "/podesavanja/delatnosti/edit/").concat(categoryId));
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-text-center ion-padding", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Učitavanje...") })
    ] });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: t("Greška pri učitavanju delatnosti") }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ion-padding", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: businessOutline }),
          t("Delatnosti")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              size: "small",
              fill: sortMode ? "solid" : "outline",
              onClick: () => setSortMode(!sortMode),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: swapVerticalOutline, slot: "start" }),
                t("Sortiraj")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              size: "small",
              onClick: () => setIsCreateModalOpen(true),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
                t("Nova delatnost")
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: categoriesSorted.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding ion-text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema delatnosti za prikaz") }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonReorderGroup,
        {
          disabled: !sortMode,
          onIonItemReorder: handleReorder,
          children: categoriesSorted.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonItem,
            {
              button: !sortMode,
              onClick: !sortMode ? () => handleEditCategory(category) : void 0,
              className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium", children: category.title }),
                  category.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400 mt-1 truncate", children: category.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-500 mt-1", children: [
                    t("Slug"),
                    ": ",
                    category.slug
                  ] })
                ] }),
                sortMode ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonReorder, { slot: "end" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", slot: "end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    IonButton,
                    {
                      size: "small",
                      fill: "clear",
                      onClick: (e) => {
                        e.stopPropagation();
                        handleEditCategory(category);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: createOutline })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    IonButton,
                    {
                      size: "small",
                      fill: "clear",
                      color: "danger",
                      onClick: (e) => {
                        e.stopPropagation();
                        handleDeleteCategory(category);
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: trashOutline })
                    }
                  )
                ] })
              ]
            },
            category.id
          ))
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ServiceCategoryCreateModal,
      {
        isOpen: isCreateModalOpen,
        onDidDismiss: handleCloseCreateModal,
        onSuccess: handleCreateSuccess
      }
    )
  ] });
}
export {
  ServiceCategoriesPage as default
};
