;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './vendor_ionic-legacy-DvZl6sBE.js', './App-legacy-DtnUlzjS.js', './usePendingImageUploads-legacy-Dc1oOwd6.js', './ServiceGroupCreateModal-legacy-B6CkGfRU.js', './vendor_leaflet-legacy-DUCVU90d.js', './index-legacy-CFC1yKwU.js', './vendor_firebase-legacy-tNokQwyN.js', './ServiceGroupBasicInfoStep-legacy-DUV8glxK.js'], function (exports, module) {
    'use strict';

    var t, create$3, create$7, create$6, useTranslation, React, jsxRuntimeExports, create$2, reactExports, useLocation, informationCircleOutline, imageOutline, constructOutline, useIonRouter, IonList, IonItem, IonIcon, addOutline, IonLabel, IonText, IonCheckbox, IonButton, createOutline, FieldType, convertEmptyStringToNull, generateSlugForValidation, useFormWithSchema, generateSlug, useUpdateServiceCategoryMutation, useShowNotification, DynamicForm, SimpleFormStepperActions, useGetFeServiceGroupsQuery, activeLocation, urlPrefix, useQueryParamsHook, StepIndicator, SimpleFormStepper, usePendingImageUploads, ServiceGroupCreateModal;
    return {
      setters: [module => {
        t = module.a2;
        create$3 = module.a7;
        create$7 = module.aM;
        create$6 = module.a8;
        useTranslation = module.M;
        React = module.R;
        jsxRuntimeExports = module.j;
        create$2 = module.aN;
        reactExports = module.e;
        useLocation = module.aJ;
      }, module => {
        informationCircleOutline = module.b3;
        imageOutline = module.bQ;
        constructOutline = module.a6;
        useIonRouter = module.ao;
        IonList = module.H;
        IonItem = module.r;
        IonIcon = module.b;
        addOutline = module.aa;
        IonLabel = module.G;
        IonText = module.m;
        IonCheckbox = module.J;
        IonButton = module.d;
        createOutline = module.aO;
      }, module => {
        FieldType = module.F;
        convertEmptyStringToNull = module.a0;
        generateSlugForValidation = module.a1;
        useFormWithSchema = module.x;
        generateSlug = module.T;
        useUpdateServiceCategoryMutation = module.V;
        useShowNotification = module.H;
        DynamicForm = module.D;
        SimpleFormStepperActions = module.J;
        useGetFeServiceGroupsQuery = module.z;
        activeLocation = module.n;
        urlPrefix = module.g;
        useQueryParamsHook = module.l;
        StepIndicator = module.M;
        SimpleFormStepper = module.O;
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
              onDidDismiss: reactExports.useCallback(() => {
                setIsCreateModalOpen(false);
                refetchServiceGroups();
              }, [refetchServiceGroups]),
              onSuccess: reactExports.useCallback(() => {
                refetchServiceGroups();
              }, [refetchServiceGroups])
            })]
          });
        }
        function ServiceCategoryEditPage({
          category
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const location = useLocation();
          const {
            update: updateQueryParam,
            data: queryParams
          } = useQueryParamsHook({});
          const isInitialMount = reactExports.useRef(true);
          const [currentStep, setCurrentStep] = reactExports.useState(() => {
            const params = new URLSearchParams(location.search);
            return parseInt(params.get("step") ?? "0", 10);
          });
          reactExports.useEffect(() => {
            if (isInitialMount.current) {
              isInitialMount.current = false;
              return;
            }
            const step = parseInt(queryParams.step ?? "0", 10);
            if (step !== currentStep) {
              setCurrentStep(step);
            }
          }, [queryParams.step]);
          const steps = getServiceCategoryEditSteps();
          const isFirstPage = currentStep === 0;
          const isLastPage = currentStep === steps.length - 1;
          const handleStepChange = reactExports.useCallback(step => {
            if (step !== void 0 && step !== currentStep) {
              const stepStr = step.toString();
              if (queryParams.step !== stepStr) {
                updateQueryParam("step", stepStr);
              }
              setCurrentStep(step);
            }
          }, [currentStep, updateQueryParam, queryParams.step]);
          const handleNext = reactExports.useCallback(() => {
            if (currentStep < steps.length - 1) {
              const newStep = currentStep + 1;
              const newStepStr = newStep.toString();
              if (queryParams.step !== newStepStr) {
                updateQueryParam("step", newStepStr);
              }
              setCurrentStep(newStep);
            }
          }, [currentStep, steps.length, updateQueryParam, queryParams.step]);
          const handleBack = reactExports.useCallback(() => {
            if (currentStep > 0) {
              const newStep = currentStep - 1;
              const newStepStr = newStep.toString();
              if (queryParams.step !== newStepStr) {
                updateQueryParam("step", newStepStr);
              }
              setCurrentStep(newStep);
            }
          }, [currentStep, updateQueryParam, queryParams.step]);
          const handleExit = () => {
            router.push(`${urlPrefix}/podesavanja/delatnosti`, "back");
          };
          const handleStepClick = reactExports.useCallback(step => {
            if (step !== currentStep) {
              const stepStr = step.toString();
              if (queryParams.step !== stepStr) {
                updateQueryParam("step", stepStr);
              }
              setCurrentStep(step);
            }
          }, [currentStep, updateQueryParam, queryParams.step]);
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
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "max-w-4xl mx-auto",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(StepIndicator, {
              steps,
              currentStep,
              allowStepNavigation: true,
              onStepClick: handleStepClick
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepper, {
              renderSteps,
              initialStep: currentStep,
              currentStep: currentStep ?? 0,
              onCurrentStepChange: handleStepChange
            })]
          });
        }
      }
    };
  });
})();
