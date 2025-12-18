import { e as reactExports, j as jsxRuntimeExports, af as SwiperSlide, aQ as startOfMonth, aV as subMonths, aW as addMonths, aT as addDays, aD as useTranslation, ay as format, aw as formatInTimeZone, av as parseISO, R as React, aR as endOfMonth, aS as startOfWeek } from "./vendor_react-AVDGa64O.js";
import { aj as useIonRouter, n as IonSpinner, l as IonIcon, bh as cashOutline, bj as chevronDownOutline, bk as chevronUpOutline } from "./vendor_ionic-DxHtCw90.js";
import { g as generateWeek, c as useReservationCalendarContext, B as BookingCalendarHeader, a as BookingWeekDays, R as ReservationCalendarProvider } from "./BookingWeekDays-7lnKFVvp.js";
import { o as useContentRefFunctions, S as SwiperWrapper, j as useGetFeWorkersQuery, k as activeLocation, f as urlPrefix, q as getAppTimezone, n as fromUtcHM, l as SceletonLoader, x as useGetFeServiceCategoriesQuery } from "./App-oqSqwiE_.js";
import { a as AppointmentStatus } from "./appointment.constants-BtYyqQzh.js";
import { a as getReservationUrlWithSlot } from "./reservation.helpers-DRLQnio_.js";
import { u as useQueryParamsHook } from "./useQueryParamsHook-BCSwm7zp.js";
import "./vendor_leaflet-Cvlut8nW.js";
import "./index-B8xlO4-Z.js";
import "./workingShift.fe-services-grnmOcBu.js";
import "./reservation.services-B9hX3zxp.js";
import "./vendor_firebase-Chyyt7SL.js";
function WeekSwiperWrapper({
  currentWeek,
  onWeekChange,
  onDateChange,
  onMonthChange,
  currentMonth,
  isCalendarOpen = false,
  isFirstWeek = false,
  children,
  slides,
  activeSlideIndex
}) {
  const swiperRef = reactExports.useRef(null);
  const contentRefFunctions = useContentRefFunctions();
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
      if (activeSlide.type === "day" && activeSlide.dateObj && onDateChange) {
        onDateChange(activeSlide.dateObj);
      }
    } else {
      if (activeSlide.type === "prev-week") {
        const newStartDate = addDays(currentWeek[0], -7);
        const newWeek = generateWeek(newStartDate);
        onWeekChange(newWeek);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "next-week") {
        const newStartDate = addDays(currentWeek[0], 7);
        const newWeek = generateWeek(newStartDate);
        onWeekChange(newWeek);
        scrollToTopIfNeeded();
        return;
      }
      if (activeSlide.type === "day" && activeSlide.dateObj && onDateChange) {
        onDateChange(activeSlide.dateObj);
      }
    }
  };
  const handleSlideChangeTransitionStart = async (swiper) => {
    scrollToTopIfNeeded();
  };
  reactExports.useEffect(() => {
    var _a;
    if (!((_a = swiperRef.current) == null ? void 0 : _a.swiper)) return;
    if (activeSlideIndex < 0 || activeSlideIndex >= slides.length) return;
    const currentIndex = swiperRef.current.swiper.activeIndex;
    if (currentIndex !== activeSlideIndex) {
      swiperRef.current.swiper.slideTo(activeSlideIndex, 0);
    }
  }, [activeSlideIndex, slides.length]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      ref: swiperRef,
      spaceBetween: 16,
      navigation: true,
      onSlideChange: handleSlideChange,
      onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
      children: slides.map((slide, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: children(slide) }, slide.date || slide.type || index))
    }
  );
}
function ReservationItem({ reservation, heightStyle }) {
  var _a;
  const { t } = useTranslation();
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({ locationSlug: activeLocation });
  const { push } = useIonRouter();
  const worker = reactExports.useMemo(
    () => {
      var _a2;
      return (_a2 = workersResult == null ? void 0 : workersResult.data) == null ? void 0 : _a2.find(
        (worker2) => worker2.id === reservation.locationWorkerId
      );
    },
    [workersResult, reservation.locationWorkerId]
  );
  reactExports.useMemo(() => {
    switch (reservation.status) {
      case AppointmentStatus.DRAFT:
        return "secondary";
      case AppointmentStatus.PENDING:
        return "warning";
      case AppointmentStatus.CONFIRMED:
        return "success";
      case AppointmentStatus.CANCELLED:
        return "danger";
      case AppointmentStatus.NO_SHOW:
        return "danger";
      default:
        return "primary";
    }
  }, [reservation]);
  const handleReservationClick = () => {
    push("".concat(urlPrefix, "/r/").concat(reservation.hash));
  };
  const classPromo = reservation.discount ? "border-x-8 border-r-yellow-600" : "";
  reservation.discount ? "rose-800" : "white";
  if (workersLoading || !worker) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  }
  const getStatusInfo = () => {
    switch (reservation.status) {
      case AppointmentStatus.DRAFT:
        return {
          text: t("Nacrt"),
          color: "text-amber-500",
          bg: "bg-amber-50",
          borderColor: "border-amber-500"
        };
      case AppointmentStatus.PENDING:
        return {
          text: t("Na čekanju"),
          color: "text-yellow-500",
          bg: "bg-yellow-50",
          borderColor: "border-yellow-500"
        };
      case AppointmentStatus.CONFIRMED:
        return {
          text: "",
          color: "text-green-500",
          bg: "bg-green-50",
          borderColor: "border-green-500"
        };
      case AppointmentStatus.CANCELLED:
        return {
          text: t("Otkazan"),
          color: "text-red-500",
          bg: "bg-red-50",
          borderColor: "border-red-600"
        };
      case AppointmentStatus.NO_SHOW:
        return {
          text: t("Nije se pojavio"),
          color: "text-red-500",
          bg: "bg-red-50",
          borderColor: "border-red-600"
        };
      default:
        return {
          text: t("Nepoznat"),
          color: "text-gray-500",
          bg: "bg-gray-100",
          borderColor: "border-gray-500"
        };
    }
  };
  const statusInfo = getStatusInfo();
  const discountPercentage = Math.round(
    reservation.discount / (reservation.servicesCost + reservation.discount) * 100
  );
  const itemPadding = reservation.servicesDuration >= 45 ? "py-2" : "py-0";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "border-l-4 py-1 px-2 cursor-pointer transition-all duration-200 hover:shadow-md bg-gray-900 ".concat(statusInfo.borderColor, " ").concat(classPromo, " w-full"),
      onClick: handleReservationClick,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between ".concat(itemPadding), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center space-x-2 mb-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-white text-sm", children: ((_a = reservation.client) == null ? void 0 : _a.fullName) || t("Nepoznati klijent") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3 text-xs", children: [
          statusInfo.text && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium ".concat(statusInfo.color), children: statusInfo.text }),
          reservation.servicesDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-300", children: [
            reservation.servicesDuration,
            "min"
          ] }),
          reservation.servicesCost && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-semibold ".concat(reservation.discount ? "text-white" : "text-white"),
              children: [
                reservation.servicesCost,
                " RSD"
              ]
            }
          ),
          reservation.discount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: cashOutline, className: "text-gray-400 text-xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-gray-400 font-medium", children: [
              discountPercentage,
              "%"
            ] })
          ] })
        ] })
      ] }) })
    }
  );
}
const ReservationItem$1 = reactExports.memo(ReservationItem);
function TableOfReservationList({
  selectedWorker,
  reservationByDate,
  timeSlots,
  selectedDateIndex
}) {
  var _a;
  const { t } = useTranslation();
  const { push } = useIonRouter();
  const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */ new Date());
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(/* @__PURE__ */ new Date());
    }, 60 * 1e3);
    return () => clearInterval(interval);
  }, []);
  const selectedDate = (_a = timeSlots == null ? void 0 : timeSlots[selectedDateIndex]) == null ? void 0 : _a.date;
  const selectedDateFormatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : void 0;
  const currentTimeUtc = formatInTimeZone(currentTime, "UTC", "HH:mm");
  const handleSlotClick = (timeSlotInfo) => {
    if (timeSlotInfo.isPause) return;
    const reservationUrl = getReservationUrlWithSlot(
      selectedWorker.id,
      timeSlotInfo.time,
      selectedDateFormatted || ""
    );
    push(reservationUrl);
  };
  const selectedWorkerReservationsBySlot = reactExports.useMemo(() => {
    if (!selectedDateFormatted || !(reservationByDate == null ? void 0 : reservationByDate[selectedDateFormatted])) {
      return void 0;
    }
    return reservationByDate[selectedDateFormatted].reduce(
      (acc, reservation) => {
        const parsedDate = parseISO(reservation.dateUtc);
        const slotStartUtc = formatInTimeZone(parsedDate, "UTC", "HH:mm");
        acc[slotStartUtc] = reservation;
        return acc;
      },
      {}
    );
  }, [reservationByDate, selectedDateFormatted, selectedWorker.id]);
  const getStyleFromReservation = (timeSlot, addHeight = 0) => {
    var _a2, _b;
    const actualTime = timeSlot.startsWith("-") ? timeSlot.substring(1) : timeSlot;
    const height = (_b = (_a2 = selectedWorkerReservationsBySlot == null ? void 0 : selectedWorkerReservationsBySlot[actualTime]) == null ? void 0 : _a2.servicesDuration) != null ? _b : 30;
    return {
      height: "".concat((height > 30 ? height : 30) + addHeight, "px")
    };
  };
  const selectedDateSlots = reactExports.useMemo(() => {
    var _a2;
    if (!timeSlots || selectedDateIndex === void 0) {
      return void 0;
    }
    return (_a2 = timeSlots == null ? void 0 : timeSlots[selectedDateIndex]) == null ? void 0 : _a2.slots;
  }, [timeSlots, selectedDateIndex]);
  if (!selectedDateSlots || selectedDateSlots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center justify-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "📅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2", children: t("Nema termina za ovaj dan") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-600 dark:text-gray-400 text-sm", children: t("Nema zakazanih termina za odabrani dan") })
    ] }) });
  }
  const isToday = selectedDateFormatted === formatInTimeZone(currentTime, getAppTimezone(), "yyyy-MM-dd");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-gray-200 dark:divide-gray-700 relative", children: selectedDateSlots.map((timeSlotInfo, index) => {
    const isPreviousDay = timeSlotInfo.time.startsWith("-");
    const actualTime = isPreviousDay ? timeSlotInfo.time.substring(1) : timeSlotInfo.time;
    const displayTime = fromUtcHM(actualTime);
    const reservation = selectedWorkerReservationsBySlot == null ? void 0 : selectedWorkerReservationsBySlot[actualTime];
    const [hours, minutes] = actualTime.split(":").map(Number);
    const slotStartMinutes = hours * 60 + minutes;
    const [currentHours, currentMins] = currentTimeUtc.split(":").map(Number);
    const currentMinutesFromMidnight = currentHours * 60 + currentMins;
    const nextSlot = selectedDateSlots[index + 1];
    const nextSlotTime = nextSlot == null ? void 0 : nextSlot.time.replace("-", "");
    let slotDuration;
    if (reservation) {
      slotDuration = reservation.servicesDuration;
    } else if (timeSlotInfo.isPause && nextSlotTime) {
      const [nextHours, nextMinutes] = nextSlotTime.split(":").map(Number);
      const nextSlotMinutes = nextHours * 60 + nextMinutes;
      slotDuration = nextSlotMinutes - slotStartMinutes;
    } else {
      slotDuration = 0;
    }
    const slotEndMinutes = slotStartMinutes + slotDuration;
    const isWithinSlot = isToday && currentMinutesFromMidnight >= slotStartMinutes && currentMinutesFromMidnight < slotEndMinutes;
    const minutesIntoSlot = currentMinutesFromMidnight - slotStartMinutes;
    const slotProgressPercent = slotDuration > 0 ? minutesIntoSlot / slotDuration * 100 : 100;
    const isAfterSlot = isToday && currentMinutesFromMidnight >= slotEndMinutes && (!nextSlotTime || currentTimeUtc < nextSlotTime);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "py-2 transition-colors duration-200 relative ".concat(timeSlotInfo.isPause ? "bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-500" : reservation ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"),
          onClick: () => !timeSlotInfo.isPause && !reservation && handleSlotClick(timeSlotInfo),
          children: [
            isWithinSlot && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                id: "current-time-indicator",
                className: "absolute left-0 right-0 flex items-center z-10",
                style: { top: "".concat(slotProgressPercent, "%") },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full ml-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-red-500" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs font-medium mr-2", children: fromUtcHM(currentTimeUtc) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-4 w-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-16 text-center ".concat(timeSlotInfo.isPause ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold", children: displayTime })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full", children: timeSlotInfo.isPause ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-gray-900 dark:bg-white rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-900 dark:text-white font-medium", children: t("Pauza") })
              ] }) : reservation ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReservationItem$1,
                {
                  reservation,
                  heightStyle: getStyleFromReservation(actualTime)
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-600 dark:text-gray-300 text-sm", children: t("Slobodan termin") }) })
            ] }) })
          ]
        }
      ),
      isAfterSlot && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          id: "current-time-indicator",
          className: "absolute left-0 right-0 flex items-center z-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full ml-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-red-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-red-500 text-xs font-medium mr-2", children: fromUtcHM(currentTimeUtc) })
          ]
        }
      ) })
    ] }, timeSlotInfo.time);
  }) }) }) }) });
}
const TableOfReservationList$1 = reactExports.memo(TableOfReservationList);
function TableOfReservationsV2() {
  const { t } = useTranslation();
  useContentRefFunctions();
  const {
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots,
    daysWithSlots,
    timeSlots,
    reservationByDate,
    selectedWorker,
    toggleCalendar,
    handleWeekChange,
    handleMonthChange,
    isFirstWeek,
    monthHasSlots,
    firstAvailableDate,
    selectedDateIndex,
    setSelectedDate,
    today
  } = useReservationCalendarContext();
  reactExports.useRef(null);
  reactExports.useMemo(() => {
    if (!isCalendarOpen || !currentMonth) return false;
    const todayMonth = startOfMonth(today);
    const currentMonthStart = startOfMonth(currentMonth);
    return currentMonthStart <= todayMonth;
  }, [isCalendarOpen, currentMonth, today]);
  const slides = reactExports.useMemo(() => {
    const slidesList = [];
    if (isCalendarOpen && currentMonth) {
      const monthStart = startOfMonth(currentMonth);
      const monthEnd = endOfMonth(currentMonth);
      const todayMonth = startOfMonth(today);
      const currentMonthStart = startOfMonth(currentMonth);
      const canGoPreviousMonth = currentMonthStart > todayMonth;
      if (!monthHasSlots) {
        if (canGoPreviousMonth) {
          slidesList.push({ type: "prev-month" });
        }
        slidesList.push({ type: "empty-week" });
        slidesList.push({ type: "next-month" });
      } else {
        const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
        const weekContainingMonthEnd = startOfWeek(monthEnd, {
          weekStartsOn: 1
        });
        const calendarEnd = addDays(weekContainingMonthEnd, 6);
        const daysInMonthWithSlots = (timeSlots == null ? void 0 : timeSlots.filter((slot) => {
          const slotDate = slot.date;
          return slotDate >= calendarStart && slotDate <= calendarEnd;
        })) || [];
        if (canGoPreviousMonth) {
          slidesList.push({ type: "prev-month" });
        }
        daysInMonthWithSlots.forEach((slot) => {
          slidesList.push({
            type: "day",
            date: slot.dateFormatted,
            dateObj: slot.date
          });
        });
        slidesList.push({ type: "next-month" });
      }
    } else {
      const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
      const daysInWeekWithSlots = (timeSlots == null ? void 0 : timeSlots.filter(
        (slot) => weekDateStrs.includes(slot.dateFormatted)
      )) || [];
      if (!isFirstWeek) {
        slidesList.push({ type: "prev-week" });
      }
      if (daysInWeekWithSlots.length > 0) {
        daysInWeekWithSlots.forEach((slot) => {
          slidesList.push({
            type: "day",
            date: slot.dateFormatted,
            dateObj: slot.date
          });
        });
      } else {
        slidesList.push({ type: "empty-week" });
      }
      slidesList.push({ type: "next-week" });
    }
    return slidesList;
  }, [
    timeSlots,
    currentWeek,
    isFirstWeek,
    isCalendarOpen,
    currentMonth,
    monthHasSlots,
    today
  ]);
  reactExports.useMemo(() => {
    var _a;
    const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
    const daysInWeekWithSlots = timeSlots == null ? void 0 : timeSlots.filter(
      (slot) => weekDateStrs.includes(slot.dateFormatted)
    );
    return ((_a = daysInWeekWithSlots == null ? void 0 : daysInWeekWithSlots.length) != null ? _a : 0) > 0;
  }, [timeSlots, currentWeek]);
  const activeSlideIndex = reactExports.useMemo(() => {
    if (!selectedDate) return 0;
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    if (isCalendarOpen && currentMonth) {
      if (!monthHasSlots) {
        const emptyIndex = slides.findIndex(
          (slide) => slide.type === "empty-week"
        );
        return emptyIndex >= 0 ? emptyIndex : 0;
      }
      const selectedDateHasSlots = timeSlots == null ? void 0 : timeSlots.some(
        (slot) => slot.dateFormatted === selectedDateStr
      );
      if (selectedDateHasSlots) {
        const dayIndex = slides.findIndex(
          (slide) => slide.type === "day" && slide.date === selectedDateStr
        );
        if (dayIndex >= 0) {
          return dayIndex;
        }
      }
      const firstDayWithSlotsIndex = slides.findIndex(
        (slide) => slide.type === "day"
      );
      return firstDayWithSlotsIndex >= 0 ? firstDayWithSlotsIndex : 0;
    } else {
      const dayIndex = slides.findIndex(
        (slide) => slide.type === "day" && slide.date === selectedDateStr
      );
      if (dayIndex >= 0) {
        return dayIndex;
      }
      if (slides.length === 0) return 0;
      return isFirstWeek ? 0 : 1;
    }
  }, [
    slides,
    selectedDate,
    isFirstWeek,
    isCalendarOpen,
    currentMonth,
    monthHasSlots,
    timeSlots
  ]);
  const scrollToCurrentTime = (retryCount = 0) => {
    const redLineElement = document.getElementById("current-time-indicator");
    if (redLineElement) {
      redLineElement.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    } else if (retryCount < 5) {
      setTimeout(() => scrollToCurrentTime(retryCount + 1), 400);
    }
  };
  reactExports.useEffect(() => {
    if (timeSlots && timeSlots.length > 0) {
      const todayStr = format(today, "yyyy-MM-dd");
      const todaySlide = timeSlots.find(
        (slot) => slot.dateFormatted === todayStr
      );
      if (todaySlide && selectedDateIndex === 0) {
        setTimeout(() => {
          scrollToCurrentTime();
        }, 200);
      }
    }
  }, [timeSlots, selectedDateIndex, today]);
  if (isLoadingSlots) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  if (!timeSlots || timeSlots.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-4", children: "📅" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2", children: t("Nema aktivnih termina") })
    ] }) });
  }
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      WeekSwiperWrapper,
      {
        currentWeek,
        onWeekChange: handleWeekChange,
        onDateChange: setSelectedDate,
        onMonthChange: handleMonthChange,
        currentMonth,
        isCalendarOpen,
        isFirstWeek,
        slides,
        activeSlideIndex,
        children: (slide) => {
          if (slide.type === "prev-week" || slide.type === "prev-month") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) });
          }
          if (slide.type === "next-week" || slide.type === "next-month") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) });
          }
          if (slide.type === "empty-week") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16 min-h-[320px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-2", children: "📅" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-semibold text-gray-700 dark:text-gray-300", children: t("Nema termina za ovu nedelju") }),
              firstAvailableDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: [
                t("Prvi slobodan datum"),
                ":",
                " ",
                format(firstAvailableDate.date, "dd.MM.yyyy")
              ] })
            ] }) });
          }
          if (slide.type === "day" && slide.date) {
            const dayIndex = timeSlots == null ? void 0 : timeSlots.findIndex(
              (slot) => slot.dateFormatted === slide.date
            );
            if (dayIndex === void 0 || dayIndex < 0) return null;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              TableOfReservationList$1,
              {
                reservationByDate,
                selectedWorker,
                timeSlots,
                selectedDateIndex: dayIndex
              }
            );
          }
          return null;
        }
      },
      currentWeek[0].toISOString()
    ) })
  ] });
}
function OwnerAppointmentPage({ selectedWorker }) {
  var _a;
  const { data: queryParams } = useQueryParamsHook({});
  const categoryId = queryParams["category"] ? parseInt(queryParams["category"]) : void 0;
  const { data: categoriesResult } = useGetFeServiceCategoriesQuery(
    {
      locationSlug: activeLocation,
      active: true
    },
    { skip: !categoryId }
  );
  const selectedCategory = (_a = categoriesResult == null ? void 0 : categoriesResult.data) == null ? void 0 : _a.find(
    (cat) => cat.id === categoryId
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: selectedWorker && /* @__PURE__ */ jsxRuntimeExports.jsx(
    ReservationCalendarProvider,
    {
      locationSlug: activeLocation,
      selectedWorker,
      selectedCategory,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableOfReservationsV2, {})
    }
  ) });
}
export {
  OwnerAppointmentPage as default
};
