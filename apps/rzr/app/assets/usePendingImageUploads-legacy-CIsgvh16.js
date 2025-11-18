;
(function () {
  System.register(['./vendor_react-legacy-CWUgxXrv.js', './App-legacy-DluTxaR-.js', './vendor_ionic-legacy-CtJTU_-p.js'], function (exports, module) {
    'use strict';

    var reactExports, jsxRuntimeExports, SwiperSlide, useTranslation, useWatch, useDefaultProps, SwiperWrapper, IonButton, IonIcon, IonLoading, exitOutline, arrowBackOutline, saveOutline, cloudUploadOutline, arrowForwardOutline;
    return {
      setters: [module => {
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.af;
        useTranslation = module.aD;
        useWatch = module.a7;
      }, module => {
        useDefaultProps = module.U;
        SwiperWrapper = module.l;
      }, module => {
        IonButton = module.h;
        IonIcon = module.i;
        IonLoading = module.ag;
        exitOutline = module.an;
        arrowBackOutline = module.bo;
        saveOutline = module.s;
        cloudUploadOutline = module.S;
        arrowForwardOutline = module.bp;
      }],
      execute: function () {
        exports({
          S: SimpleFormStepperActions,
          a: StepIndicator,
          u: usePendingImageUploads
        });
        const defaultProps = {
          minStep: 0,
          initialStep: 0
        };
        function SimpleFormStepper(props, ref) {
          const {
            renderSteps,
            onCurrentStepChange,
            currentStep
          } = props;
          useDefaultProps(props, defaultProps);
          const [keyIndex, setKeyIndex] = reactExports.useState(0);
          const {
            minStep
          } = useDefaultProps(props, defaultProps);
          const resetStepper = () => {
            setKeyIndex(keyIndex + 1);
            onCurrentStepChange(0);
          };
          const setStepBack = () => {
            if (currentStep > minStep) {
              onCurrentStepChange(currentStep - 1);
            }
          };
          const setStepNext = () => {
            onCurrentStepChange(currentStep + 1);
          };
          const setStep = step => {
            if (step >= minStep && step <= maxStep) {
              onCurrentStepChange(step);
            }
          };
          reactExports.useImperativeHandle(ref, () => ({
            handleStepBack() {
              setStepBack();
            },
            handleStepNext() {
              setStepNext();
            },
            getCurrentStep() {
              return currentStep;
            },
            handleSetStep(step) {
              setStep(step);
            },
            resetStepper() {
              resetStepper();
            }
          }));
          const steps = reactExports.useMemo(() => renderSteps({
            handleStepNext: setStepNext,
            handleStepBack: setStepBack,
            setStep,
            getCurrentStep: () => currentStep
          }), [renderSteps, currentStep]);
          const maxStep = steps.length - 1;
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: props.className,
            children: steps[currentStep]
          }, keyIndex);
        }
        const SimpleFormStepper$1 = exports("b", reactExports.memo(reactExports.forwardRef(SimpleFormStepper)));
        function StepItem({
          step,
          index,
          isActive,
          isCompleted,
          canNavigate,
          onStepClick
        }) {
          const handleClick = () => {
            if (canNavigate && onStepClick) {
              onStepClick(index);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "flex items-center",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              fill: "clear",
              color: isActive ? "primary" : isCompleted ? "success" : "medium",
              disabled: !canNavigate,
              onClick: handleClick,
              className: "p-0 m-0",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: step.icon,
                className: `text-2xl ${isActive ? "text-primary" : "text-gray-400"}`
              }), isActive && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                className: "ml-2 text-sm font-medium text-primary",
                children: step.title
              })]
            })
          });
        }
        function StepIndicator({
          steps,
          currentStep,
          className = "py-4",
          onStepClick,
          allowStepNavigation = false
        }) {
          const swiperRef = reactExports.useRef(null);
          reactExports.useEffect(() => {
            if (swiperRef.current) {
              const nextStep = currentStep > 0 ? currentStep - 1 : currentStep;
              swiperRef.current.swiper.slideTo(nextStep);
              const timeout = setTimeout(() => {
                swiperRef.current?.swiper.update();
              }, 100);
              return () => {
                clearTimeout(timeout);
              };
            }
          }, [currentStep]);
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: `sticky top-0 ${className}`,
            style: {
              backgroundColor: "var(--ion-background-color, var(--ion-color-light, #fff))",
              zIndex: 400
            },
            children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              slidesPerView: "auto",
              spaceBetween: 2,
              ref: swiperRef,
              children: steps.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const canNavigate = allowStepNavigation || index <= currentStep;
                return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                  style: {
                    width: "auto"
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(StepItem, {
                    step,
                    index,
                    isActive,
                    isCompleted,
                    canNavigate,
                    onStepClick
                  })
                }, step.id);
              })
            })
          });
        }
        function SimpleFormStepperActions({
          onBack,
          onAction,
          onExit,
          showBack = true,
          showAction = true,
          backText,
          actionText,
          actionIcon,
          className = "flex justify-between p-4",
          isBackDisabled = false,
          isLastPage = false,
          isLoading = false,
          loadingMessage,
          uploadingImages = 0,
          isUploadOnly = false
        }) {
          const {
            t
          } = useTranslation();
          const isUpload = uploadingImages > 0;
          const getActionButtonText = () => {
            if (actionText) {
              return actionText;
            }
            if (isUpload) {
              return `(${uploadingImages}) ${t("Upload slika")}`;
            }
            if (isUploadOnly) {
              return t("Nastavi");
            }
            if (isLastPage) {
              return t("Sačuvaj i izađi");
            }
            return t("Sačuvaj i nastavi");
          };
          const getActionButtonIcon = () => {
            let icon = saveOutline;
            let color = "success";
            if (actionIcon) {
              icon = actionIcon;
              color = "primary";
            } else if (isUpload) {
              icon = cloudUploadOutline;
              color = "warning";
            } else if (isUploadOnly) {
              icon = arrowForwardOutline;
              color = "primary";
            }
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon,
              className: "mr-2",
              color
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [isLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: isLoading,
              message: loadingMessage || t("Čuvanje...")
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "h-20 trasnsparent"
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: `${className}  bottom-0 fixed w-full z-10 bg-black max-w-[900px]`,
              children: [showBack && /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                children: isBackDisabled ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onExit || onBack,
                  fill: "outline",
                  color: "danger",
                  style: {
                    borderColor: "var(--ion-color-danger)",
                    color: "var(--ion-color-danger)"
                  },
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: exitOutline,
                    slot: "start"
                  }), t("Izlaz")]
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onBack,
                  fill: "outline",
                  color: "primary",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: arrowBackOutline,
                    slot: "start"
                  }), backText || t("Nazad")]
                })
              }), showAction && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex gap-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: onAction,
                  color: "light",
                  disabled: isLoading,
                  children: [getActionButtonIcon(), " ", getActionButtonText()]
                })
              })]
            })]
          });
        }
        function usePendingImageUploads(form, imageFieldNames) {
          const formValues = useWatch({
            control: form.control
          });
          const detectedImageFields = reactExports.useMemo(() => {
            if (imageFieldNames) {
              return imageFieldNames;
            }
            const allValues = form.getValues();
            const detected = [];
            for (const key in allValues) {
              const value = allValues[key];
              if (Array.isArray(value) && value.length > 0 && value.some(item => item && typeof item === "object" && "url" in item)) {
                detected.push(key);
              } else if (Array.isArray(value) && value.length === 0) ;
            }
            return detected;
          }, [form, imageFieldNames]);
          const pendingImagesByField = reactExports.useMemo(() => {
            const counts = {};
            const allValues = form.getValues();
            detectedImageFields.forEach(fieldName => {
              const fieldValue = allValues[fieldName];
              if (Array.isArray(fieldValue)) {
                const pendingCount = fieldValue.filter(photo => !photo?.id || photo.id === null || photo.id === void 0).length;
                counts[fieldName] = pendingCount;
              } else {
                counts[fieldName] = 0;
              }
            });
            return counts;
          }, [form, detectedImageFields, formValues]);
          const uploadingImages = reactExports.useMemo(() => {
            return Object.values(pendingImagesByField).reduce((sum, count) => sum + count, 0);
          }, [pendingImagesByField]);
          const hasPendingUploads = uploadingImages > 0;
          return {
            uploadingImages,
            hasPendingUploads,
            pendingImagesByField,
            imageFieldNames: detectedImageFields
          };
        }
      }
    };
  });
})();
