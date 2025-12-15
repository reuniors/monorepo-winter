;
(function () {
  System.register(['./vendor_react-legacy-VZwyi0Js.js', './vendor_ionic-legacy-DGRHWrdu.js', './App-legacy-6ilZbwqB.js'], function (exports, module) {
    'use strict';

    var addDays, isToday$1, startOfDay, startOfMonth, format, jsxRuntimeExports, useTranslation, reactExports, endOfMonth, startOfWeek, isSameWeek, addMonths, isSameMonth, SwiperSlide, IonToolbar, IonButton, IonIcon, calendarOutline, IonSpinner, chevronUpOutline, chevronDownOutline, IonButtons, chevronBackOutline, chevronForwardOutline, SwiperWrapper;
    return {
      setters: [module => {
        addDays = module.aU;
        isToday$1 = module.b5;
        startOfDay = module.aV;
        startOfMonth = module.aR;
        format = module.ay;
        jsxRuntimeExports = module.j;
        useTranslation = module.aD;
        reactExports = module.e;
        endOfMonth = module.aT;
        startOfWeek = module.aS;
        isSameWeek = module.b6;
        addMonths = module.aY;
        isSameMonth = module.aZ;
        SwiperSlide = module.af;
      }, module => {
        IonToolbar = module.i;
        IonButton = module.d;
        IonIcon = module.l;
        calendarOutline = module.ad;
        IonSpinner = module.n;
        chevronUpOutline = module.bj;
        chevronDownOutline = module.bi;
        IonButtons = module.k;
        chevronBackOutline = module.ar;
        chevronForwardOutline = module.$;
      }, module => {
        SwiperWrapper = module.S;
      }],
      execute: function () {
        exports({
          B: BookingCalendarHeader,
          a: getDaysWithSlotsSet,
          b: BookingWeekDays,
          g: generateWeek,
          h: hasAnySlotsInWeek,
          i: isToday
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
          const today = startOfDay(/* @__PURE__ */new Date());
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
        function BookingCalendarHeader({
          currentWeek,
          currentMonth,
          selectedDate,
          isCalendarOpen,
          isLoadingSlots,
          onToggleCalendar,
          onPreviousWeek,
          onNextWeek,
          canGoPrevious,
          canGoNext
        }) {
          const monthToDisplay = isCalendarOpen && currentMonth ? startOfMonth(currentMonth) : (() => {
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
                onClick: onToggleCalendar,
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
                  onClick: onPreviousWeek,
                  disabled: !canGoPrevious,
                  fill: "clear",
                  size: "small",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronBackOutline
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: onNextWeek,
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
        function BookingWeekDays({
          currentWeek,
          selectedDate,
          onSelectDate,
          daysWithSlots,
          maxPreparedDate,
          onWeekChange,
          isMonthView,
          currentMonth,
          onMonthChange
        }) {
          const {
            i18n
          } = useTranslation();
          const selectedDateStr = format(selectedDate, "yyyy-MM-dd");
          const swiperRef = reactExports.useRef(null);
          const monthSwiperRef = reactExports.useRef(null);
          const today = /* @__PURE__ */new Date();
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
          }, [maxPreparedDate]);
          const monthDays = reactExports.useMemo(() => {
            if (!isMonthView || !currentMonth) return [];
            const monthStart = startOfMonth(currentMonth);
            const monthEnd = endOfMonth(currentMonth);
            const firstDisplayDate = today >= monthStart && today <= monthEnd ? today : monthStart;
            const calendarStart = firstDisplayDate;
            const weekContainingMonthEnd = startOfWeek(monthEnd, {
              weekStartsOn: 1
            });
            const lastDate = addDays(weekContainingMonthEnd, 6);
            const days = [];
            let currentDate = calendarStart;
            while (currentDate <= lastDate) {
              days.push(new Date(currentDate));
              currentDate = addDays(currentDate, 1);
            }
            return days;
          }, [isMonthView, currentMonth, today]);
          const dayNames = {
            sr: ["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"],
            en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          };
          reactExports.useMemo(() => {
            if (monthDays.length === 0) return [];
            const weeksList = [];
            for (let i = 0; i < monthDays.length; i += 7) {
              const week = monthDays.slice(i, i + 7);
              if (week.length === 7) {
                weeksList.push(week);
              } else if (week.length > 0) {
                while (week.length < 7) {
                  week.push(null);
                }
                weeksList.push(week);
              }
            }
            return weeksList;
          }, [monthDays]);
          const monthDayNames = reactExports.useMemo(() => {
            if (!isMonthView) return dayNames.sr;
            const lang = i18n.language?.toLowerCase() ?? "sr";
            const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
            return dayNames[localeKey];
          }, [isMonthView, i18n.language]);
          const currentWeekIndex = reactExports.useMemo(() => {
            if (isMonthView) return -1;
            return weeks.findIndex(week => isSameWeek(currentWeek[0], week[0], {
              weekStartsOn: 1
            }));
          }, [weeks, currentWeek, isMonthView]);
          reactExports.useEffect(() => {
            if (!isMonthView && swiperRef.current && currentWeekIndex >= 0) {
              swiperRef.current.swiper?.slideTo(currentWeekIndex);
            }
          }, [currentWeekIndex, isMonthView]);
          const monthsForSwiper = reactExports.useMemo(() => {
            if (!isMonthView || !currentMonth) return [];
            const months = [];
            const todayMonth = startOfMonth(today);
            const endDate = maxPreparedDate || addMonths(today, 12);
            const endMonth = startOfMonth(endDate);
            let currentMonthToAdd = todayMonth;
            while (currentMonthToAdd <= endMonth) {
              months.push(new Date(currentMonthToAdd));
              currentMonthToAdd = addMonths(currentMonthToAdd, 1);
            }
            return months;
          }, [isMonthView, today, maxPreparedDate]);
          const currentMonthIndex = reactExports.useMemo(() => {
            if (!isMonthView || !currentMonth) return -1;
            return monthsForSwiper.findIndex(month => isSameMonth(month, currentMonth));
          }, [monthsForSwiper, currentMonth, isMonthView]);
          reactExports.useEffect(() => {
            if (isMonthView && monthSwiperRef.current && currentMonthIndex >= 0) {
              requestAnimationFrame(() => {
                if (monthSwiperRef.current?.swiper) {
                  const currentActiveIndex = monthSwiperRef.current.swiper.activeIndex;
                  if (currentActiveIndex !== currentMonthIndex) {
                    monthSwiperRef.current.swiper.slideTo(currentMonthIndex, 0);
                  }
                }
              });
            }
          }, [currentMonthIndex, isMonthView]);
          const getDayLabel = date => {
            const lang = i18n.language?.toLowerCase() ?? "sr";
            const localeKey = lang.startsWith("sr") || lang.startsWith("rs") ? "sr" : "en";
            const dayIndex = date.getDay();
            const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1;
            return dayNames[localeKey][adjustedIndex] || "";
          };
          const renderDay = date => {
            const dateStr = format(date, "yyyy-MM-dd");
            const isSelected = dateStr === selectedDateStr;
            const hasSlots = daysWithSlots.has(dateStr);
            const isTodayDate = isToday(date);
            const isCurrentMonth = currentMonth ? isSameMonth(date, currentMonth) : true;
            const isPast = isPastDate(date);
            const isAfterMax = maxPreparedDate ? date > maxPreparedDate : false;
            const isDisabled = !hasSlots || isPast || isAfterMax;
            return /* @__PURE__ */jsxRuntimeExports.jsxs("button", {
              onClick: () => onSelectDate(date),
              disabled: isDisabled,
              className: `
          flex flex-col items-center justify-center
          ${isMonthView ? "min-w-0 px-1.5 py-2" : "flex-1 min-w-0 px-1.5 py-2"}
          rounded-xl transition-all duration-200
          ${isSelected ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 shadow-lg ring-2 ring-emerald-500 dark:ring-emerald-400" : isDisabled ? "cursor-not-allowed" : isCurrentMonth || !isMonthView ? "hover:bg-gray-100 dark:hover:bg-gray-800" : ""}
          ${isTodayDate && !isSelected && !isDisabled ? "ring-2 ring-gray-600 dark:ring-gray-400" : ""}
        `,
              children: [!isMonthView && (() => {
                const dayLabel = getDayLabel(date);
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
                return /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  className: `text-sm font-semibold tracking-wide uppercase mb-1 ${dayLabelColor || (isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400")}`,
                  style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots && !isSub && !isNed ? {
                    color: "var(--ion-text-color, #111827)"
                  } : void 0,
                  children: dayLabel
                });
              })(), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                className: `text-lg font-bold ${isSelected ? "" : isDisabled ? "text-gray-400" : isCurrentMonth || !isMonthView ? hasSlots ? "" : "text-gray-500" : "text-gray-400"}`,
                style: !isSelected && !isDisabled && (isCurrentMonth || !isMonthView) && hasSlots ? {
                  color: "var(--ion-text-color, #111827)"
                } : void 0,
                children: date.getDate()
              }), hasSlots && !isDisabled && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: `w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? "bg-white dark:bg-gray-900" : "bg-emerald-500 dark:bg-emerald-400"}`
              })]
            }, dateStr);
          };
          if (isMonthView) {
            const generateMonthDays = month => {
              const monthStart = startOfMonth(month);
              const monthEnd = endOfMonth(month);
              const calendarStart = startOfWeek(monthStart, {
                weekStartsOn: 1
              });
              const weekContainingMonthEnd = startOfWeek(monthEnd, {
                weekStartsOn: 1
              });
              addDays(weekContainingMonthEnd, 6);
              const days = [];
              let currentDate = calendarStart;
              for (let i = 0; i < 35; i++) {
                days.push(new Date(currentDate));
                currentDate = addDays(currentDate, 1);
              }
              const weeks2 = [];
              for (let i = 0; i < 35; i += 7) {
                weeks2.push(days.slice(i, i + 7));
              }
              return weeks2;
            };
            return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "border-b border-gray-200 dark:border-gray-700",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "grid grid-cols-7 gap-1 px-2 pt-3 pb-1",
                children: monthDayNames.map((dayName, index) => {
                  const isSub = dayName === "Sub" || dayName === "Sat";
                  const isNed = dayName === "Ned" || dayName === "Sun";
                  return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: `text-center text-xs font-medium py-1 ${isSub ? "text-yellow-600 dark:text-yellow-400" : isNed ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`,
                    children: dayName
                  }, `${dayName}-${index}`);
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
                ref: monthSwiperRef,
                slidesPerView: 1,
                spaceBetween: 0,
                allowTouchMove: true,
                onSlideChange: swiper => {
                  const activeIndex = swiper.activeIndex;
                  const activeMonth = monthsForSwiper[activeIndex];
                  if (activeMonth && onMonthChange && currentMonth) {
                    const activeMonthStr = format(activeMonth, "yyyy-MM");
                    const currentMonthStr = format(currentMonth, "yyyy-MM");
                    if (activeMonthStr !== currentMonthStr) {
                      onMonthChange(activeMonth);
                    }
                  }
                },
                children: monthsForSwiper.map((month, monthIndex) => {
                  const monthWeeks2 = generateMonthDays(month);
                  return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "px-2 pb-3",
                      children: monthWeeks2.map((week, weekIndex) => /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                        className: "grid grid-cols-7 gap-1",
                        children: week.map((date, dayIndex) => date ? renderDay(date) : /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                          className: "min-w-0 px-1.5 py-2"
                        }, `empty-${weekIndex}-${dayIndex}`))
                      }, weekIndex))
                    })
                  }, format(month, "yyyy-MM"));
                })
              })]
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "border-b border-gray-200 dark:border-gray-700",
            children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              ref: swiperRef,
              slidesPerView: 1,
              spaceBetween: 0,
              allowTouchMove: true,
              onSlideChange: swiper => {
                const activeIndex = swiper.activeIndex;
                if (weeks[activeIndex] && onWeekChange) {
                  onWeekChange(weeks[activeIndex]);
                }
              },
              children: weeks.map((week, weekIndex) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex items-center justify-between px-2 py-3",
                  children: week.map(date => renderDay(date))
                })
              }, weekIndex))
            })
          });
        }
      }
    };
  });
})();
