import { e as reactExports, j as jsxRuntimeExports, af as SwiperSlide, a7 as useWatch } from "./vendor_react-Be2cnnNd.js";
import { u as useDefaultProps } from "./props-BnGoNH1d.js";
import { S as SwiperWrapper } from "./App-DeWcIyVH.js";
import { d as IonButton, l as IonIcon } from "./vendor_ionic-CEbfXmBJ.js";
const defaultProps = {
  minStep: 0,
  initialStep: 0
};
function SimpleFormStepper(props, ref) {
  const { renderSteps, onCurrentStepChange, currentStep } = props;
  useDefaultProps(props, defaultProps);
  const [keyIndex, setKeyIndex] = reactExports.useState(0);
  const { minStep } = useDefaultProps(props, defaultProps);
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
  const setStep = (step) => {
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
  const steps = reactExports.useMemo(
    () => renderSteps({
      handleStepNext: setStepNext,
      handleStepBack: setStepBack,
      setStep,
      getCurrentStep: () => currentStep
    }),
    [renderSteps, currentStep]
  );
  const maxStep = steps.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: props.className, children: steps[currentStep] }, keyIndex);
}
const SimpleFormStepper$1 = reactExports.memo(
  reactExports.forwardRef(
    SimpleFormStepper
  )
);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonButton,
    {
      fill: "clear",
      color: isActive ? "primary" : isCompleted ? "success" : "medium",
      disabled: !canNavigate,
      onClick: handleClick,
      className: "p-0 m-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonIcon,
          {
            icon: step.icon,
            className: "text-2xl ".concat(isActive ? "text-primary" : "text-gray-400")
          }
        ),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-sm font-medium text-primary", children: step.title })
      ]
    }
  ) });
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
        var _a;
        (_a = swiperRef.current) == null ? void 0 : _a.swiper.update();
      }, 100);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [currentStep]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "sticky top-0 ".concat(className),
      style: {
        backgroundColor: "var(--ion-background-color, var(--ion-color-light, #fff))",
        zIndex: 400
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperWrapper, { slidesPerView: "auto", spaceBetween: 2, ref: swiperRef, children: steps.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        const canNavigate = allowStepNavigation || index <= currentStep;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { style: { width: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          StepItem,
          {
            step,
            index,
            isActive,
            isCompleted,
            canNavigate,
            onStepClick
          }
        ) }, step.id);
      }) })
    }
  );
}
function usePendingImageUploads(form, imageFieldNames) {
  const formValues = useWatch({ control: form.control });
  const detectedImageFields = reactExports.useMemo(() => {
    if (imageFieldNames) {
      return imageFieldNames;
    }
    const allValues = form.getValues();
    const detected = [];
    for (const key in allValues) {
      const value = allValues[key];
      if (Array.isArray(value) && value.length > 0 && value.some(
        (item) => item && typeof item === "object" && "url" in item
      )) {
        detected.push(key);
      } else if (Array.isArray(value) && value.length === 0) ;
    }
    return detected;
  }, [form, imageFieldNames]);
  const pendingImagesByField = reactExports.useMemo(() => {
    const counts = {};
    const allValues = form.getValues();
    detectedImageFields.forEach((fieldName) => {
      const fieldValue = allValues[fieldName];
      if (Array.isArray(fieldValue)) {
        const pendingCount = fieldValue.filter(
          (photo) => !(photo == null ? void 0 : photo.id) || photo.id === null || photo.id === void 0
        ).length;
        counts[fieldName] = pendingCount;
      } else {
        counts[fieldName] = 0;
      }
    });
    return counts;
  }, [form, detectedImageFields, formValues]);
  const uploadingImages = reactExports.useMemo(() => {
    return Object.values(pendingImagesByField).reduce(
      (sum, count) => sum + count,
      0
    );
  }, [pendingImagesByField]);
  const hasPendingUploads = uploadingImages > 0;
  return {
    uploadingImages,
    hasPendingUploads,
    pendingImagesByField,
    imageFieldNames: detectedImageFields
  };
}
export {
  StepIndicator as S,
  SimpleFormStepper$1 as a,
  usePendingImageUploads as u
};
