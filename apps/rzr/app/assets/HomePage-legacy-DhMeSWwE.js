;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './App-legacy-BEzc__N_.js', './vendor_ionic-legacy-Br2UrGvg.js', './reservation.helpers-legacy-C8dWbJ-2.js', './logo-square-legacy-CpO8vD1Z.js', './NewsChyron-legacy-xUjArUUe.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-BVEqw4ar.js', './vendor_firebase-legacy-D-vUgmbk.js', './news.fe-services-legacy-BIoRsKrF.js'], function (exports, module) {
    'use strict';

    var useTranslation, parseISO, startOfDay, differenceInDays, format, jsxRuntimeExports, SwiperSlide, reactExports, useUser, useGetWorkerNextSlotsQuery, SwiperWrapper, activeLocation, ConditionalComponent, getPathBySize, useGetFeWorkersQuery, SceletonLoader, useGetFeLocationQuery, preloadedLocationData, IonButton, useIonRouter, IonSpinner, IonCard, IonCardContent, IonLabel, IonCardHeader, getReservationUrlWithParams, LazyLoadImgStandard, preloadCoverImg$1, NewsChyron;
    return {
      setters: [module => {
        useTranslation = module.M;
        parseISO = module.az;
        startOfDay = module.aT;
        differenceInDays = module.bd;
        format = module.aC;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.aj;
        reactExports = module.e;
      }, module => {
        useUser = module.b;
        useGetWorkerNextSlotsQuery = module.ab;
        SwiperWrapper = module.S;
        activeLocation = module.n;
        ConditionalComponent = module.C;
        getPathBySize = module.s;
        useGetFeWorkersQuery = module.q;
        SceletonLoader = module.r;
        useGetFeLocationQuery = module.m;
        preloadedLocationData = module.p;
      }, module => {
        IonButton = module.d;
        useIonRouter = module.ao;
        IonSpinner = module.o;
        IonCard = module.b2;
        IonCardContent = module.b3;
        IonLabel = module.G;
        IonCardHeader = module.b4;
      }, module => {
        getReservationUrlWithParams = module.g;
      }, module => {
        LazyLoadImgStandard = module.L;
        preloadCoverImg$1 = module.p;
      }, module => {
        NewsChyron = module.N;
      }, null, null, null, null],
      execute: function () {
        exports("default", HomePage);
        function WorkerNextSlotItem({
          slot,
          onClick
        }) {
          const {
            t
          } = useTranslation();
          const slotDate = parseISO(slot.datetime);
          const today = startOfDay(/* @__PURE__ */new Date());
          const slotDay = startOfDay(slotDate);
          const daysDiff = differenceInDays(slotDay, today);
          let dateLabel;
          if (daysDiff === 0) {
            dateLabel = t("Danas");
          } else if (daysDiff > 0 && daysDiff <= 7) {
            dateLabel = t(`weeks.${format(slotDate, "EEE")}`);
          } else {
            dateLabel = format(slotDate, "dd.MM");
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
            fill: "outline",
            color: "dark",
            mode: "ios",
            size: "small",
            onClick: () => onClick(slot),
            className: "!h-auto !py-2 !px-1 whitespace-nowrap border-none rounded-lg",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex flex-col items-center",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                className: "text-xs",
                children: dateLabel
              }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                className: "text-sm font-semibold",
                children: slot.time
              })]
            })
          });
        }
        function WorkerNextSlots({
          workerId,
          locationSlug
        }) {
          const {
            push
          } = useIonRouter();
          const {
            wrapUserLoginModal
          } = useUser();
          const validWorkerId = typeof workerId === "number" && workerId > 0 ? workerId : null;
          const {
            data: slotsResult,
            isLoading,
            isFetching
          } = useGetWorkerNextSlotsQuery({
            workerId: validWorkerId,
            locationSlug
          }, {
            skip: !validWorkerId || !locationSlug
          });
          const slots = slotsResult?.data?.slots || [];
          if (!isLoading && !isFetching && (!slots || slots.length === 0)) {
            return null;
          }
          if (isLoading || isFetching) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex items-center justify-center py-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          const handleSlotClick = slot => {
            wrapUserLoginModal(() => {
              const slotDate = parseISO(slot.datetime);
              const reservationUrl = getReservationUrlWithParams({
                worker: slot.workerId.toString(),
                step: "3",
                date: format(slotDate, "yyyy-MM-dd"),
                slot: slot.time
              });
              push(reservationUrl);
            })?.();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
              slidesPerView: "auto",
              className: "w-full",
              spaceBetween: 2,
              children: slots.map((slot, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                style: {
                  width: "auto"
                },
                children: /* @__PURE__ */jsxRuntimeExports.jsx(WorkerNextSlotItem, {
                  slot,
                  onClick: handleSlotClick
                })
              }, `${slot.datetime}-${index}`))
            })
          });
        }
        function WorkerItem({
          worker
        }) {
          const {
            t
          } = useTranslation();
          const {
            push
          } = useIonRouter();
          const reservationUrl = getReservationUrlWithParams({
            worker: worker.id.toString(),
            step: "2"
          });
          const {
            data: slotsResult,
            isLoading,
            isFetching
          } = useGetWorkerNextSlotsQuery({
            workerId: worker.id,
            locationSlug: activeLocation
          }, {
            skip: !worker.id || !activeLocation
          });
          const hasSlots = slotsResult?.data?.slots && slotsResult.data.slots.length > 0;
          const shouldShowSlotsSection = hasSlots || isLoading || isFetching;
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
            className: "m-0",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              className: "p-4 ion-no-margin !p-2",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex gap-4",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex-shrink-0",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                    condition: !!worker.avatar?.pathByResolution,
                    render: () => /* @__PURE__ */jsxRuntimeExports.jsx(LazyLoadImgStandard, {
                      src: getPathBySize(worker.avatar.pathByResolution),
                      preloadImg: preloadCoverImg$1,
                      className: "aspect-square w-24 h-24 rounded-lg object-cover cursor-pointer",
                      onClick: () => {
                        push(reservationUrl);
                      }
                    }),
                    renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "w-24 h-24 rounded-lg bg-gray-700 flex items-center justify-center",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-gray-400 text-2xl",
                        children: "👤"
                      })
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex-1 min-w-0",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs("h2", {
                    className: "text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                      className: "block sm:inline",
                      children: worker.fullName
                    }), worker.maxDiscountPercent && worker.maxDiscountPercent > 0 && /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                      className: "text-green-600 ml-1 text-sm block sm:inline",
                      children: ["(", t("Do"), " ", worker.maxDiscountPercent, "% ", t("popusta"), ")"]
                    })]
                  }), worker.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    className: "text-sm text-gray-400 dark:text-gray-500 line-clamp-1 mb-2",
                    children: worker.description
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    color: "dark",
                    size: "small",
                    className: "mt-2",
                    routerLink: reservationUrl,
                    children: t("Zakažite")
                  })]
                })]
              }), worker.id && shouldShowSlotsSection && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "mt-1",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(WorkerNextSlots, {
                  workerId: worker.id,
                  locationSlug: activeLocation
                })
              })]
            })
          });
        }
        const WorkerItem$1 = reactExports.memo(WorkerItem);
        function WorkersList({
          locationSlug
        }) {
          const {
            data: workersResult,
            isLoading: workersLoading
          } = useGetFeWorkersQuery({
            locationSlug
          });
          if (workersLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "space-y-4",
            children: workersResult?.data.map(worker => /* @__PURE__ */jsxRuntimeExports.jsx(WorkerItem$1, {
              worker
            }, worker.id))
          });
        }
        const preloadCoverImg = "/app/assets/logo-16x9-CTehlU2H.webp";
        function HomePage() {
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(NewsChyron, {
              className: "ion-margin"
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkersList, {
              locationSlug: activeLocation
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  className: "text-lg",
                  children: locationData?.description
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: 'flex justify-center items-center w-full"',
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(LazyLoadImgStandard, {
                    src: locationData?.logo?.path,
                    className: "max-h-[200px] w-auto min-h-[150px]",
                    preloadImg: preloadCoverImg
                  })
                })
              })
            })]
          });
        }
      }
    };
  });
})();
