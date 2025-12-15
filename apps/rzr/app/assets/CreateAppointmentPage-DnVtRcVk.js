import { e as reactExports, j as jsxRuntimeExports, af as SwiperSlide, aD as useTranslation, R as React, av as parseISO, aQ as addMinutes, ax as toZonedTime, az as fromZonedTime, aw as formatInTimeZone, aR as startOfMonth, aS as startOfWeek, aT as endOfMonth, aU as addDays, ay as format, aV as startOfDay, aW as isSameDay, aX as subMonths, aY as addMonths, aZ as isSameMonth, a4 as yup, aJ as useLocation, aE as useHistory } from "./vendor_react-CDpfJxnK.js";
import { g as useDefaultProps, h as useConfirmationAlert, S as SwiperWrapper, j as useGetFeWorkersQuery, k as activeLocation, l as SceletonLoader, m as getPathBySize, t as transformStandardResponseToCamelCase, n as getAppTimezone, r as reservationTimeInterval, o as fromUtcHM, p as useContentRefFunctions, F as FieldType, b as useUser, q as useIsBigScreen, s as useFormWithSchema, f as urlPrefix, v as pushDuplicateAndNavigate, I as IonModalExtended, D as DynamicForm, C as ConditionalComponent, w as toUtc, N as NotificationToast, x as useGetFeLocationQuery, y as useGetFeServiceCategoriesQuery, z as useGetFeServiceGroupsQuery, a as useAppDispatch, c as useAppSelector } from "./App-CTu3eXM2.js";
import { F as IonList, q as IonItem, bb as IonAvatar, l as IonIcon, aH as peopleOutline, E as IonLabel, $ as chevronForwardOutline, d as IonButton, bc as checkmarkCircle, a6 as addOutline, O as trashOutline, bd as removeOutline, aX as IonCard, aY as IonCardContent, ac as IonToggle, be as IonAccordionGroup, bf as IonAccordion, ad as calendarOutline, c as IonText, n as IonSpinner, aj as useIonRouter, a9 as useIonToast, ag as IonLoading, h as IonHeader, i as IonToolbar, j as IonTitle, b as IonContent, A as IonGrid, B as IonRow, C as IonCol, b0 as IonBadge, ae as timeOutline, bg as cashOutline, o as IonFooter, m as closeOutline, bh as calendarClearOutline, bi as chevronDownOutline, bj as chevronUpOutline, bk as arrowBack, bl as arrowForward, aU as useIonViewDidLeave } from "./vendor_ionic-ZVUk9kYn.js";
import { L as LazyLoadImgStandard, p as preloadCoverImg } from "./logo-square-HSKdvEjZ.js";
import { g as generateWeek, h as hasAnySlotsInWeek, a as getDaysWithSlotsSet, B as BookingCalendarHeader, b as BookingWeekDays } from "./BookingWeekDays-BKKABr6x.js";
import { r as rzrApi, o as TagType, k as getDeviceData, l as setDeviceData } from "./index-yaxBA1B3.js";
import { u as useCreateFeReservationMutation, a as useGetFePromoCodeDataQuery } from "./reservation.services-DwJ-2iWJ.js";
import { u as useGetFeClientDataQuery } from "./client.services-BFV7dbii.js";
import { U as UserAvatar } from "./UserAvatar-Cy51G8Q8.js";
import { u as useQueryParamsHook } from "./useQueryParamsHook-C9592_d6.js";
import "./vendor_leaflet-C9fBH8Uj.js";
import "./vendor_firebase-2Hq2X7Xz.js";
const formatPriceSimple = (price) => {
  const rounded = Math.round(price * 100) / 100;
  const hasDecimals = rounded % 1 !== 0;
  if (hasDecimals) {
    const parts = rounded.toFixed(2).split(".");
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return "".concat(integerPart, ",").concat(parts[1]);
  } else {
    return Math.round(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
};
const defaultProps = {
  minStep: 0,
  initialStep: 0
};
function FormStepper(props, ref) {
  const swiperRef = reactExports.useRef(null);
  const { renderSteps, onCurrentStepChange, returnQueryParams, swiperProps } = props;
  const { firstStepReset, initialStep } = useDefaultProps(props, defaultProps);
  const [formStep, setFormStep] = reactExports.useState(initialStep);
  const [keyIndex, setKeyIndex] = reactExports.useState(0);
  const { minStep } = useDefaultProps(props, defaultProps);
  const [presentAlert, dismiss] = useConfirmationAlert({
    cancelCallback: () => {
      dismiss();
      returnQueryParams == null ? void 0 : returnQueryParams();
    },
    confirmCallback: () => {
      var _a;
      const finishCallback = () => {
        setKeyIndex(keyIndex + 1);
        setFormStep(0);
        dismiss();
      };
      if (firstStepReset == null ? void 0 : firstStepReset.callback) {
        if (!((_a = firstStepReset == null ? void 0 : firstStepReset.callback) == null ? void 0 : _a.call(firstStepReset, finishCallback))) {
          finishCallback();
        }
      } else {
        finishCallback();
      }
    }
  });
  const resetStepper = () => {
    setKeyIndex(keyIndex + 1);
    setFormStep(0);
  };
  const handleReset = () => {
    var _a;
    if (firstStepReset) {
      if (firstStepReset.confirmationAlertOptions) {
        presentAlert(firstStepReset.confirmationAlertOptions);
      } else {
        (_a = firstStepReset.callback) == null ? void 0 : _a.call(firstStepReset);
      }
    }
  };
  const setStepBack = () => {
    setStep(formStep - 1);
    handleSlideChange(formStep + 1);
  };
  const setStepNext = () => {
    setStep(formStep + 1);
    handleSlideChange(formStep + 1);
  };
  const handleSlideChange = (slide) => {
    var _a;
    (_a = swiperRef.current) == null ? void 0 : _a.swiper.slideTo(slide);
  };
  const setStep = (step) => {
    if (step === minStep && firstStepReset) {
      handleReset();
    } else if (step <= maxStep) {
      setFormStep(step);
      handleSlideChange(step);
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
      return formStep;
    },
    handleSetStep(step) {
      setStep(step);
    },
    resetStepper() {
      resetStepper();
    }
  }));
  reactExports.useEffect(() => {
    onCurrentStepChange(formStep);
  }, [formStep]);
  const steps = reactExports.useMemo(
    () => renderSteps({
      handleStepNext: setStepNext,
      handleStepBack: setStepBack,
      setStep,
      getCurrentStep: () => formStep
    }),
    [renderSteps]
  );
  const maxStep = steps.length - 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      className: props.className,
      speed: 400,
      initialSlide: formStep,
      allowTouchMove: false,
      currentStep: formStep,
      ...swiperProps,
      ref: swiperRef,
      children: steps.map((stepWrapper, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: stepWrapper }, "slide" + index))
    }
  );
}
const FormStepper$1 = reactExports.memo(
  reactExports.forwardRef(FormStepper)
);
function SelectWorkerStep({
  workerId,
  setSelectedWorker,
  activeWorkersCount = 0,
  selectedCategory
}) {
  const { t } = useTranslation();
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({ locationSlug: activeLocation });
  const workers = (workersResult == null ? void 0 : workersResult.data) || [];
  const isWorkerSyncedCategory = (worker) => {
    const value = worker.isSyncedCategory;
    if (value === true) return true;
    if (typeof value === "number" && value === 1) return true;
    if (typeof value === "string" && value === "1") return true;
    return false;
  };
  const filteredWorkers = React.useMemo(() => {
    const activeWorkers = workers.filter((worker) => {
      const active = worker.active;
      return active === true || typeof active === "number" && active === 1;
    });
    const syncedWorkers = activeWorkers.filter(
      (worker) => isWorkerSyncedCategory(worker)
    );
    if (!selectedCategory) {
      return activeWorkers;
    }
    const categoryWorkers = activeWorkers.filter((worker) => {
      var _a;
      if (isWorkerSyncedCategory(worker)) {
        return false;
      }
      return (_a = worker.serviceCategories) == null ? void 0 : _a.some(
        (cat) => cat.id === selectedCategory.id
      );
    });
    const allWorkers = [...syncedWorkers, ...categoryWorkers];
    const uniqueWorkers = allWorkers.filter(
      (worker, index, self) => index === self.findIndex((w) => w.id === worker.id)
    );
    return uniqueWorkers;
  }, [workers, selectedCategory]);
  const handleSelectWorker = (worker) => () => {
    setSelectedWorker(worker);
  };
  reactExports.useEffect(() => {
    if (workerId && filteredWorkers.length) {
      const worker = filteredWorkers.find((w) => w.id == workerId);
      setSelectedWorker(worker);
    }
  }, [workerId, filteredWorkers]);
  if (workersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-4 py-2", children: t("Izaberite radnika") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { className: "w-full bg-inherit", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IonItem,
        {
          button: true,
          onClick: handleSelectWorker(null),
          detail: false,
          disabled: activeWorkersCount === 1,
          className: "mb-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { slot: "start", className: "w-14 h-14 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gray-700 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonIcon,
              {
                icon: peopleOutline,
                className: "text-3xl text-gray-300"
              }
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: t("Prvi slobodan") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "end", icon: chevronForwardOutline })
          ]
        }
      ),
      filteredWorkers.map((worker) => {
        var _a;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            button: true,
            onClick: handleSelectWorker(worker),
            detail: false,
            className: "mb-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { slot: "start", className: "w-14 h-14 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                LazyLoadImgStandard,
                {
                  src: getPathBySize((_a = worker.avatar) == null ? void 0 : _a.pathByResolution),
                  preloadImg: preloadCoverImg,
                  alt: worker.fullName,
                  className: "w-full h-full object-cover rounded-full"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: worker.fullName }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "end", icon: chevronForwardOutline })
            ]
          },
          worker.id
        );
      })
    ] })
  ] });
}
const maxQuantity = 4;
const maxServicesTime = 180;
function SelectServiceListItem({
  service,
  serviceGroup,
  onSelectService,
  groupsSelectedServices,
  hasMultiplePersons,
  allSelectedServicesDurationSum,
  selectedWorker
}) {
  const selectedServices = reactExports.useMemo(() => {
    const selectedGroup = groupsSelectedServices.find(
      (group) => group.serviceGroup.id === serviceGroup.id
    );
    return (selectedGroup == null ? void 0 : selectedGroup.services) || [];
  }, [groupsSelectedServices, serviceGroup]);
  const selectedService = selectedServices.find((s) => s.id === service.id);
  const isSelected = !!selectedService;
  let effectivePrice = service.price;
  let effectiveDuration = service.duration;
  if (selectedWorker && service.locationWorkers) {
    const workerData = service.locationWorkers.find(
      (worker) => worker.id === selectedWorker.id
    );
    if (workerData == null ? void 0 : workerData.pivot) {
      effectivePrice = workerData.pivot.price !== void 0 && workerData.pivot.price !== null ? workerData.pivot.price : service.price;
      effectiveDuration = workerData.pivot.duration !== void 0 && workerData.pivot.duration !== null ? workerData.pivot.duration : service.duration;
    }
  }
  const hasWorkerSelected = selectedWorker !== null && selectedWorker !== void 0;
  const currencyLabel = reactExports.useMemo(
    () => service.currency === 1 ? "EUR" : "RSD",
    [service.currency]
  );
  const priceDisplay = reactExports.useMemo(() => {
    if (hasWorkerSelected) {
      return "".concat(formatPriceSimple(effectivePrice), " ").concat(currencyLabel);
    }
    if (service.minPrice && service.maxPrice && service.minPrice !== service.maxPrice) {
      return "od ".concat(formatPriceSimple(service.minPrice), " ").concat(currencyLabel);
    }
    return "".concat(formatPriceSimple(effectivePrice), " ").concat(currencyLabel);
  }, [
    hasWorkerSelected,
    effectivePrice,
    service.minPrice,
    service.maxPrice,
    currencyLabel
  ]);
  const durationDisplay = reactExports.useMemo(() => {
    if (hasWorkerSelected) {
      return "".concat(effectiveDuration, " min");
    }
    if (service.minDuration && service.maxDuration && service.minDuration !== service.maxDuration) {
      return "od ".concat(service.minDuration, " min");
    }
    return "".concat(effectiveDuration, " min");
  }, [
    hasWorkerSelected,
    effectiveDuration,
    service.minDuration,
    service.maxDuration
  ]);
  const isMaxedOut = (selectedService == null ? void 0 : selectedService.quantity) === maxQuantity || allSelectedServicesDurationSum >= maxServicesTime;
  const handleToggleService = (e) => {
    e.stopPropagation();
    if (isSelected) {
      onSelectService(serviceGroup, selectedService);
    } else {
      onSelectService(serviceGroup, { ...service, quantity: 1 });
    }
  };
  const handleAddQuantity = (e) => {
    var _a;
    e.stopPropagation();
    if (selectedService) {
      const quantity = (_a = selectedService.quantity) != null ? _a : 1;
      if (quantity < maxQuantity && allSelectedServicesDurationSum < maxServicesTime) {
        onSelectService(serviceGroup, {
          ...selectedService,
          quantity: quantity + 1
        });
      }
    }
  };
  const handleRemoveQuantity = (e) => {
    var _a;
    e.stopPropagation();
    if (selectedService) {
      const quantity = (_a = selectedService.quantity) != null ? _a : 1;
      if (quantity > 1) {
        onSelectService(serviceGroup, {
          ...selectedService,
          quantity: quantity - 1
        });
      } else {
        onSelectService(serviceGroup, selectedService);
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      IonItem,
      {
        lines: "none",
        button: true,
        detail: false,
        onClick: handleToggleService,
        disabled: !isSelected && isMaxedOut,
        className: "".concat(isSelected && hasMultiplePersons && selectedService ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : isSelected ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { className: "py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold mb-1.5 dark:text-gray-100", children: service.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center text-sm gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500 dark:text-gray-300 font-medium", children: durationDisplay }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600 dark:text-green-500 font-semibold", children: priceDisplay })
            ] }),
            service.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2", children: service.description })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              slot: "end",
              className: "flex items-center",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonButton,
                {
                  fill: "clear",
                  size: "default",
                  color: isSelected ? "success" : "medium",
                  onClick: handleToggleService,
                  disabled: !isSelected && isMaxedOut,
                  className: "m-0",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    IonIcon,
                    {
                      icon: isSelected ? checkmarkCircle : addOutline,
                      className: "text-3xl",
                      style: isSelected ? { color: "#10b981" } : void 0
                    }
                  )
                }
              )
            }
          )
        ]
      }
    ),
    isSelected && hasMultiplePersons && selectedService && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-4 py-2 border-b border-b-green-500 border-l-4 border-l-green-500",
        style: { backgroundColor: "var(--ion-item-background)" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleRemoveQuantity, className: "p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            IonIcon,
            {
              icon: selectedService.quantity === 1 ? trashOutline : removeOutline,
              className: "text-lg",
              style: { color: "#ef4444" }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-base font-semibold px-3",
              style: { color: "var(--ion-text-color)" },
              children: selectedService.quantity
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: handleAddQuantity,
              disabled: selectedService.quantity === maxQuantity || allSelectedServicesDurationSum >= maxServicesTime,
              className: "p-1 disabled:opacity-50",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonIcon,
                {
                  icon: addOutline,
                  className: "text-lg",
                  style: { color: "#3b82f6" }
                }
              )
            }
          )
        ]
      }
    )
  ] });
}
function SelectCategorySwiper({
  categories,
  selectedCategory,
  onCategorySelect,
  showTitle = true,
  autoSelectFirst = false
}) {
  const { t } = useTranslation();
  const [activeCategoryIndex, setActiveCategoryIndex] = reactExports.useState(0);
  const [isManualSelection, setIsManualSelection] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (autoSelectFirst && categories.length > 0 && !selectedCategory) {
      onCategorySelect(categories[0]);
      setActiveCategoryIndex(0);
    }
  }, [autoSelectFirst, categories, selectedCategory, onCategorySelect]);
  reactExports.useEffect(() => {
    if (selectedCategory && !isManualSelection) {
      const index = categories.findIndex(
        (cat) => cat.id === selectedCategory.id
      );
      if (index !== -1) {
        setActiveCategoryIndex(index);
      }
    }
    setIsManualSelection(false);
  }, [selectedCategory, categories, isManualSelection]);
  const handleCategoryClick = (category, index) => {
    setIsManualSelection(true);
    if ((selectedCategory == null ? void 0 : selectedCategory.id) === category.id) {
      onCategorySelect(null);
      setActiveCategoryIndex(0);
    } else {
      onCategorySelect(category);
      setActiveCategoryIndex(index);
    }
  };
  if (categories.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    showTitle && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-4 py-2 text-lg font-semibold", children: t("Izaberite delatnost") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pl-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwiperWrapper,
      {
        slidesPerView: "auto",
        spaceBetween: 16,
        onSlideChange: (swiper) => {
          if (!isManualSelection) {
            const index = swiper.activeIndex;
            if (categories[index]) {
              setActiveCategoryIndex(index);
            }
          }
        },
        children: categories.map((category, index) => {
          const isSelected = (selectedCategory == null ? void 0 : selectedCategory.id) === category.id;
          const categoryImage = category.image ? getPathBySize(category.image.pathByResolution) : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            SwiperSlide,
            {
              style: { width: "120px", marginRight: "4px" },
              onClick: () => handleCategoryClick(category, index),
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonCard,
                {
                  color: isSelected ? "success" : "light",
                  className: "flex flex-col items-center cursor-pointer transition-all m-0 ".concat(isSelected ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : ""),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "flex flex-col items-center p-3 relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-700 dark:bg-gray-600 flex items-center justify-center text-white", children: categoryImage ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      LazyLoadImgStandard,
                      {
                        src: categoryImage,
                        preloadImg: preloadCoverImg,
                        alt: category.title,
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: peopleOutline, className: "text-4xl" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-sm font-medium text-center line-clamp-2 ".concat(isSelected ? "text-white" : ""),
                        children: category.title
                      }
                    ),
                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      IonIcon,
                      {
                        icon: checkmarkCircle,
                        className: "absolute top-1 right-1 text-2xl",
                        style: { color: "#10b981" }
                      }
                    )
                  ] })
                }
              )
            },
            category.id
          );
        })
      }
    ) })
  ] });
}
const LAST_SELECTED_CATEGORY_KEY = "rzr_last_selected_category";
const saveLastSelectedCategory = (category) => {
  if (category) {
    try {
      localStorage.setItem(LAST_SELECTED_CATEGORY_KEY, JSON.stringify(category));
    } catch (error) {
      console.warn("Failed to save last selected category:", error);
    }
  } else {
    try {
      localStorage.removeItem(LAST_SELECTED_CATEGORY_KEY);
    } catch (error) {
      console.warn("Failed to clear last selected category:", error);
    }
  }
};
const getLastSelectedCategory = () => {
  try {
    const stored = localStorage.getItem(LAST_SELECTED_CATEGORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Failed to get last selected category:", error);
  }
  return null;
};
const findLastSelectedCategory = (categories) => {
  const lastSelected = getLastSelectedCategory();
  if (lastSelected) {
    const found = categories.find((cat) => cat.id === lastSelected.id);
    return found || null;
  }
  return null;
};
function SelectAppointmentStepV2({
  onBack,
  onNext,
  selectedWorker,
  serviceGroups,
  onSelectService,
  groupsSelectedServices,
  hasMultiplePersons,
  setHasMultiplePersons,
  selectedCategory,
  onCategorySelect,
  availableCategories = []
}) {
  const { t } = useTranslation();
  const filteredCategories = reactExports.useMemo(() => {
    var _a;
    if (!selectedWorker || availableCategories.length === 0) {
      return [];
    }
    const isWorkerSyncedCategory = (worker) => {
      const value = worker.isSyncedCategory;
      if (value === true) return true;
      if (typeof value === "number" && value === 1) return true;
      if (typeof value === "string" && value === "1") return true;
      return false;
    };
    if (isWorkerSyncedCategory(selectedWorker)) {
      return availableCategories;
    }
    const workerCategoryIds = ((_a = selectedWorker.serviceCategories) == null ? void 0 : _a.map((cat) => cat.id)) || [];
    return availableCategories.filter(
      (cat) => workerCategoryIds.includes(cat.id)
    );
  }, [selectedWorker, availableCategories]);
  reactExports.useEffect(() => {
    if (selectedWorker && filteredCategories.length > 0 && !selectedCategory && onCategorySelect) {
      const lastSelected = findLastSelectedCategory(filteredCategories);
      if (lastSelected) {
        onCategorySelect(lastSelected);
      } else if (filteredCategories.length > 0) {
        onCategorySelect(filteredCategories[0]);
      }
    }
  }, [selectedWorker, filteredCategories, selectedCategory, onCategorySelect]);
  reactExports.useEffect(() => {
    if (selectedCategory && onCategorySelect) {
      saveLastSelectedCategory(selectedCategory);
    }
  }, [selectedCategory, onCategorySelect]);
  const toggleMultiplePersons = () => {
    setHasMultiplePersons(!hasMultiplePersons);
  };
  const filteredServiceGroups = reactExports.useMemo(() => {
    let filtered = serviceGroups;
    if (selectedCategory) {
      filtered = filtered.filter((group) => {
        var _a, _b;
        return (_b = (_a = group.serviceCategories) == null ? void 0 : _a.some(
          (cat) => cat.id === selectedCategory.id
        )) != null ? _b : false;
      });
    }
    if (!selectedWorker) {
      return filtered;
    }
    if (selectedWorker.isSyncedService) {
      return filtered;
    }
    return filtered.map((group) => ({
      ...group,
      services: group.services.filter((service) => {
        return service.locationWorkers && service.locationWorkers.some(
          (worker) => worker.id === selectedWorker.id
        );
      })
    }));
  }, [serviceGroups, selectedCategory, selectedWorker]);
  const allSelectedServicesDurationSum = reactExports.useMemo(() => {
    return groupsSelectedServices.reduce(
      (acc, group) => {
        var _a, _b;
        return acc + ((_b = (_a = group.services) == null ? void 0 : _a.reduce(
          (acc2, service) => {
            var _a2;
            return acc2 + service.duration * ((_a2 = service.quantity) != null ? _a2 : 1);
          },
          0
        )) != null ? _b : 0);
      },
      0
    );
  }, [groupsSelectedServices]);
  const [expandedAccordions, setExpandedAccordions] = reactExports.useState([]);
  reactExports.useEffect(() => {
    const allValues = filteredServiceGroups.map((g) => "group-".concat(g.id));
    setExpandedAccordions(allValues);
  }, [filteredServiceGroups]);
  const showCategorySelection = selectedWorker && filteredCategories.length > 0 && onCategorySelect;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-[80px]", children: [
    selectedWorker && /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-4 pt-4 pb-2 text-lg font-semibold dark:text-gray-100", children: selectedWorker.fullName }),
    showCategorySelection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectCategorySwiper,
      {
        categories: filteredCategories,
        selectedCategory: selectedCategory || null,
        onCategorySelect,
        showTitle: true,
        autoSelectFirst: true
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonToggle,
      {
        checked: hasMultiplePersons,
        onIonChange: toggleMultiplePersons,
        children: t("Za više osoba")
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonAccordionGroup,
      {
        multiple: true,
        value: expandedAccordions,
        onIonChange: (e) => {
          const val = e.detail.value;
          const next = Array.isArray(val) ? val : val ? [val] : [];
          setExpandedAccordions(next);
        },
        children: filteredServiceGroups.map((group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(IonAccordion, { value: "group-".concat(group.id), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IonItem,
            {
              slot: "header",
              className: "bg-gray-100 dark:bg-gray-800 border-l-4 border-l-blue-500",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { className: "text-base font-semibold text-gray-800 dark:text-gray-200 py-1", children: group.title })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              slot: "content",
              className: "bg-white dark:bg-[var(--ion-background-color)]",
              children: group.services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectServiceListItem,
                {
                  service,
                  serviceGroup: group,
                  onSelectService,
                  groupsSelectedServices,
                  hasMultiplePersons,
                  allSelectedServicesDurationSum,
                  selectedWorker
                },
                service.id
              ))
            }
          )
        ] }, group.id))
      }
    )
  ] });
}
function SelectCategoryAndWorkerStep({
  categories,
  selectedCategory,
  onCategorySelect,
  selectedWorker,
  setSelectedWorker,
  workerId,
  activeWorkersCount = 0
}) {
  const { t } = useTranslation();
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({ locationSlug: activeLocation });
  const workers = (workersResult == null ? void 0 : workersResult.data) || [];
  const predefinedWorker = reactExports.useMemo(() => {
    if (workerId) {
      return workers.find((w) => w.id === workerId);
    }
    return null;
  }, [workerId, workers]);
  const isWorkerSyncedCategory = (worker) => {
    const value = worker.isSyncedCategory;
    if (value === true) return true;
    if (typeof value === "number" && value === 1) return true;
    if (typeof value === "string" && value === "1") return true;
    return false;
  };
  const filteredCategories = reactExports.useMemo(() => {
    var _a;
    if (predefinedWorker) {
      if (isWorkerSyncedCategory(predefinedWorker)) {
        return categories;
      }
      const workerCategoryIds = ((_a = predefinedWorker.serviceCategories) == null ? void 0 : _a.map((cat) => cat.id)) || [];
      return categories.filter((cat) => workerCategoryIds.includes(cat.id));
    }
    return categories;
  }, [categories, predefinedWorker]);
  const filteredWorkers = reactExports.useMemo(() => {
    const activeWorkers = workers.filter((worker) => {
      const active = worker.active;
      return active === true || typeof active === "number" && active === 1;
    });
    const syncedWorkers = activeWorkers.filter(
      (worker) => isWorkerSyncedCategory(worker)
    );
    if (!selectedCategory) {
      return activeWorkers;
    }
    const categoryWorkers = activeWorkers.filter((worker) => {
      var _a;
      if (isWorkerSyncedCategory(worker)) {
        return false;
      }
      return (_a = worker.serviceCategories) == null ? void 0 : _a.some(
        (cat) => cat.id === selectedCategory.id
      );
    });
    const allWorkers = [...syncedWorkers, ...categoryWorkers];
    const uniqueWorkers = allWorkers.filter(
      (worker, index, self) => index === self.findIndex((w) => w.id === worker.id)
    );
    return uniqueWorkers;
  }, [workers, selectedCategory]);
  reactExports.useEffect(() => {
    if (predefinedWorker && !selectedWorker) {
      setSelectedWorker(predefinedWorker);
    }
  }, [predefinedWorker, selectedWorker, setSelectedWorker]);
  const handleSelectWorker = (worker) => () => {
    setSelectedWorker(worker);
  };
  if (workersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (filteredCategories.length === 0) {
    return null;
  }
  const showWorkerSelection = !predefinedWorker;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: showWorkerSelection ? "mb-6" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SelectCategorySwiper,
      {
        categories: filteredCategories,
        selectedCategory,
        onCategorySelect,
        showTitle: true,
        autoSelectFirst: false
      }
    ) }),
    showWorkerSelection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "px-4 py-2 text-lg font-semibold", children: t("Izaberite radnika") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { className: "w-full bg-inherit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonItem,
          {
            button: true,
            onClick: handleSelectWorker(null),
            detail: false,
            disabled: activeWorkersCount === 1,
            lines: "none",
            className: "mb-2 ".concat(selectedWorker === null ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { slot: "start", className: "w-14 h-14 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full bg-gray-700 flex items-center justify-center rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonIcon,
                {
                  icon: peopleOutline,
                  className: "text-3xl text-gray-300"
                }
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: t("Prvi slobodan") }) }),
              selectedWorker === null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonIcon,
                {
                  slot: "end",
                  icon: checkmarkCircle,
                  className: "text-3xl",
                  style: { color: "#10b981" }
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "end", icon: chevronForwardOutline })
            ]
          }
        ),
        filteredWorkers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: t("Nema radnika za izabranu delatnost") }) }) }) : filteredWorkers.map((worker) => {
          var _a;
          const isWorkerSelected = (selectedWorker == null ? void 0 : selectedWorker.id) === worker.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonItem,
            {
              button: true,
              onClick: handleSelectWorker(worker),
              detail: false,
              lines: "none",
              className: "mb-2 ".concat(isWorkerSelected ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { slot: "start", className: "w-14 h-14 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LazyLoadImgStandard,
                  {
                    src: getPathBySize((_a = worker.avatar) == null ? void 0 : _a.pathByResolution),
                    preloadImg: preloadCoverImg,
                    alt: worker.fullName,
                    className: "w-full h-full object-cover rounded-full"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: worker.fullName }) }),
                isWorkerSelected ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IonIcon,
                  {
                    slot: "end",
                    icon: checkmarkCircle,
                    className: "text-3xl",
                    style: { color: "#10b981" }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "end", icon: chevronForwardOutline })
              ]
            },
            worker.id
          );
        })
      ] })
    ] })
  ] });
}
const bookingCalendarApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    getWeekSlots: builder.query({
      query: (params) => {
        const body = {
          locationSlug: params.locationSlug,
          startDate: params.startDate,
          endDate: params.endDate,
          serviceIds: params.serviceIds
        };
        if (params.workerIds !== void 0 && params.workerIds !== null) {
          body.workerIds = params.workerIds;
        }
        if (params.categoryId) {
          body.categoryId = params.categoryId;
        }
        return {
          url: "locations/".concat(params.locationSlug, "/slots/week"),
          method: "POST",
          body
        };
      },
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: [
        { type: TagType.SHIFT, id: "WEEK_SLOTS" },
        { type: TagType.RESERVATION, id: "LIST" }
      ],
      // Cache za 5 minuta
      keepUnusedDataFor: 300
    }),
    getTimeGaps: builder.query({
      query: (params) => {
        const body = {
          locationSlug: params.locationSlug,
          startDate: params.startDate,
          endDate: params.endDate
        };
        if (params.workerIds !== void 0 && params.workerIds !== null) {
          body.workerIds = params.workerIds;
        }
        if (params.includeReservations !== void 0) {
          body.includeReservations = params.includeReservations;
        }
        if (params.onlyLongestGap !== void 0) {
          body.onlyLongestGap = params.onlyLongestGap;
        }
        return {
          url: "locations/".concat(params.locationSlug, "/slots/gaps"),
          method: "POST",
          body
        };
      },
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: (result, error, { locationSlug }) => [
        { type: TagType.SHIFT, id: "TIME_GAPS" },
        { type: TagType.RESERVATION, id: "LIST" },
        { type: TagType.LOCATION, id: locationSlug }
      ],
      keepUnusedDataFor: 300
      // 5 minutes
    }),
    getReservationsList: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", params.startDate);
        queryParams.append("endDate", params.endDate);
        if (params.workerIds !== void 0 && params.workerIds !== null && params.workerIds.length > 0) {
          params.workerIds.forEach(
            (id) => queryParams.append("workerIds[]", id.toString())
          );
        }
        if (params.status) {
          queryParams.append("status", params.status);
        }
        if (params.page) {
          queryParams.append("page", params.page.toString());
        }
        if (params.perPage) {
          queryParams.append("perPage", params.perPage.toString());
        }
        return {
          url: "locations/".concat(params.locationSlug, "/reservations/list?").concat(queryParams.toString()),
          method: "GET"
        };
      },
      transformResponse: transformStandardResponseToCamelCase,
      providesTags: (result, error, { locationSlug }) => [
        { type: TagType.RESERVATION, id: "LIST" },
        { type: TagType.LOCATION, id: locationSlug }
      ],
      keepUnusedDataFor: 60
      // 1 minute
    })
  })
});
const {
  useGetTimeGapsQuery
} = bookingCalendarApi;
const PAUSE_BETWEEN_SLOTS_MINUTES = 10;
const MIN_SLOT_DIFFERENCE_MINUTES = 15;
function calculateTotalServiceDuration(selectedServices) {
  return selectedServices.flatMap((group) => {
    var _a;
    return (_a = group.services) != null ? _a : [];
  }).reduce((total, service) => {
    var _a;
    return total + service.duration * ((_a = service.quantity) != null ? _a : 1);
  }, 0);
}
function canGapFitServices(gap, totalServiceDuration, pauseBetweenReservations = PAUSE_BETWEEN_SLOTS_MINUTES) {
  return gap.duration >= totalServiceDuration + pauseBetweenReservations;
}
function generateSlotsFromGaps(gaps, selectedServices, slotInterval = MIN_SLOT_DIFFERENCE_MINUTES, pauseBetweenReservations = PAUSE_BETWEEN_SLOTS_MINUTES, delay = 0) {
  if (gaps.length === 0) {
    return [];
  }
  const totalServiceDuration = calculateTotalServiceDuration(selectedServices);
  const timezone = getAppTimezone();
  const currentTime = /* @__PURE__ */ new Date();
  const slots = [];
  const validGaps = gaps.filter(
    (gap) => canGapFitServices(gap, totalServiceDuration, pauseBetweenReservations)
  );
  for (const gap of validGaps) {
    const gapStartUtc = parseISO(gap.time);
    const gapEndUtc = addMinutes(gapStartUtc, gap.duration);
    const gapStartLocal = toZonedTime(gapStartUtc, timezone);
    const gapEndLocal = toZonedTime(gapEndUtc, timezone);
    const minStartTime = addMinutes(currentTime, delay);
    if (gapStartLocal < minStartTime) {
      const adjustedStart = minStartTime;
      if (adjustedStart >= gapEndLocal) {
        continue;
      }
      generateSlotsInGap(
        adjustedStart,
        gapEndLocal,
        totalServiceDuration,
        pauseBetweenReservations,
        slotInterval,
        slots,
        gapStartLocal
      );
    } else {
      generateSlotsInGap(
        gapStartLocal,
        gapEndLocal,
        totalServiceDuration,
        pauseBetweenReservations,
        slotInterval,
        slots,
        gapStartLocal
      );
    }
  }
  const finalSlots = Array.from(new Set(slots)).sort();
  return finalSlots;
}
function generateSlotsInGap(gapStart, gapEnd, totalServiceDuration, pauseBetweenReservations, slotInterval, slots, originalGapStart) {
  const timezone = getAppTimezone();
  const allSlots = [];
  let currentNormalSlot = new Date(gapStart);
  const gapStartMinutes = currentNormalSlot.getMinutes();
  if (gapStartMinutes > 0 && gapStartMinutes < 30) {
    currentNormalSlot.setMinutes(30, 0, 0);
  } else if (gapStartMinutes >= 30) {
    currentNormalSlot.setHours(currentNormalSlot.getHours() + 1, 0, 0);
  } else {
    currentNormalSlot.setMinutes(0, 0, 0);
  }
  while (currentNormalSlot < gapEnd) {
    const slotEnd = addMinutes(currentNormalSlot, totalServiceDuration);
    if (slotEnd <= gapEnd) {
      allSlots.push(new Date(currentNormalSlot));
    }
    currentNormalSlot = addMinutes(currentNormalSlot, slotInterval);
  }
  const gapStartMinutesOnly = gapStart.getMinutes();
  const isOnNormalTime = gapStartMinutesOnly === 0 || gapStartMinutesOnly === 30;
  if (!isOnNormalTime) {
    const gapStartSlotEnd = addMinutes(gapStart, totalServiceDuration);
    if (gapStartSlotEnd <= gapEnd) {
      allSlots.push(new Date(gapStart));
    }
  }
  allSlots.sort((a, b) => a.getTime() - b.getTime());
  const filteredSlots = [];
  for (const slot of allSlots) {
    const isTooClose = filteredSlots.some((existingSlot) => {
      const diffMinutes = Math.abs((slot.getTime() - existingSlot.getTime()) / 1e3 / 60);
      return diffMinutes > 0 && diffMinutes < MIN_SLOT_DIFFERENCE_MINUTES;
    });
    if (!isTooClose) {
      filteredSlots.push(slot);
    }
  }
  for (const slot of filteredSlots) {
    const slotStartUtc = fromZonedTime(slot, timezone);
    const slotTime = formatInTimeZone(slotStartUtc, "UTC", "HH:mm");
    const isPreviousDay = slot.getDate() !== originalGapStart.getDate();
    const prefixedSlot = isPreviousDay ? "-".concat(slotTime) : slotTime;
    if (!slots.includes(prefixedSlot)) {
      slots.push(prefixedSlot);
    }
  }
}
function useBookingCalendar({
  locationSlug,
  worker,
  workerIds,
  selectedServices,
  selectedCategory,
  maxPreparedDate,
  isActive = true
}) {
  const today = reactExports.useMemo(() => /* @__PURE__ */ new Date(), []);
  const [currentWeek, setCurrentWeek] = reactExports.useState(
    () => generateWeek(today)
  );
  const [selectedDate, setSelectedDate] = reactExports.useState(today);
  const [isCalendarOpen, setIsCalendarOpen] = reactExports.useState(false);
  const [currentMonth, setCurrentMonth] = reactExports.useState(
    () => startOfMonth(today)
  );
  const [weekSlots, setWeekSlots] = reactExports.useState({});
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  const hasInitializedDate = reactExports.useRef(false);
  reactExports.useEffect(() => {
    hasInitializedDate.current = false;
  }, [worker == null ? void 0 : worker.id, workerIds, locationSlug]);
  const serviceIds = reactExports.useMemo(
    () => selectedServices.flatMap(
      (group) => {
        var _a;
        return ((_a = group.services) != null ? _a : []).map((service) => service.id).filter((id) => typeof id === "number");
      }
    ),
    [selectedServices]
  );
  const workerIdsToSend = reactExports.useMemo(() => {
    if (workerIds !== void 0 && workerIds !== null) {
      return workerIds;
    }
    if (worker == null ? void 0 : worker.id) {
      return [worker.id];
    }
    return null;
  }, [worker == null ? void 0 : worker.id, workerIds]);
  const timezone = getAppTimezone();
  const monthToUse = reactExports.useMemo(() => {
    if (isCalendarOpen && currentMonth) {
      return startOfMonth(currentMonth);
    }
    return startOfMonth(currentWeek[0]);
  }, [currentWeek, currentMonth, isCalendarOpen]);
  const startDate = reactExports.useMemo(() => {
    const monthStart = startOfMonth(monthToUse);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    return formatInTimeZone(calendarStart, timezone, "yyyy-MM-dd'T'00:00:00XXX");
  }, [monthToUse, timezone]);
  const endDate = reactExports.useMemo(() => {
    const monthEnd = endOfMonth(monthToUse);
    const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
    const calendarEnd = addDays(weekContainingMonthEnd, 6);
    return formatInTimeZone(calendarEnd, timezone, "yyyy-MM-dd'T'23:59:59XXX");
  }, [monthToUse, timezone]);
  const shouldSkip = !isActive || serviceIds.length === 0;
  const { data: workersData } = useGetFeWorkersQuery({ locationSlug });
  const workersById = reactExports.useMemo(() => {
    if (!(workersData == null ? void 0 : workersData.data)) return {};
    return workersData.data.reduce(
      (acc, worker2) => {
        acc[worker2.id] = worker2;
        return acc;
      },
      {}
    );
  }, [workersData]);
  const {
    isLoading,
    isFetching,
    data: gapsData,
    error
  } = useGetTimeGapsQuery(
    {
      locationSlug,
      startDate,
      endDate,
      workerIds: workerIdsToSend,
      includeReservations: false
      // We don't need reservations for slot generation
      // onlyLongestGap: false, // Always get all gaps, not just longest (for consistency between week and month view)
    },
    {
      skip: shouldSkip
    }
  );
  reactExports.useEffect(() => {
    if (error) {
      console.error("Error loading week slots:", error);
      setErrorMessage(
        "Slot service is currently unavailable. Please try again later."
      );
      setWeekSlots({});
    } else {
      setErrorMessage(null);
    }
  }, [error]);
  const datesToProcess = reactExports.useMemo(() => {
    if (isCalendarOpen && currentMonth) {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
      const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
      addDays(weekContainingMonthEnd, 6);
      return Array.from({ length: 35 }, (_, i) => addDays(calendarStart, i));
    }
    return currentWeek;
  }, [isCalendarOpen, currentMonth, currentWeek]);
  reactExports.useEffect(() => {
    if (gapsData == null ? void 0 : gapsData.data) {
      const { gaps: gapsByDate } = gapsData.data;
      const slotsByDate = {};
      datesToProcess.forEach((date) => {
        const dateKeyWithDashes = format(date, "yyyy-MM-dd");
        const dateKeyWithoutDashes = format(date, "yyyyMMdd");
        const dayGaps = gapsByDate[dateKeyWithoutDashes] || gapsByDate[dateKeyWithDashes] || [];
        if (dayGaps.length === 0) {
          if (workersData == null ? void 0 : workersData.data) {
            slotsByDate[dateKeyWithDashes] = workersData.data.map((worker2) => ({
              worker: worker2,
              slots: [],
              hasSlots: false
            }));
          }
          return;
        }
        const gapsByWorker = {};
        dayGaps.forEach((gap) => {
          if (!gapsByWorker[gap.workerId]) {
            gapsByWorker[gap.workerId] = [];
          }
          gapsByWorker[gap.workerId].push(gap);
        });
        const workerSlots = [];
        Object.entries(gapsByWorker).forEach(([workerIdStr, workerGaps]) => {
          const workerId = parseInt(workerIdStr, 10);
          const worker2 = workersById[workerId];
          if (!worker2) {
            return;
          }
          let gapsToUse = workerGaps;
          const slots = generateSlotsFromGaps(
            gapsToUse,
            selectedServices,
            reservationTimeInterval,
            void 0,
            // Use default pause
            30
            // delay in minutes
          );
          const timeSlots = slots.map((time) => ({
            time
          }));
          workerSlots.push({
            worker: worker2,
            slots: timeSlots,
            hasSlots: timeSlots.length > 0
          });
        });
        if (workersData == null ? void 0 : workersData.data) {
          workersData.data.forEach((worker2) => {
            const hasWorker = workerSlots.some(
              (ws) => ws.worker.id === worker2.id
            );
            if (!hasWorker) {
              workerSlots.push({
                worker: worker2,
                slots: [],
                hasSlots: false
              });
            }
          });
        }
        slotsByDate[dateKeyWithDashes] = workerSlots;
      });
      setWeekSlots(slotsByDate);
    } else if ((gapsData == null ? void 0 : gapsData.data) && Object.keys(gapsData.data.gaps).length === 0) {
      if (workersData == null ? void 0 : workersData.data) {
        const slotsByDate = {};
        datesToProcess.forEach((date) => {
          const dateKey = format(date, "yyyy-MM-dd");
          slotsByDate[dateKey] = workersData.data.map((worker2) => ({
            worker: worker2,
            slots: [],
            hasSlots: false
          }));
        });
        setWeekSlots(slotsByDate);
      } else {
        setWeekSlots({});
      }
    }
  }, [
    gapsData,
    selectedServices,
    datesToProcess,
    workersById,
    workersData,
    isCalendarOpen,
    currentMonth
  ]);
  const hasAnySlots = reactExports.useMemo(() => hasAnySlotsInWeek(weekSlots), [weekSlots]);
  const daysWithSlots = reactExports.useMemo(
    () => getDaysWithSlotsSet(weekSlots),
    [weekSlots]
  );
  const isFirstWeek = reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(today, timezone));
    const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
    return isSameDay(weekStartInTz, todayInTz);
  }, [currentWeek, timezone, today]);
  const canGoPreviousWeek = reactExports.useMemo(() => {
    const firstDayOfWeek = currentWeek[0];
    const todayInTz = startOfDay(toZonedTime(today, timezone));
    const weekStartInTz = startOfDay(toZonedTime(firstDayOfWeek, timezone));
    return weekStartInTz > todayInTz;
  }, [currentWeek, today, timezone]);
  const canGoNextWeek = reactExports.useMemo(() => {
    if (!maxPreparedDate) return true;
    const lastDayOfWeek = currentWeek[6];
    return lastDayOfWeek < maxPreparedDate;
  }, [currentWeek, maxPreparedDate]);
  const canGoPreviousMonth = reactExports.useMemo(() => {
    const todayMonth = startOfMonth(today);
    const currentMonthStart = startOfMonth(currentMonth);
    return currentMonthStart > todayMonth;
  }, [currentMonth, today]);
  const canGoNextMonth = reactExports.useMemo(() => {
    if (!maxPreparedDate) return true;
    const maxMonth = startOfMonth(maxPreparedDate);
    return currentMonth < maxMonth;
  }, [currentMonth, maxPreparedDate]);
  const canGoPrevious = reactExports.useMemo(() => {
    return isCalendarOpen ? canGoPreviousMonth : canGoPreviousWeek;
  }, [isCalendarOpen, canGoPreviousMonth, canGoPreviousWeek]);
  const canGoNext = reactExports.useMemo(() => {
    return isCalendarOpen ? canGoNextMonth : canGoNextWeek;
  }, [isCalendarOpen, canGoNextMonth, canGoNextWeek]);
  const goToPreviousWeek = reactExports.useCallback(() => {
    if (!canGoPreviousWeek) return;
    const newStartDate = addDays(currentWeek[0], -7);
    setCurrentWeek(generateWeek(newStartDate));
  }, [currentWeek, canGoPreviousWeek]);
  const goToNextWeek = reactExports.useCallback(() => {
    if (!canGoNextWeek) return;
    const newStartDate = addDays(currentWeek[0], 7);
    setCurrentWeek(generateWeek(newStartDate));
  }, [currentWeek, canGoNextWeek]);
  const goToPreviousMonth = reactExports.useCallback(() => {
    if (!canGoPreviousMonth) return;
    setCurrentMonth((prev) => startOfMonth(subMonths(prev)));
  }, [canGoPreviousMonth]);
  const goToNextMonth = reactExports.useCallback(() => {
    if (!canGoNextMonth) return;
    setCurrentMonth((prev) => startOfMonth(addMonths(prev, 1)));
  }, [canGoNextMonth]);
  const handleGoToPrevious = reactExports.useCallback(() => {
    if (isCalendarOpen) {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  }, [isCalendarOpen, goToPreviousMonth, goToPreviousWeek]);
  const handleGoToNext = reactExports.useCallback(() => {
    if (isCalendarOpen) {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  }, [isCalendarOpen, goToNextMonth, goToNextWeek]);
  const toggleCalendar = reactExports.useCallback(() => {
    setIsCalendarOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        const newMonth = startOfMonth(selectedDate);
        setCurrentMonth(newMonth);
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        if (!daysWithSlots.has(selectedDateStr)) {
          const monthStart = startOfMonth(newMonth);
          const monthEnd = endOfMonth(newMonth);
          const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
          const weekContainingMonthEnd = startOfWeek(monthEnd, {
            weekStartsOn: 1
          });
          addDays(weekContainingMonthEnd, 6);
          const monthDays = Array.from(
            { length: 35 },
            (_, i) => addDays(calendarStart, i)
          );
          const firstDayWithSlots = monthDays.find((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            return daysWithSlots.has(dateStr);
          });
          if (firstDayWithSlots) {
            setSelectedDate(firstDayWithSlots);
          }
        }
      } else {
        const todayStart = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const selectedDateStart = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );
        const daysDiff = Math.floor(
          (selectedDateStart.getTime() - todayStart.getTime()) / (1e3 * 60 * 60 * 24)
        );
        const weekNumber = Math.floor(daysDiff / 7);
        const weekStart = addDays(todayStart, weekNumber * 7);
        setCurrentWeek(generateWeek(weekStart));
      }
      return newValue;
    });
  }, [selectedDate, today, daysWithSlots]);
  const handleSelectDate = reactExports.useCallback((date) => {
    setSelectedDate(date);
  }, []);
  const handleWeekChange = reactExports.useCallback((week) => {
    setCurrentWeek(week);
  }, []);
  const handleMonthChange = reactExports.useCallback((month) => {
    setCurrentMonth(startOfMonth(month));
  }, []);
  reactExports.useEffect(() => {
    if (hasInitializedDate.current) return;
    if (Object.keys(weekSlots).length === 0) return;
    if (daysWithSlots.size === 0) return;
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const hasSlots = daysWithSlots.has(selectedDateStr);
    if (!hasSlots) {
      const todayStr = format(today, "yyyy-MM-dd");
      const todayHasSlots = daysWithSlots.has(todayStr);
      if (todayHasSlots) {
        setSelectedDate(today);
        hasInitializedDate.current = true;
        return;
      }
      const entries = Object.entries(weekSlots).filter(
        ([_, slots]) => slots.some((ws) => ws.hasSlots)
      );
      if (entries.length === 0) return;
      const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
      const upcoming = sorted.find(([dateStr]) => dateStr >= todayStr);
      const firstAvailable = upcoming ? upcoming[0] : sorted[0][0];
      if (firstAvailable) {
        setSelectedDate(new Date(firstAvailable));
        hasInitializedDate.current = true;
      }
    } else {
      hasInitializedDate.current = true;
    }
  }, [weekSlots, daysWithSlots]);
  reactExports.useEffect(() => {
    if (isCalendarOpen) {
      if (currentMonth && !isSameMonth(selectedDate, currentMonth)) {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const weekContainingMonthEnd = startOfWeek(monthEnd, {
          weekStartsOn: 1
        });
        addDays(weekContainingMonthEnd, 6);
        const monthDays = Array.from(
          { length: 35 },
          (_, i) => addDays(calendarStart, i)
        );
        const firstDayWithSlots = monthDays.find((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          return daysWithSlots.has(dateStr);
        });
        if (firstDayWithSlots) {
          setSelectedDate(firstDayWithSlots);
        }
      } else if (currentMonth && isSameMonth(selectedDate, currentMonth)) {
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        if (!daysWithSlots.has(selectedDateStr)) {
          const monthStart = startOfMonth(currentMonth);
          const monthEnd = endOfMonth(currentMonth);
          const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
          const weekContainingMonthEnd = startOfWeek(monthEnd, {
            weekStartsOn: 1
          });
          addDays(weekContainingMonthEnd, 6);
          const monthDays = Array.from(
            { length: 35 },
            (_, i) => addDays(calendarStart, i)
          );
          const firstDayWithSlots = monthDays.find((date) => {
            const dateStr = format(date, "yyyy-MM-dd");
            return daysWithSlots.has(dateStr);
          });
          if (firstDayWithSlots) {
            setSelectedDate(firstDayWithSlots);
          }
        }
      }
    } else {
      const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
      const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
      const isSelectedDateInWeek = weekDateStrs.includes(selectedDateStr);
      if (!isSelectedDateInWeek) {
        const firstDayWithSlots = currentWeek.find((date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          return daysWithSlots.has(dateStr);
        });
        if (firstDayWithSlots) {
          setSelectedDate(firstDayWithSlots);
        }
      }
    }
  }, [currentWeek, currentMonth, isCalendarOpen, daysWithSlots]);
  return {
    // State
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots: isLoading || isFetching,
    weekSlots,
    daysWithSlots,
    errorMessage,
    maxPreparedDate,
    // Actions
    setSelectedDate: handleSelectDate,
    toggleCalendar,
    // Week mod navigacija (nezavisna)
    goToPreviousWeek,
    goToNextWeek,
    canGoPreviousWeek,
    canGoNextWeek,
    // Month mod navigacija (nezavisna)
    goToPreviousMonth,
    goToNextMonth,
    canGoPreviousMonth,
    canGoNextMonth,
    // Kombinovane funkcije za kompatibilnost
    goToPrevious: handleGoToPrevious,
    goToNext: handleGoToNext,
    canGoPrevious,
    canGoNext,
    handleWeekChange,
    handleMonthChange,
    // Computed
    hasAnySlots,
    isFirstWeek
  };
}
function EmptyWeekState({
  currentWeek,
  firstAvailableDate,
  isMonthView = false,
  onFirstAvailableDateClick
}) {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonIcon,
      {
        icon: calendarOutline,
        className: "text-gray-400 dark:text-gray-500",
        style: { fontSize: "80px" }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-center mb-2 text-gray-800 dark:text-gray-100", children: isMonthView ? t("Nema slobodnih termina za ovaj mesec") : t("Nema termina za ovu nedelju") }),
    !isMonthView && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-300 text-center", children: t("Pokušajte da izaberete drugu nedelju") }),
    firstAvailableDate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-center", children: onFirstAvailableDateClick ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onFirstAvailableDateClick,
        className: "text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer",
        children: [
          t("Prvi slobodan datum"),
          ":",
          " ",
          format(firstAvailableDate, "dd.MM.yyyy")
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
      t("Prvi slobodan datum"),
      ":",
      " ",
      format(firstAvailableDate, "dd.MM.yyyy")
    ] }) })
  ] });
}
function WorkerSlotsGrid({
  slots,
  worker,
  dateFormatted,
  onSelectSlot,
  selectedSlot
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: slots.map((slot) => {
    const isPreviousDay = slot.time.startsWith("-");
    const actualTimeUtc = isPreviousDay ? slot.time.substring(1) : slot.time;
    const timeLocal = fromUtcHM(actualTimeUtc);
    const isSelected = selectedSlot && selectedSlot.worker.id === worker.id && selectedSlot.date === dateFormatted && (selectedSlot.slot.time === slot.time || selectedSlot.slot.time === "-".concat(slot.time) || "-".concat(selectedSlot.slot.time) === slot.time);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonButton,
      {
        onClick: () => onSelectSlot(slot, worker, dateFormatted),
        fill: "solid",
        size: "default",
        color: isSelected ? "success" : "dark",
        className: "text-sm font-semibold shadow-sm rounded-lg",
        children: timeLocal
      },
      slot.time
    );
  }) });
}
function DaySlotsContent({
  date,
  workerSlots,
  onSelectSlot,
  selectedServices,
  selectedSlot
}) {
  const { t } = useTranslation();
  const dateFormatted = format(date, "yyyy-MM-dd");
  const dateDisplay = format(date, "dd.MM.yyyy");
  const workersWithSlots = workerSlots.filter((ws) => ws.hasSlots);
  if (workersWithSlots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500 dark:text-gray-400", children: t("Nema slobodnih slotova za ovaj dan") }) });
  }
  const accordionValues = workersWithSlots.map(
    (workerSlot) => "worker-".concat(workerSlot.worker.id)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonAccordionGroup, { multiple: true, value: accordionValues, children: workersWithSlots.map((workerSlot) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonAccordion,
    {
      value: "worker-".concat(workerSlot.worker.id),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { slot: "header", className: "font-medium", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-base", children: [
            dateDisplay,
            " - ",
            workerSlot.worker.fullName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
            workerSlot.slots.length,
            " ",
            t("slobodnih termina")
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { slot: "content", className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkerSlotsGrid,
          {
            slots: workerSlot.slots,
            worker: workerSlot.worker,
            dateFormatted,
            onSelectSlot,
            selectedSlot
          }
        ) })
      ]
    },
    workerSlot.worker.id
  )) }) });
}
function BookingSlotsSwiper({
  weekSlots,
  selectedDate,
  currentWeek,
  onSelectSlot,
  isLoading,
  selectedServices,
  selectedCategory,
  hasAnySlots,
  errorMessage,
  onDateChange,
  onWeekChange,
  selectedSlot,
  isCalendarOpen = false,
  currentMonth,
  onMonthChange,
  firstAvailableDate
}) {
  if (errorMessage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[320px] flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: errorMessage }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { className: "w-12 h-12" }) });
  }
  const timezone = getAppTimezone();
  const swiperRef = reactExports.useRef(null);
  const contentRefFunctions = useContentRefFunctions();
  reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */ new Date(), timezone));
    const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
    return isSameDay(weekStartInTz, todayInTz);
  }, [currentWeek, timezone]);
  const daysWithSlots = reactExports.useMemo(() => {
    return Object.entries(weekSlots).filter(([_, slots]) => slots.some((ws) => ws.hasSlots)).sort(([dateA], [dateB]) => dateA.localeCompare(dateB));
  }, [weekSlots]);
  const monthHasSlots = reactExports.useMemo(() => {
    if (!isCalendarOpen || !currentMonth) return false;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
    const calendarEnd = addDays(weekContainingMonthEnd, 6);
    return daysWithSlots.some(([dateStr]) => {
      const date = new Date(dateStr);
      return date >= calendarStart && date <= calendarEnd;
    });
  }, [isCalendarOpen, currentMonth, daysWithSlots]);
  const slides = reactExports.useMemo(() => {
    const slidesList = [];
    if (isCalendarOpen && currentMonth) {
      slidesList.push({ type: "prev-month" });
      if (!monthHasSlots) {
        slidesList.push({ type: "empty-week" });
      } else {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(currentMonth);
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const weekContainingMonthEnd = startOfWeek(monthEnd, {
          weekStartsOn: 1
        });
        const calendarEnd = addDays(weekContainingMonthEnd, 6);
        const daysInMonthWithSlots = daysWithSlots.filter(([dateStr]) => {
          const date = new Date(dateStr);
          return date >= calendarStart && date <= calendarEnd;
        });
        daysInMonthWithSlots.forEach(([dateStr]) => {
          slidesList.push({
            type: "day",
            date: dateStr,
            dateObj: new Date(dateStr)
          });
        });
      }
      slidesList.push({ type: "next-month" });
    } else {
      slidesList.push({ type: "prev-week" });
      if (hasAnySlots && daysWithSlots.length > 0) {
        daysWithSlots.forEach(([dateStr]) => {
          slidesList.push({
            type: "day",
            date: dateStr,
            dateObj: new Date(dateStr)
          });
        });
      } else {
        slidesList.push({ type: "empty-week" });
      }
      slidesList.push({ type: "next-week" });
    }
    return slidesList;
  }, [daysWithSlots, hasAnySlots, isCalendarOpen, currentMonth, monthHasSlots]);
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
  const activeSlideIndex = reactExports.useMemo(() => {
    const dayIndex = slides.findIndex(
      (slide) => slide.type === "day" && slide.date === selectedDateStr
    );
    if (dayIndex >= 0) {
      return dayIndex;
    }
    const firstContentIndex = slides.findIndex(
      (slide) => slide.type === "day" || slide.type === "empty-week"
    );
    return firstContentIndex >= 0 ? firstContentIndex : 1;
  }, [slides, selectedDateStr]);
  const computedFirstAvailableDate = reactExports.useMemo(() => {
    if (firstAvailableDate) return firstAvailableDate;
    const entries = Object.entries(weekSlots).filter(
      ([_, slots]) => slots.some((ws) => ws.hasSlots)
    );
    if (entries.length === 0) return null;
    const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
    return new Date(sorted[0][0]);
  }, [weekSlots, firstAvailableDate]);
  reactExports.useRef(activeSlideIndex);
  reactExports.useRef(currentMonth);
  reactExports.useRef(isCalendarOpen);
  reactExports.useEffect(() => {
    var _a;
    if (!((_a = swiperRef.current) == null ? void 0 : _a.swiper)) return;
    if (activeSlideIndex < 0 || activeSlideIndex >= slides.length) return;
    setTimeout(() => {
      var _a2;
      if ((_a2 = swiperRef.current) == null ? void 0 : _a2.swiper) {
        const currentIndex = swiperRef.current.swiper.activeIndex;
        if (currentIndex !== activeSlideIndex) {
          swiperRef.current.swiper.slideTo(activeSlideIndex, 0);
        }
      }
    }, 50);
  }, [activeSlideIndex, slides.length, currentWeek, currentMonth]);
  const scrollToTopIfNeeded = async () => {
    var _a, _b, _c;
    try {
      const scrollElement = await ((_b = (_a = contentRefFunctions == null ? void 0 : contentRefFunctions.contentRef) == null ? void 0 : _a.current) == null ? void 0 : _b.getScrollElement());
      const scrollTop = (_c = scrollElement == null ? void 0 : scrollElement.scrollTop) != null ? _c : 0;
      if (scrollTop > 300) {
        contentRefFunctions == null ? void 0 : contentRefFunctions.scrollToTop(500);
      }
    } catch (error) {
    }
  };
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const activeSlide = slides[activeIndex];
    if (!activeSlide) return;
    if (isCalendarOpen && currentMonth) {
      if (activeSlide.type === "prev-month" && onMonthChange) {
        const prevMonth = startOfMonth(subMonths(currentMonth));
        onMonthChange(prevMonth);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "next-month" && onMonthChange) {
        const nextMonth = startOfMonth(addMonths(currentMonth, 1));
        onMonthChange(nextMonth);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "day" && activeSlide.date && onDateChange) {
        onDateChange(new Date(activeSlide.date));
      }
    } else {
      if (activeSlide.type === "prev-week" && onWeekChange) {
        const newStartDate = addDays(currentWeek[0], -7);
        const newWeek = generateWeek(newStartDate);
        onWeekChange(newWeek);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "next-week" && onWeekChange) {
        const newStartDate = addDays(currentWeek[0], 7);
        const newWeek = generateWeek(newStartDate);
        onWeekChange(newWeek);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "day" && activeSlide.date && onDateChange) {
        onDateChange(new Date(activeSlide.date));
      }
    }
  };
  const handleSlideChangeTransitionStart = async (swiper) => {
    scrollToTopIfNeeded();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      ref: swiperRef,
      spaceBetween: 16,
      navigation: true,
      onSlideChange: handleSlideChange,
      onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
      children: slides.map((slide, index) => {
        if (slide.type === "prev-week" || slide.type === "prev-month") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 dark:text-gray-500 text-sm", children: slide.type === "prev-month" ? "Prethodni mesec..." : "Prethodna nedelja..." }) }) }, slide.type);
        }
        if (slide.type === "next-week" || slide.type === "next-month") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 dark:text-gray-500 text-sm", children: slide.type === "next-month" ? "Sledeći mesec..." : "Sledeća nedelja..." }) }) }, slide.type);
        }
        if (slide.type === "empty-week") {
          const handleFirstAvailableDateClick = computedFirstAvailableDate ? () => {
            if (onDateChange && computedFirstAvailableDate) {
              onDateChange(computedFirstAvailableDate);
              setTimeout(() => {
                var _a;
                const dateStr = format(
                  computedFirstAvailableDate,
                  "yyyy-MM-dd"
                );
                const targetIndex = slides.findIndex(
                  (s) => s.type === "day" && s.date === dateStr
                );
                if (targetIndex >= 0 && ((_a = swiperRef.current) == null ? void 0 : _a.swiper)) {
                  swiperRef.current.swiper.slideTo(targetIndex, 500);
                }
              }, 100);
            }
          } : void 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyWeekState,
            {
              currentWeek,
              firstAvailableDate: computedFirstAvailableDate,
              isMonthView: isCalendarOpen,
              onFirstAvailableDateClick: handleFirstAvailableDateClick
            }
          ) }, "empty-week");
        }
        if (slide.type === "day" && slide.date) {
          const workerSlots = weekSlots[slide.date] || [];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DaySlotsContent,
            {
              date: slide.dateObj,
              workerSlots,
              onSelectSlot,
              selectedServices,
              selectedSlot
            }
          ) }, slide.date);
        }
        return null;
      })
    }
  ) });
}
const getCreateAppointmentFormFields = (t) => [
  {
    keyName: "note",
    name: "note",
    data: {
      type: FieldType.Text,
      label: t("Napomena")
    },
    gridSize: {
      size: "6"
    }
  },
  {
    keyName: "promoCode",
    name: "promoCode",
    data: {
      type: FieldType.Text,
      label: t("Promo kod")
    },
    gridSize: {
      size: "6"
    }
  }
];
const schema = yup.object().shape({
  note: yup.string().nullable().default(null),
  promoCode: yup.string().nullable().default(null)
});
function CreateReservationModal({
  onConfirm,
  onCancel,
  isOpen,
  worker,
  selectedServices,
  dateOnly,
  timeUtc,
  dateFormatted
}, ref) {
  var _a, _b, _c;
  const { t } = useTranslation();
  const [createReservation, createReservationResponse] = useCreateFeReservationMutation();
  const { isOwnerOrWorker } = useUser();
  const isBigScreen = useIsBigScreen();
  const initialModalBp = isOwnerOrWorker ? 0.4 : 0.5;
  const [promoCodeData, setPromoCodeData] = reactExports.useState(null);
  const [currentBreakpoint, setCurrentBreakpoint] = reactExports.useState(initialModalBp);
  const router = useIonRouter();
  const { push } = router;
  const [presentToast] = useIonToast();
  const internalModalRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, () => internalModalRef.current, []);
  const modalRef = internalModalRef;
  const { data: clientResponse } = useGetFeClientDataQuery(void 0, {
    skip: !!isOwnerOrWorker
  });
  const clientData = clientResponse == null ? void 0 : clientResponse.data;
  const form = useFormWithSchema(schema, {
    defaultValues: {
      note: null,
      promoCode: null
    }
  });
  const formFields = getCreateAppointmentFormFields(t);
  const promoCode = form.watch("promoCode");
  const {
    data: promoCodeResponse,
    isFetching: isPromoCodeFetching,
    refetch
  } = useGetFePromoCodeDataQuery(
    {
      locationSlug: activeLocation,
      code: promoCode != null ? promoCode : ""
    },
    {
      skip: !(promoCode == null ? void 0 : promoCode.length) || !(promoCode != null ? promoCode : "").endsWith("#")
    }
  );
  const duration = reactExports.useMemo(() => {
    return selectedServices == null ? void 0 : selectedServices.reduce(
      (acc, service) => {
        var _a2;
        return acc + service.duration * ((_a2 = service.quantity) != null ? _a2 : 1);
      },
      0
    );
  }, [selectedServices]);
  const cost = reactExports.useMemo(() => {
    return (selectedServices == null ? void 0 : selectedServices.reduce(
      (acc, service) => {
        var _a2;
        return acc + service.price * ((_a2 = service.quantity) != null ? _a2 : 1);
      },
      0
    )) || 0;
  }, [selectedServices]);
  const onSubmit = (data) => {
    handleConfirmReservation();
  };
  const handleConfirmReservation = () => {
    var _a2;
    const dateUtcString = formatInTimeZone(dateOnly, "UTC", "yyyy-MM-dd") + "".concat(timeUtc, ":00");
    createReservation({
      locationSlug: activeLocation,
      locationWorkerId: worker.id,
      dateUtc: dateUtcString,
      services: selectedServices.map((service) => {
        var _a3;
        return {
          id: service.id,
          quantity: (_a3 = service.quantity) != null ? _a3 : 1
        };
      }),
      clientId: clientData == null ? void 0 : clientData.id,
      promoCode: promoCodeData == null ? void 0 : promoCodeData.name,
      notice: (_a2 = form.getValues("note")) != null ? _a2 : void 0
    });
  };
  const handleBreakpointChange = (event) => {
    setCurrentBreakpoint(event.detail.breakpoint);
  };
  const hasDiscount = (_a = promoCodeData == null ? void 0 : promoCodeData.discountValue) != null ? _a : 0 > 0;
  const isDiscountInPercent = (_b = promoCodeData == null ? void 0 : promoCodeData.inPercent) != null ? _b : false;
  const getPriceWithDiscount = () => {
    var _a2, _b2;
    if (hasDiscount) {
      const discountPrice = isDiscountInPercent ? cost - cost * ((_a2 = promoCodeData == null ? void 0 : promoCodeData.discountValue) != null ? _a2 : 0) / 100 : cost - ((_b2 = promoCodeData == null ? void 0 : promoCodeData.discountValue) != null ? _b2 : 0);
      return Math.round(discountPrice / 50) * 50;
    } else {
      return cost;
    }
  };
  const isModalBigScreen = currentBreakpoint >= 0.8;
  const timeLocal = fromUtcHM(timeUtc);
  const formattedDate = reactExports.useMemo(() => {
    return format(dateOnly, "dd.MM.yyyy.");
  }, [dateOnly]);
  const footerBottomClass = reactExports.useMemo(() => {
    if (currentBreakpoint === 0.4) {
      return "bottom-[60vh]";
    } else if (currentBreakpoint === 0.5) {
      return "bottom-[50vh]";
    } else if (currentBreakpoint === 0.8) {
      return "bottom-[20vh]";
    }
    return "bottom-0";
  }, [currentBreakpoint]);
  const handleCloseModal = reactExports.useCallback(() => {
    var _a2;
    (_a2 = modalRef == null ? void 0 : modalRef.current) == null ? void 0 : _a2.dismiss();
  }, [modalRef]);
  const handleInputFocus = () => {
    var _a2;
    !isBigScreen && ((_a2 = modalRef == null ? void 0 : modalRef.current) == null ? void 0 : _a2.setCurrentBreakpoint(0.8));
  };
  reactExports.useEffect(() => {
    var _a2;
    if (createReservationResponse.isSuccess && ((_a2 = createReservationResponse.data) == null ? void 0 : _a2.success)) {
      const data = createReservationResponse.data.data;
      onConfirm == null ? void 0 : onConfirm();
      onCancel();
      const destination = "".concat(urlPrefix, "/r/").concat(data.hash, "?backToHome=1");
      pushDuplicateAndNavigate(router, destination);
    } else if (createReservationResponse.isError && createReservationResponse.error && "data" in createReservationResponse.error) {
      const errorData = createReservationResponse.error.data;
      presentToast({
        message: errorData.message,
        duration: 3e3,
        color: "danger"
      });
    }
  }, [createReservationResponse, router]);
  reactExports.useEffect(() => {
    if ((promoCodeResponse == null ? void 0 : promoCodeResponse.data) === null) {
      form.setValue("promoCode", "");
      presentToast({
        message: t("Promo kod nije validan"),
        duration: 3e3,
        color: "danger"
      });
    } else if (promoCodeResponse == null ? void 0 : promoCodeResponse.data) {
      setPromoCodeData(promoCodeResponse.data);
    }
  }, [promoCodeResponse]);
  reactExports.useEffect(() => {
    if (promoCode == null ? void 0 : promoCode.endsWith("#")) {
      if ((promoCodeResponse == null ? void 0 : promoCodeResponse.data) && promoCode === promoCodeResponse.data.name) {
        setPromoCodeData(promoCodeResponse == null ? void 0 : promoCodeResponse.data);
      } else {
        refetch();
      }
    } else {
      setPromoCodeData(null);
    }
  }, [promoCode]);
  const breakpoints = isBigScreen ? void 0 : [0, initialModalBp, 0.8, 1];
  const initialBreakpoint = isBigScreen ? void 0 : initialModalBp;
  const backdropBreakpoint = isBigScreen ? void 0 : initialModalBp;
  const showBackdrop = isBigScreen ? void 0 : false;
  const modalClassName = isBigScreen ? void 0 : "hd-extended";
  const footerClassName = isBigScreen ? void 0 : "fixed left-0 w-full z-[100] ".concat(footerBottomClass);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonModalExtended,
    {
      name: "create-reservation-modal",
      isOpen,
      onClose: onCancel,
      breakpoints,
      showBackdrop,
      onIonBreakpointDidChange: handleBreakpointChange,
      backdropBreakpoint,
      initialBreakpoint,
      className: modalClassName,
      ref: modalRef,
      children: [
        createReservationResponse.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(IonLoading, { isOpen: true, message: t("Kreiranje rezervacije...") }),
        isPromoCodeFetching && /* @__PURE__ */ jsxRuntimeExports.jsx(IonLoading, { isOpen: true, message: t("Provera promo koda...") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonHeader, { className: isBigScreen ? "px-0" : "px-1", color: "warning", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonToolbar,
          {
            className: isBigScreen ? "max-w-2xl mx-auto" : "",
            color: "dark",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full", children: [
              ((_c = worker.avatar) == null ? void 0 : _c.pathByResolution) ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { className: "w-10 h-10 rounded-full flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                LazyLoadImgStandard,
                {
                  src: getPathBySize(worker.avatar.pathByResolution),
                  alt: worker.fullName,
                  className: "w-full h-full object-cover rounded-full"
                }
              ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { fullName: worker.fullName, size: 40 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                IonTitle,
                {
                  className: "".concat(isBigScreen ? "text-xl font-semibold" : "", " flex-1"),
                  children: worker.fullName
                }
              )
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: isBigScreen ? "ion-padding" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isBigScreen ? "max-w-2xl mx-auto py-4" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-2xl font-semibold mb-4", children: [
            formattedDate,
            " ",
            timeLocal
          ] }),
          !isOwnerOrWorker && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "form",
            {
              onFocus: handleInputFocus,
              className: isBigScreen ? "mb-6" : "",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            IonGrid,
            {
              className: isBigScreen ? "ion-no-padding !px-0" : "ion-no-padding mt-2 !px-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonRow, { className: isBigScreen ? "gap-4" : "", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  IonCol,
                  {
                    size: isModalBigScreen ? "12" : "6",
                    className: "flex items-center ".concat(isBigScreen ? "justify-start gap-3" : isModalBigScreen ? "justify-between" : "justify-between"),
                    children: [
                      isBigScreen && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                        t("Trajanje usluge"),
                        ":"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ConditionalComponent,
                        {
                          condition: isModalBigScreen && !isBigScreen,
                          render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                            t("Trajanje usluge"),
                            ":"
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { className: "p-2", color: "primary", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, className: "mr-1" }),
                        duration,
                        " min"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  IonCol,
                  {
                    size: isModalBigScreen ? "12" : "6",
                    className: "flex items-center ".concat(isBigScreen ? "justify-start gap-3" : isModalBigScreen ? "justify-between" : "justify-end"),
                    children: [
                      isBigScreen && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                        t("Cena"),
                        ":"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ConditionalComponent,
                        {
                          condition: isModalBigScreen && !isBigScreen,
                          render: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium", children: [
                            t("Cena"),
                            ":"
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { color: "success", className: "p-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cashOutline, className: "mr-1" }),
                        hasDiscount ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("s", { className: "px-1 opacity-75", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cost }) }),
                          getPriceWithDiscount()
                        ] }) : cost,
                        " ",
                        "RSD"
                      ] })
                    ]
                  }
                )
              ] })
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { className: footerClassName, color: "dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { className: isBigScreen ? "max-w-2xl mx-auto" : "", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              slot: "start",
              color: "medium",
              onClick: handleCloseModal,
              className: isBigScreen ? "ml-0" : "ml-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeOutline }),
                t("Zatvori")
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              slot: "end",
              color: "primary",
              onClick: form.handleSubmit(onSubmit),
              className: isBigScreen ? "mr-0" : "mr-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarClearOutline, className: "mr-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { slot: "end", children: t("Kreiraj rezervaciju") })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
const CreateReservationModal$1 = reactExports.forwardRef(
  CreateReservationModal
);
function BookingCalendarStep({
  locationWorker,
  workerIds,
  selectedGroupServices,
  selectedCategory,
  onBack,
  isActive = true
}) {
  const { t } = useTranslation();
  const [presentToast] = useIonToast();
  const { data: queryParams, delete: deleteQueryParams } = useQueryParamsHook(
    {}
  );
  const hasAutoSelectedSlot = reactExports.useRef(false);
  const [shouldShowNotification, setShouldShowNotification] = reactExports.useState(false);
  const hasAutoSwitchedToMonth = reactExports.useRef(false);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const {
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots,
    weekSlots,
    daysWithSlots,
    setSelectedDate,
    toggleCalendar,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext,
    hasAnySlots,
    errorMessage,
    maxPreparedDate,
    handleWeekChange,
    handleMonthChange,
    isFirstWeek
  } = useBookingCalendar({
    locationSlug: activeLocation,
    worker: locationWorker,
    workerIds,
    selectedServices: selectedGroupServices,
    selectedCategory,
    isActive
    // Prosleđi isActive da bi se API pozivao samo kada je korak aktivan
    // TODO: Dodati maxPreparedDate iz shifts
  });
  const flattenedServices = reactExports.useMemo(
    () => selectedGroupServices.flatMap((group) => {
      var _a;
      return (_a = group.services) != null ? _a : [];
    }).filter(Boolean),
    [selectedGroupServices]
  );
  const firstAvailableDate = reactExports.useMemo(() => {
    const entries = Object.entries(weekSlots).filter(
      ([_, slots]) => slots.some((ws) => ws.hasSlots)
    );
    if (entries.length === 0) return null;
    const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
    const upcoming = sorted.find(([dateStr]) => dateStr >= todayStr);
    return upcoming ? new Date(upcoming[0]) : new Date(sorted[0][0]);
  }, [weekSlots]);
  const hasWeekSlots = reactExports.useMemo(() => {
    const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
    return weekDateStrs.some((dateStr) => daysWithSlots.has(dateStr));
  }, [currentWeek, daysWithSlots]);
  reactExports.useEffect(() => {
    hasAutoSwitchedToMonth.current = false;
  }, [locationWorker == null ? void 0 : locationWorker.id, workerIds, selectedCategory == null ? void 0 : selectedCategory.id]);
  reactExports.useEffect(() => {
    if (!isCalendarOpen && isFirstWeek && !isLoadingSlots && Object.keys(weekSlots).length > 0 && !hasWeekSlots && !hasAutoSwitchedToMonth.current) {
      hasAutoSwitchedToMonth.current = true;
      toggleCalendar();
      if (selectedDate) {
        handleMonthChange(startOfMonth(selectedDate));
      }
    }
  }, [
    isCalendarOpen,
    isFirstWeek,
    isLoadingSlots,
    weekSlots,
    hasWeekSlots,
    toggleCalendar,
    selectedDate,
    handleMonthChange
  ]);
  const handleSelectDate = (date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    if (!daysWithSlots.has(dateStr)) {
      presentToast({
        message: t("Nema slobodnih slotova za ovaj dan"),
        duration: 2e3,
        position: "bottom",
        color: "warning"
      });
      return;
    }
    setSelectedDate(date);
  };
  const handleSelectSlot = (slot, worker, date) => {
    setSelectedSlot({ slot, worker, date });
    setIsModalOpen(true);
  };
  const handleConfirmReservation = () => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };
  const handleCancelReservation = reactExports.useCallback(() => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  }, []);
  reactExports.useEffect(() => {
    if (hasAutoSelectedSlot.current || !isActive || isLoadingSlots || !queryParams.slot || !queryParams.date || Object.keys(weekSlots).length === 0) {
      return;
    }
    const urlSlot = queryParams.slot;
    const urlDate = queryParams.date;
    if (!daysWithSlots.has(urlDate)) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      deleteQueryParams(["slot", "date"]);
      return;
    }
    const daySlots = weekSlots[urlDate];
    if (!daySlots || daySlots.length === 0) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      deleteQueryParams(["slot", "date"]);
      return;
    }
    const slotUtcFromLocal = toUtc(urlSlot);
    const slotUtcHM = slotUtcFromLocal.substring(0, 5);
    let foundSlot = false;
    for (const workerSlot of daySlots) {
      const matchingSlot = workerSlot.slots.find((slot) => {
        const actualTimeUtc = slot.time.startsWith("-") ? slot.time.substring(1) : slot.time;
        return actualTimeUtc === slotUtcHM || actualTimeUtc === urlSlot;
      });
      if (matchingSlot) {
        foundSlot = true;
        const dateObj = parseISO(urlDate);
        setSelectedDate(dateObj);
        setTimeout(() => {
          handleSelectSlot(matchingSlot, workerSlot.worker, urlDate);
          hasAutoSelectedSlot.current = true;
          deleteQueryParams(["slot", "date"]);
        }, 100);
        break;
      }
    }
    if (!foundSlot) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      deleteQueryParams(["slot", "date"]);
    }
  }, [
    isActive,
    isLoadingSlots,
    queryParams.slot,
    queryParams.date,
    weekSlots,
    daysWithSlots,
    setSelectedDate,
    handleSelectSlot,
    deleteQueryParams
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingCalendarHeader,
      {
        currentWeek,
        currentMonth,
        selectedDate,
        isCalendarOpen,
        isLoadingSlots,
        onToggleCalendar: toggleCalendar,
        onPreviousWeek: goToPrevious,
        onNextWeek: goToNext,
        canGoPrevious,
        canGoNext
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingWeekDays,
      {
        currentWeek,
        selectedDate,
        onSelectDate: handleSelectDate,
        daysWithSlots,
        maxPreparedDate,
        onWeekChange: handleWeekChange,
        isMonthView: isCalendarOpen,
        currentMonth,
        onMonthChange: handleMonthChange
      }
    ),
    !isCalendarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: toggleCalendar,
        className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
        "aria-label": "Prikaži mesec",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronDownOutline, className: "w-4 h-4 mr-1" }),
          "Mesec"
        ]
      }
    ) }),
    isCalendarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: toggleCalendar,
        className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
        "aria-label": "Prikaži nedelju",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronUpOutline, className: "w-4 h-4 mr-1" }),
          "Nedelja"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-[80px] px-2 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingSlotsSwiper,
      {
        weekSlots,
        selectedDate,
        currentWeek,
        onSelectSlot: handleSelectSlot,
        isLoading: isLoadingSlots,
        selectedServices: selectedGroupServices,
        selectedCategory,
        hasAnySlots,
        errorMessage: errorMessage != null ? errorMessage : void 0,
        onDateChange: setSelectedDate,
        onWeekChange: handleWeekChange,
        selectedSlot,
        isCalendarOpen,
        currentMonth,
        onMonthChange: handleMonthChange,
        firstAvailableDate
      }
    ) }),
    selectedSlot && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateReservationModal$1,
      {
        isOpen: isModalOpen,
        onConfirm: handleConfirmReservation,
        onCancel: handleCancelReservation,
        worker: selectedSlot.worker,
        selectedServices: flattenedServices,
        dateOnly: new Date(selectedSlot.date),
        timeUtc: selectedSlot.slot.time,
        dateFormatted: selectedSlot.date
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NotificationToast,
      {
        message: t("Taj termin više nije slobodan"),
        type: "warning",
        duration: 5e3,
        position: "top",
        isOpen: shouldShowNotification,
        onDidDismiss: () => setShouldShowNotification(false),
        cssClass: "animate-pulse"
      }
    )
  ] });
}
var InputType = /* @__PURE__ */ ((InputType2) => {
  InputType2[InputType2["checkbox"] = 0] = "checkbox";
  InputType2[InputType2["radio"] = 1] = "radio";
  InputType2[InputType2["select"] = 2] = "select";
  return InputType2;
})(InputType || {});
function CreateAppointmentSteps({ appointment }) {
  var _a, _b;
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  const { wrapUserLoginModal } = useUser();
  const { data: queryParams } = useQueryParamsHook({});
  const formRef = reactExports.useRef(null);
  const queryWorkerId = reactExports.useMemo(() => {
    const workerParam = queryParams["worker"];
    if (workerParam) {
      const parsed = parseInt(workerParam, 10);
      return isNaN(parsed) ? void 0 : parsed;
    }
    return void 0;
  }, [queryParams]);
  const [activeStep, setActiveStep] = reactExports.useState(
    parseInt((_a = queryParams["step"]) != null ? _a : "0")
  );
  const [hasMultiplePersons, setHasMultiplePersons] = reactExports.useState(false);
  const contentRefFunctions = useContentRefFunctions();
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({
    locationSlug: activeLocation
  });
  const workers = (workersResult == null ? void 0 : workersResult.data) || [];
  const activeWorkers = workers.filter(
    (worker) => worker.active
  );
  const [selectedWorker, setSelectedWorker] = reactExports.useState();
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const [groupsSelectedServices, setGroupsSelectedServices] = reactExports.useState([]);
  const { data: locationResponse } = useGetFeLocationQuery({
    slug: activeLocation
  });
  const locationData = locationResponse == null ? void 0 : locationResponse.data;
  const { data: categoriesResult } = useGetFeServiceCategoriesQuery(
    {
      locationSlug: activeLocation,
      active: true
    },
    { skip: !((_b = locationData == null ? void 0 : locationData.serviceCategories) == null ? void 0 : _b.length) }
  );
  const categories = (categoriesResult == null ? void 0 : categoriesResult.data) || (locationData == null ? void 0 : locationData.serviceCategories) || [];
  const hasMultipleActivities = !!(locationData == null ? void 0 : locationData.hasMultipleActivities);
  const locationHasCategories = hasMultipleActivities && categories.length > 0;
  const maxStep = 2;
  const {
    data: serviceGroupsResult,
    isLoading: serviceGroupsLoading,
    isFetching: serviceGroupsFetching
  } = useGetFeServiceGroupsQuery({
    locationSlug: activeLocation,
    withWorkers: 1
    // Always load workers data
  });
  const serviceGroups = serviceGroupsResult == null ? void 0 : serviceGroupsResult.data;
  const landedDirectlyOnStep1 = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (queryParams["step"] === "1" && history.length <= 2) {
      landedDirectlyOnStep1.current = true;
    }
  }, []);
  const canGoToStep = (step) => {
    if (locationHasCategories) {
      if (step === 0 && !selectedCategory) return false;
      if (step === 0 && selectedWorker === void 0) return false;
      if (step === 1 && selectedWorker === void 0) return false;
      if (step === 2 && groupsSelectedServices.length === 0) return false;
    } else {
      if (step === 0 && selectedWorker === void 0) return false;
      if (step === 1 && selectedWorker === void 0) return false;
      if (step === 2 && groupsSelectedServices.length === 0) return false;
    }
    return true;
  };
  const handleSetStep = (step, options) => {
    var _a2, _b2;
    const { replace = false, bypassGuard = false } = options || {};
    if (!bypassGuard && !canGoToStep(step)) return;
    const params = new URLSearchParams(location.search);
    const currentStepFromUrl = parseInt((_a2 = params.get("step")) != null ? _a2 : "0", 10);
    params.set("step", step.toString());
    if (replace || currentStepFromUrl === step && activeStep === void 0) {
      history.replace({ search: params.toString() });
    } else if (activeStep && activeStep > step) {
      history.goBack();
    } else if (activeStep === 2 && step === 1) {
      history.replace({ search: params.toString() });
    } else {
      history.push({ search: params.toString() });
    }
    setActiveStep(step);
    (_b2 = formRef.current) == null ? void 0 : _b2.handleSetStep(step);
    contentRefFunctions == null ? void 0 : contentRefFunctions.scrollToTop(50);
  };
  const forceSetStep = (step) => {
    var _a2;
    const params = new URLSearchParams(location.search);
    params.set("step", step.toString());
    history.replace({ search: params.toString() });
    setActiveStep(step);
    (_a2 = formRef.current) == null ? void 0 : _a2.handleSetStep(step);
    contentRefFunctions == null ? void 0 : contentRefFunctions.scrollToTop(50);
  };
  const handleNextStep = () => {
    if (activeStep !== void 0 && activeStep < maxStep) {
      handleSetStep(activeStep + 1);
    }
  };
  const handleBackStep = () => {
    if (activeStep === 1 && landedDirectlyOnStep1.current) {
      history.goBack();
    } else if (activeStep !== void 0 && activeStep > 0) {
      handleSetStep(activeStep - 1, { bypassGuard: true });
    }
  };
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category) {
      try {
        localStorage.setItem(
          "rzr_last_selected_category",
          JSON.stringify(category)
        );
      } catch (error) {
        console.warn("Failed to save last selected category:", error);
      }
    }
    const shouldResetWorker = !queryWorkerId;
    if (locationHasCategories && activeStep === 0 && category && selectedWorker !== void 0) {
      if (shouldResetWorker) {
        setSelectedWorker(void 0);
      }
      setTimeout(() => {
        handleSetStep(1, { bypassGuard: true });
      }, 50);
    } else {
      if (shouldResetWorker) {
        setSelectedWorker(void 0);
      }
    }
  };
  const handleSelectWorker = (worker) => {
    setSelectedWorker(worker);
    if (locationHasCategories && activeStep === 0) {
      if (selectedCategory) {
        handleSetStep(1, { bypassGuard: true });
      }
    } else if (!locationHasCategories && activeStep === 0) {
      handleSetStep(1, { bypassGuard: true });
    }
  };
  const handleSelectService = (serviceGroup, service) => {
    setGroupsSelectedServices((prev) => {
      const index = prev.findIndex(
        (item) => item.serviceGroup.id === serviceGroup.id
      );
      if (index > -1) {
        const group = prev[index].serviceGroup;
        const services = prev[index].services;
        if (services) {
          const serviceIndex = services.findIndex(
            (item) => item.id === service.id
          );
          if (serviceIndex > -1) {
            const existingService = services[serviceIndex];
            const isToggle = existingService.quantity === service.quantity;
            if (hasMultiplePersons) {
              if (isToggle) {
                services.splice(serviceIndex, 1);
              } else if (service.quantity && service.quantity > 0) {
                services[serviceIndex] = service;
              }
            } else {
              services.splice(serviceIndex, 1);
            }
          } else if (group.inputType !== InputType.checkbox && !hasMultiplePersons) {
            services.splice(0, services.length);
            services.push(service);
          } else {
            services.push(service);
          }
          if (services.length === 0) {
            prev.splice(index, 1);
          }
        }
      } else {
        prev.push({ serviceGroup, services: [service] });
      }
      return [...prev];
    });
  };
  const handleHasMultiplePersons = (has) => {
    setHasMultiplePersons(has);
    setGroupsSelectedServices([]);
  };
  const allSelectedServices = reactExports.useMemo(
    () => groupsSelectedServices.filter((groupService) => {
      var _a2;
      return (_a2 = groupService.services) == null ? void 0 : _a2.length;
    }).map((group) => group.services).flat(),
    [groupsSelectedServices]
  );
  const nextButtonDisabled = reactExports.useMemo(() => {
    if (activeStep === void 0) return true;
    if (activeStep === 0) {
      if (locationHasCategories) {
        return !selectedCategory || selectedWorker === void 0;
      }
      return selectedWorker === void 0;
    }
    if (activeStep === 1) {
      return groupsSelectedServices.length === 0;
    }
    return true;
  }, [
    activeStep,
    selectedWorker,
    selectedCategory,
    groupsSelectedServices,
    locationHasCategories
  ]);
  const getBadgeQuantityOfServices = (service) => service.quantity && service.quantity > 1 ? "x".concat(service.quantity) : "";
  reactExports.useEffect(() => {
    var _a2;
    (_a2 = wrapUserLoginModal()) == null ? void 0 : _a2();
  }, []);
  reactExports.useEffect(() => {
    if (queryWorkerId && workers.length > 0) {
      const workerFromUrl = workers.find((w) => w.id === queryWorkerId);
      if (workerFromUrl && workerFromUrl.active) {
        if (!selectedWorker || selectedWorker.id !== queryWorkerId) {
          setSelectedWorker(workerFromUrl);
        }
        return;
      }
      if (selectedWorker && selectedWorker.id === queryWorkerId) {
        setSelectedWorker(void 0);
      }
    } else if (!queryWorkerId && selectedWorker) {
      if (activeWorkers.length !== 1) {
        setSelectedWorker(void 0);
      }
    }
    if (activeWorkers.length === 1 && !selectedWorker && !queryWorkerId) {
      const singleWorker = activeWorkers[0];
      setSelectedWorker(singleWorker);
    }
  }, [queryWorkerId, workers, activeWorkers, selectedWorker]);
  reactExports.useEffect(() => {
    if (activeStep === void 0) return;
    const calendarStep = 2;
    if (activeStep === calendarStep && groupsSelectedServices.length === 0) {
      const servicesStep = 1;
      forceSetStep(servicesStep);
    }
  }, [activeStep, selectedWorker, groupsSelectedServices]);
  reactExports.useEffect(() => {
    var _a2;
    if (locationHasCategories && queryWorkerId && selectedWorker && categories.length > 0 && activeStep === 0) {
      const workerCategoryIds = ((_a2 = selectedWorker.serviceCategories) == null ? void 0 : _a2.map((cat) => cat.id)) || [];
      const workerCategories = categories.filter(
        (cat) => workerCategoryIds.includes(cat.id)
      );
      const value = selectedWorker.isSyncedCategory;
      const isWorkerSyncedCategory = value === true || typeof value === "number" && value === 1 || typeof value === "string" && value === "1";
      if (isWorkerSyncedCategory) {
        if (categories.length === 1 && !selectedCategory) {
          setSelectedCategory(categories[0]);
          setTimeout(() => {
            forceSetStep(1);
          }, 100);
        }
      } else {
        if (workerCategories.length === 1 && !selectedCategory) {
          setSelectedCategory(workerCategories[0]);
          setTimeout(() => {
            forceSetStep(1);
          }, 100);
        }
      }
    }
  }, [
    locationHasCategories,
    queryWorkerId,
    selectedWorker,
    categories,
    selectedCategory,
    activeStep,
    forceSetStep
  ]);
  reactExports.useEffect(() => {
    var _a2, _b2;
    const params = new URLSearchParams(location.search);
    const stepFromUrl = parseInt((_a2 = params.get("step")) != null ? _a2 : "0", 10);
    setActiveStep(stepFromUrl);
    (_b2 = formRef.current) == null ? void 0 : _b2.handleSetStep(stepFromUrl);
  }, [location.search]);
  if ((serviceGroupsLoading || serviceGroupsFetching || workersLoading) && activeStep) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormStepper$1,
      {
        className: "mt-2 max-w-[1200px] overflow-y-scroll",
        ref: formRef,
        minStep: 0,
        swiperProps: {
          onSlideChangeTransitionEnd: () => {
            contentRefFunctions == null ? void 0 : contentRefFunctions.scrollToTop(50);
          }
        },
        renderSteps: () => {
          const categoryAndWorkerStep = locationHasCategories ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectCategoryAndWorkerStep,
            {
              categories,
              selectedCategory,
              onCategorySelect: handleSelectCategory,
              selectedWorker,
              setSelectedWorker: handleSelectWorker,
              workerId: selectedWorker ? void 0 : queryWorkerId,
              activeWorkersCount: activeWorkers.length
            },
            "category-worker"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectWorkerStep,
            {
              selectedWorker,
              setSelectedWorker: handleSelectWorker,
              workerId: selectedWorker ? void 0 : queryWorkerId,
              activeWorkersCount: activeWorkers.length,
              selectedCategory: null
            },
            "worker"
          );
          const serviceStep = serviceGroups && !serviceGroupsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectAppointmentStepV2,
            {
              onBack: handleBackStep,
              onNext: handleNextStep,
              selectedWorker,
              serviceGroups,
              groupsSelectedServices,
              onSelectService: handleSelectService,
              hasMultiplePersons,
              setHasMultiplePersons: handleHasMultiplePersons,
              selectedCategory,
              onCategorySelect: locationHasCategories ? handleSelectCategory : void 0,
              availableCategories: categories
            },
            "service"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {})
            },
            "service-loading"
          );
          const allWorkerIds = queryWorkerId ? [queryWorkerId] : selectedWorker ? null : [];
          const workerForCalendar = queryWorkerId ? null : selectedWorker || null;
          const calendarStep = /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookingCalendarStep,
            {
              locationWorker: workerForCalendar,
              workerIds: allWorkerIds,
              selectedGroupServices: groupsSelectedServices,
              selectedCategory,
              isActive: activeStep === 2
            },
            "datetime-".concat(queryWorkerId || "all", "-").concat((selectedWorker == null ? void 0 : selectedWorker.id) || "none")
          );
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex items-center justify-center py-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Odaberite radnika kako biste nastavili") })
            },
            "datetime-placeholder"
          );
          const steps = [];
          if (locationHasCategories) {
            steps.push(categoryAndWorkerStep);
            steps.push(serviceStep);
            steps.push(calendarStep);
          } else {
            steps.push(categoryAndWorkerStep);
            steps.push(serviceStep);
            steps.push(calendarStep);
          }
          return steps;
        },
        initialStep: activeStep != null ? activeStep : 0,
        onCurrentStepChange: setActiveStep
      }
    ),
    activeStep !== void 0 && activeStep > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonFooter, { className: "ion-no-border fixed bottom-2 left-0 right-0 space-y-2", children: [
      activeStep === 2 && allSelectedServices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 flex gap-2 overflow-x-auto", children: allSelectedServices.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonBadge,
        {
          color: "warning",
          className: "text-black whitespace-nowrap flex-shrink-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { className: "text-xs font-medium", children: [
            service.title,
            " ",
            getBadgeQuantityOfServices(service)
          ] })
        },
        "selected-".concat(service.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { className: "px-2 h-[76px]", color: "translucent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonButton,
          {
            onClick: handleBackStep,
            slot: "start",
            color: "dark",
            size: "large",
            disabled: activeStep === 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: arrowBack }),
              t("Nazad")
            ]
          }
        ),
        activeStep < maxStep && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          IonButton,
          {
            onClick: handleNextStep,
            slot: "end",
            color: "dark",
            size: "large",
            disabled: nextButtonDisabled,
            children: [
              t("Dalje"),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: arrowForward })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function CreateAppointmentPage() {
  const { userData } = useUser();
  const dispatch = useAppDispatch();
  const deviceData = useAppSelector(getDeviceData);
  reactExports.useEffect(() => {
    if (!deviceData.notificationsEnabled && userData) {
      dispatch(setDeviceData({ notificationsEnabled: true }));
    }
  }, [deviceData, userData]);
  useIonViewDidLeave(() => {
    console.log("useIonViewDidLeave inside");
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CreateAppointmentSteps, {});
}
export {
  CreateAppointmentPage as default
};
