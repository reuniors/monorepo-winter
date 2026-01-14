;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './WeekSwiperWrapper-legacy-CJQMxksI.js', './vendor_ionic-legacy-Br2UrGvg.js', './App-legacy-B4qymwvx.js', './appointment.constants-legacy-DGLfwUGc.js', './reservation.helpers-legacy-C8dWbJ-2.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-C5NlRqhK.js', './workingShift.fe-services-legacy-BpGpTKey.js', './reservation.services-legacy-BJ8W3LBC.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, format, reactExports, useTranslation, formatInTimeZone, parseISO, React, startOfMonth, endOfMonth, startOfWeek, addDays, useReservationCalendarContext, BookingCalendarHeader, BookingWeekDays, WeekSwiperWrapper, ReservationCalendarProvider, IonIcon, chevronDownOutline, chevronUpOutline, useIonRouter, IonSpinner, cashOutline, useGetFeWorkersQuery, activeLocation, urlPrefix, getAppTimezone, fromUtcHM, SceletonLoader, useQueryParamsHook, useGetFeServiceCategoriesQuery, AppointmentStatus, getReservationUrlWithSlot;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
        format = module.aC;
        reactExports = module.e;
        useTranslation = module.M;
        formatInTimeZone = module.aA;
        parseISO = module.az;
        React = module.R;
        startOfMonth = module.aP;
        endOfMonth = module.aQ;
        startOfWeek = module.aR;
        addDays = module.aS;
      }, module => {
        useReservationCalendarContext = module.d;
        BookingCalendarHeader = module.a;
        BookingWeekDays = module.b;
        WeekSwiperWrapper = module.W;
        ReservationCalendarProvider = module.R;
      }, module => {
        IonIcon = module.b;
        chevronDownOutline = module.bp;
        chevronUpOutline = module.bq;
        useIonRouter = module.ao;
        IonSpinner = module.o;
        cashOutline = module.bn;
      }, module => {
        useGetFeWorkersQuery = module.q;
        activeLocation = module.n;
        urlPrefix = module.g;
        getAppTimezone = module.v;
        fromUtcHM = module.t;
        SceletonLoader = module.r;
        useQueryParamsHook = module.l;
        useGetFeServiceCategoriesQuery = module.o;
      }, module => {
        AppointmentStatus = module.a;
      }, module => {
        getReservationUrlWithSlot = module.a;
      }, null, null, null, null, null],
      execute: function () {
        exports("default", OwnerAppointmentPage);
        function CalendarModeToggle({
          isCalendarOpen,
          onToggle,
          selectedDate
        }) {
          const formatSelectedDate = date => {
            if (!date) return null;
            return format(date, "dd.MM.yyyy");
          };
          const formattedDate = formatSelectedDate(selectedDate);
          if (!isCalendarOpen) {
            return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "relative flex items-center justify-center pb-1",
              children: [formattedDate && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "absolute left-4 text-xs text-gray-500 dark:text-gray-400",
                children: formattedDate
              }), /* @__PURE__ */jsxRuntimeExports.jsxs("button", {
                onClick: onToggle,
                className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                "aria-label": "Prikaži mesec",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: chevronDownOutline,
                  className: "w-4 h-4 mr-1"
                }), "Mesec"]
              })]
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "relative flex items-center justify-center pb-1",
            children: [formattedDate && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "absolute left-4 text-xs text-gray-500 dark:text-gray-400",
              children: formattedDate
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("button", {
              onClick: onToggle,
              className: "flex items-center px-3 py-1 text-xs text-gray-500 dark:text-gray-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition",
              "aria-label": "Prikaži nedelju",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: chevronUpOutline,
                className: "w-4 h-4 mr-1"
              }), "Nedelja"]
            })]
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
            const isPreviousDay = timeSlotInfo.time.startsWith("-");
            const actualTimeUtc = isPreviousDay ? timeSlotInfo.time.substring(1) : timeSlotInfo.time;
            const timeLocal = fromUtcHM(actualTimeUtc);
            const reservationUrl = getReservationUrlWithSlot(selectedWorker.id, timeLocal,
            // Use local time in URL
            selectedDateFormatted || "");
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
                        className: `py-2 transition-colors duration-200 relative ${reservation ? "hover:bg-gray-50 dark:hover:bg-gray-800" : timeSlotInfo.isPause ? "bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-500" : "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"}`,
                        onClick: () => !reservation && !timeSlotInfo.isPause && handleSlotClick(timeSlotInfo),
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
                              children: reservation ? /* @__PURE__ */jsxRuntimeExports.jsx(ReservationItem$1, {
                                reservation,
                                heightStyle: getStyleFromReservation(actualTime)
                              }) : timeSlotInfo.isPause ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                  className: "w-2 h-2 bg-gray-900 dark:bg-white rounded-full"
                                }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                                  className: "text-gray-900 dark:text-white font-medium",
                                  children: t("Pauza")
                                })]
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
        function ReservationSlideContent({
          slide,
          timeSlots,
          reservationByDate,
          selectedWorker,
          firstAvailableDate
        }) {
          const {
            t
          } = useTranslation();
          const slideTimeSlots = reactExports.useMemo(() => {
            if (!timeSlots || slide.type !== "day" || !slide.date) return [];
            return timeSlots.filter(slot => slot.dateFormatted === slide.date);
          }, [timeSlots, slide]);
          if (slide.type === "prev-week" || slide.type === "prev-month") {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex items-center justify-center py-16 min-h-[320px]",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                name: "crescent"
              })
            });
          }
          if (slide.type === "next-week" || slide.type === "next-month") {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex items-center justify-center py-16 min-h-[320px]",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                name: "crescent"
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
          if (slide.type === "day" && slide.date && slide.dateObj) {
            const dayIndex = slideTimeSlots.findIndex(slot => slot.dateFormatted === slide.date);
            if (dayIndex < 0) return null;
            return /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservationList$1, {
              reservationByDate,
              selectedWorker,
              timeSlots: slideTimeSlots,
              selectedDateIndex: 0
            }, slide.date);
          }
          return null;
        }
        function useReservationSlides({
          isCalendarOpen,
          currentMonth,
          currentWeek,
          timeSlots,
          monthHasSlots,
          isFirstWeek,
          today
        }) {
          return reactExports.useMemo(() => {
            const slidesList = [];
            if (isCalendarOpen && currentMonth) {
              const monthStart = startOfMonth(currentMonth);
              const monthEnd = endOfMonth(currentMonth);
              const todayMonth = startOfMonth(today);
              const currentMonthStart = startOfMonth(currentMonth);
              const canGoPreviousMonth = currentMonthStart > todayMonth;
              if (!monthHasSlots) {
                if (canGoPreviousMonth) {
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
                if (canGoPreviousMonth) {
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
        }
        function useReservationActiveSlideIndex({
          selectedDate,
          slides,
          isCalendarOpen,
          currentMonth,
          monthHasSlots,
          timeSlots,
          isFirstWeek
        }) {
          return reactExports.useMemo(() => {
            const selectedDateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : null;
            if (isCalendarOpen && currentMonth) {
              if (!selectedDateStr) {
                const firstDayIndex = slides.findIndex(slide => slide.type === "day" || slide.type === "empty-week" || slide.type === "empty-month");
                return firstDayIndex >= 0 ? firstDayIndex : 1;
              }
              if (!monthHasSlots) {
                const emptyIndex = slides.findIndex(slide => slide.type === "empty-week" || slide.type === "empty-month");
                return emptyIndex >= 0 ? emptyIndex : 1;
              }
              const selectedDateHasSlots = timeSlots?.some(slot => slot.dateFormatted === selectedDateStr);
              if (selectedDateHasSlots) {
                const dayIndex = slides.findIndex(slide => slide.type === "day" && slide.date === selectedDateStr);
                if (dayIndex >= 0) {
                  return dayIndex;
                }
              }
              const firstDayWithSlotsIndex = slides.findIndex(slide => slide.type === "day");
              return firstDayWithSlotsIndex >= 0 ? firstDayWithSlotsIndex : 1;
            } else {
              if (!selectedDateStr) {
                const firstDayIndex = slides.findIndex(slide => slide.type === "day" || slide.type === "empty-week" || slide.type === "empty-month");
                return firstDayIndex >= 0 ? firstDayIndex : 1;
              }
              const dayIndex = slides.findIndex(slide => slide.type === "day" && slide.date === selectedDateStr);
              if (dayIndex >= 0) {
                return dayIndex;
              }
              const firstContentIndex = slides.findIndex(slide => slide.type === "day" || slide.type === "empty-week" || slide.type === "empty-month");
              return firstContentIndex >= 0 ? firstContentIndex : 1;
            }
          }, [slides, selectedDate, isFirstWeek, isCalendarOpen, currentMonth, monthHasSlots, timeSlots]);
        }
        function TableOfReservationsV2() {
          const {
            t
          } = useTranslation();
          const {
            currentWeek,
            currentMonth,
            selectedDate,
            isCalendarOpen,
            isLoadingSlots,
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
          const slides = useReservationSlides({
            isCalendarOpen,
            currentMonth,
            currentWeek,
            timeSlots,
            monthHasSlots,
            isFirstWeek,
            today
          });
          const activeSlideIndex = useReservationActiveSlideIndex({
            selectedDate,
            slides,
            isCalendarOpen,
            currentMonth,
            monthHasSlots,
            timeSlots,
            isFirstWeek
          });
          const displayDate = reactExports.useMemo(() => {
            if (selectedDate) return selectedDate;
            const activeSlide = slides[activeSlideIndex];
            if (activeSlide?.type === "day" && activeSlide.dateObj) {
              return activeSlide.dateObj;
            }
            return null;
          }, [selectedDate, slides, activeSlideIndex]);
          if (isLoadingSlots) {
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
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(BookingCalendarHeader, {}), /* @__PURE__ */jsxRuntimeExports.jsx(BookingWeekDays, {
              selectedDate: displayDate
            }), /* @__PURE__ */jsxRuntimeExports.jsx(CalendarModeToggle, {
              isCalendarOpen,
              onToggle: toggleCalendar,
              selectedDate: displayDate
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "pb-4 min-h-[400px]",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(WeekSwiperWrapper, {
                currentWeek,
                onWeekChange: handleWeekChange,
                onDateChange: setSelectedDate,
                onMonthChange: handleMonthChange,
                currentMonth,
                isCalendarOpen,
                isFirstWeek,
                slides,
                activeSlideIndex,
                children: slide => /* @__PURE__ */jsxRuntimeExports.jsx(ReservationSlideContent, {
                  slide,
                  timeSlots,
                  reservationByDate,
                  selectedWorker,
                  firstAvailableDate
                })
              }, isCalendarOpen ? `month-${currentMonth?.toISOString()}` : `week-${currentWeek[0].toISOString()}`)
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
            children: selectedWorker && /* @__PURE__ */jsxRuntimeExports.jsx(ReservationCalendarProvider, {
              locationSlug: activeLocation,
              selectedWorker,
              selectedCategory,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservationsV2, {})
            })
          });
        }
      }
    };
  });
})();
