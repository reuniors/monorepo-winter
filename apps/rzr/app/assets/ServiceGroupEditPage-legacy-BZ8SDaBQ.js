;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './App-legacy-BZWqGSgH.js', './usePendingImageUploads-legacy-DWwtZVPQ.js', './vendor_leaflet-legacy-BBJO0vvi.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var create$3, create$5, create$7, create$6, t, useTranslation, jsxRuntimeExports, reactExports, create$2, informationCircleOutline, constructOutline, imageOutline, useIonRouter, IonList, IonItem, IonIcon, addOutline, IonLabel, IonText, IonReorderGroup, IonReorder, IonSpinner, convertEmptyStringToNull, generateSlugForValidation, useUser, FieldType, useFormWithSchema, useUpdateServiceGroupMutation, useShowNotification, DynamicForm, useGetFeServiceGroupsQuery, activeLocation, useUpdateServiceMutation, ShowLoading, urlPrefix, SimpleFormStepperActions, usePendingImageUploads, StepIndicator, SimpleFormStepper;
    return {
      setters: [module => {
        create$3 = module.a1;
        create$5 = module.aR;
        create$7 = module.aS;
        create$6 = module.a2;
        t = module.a0;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        reactExports = module.e;
        create$2 = module.aT;
      }, module => {
        informationCircleOutline = module.bi;
        constructOutline = module.a1;
        imageOutline = module.bn;
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
        convertEmptyStringToNull = module.O;
        generateSlugForValidation = module.P;
        useUser = module.b;
        FieldType = module.F;
        useFormWithSchema = module.m;
        useUpdateServiceGroupMutation = module.Q;
        useShowNotification = module.z;
        DynamicForm = module.D;
        useGetFeServiceGroupsQuery = module.N;
        activeLocation = module.h;
        useUpdateServiceMutation = module.R;
        ShowLoading = module.T;
        urlPrefix = module.f;
      }, module => {
        SimpleFormStepperActions = module.S;
        usePendingImageUploads = module.u;
        StepIndicator = module.a;
        SimpleFormStepper = module.b;
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
        const serviceGroupBasicInfoFormSchema = create$3().shape({
          title: create$6().required("Naziv je obavezan"),
          slug: create$6().required("Slug je obavezan").test("slug-validation", "Slug mora biti u ispravnom formatu", value => {
            if (!value) return false;
            return generateSlugForValidation(value) === value;
          }),
          description: create$6().transform(convertEmptyStringToNull).nullable().defined(),
          active: create$7().required(),
          type: create$5().required(),
          inputType: create$5().required(),
          required: create$7().required(),
          minSelected: create$5().min(0, "Minimalno mora biti 0").required(),
          maxSelected: create$5().min(1, "Maksimalno mora biti najmanje 1").required()
        });
        const getServiceGroupBasicInfoFormFields = serviceGroupId => {
          const {
            isAdmin
          } = useUser();
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov"),
              translation: void 0
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug")
            },
            disabled: !isAdmin
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.TextArea,
              label: t("Opis"),
              translation: void 0
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivno")
            },
            disabled: !isAdmin
          }, {
            keyName: "type",
            name: "type",
            data: {
              type: FieldType.Select,
              label: t("Tip"),
              options: [{
                value: "0",
                text: t("Salon")
              }, {
                value: "1",
                text: t("Restoran")
              }]
            }
          }, {
            keyName: "inputType",
            name: "inputType",
            data: {
              type: FieldType.Select,
              label: t("Tip unosa"),
              options: [{
                value: "0",
                text: t("Checkbox")
              }, {
                value: "1",
                text: t("Radio")
              }, {
                value: "2",
                text: t("Select")
              }]
            }
          }, {
            keyName: "required",
            name: "required",
            data: {
              type: FieldType.Switch,
              label: t("Obavezno")
            }
          }, {
            keyName: "minSelected",
            name: "minSelected",
            data: {
              type: FieldType.Number,
              label: t("Minimalno izabrano")
            }
          }, {
            keyName: "maxSelected",
            name: "maxSelected",
            data: {
              type: FieldType.Number,
              label: t("Maksimalno izabrano")
            }
          }];
        };
        function ServiceGroupBasicInfoStep({
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
          const form = useFormWithSchema(serviceGroupBasicInfoFormSchema, {
            defaultValues: {
              title: serviceGroup.title || "",
              slug: serviceGroup.slug || "",
              description: serviceGroup.description || "",
              active: serviceGroup.active ?? true,
              type: serviceGroup.type ?? 0,
              inputType: serviceGroup.inputType ?? 0,
              required: serviceGroup.required ?? false,
              minSelected: serviceGroup.minSelected ?? 0,
              maxSelected: serviceGroup.maxSelected ?? 1
            }
          });
          const [updateServiceGroup, updateServiceGroupResponse] = useUpdateServiceGroupMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Podaci o grupi su uspešno sačuvani"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const formFields = getServiceGroupBasicInfoFormFields();
          const handleSubmit = data => {
            updateServiceGroup({
              ...data,
              id: serviceGroup.id
            }).then(response => {
              if ("data" in response && response.data?.success) {
                showSuccessNotification();
                if (isLastPage) {
                  onExit?.();
                } else {
                  onNext?.();
                }
              } else {
                showErrorNotification();
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
              isLoading: updateServiceGroupResponse.isLoading
            })]
          });
        }
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
          const [currentStep, setCurrentStep] = reactExports.useState(0);
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
