;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './App-legacy-BZWqGSgH.js', './appointment.constants-legacy-DGLfwUGc.js', './reservation.helpers-legacy-BDNPjUsI.js', './vendor_leaflet-legacy-BBJO0vvi.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, format, formatInTimeZone, parseISO, React, SwiperSlide, useIonRouter, IonSpinner, IonIcon, cashOutline, IonItem, IonHeader, IonToolbar, IonButtons, IonButton, chevronBackOutline, IonTitle, chevronForwardOutline, useGetFeWorkersQuery, activeLocation, urlPrefix, getAppTimezone, fromUtcHM, useContentRefFunctions, useGetFeWorkerWorkingShiftsByDaysQuery, useGetFeLocationReservationsQuery, getUtcDateFormattedInTz, parseUtcDate, getTimeSlotsForTable, SceletonLoader, SwiperWrapper, AppointmentStatus, getReservationUrlWithSlot;
    return {
      setters: [module => {
        reactExports = module.e;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        format = module.ay;
        formatInTimeZone = module.aw;
        parseISO = module.av;
        React = module.R;
        SwiperSlide = module.af;
      }, module => {
        useIonRouter = module.aj;
        IonSpinner = module.n;
        IonIcon = module.l;
        cashOutline = module.aY;
        IonItem = module.q;
        IonHeader = module.h;
        IonToolbar = module.i;
        IonButtons = module.k;
        IonButton = module.d;
        chevronBackOutline = module.ar;
        IonTitle = module.j;
        chevronForwardOutline = module.$;
      }, module => {
        useGetFeWorkersQuery = module.x;
        activeLocation = module.h;
        urlPrefix = module.f;
        getAppTimezone = module.a7;
        fromUtcHM = module.w;
        useContentRefFunctions = module.a9;
        useGetFeWorkerWorkingShiftsByDaysQuery = module.aa;
        useGetFeLocationReservationsQuery = module.ab;
        getUtcDateFormattedInTz = module.a8;
        parseUtcDate = module.ac;
        getTimeSlotsForTable = module.ad;
        SceletonLoader = module.S;
        SwiperWrapper = module.l;
      }, module => {
        AppointmentStatus = module.a;
      }, module => {
        getReservationUrlWithSlot = module.a;
      }, null, null, null],
      execute: function () {
        exports("default", OwnerAppointmentPage);
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
          const itemPadding = reservation.servicesDuration >= 45 ? "py-8" : "py-0";
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: `border-l-4 py-3 px-2 cursor-pointer transition-all duration-200 hover:shadow-md bg-gray-900 ${statusInfo.borderColor} ${classPromo} w-full`,
            onClick: handleReservationClick,
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: `flex items-center justify-between ${itemPadding}`,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex-1",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center space-x-2 mb-1",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("h4", {
                    className: "font-semibold text-white",
                    children: reservation.client?.fullName || t("Nepoznati klijent")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center space-x-3 text-sm",
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
                  className: "text-xl font-semibold text-gray-300 mb-2",
                  children: t("Nema termina za ovaj dan")
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "text-gray-400 text-sm",
                  children: t("Nema zakazanih termina za odabrani dan")
                })]
              })
            });
          }
          const isToday = selectedDateFormatted === formatInTimeZone(currentTime, getAppTimezone(), "yyyy-MM-dd");
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "bg-black min-h-screen",
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "w-full px-2",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "bg-gray-900 overflow-hidden",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "divide-y divide-gray-800 relative",
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
                        className: `py-4 transition-colors duration-200 relative ${timeSlotInfo.isPause ? "bg-gray-700 border-l-4 border-gray-500" : reservation ? "hover:bg-gray-800" : "hover:bg-gray-800 cursor-pointer"}`,
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
                              className: `w-16 text-center ${timeSlotInfo.isPause ? "text-white" : "text-white"}`,
                              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-2xl font-bold",
                                children: displayTime
                              })
                            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                              className: "flex-1 w-full",
                              children: timeSlotInfo.isPause ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                                className: "flex items-center space-x-2",
                                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                  className: "w-2 h-2 bg-white rounded-full"
                                }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                                  className: "text-white font-medium",
                                  children: t("Pauza")
                                })]
                              }) : reservation ? /* @__PURE__ */jsxRuntimeExports.jsx(ReservationItem$1, {
                                reservation,
                                heightStyle: getStyleFromReservation(actualTime)
                              }) : /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-gray-300 text-sm",
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
        function TableOfReservations({
          selectedWorker
        }) {
          const {
            t
          } = useTranslation();
          const [selectedDateIndex, setSelectedDateIndex] = React.useState(0);
          const [showTimezoneWarning, setShowTimezoneWarning] = React.useState(false);
          const contentRefFunctions = useContentRefFunctions();
          const isCompatible = true;
          React.useEffect(() => {}, [isCompatible]);
          const {
            data: workersWorkingShiftsByDaysResult,
            isFetching: isWorkersWorkingShiftsFetching
          } = useGetFeWorkerWorkingShiftsByDaysQuery({
            locationSlug: activeLocation,
            workerId: selectedWorker.id
          });
          const swiperRef = reactExports.useRef(null);
          const {
            data: locationReservations,
            isLoading: isReservationsLoading
          } = useGetFeLocationReservationsQuery({
            locationSlug: activeLocation,
            locationWorkerId: selectedWorker.id,
            withClient: 1
          });
          const reservationByDate = reactExports.useMemo(() =>
          // transform reservations to object with date as key
          locationReservations?.data.reduce((acc, reservation) => {
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
          const selectedDate = timeSlots?.[selectedDateIndex]?.date;
          const selectedDateFormattedAdvanced = selectedDate ? t(`weeks.${format(selectedDate, "EEEE")}`) + ", " + format(selectedDate, "dd.MM") : void 0;
          const handleNextDate = () => {
            if (selectedDateIndex === (timeSlots?.length ?? 0) - 1) {
              return;
            }
            setSelectedDateIndex(prev => prev + 1);
          };
          const handlePrevDate = () => {
            if (selectedDateIndex === 0) {
              return;
            }
            setSelectedDateIndex(prev => prev - 1);
          };
          reactExports.useEffect(() => {
            setSelectedDateIndex(0);
          }, [selectedWorker]);
          const scrollToCurrentTime = (retryCount = 0) => {
            const redLineElement = document.getElementById("current-time-indicator");
            if (redLineElement) {
              redLineElement.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            } else if (retryCount < 5) {
              setTimeout(() => scrollToCurrentTime(retryCount + 1), 400);
            } else {
              console.log("Element not found after 5 retries");
            }
          };
          reactExports.useEffect(() => {
            if (timeSlots && timeSlots.length > 0) {
              const today = getTodayInAppTimezone();
              const todaySlide = timeSlots.find(slot => slot.dateFormatted === today);
              if (todaySlide && selectedDateIndex === 0) {
                setTimeout(() => {
                  scrollToCurrentTime();
                }, 200);
              }
            }
          }, [timeSlots]);
          const handleSlideChange = async swiper => {
            setSelectedDateIndex(swiper.activeIndex);
          };
          const handleSlideChangeTransitionStart = async swiper => {
            const currentSlideIndex = swiper.activeIndex;
            const currentSlide = timeSlots?.[currentSlideIndex];
            const today = getTodayInAppTimezone();
            const isToday = currentSlide?.dateFormatted === today;
            if (isToday) {
              setTimeout(() => {
                scrollToCurrentTime();
              }, 600);
            } else {
              const scrollElement = await contentRefFunctions?.contentRef?.current?.getScrollElement();
              const scrollTop = scrollElement?.scrollTop ?? 0;
              if (scrollTop > 300) {
                contentRefFunctions?.scrollToTop(500);
              }
            }
          };
          if (isWorkersWorkingShiftsFetching || isReservationsLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          if (!selectedDateFormattedAdvanced) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: t("Nema aktivnih termina")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                color: "light",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "start",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handlePrevDate,
                    disabled: selectedDateIndex === 0,
                    fill: "clear",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: chevronBackOutline
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "text-center",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-lg font-bold",
                      children: selectedDateFormattedAdvanced
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleNextDate,
                    disabled: selectedDateIndex === (timeSlots?.length ?? 0) - 1,
                    fill: "clear",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: chevronForwardOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              virtual: true,
              slidesPerView: 1,
              ref: swiperRef,
              onSlideChange: handleSlideChange,
              currentStep: selectedDateIndex,
              onSlideChangeTransitionStart: handleSlideChangeTransitionStart,
              children: timeSlots?.map((timeSlot, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                virtualIndex: index,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservationList$1, {
                  reservationByDate,
                  selectedWorker,
                  timeSlots,
                  selectedDateIndex: index
                })
              }, timeSlot.dateFormatted))
            })]
          });
        }
        function OwnerAppointmentPage({
          selectedWorker
        }) {
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: selectedWorker && /* @__PURE__ */jsxRuntimeExports.jsx(TableOfReservations, {
              selectedWorker
            })
          });
        }
      }
    };
  });
})();
