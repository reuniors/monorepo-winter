import { aD as useTranslation, e as reactExports, j as jsxRuntimeExports, af as SwiperSlide } from "./vendor_react-CDpfJxnK.js";
import { aX as IonCard, aY as IonCardContent, l as IonIcon, aI as megaphoneOutline, c as IonText } from "./vendor_ionic-ZVUk9kYn.js";
import { d as useGetActiveNewsQuery } from "./news.fe-services-BDxr1eQ4.js";
import { k as activeLocation, S as SwiperWrapper } from "./App-s8woqYJJ.js";
function NewsChyron({ className = "" }) {
  const { t } = useTranslation();
  const [currentNewsIndex, setCurrentNewsIndex] = reactExports.useState(0);
  const swiperRef = reactExports.useRef(null);
  const { data: activeNewsResponse, isLoading } = useGetActiveNewsQuery({
    locationSlug: activeLocation
  });
  const activeNews = (activeNewsResponse == null ? void 0 : activeNewsResponse.data) || [];
  if (isLoading) {
    return null;
  }
  if (activeNews.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { className: "news-chyron ".concat(className), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "ion-padding-vertical text-left", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonIcon,
        {
          icon: megaphoneOutline,
          color: "warning",
          className: "text-2xl animate-pulse"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "warning", className: "text-sm font-medium", children: t("Važna saopštenja") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwiperWrapper,
      {
        ref: swiperRef,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 5e3,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        },
        onSlideChange: (swiper) => setCurrentNewsIndex(swiper.activeIndex),
        className: "news-swiper",
        children: activeNews.map((news, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperSlide, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonText, { className: "text-base block text-gray-300", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold", children: news.title }),
          news.description && news.description.trim() !== "" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-lg", children: [
            "- ",
            news.description
          ] })
        ] }) }, news.id || index))
      }
    ) }),
    activeNews.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center gap-1 mt-2", children: activeNews.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-3 h-3 rounded-full transition-colors duration-300 ".concat(index === currentNewsIndex ? "bg-gray-300" : "bg-gray-600"),
        onClick: () => {
          var _a;
          return (_a = swiperRef.current) == null ? void 0 : _a.swiper.slideTo(index);
        }
      },
      index
    )) })
  ] }) });
}
export {
  NewsChyron as N
};
