;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './App-legacy-BZWqGSgH.js', './vendor_leaflet-legacy-BBJO0vvi.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, SwiperSlide, V, reactExports, toZonedTime, differenceInCalendarMonths, getMonth, startOfMonth, addDays, endOfMonth, eachDayOfInterval, format, subMonths, addMonths, IonGrid, IonRow, IonCol, IonIcon, closeCircle, checkmarkCircle, IonButton, notificationsOffOutline, trashOutline, timeOutline, IonHeader, IonToolbar, IonTitle, IonButtons, closeOutline, IonContent, IonDatetime, IonList, IonItem, IonFooter, chevronBackOutline, IonSpinner, chevronForwardOutline, ConditionalComponent, SwiperWrapper, IonModalExtended, fromUtcHM, fromUtc, toUtc, useGetFeWorkingShiftsByDaysQuery, activeLocation, useGetWorkingHoursQuery, useSetFeWorkingDayShiftMutation, useDeleteFeWorkingDayShiftMutation, getAppTimezone, getUtcDateFormattedInTz;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.af;
        V = module.ah;
        reactExports = module.e;
        toZonedTime = module.ax;
        differenceInCalendarMonths = module.a$;
        getMonth = module.b0;
        startOfMonth = module.b1;
        addDays = module.aO;
        endOfMonth = module.b2;
        eachDayOfInterval = module.b3;
        format = module.ay;
        subMonths = module.b4;
        addMonths = module.b5;
      }, module => {
        IonGrid = module.A;
        IonRow = module.B;
        IonCol = module.C;
        IonIcon = module.l;
        closeCircle = module.bx;
        checkmarkCircle = module.by;
        IonButton = module.d;
        notificationsOffOutline = module.bz;
        trashOutline = module.O;
        timeOutline = module.ae;
        IonHeader = module.h;
        IonToolbar = module.i;
        IonTitle = module.j;
        IonButtons = module.k;
        closeOutline = module.m;
        IonContent = module.b;
        IonDatetime = module.ab;
        IonList = module.F;
        IonItem = module.q;
        IonFooter = module.o;
        chevronBackOutline = module.ar;
        IonSpinner = module.n;
        chevronForwardOutline = module.$;
      }, module => {
        ConditionalComponent = module.C;
        SwiperWrapper = module.l;
        IonModalExtended = module.y;
        fromUtcHM = module.w;
        fromUtc = module.a1;
        toUtc = module.a2;
        useGetFeWorkingShiftsByDaysQuery = module.a3;
        activeLocation = module.h;
        useGetWorkingHoursQuery = module.a4;
        useSetFeWorkingDayShiftMutation = module.a5;
        useDeleteFeWorkingDayShiftMutation = module.a6;
        getAppTimezone = module.a7;
        getUtcDateFormattedInTz = module.a8;
      }, null, null, null],
      execute: function () {
        exports("default", PrepareWorkingDaysShiftsPage);
        function TimeSlotButtonWithLongPress({
          workingHour,
          dayDateUtc,
          isActive,
          onSelectShift,
          onLongPress,
          formatTime,
          disabled = false
        }) {
          const longPressBind = V(() => {
            if (!disabled) {
              onLongPress(dayDateUtc, workingHour);
            }
          }, {
            threshold: 500
          });
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
            fill: isActive ? "solid" : "outline",
            color: isActive ? "success" : "dark",
            onClick: onSelectShift(dayDateUtc, workingHour.shift, isActive),
            className: "whitespace-nowrap text-nowrap",
            disabled,
            ...longPressBind(),
            children: [formatTime(workingHour.timeFromUtc), " -", " ", formatTime(workingHour.timeToUtc)]
          });
        }
        function WorkingDayItem({
          day,
          workingHours,
          onDeleteShift,
          onSelectShift,
          onOpenOtherModal,
          onLongPressOnTimeSlot,
          getActiveShiftForDay,
          getCustomShift,
          getWorkingHoursForDay,
          isWorkingHourActive,
          formatTime,
          shouldShowRemoveButton,
          isUpdating = false,
          isRequestedDate = false
        }) {
          const {
            t
          } = useTranslation();
          const activeShift = getActiveShiftForDay(day.dateUtc);
          const customShift = getCustomShift?.(day.dateUtc);
          const showDeleteBtn = shouldShowRemoveButton(day);
          const showFullWidthColumn = day.hasWorkingHours || showDeleteBtn;
          const isDisabled = isUpdating && isRequestedDate;
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: `${day.isLastDayOfWeek ? "border-white border-b-4" : ""} border-y border-gray-500 py-1`,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                className: "items-center",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  size: showFullWidthColumn ? "12" : "6",
                  sizeSm: "4",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [activeShift?.shift === null ?
                    // "Ne radim" is selected
                    /* @__PURE__ */
                    jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeCircle,
                      color: "danger",
                      className: "text-xl"
                    }) : activeShift && activeShift.shift !== null ?
                    // Some time is selected (standard or custom)
                    /* @__PURE__ */
                    jsxRuntimeExports.jsx(IonIcon, {
                      icon: checkmarkCircle,
                      color: "success",
                      className: "text-xl"
                    }) : null, /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                      className: day.hasWorkingHours ? "" : "text-gray-400 opacity-70",
                      children: day.name
                    })]
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  size: showFullWidthColumn ? "12" : "6",
                  sizeSm: "8",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex gap-2 mb-2",
                    children: [day.hasWorkingHours && /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      className: "flex-1 min-w-0",
                      color: day.activeShift === null ? "danger" : "dark",
                      disabled: isDisabled,
                      onClick: () => {
                        if (day.activeShift === null) {
                          onDeleteShift(day.dateUtc);
                        } else {
                          onSelectShift(day.dateUtc, null)();
                        }
                      },
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                        condition: day.activeShift === null,
                        render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: trashOutline,
                          className: "mr-2"
                        }),
                        renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: notificationsOffOutline,
                          className: "mr-2"
                        })
                      }), t("Ne radim")]
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      className: "flex-1 min-w-0",
                      onClick: () => onOpenOtherModal(day.dateUtc),
                      color: customShift ? "success" : "warning",
                      size: "small",
                      disabled: isDisabled,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: timeOutline,
                        className: "mr-2"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "whitespace-nowrap",
                        children: customShift ? `${formatTime(customShift.timeFromUtc)} - ${formatTime(customShift.timeToUtc)}` : t("Izaberi vreme")
                      })]
                    }), showDeleteBtn && /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      color: "danger",
                      onClick: () => onDeleteShift(day.dateUtc),
                      disabled: isDisabled,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: trashOutline,
                        className: "mr-2"
                      }), t("Ukloni")]
                    })]
                  })
                })]
              })
            }), day.hasWorkingHours && /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              spaceBetween: 10,
              slidesPerView: "auto",
              freeMode: true,
              className: "w-full max-w-full",
              style: {
                width: "100%"
              },
              children: getWorkingHoursForDay(day.dateUtc).map(workingHour => {
                const isActive = isWorkingHourActive(day.dateUtc, workingHour);
                return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                  style: {
                    width: "auto"
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(TimeSlotButtonWithLongPress, {
                    workingHour,
                    dayDateUtc: day.dateUtc,
                    isActive,
                    onSelectShift,
                    onLongPress: onLongPressOnTimeSlot,
                    formatTime,
                    disabled: isDisabled
                  }, workingHour.id)
                });
              })
            })]
          });
        }
        const DEFAULT_TIME_FROM_UTC = "08:00:00";
        const DEFAULT_TIME_TO_UTC = "16:00:00";
        const MIN_TIME_DIFF_MINUTES = 30;
        function WorkingDaysPlanCustomTime({
          isOpen,
          onClose,
          onSave,
          selectedDate,
          existingShift1000
        }) {
          const {
            t
          } = useTranslation();
          const getTimeInAppTimezone = utcTime => {
            const timeWithSeconds = fromUtc(utcTime);
            return timeWithSeconds.substring(0, 5);
          };
          const [timeFromLocal, setTimeFromLocal] = reactExports.useState(() => {
            const utcTime = existingShift1000?.timeFromUtc || DEFAULT_TIME_FROM_UTC;
            return getTimeInAppTimezone(utcTime);
          });
          const [timeToLocal, setTimeToLocal] = reactExports.useState(() => {
            const utcTime = existingShift1000?.timeToUtc || DEFAULT_TIME_TO_UTC;
            return getTimeInAppTimezone(utcTime);
          });
          const [pauses, setPauses] = reactExports.useState(existingShift1000?.pausesUtc || []);
          const [error, setError] = reactExports.useState("");
          reactExports.useEffect(() => {
            if (existingShift1000) {
              setTimeFromLocal(getTimeInAppTimezone(existingShift1000.timeFromUtc));
              setTimeToLocal(getTimeInAppTimezone(existingShift1000.timeToUtc));
              setPauses(existingShift1000.pausesUtc || []);
            } else {
              setTimeFromLocal(getTimeInAppTimezone(DEFAULT_TIME_FROM_UTC));
              setTimeToLocal(getTimeInAppTimezone(DEFAULT_TIME_TO_UTC));
              setPauses([]);
            }
          }, [existingShift1000]);
          const isMidnight = time => {
            return time === "00:00:00" || time === "24:00:00";
          };
          const getTimeDifference = (timeFrom, timeTo) => {
            const from = /* @__PURE__ */new Date(`2000-01-01T${timeFrom}`);
            const to = /* @__PURE__ */new Date(`2000-01-01T${timeTo}`);
            return (to.getTime() - from.getTime()) / (1e3 * 60);
          };
          const validateTimeDifference = (timeFrom, timeTo) => {
            if (isMidnight(timeTo) || timeTo === "00:00") return true;
            const diff = getTimeDifference(timeFrom, timeTo);
            return diff >= MIN_TIME_DIFF_MINUTES;
          };
          const handleDateChangeFrom = event => {
            const newTimeLocal = event.detail.value?.substring(0, 5) || "";
            setTimeFromLocal(newTimeLocal);
            if (newTimeLocal > timeToLocal && !isMidnight(timeToLocal)) {
              setTimeToLocal(newTimeLocal);
            }
            setError("");
          };
          const handleDateChangeTo = event => {
            const newTimeLocal = event.detail.value?.substring(0, 5) || "";
            if (newTimeLocal < timeFromLocal && !isMidnight(newTimeLocal) && newTimeLocal !== "00:00") {
              setError(t("Vreme završetka ne može biti manje od vremena početka"));
              return;
            }
            if (!validateTimeDifference(timeFromLocal, newTimeLocal)) {
              setError(t("Minimalna razlika između vremena mora biti 30 minuta"));
              return;
            }
            setTimeToLocal(newTimeLocal);
            setError("");
          };
          const addPause = () => {
            const defaultPauseFromUtc = toUtc("10:00:00");
            const defaultPauseToUtc = toUtc("11:00:00");
            setPauses([...pauses, {
              timeFromUtc: defaultPauseFromUtc,
              timeToUtc: defaultPauseToUtc,
              daysCodes: [""]
            }]);
          };
          const removePause = index => {
            setPauses(pauses.filter((_, i) => i !== index));
          };
          const updatePause = (index, field, value) => {
            const timeNormalized = value?.substring(0, 5) + ":00";
            const utcValue = toUtc(timeNormalized);
            const updatedPauses = [...pauses];
            updatedPauses[index] = {
              ...updatedPauses[index],
              [field]: utcValue,
              daysCodes: [""]
            };
            setPauses(updatedPauses);
          };
          const handleSave = () => {
            if (timeFromLocal && timeToLocal) {
              if (timeToLocal < timeFromLocal && !isMidnight(timeToLocal)) {
                setError(t("Vreme završetka ne može biti manje od vremena početka"));
                return;
              }
              if (!validateTimeDifference(timeFromLocal, timeToLocal)) {
                setError(t("Minimalna razlika između vremena mora biti 30 minuta"));
                return;
              }
              const timeFromUtc = toUtc(timeFromLocal + ":00");
              const timeToUtc = toUtc(timeToLocal + ":00");
              onSave(timeFromUtc, timeToUtc, pauses);
              setTimeout(() => {
                setTimeFromLocal(getTimeInAppTimezone(DEFAULT_TIME_FROM_UTC));
                setTimeToLocal(getTimeInAppTimezone(DEFAULT_TIME_TO_UTC));
                setPauses([]);
              }, 300);
              setError("");
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended, {
            name: "custom-working-hours",
            isOpen,
            onClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Izaberite radno vreme")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    style: {
                      textAlign: "-webkit-center"
                    },
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      children: t("Vreme od")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                      itemType: "time",
                      presentation: "time",
                      preferWheel: true,
                      hourCycle: "h23",
                      minuteValues: "0,30",
                      onIonChange: handleDateChangeFrom,
                      value: timeFromLocal
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-sm text-gray-300 mt-2",
                      children: timeFromLocal
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    style: {
                      textAlign: "-webkit-center"
                    },
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      children: t("Vreme do")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                      itemType: "time",
                      presentation: "time",
                      preferWheel: true,
                      hourCycle: "h24",
                      minuteValues: "0,30",
                      onIonChange: handleDateChangeTo,
                      value: timeToLocal
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-sm text-gray-300 mt-2",
                      children: timeToLocal
                    })]
                  })]
                }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                  className: "mt-2",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-center text-sm text-red-500",
                      children: error
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                  className: "mt-4",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-center text-lg font-semibold text-white mb-2",
                      children: t("Pauze")
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                      children: [pauses.map((pause, index) => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        className: "mb-2",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
                          children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                              size: "4",
                              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-sm text-gray-300",
                                children: t("Od")
                              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                                itemType: "time",
                                presentation: "time",
                                preferWheel: true,
                                hourCycle: "h23",
                                minuteValues: "0,30",
                                onIonChange: e => updatePause(index, "timeFromUtc", e.detail.value || ""),
                                value: getTimeInAppTimezone(pause.timeFromUtc)
                              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-xs text-gray-400 mt-1",
                                children: fromUtcHM(pause.timeFromUtc)
                              })]
                            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                              size: "4",
                              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-sm text-gray-300",
                                children: t("Do")
                              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                                itemType: "time",
                                presentation: "time",
                                preferWheel: true,
                                hourCycle: "h23",
                                minuteValues: "0,30",
                                onIonChange: e => updatePause(index, "timeToUtc", e.detail.value || ""),
                                value: getTimeInAppTimezone(pause.timeToUtc)
                              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                                className: "text-xs text-gray-400 mt-1",
                                children: fromUtcHM(pause.timeToUtc)
                              })]
                            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                              size: "4",
                              className: "flex items-center justify-center",
                              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                                color: "danger",
                                size: "small",
                                onClick: () => removePause(index),
                                children: t("Ukloni")
                              })
                            })]
                          })
                        })
                      }, index)), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                          color: "success",
                          onClick: addPause,
                          className: "w-full",
                          children: t("Dodaj pauzu")
                        })
                      })]
                    })]
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                  className: "mt-4",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-center text-sm text-gray-200",
                      children: t("Izaberite vreme početka i kraja radnog vremena. Vreme se bira u intervalima od 30 minuta.")
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: onClose,
                  color: "warning",
                  className: "p-2",
                  slot: "start",
                  children: t("Odustani")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSave,
                  color: "primary",
                  className: "p-2",
                  slot: "end",
                  disabled: !timeFromLocal || !timeToLocal || !!error,
                  children: t("Sačuvaj")
                })]
              })
            })]
          });
        }
        const CUSTOM_SHIFT = 1e3;
        function WorkingDaysPlanList({
          locationWorker
        }) {
          const today = toZonedTime(/* @__PURE__ */new Date(), getAppTimezone());
          const {
            t
          } = useTranslation();
          const [currentDate, setCurrentDate] = reactExports.useState(today);
          const [requestedDate, setRequestedDate] = reactExports.useState([]);
          const [isOtherModalOpen, setIsOtherModalOpen] = reactExports.useState(false);
          const [selectedDate, setSelectedDate] = reactExports.useState("");
          const [selectedTimeFrom, setSelectedTimeFrom] = reactExports.useState("");
          const [selectedTimeTo, setSelectedTimeTo] = reactExports.useState("");
          const [selectedPauses, setSelectedPauses] = reactExports.useState([]);
          const monthOffset = reactExports.useMemo(() => {
            return differenceInCalendarMonths(currentDate, today);
          }, [currentDate]);
          const {
            data: workingShiftsByDays,
            isFetching: workingShiftsDaysFetching,
            isLoading: workingShiftsDaysLoading,
            refetch: workingShiftsReftech
          } = useGetFeWorkingShiftsByDaysQuery({
            locationSlug: activeLocation,
            monthOffset
          });
          const {
            data: workingHours
          } = useGetWorkingHoursQuery({
            locationSlug: activeLocation,
            workerId: locationWorker.id
          });
          const [setWorkingDayShift, setWorkingDayShiftResult] = useSetFeWorkingDayShiftMutation();
          const [deleteWorkingDayShift, deleteWorkingDayShiftResult] = useDeleteFeWorkingDayShiftMutation();
          const getShiftForDay = date => {
            if (workingShiftsByDays) {
              const shift = workingShiftsByDays?.data.find(day => getUtcDateFormattedInTz(day.dateUtc) === date && day.locationWorkerId === locationWorker.id);
              return shift?.shift !== void 0 ? shift.shift : void 0;
            }
            return void 0;
          };
          const getSlotKey = (timeFromUtc, timeToUtc, pausesUtc) => {
            const pausesHash = pausesUtc?.map(p => `${p.timeFromUtc}-${p.timeToUtc}`).sort().join("|") || "";
            return `${timeFromUtc}-${timeToUtc}-${pausesHash}`;
          };
          const getActiveShiftForDay = date => {
            if (!workingShiftsByDays) return null;
            const shift = workingShiftsByDays.data.find(day => getUtcDateFormattedInTz(day.dateUtc) === date && day.locationWorkerId === locationWorker.id);
            return shift || null;
          };
          const getCustomShift = date => {
            if (workingShiftsByDays) {
              const shift = workingShiftsByDays?.data.find(day => getUtcDateFormattedInTz(day.dateUtc) === date && day.locationWorkerId === locationWorker.id && day.shift === CUSTOM_SHIFT);
              if (shift) {
                return {
                  timeFromUtc: shift.timeFromUtc,
                  timeToUtc: shift.timeToUtc,
                  pausesUtc: shift.pausesUtc?.map(pause => ({
                    timeFromUtc: pause.timeFromUtc,
                    timeToUtc: pause.timeToUtc,
                    daysCodes: []
                    // DayShiftPause doesn't have daysCodes, so we provide empty array
                  })) || []
                };
              }
            }
            return void 0;
          };
          const getWorkingHoursForDay = date => {
            const dayApp = toZonedTime(date, getAppTimezone());
            const dayOfWeek = format(dayApp, "EEE").toLowerCase();
            return workingHours?.data.filter(workingHour => workingHour.daysCodes?.includes(dayOfWeek)) || [];
          };
          const isWorkingHourActive = (date, workingHour) => {
            const activeShift = getActiveShiftForDay(date);
            if (!activeShift || activeShift.shift === null) return false;
            if (activeShift.shift === CUSTOM_SHIFT) {
              return false;
            }
            const dayOfWeek = format(new Date(date), "EEE").toLowerCase();
            const workingHourPauses = workingHour.pausesUtc?.filter(pause => pause.daysCodes?.includes(dayOfWeek)).map(pause => ({
              timeFromUtc: pause.timeFromUtc,
              timeToUtc: pause.timeToUtc
            })) || [];
            const activeShiftPauses = activeShift.pausesUtc || [];
            return activeShift.shift === workingHour.shift && activeShift.timeFromUtc === workingHour.timeFromUtc && activeShift.timeToUtc === workingHour.timeToUtc && getSlotKey(activeShift.timeFromUtc, activeShift.timeToUtc, activeShiftPauses) === getSlotKey(workingHour.timeFromUtc, workingHour.timeToUtc, workingHourPauses);
          };
          const listOfDaysInSelectedMonth = reactExports.useMemo(() => {
            const start = getMonth(currentDate) !== getMonth(today) ? startOfMonth(currentDate) : addDays(today, 1);
            const end = endOfMonth(start);
            if (getMonth(start) !== getMonth(currentDate)) {
              return [];
            }
            return eachDayOfInterval({
              start,
              end
            }).map(day => {
              const dayInAppTz = toZonedTime(day, getAppTimezone());
              const dateString = format(dayInAppTz, "yyyy-MM-dd");
              const workingHoursForDay = getWorkingHoursForDay(dateString);
              const hasWorkingHours = workingHoursForDay.length > 0;
              return {
                name: t(`weeks.${format(day, "EEEE")}`) + ", " + format(day, "d."),
                dayOfWeekNumeric: format(day, "i"),
                dateUtc: dateString,
                isLastDayOfWeek: format(day, "i") === "7",
                // Sunday is the last day of the week (ISO: 1=Monday, 7=Sunday)
                activeShift: getShiftForDay(dateString),
                hasWorkingHours
              };
            });
          }, [currentDate, workingShiftsByDays, locationWorker, workingHours]);
          const handleSetNextMonth = () => {
            setCurrentDate(current => addMonths(current, 1));
          };
          const prevDisabled = differenceInCalendarMonths(currentDate, today) === 0;
          const handleSetPreviousMonth = () => {
            if (!prevDisabled) {
              setCurrentDate(current => subMonths(current));
            }
          };
          const isCurrentYear = reactExports.useMemo(() => {
            return format(currentDate, "yyyy") === format(today, "yyyy");
          }, [currentDate]);
          const formattedMonth = reactExports.useMemo(() => {
            return isCurrentYear ? t(`months.${format(currentDate, "MMMM")}`) : format(currentDate, "MMMM yyyy");
          }, [currentDate, isCurrentYear]);
          const formatTime = timeUtc => {
            return fromUtcHM(timeUtc);
          };
          const shouldShowRemoveButton = day => {
            if (day.hasWorkingHours) return false;
            const activeShift = getActiveShiftForDay(day.dateUtc);
            return activeShift && activeShift.shift !== null;
          };
          const handleDeleteShift = date => {
            setRequestedDate(prev => [...prev, date]);
            deleteWorkingDayShift({
              locationSlug: activeLocation,
              workerId: locationWorker.id,
              dateUtc: date
            }).then(() => workingShiftsReftech());
          };
          const handleSelectShift = (date, shift, isDisabled) => () => {
            if (isDisabled) return;
            const dayOfWeek = format(new Date(date), "EEE").toLowerCase();
            const workingHour = workingHours?.data.find(wh => wh.shift === shift);
            const pausesForDay = workingHour?.pausesUtc?.filter(pause => pause.daysCodes?.includes(dayOfWeek)).map(pause => ({
              timeFromUtc: pause.timeFromUtc,
              timeToUtc: pause.timeToUtc
            })) || [];
            setRequestedDate(prev => [...prev, date]);
            setWorkingDayShift({
              locationSlug: activeLocation,
              workerId: locationWorker.id,
              dateUtc: date,
              shift,
              pausesUtc: pausesForDay
            }).then(() => workingShiftsReftech());
          };
          const handleOpenOtherModal = (date, existingShift) => {
            setSelectedDate(date);
            if (existingShift) {
              setSelectedTimeFrom(existingShift.timeFromUtc);
              setSelectedTimeTo(existingShift.timeToUtc);
              setSelectedPauses(existingShift.pausesUtc || []);
            } else {
              setSelectedTimeFrom("");
              setSelectedTimeTo("");
              setSelectedPauses([]);
            }
            setIsOtherModalOpen(true);
          };
          const handleLongPressOnTimeSlot = (date, workingHour) => {
            const dayOfWeek = format(new Date(date), "EEE").toLowerCase();
            const pausesForDay = workingHour.pausesUtc?.filter(pause => pause.daysCodes?.includes(dayOfWeek)).map(pause => ({
              timeFromUtc: pause.timeFromUtc,
              timeToUtc: pause.timeToUtc,
              daysCodes: pause.daysCodes || []
            })) || [];
            handleOpenOtherModal(date, {
              timeFromUtc: workingHour.timeFromUtc,
              timeToUtc: workingHour.timeToUtc,
              pausesUtc: pausesForDay
            });
          };
          const isLoading = workingShiftsDaysFetching || setWorkingDayShiftResult.isLoading || deleteWorkingDayShiftResult.isLoading;
          reactExports.useEffect(() => {
            if (!isLoading) setRequestedDate([]);
          }, [isLoading]);
          const handleSaveCustomTime = (timeFromUtc, timeToUtc, customPauses) => {
            setRequestedDate(prev => [...prev, selectedDate]);
            setWorkingDayShift({
              locationSlug: activeLocation,
              workerId: locationWorker.id,
              dateUtc: selectedDate,
              shift: CUSTOM_SHIFT,
              timeFromUtc,
              timeToUtc,
              pausesUtc: customPauses
            }).then(() => {
              workingShiftsReftech();
              setIsOtherModalOpen(false);
            });
          };
          const handleCloseOtherModal = reactExports.useCallback(() => {
            setIsOtherModalOpen(false);
            setSelectedTimeFrom("");
            setSelectedTimeTo("");
            setSelectedPauses([]);
          }, []);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
              className: "mt-4 sticky top-2 border-b-2",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                slot: "start",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSetPreviousMonth,
                  disabled: prevDisabled,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronBackOutline
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonTitle, {
                children: [formattedMonth, workingShiftsDaysFetching && !setWorkingDayShiftResult.isLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                slot: "end",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSetNextMonth,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronForwardOutline
                  })
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              children: listOfDaysInSelectedMonth.map(day => /* @__PURE__ */jsxRuntimeExports.jsx(WorkingDayItem, {
                ...{
                  day,
                  workingHours: workingHours?.data,
                  onDeleteShift: handleDeleteShift,
                  onSelectShift: handleSelectShift,
                  onOpenOtherModal: handleOpenOtherModal,
                  onLongPressOnTimeSlot: handleLongPressOnTimeSlot,
                  getActiveShiftForDay,
                  getCustomShift,
                  getWorkingHoursForDay,
                  isWorkingHourActive,
                  formatTime,
                  shouldShowRemoveButton,
                  isUpdating: setWorkingDayShiftResult.isLoading || deleteWorkingDayShiftResult.isLoading,
                  isRequestedDate: requestedDate.includes(day.dateUtc)
                }
              }, day.name))
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkingDaysPlanCustomTime, {
              isOpen: isOtherModalOpen,
              onClose: handleCloseOtherModal,
              onSave: handleSaveCustomTime,
              selectedDate,
              existingShift1000: selectedTimeFrom && selectedTimeTo ? {
                timeFromUtc: selectedTimeFrom,
                timeToUtc: selectedTimeTo,
                pausesUtc: selectedPauses
              } : getCustomShift(selectedDate)
            })]
          });
        }
        function PrepareWorkingDaysShiftsPage({
          selectedWorker
        }) {
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: selectedWorker && /* @__PURE__ */jsxRuntimeExports.jsx(WorkingDaysPlanList, {
              locationWorker: selectedWorker
            })
          });
        }
      }
    };
  });
})();
