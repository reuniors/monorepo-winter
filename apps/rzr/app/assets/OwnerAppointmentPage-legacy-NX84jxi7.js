;
(function () {
  System.register(['./vendor_react-legacy-B8lcDdWC.js', './vendor_ionic-legacy-DHCFIBri.js', './App-legacy-CdiC__0s.js', './workingShift.fe-services-legacy-B3rceh30.js', './reservation.services-legacy-C2sYYC1l.js', './BookingWeekDays-legacy-BAeRiMb2.js', './appointment.constants-legacy-DGLfwUGc.js', './reservation.helpers-legacy-BDNPjUsI.js', './useQueryParamsHook-legacy-BdCxHN2z.js', './vendor_leaflet-legacy-CM2JtPiy.js', './index-legacy-CTRrzI45.js', './vendor_firebase-legacy-wVCteeen.js'], function (exports, module) {
    'use strict';

    var parseISO, parse, addMinutes, isWithinInterval, differenceInMinutes, format, formatInTimeZone, reactExports, jsxRuntimeExports, SwiperSlide, startOfMonth, subMonths, addMonths, addDays, useTranslation, React, startOfDay, toZonedTime, endOfMonth, startOfWeek, useIonRouter, IonSpinner, IonIcon, cashOutline, chevronDownOutline, chevronUpOutline, useContentRefFunctions, SwiperWrapper, useGetFeWorkersQuery, activeLocation, urlPrefix, getAppTimezone, fromUtcHM, getUtcDateFormattedInTz, parseUtcDate, SceletonLoader, useGetFeServiceCategoriesQuery, useGetFeWorkerWorkingShiftsByDaysQuery, useGetFeLocationReservationsQuery, generateWeek, isToday, BookingCalendarHeader, BookingWeekDays, AppointmentStatus, getReservationUrlWithSlot, useQueryParamsHook;
    return {
      setters: [module => {
        parseISO = module.av;
        parse = module.bb;
        addMinutes = module.aQ;
        isWithinInterval = module.bc;
        differenceInMinutes = module.bd;
        format = module.ay;
        formatInTimeZone = module.aw;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.af;
        startOfMonth = module.aR;
        subMonths = module.aX;
        addMonths = module.aY;
        addDays = module.aU;
        useTranslation = module.aD;
        React = module.R;
        startOfDay = module.aV;
        toZonedTime = module.ax;
        endOfMonth = module.aT;
        startOfWeek = module.aS;
      }, module => {
        useIonRouter = module.aj;
        IonSpinner = module.n;
        IonIcon = module.l;
        cashOutline = module.bg;
        chevronDownOutline = module.bi;
        chevronUpOutline = module.bj;
      }, module => {
        useContentRefFunctions = module.p;
        SwiperWrapper = module.S;
        useGetFeWorkersQuery = module.j;
        activeLocation = module.k;
        urlPrefix = module.f;
        getAppTimezone = module.n;
        fromUtcHM = module.o;
        getUtcDateFormattedInTz = module.a6;
        parseUtcDate = module.a7;
        SceletonLoader = module.l;
        useGetFeServiceCategoriesQuery = module.y;
      }, module => {
        useGetFeWorkerWorkingShiftsByDaysQuery = module.d;
      }, module => {
        useGetFeLocationReservationsQuery = module.e;
      }, module => {
        generateWeek = module.g;
        isToday = module.i;
        BookingCalendarHeader = module.B;
        BookingWeekDays = module.b;
      }, module => {
        AppointmentStatus = module.a;
      }, module => {
        getReservationUrlWithSlot = module.a;
      }, module => {
        useQueryParamsHook = module.u;
      }, null, null, null],
      execute: function () {
        exports("default", OwnerAppointmentPage);
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
                  const pauseDuration = differenceInMinutes(pauseEndTime, pauseStartTime);
                  slotDuration[prefixedSlot] = pauseDuration;
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
            try {
              const scrollElement = await contentRefFunctions?.contentRef?.current?.getScrollElement();
              const scrollTop = scrollElement?.scrollTop ?? 0;
              if (scrollTop > 300) {
                contentRefFunctions?.scrollToTop(500);
              }
            } catch (error) {}
          };
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
          const handleSlideChangeTransitionStart = async swiper => {
            scrollToTopIfNeeded();
          };
          reactExports.useEffect(() => {
            if (!swiperRef.current?.swiper) return;
            if (activeSlideIndex < 0 || activeSlideIndex >= slides.length) return;
            setTimeout(() => {
              if (swiperRef.current?.swiper) {
                const currentIndex = swiperRef.current.swiper.activeIndex;
                if (currentIndex !== activeSlideIndex) {
                  swiperRef.current.swiper.slideTo(activeSlideIndex, 0);
                }
              }
            }, 50);
          }, [activeSlideIndex, slides.length, currentWeek, currentMonth]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
            ref: swiperRef,
            spaceBetween: 16,
            navigation: true,
            onSlideChange: handleSlideChange,
            onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
            children: slides.map((slide, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
              children: children(slide)
            }, slide.date || slide.type || index))
          });
        }
        function ReservationItem({
          reservation,
          heightStyle
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: workersResult,
            isLoading: workersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const {
            push
          } = useIonRouter();
          const worker = reactExports.useMemo(() => workersResult?.data?.find(worker2 => worker2.id === reservation.locationWorkerId), [workersResult, reservation.locationWorkerId]);
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
            push(`${urlPrefix}/r/${reservation.hash}`);
          };
          const classPromo = reservation.discount ? "border-x-8 border-r-yellow-600" : "";
          reservation.discount ? "rose-800" : "white";
          if (workersLoading || !worker) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
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
          const discountPercentage = Math.round(reservation.discount / (reservation.servicesCost + reservation.discount) * 100);
          const itemPadding = reservation.servicesDuration >= 45 ? "py-2" : "py-0";
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: `border-l-4 py-1 px-2 cursor-pointer transition-all duration-200 hover:shadow-md bg-gray-900 ${statusInfo.borderColor} ${classPromo} w-full`,
            onClick: handleReservationClick,
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: `flex items-center justify-between ${itemPadding}`,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex-1",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center space-x-2 mb-0.5",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("h4", {
                    className: "font-semibold text-white text-sm",
                    children: reservation.client?.fullName || t("Nepoznati klijent")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center space-x-3 text-xs",
                  children: [statusInfo.text && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                    className: `text-sm font-medium ${statusInfo.color}`,
                    children: statusInfo.text
                  }), reservation.servicesDuration && /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                    className: "text-gray-300",
                    children: [reservation.servicesDuration, "min"]
                  }), reservation.servicesCost && /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                    className: `font-semibold ${reservation.discount ? "text-white" : "text-white"}`,
                    children: [reservation.servicesCost, " RSD"]
                  }), reservation.discount && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex items-center space-x-1",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: cashOutline,
                      className: "text-gray-400 text-xs"
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                      className: "text-xs text-gray-400 font-medium",
                      children: [discountPercentage, "%"]
                    })]
                  })]
                })]
              })
            })
          });
        }
        const ReservationItem$1 = reactExports.memo(ReservationItem);
        function TableOfReservationList({
          selectedWorker,
          reservationByDate,
          timeSlots,
          selectedDateIndex
        }) {
          const {
            t
          } = useTranslation();
          const {
            push
          } = useIonRouter();
          const [currentTime, setCurrentTime] = reactExports.useState(/* @__PURE__ */new Date());
          reactExports.useEffect(() => {
            const interval = setInterval(() => {
              setCurrentTime(/* @__PURE__ */new Date());
            }, 60 * 1e3);
            return () => clearInterval(interval);
          }, []);
          const selectedDate = timeSlots?.[selectedDateIndex]?.date;
          const selectedDateFormatted = selectedDate ? format(selectedDate, "yyyy-MM-dd") : void 0;
          const currentTimeUtc = formatInTimeZone(currentTime, "UTC", "HH:mm");
          const handleSlotClick = timeSlotInfo => {
            if (timeSlotInfo.isPause) return;
            const reservationUrl = getReservationUrlWithSlot(selectedWorker.id, timeSlotInfo.time, selectedDateFormatted || "");
            push(reservationUrl);
          };
          const selectedWorkerReservationsBySlot = reactExports.useMemo(() => {
            if (!selectedDateFormatted || !reservationByDate?.[selectedDateFormatted]) {
              return void 0;
            }
            return reservationByDate[selectedDateFormatted].reduce((acc, reservation) => {
              const parsedDate = parseISO(reservation.dateUtc);
              const slotStartUtc = formatInTimeZone(parsedDate, "UTC", "HH:mm");
              acc[slotStartUtc] = reservation;
              return acc;
            }, {});
          }, [reservationByDate, selectedDateFormatted, selectedWorker.id]);
          const getStyleFromReservation = (timeSlot, addHeight = 0) => {
            const actualTime = timeSlot.startsWith("-") ? timeSlot.substring(1) : timeSlot;
            const height = selectedWorkerReservationsBySlot?.[actualTime]?.servicesDuration ?? 30;
            return {
              height: `${(height > 30 ? height : 30) + addHeight}px`
            };
          };
          const selectedDateSlots = reactExports.useMemo(() => {
            if (!timeSlots || selectedDateIndex === void 0) {
              return void 0;
            }
            return timeSlots?.[selectedDateIndex]?.slots;
          }, [timeSlots, selectedDateIndex]);
          if (!selectedDateSlots || selectedDateSlots.length === 0) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex flex-col items-center justify-center py-12 px-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "text-center",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-6xl mb-4",
                  children: "📅"
                }), /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                  className: "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2",
                  children: t("Nema termina za ovaj dan")
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "text-gray-600 dark:text-gray-400 text-sm",
                  children: t("Nema zakazanih termina za odabrani dan")
                })]
              })
            });
          }
          const isToday = selectedDateFormatted === formatInTimeZone(currentTime, getAppTimezone(), "yyyy-MM-dd");
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "min-h-screen",
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "w-full px-2",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "overflow-hidden",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "divide-y divide-gray-200 dark:divide-gray-700 relative",
                  children: selectedDateSlots.map((timeSlotInfo, index) => {
                    const isPreviousDay = timeSlotInfo.time.startsWith("-");
                    const actualTime = isPreviousDay ? timeSlotInfo.time.substring(1) : timeSlotInfo.time;
                    const displayTime = fromUtcHM(actualTime);
                    const reservation = selectedWorkerReservationsBySlot?.[actualTime];
                    const [hours, minutes] = actualTime.split(":").map(Number);
                    const slotStartMinutes = hours * 60 + minutes;
                    const [currentHours, currentMins] = currentTimeUtc.split(":").map(Number);
                    const currentMinutesFromMidnight = currentHours * 60 + currentMins;
                    const nextSlot = selectedDateSlots[index + 1];
                    const nextSlotTime = nextSlot?.time.replace("-", "");
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
                    return /* @__PURE__ */jsxRuntimeExports.jsxs(React.Fragment, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        className: `py-2 transition-colors duration-200 relative ${timeSlotInfo.isPause ? "bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-500" : reservation ? "hover:bg-gray-50 dark:hover:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"}`,
                        onClick: () => !timeSlotInfo.isPause && !reservation && handleSlotClick(timeSlotInfo),
                        children: [isWithinSlot && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          id: "current-time-indicator",
                          className: "absolute left-0 right-0 flex items-center z-10",
                          style: {
                            top: `${slotProgressPercent}%`
                          },
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "w-3 h-3 bg-red-500 rounded-full ml-2"
                          }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "flex-1 h-0.5 bg-red-500"
                          }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "text-red-500 text-xs font-medium mr-2",
                            children: fromUtcHM(currentTimeUtc)
                          })]
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                          className: "flex items-center justify-between px-2",
                          children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                            className: "flex items-center space-x-4 w-full",
                            children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                              className: `w-16 text-center ${timeSlotInfo.isPause ? "text-gray-900 dark:text-white" : "text-gray-900 dark:text-white"}`,
                              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-2xl font-bold",
                                children: displayTime
                              })
                            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                              className: "flex-1 w-full",
                              children: timeSlotInfo.isPause ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                  className: "w-2 h-2 bg-gray-900 dark:bg-white rounded-full"
                                }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                                  className: "text-gray-900 dark:text-white font-medium",
                                  children: t("Pauza")
                                })]
                              }) : reservation ? /* @__PURE__ */jsxRuntimeExports.jsx(ReservationItem$1, {
                                reservation,
                                heightStyle: getStyleFromReservation(actualTime)
                              }) : /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-gray-600 dark:text-gray-300 text-sm",
                                children: t("Slobodan termin")
                              })
                            })]
                          })
                        })]
                      }), isAfterSlot && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                        className: "relative w-full h-0",
                        children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          id: "current-time-indicator",
                          className: "absolute left-0 right-0 flex items-center z-10",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "w-3 h-3 bg-red-500 rounded-full ml-2"
                          }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "flex-1 h-0.5 bg-red-500"
                          }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                            className: "text-red-500 text-xs font-medium mr-2",
                            children: fromUtcHM(currentTimeUtc)
                          })]
                        })
                      })]
                    }, timeSlotInfo.time);
                  })
                })
              })
            })
          });
        }
        const TableOfReservationList$1 = reactExports.memo(TableOfReservationList);
        const getTodayInAppTimezone = () => {
          return formatInTimeZone(/* @__PURE__ */new Date(), getAppTimezone(), "yyyy-MM-dd");
        };
        function TableOfReservationsV2({
          selectedWorker,
          selectedCategory
        }) {
          const {
            t
          } = useTranslation();
          useContentRefFunctions();
          const timezone = getAppTimezone();
          const today = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
          const [currentWeek, setCurrentWeek] = reactExports.useState(() => generateWeek(today));
          const [selectedDate, setSelectedDate] = reactExports.useState(today);
          const [isCalendarOpen, setIsCalendarOpen] = reactExports.useState(false);
          const [currentMonth, setCurrentMonth] = reactExports.useState(() => startOfMonth(today));
          reactExports.useRef(null);
          const hasAutoSwitchedToMonth = reactExports.useRef(false);
          const {
            data: workersWorkingShiftsByDaysResult,
            isFetching: isWorkersWorkingShiftsFetching
          } = useGetFeWorkerWorkingShiftsByDaysQuery({
            locationSlug: activeLocation,
            workerId: selectedWorker.id
          });
          const {
            data: locationReservations,
            isLoading: isReservationsLoading
          } = useGetFeLocationReservationsQuery({
            locationSlug: activeLocation,
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
              } = parseUtcDate(shift.dateUtc, getAppTimezone());
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
          }, [workersWorkingShiftsByDaysResult?.data, selectedWorker, reservationByDate]);
          const daysWithSlots = reactExports.useMemo(() => {
            const daysSet = /* @__PURE__ */new Set();
            timeSlots?.forEach(slot => {
              daysSet.add(slot.dateFormatted);
            });
            return daysSet;
          }, [timeSlots]);
          const selectedDateIndex = reactExports.useMemo(() => {
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
              const canGoPreviousMonth2 = currentMonthStart > todayMonth;
              if (!monthHasSlots) {
                if (canGoPreviousMonth2) {
                  slidesList.push({
                    type: "prev-month"
                  });
                }
                slidesList.push({
                  type: "empty-week"
                });
                slidesList.push({
                  type: "next-month"
                });
              } else {
                const calendarStart = startOfWeek(monthStart, {
                  weekStartsOn: 1
                });
                const weekContainingMonthEnd = startOfWeek(monthEnd, {
                  weekStartsOn: 1
                });
                const calendarEnd = addDays(weekContainingMonthEnd, 6);
                const daysInMonthWithSlots = timeSlots?.filter(slot => {
                  const slotDate = slot.date;
                  return slotDate >= calendarStart && slotDate <= calendarEnd;
                }) || [];
                if (canGoPreviousMonth2) {
                  slidesList.push({
                    type: "prev-month"
                  });
                }
                daysInMonthWithSlots.forEach(slot => {
                  slidesList.push({
                    type: "day",
                    date: slot.dateFormatted,
                    dateObj: slot.date
                  });
                });
                slidesList.push({
                  type: "next-month"
                });
              }
            } else {
              const weekDateStrs = currentWeek.map(d => format(d, "yyyy-MM-dd"));
              const daysInWeekWithSlots = timeSlots?.filter(slot => weekDateStrs.includes(slot.dateFormatted)) || [];
              if (!isFirstWeek) {
                slidesList.push({
                  type: "prev-week"
                });
              }
              if (daysInWeekWithSlots.length > 0) {
                daysInWeekWithSlots.forEach(slot => {
                  slidesList.push({
                    type: "day",
                    date: slot.dateFormatted,
                    dateObj: slot.date
                  });
                });
              } else {
                slidesList.push({
                  type: "empty-week"
                });
              }
              slidesList.push({
                type: "next-week"
              });
            }
            return slidesList;
          }, [timeSlots, currentWeek, isFirstWeek, isCalendarOpen, currentMonth, monthHasSlots, today]);
          const hasWeekSlots = reactExports.useMemo(() => {
            const weekDateStrs = currentWeek.map(d => format(d, "yyyy-MM-dd"));
            const daysInWeekWithSlots = timeSlots?.filter(slot => weekDateStrs.includes(slot.dateFormatted));
            return (daysInWeekWithSlots?.length ?? 0) > 0;
          }, [timeSlots, currentWeek]);
          reactExports.useEffect(() => {
            hasAutoSwitchedToMonth.current = false;
          }, [selectedWorker, selectedCategory]);
          reactExports.useEffect(() => {
            if (!isCalendarOpen && isFirstWeek && timeSlots && timeSlots.length > 0 && !hasWeekSlots && !hasAutoSwitchedToMonth.current) {
              hasAutoSwitchedToMonth.current = true;
              setIsCalendarOpen(true);
              setCurrentMonth(startOfMonth(selectedDate));
            }
          }, [isCalendarOpen, isFirstWeek, timeSlots, hasWeekSlots, selectedDate]);
          const activeSlideIndex = reactExports.useMemo(() => {
            const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
            if (isCalendarOpen && currentMonth) {
              if (!monthHasSlots) {
                const emptyIndex = slides.findIndex(slide => slide.type === "empty-week");
                return emptyIndex >= 0 ? emptyIndex : 0;
              }
              const selectedDateHasSlots = timeSlots?.some(slot => slot.dateFormatted === selectedDateStr);
              if (selectedDateHasSlots) {
                const dayIndex = slides.findIndex(slide => slide.type === "day" && slide.date === selectedDateStr);
                if (dayIndex >= 0) {
                  return dayIndex;
                }
              }
              const firstDayWithSlotsIndex = slides.findIndex(slide => slide.type === "day");
              return firstDayWithSlotsIndex >= 0 ? firstDayWithSlotsIndex : 0;
            } else {
              const dayIndex = slides.findIndex(slide => slide.type === "day" && slide.date === selectedDateStr);
              if (dayIndex >= 0) {
                return dayIndex;
              }
              if (slides.length === 0) return 0;
              return isFirstWeek ? 0 : 1;
            }
          }, [slides, selectedDate, isFirstWeek, isCalendarOpen, currentMonth, monthHasSlots, timeSlots]);
          const handleWeekChange = newWeek => {
            setCurrentWeek(newWeek);
            const weekDateStrs = newWeek.map(d => format(d, "yyyy-MM-dd"));
            const firstDayWithSlots = timeSlots?.find(slot => weekDateStrs.includes(slot.dateFormatted));
            if (firstDayWithSlots) {
              setSelectedDate(firstDayWithSlots.date);
            }
          };
          const handleSelectDate = date => {
            const dateStr = format(date, "yyyy-MM-dd");
            if (daysWithSlots.has(dateStr)) {
              setSelectedDate(date);
              if (isCalendarOpen) {
                const weekDateStrs = currentWeek.map(d => format(d, "yyyy-MM-dd"));
                const isDateInCurrentWeek = weekDateStrs.includes(dateStr);
                if (!isDateInCurrentWeek) {
                  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const selectedDateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                  const daysDiff = Math.floor((selectedDateStart.getTime() - todayStart.getTime()) / (1e3 * 60 * 60 * 24));
                  const weekNumber = Math.floor(daysDiff / 7);
                  const weekStart = addDays(todayStart, weekNumber * 7);
                  setCurrentWeek(generateWeek(weekStart));
                }
              }
            }
          };
          const toggleCalendar = reactExports.useCallback(() => {
            setIsCalendarOpen(prev => {
              const newValue = !prev;
              if (newValue) {
                const newMonth = startOfMonth(selectedDate);
                setCurrentMonth(newMonth);
              } else {
                const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const selectedDateStart = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
                const daysDiff = Math.floor((selectedDateStart.getTime() - todayStart.getTime()) / (1e3 * 60 * 60 * 24));
                const weekNumber = Math.floor(daysDiff / 7);
                const weekStart = addDays(todayStart, weekNumber * 7);
                setCurrentWeek(generateWeek(weekStart));
              }
              return newValue;
            });
          }, [selectedDate, today]);
          const handleMonthChange = reactExports.useCallback(month => {
            setCurrentMonth(startOfMonth(month));
          }, []);
          const canGoPreviousWeek = reactExports.useMemo(() => {
            const firstDayOfWeek = currentWeek[0];
            const todayInTz = startOfDay(toZonedTime(/* @__PURE__ */new Date(), timezone));
            const weekStartInTz = startOfDay(toZonedTime(firstDayOfWeek, timezone));
            return weekStartInTz > todayInTz;
          }, [currentWeek, timezone]);
          const canGoNextWeek = true;
          const canGoPreviousMonth = reactExports.useMemo(() => {
            const todayMonth = startOfMonth(today);
            const currentMonthStart = startOfMonth(currentMonth);
            return currentMonthStart > todayMonth;
          }, [currentMonth, today]);
          const canGoNextMonth = true;
          const canGoPrevious = reactExports.useMemo(() => {
            return isCalendarOpen ? canGoPreviousMonth : canGoPreviousWeek;
          }, [isCalendarOpen, canGoPreviousMonth, canGoPreviousWeek]);
          const canGoNext = reactExports.useMemo(() => {
            return isCalendarOpen ? canGoNextMonth : canGoNextWeek;
          }, [isCalendarOpen, canGoNextMonth, canGoNextWeek]);
          const goToPreviousWeek = reactExports.useCallback(() => {
            if (!canGoPreviousWeek) return;
            const newStartDate = addDays(currentWeek[0], -7);
            const newWeek = generateWeek(newStartDate);
            handleWeekChange(newWeek);
          }, [currentWeek, canGoPreviousWeek, handleWeekChange]);
          const goToNextWeek = reactExports.useCallback(() => {
            const newStartDate = addDays(currentWeek[0], 7);
            const newWeek = generateWeek(newStartDate);
            handleWeekChange(newWeek);
          }, [currentWeek, canGoNextWeek, handleWeekChange]);
          const goToPreviousMonth = reactExports.useCallback(() => {
            if (!canGoPreviousMonth) return;
            setCurrentMonth(prev => startOfMonth(subMonths(prev)));
          }, [canGoPreviousMonth]);
          const goToNextMonth = reactExports.useCallback(() => {
            setCurrentMonth(prev => startOfMonth(addMonths(prev, 1)));
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
              const today2 = getTodayInAppTimezone();
              const todaySlide = timeSlots.find(slot => slot.dateFormatted === today2);
              if (todaySlide && selectedDateIndex === 0) {
                setTimeout(() => {
                  scrollToCurrentTime();
                }, 200);
              }
            }
          }, [timeSlots, selectedDateIndex]);
          reactExports.useEffect(() => {
            setCurrentWeek(generateWeek(today));
            setSelectedDate(today);
          }, [selectedWorker.id]);
          reactExports.useEffect(() => {
            if (!timeSlots || timeSlots.length === 0 || !daysWithSlots.size) return;
            const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
            const hasSlots = daysWithSlots.has(selectedDateStr);
            if (!hasSlots) {
              const todayStr = getTodayInAppTimezone();
              const todayHasSlots = daysWithSlots.has(todayStr);
              if (todayHasSlots) {
                const todaySlot = timeSlots.find(slot => slot.dateFormatted === todayStr);
                if (todaySlot) {
                  setSelectedDate(todaySlot.date);
                  return;
                }
              }
              const firstDayWithSlots = timeSlots.find(slot => daysWithSlots.has(slot.dateFormatted));
              if (firstDayWithSlots) {
                setSelectedDate(firstDayWithSlots.date);
              }
            }
          }, [timeSlots, daysWithSlots, selectedDate]);
          if (isWorkersWorkingShiftsFetching || isReservationsLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (!timeSlots || timeSlots.length === 0) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex items-center justify-center py-12 px-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "text-center",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-6xl mb-4",
                  children: "📅"
                }), /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                  className: "text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2",
                  children: t("Nema aktivnih termina")
                })]
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(BookingCalendarHeader, {
              currentWeek,
              currentMonth,
              selectedDate,
              isCalendarOpen,
              isLoadingSlots: isWorkersWorkingShiftsFetching,
              onToggleCalendar: toggleCalendar,
              onPreviousWeek: handleGoToPrevious,
              onNextWeek: handleGoToNext,
              canGoPrevious,
              canGoNext
            }), /* @__PURE__ */jsxRuntimeExports.jsx(BookingWeekDays, {
              currentWeek,
              selectedDate,
              onSelectDate: handleSelectDate,
              daysWithSlots,
              maxPreparedDate: void 0,
              onWeekChange: handleWeekChange,
              isMonthView: isCalendarOpen,
              currentMonth,
              onMonthChange: handleMonthChange
            }), !isCalendarOpen && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center pb-1",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("button", {
                onClick: toggleCalendar,
                className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                "aria-label": "Prikaži mesec",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: chevronDownOutline,
                  className: "w-4 h-4 mr-1"
                }), "Mesec"]
              })
            }), isCalendarOpen && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center pb-1",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("button", {
                onClick: toggleCalendar,
                className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                "aria-label": "Prikaži nedelju",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: chevronUpOutline,
                  className: "w-4 h-4 mr-1"
                }), "Nedelja"]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "pb-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(WeekSwiperWrapper, {
                currentWeek,
                onWeekChange: handleWeekChange,
                onDateChange: handleSelectDate,
                onMonthChange: handleMonthChange,
                currentMonth,
                isCalendarOpen,
                isFirstWeek,
                slides,
                activeSlideIndex,
                children: slide => {
                  if (slide.type === "prev-week" || slide.type === "prev-month") {
                    return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "flex items-center justify-center py-16 min-h-[320px]",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                        className: "text-gray-400 dark:text-gray-500 text-sm",
                        children: slide.type === "prev-month" ? "Prethodni mesec..." : "Prethodna nedelja..."
                      })
                    });
                  }
                  if (slide.type === "next-week" || slide.type === "next-month") {
                    return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "flex items-center justify-center py-16 min-h-[320px]",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                        className: "text-gray-400 dark:text-gray-500 text-sm",
                        children: slide.type === "next-month" ? "Sledeći mesec..." : "Sledeća nedelja..."
                      })
                    });
                  }
                  if (slide.type === "empty-week") {
                    return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "flex items-center justify-center py-16 min-h-[320px]",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        className: "text-center space-y-2",
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                          className: "text-6xl mb-2",
                          children: "📅"
                        }), /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                          className: "text-lg font-semibold text-gray-700 dark:text-gray-300",
                          children: t("Nema termina za ovu nedelju")
                        }), firstAvailableDate && /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                          className: "text-sm text-gray-500 dark:text-gray-400",
                          children: [t("Prvi slobodan datum"), ":", " ", format(firstAvailableDate.date, "dd.MM.yyyy")]
                        })]
                      })
                    });
                  }
                  if (slide.type === "day" && slide.date) {
                    const dayIndex = timeSlots?.findIndex(slot => slot.dateFormatted === slide.date);
                    if (dayIndex === void 0 || dayIndex < 0) return null;
                    return /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservationList$1, {
                      reservationByDate,
                      selectedWorker,
                      timeSlots,
                      selectedDateIndex: dayIndex
                    });
                  }
                  return null;
                }
              })
            })]
          });
        }
        function OwnerAppointmentPage({
          selectedWorker
        }) {
          const {
            data: queryParams
          } = useQueryParamsHook({});
          const categoryId = queryParams["category"] ? parseInt(queryParams["category"]) : void 0;
          const {
            data: categoriesResult
          } = useGetFeServiceCategoriesQuery({
            locationSlug: activeLocation,
            active: true
          }, {
            skip: !categoryId
          });
          const selectedCategory = categoriesResult?.data?.find(cat => cat.id === categoryId);
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: selectedWorker && /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservationsV2, {
              selectedWorker,
              selectedCategory
            })
          });
        }
      }
    };
  });
})();
