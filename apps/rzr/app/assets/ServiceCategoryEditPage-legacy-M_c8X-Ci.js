;
(function () {
  System.register(['./vendor_react-legacy-BvXhJo_m.js', './vendor_ionic-legacy-dqJd8vxA.js', './App-legacy-DEKKHFah.js', './usePendingImageUploads-legacy-zpHBcGuX.js', './ServiceGroupCreateModal-legacy-DQlJWPWG.js', './vendor_leaflet-legacy-DGSDSOBP.js', './index-legacy-UeGmmatO.js', './vendor_firebase-legacy-G_df00wk.js', './ServiceGroupBasicInfoStep-legacy-CgLZHYOl.js'], function (exports, module) {
    'use strict';

    var t, create$3, create$7, create$6, useTranslation, React, jsxRuntimeExports, create$2, reactExports, useLocation, useHistory, informationCircleOutline, imageOutline, constructOutline, useIonRouter, IonList, IonItem, IonIcon, addOutline, IonLabel, IonText, IonCheckbox, IonButton, createOutline, IonSpinner, FieldType, convertEmptyStringToNull, generateSlugForValidation, useFormWithSchema, generateSlug, useUpdateServiceCategoryMutation, useShowNotification, DynamicForm, SimpleFormStepperActions, useGetFeServiceGroupsQuery, activeLocation, urlPrefix, useGetFeServiceCategoriesQuery, LayoutMainPage, mainHeaderClasses, StepIndicator, SimpleFormStepper, pushDuplicateAndNavigate, usePendingImageUploads, ServiceGroupCreateModal;
    return {
      setters: [module => {
        t = module.a0;
        create$3 = module.a1;
        create$7 = module.aM;
        create$6 = module.a2;
        useTranslation = module.aD;
        React = module.R;
        jsxRuntimeExports = module.j;
        create$2 = module.aN;
        reactExports = module.e;
        useLocation = module.aJ;
        useHistory = module.aE;
      }, module => {
        informationCircleOutline = module.aV;
        imageOutline = module.bx;
        constructOutline = module.a1;
        useIonRouter = module.aj;
        IonList = module.F;
        IonItem = module.q;
        IonIcon = module.l;
        addOutline = module.a6;
        IonLabel = module.E;
        IonText = module.c;
        IonCheckbox = module.G;
        IonButton = module.d;
        createOutline = module.aE;
        IonSpinner = module.n;
      }, module => {
        FieldType = module.F;
        convertEmptyStringToNull = module.U;
        generateSlugForValidation = module.V;
        useFormWithSchema = module.s;
        generateSlug = module.Q;
        useUpdateServiceCategoryMutation = module.R;
        useShowNotification = module.E;
        DynamicForm = module.D;
        SimpleFormStepperActions = module.G;
        useGetFeServiceGroupsQuery = module.y;
        activeLocation = module.k;
        urlPrefix = module.f;
        useGetFeServiceCategoriesQuery = module.x;
        LayoutMainPage = module.L;
        mainHeaderClasses = module.W;
        StepIndicator = module.J;
        SimpleFormStepper = module.K;
        pushDuplicateAndNavigate = module.t;
      }, module => {
        usePendingImageUploads = module.u;
      }, module => {
        ServiceGroupCreateModal = module.S;
      }, null, null, null, null],
      execute: function () {
        exports("default", ServiceCategoryEditPage);
        const getServiceCategoryEditSteps = () => [{
          id: "basic-info",
          title: "Osnovni podaci",
          icon: informationCircleOutline
        }, {
          id: "image",
          title: "Slika delatnosti",
          icon: imageOutline
        }, {
          id: "service-groups",
          title: "Usluge delatnosti",
          icon: constructOutline
        }];
        const getServiceCategoryBasicInfoFormFields = isSlugManuallyEdited => {
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov")
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug"),
              placeholder: t("Automatski generisan iz naslova")
            },
            readOnly: !isSlugManuallyEdited
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.TextArea,
              label: t("Opis"),
              rows: 4
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivna")
            }
          }];
        };
        const serviceCategoryBasicInfoFormSchema = create$3().shape({
          title: create$6().required("Naslov je obavezan"),
          slug: create$6().required("Slug je obavezan").test("slug-validation", "Slug mora biti u ispravnom formatu", value => {
            if (!value) return false;
            return generateSlugForValidation(value) === value;
          }),
          description: create$6().transform(convertEmptyStringToNull).nullable().defined(),
          active: create$7().required()
        });
        function ServiceCategoryBasicInfoStep({
          category,
          onNext,
          onBack,
          onExit,
          isBackDisabled = false,
          isLastPage = false
        }) {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceCategoryBasicInfoFormSchema, {
            defaultValues: {
              title: category.title || "",
              slug: category.slug || "",
              description: category.description || "",
              active: category.active ?? true
            }
          });
          const title = form.watch("title");
          const [isSlugManuallyEdited, setIsSlugManuallyEdited] = React.useState(false);
          React.useEffect(() => {
            if (title && !isSlugManuallyEdited) {
              const generated = generateSlug(title);
              form.setValue("slug", generated);
            }
          }, [title, isSlugManuallyEdited, form]);
          const [updateCategory, updateCategoryResponse] = useUpdateServiceCategoryMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Podaci su uspešno sačuvani"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const formFields = React.useMemo(() => getServiceCategoryBasicInfoFormFields(isSlugManuallyEdited), [isSlugManuallyEdited]);
          const slugValue = form.watch("slug");
          React.useEffect(() => {
            if (slugValue && slugValue !== generateSlug(title)) {
              setIsSlugManuallyEdited(true);
            }
          }, [slugValue, title, setIsSlugManuallyEdited]);
          const handleSubmit = data => {
            updateCategory({
              id: category.id,
              ...data
            }).unwrap().then(() => {
              showSuccessNotification();
              if (isLastPage) {
                onExit?.();
              } else {
                onNext?.();
              }
            }).catch(() => {
              showErrorNotification();
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form,
              itemProps: {
                color: "light"
              }
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepperActions, {
              onAction: form.handleSubmit(handleSubmit),
              onBack,
              onExit,
              isBackDisabled,
              isLastPage,
              isLoading: updateCategoryResponse.isLoading
            })]
          });
        }
        const convertToPhoto = fileData => {
          if (!fileData) return [];
          return [{
            url: fileData.path,
            id: fileData.id,
            name: fileData.fileName || "image",
            index: 0
          }];
        };
        const getServiceCategoryImageFormFields = category => [{
          keyName: "image",
          name: "image",
          data: {
            type: FieldType.GalleryArea,
            label: t("Slika delatnosti"),
            oneImage: true,
            maxPhotos: 1,
            photos: convertToPhoto(category.image),
            uploadUrl: `rzr/locations/service-categories/${category.id}/image/upload`,
            deleteUrl: `rzr/locations/service-categories/${category.id}/image/delete`,
            uploadBehavior: "onSaveBefore",
            cropAspectRatio: {
              width: 1,
              height: 1
            }
          },
          gridSize: {
            size: "12"
          }
        }];
        const serviceCategoryImageFormSchema = create$3().shape({
          image: create$2().nullable()
        });
        function ServiceCategoryImageStep({
          category,
          onNext,
          onBack,
          onExit,
          isBackDisabled = false,
          isLastPage = false
        }) {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceCategoryImageFormSchema, {
            defaultValues: {
              image: null
            }
          });
          const imageFields = getServiceCategoryImageFormFields(category);
          const {
            uploadingImages
          } = usePendingImageUploads(form, ["image"]);
          const handleSubmit = () => {
            if (isLastPage) {
              onExit?.();
            } else {
              onNext?.();
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: imageFields,
              form,
              itemProps: {
                color: "light"
              }
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepperActions, {
              onBack,
              onAction: form.handleSubmit(handleSubmit),
              onExit,
              isBackDisabled,
              isLastPage,
              uploadingImages,
              isUploadOnly: true
            })]
          });
        }
        function ServiceCategoryServiceGroupsStep({
          category,
          onNext,
          onBack,
          onExit,
          onGoToStep,
          isBackDisabled = false,
          isLastPage = false
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [selectedGroupIds, setSelectedGroupIds] = reactExports.useState(category.serviceGroups?.map(g => g.id) || []);
          const [isCreateModalOpen, setIsCreateModalOpen] = reactExports.useState(false);
          const {
            data: serviceGroupsResponse,
            refetch: refetchServiceGroups
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const [updateCategory, updateCategoryResponse] = useUpdateServiceCategoryMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Usluge su uspešno sačuvane"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju usluga"),
            color: "danger"
          });
          const serviceGroups = serviceGroupsResponse?.data || [];
          const handleToggleGroup = groupId => {
            setSelectedGroupIds(prev => {
              if (prev.includes(groupId)) {
                return prev.filter(id => id !== groupId);
              } else {
                return [...prev, groupId];
              }
            });
          };
          const handleSubmit = () => {
            updateCategory({
              id: category.id,
              serviceGroupIds: selectedGroupIds
            }).unwrap().then(() => {
              showSuccessNotification();
              if (isLastPage) {
                onExit?.();
              } else {
                onNext?.();
              }
            }).catch(() => {
              showErrorNotification();
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                color: "primary",
                onClick: () => setIsCreateModalOpen(true),
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: addOutline,
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Nova grupa usluga")
                })]
              }), serviceGroups.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-padding ion-text-center",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "medium",
                  children: t("Nema grupa usluga")
                })
              }) : serviceGroups.map(group => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                onClick: () => handleToggleGroup(group.id),
                className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                  checked: selectedGroupIds.includes(group.id),
                  onIonChange: () => handleToggleGroup(group.id),
                  slot: "start"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                    className: "font-medium",
                    children: group.title
                  }), group.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    className: "text-sm text-gray-600 mt-1 truncate",
                    children: group.description
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  slot: "end",
                  fill: "clear",
                  size: "small",
                  onClick: e => {
                    e.stopPropagation();
                    router.push(`${urlPrefix}/podesavanja/usluge/groups/${group.id}?step=1`);
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: createOutline
                  })
                })]
              }, group.id))]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepperActions, {
              onAction: handleSubmit,
              onBack,
              onExit,
              isBackDisabled,
              isLastPage,
              isLoading: updateCategoryResponse.isLoading
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupCreateModal, {
              isOpen: isCreateModalOpen,
              onDidDismiss: () => {
                setIsCreateModalOpen(false);
                refetchServiceGroups();
              },
              onSuccess: () => {
                refetchServiceGroups();
              }
            })]
          });
        }
        function ServiceCategoryEditPage({
          categoryId
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const location = useLocation();
          const history = useHistory();
          const initialStep = reactExports.useRef(0);
          const [useCustomBackHandler, setUseCustomBackHandler] = reactExports.useState(false);
          reactExports.useEffect(() => {
            const params = new URLSearchParams(location.search);
            const step = parseInt(params.get("step") ?? "0", 10);
            initialStep.current = step;
            if (step === 0) {
              setUseCustomBackHandler(false);
            } else {
              setUseCustomBackHandler(true);
            }
          }, [location.search]);
          const [currentStep, setCurrentStep] = reactExports.useState(() => {
            const params = new URLSearchParams(location.search);
            return parseInt(params.get("step") ?? "0", 10);
          });
          const {
            data: categoriesResponse,
            isLoading,
            error
          } = useGetFeServiceCategoriesQuery({
            locationSlug: activeLocation
          });
          const category = categoriesResponse?.data.find(c => c.id === categoryId);
          const steps = getServiceCategoryEditSteps();
          const isFirstPage = currentStep === 0;
          const isLastPage = currentStep === steps.length - 1;
          const updateStepInUrl = (step, replace = false) => {
            const params = new URLSearchParams(location.search);
            params.set("step", step.toString());
            if (replace) {
              history.replace({
                search: params.toString()
              });
            } else {
              history.push({
                search: params.toString()
              });
            }
          };
          const handleStepChange = step => {
            if (step !== void 0) {
              setCurrentStep(step);
              updateStepInUrl(step);
              if (step === 0) {
                setUseCustomBackHandler(false);
              } else {
                setUseCustomBackHandler(true);
              }
            }
          };
          const handleNext = () => {
            if (currentStep < steps.length - 1) {
              const newStep = currentStep + 1;
              setCurrentStep(newStep);
              updateStepInUrl(newStep);
              setUseCustomBackHandler(true);
            }
          };
          const handleBack = () => {
            if (currentStep > 0) {
              const newStep = currentStep - 1;
              setCurrentStep(newStep);
              updateStepInUrl(newStep, newStep === 0);
              if (newStep === 0) {
                setUseCustomBackHandler(false);
              }
            }
          };
          const handleBackClick = () => {
            const destination = `${urlPrefix}/podesavanja/delatnosti`;
            pushDuplicateAndNavigate(router, destination);
          };
          const handleExit = () => {
            router.push(`${urlPrefix}/podesavanja/delatnosti`, "back");
          };
          const renderSteps = () => {
            if (!category) return [];
            return [/* @__PURE__ */jsxRuntimeExports.jsx(ServiceCategoryBasicInfoStep, {
              category,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "basic-info"), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceCategoryImageStep, {
              category,
              onBack: handleBack,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "image"), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceCategoryServiceGroupsStep, {
              category,
              onBack: handleBack,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "service-groups")];
          };
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center h-64",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          if (error || !category) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding ion-text-center",
              children: t("Greška pri učitavanju delatnosti")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Uredi delatnost"),
            hasBackButton: true,
            backButtonUrl: useCustomBackHandler ? void 0 : `${urlPrefix}/podesavanja/delatnosti`,
            onBackClick: useCustomBackHandler ? handleBackClick : void 0,
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "max-w-4xl mx-auto",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(StepIndicator, {
                steps,
                currentStep,
                allowStepNavigation: true,
                onStepClick: step => {
                  setCurrentStep(step);
                  updateStepInUrl(step);
                  if (step === 0) {
                    setUseCustomBackHandler(false);
                  } else {
                    setUseCustomBackHandler(true);
                  }
                }
              }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepper, {
                renderSteps,
                initialStep: currentStep,
                currentStep: currentStep || 0,
                onCurrentStepChange: handleStepChange
              })]
            })
          });
        }
      }
    };
  });
})();
