import { e as reactExports, j as jsxRuntimeExports, af as SwiperSlide, ai as useTranslation, R as React, aA as format, aP as startOfMonth, aQ as endOfMonth, aR as startOfWeek, aS as addDays, aT as startOfDay, az as toZonedTime, a4 as yup, ay as formatInTimeZone, ax as parseISO, aJ as useLocation, ah as useHistory } from "./vendor_react-BVRDO8z9.js";
import { g as useDefaultProps, h as useConfirmationAlert, S as SwiperWrapper, j as useGetFeWorkersQuery, k as activeLocation, l as SceletonLoader, m as getPathBySize, n as fromUtcHM, o as useContentRefFunctions, q as getAppTimezone, F as FieldType, b as useUser, r as useIsBigScreen, s as useFormWithSchema, f as urlPrefix, t as pushDuplicateAndNavigate, I as IonModalExtended, D as DynamicForm, v as useQueryParamsHook, N as NotificationToast, w as useGetFeLocationQuery, x as useGetFeServiceCategoriesQuery, y as useGetFeServiceGroupsQuery } from "./App-CRc2PEW1.js";
import { F as IonList, q as IonItem, be as IonAvatar, l as IonIcon, aM as peopleOutline, E as IonLabel, a0 as chevronForwardOutline, d as IonButton, bf as checkmarkCircle, a6 as addOutline, O as trashOutline, bg as removeOutline, a_ as IonCard, a$ as IonCardContent, ac as IonToggle, bh as IonAccordionGroup, bi as IonAccordion, ad as calendarOutline, c as IonText, n as IonSpinner, al as useIonRouter, a9 as useIonToast, ag as IonLoading, h as IonHeader, i as IonToolbar, ae as timeOutline, b as IonContent, bj as cashOutline, b3 as IonBadge, o as IonFooter, m as closeOutline, bk as calendarClearOutline, bl as chevronDownOutline, bm as chevronUpOutline, bn as arrowBack, bo as arrowForward } from "./vendor_ionic-CnFg9owC.js";
import { L as LazyLoadImgStandard, p as preloadCoverImg } from "./logo-square-hdC7FBbC.js";
import { u as useBookingCalendarContext, W as WeekSwiperWrapper, B as BookingCalendarContext, S as SLOT_SEARCH_TOLERANCE_MINUTES, a as BookingCalendarHeader, b as BookingWeekDays, c as BookingCalendarProvider } from "./WeekSwiperWrapper-B5kWZU3-.js";
import { u as useCreateFeReservationMutation, a as useGetFePromoCodeDataQuery } from "./reservation.services-BAUH_p8B.js";
import { u as useGetFeClientDataQuery } from "./client.services-F4NdHDVM.js";
import { U as UserAvatar } from "./UserAvatar-WrfH-Me4.js";
import "./vendor_leaflet-BdieFp9x.js";
import "./index-Dy86UVN9.js";
import "./vendor_firebase-DKsXaMug.js";
import "./workingShift.fe-services-BHCrc8IG.js";
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
  selectedWorker,
  disabled = false
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
  const isServiceDisabled = disabled || !isSelected && isMaxedOut;
  const handleToggleService = (e) => {
    e.stopPropagation();
    if (isServiceDisabled) {
      return;
    }
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
        disabled: isServiceDisabled,
        className: "".concat(isSelected && hasMultiplePersons && selectedService ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : isSelected ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : disabled ? "opacity-50 cursor-not-allowed border-b border-b-gray-400 dark:border-b-gray-600 border-l-4 border-l-gray-400 dark:border-l-gray-600" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
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
                  disabled: isServiceDisabled,
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
                        className: "text-sm font-medium text-center line-clamp-2 ".concat(isSelected ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-gray-100"),
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
function useAvailableWorkers({
  groupsSelectedServices,
  serviceGroups,
  allActiveWorkers
}) {
  const selectedServiceIds = reactExports.useMemo(() => {
    return groupsSelectedServices.flatMap((group) => {
      var _a;
      return (_a = group.services) != null ? _a : [];
    }).map((service) => service.id).filter((id) => typeof id === "number");
  }, [groupsSelectedServices]);
  const availableWorkers = reactExports.useMemo(() => {
    if (selectedServiceIds.length === 0) {
      return allActiveWorkers;
    }
    if (!serviceGroups) {
      return [];
    }
    const allServices = serviceGroups.flatMap((group) => group.services);
    const syncedWorkers = allActiveWorkers.filter(
      (worker) => worker.isSyncedService
    );
    const workersByService = selectedServiceIds.map((serviceId) => {
      const service = allServices.find((s) => s.id === serviceId);
      if (!service) {
        return [];
      }
      const serviceWorkers = service.locationWorkers || [];
      return serviceWorkers;
    });
    if (workersByService.length === 0) {
      return [];
    }
    const firstServiceWorkers = workersByService[0];
    if (firstServiceWorkers.length === 0) {
      return syncedWorkers;
    }
    const commonWorkers = workersByService.reduce((acc, workers) => {
      if (acc.length === 0) {
        return workers;
      }
      return acc.filter((worker) => workers.some((w) => w.id === worker.id));
    }, firstServiceWorkers);
    const uniqueCommonWorkers = commonWorkers.filter(
      (worker, index, self) => index === self.findIndex((w) => w.id === worker.id)
    );
    const allAvailableWorkers = [
      ...uniqueCommonWorkers,
      ...syncedWorkers.filter(
        (syncedWorker) => !uniqueCommonWorkers.some((w) => w.id === syncedWorker.id)
      )
    ];
    return allAvailableWorkers;
  }, [selectedServiceIds, serviceGroups, allActiveWorkers]);
  return {
    availableWorkers,
    selectedServiceIds
  };
}
function useDisabledServices({
  selectedServiceIds,
  availableWorkers,
  serviceGroups
}) {
  const disabledServiceIds = reactExports.useMemo(() => {
    if (selectedServiceIds.length === 0) {
      return /* @__PURE__ */ new Set();
    }
    if (!serviceGroups) {
      return /* @__PURE__ */ new Set();
    }
    if (availableWorkers.length === 0) {
      const allServiceIds = serviceGroups.flatMap((group) => group.services).map((service) => service.id);
      return new Set(allServiceIds);
    }
    const disabled = /* @__PURE__ */ new Set();
    const allServices = serviceGroups.flatMap((group) => group.services);
    allServices.forEach((service) => {
      if (selectedServiceIds.includes(service.id)) {
        return;
      }
      const serviceWorkers = service.locationWorkers || [];
      const canBePerformed = availableWorkers.some((worker) => {
        if (worker.isSyncedService) {
          return true;
        }
        return serviceWorkers.some((w) => w.id === worker.id);
      });
      if (!canBePerformed) {
        disabled.add(service.id);
      }
    });
    return disabled;
  }, [selectedServiceIds, availableWorkers, serviceGroups]);
  return disabledServiceIds;
}
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
  availableCategories = [],
  queryWorkerId
}) {
  const { t } = useTranslation();
  const { data: workersResult } = useGetFeWorkersQuery({
    locationSlug: activeLocation
  });
  const allActiveWorkers = reactExports.useMemo(() => {
    const workers = (workersResult == null ? void 0 : workersResult.data) || [];
    return workers.filter((worker) => worker.active);
  }, [workersResult]);
  const { availableWorkers, selectedServiceIds } = useAvailableWorkers({
    groupsSelectedServices,
    serviceGroups,
    allActiveWorkers
  });
  const disabledServiceIds = useDisabledServices({
    selectedServiceIds,
    availableWorkers,
    serviceGroups
  });
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
  const showCategorySelection = queryWorkerId && selectedWorker && filteredCategories.length > 0 && onCategorySelect;
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
                  selectedWorker,
                  disabled: disabledServiceIds.has(service.id)
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
function useWorkerIdsForCalendar({
  groupsSelectedServices,
  serviceGroups,
  allActiveWorkers
}) {
  const { availableWorkers, selectedServiceIds } = useAvailableWorkers({
    groupsSelectedServices,
    serviceGroups,
    allActiveWorkers
  });
  const workerIds = reactExports.useMemo(() => {
    if (selectedServiceIds.length === 0) {
      return null;
    }
    return availableWorkers.map((worker) => worker.id);
  }, [availableWorkers, selectedServiceIds]);
  return workerIds;
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
            disabled: activeWorkersCount === 1 || categories.length > 0 && !selectedCategory,
            lines: "none",
            className: "mb-2 ".concat(selectedWorker === null ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : activeWorkersCount === 1 || categories.length > 0 && !selectedCategory ? "opacity-50 border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
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
          const isDisabled = categories.length > 0 && !selectedCategory;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonItem,
            {
              button: true,
              onClick: handleSelectWorker(worker),
              detail: false,
              disabled: isDisabled,
              lines: "none",
              className: "mb-2 ".concat(isWorkerSelected ? "bg-green-500/10 border-b border-b-green-500 border-l-4 border-l-green-500" : isDisabled ? "opacity-50 border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500" : "border-b border-b-gray-600/60 dark:border-b-gray-600/70 border-l-4 border-l-gray-500 dark:border-l-gray-500"),
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
  onSelectSlot,
  selectedSlot,
  firstAvailableDate
}) {
  useContentRefFunctions();
  const {
    weekSlots,
    monthSlots,
    selectedDate,
    currentWeek,
    isLoadingSlots: isLoading,
    selectedServices,
    selectedCategory,
    hasAnySlots,
    errorMessage,
    setSelectedDate: onDateChange,
    changeWeek,
    changeMonth,
    isCalendarOpen,
    currentMonth,
    isFirstWeek,
    isFirstMonth,
    today,
    maxPreparedDate
  } = useBookingCalendarContext();
  const activeSlots = isCalendarOpen ? monthSlots : weekSlots;
  const daysWithSlots = reactExports.useMemo(() => {
    return Object.entries(activeSlots).filter(([_, slots]) => slots.some((ws) => ws.hasSlots)).sort(([dateA], [dateB]) => dateA.localeCompare(dateB));
  }, [activeSlots]);
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
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
      const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
      const calendarEnd = addDays(weekContainingMonthEnd, 6);
      const timezone2 = getAppTimezone();
      const todayMonth = startOfMonth(startOfDay(toZonedTime(today, timezone2)));
      const currentMonthStart = startOfMonth(currentMonth);
      const canGoPreviousMonth = currentMonthStart > todayMonth;
      if (canGoPreviousMonth) {
        slidesList.push({ type: "prev-month" });
      }
      const daysInMonthWithSlots = daysWithSlots.filter(([dateStr]) => {
        const date = new Date(dateStr);
        return date >= calendarStart && date <= calendarEnd;
      });
      if (daysInMonthWithSlots.length > 0) {
        daysInMonthWithSlots.forEach(([dateStr]) => {
          slidesList.push({
            type: "day",
            date: dateStr,
            dateObj: new Date(dateStr)
          });
        });
      } else {
        slidesList.push({ type: "empty-month" });
      }
      const canGoNextMonth = !maxPreparedDate || currentMonthStart < startOfMonth(maxPreparedDate);
      if (canGoNextMonth) {
        slidesList.push({ type: "next-month" });
      }
    } else {
      if (!isFirstWeek) {
        slidesList.push({ type: "prev-week" });
      }
      const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
      const daysInWeekWithSlots = daysWithSlots.filter(
        ([dateStr]) => weekDateStrs.includes(dateStr)
      );
      if (daysInWeekWithSlots.length > 0) {
        daysInWeekWithSlots.forEach(([dateStr]) => {
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
  }, [
    daysWithSlots,
    hasAnySlots,
    isCalendarOpen,
    currentMonth,
    currentWeek,
    monthHasSlots,
    isFirstWeek,
    today,
    maxPreparedDate
  ]);
  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const activeSlideIndex = reactExports.useMemo(() => {
    if (!selectedDateStr) {
      const firstDayIndex = slides.findIndex(
        (slide) => slide.type === "day" || slide.type === "empty-week" || slide.type === "empty-month"
      );
      return firstDayIndex >= 0 ? firstDayIndex : 1;
    }
    const dayIndex = slides.findIndex(
      (slide) => slide.type === "day" && slide.date === selectedDateStr
    );
    if (dayIndex >= 0) {
      return dayIndex;
    }
    const firstContentIndex = slides.findIndex(
      (slide) => slide.type === "day" || slide.type === "empty-week" || slide.type === "empty-month"
    );
    return firstContentIndex >= 0 ? firstContentIndex : 1;
  }, [slides, selectedDateStr]);
  const computedFirstAvailableDate = reactExports.useMemo(() => {
    if (firstAvailableDate) return firstAvailableDate;
    const entries = Object.entries(activeSlots).filter(
      ([_, slots]) => slots.some((ws) => ws.hasSlots)
    );
    if (entries.length === 0) return null;
    const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
    return new Date(sorted[0][0]);
  }, [activeSlots, firstAvailableDate]);
  if (errorMessage) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[320px] flex items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: errorMessage }) });
  }
  if (isLoading && selectedDate === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 flex items-center justify-center z-50 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { className: "w-12 h-12" }) });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { className: "w-12 h-12" }) });
  }
  const swiperKey = isCalendarOpen ? "month-".concat(currentMonth == null ? void 0 : currentMonth.toISOString()) : "week-".concat(currentWeek[0].toISOString());
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    WeekSwiperWrapper,
    {
      currentWeek,
      onWeekChange: changeWeek,
      onDateChange,
      onMonthChange: changeMonth,
      currentMonth,
      isCalendarOpen,
      isFirstWeek,
      slides,
      activeSlideIndex,
      swiperOptions: {
        slidesPerView: 1,
        watchSlidesProgress: false,
        virtual: false,
        allowTouchMove: true
      },
      slideToAnimationDuration: 300,
      children: (slide) => {
        if (slide.type === "prev-week" || slide.type === "prev-month") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) });
        }
        if (slide.type === "next-week" || slide.type === "next-month") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) });
        }
        if (slide.type === "empty-week" || slide.type === "empty-month") {
          const handleFirstAvailableDateClick = computedFirstAvailableDate ? () => {
            if (onDateChange && computedFirstAvailableDate) {
              onDateChange(computedFirstAvailableDate);
            }
          } : void 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyWeekState,
            {
              currentWeek,
              firstAvailableDate: computedFirstAvailableDate,
              isMonthView: isCalendarOpen,
              onFirstAvailableDateClick: handleFirstAvailableDateClick
            }
          );
        }
        if (slide.type === "day" && slide.date && slide.dateObj) {
          const workerSlots = activeSlots[slide.date] || [];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            DaySlotsContent,
            {
              date: slide.dateObj,
              workerSlots,
              onSelectSlot,
              selectedServices,
              selectedSlot
            },
            slide.date
          );
        }
        return null;
      }
    },
    swiperKey
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
  const initialModalBp = isOwnerOrWorker ? 0.5 : 0.6;
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
    if (currentBreakpoint === 0.5) {
      return "bottom-[50vh]";
    } else if (currentBreakpoint === 0.6) {
      return "bottom-[40vh]";
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
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between w-full px-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, className: "text-lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: formattedDate })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, className: "text-lg" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: timeLocal })
              ] })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: isBigScreen ? "ion-padding" : "", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: isBigScreen ? "max-w-2xl mx-auto py-4" : "px-4 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            ((_c = worker.avatar) == null ? void 0 : _c.pathByResolution) ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonAvatar, { className: "w-12 h-12 rounded-full flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              LazyLoadImgStandard,
              {
                src: getPathBySize(worker.avatar.pathByResolution),
                alt: worker.fullName,
                className: "w-full h-full object-cover rounded-full"
              }
            ) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserAvatar, { fullName: worker.fullName, size: 48 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold", children: worker.fullName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "form",
            {
              onFocus: handleInputFocus,
              className: isBigScreen ? "mb-6" : "mb-2 create-reservation-form",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicForm, { fields: formFields, form })
            }
          ),
          isModalBigScreen || isBigScreen ? (
            // Lista za veći ekran ili proširen modal
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, className: "text-lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("Trajanje usluge") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                  duration,
                  " min"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cashOutline, className: "text-lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("Cena") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium", children: [
                  hasDiscount ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("s", { className: "px-1 opacity-75", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cost }) }),
                    getPriceWithDiscount()
                  ] }) : cost,
                  " ",
                  "RSD"
                ] })
              ] }),
              selectedServices && selectedServices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, className: "text-lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: t("Usluge") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap justify-end", children: selectedServices.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IonBadge,
                  {
                    color: "warning",
                    className: "text-black whitespace-nowrap flex-shrink-0",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { className: "text-xs font-medium", children: [
                      service.title,
                      service.quantity && service.quantity > 1 ? " x".concat(service.quantity) : ""
                    ] })
                  },
                  "service-".concat(service.id)
                )) })
              ] })
            ] })
          ) : (
            // Swiper za telefon (inicijalna veličina)
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              SwiperWrapper,
              {
                slidesPerView: "auto",
                spaceBetween: 12,
                className: "pb-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { style: { width: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { className: "p-3", color: "primary", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: timeOutline, className: "mr-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-medium", children: [
                      duration,
                      " min"
                    ] })
                  ] }) }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { style: { width: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { color: "success", className: "p-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cashOutline, className: "mr-2" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base font-medium", children: [
                      hasDiscount ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("s", { className: "px-1 opacity-75", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cost }) }),
                        getPriceWithDiscount()
                      ] }) : cost,
                      " ",
                      "RSD"
                    ] })
                  ] }) }) }),
                  selectedServices && selectedServices.length > 0 && selectedServices.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { style: { width: "auto" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    IonBadge,
                    {
                      color: "warning",
                      className: "text-black whitespace-nowrap p-3",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { className: "text-xs font-medium", children: [
                        service.title,
                        service.quantity && service.quantity > 1 ? " x".concat(service.quantity) : ""
                      ] })
                    }
                  ) }) }, "service-".concat(service.id)))
                ]
              }
            )
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
function BookingCalendarStep({ onBack }) {
  const { t } = useTranslation();
  useIonToast();
  const { data: queryParams } = useQueryParamsHook({});
  const [shouldShowNotification, setShouldShowNotification] = reactExports.useState(false);
  const [nearestSlotFound, setNearestSlotFound] = reactExports.useState(false);
  reactExports.useRef(false);
  const [hasNavigatedToQueryDate, setHasNavigatedToQueryDate] = reactExports.useState(false);
  const hasAutoSelectedSlot = reactExports.useRef(false);
  const pendingSlotSelection = reactExports.useRef(null);
  const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const context = reactExports.useContext(BookingCalendarContext);
  if (!context) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { className: "w-12 h-12" }) });
  }
  const {
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots,
    weekSlots,
    monthSlots,
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
    isFirstWeek,
    isFirstMonth,
    today,
    selectedServices: selectedGroupServices,
    selectedCategory,
    isActive
  } = context;
  const activeSlots = isCalendarOpen ? monthSlots : weekSlots;
  const flattenedServices = reactExports.useMemo(
    () => selectedGroupServices.flatMap((group) => {
      var _a;
      return (_a = group.services) != null ? _a : [];
    }).filter(Boolean),
    [selectedGroupServices]
  );
  const firstAvailableDate = reactExports.useMemo(() => {
    const entries = Object.entries(activeSlots).filter(
      ([_, slots]) => slots.some((ws) => ws.hasSlots)
    );
    if (entries.length === 0) return null;
    const todayStr = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
    const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
    const upcoming = sorted.find(([dateStr]) => dateStr >= todayStr);
    return upcoming ? new Date(upcoming[0]) : new Date(sorted[0][0]);
  }, [activeSlots]);
  reactExports.useMemo(() => {
    const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
    return weekDateStrs.some((dateStr) => daysWithSlots.has(dateStr));
  }, [currentWeek, daysWithSlots]);
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
    setHasNavigatedToQueryDate(false);
    hasAutoSelectedSlot.current = false;
    pendingSlotSelection.current = null;
  }, [queryParams.date]);
  reactExports.useEffect(() => {
    if (!pendingSlotSelection.current || hasAutoSelectedSlot.current || !selectedDate || !queryParams.date) {
      return;
    }
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    if (selectedDateStr !== queryParams.date) {
      return;
    }
    const { slot, worker, date } = pendingSlotSelection.current;
    handleSelectSlot(slot, worker, date);
    hasAutoSelectedSlot.current = true;
    pendingSlotSelection.current = null;
  }, [selectedDate, queryParams.date, handleSelectSlot]);
  reactExports.useEffect(() => {
    if (!isActive || !queryParams.date || isCalendarOpen || hasNavigatedToQueryDate) {
      return;
    }
    const urlDate = parseISO(queryParams.date);
    const weekStart = currentWeek[0];
    const weekEnd = currentWeek[6];
    const urlDateNormalized = new Date(
      urlDate.getFullYear(),
      urlDate.getMonth(),
      urlDate.getDate()
    );
    const weekStartNormalized = new Date(
      weekStart.getFullYear(),
      weekStart.getMonth(),
      weekStart.getDate()
    );
    const weekEndNormalized = new Date(
      weekEnd.getFullYear(),
      weekEnd.getMonth(),
      weekEnd.getDate()
    );
    const isDateInCurrentWeek = urlDateNormalized >= weekStartNormalized && urlDateNormalized <= weekEndNormalized;
    console.log("🔍 Navigation check:", {
      urlDate: format(urlDate, "yyyy-MM-dd"),
      weekStart: format(weekStart, "yyyy-MM-dd"),
      weekEnd: format(weekEnd, "yyyy-MM-dd"),
      isDateInCurrentWeek,
      hasNavigatedToQueryDate,
      canGoNext
    });
    if (isDateInCurrentWeek) {
      console.log("✅ Date is in current week, navigation complete");
      setHasNavigatedToQueryDate(true);
      return;
    }
    if (!isDateInCurrentWeek && canGoNext) {
      console.log("➡️ Date not in current week, going to next week...");
      setTimeout(() => {
        goToNext();
      }, 100);
    }
  }, [
    isActive,
    queryParams.date,
    isCalendarOpen,
    currentWeek,
    canGoNext,
    goToNext,
    hasNavigatedToQueryDate
  ]);
  reactExports.useEffect(() => {
    if (!hasNavigatedToQueryDate || hasAutoSelectedSlot.current || !isActive || isLoadingSlots || !queryParams.slot || !queryParams.date || Object.keys(activeSlots).length === 0) {
      return;
    }
    const urlSlot = queryParams.slot;
    const urlDate = queryParams.date;
    if (!activeSlots[urlDate]) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      return;
    }
    if (!daysWithSlots.has(urlDate)) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      return;
    }
    const daySlots = activeSlots[urlDate];
    if (!daySlots || daySlots.length === 0) {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
      return;
    }
    const findNearestSlot = (clickedTimeLocal, allSlots, toleranceMinutes = SLOT_SEARCH_TOLERANCE_MINUTES) => {
      const [clickedHours, clickedMinutes] = clickedTimeLocal.split(":").map(Number);
      const clickedTotalMinutes = clickedHours * 60 + clickedMinutes;
      const availableSlots = allSlots.map((slot) => {
        const actualTimeUtc = slot.time.startsWith("-") ? slot.time.substring(1) : slot.time;
        const timeLocal = fromUtcHM(actualTimeUtc);
        const [hours, minutes] = timeLocal.split(":").map(Number);
        return {
          slot,
          timeLocal,
          totalMinutes: hours * 60 + minutes
        };
      }).sort((a, b) => a.totalMinutes - b.totalMinutes);
      const slotsBefore = availableSlots.filter((item) => {
        const diff = clickedTotalMinutes - item.totalMinutes;
        return diff > 0 && diff <= toleranceMinutes;
      }).sort((a, b) => b.totalMinutes - a.totalMinutes);
      if (slotsBefore.length > 0) {
        return slotsBefore[0].slot;
      }
      const slotsAfter = availableSlots.filter((item) => {
        const diff = item.totalMinutes - clickedTotalMinutes;
        return diff > 0 && diff <= toleranceMinutes;
      }).sort((a, b) => a.totalMinutes - b.totalMinutes);
      if (slotsAfter.length > 0) {
        return slotsAfter[0].slot;
      }
      return null;
    };
    let foundSlot = false;
    let matchingSlot = null;
    let matchingWorker = null;
    for (const workerSlot of daySlots) {
      const exactMatch = workerSlot.slots.find((slot) => {
        const actualTimeUtc = slot.time.startsWith("-") ? slot.time.substring(1) : slot.time;
        const slotTimeLocal = fromUtcHM(actualTimeUtc);
        return slotTimeLocal === urlSlot;
      });
      if (exactMatch) {
        matchingSlot = exactMatch;
        matchingWorker = workerSlot.worker;
        foundSlot = true;
        break;
      }
    }
    let foundNearestSlot = false;
    if (!foundSlot) {
      for (const workerSlot of daySlots) {
        const nearestSlot = findNearestSlot(urlSlot, workerSlot.slots);
        if (nearestSlot) {
          matchingSlot = nearestSlot;
          matchingWorker = workerSlot.worker;
          foundSlot = true;
          foundNearestSlot = true;
          break;
        }
      }
    }
    if (foundSlot && matchingSlot && matchingWorker) {
      pendingSlotSelection.current = {
        slot: matchingSlot,
        worker: matchingWorker,
        date: urlDate
      };
      const dateObj = parseISO(urlDate);
      setSelectedDate(dateObj);
      if (foundNearestSlot) {
        setNearestSlotFound(true);
      }
    } else {
      setShouldShowNotification(true);
      hasAutoSelectedSlot.current = true;
    }
  }, [
    hasNavigatedToQueryDate,
    isActive,
    isLoadingSlots,
    queryParams.slot,
    queryParams.date,
    activeSlots,
    daysWithSlots,
    setSelectedDate,
    handleSelectSlot
  ]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookingCalendarHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BookingWeekDays, {}),
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
        onSelectSlot: handleSelectSlot,
        selectedSlot,
        firstAvailableDate
      },
      currentWeek[0].toISOString()
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
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NotificationToast,
      {
        message: t("Izabran najbliži mogući termin"),
        type: "warning",
        duration: 2e3,
        position: "top",
        isOpen: nearestSlotFound,
        onDidDismiss: () => setNearestSlotFound(false)
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
    if (!queryWorkerId) {
      setSelectedWorker(void 0);
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
    }
    if (!queryWorkerId && !selectedWorker && activeWorkers.length === 1) {
      const singleWorker = activeWorkers[0];
      setSelectedWorker(singleWorker);
    }
  }, [queryWorkerId, workers, activeWorkers]);
  reactExports.useEffect(() => {
    if (activeStep === void 0) return;
    if (activeStep !== 0) return;
    if (queryWorkerId && selectedWorker && selectedWorker.id === queryWorkerId) {
      if (!locationHasCategories) {
        handleSetStep(1, { bypassGuard: true });
      } else if (selectedCategory) {
        handleSetStep(1, { bypassGuard: true });
      }
    }
  }, [
    activeStep,
    queryWorkerId,
    selectedWorker,
    locationHasCategories,
    selectedCategory,
    handleSetStep
  ]);
  reactExports.useEffect(() => {
    if (activeStep === void 0) return;
    const calendarStep = 2;
    if (activeStep === calendarStep) {
      if (locationHasCategories && !selectedCategory) {
        forceSetStep(0);
        return;
      }
      if (groupsSelectedServices.length === 0) {
        forceSetStep(1);
        return;
      }
    }
  }, [
    activeStep,
    groupsSelectedServices,
    locationHasCategories,
    selectedCategory,
    forceSetStep
  ]);
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
  const filteredWorkerIds = useWorkerIdsForCalendar({
    groupsSelectedServices,
    serviceGroups,
    allActiveWorkers: activeWorkers
  });
  const renderSteps = reactExports.useCallback(() => {
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
        availableCategories: categories,
        queryWorkerId
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
    const allWorkerIds = queryWorkerId ? [queryWorkerId] : filteredWorkerIds !== null ? filteredWorkerIds : selectedWorker !== void 0 && selectedWorker !== null ? [selectedWorker.id] : [];
    const workerForCalendar = null;
    const calendarStep = activeStep === 2 || activeStep === void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      BookingCalendarProvider,
      {
        locationSlug: activeLocation,
        worker: workerForCalendar,
        workerIds: allWorkerIds,
        selectedServices: groupsSelectedServices,
        selectedCategory,
        isActive: activeStep === 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          BookingCalendarStep,
          {},
          "datetime-".concat(queryWorkerId || "all", "-").concat((selectedWorker == null ? void 0 : selectedWorker.id) || "none", "-").concat(allWorkerIds.join(","))
        )
      },
      "calendar-provider-".concat(queryWorkerId || "all", "-").concat((selectedWorker == null ? void 0 : selectedWorker.id) || "none", "-").concat(allWorkerIds.join(","))
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Odaberite radnika kako biste nastavili") })
      },
      "datetime-placeholder-inactive"
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
  }, [
    locationHasCategories,
    categories,
    selectedCategory,
    handleSelectCategory,
    selectedWorker,
    handleSelectWorker,
    queryWorkerId,
    activeWorkers.length,
    serviceGroups,
    serviceGroupsLoading,
    handleBackStep,
    handleNextStep,
    groupsSelectedServices,
    handleSelectService,
    hasMultiplePersons,
    handleHasMultiplePersons,
    activeLocation,
    activeStep,
    filteredWorkerIds,
    t
  ]);
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
        renderSteps,
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CreateAppointmentSteps, {});
}
export {
  CreateAppointmentPage as default
};
