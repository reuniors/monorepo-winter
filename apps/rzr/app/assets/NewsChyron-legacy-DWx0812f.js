;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './vendor_ionic-legacy-DYIGQWbn.js', './news.fe-services-legacy-Blqbo5Hr.js', './App-legacy-DiiuRRmT.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, SwiperSlide, IonCard, IonCardContent, IonIcon, megaphoneOutline, IonText, useGetActiveNewsQuery, activeLocation, SwiperWrapper;
    return {
      setters: [module => {
        useTranslation = module.aD;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
        SwiperSlide = module.af;
      }, module => {
        IonCard = module.aX;
        IonCardContent = module.aY;
        IonIcon = module.l;
        megaphoneOutline = module.aI;
        IonText = module.c;
      }, module => {
        useGetActiveNewsQuery = module.d;
      }, module => {
        activeLocation = module.k;
        SwiperWrapper = module.S;
      }],
      execute: function () {
        exports("N", NewsChyron);
        function NewsChyron({
          className = ""
        }) {
          const {
            t
          } = useTranslation();
          const [currentNewsIndex, setCurrentNewsIndex] = reactExports.useState(0);
          const swiperRef = reactExports.useRef(null);
          const {
            data: activeNewsResponse,
            isLoading
          } = useGetActiveNewsQuery({
            locationSlug: activeLocation
          });
          const activeNews = activeNewsResponse?.data || [];
          if (isLoading) {
            return null;
          }
          if (activeNews.length === 0) {
            return null;
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
            className: `news-chyron ${className}`,
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              className: "ion-padding-vertical text-left",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex items-center gap-2",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: megaphoneOutline,
                  color: "warning",
                  className: "text-2xl animate-pulse"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "warning",
                  className: "text-sm font-medium",
                  children: t("Važna saopštenja")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "mt-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper, {
                  ref: swiperRef,
                  slidesPerView: 1,
                  spaceBetween: 0,
                  autoplay: {
                    delay: 5e3,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                  },
                  onSlideChange: swiper => setCurrentNewsIndex(swiper.activeIndex),
                  className: "news-swiper",
                  children: activeNews.map((news, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                      className: "text-base block text-gray-300",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-2xl font-bold",
                        children: news.title
                      }), news.description && news.description.trim() !== "" && /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                        className: "ml-2 text-lg",
                        children: ["- ", news.description]
                      })]
                    })
                  }, news.id || index))
                })
              }), activeNews.length > 1 && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex justify-center gap-1 mt-2",
                children: activeNews.map((_, index) => /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: `w-3 h-3 rounded-full transition-colors duration-300 ${index === currentNewsIndex ? "bg-gray-300" : "bg-gray-600"}`,
                  onClick: () => swiperRef.current?.swiper.slideTo(index)
                }, index))
              })]
            })
          });
        }
      }
    };
  });
})();
