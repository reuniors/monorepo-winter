;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './vendor_ionic-legacy-DYIGQWbn.js', './App-legacy-DOgCCVOi.js', './ServiceGroupBasicInfoStep-legacy-BNNOF9zs.js', './usePendingImageUploads-legacy-DSqJFQJv.js', './vendor_leaflet-legacy-DKuaEqMF.js', './index-legacy-D_PLXLLo.js', './vendor_firebase-legacy-Bicf26rb.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, t, create$3, create$2, useLocation, informationCircleOutline, constructOutline, imageOutline, useIonRouter, IonList, IonItem, IonIcon, addOutline, IonLabel, IonText, IonReorderGroup, IonReorder, IonSpinner, useGetFeServiceGroupsQuery, activeLocation, useUpdateServiceMutation, ShowLoading, urlPrefix, SimpleFormStepperActions, FieldType, useFormWithSchema, DynamicForm, StepIndicator, SimpleFormStepper, ServiceGroupBasicInfoStep, usePendingImageUploads;
    return {
      setters: [module => {
        useTranslation = module.aD;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        t = module.a0;
        create$3 = module.a1;
        create$2 = module.aN;
        useLocation = module.aJ;
      }, module => {
        informationCircleOutline = module.aV;
        constructOutline = module.a1;
        imageOutline = module.bw;
        useIonRouter = module.aj;
        IonList = module.F;
        IonItem = module.q;
        IonIcon = module.l;
        addOutline = module.a6;
        IonLabel = module.E;
        IonText = module.c;
        IonReorderGroup = module.a4;
        IonReorder = module.Y;
        IonSpinner = module.n;
      }, module => {
        useGetFeServiceGroupsQuery = module.x;
        activeLocation = module.k;
        useUpdateServiceMutation = module.X;
        ShowLoading = module.Y;
        urlPrefix = module.f;
        SimpleFormStepperActions = module.E;
        FieldType = module.F;
        useFormWithSchema = module.r;
        DynamicForm = module.D;
        StepIndicator = module.H;
        SimpleFormStepper = module.J;
      }, module => {
        ServiceGroupBasicInfoStep = module.S;
      }, module => {
        usePendingImageUploads = module.u;
      }, null, null, null],
      execute: function () {
        exports("default", ServiceGroupEditPage);
        const getServiceGroupEditSteps = () => [{
          id: "basic-info",
          title: "Osnovni podaci",
          icon: informationCircleOutline
        }, {
          id: "services",
          title: "Servisi",
          icon: constructOutline
        }, {
          id: "image",
          title: "Slika",
          icon: imageOutline
        }];
        function ServiceGroupServicesStep({
          serviceGroup,
          onNext,
          onBack,
          onExit,
          isBackDisabled = false,
          isLastPage = false
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [sortMode, setSortMode] = reactExports.useState(false);
          const {
            data: serviceGroupsResponse,
            refetch
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const [updateService, updateServiceResponse] = useUpdateServiceMutation();
          const currentServiceGroup = serviceGroupsResponse?.data.find(sg => sg.id === serviceGroup.id);
          const servicesSorted = [...(currentServiceGroup?.services ?? [])].sort((a, b) => {
            if (a.sortOrder < b.sortOrder) return -1;
            if (a.sortOrder > b.sortOrder) return 1;
            return 0;
          });
          const handleServiceClick = serviceId => {
            router.push(`${urlPrefix}/podesavanja/usluge/services/${serviceId}`);
          };
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
          };
          const handleAction = () => {
            if (isLastPage) {
              onExit?.();
            } else {
              onNext?.();
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ShowLoading, {
              message: updateServiceResponse.isLoading
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              lines: "none",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                color: "primary",
                routerLink: `${urlPrefix}/podesavanja/usluge/services/novo/${serviceGroup.id}`,
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
                  className: "border-l-4 border-blue-500 my-1 mx-2 rounded",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                      className: "font-medium",
                      children: service.title
                    }), service.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      className: "text-sm text-gray-600 mt-1 truncate",
                      children: service.description
                    })]
                  }), sortMode && /* @__PURE__ */jsxRuntimeExports.jsx(IonReorder, {
                    slot: "end"
                  })]
                }, service.id))
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepperActions, {
              onAction: handleAction,
              onBack,
              onExit,
              isBackDisabled,
              isLastPage,
              isLoading: false
            })]
          });
        }
        const convertToPhoto = fileData => {
          if (!fileData) return [];
          return [{
            url: fileData.path,
            id: fileData.id,
            name: fileData.fileName || fileData.disk_name || "avatar",
            index: 0
          }];
        };
        const getServiceGroupImageFormFields = serviceGroup => [{
          keyName: "avatar",
          name: "avatar",
          data: {
            type: FieldType.GalleryArea,
            label: t("Avatar"),
            oneImage: true,
            maxPhotos: 1,
            photos: convertToPhoto(serviceGroup.avatar),
            uploadUrl: `rzr/service-groups/${serviceGroup.id}/avatar/upload`,
            deleteUrl: `rzr/service-groups/${serviceGroup.id}/avatar/delete`,
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
        const serviceGroupImageFormSchema = create$3().shape({
          avatar: create$2().nullable()
        });
        function ServiceGroupImageStep({
          serviceGroup,
          onNext,
          onBack,
          onExit,
          isBackDisabled = false,
          isLastPage = false
        }) {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceGroupImageFormSchema, {
            defaultValues: {
              avatar: null
            }
          });
          const imageFields = getServiceGroupImageFormFields(serviceGroup);
          const {
            uploadingImages
          } = usePendingImageUploads(form, ["avatar"]);
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
        function ServiceGroupEditPage({
          serviceGroupId
        }) {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const location = useLocation();
          const [currentStep, setCurrentStep] = reactExports.useState(() => {
            const params = new URLSearchParams(location.search);
            return parseInt(params.get("step") ?? "0", 10);
          });
          const {
            data: serviceGroupsResponse,
            isLoading,
            error
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const serviceGroup = serviceGroupsResponse?.data.find(sg => sg.id === serviceGroupId);
          const steps = getServiceGroupEditSteps();
          const isFirstPage = currentStep === 0;
          const isLastPage = currentStep === steps.length - 1;
          const handleStepChange = step => {
            if (step !== void 0) {
              setCurrentStep(step);
            }
          };
          const handleNext = () => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          };
          const handleBack = () => {
            if (currentStep > 0) {
              setCurrentStep(currentStep - 1);
            }
          };
          const handleExit = () => {
            router.push(`${urlPrefix}/podesavanja/usluge`, "back");
          };
          const renderSteps = () => {
            if (!serviceGroup) return [];
            return [/* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupBasicInfoStep, {
              serviceGroup,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "basic-info"), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupServicesStep, {
              serviceGroup,
              onBack: handleBack,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "services"), /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupImageStep, {
              serviceGroup,
              onBack: handleBack,
              onNext: handleNext,
              onExit: handleExit,
              isBackDisabled: isFirstPage,
              isLastPage
            }, "image")];
          };
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center h-64",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          if (error || !serviceGroup) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding ion-text-center",
              children: t("Greška pri učitavanju grupe")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "max-w-4xl mx-auto",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(StepIndicator, {
              steps,
              currentStep,
              allowStepNavigation: true,
              onStepClick: setCurrentStep
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SimpleFormStepper, {
              renderSteps,
              initialStep: 0,
              currentStep: currentStep || 0,
              onCurrentStepChange: handleStepChange
            })]
          });
        }
      }
    };
  });
})();
