;
(function () {
  System.register(['./vendor_react-legacy-xICptfoc.js', './App-legacy-1Ax7LQ4a.js', './vendor_ionic-legacy-BYtYhV2-.js', './reservation.helpers-legacy-BDNPjUsI.js', './logo-square-legacy-CpD5OC8l.js', './NewsChyron-legacy-Ky-0Naus.js', './vendor_leaflet-legacy-D5znobiB.js', './index-legacy-Cim4I-VS.js', './vendor_firebase-legacy-Bauk9ZJe.js', './news.fe-services-legacy-BmIXrvVH.js'], function (exports, module) {
    'use strict';

    var reactExports, useTranslation, jsxRuntimeExports, SwiperSlide, ConditionalComponent, getPathBySize, useGetFeWorkersQuery, SceletonLoader, SwiperWrapper, useGetFeLocationQuery, activeLocation, preloadedLocationData, useIonRouter, IonCard, IonCardHeader, IonCardContent, IonButton, IonLabel, getReservationUrlWithParams, LazyLoadImgStandard, preloadCoverImg$1, NewsChyron;
    return {
      setters: [module => {
        reactExports = module.e;
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.af;
      }, module => {
        ConditionalComponent = module.C;
        getPathBySize = module.m;
        useGetFeWorkersQuery = module.j;
        SceletonLoader = module.l;
        SwiperWrapper = module.S;
        useGetFeLocationQuery = module.v;
        activeLocation = module.k;
        preloadedLocationData = module.K;
      }, module => {
        useIonRouter = module.aj;
        IonCard = module.aX;
        IonCardHeader = module.aZ;
        IonCardContent = module.aY;
        IonButton = module.d;
        IonLabel = module.E;
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
        function WorkerItem({
          worker
        }) {
          const {
            t
          } = useTranslation();
          const [isExpanded, setIsExpanded] = reactExports.useState(false);
          const [isOverflowing, setIsOverflowing] = reactExports.useState(false);
          const descriptionRef = reactExports.useRef(null);
          const {
            push
          } = useIonRouter();
          const reservationUrl = getReservationUrlWithParams({
            worker: worker.id.toString(),
            step: "1"
          });
          reactExports.useEffect(() => {
            if (descriptionRef.current) {
              setTimeout(() => {
                if (descriptionRef.current) {
                  const {
                    scrollHeight,
                    clientHeight
                  } = descriptionRef.current;
                  setIsOverflowing(scrollHeight > clientHeight);
                }
              }, 100);
            }
          }, [worker.description]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            className: "m-0",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
              condition: !!worker.avatar?.pathByResolution,
              render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(LazyLoadImgStandard, {
                  src: getPathBySize(worker.avatar.pathByResolution),
                  preloadImg: preloadCoverImg$1,
                  className: "aspect-square min-h-[300px] w-full",
                  onClick: () => {
                    push(reservationUrl);
                  }
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                className: "border-b py-2",
                children: worker.fullName
              }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "relative pt-2 pb-1",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  ref: descriptionRef,
                  className: `
              overflow-hidden 
              transition-all duration-300 ease-in-out
              ${isExpanded ? "max-h-none" : "max-h-[3em]"}
            `,
                  style: {
                    lineHeight: "1.5em",
                    minHeight: "3em"
                  },
                  children: worker.description
                }), isOverflowing && !isExpanded && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "absolute bottom-0 right-0 bg-transparent",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "clear",
                    size: "small",
                    onClick: e => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsExpanded(true);
                    },
                    className: "opacity-80 bg-gray-800 ion-no-padding !px-2 !py-0",
                    children: t("Više")
                  })
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                color: "dark",
                className: "w-full mt-2",
                routerLink: reservationUrl,
                children: t("Zakažite")
              })]
            })]
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
          return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
            spaceBetween: 10,
            slidesPerView: "auto",
            className: "w-full",
            autoplay: {
              delay: 2e3,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            },
            children: workersResult?.data.map(worker => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
              style: {
                width: "auto"
              },
              className: "max-w-[300px]",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(WorkerItem$1, {
                worker
              })
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
