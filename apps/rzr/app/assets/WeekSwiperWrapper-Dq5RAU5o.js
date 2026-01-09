import { aS as addDays, a$ as isToday$1, aC as format, aP as startOfMonth, aQ as endOfMonth, b0 as eachDayOfInterval, aT as startOfDay, az as parseISO, aV as addMinutes, aB as toZonedTime, aD as fromZonedTime, aA as formatInTimeZone, e as reactExports, aR as startOfWeek, b1 as endOfWeek, b2 as isSameDay, b3 as subMonths, b4 as addMonths, j as jsxRuntimeExports, b5 as parse, b6 as isWithinInterval, b7 as differenceInMinutes, b8 as isSameMonth, ai as SwiperSlide, a3 as useTranslation } from "./vendor_react-CMjr4Gvv.js";
import { i as IonToolbar, d as IonButton, l as IonIcon, ad as calendarOutline, n as IonSpinner, bn as chevronUpOutline, bm as chevronDownOutline, k as IonButtons, as as chevronBackOutline, a1 as chevronForwardOutline } from "./vendor_ionic-7y52xm55.js";
import { t as rzrApi, v as TagType } from "./index-DHw_Gx8b.js";
import { J as transformStandardResponseToCamelCase, v as getAppTimezone, q as useGetFeWorkersQuery, $ as reservationTimeInterval, a0 as getUtcDateFormattedInTz, a1 as parseUtcDate, S as SwiperWrapper, k as useContentRefFunctions } from "./App-CNuYiPPZ.js";
import { u as useGetFeWorkerWorkingShiftsByDaysQuery } from "./workingShift.fe-services-D0gyCaFv.js";
import { d as useGetFeLocationReservationsQuery } from "./reservation.services-DUz-U_Xc.js";
function generateWeek(startDate) {
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(addDays(startDate, i));
  }
  return week;
}
function formatMonthYear(date) {
  const monthNames = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Oktobar",
    "Novembar",
    "Decembar"
  ];
  return "".concat(monthNames[date.getMonth()], " ").concat(date.getFullYear());
}
function isToday(date) {
  return isToday$1(date);
}
function isPastDate(date) {
  const today = startOfDay(/* @__PURE__ */ new Date());
  const checkDate = startOfDay(date);
  return checkDate < today;
}
function hasAnySlotsInWeek(weekSlots) {
  return Object.values(weekSlots).some(
    (daySlots) => daySlots.some((workerSlots) => workerSlots.hasSlots)
  );
}
function getDaysWithSlotsSet(weekSlots) {
  const daysSet = /* @__PURE__ */ new Set();
  Object.entries(weekSlots).forEach(([dateStr, slots]) => {
    if (slots.some((ws) => ws.hasSlots)) {
      daysSet.add(dateStr);
    }
  });
  return daysSet;
}
function findFirstAvailableDayInWeek(week, daysWithSlots) {
  for (const day of week) {
    const dayStr = format(day, "yyyy-MM-dd");
    if (daysWithSlots.has(dayStr)) {
      return day;
    }
  }
  return null;
}
function findFirstAvailableDayInMonth(month, daysWithSlots) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  for (const day of daysInMonth) {
    const dayStr = format(day, "yyyy-MM-dd");
    if (daysWithSlots.has(dayStr)) {
      return day;
    }
  }
  return null;
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
const SLOT_SEARCH_TOLERANCE_MINUTES = 20;
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
  const gapStartMinutes = gapStart.getMinutes();
  const isGapStartRounded = gapStartMinutes % slotInterval === 0;
  if (!isGapStartRounded) {
    const gapStartSlotEnd = addMinutes(gapStart, totalServiceDuration);
    if (gapStartSlotEnd <= gapEnd) {
      allSlots.push(new Date(gapStart));
    }
  }
  let currentSlot = new Date(gapStart);
  if (gapStartMinutes % slotInterval !== 0) {
    const roundedMinutes = Math.ceil(gapStartMinutes / slotInterval) * slotInterval;
    if (roundedMinutes >= 60) {
      currentSlot.setHours(currentSlot.getHours() + 1, 0, 0);
    } else {
      currentSlot.setMinutes(roundedMinutes, 0, 0);
    }
  } else {
    currentSlot.setSeconds(0, 0);
  }
  while (currentSlot < gapEnd) {
    const slotEnd = addMinutes(currentSlot, totalServiceDuration);
    if (slotEnd <= gapEnd) {
      allSlots.push(new Date(currentSlot));
    }
    currentSlot = addMinutes(currentSlot, slotInterval);
  }
  allSlots.sort((a, b) => a.getTime() - b.getTime());
  const filteredSlots = [];
  for (const slot of allSlots) {
    const minDifference = Math.min(slotInterval, MIN_SLOT_DIFFERENCE_MINUTES);
    const isTooClose = filteredSlots.some((existingSlot) => {
      const diffMinutes = Math.abs(
        (slot.getTime() - existingSlot.getTime()) / 1e3 / 60
      );
      return diffMinutes > 0 && diffMinutes < minDifference;
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
  const [monthSlots, setMonthSlots] = reactExports.useState(
    {}
  );
  const [errorMessage, setErrorMessage] = reactExports.useState(null);
  const hasInitializedDate = reactExports.useRef(false);
  const previousWeekRef = reactExports.useRef(currentWeek);
  const previousMonthRef = reactExports.useRef(currentMonth);
  const isManualDateSelectionRef = reactExports.useRef(false);
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
  const weekStartDate = reactExports.useMemo(() => {
    const weekStart = startOfWeek(currentWeek[0], { weekStartsOn: 1 });
    return formatInTimeZone(weekStart, timezone, "yyyy-MM-dd'T'00:00:00XXX");
  }, [currentWeek, timezone]);
  const weekEndDate = reactExports.useMemo(() => {
    const weekEnd = endOfWeek(currentWeek[6], { weekStartsOn: 1 });
    return formatInTimeZone(weekEnd, timezone, "yyyy-MM-dd'T'23:59:59XXX");
  }, [currentWeek, timezone]);
  const monthStartDate = reactExports.useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    return formatInTimeZone(calendarStart, timezone, "yyyy-MM-dd'T'00:00:00XXX");
  }, [currentMonth, timezone]);
  const monthEndDate = reactExports.useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = addDays(calendarStart, 34);
    return formatInTimeZone(calendarEnd, timezone, "yyyy-MM-dd'T'23:59:59XXX");
  }, [currentMonth, timezone]);
  const startDate = reactExports.useMemo(() => {
    return isCalendarOpen ? monthStartDate : weekStartDate;
  }, [isCalendarOpen, monthStartDate, weekStartDate]);
  const endDate = reactExports.useMemo(() => {
    return isCalendarOpen ? monthEndDate : weekEndDate;
  }, [isCalendarOpen, monthEndDate, weekEndDate]);
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
      console.error("Error loading slots:", error);
      setErrorMessage(
        "Slot service is currently unavailable. Please try again later."
      );
      if (isCalendarOpen) {
        setMonthSlots({});
      } else {
        setWeekSlots({});
      }
    } else {
      setErrorMessage(null);
    }
  }, [error, isCalendarOpen]);
  const weekDatesToProcess = reactExports.useMemo(() => {
    return currentWeek;
  }, [currentWeek]);
  const monthDatesToProcess = reactExports.useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    return Array.from({ length: 35 }, (_, i) => addDays(calendarStart, i));
  }, [currentMonth]);
  const datesToProcess = reactExports.useMemo(() => {
    return isCalendarOpen ? monthDatesToProcess : weekDatesToProcess;
  }, [isCalendarOpen, monthDatesToProcess, weekDatesToProcess]);
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
      if (isCalendarOpen) {
        setMonthSlots(slotsByDate);
      } else {
        setWeekSlots(slotsByDate);
      }
      if (!hasInitializedDate.current && selectedDate) {
        const currentDaysWithSlots = getDaysWithSlotsSet(slotsByDate);
        const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
        if (!currentDaysWithSlots.has(selectedDateStr)) {
          const firstAvailableDay = isCalendarOpen ? findFirstAvailableDayInMonth(currentMonth, currentDaysWithSlots) : findFirstAvailableDayInWeek(currentWeek, currentDaysWithSlots);
          if (firstAvailableDay) {
            setSelectedDate(firstAvailableDay);
          }
          hasInitializedDate.current = true;
        } else {
          hasInitializedDate.current = true;
        }
      }
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
        if (isCalendarOpen) {
          setMonthSlots(slotsByDate);
        } else {
          setWeekSlots(slotsByDate);
        }
      } else {
        if (isCalendarOpen) {
          setMonthSlots({});
        } else {
          setWeekSlots({});
        }
      }
    }
  }, [
    gapsData,
    selectedServices,
    datesToProcess,
    workersById,
    workersData,
    isCalendarOpen
  ]);
  const activeSlots = reactExports.useMemo(() => {
    return isCalendarOpen ? monthSlots : weekSlots;
  }, [isCalendarOpen, monthSlots, weekSlots]);
  const hasAnySlots = reactExports.useMemo(
    () => hasAnySlotsInWeek(activeSlots),
    [activeSlots]
  );
  const daysWithSlots = reactExports.useMemo(
    () => getDaysWithSlotsSet(activeSlots),
    [activeSlots]
  );
  const isFirstWeek = reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(today, timezone));
    const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
    return isSameDay(weekStartInTz, todayInTz);
  }, [currentWeek, timezone, today]);
  const isFirstMonth = reactExports.useMemo(() => {
    const todayMonth = startOfMonth(today);
    const currentMonthStart = startOfMonth(currentMonth);
    return isSameDay(todayMonth, currentMonthStart);
  }, [currentMonth, today]);
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
  const changeWeek = reactExports.useCallback((week) => {
    setCurrentWeek(week);
  }, []);
  const changeMonth = reactExports.useCallback((month) => {
    const newMonth = startOfMonth(month);
    setCurrentMonth(newMonth);
  }, []);
  const goToPreviousWeek = reactExports.useCallback(() => {
    if (!canGoPreviousWeek) return;
    const newStartDate = addDays(currentWeek[0], -7);
    changeWeek(generateWeek(newStartDate));
  }, [currentWeek, canGoPreviousWeek, changeWeek]);
  const goToNextWeek = reactExports.useCallback(() => {
    if (!canGoNextWeek) return;
    const newStartDate = addDays(currentWeek[0], 7);
    changeWeek(generateWeek(newStartDate));
  }, [currentWeek, canGoNextWeek, changeWeek]);
  const handleWeekChange = reactExports.useCallback(
    (week) => {
      changeWeek(week);
    },
    [changeWeek]
  );
  const handleMonthChange = reactExports.useCallback(
    (month) => {
      changeMonth(month);
    },
    [changeMonth]
  );
  const goToPreviousMonth = reactExports.useCallback(() => {
    if (!canGoPreviousMonth) return;
    const newMonth = startOfMonth(subMonths(currentMonth));
    changeMonth(newMonth);
  }, [canGoPreviousMonth, currentMonth, changeMonth]);
  const goToNextMonth = reactExports.useCallback(() => {
    if (!canGoNextMonth) return;
    const newMonth = startOfMonth(addMonths(currentMonth, 1));
    changeMonth(newMonth);
  }, [canGoNextMonth, currentMonth, changeMonth]);
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
  const shouldSwitchToNextMonth = reactExports.useCallback(
    (week, selectedDateValue) => {
      if (!selectedDateValue) {
        return false;
      }
      const mondayInWeek = week.find((date) => date.getDay() === 1);
      if (!mondayInWeek) {
        return false;
      }
      const selectedDateNormalized = new Date(
        selectedDateValue.getFullYear(),
        selectedDateValue.getMonth(),
        selectedDateValue.getDate()
      );
      const mondayNormalized = new Date(
        mondayInWeek.getFullYear(),
        mondayInWeek.getMonth(),
        mondayInWeek.getDate()
      );
      const isSelectedDateOnOrAfterMonday = selectedDateNormalized >= mondayNormalized;
      if (!isSelectedDateOnOrAfterMonday) {
        return false;
      }
      const todayMonth = startOfMonth(today);
      const nextMonth = addMonths(todayMonth, 1);
      const firstDayOfNextMonth = startOfMonth(nextMonth);
      const weekStart = week[0];
      const weekEnd = week[6];
      const isFirstDayInWeek = firstDayOfNextMonth >= weekStart && firstDayOfNextMonth <= weekEnd;
      return isFirstDayInWeek;
    },
    [today]
  );
  const toggleCalendar = reactExports.useCallback(() => {
    setIsCalendarOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        let newMonth;
        if (!selectedDate) {
          newMonth = startOfMonth(today);
        } else {
          const selectedDateMonth = startOfMonth(selectedDate);
          const todayMonth = startOfMonth(today);
          if (selectedDateMonth > todayMonth) {
            newMonth = selectedDateMonth;
          } else {
            if (shouldSwitchToNextMonth(currentWeek, selectedDate)) {
              newMonth = addMonths(todayMonth, 1);
            } else {
              newMonth = selectedDateMonth;
            }
          }
        }
        setCurrentMonth(newMonth);
      } else {
        if (selectedDate) {
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
      }
      return newValue;
    });
  }, [selectedDate, today, daysWithSlots, currentWeek, shouldSwitchToNextMonth]);
  const handleSelectDate = reactExports.useCallback((date) => {
    isManualDateSelectionRef.current = true;
    setSelectedDate(date);
    setTimeout(() => {
      isManualDateSelectionRef.current = false;
    }, 100);
  }, []);
  reactExports.useEffect(() => {
    var _a, _b;
    if (isManualDateSelectionRef.current) return;
    if (isLoading || isFetching) return;
    const weekChanged = ((_a = previousWeekRef.current[0]) == null ? void 0 : _a.getTime()) !== ((_b = currentWeek[0]) == null ? void 0 : _b.getTime());
    const monthChanged = previousMonthRef.current.getTime() !== currentMonth.getTime();
    if (weekChanged && !isCalendarOpen) {
      const firstAvailableDay = findFirstAvailableDayInWeek(
        currentWeek,
        daysWithSlots
      );
      if (firstAvailableDay) {
        setSelectedDate(firstAvailableDay);
      }
      previousWeekRef.current = currentWeek;
    } else if (monthChanged && isCalendarOpen) {
      const firstAvailableDay = findFirstAvailableDayInMonth(
        currentMonth,
        daysWithSlots
      );
      if (firstAvailableDay) {
        setSelectedDate(firstAvailableDay);
      }
      previousMonthRef.current = currentMonth;
    }
  }, [
    currentWeek,
    currentMonth,
    isCalendarOpen,
    daysWithSlots,
    isLoading,
    isFetching
  ]);
  return {
    // State
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots: isLoading || isFetching,
    weekSlots,
    monthSlots,
    daysWithSlots,
    errorMessage,
    maxPreparedDate,
    // Actions
    setSelectedDate: handleSelectDate,
    toggleCalendar,
    // Pasivne akcije - glavne akcije koje sve komponente koriste
    changeWeek,
    changeMonth,
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
    isFirstWeek,
    isFirstMonth,
    today
  };
}
const BookingCalendarContext = reactExports.createContext(void 0);
function BookingCalendarProvider({
  children,
  locationSlug,
  worker,
  workerIds,
  selectedServices,
  selectedCategory,
  maxPreparedDate,
  isActive = true
}) {
  const calendarState = useBookingCalendar({
    locationSlug,
    worker,
    workerIds,
    selectedServices,
    selectedCategory,
    maxPreparedDate,
    isActive
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    BookingCalendarContext.Provider,
    {
      value: {
        ...calendarState,
        selectedServices,
        selectedCategory,
        isActive
      },
      children
    }
  );
}
function useBookingCalendarContext() {
  const context = reactExports.useContext(BookingCalendarContext);
  if (context === void 0) {
    throw new Error(
      "useBookingCalendarContext must be used within a BookingCalendarProvider"
    );
  }
  return context;
}
const getTimeSlotsForTable = (locationReservations, date, timeFromUtc, timeToUtc, pauses, intervalMinutes = 30) => {
  const dateIso = parseISO(date);
  const dateIsoUTC = parseISO("".concat(date, "T00:00:00Z"));
  const allSlots = [];
  const slotDuration = {};
  let startTime = parse(timeFromUtc, "HH:mm:ss", dateIso);
  const endTime = parse(timeToUtc, "HH:mm:ss", dateIso);
  if (startTime > endTime) {
    startTime = addMinutes(startTime, -24 * 60);
  }
  if (pauses == null ? void 0 : pauses.length) {
    pauses.forEach((pause) => {
      const pauseStartTime = parse(pause.timeFromUtc, "HH:mm:ss", dateIso);
      const pauseEndTime = parse(pause.timeToUtc, "HH:mm:ss", dateIso);
      let currentPauseTime = pauseStartTime;
      while (isWithinInterval(currentPauseTime, {
        start: pauseStartTime,
        end: pauseEndTime
      }) && differenceInMinutes(currentPauseTime, pauseEndTime) !== 0) {
        const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
        const isPreviousDay = isCrossMidnight && currentPauseTime.getDate() !== dateIso.getDate();
        const slotTime = format(currentPauseTime, "HH:mm");
        const prefixedSlot = isPreviousDay ? "-".concat(slotTime) : slotTime;
        if (isWithinInterval(currentPauseTime, { start: startTime, end: endTime })) {
          allSlots.push(prefixedSlot);
          slotDuration[prefixedSlot] = intervalMinutes;
        }
        currentPauseTime = addMinutes(currentPauseTime, intervalMinutes);
      }
    });
  }
  let currentTime = startTime;
  while (isWithinInterval(currentTime, { start: startTime, end: endTime })) {
    const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
    const isPreviousDay = isCrossMidnight && currentTime.getDate() !== dateIso.getDate();
    const slotTime = format(currentTime, "HH:mm");
    const prefixedSlot = isPreviousDay ? "-".concat(slotTime) : slotTime;
    if (!allSlots.includes(prefixedSlot)) {
      allSlots.push(prefixedSlot);
    }
    currentTime = addMinutes(currentTime, intervalMinutes);
  }
  if (locationReservations == null ? void 0 : locationReservations.length) {
    locationReservations.forEach((reservation) => {
      const reservationStartUtc = parseISO(reservation.dateUtc);
      const reservationStartTimeUtc = formatInTimeZone(
        reservationStartUtc,
        "UTC",
        "HH:mm:ss"
      );
      const isPreviousDay = reservationStartUtc.getUTCDate() !== dateIsoUTC.getUTCDate();
      const reservationStart = parse(
        reservationStartTimeUtc,
        "HH:mm:ss",
        isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso
      );
      const slotTime = format(reservationStart, "HH:mm");
      const prefixedSlot = isPreviousDay ? "-".concat(slotTime) : slotTime;
      if (!allSlots.includes(prefixedSlot)) {
        allSlots.push(prefixedSlot);
      }
      slotDuration[prefixedSlot] = reservation.servicesDuration;
    });
  }
  const filteredSlots = allSlots.filter((slot) => {
    if (slotDuration[slot]) {
      return true;
    }
    const isPreviousDay = slot.startsWith("-");
    const actualSlot = isPreviousDay ? slot.substring(1) : slot;
    const slotTime = parse(
      actualSlot,
      "HH:mm",
      isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso
    );
    for (const [existingSlot, duration] of Object.entries(slotDuration)) {
      const existingIsPreviousDay = existingSlot.startsWith("-");
      const existingActualSlot = existingIsPreviousDay ? existingSlot.substring(1) : existingSlot;
      const existingSlotTime = parse(
        existingActualSlot,
        "HH:mm",
        existingIsPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso
      );
      const existingSlotEnd = addMinutes(existingSlotTime, duration);
      if (slotTime > existingSlotTime && slotTime < existingSlotEnd) {
        return false;
      }
    }
    return true;
  });
  const sortedSlots = filteredSlots.sort((a, b) => {
    const aTime = a.startsWith("-") ? a.substring(1) : a;
    const bTime = b.startsWith("-") ? b.substring(1) : b;
    if (!a.startsWith("-") && !b.startsWith("-")) {
      return aTime.localeCompare(bTime);
    }
    if (a.startsWith("-") && b.startsWith("-")) {
      return aTime.localeCompare(bTime);
    }
    if (a.startsWith("-") && !b.startsWith("-")) return -1;
    if (!a.startsWith("-") && b.startsWith("-")) return 1;
    return 0;
  });
  return sortedSlots.map((slot) => {
    const isPreviousDay = slot.startsWith("-");
    const actualSlot = isPreviousDay ? slot.substring(1) : slot;
    const slotTime = parse(
      actualSlot,
      "HH:mm",
      isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso
    );
    const isPauseSlot = pauses == null ? void 0 : pauses.some((pause) => {
      const pauseStartTime = parse(pause.timeFromUtc, "HH:mm:ss", dateIso);
      const pauseEndTime = parse(pause.timeToUtc, "HH:mm:ss", dateIso);
      let adjustedPauseStart = pauseStartTime;
      let adjustedPauseEnd = pauseEndTime;
      if (isPreviousDay && pauseStartTime > pauseEndTime) {
        adjustedPauseStart = addMinutes(pauseStartTime, -24 * 60);
      }
      return isWithinInterval(slotTime, {
        start: adjustedPauseStart,
        end: adjustedPauseEnd
      }) && differenceInMinutes(slotTime, adjustedPauseEnd) !== 0;
    });
    return {
      time: slot,
      isPause: !!isPauseSlot
    };
  });
};
const ReservationCalendarContext = reactExports.createContext(void 0);
function ReservationCalendarProvider({
  children,
  locationSlug,
  selectedWorker,
  selectedCategory
}) {
  const timezone = getAppTimezone();
  const today = startOfDay(toZonedTime(/* @__PURE__ */ new Date(), timezone));
  const [currentWeek, setCurrentWeek] = reactExports.useState(
    () => generateWeek(today)
  );
  const [selectedDate, setSelectedDate] = reactExports.useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = reactExports.useState(false);
  const [currentMonth, setCurrentMonth] = reactExports.useState(
    () => startOfMonth(today)
  );
  reactExports.useRef(false);
  const {
    data: workersWorkingShiftsByDaysResult,
    isFetching: isWorkersWorkingShiftsFetching
  } = useGetFeWorkerWorkingShiftsByDaysQuery({
    locationSlug,
    workerId: selectedWorker.id
  });
  const { data: locationReservations, isLoading: isReservationsLoading } = useGetFeLocationReservationsQuery({
    locationSlug,
    locationWorkerId: selectedWorker.id,
    categoryId: selectedCategory == null ? void 0 : selectedCategory.id,
    withClient: 1
  });
  const reservationByDate = reactExports.useMemo(
    () => locationReservations == null ? void 0 : locationReservations.data.reduce(
      (acc, reservation) => {
        const date = getUtcDateFormattedInTz(reservation.dateUtc);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(reservation);
        return acc;
      },
      {}
    ),
    [locationReservations]
  );
  const timeSlots = reactExports.useMemo(() => {
    if (!(workersWorkingShiftsByDaysResult == null ? void 0 : workersWorkingShiftsByDaysResult.data)) {
      return void 0;
    }
    const slotsByDay = [];
    workersWorkingShiftsByDaysResult.data.forEach((shift) => {
      const { date: realDate, dateFormatted: realDateFormatted } = parseUtcDate(
        shift.dateUtc,
        timezone
      );
      const reservationsForDate = reservationByDate == null ? void 0 : reservationByDate[realDateFormatted];
      const slots = getTimeSlotsForTable(
        reservationsForDate,
        realDateFormatted,
        shift.timeFromUtc,
        shift.timeToUtc,
        shift.pausesUtc
      );
      slotsByDay.push({
        dateFormatted: realDateFormatted,
        date: realDate,
        slots,
        workerId: selectedWorker.id
      });
    });
    return slotsByDay;
  }, [
    workersWorkingShiftsByDaysResult == null ? void 0 : workersWorkingShiftsByDaysResult.data,
    selectedWorker,
    reservationByDate,
    timezone
  ]);
  const daysWithSlots = reactExports.useMemo(() => {
    const daysSet = /* @__PURE__ */ new Set();
    timeSlots == null ? void 0 : timeSlots.forEach((slot) => {
      daysSet.add(slot.dateFormatted);
    });
    return daysSet;
  }, [timeSlots]);
  const selectedDateIndex = reactExports.useMemo(() => {
    var _a;
    if (!selectedDate) return 0;
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    return (_a = timeSlots == null ? void 0 : timeSlots.findIndex((slot) => slot.dateFormatted === selectedDateStr)) != null ? _a : 0;
  }, [timeSlots, selectedDate]);
  const firstAvailableDate = reactExports.useMemo(() => {
    if (!timeSlots || timeSlots.length === 0) return null;
    const todayStr = format(today, "yyyy-MM-dd");
    const sorted = [...timeSlots].sort(
      (a, b) => a.dateFormatted.localeCompare(b.dateFormatted)
    );
    const upcoming = sorted.find((s) => s.dateFormatted >= todayStr);
    return upcoming || sorted[0];
  }, [timeSlots, today]);
  const isFirstWeek = reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */ new Date(), timezone));
    const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
    return isToday(weekStartInTz) && isToday(todayInTz);
  }, [currentWeek, timezone]);
  const monthHasSlots = reactExports.useMemo(() => {
    var _a;
    if (!isCalendarOpen || !currentMonth) return false;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
    const calendarEnd = addDays(weekContainingMonthEnd, 6);
    return (_a = timeSlots == null ? void 0 : timeSlots.some((slot) => {
      const slotDate = slot.date;
      return slotDate >= calendarStart && slotDate <= calendarEnd;
    })) != null ? _a : false;
  }, [isCalendarOpen, currentMonth, timeSlots]);
  const hasAnySlots = reactExports.useMemo(() => {
    var _a;
    return ((_a = timeSlots == null ? void 0 : timeSlots.length) != null ? _a : 0) > 0;
  }, [timeSlots]);
  const shouldSwitchToNextMonth = reactExports.useCallback(
    (week, selectedDateValue) => {
      if (!selectedDateValue) {
        return false;
      }
      const mondayInWeek = week.find((date) => date.getDay() === 1);
      if (!mondayInWeek) {
        return false;
      }
      const selectedDateNormalized = new Date(
        selectedDateValue.getFullYear(),
        selectedDateValue.getMonth(),
        selectedDateValue.getDate()
      );
      const mondayNormalized = new Date(
        mondayInWeek.getFullYear(),
        mondayInWeek.getMonth(),
        mondayInWeek.getDate()
      );
      const isSelectedDateOnOrAfterMonday = selectedDateNormalized >= mondayNormalized;
      if (!isSelectedDateOnOrAfterMonday) {
        return false;
      }
      const todayMonth = startOfMonth(today);
      const nextMonth = addMonths(todayMonth, 1);
      const firstDayOfNextMonth = startOfMonth(nextMonth);
      const weekStart = week[0];
      const weekEnd = week[6];
      const isFirstDayInWeek = firstDayOfNextMonth >= weekStart && firstDayOfNextMonth <= weekEnd;
      return isFirstDayInWeek;
    },
    [today]
  );
  const toggleCalendar = reactExports.useCallback(() => {
    setIsCalendarOpen((prev) => {
      const newValue = !prev;
      if (newValue) {
        let newMonth;
        if (!selectedDate) {
          newMonth = startOfMonth(today);
        } else {
          const selectedDateMonth = startOfMonth(selectedDate);
          const todayMonth = startOfMonth(today);
          if (selectedDateMonth > todayMonth) {
            newMonth = selectedDateMonth;
          } else {
            if (shouldSwitchToNextMonth(currentWeek, selectedDate)) {
              newMonth = addMonths(todayMonth, 1);
            } else {
              newMonth = selectedDateMonth;
            }
          }
        }
        setCurrentMonth(newMonth);
      } else {
        if (selectedDate) {
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
      }
      return newValue;
    });
  }, [selectedDate, today, daysWithSlots, currentWeek, shouldSwitchToNextMonth]);
  const handleSelectDate = reactExports.useCallback((date) => {
    isManualDateSelectionRef.current = true;
    setSelectedDate(date);
    setTimeout(() => {
      isManualDateSelectionRef.current = false;
    }, 100);
  }, []);
  const handleWeekChange = reactExports.useCallback((week) => {
    setCurrentWeek(week);
  }, []);
  const handleMonthChange = reactExports.useCallback((month) => {
    setCurrentMonth(startOfMonth(month));
  }, []);
  const previousWeekRef = reactExports.useRef(currentWeek);
  const previousMonthRef = reactExports.useRef(currentMonth);
  const isManualDateSelectionRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    var _a, _b;
    if (isManualDateSelectionRef.current) return;
    const weekChanged = ((_a = previousWeekRef.current[0]) == null ? void 0 : _a.getTime()) !== ((_b = currentWeek[0]) == null ? void 0 : _b.getTime());
    const monthChanged = previousMonthRef.current.getTime() !== currentMonth.getTime();
    if (weekChanged && !isCalendarOpen) {
      const firstAvailableDay = findFirstAvailableDayInWeek(
        currentWeek,
        daysWithSlots
      );
      if (firstAvailableDay) {
        setSelectedDate(firstAvailableDay);
      }
      previousWeekRef.current = currentWeek;
    } else if (monthChanged && isCalendarOpen) {
      const firstAvailableDay = findFirstAvailableDayInMonth(
        currentMonth,
        daysWithSlots
      );
      if (firstAvailableDay) {
        setSelectedDate(firstAvailableDay);
      }
      previousMonthRef.current = currentMonth;
    }
  }, [currentWeek, currentMonth, isCalendarOpen, daysWithSlots]);
  const goToPreviousWeek = reactExports.useCallback(() => {
    setCurrentWeek((prev) => generateWeek(addDays(prev[0], -7)));
  }, []);
  const goToNextWeek = reactExports.useCallback(() => {
    setCurrentWeek((prev) => generateWeek(addDays(prev[0], 7)));
  }, []);
  const canGoPreviousWeek = reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */ new Date(), timezone));
    const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
    return weekStartInTz > todayInTz;
  }, [currentWeek, timezone]);
  const canGoNextWeek = true;
  const goToPreviousMonth = reactExports.useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev));
  }, []);
  const goToNextMonth = reactExports.useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);
  const canGoPreviousMonth = reactExports.useMemo(() => {
    const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */ new Date(), timezone));
    const monthStartInTz = startOfDay(toZonedTime(currentMonth, timezone));
    return !isSameMonth(monthStartInTz, todayInTz) && monthStartInTz > todayInTz;
  }, [currentMonth, timezone]);
  const canGoNextMonth = true;
  const goToPrevious = reactExports.useCallback(() => {
    if (isCalendarOpen) {
      goToPreviousMonth();
    } else {
      goToPreviousWeek();
    }
  }, [isCalendarOpen, goToPreviousMonth, goToPreviousWeek]);
  const goToNext = reactExports.useCallback(() => {
    if (isCalendarOpen) {
      goToNextMonth();
    } else {
      goToNextWeek();
    }
  }, [isCalendarOpen, goToNextMonth, goToNextWeek]);
  const canGoPrevious = isCalendarOpen ? canGoPreviousMonth : canGoPreviousWeek;
  const canGoNext = isCalendarOpen ? canGoNextMonth : canGoNextWeek;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ReservationCalendarContext.Provider,
    {
      value: {
        currentWeek,
        currentMonth,
        selectedDate,
        isCalendarOpen,
        isLoadingSlots: isWorkersWorkingShiftsFetching || isReservationsLoading,
        daysWithSlots,
        timeSlots,
        reservationByDate,
        maxPreparedDate: void 0,
        // Reservation calendar nema maxPreparedDate
        selectedWorker,
        selectedCategory,
        setSelectedDate: handleSelectDate,
        toggleCalendar,
        goToPreviousWeek,
        goToNextWeek,
        canGoPreviousWeek,
        canGoNextWeek,
        goToPreviousMonth,
        goToNextMonth,
        canGoPreviousMonth,
        canGoNextMonth,
        goToPrevious,
        goToNext,
        canGoPrevious,
        canGoNext,
        handleWeekChange,
        handleMonthChange,
        hasAnySlots,
        isFirstWeek,
        monthHasSlots,
        firstAvailableDate,
        selectedDateIndex,
        today
      },
      children
    }
  );
}
function useReservationCalendarContext() {
  const context = reactExports.useContext(ReservationCalendarContext);
  if (context === void 0) {
    throw new Error(
      "useReservationCalendarContext must be used within a ReservationCalendarProvider"
    );
  }
  return context;
}
function useCalendarContext() {
  const bookingContext = reactExports.useContext(BookingCalendarContext);
  if (bookingContext !== void 0) {
    return bookingContext;
  }
  const reservationContext = reactExports.useContext(ReservationCalendarContext);
  if (reservationContext !== void 0) {
    return reservationContext;
  }
  throw new Error(
    "useCalendarContext must be used within a BookingCalendarProvider or ReservationCalendarProvider"
  );
}
function BookingCalendarHeader() {
  const {
    currentWeek,
    currentMonth,
    selectedDate,
    isCalendarOpen,
    isLoadingSlots,
    toggleCalendar,
    goToPrevious,
    goToNext,
    canGoPrevious,
    canGoNext
  } = useCalendarContext();
  const monthToDisplay = isCalendarOpen && currentMonth ? startOfMonth(currentMonth) : (() => {
    if (!selectedDate) {
      return currentWeek[0];
    }
    const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
    const weekDateStrs = currentWeek.map((d) => format(d, "yyyy-MM-dd"));
    const isSelectedDateInWeek = weekDateStrs.includes(selectedDateStr);
    return isSelectedDateInWeek ? selectedDate : currentWeek[0];
  })();
  const monthYearText = formatMonthYear(monthToDisplay);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonToolbar, { className: "border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      IonButton,
      {
        fill: isCalendarOpen ? "solid" : "clear",
        color: isCalendarOpen ? "success" : void 0,
        onClick: toggleCalendar,
        className: "text-sm font-medium rounded-lg ".concat(isCalendarOpen ? "bg-green-500/30" : ""),
        size: "small",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, slot: "start", className: "mr-2" }),
          monthYearText,
          isLoadingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: calendarOutline, className: "ml-2 opacity-0" }) : null,
          isLoadingSlots ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { slot: "end", className: "ml-2" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            IonIcon,
            {
              icon: isCalendarOpen ? chevronUpOutline : chevronDownOutline,
              slot: "end",
              className: "ml-2"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonButtons, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonButton,
        {
          onClick: goToPrevious,
          disabled: !canGoPrevious,
          fill: "clear",
          size: "small",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronBackOutline })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonButton,
        {
          onClick: goToNext,
          disabled: !canGoNext,
          fill: "clear",
          size: "small",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronForwardOutline })
        }
      )
    ] })
  ] }) });
}
function DayButton({
  date,
  selectedDate,
  daysWithSlots,
  currentMonth,
  maxPreparedDate,
  isMonthView = false,
  onSelectDate,
  getDayLabel
}) {
  const dateStr = format(date, "yyyy-MM-dd");
  const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
  const isSelected = dateStr === selectedDateStr;
  const hasSlots = daysWithSlots.has(dateStr);
  const isTodayDate = isToday(date);
  const isCurrentMonth = currentMonth ? isSameMonth(date, currentMonth) : true;
  const isPast = isPastDate(date);
  const isAfterMax = maxPreparedDate ? date > maxPreparedDate : false;
  const isDisabled = !hasSlots || isPast || isAfterMax;
  const handleClick = () => {
    if (!isDisabled) {
      onSelectDate(date);
    }
  };
  const dayLabel = getDayLabel ? getDayLabel(date) : null;
  const isSub = dayLabel === "Sub" || dayLabel === "Sat";
  const isNed = dayLabel === "Ned" || dayLabel === "Sun";
  let dayLabelColor = "";
  if (!isSelected) {
    if (isSub) {
      dayLabelColor = "text-yellow-600 dark:text-yellow-400";
    } else if (isNed) {
      dayLabelColor = "text-red-600 dark:text-red-400";
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: handleClick,
      className: "\n        flex flex-col items-center justify-center\n        ".concat(isMonthView ? "min-w-0 px-1.5 py-2" : "flex-1 min-w-0 px-1.5 py-2", "\n        rounded-xl transition-all duration-200\n        ").concat(isSelected ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg ring-2 ring-emerald-500 dark:ring-emerald-400" : isDisabled ? "cursor-not-allowed" : isCurrentMonth || !isMonthView ? "hover:bg-gray-100 dark:hover:bg-gray-800" : "", "\n        ").concat(isTodayDate && !isSelected && !isDisabled ? "ring-2 ring-gray-600 dark:ring-gray-400" : "", "\n      "),
      children: [
        !isMonthView && dayLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-sm font-semibold tracking-wide uppercase mb-1 ".concat(dayLabelColor || (isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400")),
            style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots && !isSub && !isNed ? { color: "var(--ion-text-color, #111827)" } : void 0,
            children: dayLabel
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "".concat(isMonthView && !isCurrentMonth ? "text-sm" : "text-lg", " font-bold ").concat(isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400"),
            style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots ? { color: "var(--ion-text-color, #111827)" } : void 0,
            children: date.getDate()
          }
        ),
        hasSlots && !isDisabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-1.5 h-1.5 rounded-full mt-1 ".concat(isSelected ? "bg-white dark:bg-gray-900" : "bg-emerald-500 dark:bg-emerald-400")
          }
        )
      ]
    }
  );
}
function WeekView({
  currentWeek,
  selectedDate,
  daysWithSlots,
  maxPreparedDate,
  today,
  onSelectDate,
  onWeekChange,
  getDayLabel
}) {
  const swiperRef = reactExports.useRef(null);
  const [currentStep, setCurrentStep] = reactExports.useState(void 0);
  const weeks = reactExports.useMemo(() => {
    const weeksList = [];
    let currentWeekStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endDate = maxPreparedDate || addDays(today, 365);
    const maxWeeks = 52;
    let weekCount = 0;
    while (weekCount < maxWeeks && currentWeekStart <= endDate) {
      const week = generateWeek(currentWeekStart);
      const lastDayOfWeek = week[6];
      if (lastDayOfWeek > endDate) {
        break;
      }
      weeksList.push(week);
      if (lastDayOfWeek >= endDate) {
        break;
      }
      currentWeekStart = addDays(currentWeekStart, 7);
      weekCount++;
    }
    return weeksList;
  }, [maxPreparedDate, today]);
  const currentWeekIndex = reactExports.useMemo(() => {
    return weeks.findIndex((week) => {
      const weekStart = week[0];
      const currentStart = currentWeek[0];
      return weekStart.getFullYear() === currentStart.getFullYear() && weekStart.getMonth() === currentStart.getMonth() && weekStart.getDate() === currentStart.getDate();
    });
  }, [weeks, currentWeek]);
  const handleSlideChangeTransitionEnd = reactExports.useCallback(
    (swiper) => {
      const timeout = setTimeout(() => {
        if (onWeekChange && swiper.activeIndex >= 0 && swiper.activeIndex < weeks.length) {
          const activeWeek = weeks[swiper.activeIndex];
          onWeekChange(activeWeek);
        }
      }, 100);
      return () => clearTimeout(timeout);
    },
    [onWeekChange, weeks]
  );
  const handleSetCurrentStep = reactExports.useCallback((swiper) => {
    setCurrentStep(swiper.activeIndex);
  }, []);
  reactExports.useEffect(() => {
    setCurrentStep(currentWeekIndex >= 0 ? currentWeekIndex : void 0);
  }, [currentWeekIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      ref: swiperRef,
      slidesPerView: 1,
      spaceBetween: 0,
      allowTouchMove: true,
      longSwipesRatio: 0.1,
      longSwipesMs: 300,
      onSlideChange: handleSetCurrentStep,
      onSlideChangeTransitionEnd: handleSlideChangeTransitionEnd,
      currentStep,
      children: weeks.map((week, weekIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-2 py-3", children: week.map((date) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        DayButton,
        {
          date,
          selectedDate,
          daysWithSlots,
          maxPreparedDate,
          isMonthView: false,
          onSelectDate: onSelectDate || (() => {
          }),
          getDayLabel
        },
        date.toISOString()
      )) }) }, weekIndex))
    }
  ) });
}
function MonthView({
  currentMonth,
  selectedDate,
  daysWithSlots,
  maxPreparedDate,
  today,
  onSelectDate,
  onMonthChange,
  dayNames
}) {
  const monthSwiperRef = reactExports.useRef(null);
  const [currentStep, setCurrentStep] = reactExports.useState(void 0);
  const monthsForSwiper = reactExports.useMemo(() => {
    const months = [];
    const todayMonth = startOfMonth(today);
    for (let i = 0; i < 13; i++) {
      months.push(addMonths(todayMonth, i));
    }
    return months;
  }, [today]);
  const currentMonthIndex = reactExports.useMemo(() => {
    return monthsForSwiper.findIndex((month) => {
      const monthStr = format(month, "yyyy-MM");
      const currentStr = format(currentMonth, "yyyy-MM");
      return monthStr === currentStr;
    });
  }, [monthsForSwiper, currentMonth]);
  const generateMonthDays = (month) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const weekContainingMonthEnd = startOfWeek(monthEnd, { weekStartsOn: 1 });
    const calendarEnd = addDays(weekContainingMonthEnd, 6);
    const days = [];
    let currentDate = calendarStart;
    while (currentDate <= calendarEnd) {
      days.push(new Date(currentDate));
      currentDate = addDays(currentDate, 1);
    }
    const weeksList = [];
    for (let i = 0; i < days.length; i += 7) {
      weeksList.push(days.slice(i, i + 7));
    }
    return weeksList;
  };
  const handleSlideChangeTransitionEnd = reactExports.useCallback(
    (swiper) => {
      const timeout = setTimeout(() => {
        if (onMonthChange && swiper.activeIndex >= 0 && swiper.activeIndex < monthsForSwiper.length) {
          const activeMonth = monthsForSwiper[swiper.activeIndex];
          const activeMonthStr = format(activeMonth, "yyyy-MM");
          const currentMonthStr = format(currentMonth, "yyyy-MM");
          if (activeMonthStr !== currentMonthStr) {
            onMonthChange(activeMonth);
          }
        }
      }, 100);
      return () => clearTimeout(timeout);
    },
    [onMonthChange, monthsForSwiper, currentMonth]
  );
  const handleSetCurrentStep = reactExports.useCallback((swiper) => {
    setCurrentStep(swiper.activeIndex);
  }, []);
  reactExports.useEffect(() => {
    setCurrentStep(currentMonthIndex >= 0 ? currentMonthIndex : void 0);
  }, [currentMonthIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-gray-200 dark:border-gray-700", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 px-2 pb-2 pt-3 gap-1", children: dayNames.map((dayName, index) => {
      const isSub = dayName === "Sub" || dayName === "Sat";
      const isNed = dayName === "Ned" || dayName === "Sun";
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "text-center text-xs font-bold uppercase ".concat(isSub ? "text-yellow-600 dark:text-yellow-400" : isNed ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"),
          children: dayName
        },
        index
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwiperWrapper,
      {
        ref: monthSwiperRef,
        slidesPerView: 1,
        spaceBetween: 0,
        allowTouchMove: true,
        longSwipesRatio: 0.1,
        longSwipesMs: 300,
        shortSwipes: true,
        onSlideChange: handleSetCurrentStep,
        onSlideChangeTransitionEnd: handleSlideChangeTransitionEnd,
        currentStep,
        children: monthsForSwiper.map((month) => {
          const monthWeeks = generateMonthDays(month);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-3", children: monthWeeks.map((week, weekIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: week.map((date, dayIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            DayButton,
            {
              date,
              selectedDate,
              daysWithSlots,
              currentMonth: month,
              maxPreparedDate,
              isMonthView: true,
              onSelectDate: onSelectDate || (() => {
              })
            },
            date.toISOString()
          )) }, weekIndex)) }) }, format(month, "yyyy-MM"));
        })
      }
    )
  ] });
}
function BookingWeekDays({
  selectedDate: propSelectedDate
} = {}) {
  const { i18n } = useTranslation();
  const {
    currentWeek,
    selectedDate: contextSelectedDate,
    setSelectedDate,
    daysWithSlots,
    maxPreparedDate,
    handleWeekChange,
    isCalendarOpen,
    currentMonth,
    handleMonthChange,
    today
  } = useCalendarContext();
  const selectedDate = propSelectedDate !== void 0 ? propSelectedDate : contextSelectedDate;
  const dayNames = {
    sr: ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  };
  const monthDayNames = reactExports.useMemo(() => {
    var _a, _b;
    const lang = (_b = (_a = i18n.language) == null ? void 0 : _a.toLowerCase()) != null ? _b : "sr";
    const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
    return dayNames[localeKey];
  }, [i18n.language]);
  const getDayLabel = (date) => {
    var _a, _b;
    const lang = (_b = (_a = i18n.language) == null ? void 0 : _a.toLowerCase()) != null ? _b : "sr";
    const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
    const dayOfWeek = date.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    return dayNames[localeKey][adjustedDayOfWeek];
  };
  if (isCalendarOpen && currentMonth) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MonthView,
      {
        currentMonth,
        selectedDate,
        daysWithSlots,
        maxPreparedDate,
        today,
        onSelectDate: setSelectedDate,
        onMonthChange: handleMonthChange,
        dayNames: monthDayNames
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WeekView,
    {
      currentWeek,
      selectedDate,
      daysWithSlots,
      maxPreparedDate,
      today,
      onSelectDate: setSelectedDate,
      onWeekChange: handleWeekChange,
      getDayLabel
    }
  );
}
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
  activeSlideIndex,
  swiperOptions = {},
  slideToAnimationDuration = 0
}) {
  const swiperRef = reactExports.useRef(null);
  const contentRefFunctions = useContentRefFunctions();
  const isManualSwipeRef = reactExports.useRef(false);
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
  const handleTouchStart = reactExports.useCallback(() => {
    isManualSwipeRef.current = true;
  }, []);
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
    }
  };
  const handleSlideChangeTransitionEnd = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const activeSlide = slides[activeIndex];
    if (!activeSlide || !onDateChange) {
      isManualSwipeRef.current = false;
      return;
    }
    if (isManualSwipeRef.current && activeSlide.type === "day" && activeSlide.dateObj) {
      onDateChange(activeSlide.dateObj);
    }
    isManualSwipeRef.current = false;
  };
  const handleSlideChangeTransitionStart = async (swiper) => {
    scrollToTopIfNeeded();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      ref: swiperRef,
      spaceBetween: 16,
      navigation: true,
      onTouchStart: handleTouchStart,
      onSlideChange: handleSlideChange,
      onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
      onSlideChangeTransitionEnd: handleSlideChangeTransitionEnd,
      currentStep: activeSlideIndex >= 0 && activeSlideIndex < slides.length ? activeSlideIndex : void 0,
      ...swiperOptions,
      children: slides.map((slide, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwiperSlide,
        {
          children: children(slide)
        },
        slide.date ? "".concat(slide.date, "-").concat(slide.type) : "".concat(slide.type, "-").concat(index)
      ))
    }
  );
}
export {
  BookingCalendarContext as B,
  ReservationCalendarProvider as R,
  SLOT_SEARCH_TOLERANCE_MINUTES as S,
  WeekSwiperWrapper as W,
  BookingCalendarHeader as a,
  BookingWeekDays as b,
  BookingCalendarProvider as c,
  useReservationCalendarContext as d,
  useBookingCalendarContext as u
};
