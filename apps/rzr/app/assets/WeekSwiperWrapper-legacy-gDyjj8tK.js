;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './index-legacy-edMTpd93.js', './App-legacy-C_YJGjpY.js', './workingShift.fe-services-legacy-DnHl2W7t.js', './reservation.services-legacy-BM1viy4M.js'], function (exports, module) {
    'use strict';

    var addDays, isToday$1, format, startOfMonth, endOfMonth, eachDayOfInterval, startOfDay, toZonedTime, parseISO, addMinutes, formatInTimeZone, fromZonedTime, reactExports, startOfWeek, endOfWeek, isSameDay, subMonths, addMonths, jsxRuntimeExports, parse, isWithinInterval, differenceInMinutes, isSameMonth, SwiperSlide, useTranslation, IonToolbar, IonButton, IonIcon, calendarOutline, IonSpinner, chevronUpOutline, chevronDownOutline, IonButtons, chevronBackOutline, chevronForwardOutline, rzrApi, TagType, getPauseBetweenReservations, getAppTimezone, transformStandardResponseToCamelCase, useUser, useAppSelector, useGetFeWorkersQuery, reservationTimeInterval, getUtcDateFormattedInTz, parseUtcDate, SwiperWrapper, useContentRefFunctions, useGetFeWorkerWorkingShiftsByDaysQuery, useGetFeLocationReservationsQuery;
    return {
      setters: [module => {
        addDays = module.aS;
        isToday$1 = module.b0;
        format = module.aC;
        startOfMonth = module.aP;
        endOfMonth = module.aQ;
        eachDayOfInterval = module.b1;
        startOfDay = module.aT;
        toZonedTime = module.aB;
        parseISO = module.az;
        addMinutes = module.aW;
        formatInTimeZone = module.aA;
        fromZonedTime = module.aD;
        reactExports = module.e;
        startOfWeek = module.aR;
        endOfWeek = module.b2;
        isSameDay = module.b3;
        subMonths = module.b4;
        addMonths = module.b5;
        jsxRuntimeExports = module.j;
        parse = module.b6;
        isWithinInterval = module.b7;
        differenceInMinutes = module.b8;
        isSameMonth = module.b9;
        SwiperSlide = module.aj;
        useTranslation = module.M;
      }, module => {
        IonToolbar = module.f;
        IonButton = module.d;
        IonIcon = module.b;
        calendarOutline = module.ag;
        IonSpinner = module.o;
        chevronUpOutline = module.bq;
        chevronDownOutline = module.bp;
        IonButtons = module.i;
        chevronBackOutline = module.av;
        chevronForwardOutline = module.a4;
      }, module => {
        rzrApi = module.t;
        TagType = module.v;
        getPauseBetweenReservations = module.G;
      }, module => {
        getAppTimezone = module.v;
        transformStandardResponseToCamelCase = module.H;
        useUser = module.b;
        useAppSelector = module.$;
        useGetFeWorkersQuery = module.q;
        reservationTimeInterval = module.a0;
        getUtcDateFormattedInTz = module.a1;
        parseUtcDate = module.a2;
        SwiperWrapper = module.S;
        useContentRefFunctions = module.k;
      }, module => {
        useGetFeWorkerWorkingShiftsByDaysQuery = module.u;
      }, module => {
        useGetFeLocationReservationsQuery = module.d;
      }],
      execute: function () {
        exports({
          R: ReservationCalendarProvider,
          W: WeekSwiperWrapper,
          a: BookingCalendarHeader,
          b: BookingWeekDays,
          c: BookingCalendarProvider,
          d: useReservationCalendarContext,
          u: useBookingCalendarContext
        });
        function generateWeek(startDate) {
          const week = [];
          for (let i = 0; i < 7; i++) {
            week.push(addDays(startDate, i));
          }
          return week;
        }
        function formatMonthYear(date) {
          const monthNames = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"];
          return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        }
        function isToday(date) {
          return isToday$1(date);
        }
        function isPastDate(date) {
          const timezone = getAppTimezone();
          const today = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
          const checkDate = startOfDay(date);
          return checkDate < today;
        }
        function hasAnySlotsInWeek(weekSlots) {
          return Object.values(weekSlots).some(daySlots => daySlots.some(workerSlots => workerSlots.hasSlots));
        }
        function getDaysWithSlotsSet(weekSlots) {
          const daysSet = /* @__PURE__ */new Set();
          Object.entries(weekSlots).forEach(([dateStr, slots]) => {
            if (slots.some(ws => ws.hasSlots)) {
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
          const daysInMonth = eachDayOfInterval({
            start: monthStart,
            end: monthEnd
          });
          for (const day of daysInMonth) {
            const dayStr = format(day, "yyyy-MM-dd");
            if (daysWithSlots.has(dayStr)) {
              return day;
            }
          }
          return null;
        }
        const bookingCalendarApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getWeekSlots: builder.query({
              query: params => {
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
                  url: `locations/${params.locationSlug}/slots/week`,
                  method: "POST",
                  body
                };
              },
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [{
                type: TagType.SHIFT,
                id: "WEEK_SLOTS"
              }, {
                type: TagType.RESERVATION,
                id: "LIST"
              }],
              // Cache za 5 minuta
              keepUnusedDataFor: 300
            }),
            getTimeGaps: builder.query({
              query: params => {
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
                  url: `locations/${params.locationSlug}/slots/gaps`,
                  method: "POST",
                  body
                };
              },
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: (result, error, {
                locationSlug
              }) => [{
                type: TagType.SHIFT,
                id: "TIME_GAPS"
              }, {
                type: TagType.RESERVATION,
                id: "LIST"
              }, {
                type: TagType.LOCATION,
                id: locationSlug
              }],
              keepUnusedDataFor: 300
              // 5 minutes
            }),
            getReservationsList: builder.query({
              query: params => {
                const queryParams = new URLSearchParams();
                queryParams.append("startDate", params.startDate);
                queryParams.append("endDate", params.endDate);
                if (params.workerIds !== void 0 && params.workerIds !== null && params.workerIds.length > 0) {
                  params.workerIds.forEach(id => queryParams.append("workerIds[]", id.toString()));
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
                  url: `locations/${params.locationSlug}/reservations/list?${queryParams.toString()}`,
                  method: "GET"
                };
              },
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: (result, error, {
                locationSlug
              }) => [{
                type: TagType.RESERVATION,
                id: "LIST"
              }, {
                type: TagType.LOCATION,
                id: locationSlug
              }],
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
        const SLOT_SEARCH_TOLERANCE_MINUTES = exports("S", 20);
        function calculateTotalServiceDuration(selectedServices) {
          return selectedServices.flatMap(group => group.services ?? []).reduce((total, service) => {
            return total + service.duration * (service.quantity ?? 1);
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
          const currentTime = toZonedTime(/* @__PURE__ */new Date(), timezone);
          const slots = [];
          const validGaps = gaps.filter(gap => canGapFitServices(gap, totalServiceDuration, pauseBetweenReservations));
          for (const gap of validGaps) {
            const gapStartUtc = parseISO(gap.time);
            const gapEndUtc = addMinutes(gapStartUtc, gap.duration);
            const gapStartLocal = toZonedTime(gapStartUtc, timezone);
            const gapEndLocal = toZonedTime(gapEndUtc, timezone);
            formatInTimeZone(gapStartUtc, timezone, "yyyy-MM-dd");
            const minStartTime = addMinutes(currentTime, delay);
            if (gapStartLocal < minStartTime) {
              const adjustedStart = minStartTime;
              if (adjustedStart >= gapEndLocal) {
                continue;
              }
              generateSlotsInGap(adjustedStart, gapEndLocal, totalServiceDuration, pauseBetweenReservations, slotInterval, slots, gapStartLocal);
            } else {
              generateSlotsInGap(gapStartLocal, gapEndLocal, totalServiceDuration, pauseBetweenReservations, slotInterval, slots, gapStartLocal);
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
            const isTooClose = filteredSlots.some(existingSlot => {
              const diffMinutes = Math.abs((slot.getTime() - existingSlot.getTime()) / 1e3 / 60);
              return diffMinutes > 0 && diffMinutes < minDifference;
            });
            if (!isTooClose) {
              filteredSlots.push(slot);
            }
          }
          for (const slot of filteredSlots) {
            const slotMinutes = slot.getMinutes();
            const roundedMinutes = Math.round(slotMinutes / 5) * 5;
            const roundedSlot = new Date(slot);
            if (roundedMinutes >= 60) {
              roundedSlot.setHours(roundedSlot.getHours() + 1, 0, 0, 0);
            } else {
              roundedSlot.setMinutes(roundedMinutes, 0, 0);
            }
            const slotStartUtc = fromZonedTime(roundedSlot, timezone);
            const slotTime = formatInTimeZone(slotStartUtc, "UTC", "HH:mm");
            const isPreviousDay = roundedSlot.getDate() !== originalGapStart.getDate();
            const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
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
          const {
            isOwnerOrWorker
          } = useUser();
          const pauseBetweenReservations = useAppSelector(getPauseBetweenReservations);
          const timezone = getAppTimezone();
          const today = reactExports.useMemo(() => startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone)), [timezone]);
          const [currentWeek, setCurrentWeek] = reactExports.useState(() => generateWeek(today));
          const [selectedDate, setSelectedDate] = reactExports.useState(today);
          const [isCalendarOpen, setIsCalendarOpen] = reactExports.useState(false);
          const [currentMonth, setCurrentMonth] = reactExports.useState(() => startOfMonth(today));
          const [weekSlots, setWeekSlots] = reactExports.useState({});
          const [monthSlots, setMonthSlots] = reactExports.useState({});
          const [errorMessage, setErrorMessage] = reactExports.useState(null);
          const hasInitializedDate = reactExports.useRef(false);
          const previousWeekRef = reactExports.useRef(currentWeek);
          const previousMonthRef = reactExports.useRef(currentMonth);
          const isManualDateSelectionRef = reactExports.useRef(false);
          reactExports.useEffect(() => {
            hasInitializedDate.current = false;
          }, [worker?.id, workerIds, locationSlug]);
          const serviceIds = reactExports.useMemo(() => selectedServices.flatMap(group => (group.services ?? []).map(service => service.id).filter(id => typeof id === "number")), [selectedServices]);
          const workerIdsToSend = reactExports.useMemo(() => {
            if (workerIds !== void 0 && workerIds !== null && workerIds.length > 0) {
              return workerIds;
            }
            if (Array.isArray(workerIds) && workerIds.length === 0) {
              return null;
            }
            if (worker?.id) {
              return [worker.id];
            }
            return null;
          }, [worker?.id, workerIds]);
          const weekStartDate = reactExports.useMemo(() => {
            const weekFirstDayInAppTz = toZonedTime(currentWeek[0], timezone);
            const weekStart = startOfWeek(weekFirstDayInAppTz, {
              weekStartsOn: 1
            });
            const weekStartInUtc = fromZonedTime(weekStart, timezone);
            const formatted = formatInTimeZone(weekStartInUtc, timezone, "yyyy-MM-dd'T'00:00:00XXX");
            return formatted;
          }, [currentWeek, timezone]);
          const weekEndDate = reactExports.useMemo(() => {
            const weekLastDayInAppTz = toZonedTime(currentWeek[6], timezone);
            const weekEnd = endOfWeek(weekLastDayInAppTz, {
              weekStartsOn: 1
            });
            const weekEndInUtc = fromZonedTime(weekEnd, timezone);
            const formatted = formatInTimeZone(weekEndInUtc, timezone, "yyyy-MM-dd'T'23:59:59XXX");
            return formatted;
          }, [currentWeek, timezone]);
          const monthStartDate = reactExports.useMemo(() => {
            const monthInAppTz = toZonedTime(currentMonth, timezone);
            const monthStart = startOfMonth(monthInAppTz);
            const calendarStart = startOfWeek(monthStart, {
              weekStartsOn: 1
            });
            const calendarStartInUtc = fromZonedTime(calendarStart, timezone);
            const formatted = formatInTimeZone(calendarStartInUtc, timezone, "yyyy-MM-dd'T'00:00:00XXX");
            return formatted;
          }, [currentMonth, timezone]);
          const monthEndDate = reactExports.useMemo(() => {
            const monthInAppTz = toZonedTime(currentMonth, timezone);
            const monthStart = startOfMonth(monthInAppTz);
            const calendarStart = startOfWeek(monthStart, {
              weekStartsOn: 1
            });
            const calendarEnd = addDays(calendarStart, 34);
            const calendarEndInUtc = fromZonedTime(calendarEnd, timezone);
            const formatted = formatInTimeZone(calendarEndInUtc, timezone, "yyyy-MM-dd'T'23:59:59XXX");
            return formatted;
          }, [currentMonth, timezone]);
          const startDate = reactExports.useMemo(() => {
            return isCalendarOpen ? monthStartDate : weekStartDate;
          }, [isCalendarOpen, monthStartDate, weekStartDate]);
          const endDate = reactExports.useMemo(() => {
            return isCalendarOpen ? monthEndDate : weekEndDate;
          }, [isCalendarOpen, monthEndDate, weekEndDate]);
          const shouldSkip = !isActive || serviceIds.length === 0;
          const {
            data: workersData
          } = useGetFeWorkersQuery({
            locationSlug
          });
          const workersById = reactExports.useMemo(() => {
            if (!workersData?.data) return {};
            return workersData.data.reduce((acc, worker2) => {
              acc[worker2.id] = worker2;
              return acc;
            }, {});
          }, [workersData]);
          const filteredWorkers = reactExports.useMemo(() => {
            if (!workersData?.data) return [];
            if (workerIdsToSend === null) {
              return workersData.data;
            }
            return workersData.data.filter(worker2 => workerIdsToSend.includes(worker2.id));
          }, [workersData, workerIdsToSend]);
          const {
            isLoading,
            isFetching,
            data: gapsData,
            error
          } = useGetTimeGapsQuery({
            locationSlug,
            startDate,
            endDate,
            workerIds: workerIdsToSend,
            includeReservations: false
            // We don't need reservations for slot generation
            // onlyLongestGap: false, // Always get all gaps, not just longest (for consistency between week and month view)
          }, {
            skip: shouldSkip
          });
          reactExports.useEffect(() => {
            if (error) {
              console.error("Error loading slots:", error);
              setErrorMessage("Slot service is currently unavailable. Please try again later.");
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
            const calendarStart = startOfWeek(monthStart, {
              weekStartsOn: 1
            });
            return Array.from({
              length: 35
            }, (_, i) => addDays(calendarStart, i));
          }, [currentMonth]);
          const datesToProcess = reactExports.useMemo(() => {
            return isCalendarOpen ? monthDatesToProcess : weekDatesToProcess;
          }, [isCalendarOpen, monthDatesToProcess, weekDatesToProcess]);
          reactExports.useEffect(() => {
            if (gapsData?.data) {
              const {
                gaps: gapsByDate
              } = gapsData.data;
              const slotsByDate = {};
              datesToProcess.forEach(date => {
                const dateInUtc = fromZonedTime(date, timezone);
                const dateKeyWithDashes = formatInTimeZone(dateInUtc, timezone, "yyyy-MM-dd");
                const dateKeyWithoutDashes = formatInTimeZone(dateInUtc, timezone, "yyyyMMdd");
                const dayGaps = gapsByDate[dateKeyWithoutDashes] || gapsByDate[dateKeyWithDashes] || [];
                if (dayGaps.length === 0) {
                  if (workersData?.data) {
                    slotsByDate[dateKeyWithDashes] = workersData.data.map(worker2 => ({
                      workerId: worker2.id,
                      slots: [],
                      hasSlots: false
                    }));
                  }
                  return;
                }
                const gapsByWorker = {};
                dayGaps.forEach(gap => {
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
                  const delay = isOwnerOrWorker ? 0 : 180;
                  const slots = generateSlotsFromGaps(gapsToUse, selectedServices, reservationTimeInterval, pauseBetweenReservations,
                  // Use pause from persisted state
                  delay);
                  const timeSlots = slots.map(time => ({
                    time
                  }));
                  workerSlots.push({
                    workerId: worker2.id,
                    slots: timeSlots,
                    hasSlots: timeSlots.length > 0
                  });
                });
                if (filteredWorkers.length > 0) {
                  filteredWorkers.forEach(worker2 => {
                    const hasWorker = workerSlots.some(ws => ws.workerId === worker2.id);
                    if (!hasWorker) {
                      workerSlots.push({
                        workerId: worker2.id,
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
            } else if (gapsData?.data && Object.keys(gapsData.data.gaps).length === 0) {
              if (filteredWorkers.length > 0) {
                const slotsByDate = {};
                datesToProcess.forEach(date => {
                  const dateInUtc = fromZonedTime(date, timezone);
                  const dateKey = formatInTimeZone(dateInUtc, timezone, "yyyy-MM-dd");
                  slotsByDate[dateKey] = filteredWorkers.map(worker2 => ({
                    workerId: worker2.id,
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
          }, [gapsData, selectedServices, datesToProcess, workersById, workersData, filteredWorkers, isCalendarOpen, timezone, isOwnerOrWorker, reservationTimeInterval]);
          const activeSlots = reactExports.useMemo(() => {
            return isCalendarOpen ? monthSlots : weekSlots;
          }, [isCalendarOpen, monthSlots, weekSlots]);
          const hasAnySlots = reactExports.useMemo(() => hasAnySlotsInWeek(activeSlots), [activeSlots]);
          const daysWithSlots = reactExports.useMemo(() => getDaysWithSlotsSet(activeSlots), [activeSlots]);
          const isFirstWeek = reactExports.useMemo(() => {
            const todayInTz = startOfDay(today);
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
            const todayInTz = startOfDay(today);
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
          const changeWeek = reactExports.useCallback(week => {
            setCurrentWeek(week);
          }, []);
          const changeMonth = reactExports.useCallback(month => {
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
          const handleWeekChange = reactExports.useCallback(week => {
            changeWeek(week);
          }, [changeWeek]);
          const handleMonthChange = reactExports.useCallback(month => {
            changeMonth(month);
          }, [changeMonth]);
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
          const shouldSwitchToNextMonth = reactExports.useCallback((week, selectedDateValue) => {
            if (!selectedDateValue) {
              return false;
            }
            const mondayInWeek = week.find(date => date.getDay() === 1);
            if (!mondayInWeek) {
              return false;
            }
            const selectedDateNormalized = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth(), selectedDateValue.getDate());
            const mondayNormalized = new Date(mondayInWeek.getFullYear(), mondayInWeek.getMonth(), mondayInWeek.getDate());
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
          }, [today]);
          const toggleCalendar = reactExports.useCallback(() => {
            setIsCalendarOpen(prev => {
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
                  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                  const daysDiff = Math.floor((selectedDateStart.getTime() - todayStart.getTime()) / (1e3 * 60 * 60 * 24));
                  const weekNumber = Math.floor(daysDiff / 7);
                  const weekStart = addDays(todayStart, weekNumber * 7);
                  setCurrentWeek(generateWeek(weekStart));
                }
              }
              return newValue;
            });
          }, [selectedDate, today, daysWithSlots, currentWeek, shouldSwitchToNextMonth]);
          const handleSelectDate = reactExports.useCallback(date => {
            isManualDateSelectionRef.current = true;
            setSelectedDate(date);
            setTimeout(() => {
              isManualDateSelectionRef.current = false;
            }, 100);
          }, []);
          reactExports.useEffect(() => {
            if (isManualDateSelectionRef.current) return;
            const weekChanged = previousWeekRef.current[0]?.getTime() !== currentWeek[0]?.getTime();
            const monthChanged = previousMonthRef.current.getTime() !== currentMonth.getTime();
            if (weekChanged && !isCalendarOpen) {
              const firstAvailableDay = findFirstAvailableDayInWeek(currentWeek, daysWithSlots);
              if (firstAvailableDay) {
                setSelectedDate(firstAvailableDay);
              }
              previousWeekRef.current = currentWeek;
            } else if (monthChanged && isCalendarOpen) {
              const firstAvailableDay = findFirstAvailableDayInMonth(currentMonth, daysWithSlots);
              if (firstAvailableDay) {
                setSelectedDate(firstAvailableDay);
              }
              previousMonthRef.current = currentMonth;
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
            today,
            workersById
          };
        }
        const BookingCalendarContext = exports("B", reactExports.createContext(void 0));
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
          return /* @__PURE__ */jsxRuntimeExports.jsx(BookingCalendarContext.Provider, {
            value: {
              ...calendarState,
              selectedServices,
              selectedCategory,
              isActive
            },
            children
          });
        }
        function useBookingCalendarContext() {
          const context = reactExports.useContext(BookingCalendarContext);
          if (context === void 0) {
            throw new Error("useBookingCalendarContext must be used within a BookingCalendarProvider");
          }
          return context;
        }
        const getTimeSlotsForTable = (locationReservations, date, timeFromUtc, timeToUtc, pauses, intervalMinutes = 30) => {
          const dateIso = parseISO(date);
          const dateIsoUTC = parseISO(`${date}T00:00:00Z`);
          const allSlots = [];
          const slotDuration = {};
          let startTime = parse(timeFromUtc, "HH:mm:ss", dateIso);
          const endTime = parse(timeToUtc, "HH:mm:ss", dateIso);
          if (startTime > endTime) {
            startTime = addMinutes(startTime, -24 * 60);
          }
          if (pauses?.length) {
            pauses.forEach(pause => {
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
                const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
                if (isWithinInterval(currentPauseTime, {
                  start: startTime,
                  end: endTime
                })) {
                  allSlots.push(prefixedSlot);
                  slotDuration[prefixedSlot] = intervalMinutes;
                }
                currentPauseTime = addMinutes(currentPauseTime, intervalMinutes);
              }
            });
          }
          let currentTime = startTime;
          while (isWithinInterval(currentTime, {
            start: startTime,
            end: endTime
          })) {
            if (currentTime.getTime() >= endTime.getTime()) {
              break;
            }
            const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
            const isPreviousDay = isCrossMidnight && currentTime.getDate() !== dateIso.getDate();
            const slotTime = format(currentTime, "HH:mm");
            const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
            if (!allSlots.includes(prefixedSlot)) {
              allSlots.push(prefixedSlot);
            }
            currentTime = addMinutes(currentTime, intervalMinutes);
          }
          if (locationReservations?.length) {
            locationReservations.forEach(reservation => {
              const reservationStartUtc = parseISO(reservation.dateUtc);
              const reservationStartTimeUtc = formatInTimeZone(reservationStartUtc, "UTC", "HH:mm:ss");
              const isPreviousDay = reservationStartUtc.getUTCDate() !== dateIsoUTC.getUTCDate();
              const reservationStart = parse(reservationStartTimeUtc, "HH:mm:ss", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
              const slotTime = format(reservationStart, "HH:mm");
              const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
              if (!allSlots.includes(prefixedSlot)) {
                allSlots.push(prefixedSlot);
              }
              slotDuration[prefixedSlot] = reservation.servicesDuration;
            });
          }
          const filteredSlots = allSlots.filter(slot => {
            if (slotDuration[slot]) {
              return true;
            }
            const isPreviousDay = slot.startsWith("-");
            const actualSlot = isPreviousDay ? slot.substring(1) : slot;
            const slotTime = parse(actualSlot, "HH:mm", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
            for (const [existingSlot, duration] of Object.entries(slotDuration)) {
              const existingIsPreviousDay = existingSlot.startsWith("-");
              const existingActualSlot = existingIsPreviousDay ? existingSlot.substring(1) : existingSlot;
              const existingSlotTime = parse(existingActualSlot, "HH:mm", existingIsPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
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
          return sortedSlots.map(slot => {
            const isPreviousDay = slot.startsWith("-");
            const actualSlot = isPreviousDay ? slot.substring(1) : slot;
            const slotTime = parse(actualSlot, "HH:mm", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
            const isPauseSlot = pauses?.some(pause => {
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
          const today = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
          const [currentWeek, setCurrentWeek] = reactExports.useState(() => generateWeek(today));
          const [selectedDate, setSelectedDate] = reactExports.useState(null);
          const [isCalendarOpen, setIsCalendarOpen] = reactExports.useState(false);
          const [currentMonth, setCurrentMonth] = reactExports.useState(() => startOfMonth(today));
          reactExports.useRef(false);
          const {
            data: workersWorkingShiftsByDaysResult,
            isFetching: isWorkersWorkingShiftsFetching
          } = useGetFeWorkerWorkingShiftsByDaysQuery({
            locationSlug,
            workerId: selectedWorker.id
          });
          const {
            data: locationReservations,
            isLoading: isReservationsLoading
          } = useGetFeLocationReservationsQuery({
            locationSlug,
            locationWorkerId: selectedWorker.id,
            categoryId: selectedCategory?.id,
            withClient: 1
          });
          const reservationByDate = reactExports.useMemo(() => locationReservations?.data.reduce((acc, reservation) => {
            const date = getUtcDateFormattedInTz(reservation.dateUtc);
            if (!acc[date]) {
              acc[date] = [];
            }
            acc[date].push(reservation);
            return acc;
          }, {}), [locationReservations]);
          const timeSlots = reactExports.useMemo(() => {
            if (!workersWorkingShiftsByDaysResult?.data) {
              return void 0;
            }
            const slotsByDay = [];
            workersWorkingShiftsByDaysResult.data.forEach(shift => {
              const {
                date: realDate,
                dateFormatted: realDateFormatted
              } = parseUtcDate(shift.dateUtc, timezone);
              const reservationsForDate = reservationByDate?.[realDateFormatted];
              const slots = getTimeSlotsForTable(reservationsForDate, realDateFormatted, shift.timeFromUtc, shift.timeToUtc, shift.pausesUtc);
              slotsByDay.push({
                dateFormatted: realDateFormatted,
                date: realDate,
                slots,
                workerId: selectedWorker.id
              });
            });
            return slotsByDay;
          }, [workersWorkingShiftsByDaysResult?.data, selectedWorker, reservationByDate, timezone]);
          const daysWithSlots = reactExports.useMemo(() => {
            const daysSet = /* @__PURE__ */new Set();
            timeSlots?.forEach(slot => {
              daysSet.add(slot.dateFormatted);
            });
            return daysSet;
          }, [timeSlots]);
          const selectedDateIndex = reactExports.useMemo(() => {
            if (!selectedDate) return 0;
            const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
            return timeSlots?.findIndex(slot => slot.dateFormatted === selectedDateStr) ?? 0;
          }, [timeSlots, selectedDate]);
          const firstAvailableDate = reactExports.useMemo(() => {
            if (!timeSlots || timeSlots.length === 0) return null;
            const todayStr = format(today, "yyyy-MM-dd");
            const sorted = [...timeSlots].sort((a, b) => a.dateFormatted.localeCompare(b.dateFormatted));
            const upcoming = sorted.find(s => s.dateFormatted >= todayStr);
            return upcoming || sorted[0];
          }, [timeSlots, today]);
          const isFirstWeek = reactExports.useMemo(() => {
            const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
            const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
            return isToday(weekStartInTz) && isToday(todayInTz);
          }, [currentWeek, timezone]);
          const monthHasSlots = reactExports.useMemo(() => {
            if (!isCalendarOpen || !currentMonth) return false;
            const monthStart = startOfMonth(currentMonth);
            const monthEnd = endOfMonth(currentMonth);
            const calendarStart = startOfWeek(monthStart, {
              weekStartsOn: 1
            });
            const weekContainingMonthEnd = startOfWeek(monthEnd, {
              weekStartsOn: 1
            });
            const calendarEnd = addDays(weekContainingMonthEnd, 6);
            return timeSlots?.some(slot => {
              const slotDate = slot.date;
              return slotDate >= calendarStart && slotDate <= calendarEnd;
            }) ?? false;
          }, [isCalendarOpen, currentMonth, timeSlots]);
          const hasAnySlots = reactExports.useMemo(() => {
            return (timeSlots?.length ?? 0) > 0;
          }, [timeSlots]);
          const shouldSwitchToNextMonth = reactExports.useCallback((week, selectedDateValue) => {
            if (!selectedDateValue) {
              return false;
            }
            const mondayInWeek = week.find(date => date.getDay() === 1);
            if (!mondayInWeek) {
              return false;
            }
            const selectedDateNormalized = new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth(), selectedDateValue.getDate());
            const mondayNormalized = new Date(mondayInWeek.getFullYear(), mondayInWeek.getMonth(), mondayInWeek.getDate());
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
          }, [today]);
          const toggleCalendar = reactExports.useCallback(() => {
            setIsCalendarOpen(prev => {
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
                  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                  const daysDiff = Math.floor((selectedDateStart.getTime() - todayStart.getTime()) / (1e3 * 60 * 60 * 24));
                  const weekNumber = Math.floor(daysDiff / 7);
                  const weekStart = addDays(todayStart, weekNumber * 7);
                  setCurrentWeek(generateWeek(weekStart));
                }
              }
              return newValue;
            });
          }, [selectedDate, today, daysWithSlots, currentWeek, shouldSwitchToNextMonth]);
          const handleSelectDate = reactExports.useCallback(date => {
            isManualDateSelectionRef.current = true;
            setSelectedDate(date);
            setTimeout(() => {
              isManualDateSelectionRef.current = false;
            }, 100);
          }, []);
          const handleWeekChange = reactExports.useCallback(week => {
            setCurrentWeek(week);
          }, []);
          const handleMonthChange = reactExports.useCallback(month => {
            setCurrentMonth(startOfMonth(month));
          }, []);
          const previousWeekRef = reactExports.useRef(currentWeek);
          const previousMonthRef = reactExports.useRef(currentMonth);
          const isManualDateSelectionRef = reactExports.useRef(false);
          reactExports.useEffect(() => {
            if (isManualDateSelectionRef.current) return;
            const weekChanged = previousWeekRef.current[0]?.getTime() !== currentWeek[0]?.getTime();
            const monthChanged = previousMonthRef.current.getTime() !== currentMonth.getTime();
            if (weekChanged && !isCalendarOpen) {
              const firstAvailableDay = findFirstAvailableDayInWeek(currentWeek, daysWithSlots);
              if (firstAvailableDay) {
                setSelectedDate(firstAvailableDay);
              }
              previousWeekRef.current = currentWeek;
            } else if (monthChanged && isCalendarOpen) {
              const firstAvailableDay = findFirstAvailableDayInMonth(currentMonth, daysWithSlots);
              if (firstAvailableDay) {
                setSelectedDate(firstAvailableDay);
              }
              previousMonthRef.current = currentMonth;
            }
          }, [currentWeek, currentMonth, isCalendarOpen, daysWithSlots]);
          const goToPreviousWeek = reactExports.useCallback(() => {
            setCurrentWeek(prev => generateWeek(addDays(prev[0], -7)));
          }, []);
          const goToNextWeek = reactExports.useCallback(() => {
            setCurrentWeek(prev => generateWeek(addDays(prev[0], 7)));
          }, []);
          const canGoPreviousWeek = reactExports.useMemo(() => {
            const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
            const weekStartInTz = startOfDay(toZonedTime(currentWeek[0], timezone));
            return weekStartInTz > todayInTz;
          }, [currentWeek, timezone]);
          const canGoNextWeek = true;
          const goToPreviousMonth = reactExports.useCallback(() => {
            setCurrentMonth(prev => subMonths(prev));
          }, []);
          const goToNextMonth = reactExports.useCallback(() => {
            setCurrentMonth(prev => addMonths(prev, 1));
          }, []);
          const canGoPreviousMonth = reactExports.useMemo(() => {
            const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
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
          return /* @__PURE__ */jsxRuntimeExports.jsx(ReservationCalendarContext.Provider, {
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
          });
        }
        function useReservationCalendarContext() {
          const context = reactExports.useContext(ReservationCalendarContext);
          if (context === void 0) {
            throw new Error("useReservationCalendarContext must be used within a ReservationCalendarProvider");
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
          throw new Error("useCalendarContext must be used within a BookingCalendarProvider or ReservationCalendarProvider");
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
            const weekDateStrs = currentWeek.map(d => format(d, "yyyy-MM-dd"));
            const isSelectedDateInWeek = weekDateStrs.includes(selectedDateStr);
            return isSelectedDateInWeek ? selectedDate : currentWeek[0];
          })();
          const monthYearText = formatMonthYear(monthToDisplay);
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
            className: "border-b border-gray-200 dark:border-gray-700",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex items-center justify-between px-4 py-1",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                fill: isCalendarOpen ? "solid" : "clear",
                color: isCalendarOpen ? "success" : void 0,
                onClick: toggleCalendar,
                className: `text-sm font-medium rounded-lg ${isCalendarOpen ? "bg-green-500/30" : ""}`,
                size: "small",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: calendarOutline,
                  slot: "start",
                  className: "mr-2"
                }), monthYearText, isLoadingSlots ? /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: calendarOutline,
                  className: "ml-2 opacity-0"
                }) : null, isLoadingSlots ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  slot: "end",
                  className: "ml-2"
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: isCalendarOpen ? chevronUpOutline : chevronDownOutline,
                  slot: "end",
                  className: "ml-2"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButtons, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: goToPrevious,
                  disabled: !canGoPrevious,
                  fill: "clear",
                  size: "small",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronBackOutline
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: goToNext,
                  disabled: !canGoNext,
                  fill: "clear",
                  size: "small",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronForwardOutline
                  })
                })]
              })]
            })
          });
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
          const timezone = getAppTimezone();
          const dateStr = formatInTimeZone(date, timezone, "yyyy-MM-dd");
          const selectedDateStr = selectedDate ? formatInTimeZone(selectedDate, timezone, "yyyy-MM-dd") : null;
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
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            onClick: handleClick,
            className: `
        flex flex-col items-center justify-center
        ${isMonthView ? "min-w-0 px-1.5 py-2" : "flex-1 min-w-0 px-1.5 py-2"}
        rounded-xl transition-all duration-200
        ${isSelected ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg ring-2 ring-emerald-500 dark:ring-emerald-400" : isDisabled ? "cursor-not-allowed" : isCurrentMonth || !isMonthView ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}
        ${isTodayDate && !isSelected && !isDisabled ? "ring-2 ring-gray-600 dark:ring-gray-400" : ""}
      `,
            children: [!isMonthView && dayLabel && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
              className: `text-sm font-semibold tracking-wide uppercase mb-1 ${dayLabelColor || (isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400")}`,
              style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots && !isSub && !isNed ? {
                color: "var(--ion-text-color, #111827)"
              } : void 0,
              children: dayLabel
            }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
              className: `${isMonthView && !isCurrentMonth ? "text-sm" : "text-lg"} font-bold ${isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400"}`,
              style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots ? {
                color: "var(--ion-text-color, #111827)"
              } : void 0,
              children: date.getDate()
            }), hasSlots && !isDisabled && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: `w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white dark:bg-gray-900" : "bg-emerald-500 dark:bg-emerald-400"}`
            })]
          });
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
            let currentWeekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
            return weeks.findIndex(week => {
              const weekStart = week[0];
              const currentStart = currentWeek[0];
              return weekStart.getFullYear() === currentStart.getFullYear() && weekStart.getMonth() === currentStart.getMonth() && weekStart.getDate() === currentStart.getDate();
            });
          }, [weeks, currentWeek]);
          const handleSlideChangeTransitionEnd = reactExports.useCallback(swiper => {
            const timeout = setTimeout(() => {
              if (onWeekChange && swiper.activeIndex >= 0 && swiper.activeIndex < weeks.length) {
                const activeWeek = weeks[swiper.activeIndex];
                onWeekChange(activeWeek);
              }
            }, 100);
            return () => clearTimeout(timeout);
          }, [onWeekChange, weeks]);
          const handleSetCurrentStep = reactExports.useCallback(swiper => {
            setCurrentStep(swiper.activeIndex);
          }, []);
          reactExports.useEffect(() => {
            setCurrentStep(currentWeekIndex >= 0 ? currentWeekIndex : void 0);
          }, [currentWeekIndex]);
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "border-b border-gray-200 dark:border-gray-700",
            children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              ref: swiperRef,
              slidesPerView: 1,
              spaceBetween: 0,
              allowTouchMove: true,
              longSwipesRatio: 0.1,
              longSwipesMs: 300,
              onSlideChange: handleSetCurrentStep,
              onSlideChangeTransitionEnd: handleSlideChangeTransitionEnd,
              currentStep,
              children: weeks.map((week, weekIndex) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between px-2 py-3",
                  children: week.map(date => /* @__PURE__ */jsxRuntimeExports.jsx(DayButton, {
                    date,
                    selectedDate,
                    daysWithSlots,
                    maxPreparedDate,
                    isMonthView: false,
                    onSelectDate: onSelectDate || (() => {}),
                    getDayLabel
                  }, date.toISOString()))
                })
              }, weekIndex))
            })
          });
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
            return monthsForSwiper.findIndex(month => {
              const monthStr = format(month, "yyyy-MM");
              const currentStr = format(currentMonth, "yyyy-MM");
              return monthStr === currentStr;
            });
          }, [monthsForSwiper, currentMonth]);
          const generateMonthDays = month => {
            const monthStart = startOfMonth(month);
            const monthEnd = endOfMonth(month);
            const calendarStart = startOfWeek(monthStart, {
              weekStartsOn: 1
            });
            const weekContainingMonthEnd = startOfWeek(monthEnd, {
              weekStartsOn: 1
            });
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
          const handleSlideChangeTransitionEnd = reactExports.useCallback(swiper => {
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
          }, [onMonthChange, monthsForSwiper, currentMonth]);
          const handleSetCurrentStep = reactExports.useCallback(swiper => {
            setCurrentStep(swiper.activeIndex);
          }, []);
          reactExports.useEffect(() => {
            setCurrentStep(currentMonthIndex >= 0 ? currentMonthIndex : void 0);
          }, [currentMonthIndex]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "border-b border-gray-200 dark:border-gray-700",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "grid grid-cols-7 px-2 pb-2 pt-3 gap-1",
              children: dayNames.map((dayName, index) => {
                const isSub = dayName === "Sub" || dayName === "Sat";
                const isNed = dayName === "Ned" || dayName === "Sun";
                return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: `text-center text-xs font-bold uppercase ${isSub ? "text-yellow-600 dark:text-yellow-400" : isNed ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`,
                  children: dayName
                }, index);
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
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
              children: monthsForSwiper.map(month => {
                const monthWeeks = generateMonthDays(month);
                return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "px-2 pb-3",
                    children: monthWeeks.map((week, weekIndex) => /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "grid grid-cols-7 gap-1",
                      children: week.map((date, dayIndex) => /* @__PURE__ */jsxRuntimeExports.jsx(DayButton, {
                        date,
                        selectedDate,
                        daysWithSlots,
                        currentMonth: month,
                        maxPreparedDate,
                        isMonthView: true,
                        onSelectDate: onSelectDate || (() => {})
                      }, date.toISOString()))
                    }, weekIndex))
                  })
                }, format(month, "yyyy-MM"));
              })
            })]
          });
        }
        function BookingWeekDays({
          selectedDate: propSelectedDate
        } = {}) {
          const {
            i18n
          } = useTranslation();
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
            const lang = i18n.language?.toLowerCase() ?? "sr";
            const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
            return dayNames[localeKey];
          }, [i18n.language]);
          const getDayLabel = date => {
            const lang = i18n.language?.toLowerCase() ?? "sr";
            const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
            const dayOfWeek = date.getDay();
            const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            return dayNames[localeKey][adjustedDayOfWeek];
          };
          if (isCalendarOpen && currentMonth) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(MonthView, {
              currentMonth,
              selectedDate,
              daysWithSlots,
              maxPreparedDate,
              today,
              onSelectDate: setSelectedDate,
              onMonthChange: handleMonthChange,
              dayNames: monthDayNames
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(WeekView, {
            currentWeek,
            selectedDate,
            daysWithSlots,
            maxPreparedDate,
            today,
            onSelectDate: setSelectedDate,
            onWeekChange: handleWeekChange,
            getDayLabel
          });
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
            try {
              const scrollElement = await contentRefFunctions?.contentRef?.current?.getScrollElement();
              const scrollTop = scrollElement?.scrollTop ?? 0;
              if (scrollTop > 300) {
                contentRefFunctions?.scrollToTop(500);
              }
            } catch (error) {}
          };
          const handleTouchStart = reactExports.useCallback(() => {
            isManualSwipeRef.current = true;
          }, []);
          const handleSlideChange = swiper => {
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
          const handleSlideChangeTransitionEnd = swiper => {
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
          const handleSlideChangeTransitionStart = async swiper => {
            scrollToTopIfNeeded();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
            ref: swiperRef,
            spaceBetween: 16,
            navigation: true,
            onTouchStart: handleTouchStart,
            onSlideChange: handleSlideChange,
            onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
            onSlideChangeTransitionEnd: handleSlideChangeTransitionEnd,
            currentStep: activeSlideIndex >= 0 && activeSlideIndex < slides.length ? activeSlideIndex : void 0,
            ...swiperOptions,
            children: slides.map((slide, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
              children: children(slide)
            }, slide.date ? `${slide.date}-${slide.type}` : `${slide.type}-${index}`))
          });
        }
      }
    };
  });
})();
