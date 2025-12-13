import { aD as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-DSVIR5Ln.js";
import { f as IonModal, h as IonHeader, i as IonToolbar, j as IonTitle, k as IonButtons, d as IonButton, l as IonIcon, m as closeOutline, b as IonContent, q as IonItem, E as IonLabel, r as IonInput, aa as IonTextarea, ac as IonToggle, n as IonSpinner, a5 as checkmarkOutline, aj as useIonRouter, M as useIonAlert, c as IonText, aT as IonCard, aW as IonCardHeader, aX as IonCardTitle, aI as businessOutline, bs as swapVerticalOutline, a6 as addOutline, aU as IonCardContent, a4 as IonReorderGroup, Y as IonReorder, aC as createOutline, O as trashOutline } from "./vendor_ionic-DMW4l-HL.js";
import { a as useCreateServiceCategoryMutation, u as useGetFeServiceCategoriesQuery, b as useUpdateServiceCategoryMutation, c as useDeleteServiceCategoryMutation } from "./service-category.services-CdkmikRp.js";
import { B as useShowNotification, H as generateSlug, j as activeLocation, f as urlPrefix } from "./App-DmsCuVFw.js";
import "./vendor_leaflet-6FPNYOO1.js";
import "./index-CnRQbzop.js";
import "./vendor_firebase-BBFHMPrQ.js";
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
  const handleClose = () => {
    setTitle("");
    setSlug("");
    setDescription("");
    setActive(true);
    onDidDismiss();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonModal, { isOpen, onDidDismiss: handleClose, children: [
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
  ] });
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
    router.push("".concat(urlPrefix, "/podesavanja/delatnosti/").concat(category.id));
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
  const handleCreateSuccess = (categoryId) => {
    setIsCreateModalOpen(false);
    refetch().then(() => {
      if (categoryId) {
        router.push("".concat(urlPrefix, "/podesavanja/delatnosti/").concat(categoryId));
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
        onDidDismiss: () => setIsCreateModalOpen(false),
        onSuccess: handleCreateSuccess
      }
    )
  ] });
}
export {
  ServiceCategoriesPage as default
};
