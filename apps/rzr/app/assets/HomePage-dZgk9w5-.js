import { e as reactExports, aD as useTranslation, j as jsxRuntimeExports, af as SwiperSlide } from "./vendor_react-AVDGa64O.js";
import { C as ConditionalComponent, m as getPathBySize, j as useGetFeWorkersQuery, l as SceletonLoader, S as SwiperWrapper, w as useGetFeLocationQuery, k as activeLocation, p as preloadedLocationData } from "./App-oqSqwiE_.js";
import { aj as useIonRouter, aX as IonCard, aZ as IonCardHeader, aY as IonCardContent, d as IonButton, E as IonLabel } from "./vendor_ionic-DxHtCw90.js";
import { g as getReservationUrlWithParams } from "./reservation.helpers-DRLQnio_.js";
import { L as LazyLoadImgStandard, p as preloadCoverImg$1 } from "./logo-square-DF7MGeW5.js";
import { N as NewsChyron } from "./NewsChyron-DV-Ha3iu.js";
import "./vendor_leaflet-Cvlut8nW.js";
import "./index-B8xlO4-Z.js";
import "./vendor_firebase-Chyyt7SL.js";
import "./news.fe-services-CXmA8Wya.js";
function WorkerItem({ worker }) {
  var _a;
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const [isOverflowing, setIsOverflowing] = reactExports.useState(false);
  const descriptionRef = reactExports.useRef(null);
  const { push } = useIonRouter();
  const reservationUrl = getReservationUrlWithParams({
    worker: worker.id.toString(),
    step: "1"
  });
  reactExports.useEffect(() => {
    if (descriptionRef.current) {
      setTimeout(() => {
        if (descriptionRef.current) {
          const { scrollHeight, clientHeight } = descriptionRef.current;
          setIsOverflowing(scrollHeight > clientHeight);
        }
      }, 100);
    }
  }, [worker.description]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { className: "m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConditionalComponent,
      {
        condition: !!((_a = worker.avatar) == null ? void 0 : _a.pathByResolution),
        render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          LazyLoadImgStandard,
          {
            src: getPathBySize(worker.avatar.pathByResolution),
            preloadImg: preloadCoverImg$1,
            className: "aspect-square min-h-[300px] w-full",
            onClick: () => {
              push(reservationUrl);
            }
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "border-b py-2", children: worker.fullName }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pt-2 pb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            ref: descriptionRef,
            className: "\n              overflow-hidden \n              transition-all duration-300 ease-in-out\n              ".concat(isExpanded ? "max-h-none" : "max-h-[3em]", "\n            "),
            style: { lineHeight: "1.5em", minHeight: "3em" },
            children: worker.description
          }
        ),
        isOverflowing && !isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 right-0 bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonButton,
          {
            fill: "clear",
            size: "small",
            onClick: (e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsExpanded(true);
            },
            className: "opacity-80 bg-gray-800 ion-no-padding !px-2 !py-0",
            children: t("Više")
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonButton,
        {
          color: "dark",
          className: "w-full mt-2",
          routerLink: reservationUrl,
          children: t("Zakažite")
        }
      )
    ] })
  ] });
}
const WorkerItem$1 = reactExports.memo(WorkerItem);
function WorkersList({ locationSlug }) {
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({ locationSlug });
  if (workersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SwiperWrapper,
    {
      spaceBetween: 10,
      slidesPerView: "auto",
      className: "w-full",
      autoplay: {
        delay: 2e3,
        disableOnInteraction: true,
        pauseOnMouseEnter: true
      },
      children: workersResult == null ? void 0 : workersResult.data.map((worker) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwiperSlide,
        {
          style: { width: "auto" },
          className: "max-w-[300px]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerItem$1, { worker })
        },
        worker.id
      ))
    }
  );
}
const preloadCoverImg = "/app/assets/logo-16x9-CTehlU2H.webp";
function HomePage() {
  var _a, _b, _c;
  const { data: locationResponse } = useGetFeLocationQuery(
    {
      slug: activeLocation
    },
    { skip: !!((_a = preloadedLocationData) == null ? void 0 : _a.id) }
  );
  const locationData = (_b = preloadedLocationData) != null ? _b : locationResponse == null ? void 0 : locationResponse.data;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NewsChyron, { className: "ion-margin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WorkersList, { locationSlug: activeLocation }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { className: "text-lg", children: locationData == null ? void 0 : locationData.description }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: 'flex justify-center items-center w-full"', children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      LazyLoadImgStandard,
      {
        src: (_c = locationData == null ? void 0 : locationData.logo) == null ? void 0 : _c.path,
        className: "max-h-[200px] w-auto min-h-[150px]",
        preloadImg: preloadCoverImg
      }
    ) }) }) })
  ] });
}
export {
  HomePage as default
};
