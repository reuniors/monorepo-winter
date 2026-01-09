import { a3 as useTranslation, j as jsxRuntimeExports, az as parseISO, aT as startOfDay, bc as differenceInDays, aC as format, ai as SwiperSlide, e as reactExports } from "./vendor_react-CMjr4Gvv.js";
import { ab as useGetWorkerNextSlotsQuery, S as SwiperWrapper, n as activeLocation, C as ConditionalComponent, s as getPathBySize, q as useGetFeWorkersQuery, r as SceletonLoader, m as useGetFeLocationQuery, p as preloadedLocationData } from "./App-D-OkzpaC.js";
import { al as useIonRouter, n as IonSpinner, d as IonButton, a$ as IonCard, b0 as IonCardContent, F as IonLabel, b1 as IonCardHeader } from "./vendor_ionic-7y52xm55.js";
import { g as getReservationUrlWithParams } from "./reservation.helpers-DRLQnio_.js";
import { L as LazyLoadImgStandard, p as preloadCoverImg$1 } from "./logo-square-SX63CiNV.js";
import { N as NewsChyron } from "./NewsChyron-DuxB_E4P.js";
import "./vendor_leaflet-0lyiJUDC.js";
import "./index-BRkPMoDf.js";
import "./vendor_firebase-BM_4Mc6z.js";
import "./news.fe-services-B1s41bGM.js";
function WorkerNextSlots({ workerId, locationSlug }) {
  var _a;
  const { t } = useTranslation();
  const { push } = useIonRouter();
  const validWorkerId = typeof workerId === "number" && workerId > 0 ? workerId : null;
  const {
    data: slotsResult,
    isLoading,
    isFetching
  } = useGetWorkerNextSlotsQuery(
    { workerId: validWorkerId, locationSlug },
    { skip: !validWorkerId || !locationSlug }
  );
  const slots = ((_a = slotsResult == null ? void 0 : slotsResult.data) == null ? void 0 : _a.slots) || [];
  if (!isLoading && !isFetching && (!slots || slots.length === 0)) {
    return null;
  }
  if (isLoading || isFetching) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) });
  }
  const handleSlotClick = (slot) => {
    const slotDate = parseISO(slot.datetime);
    const reservationUrl = getReservationUrlWithParams({
      worker: slot.workerId.toString(),
      step: "3",
      date: format(slotDate, "yyyy-MM-dd"),
      slot: slot.time
    });
    push(reservationUrl);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SwiperWrapper, { slidesPerView: "auto", className: "w-full", children: slots.map((slot, index) => {
    const slotDate = parseISO(slot.datetime);
    const today = startOfDay(/* @__PURE__ */ new Date());
    const slotDay = startOfDay(slotDate);
    const daysDiff = differenceInDays(slotDay, today);
    let dateLabel;
    if (daysDiff === 0) {
      dateLabel = t("Danas");
    } else if (daysDiff > 0 && daysDiff <= 7) {
      dateLabel = t("weeks.".concat(format(slotDate, "EEEE")));
    } else {
      dateLabel = format(slotDate, "dd.MM");
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SwiperSlide,
      {
        style: { width: "auto" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonButton,
          {
            fill: "outline",
            color: "dark",
            size: "small",
            onClick: () => handleSlotClick(slot),
            className: "!h-auto !py-2 !px-1 whitespace-nowrap",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: dateLabel }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: slot.time })
            ] })
          }
        )
      },
      "".concat(slot.datetime, "-").concat(index)
    );
  }) }) });
}
function WorkerItem({ worker }) {
  var _a, _b;
  const { t } = useTranslation();
  const { push } = useIonRouter();
  const reservationUrl = getReservationUrlWithParams({
    worker: worker.id.toString(),
    step: "1"
  });
  const {
    data: slotsResult,
    isLoading,
    isFetching
  } = useGetWorkerNextSlotsQuery(
    { workerId: worker.id, locationSlug: activeLocation },
    { skip: !worker.id || !activeLocation }
  );
  const hasSlots = ((_a = slotsResult == null ? void 0 : slotsResult.data) == null ? void 0 : _a.slots) && slotsResult.data.slots.length > 0;
  const shouldShowSlotsSection = hasSlots || isLoading || isFetching;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(IonCard, { className: "m-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { className: "p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConditionalComponent,
        {
          condition: !!((_b = worker.avatar) == null ? void 0 : _b.pathByResolution),
          render: () => /* @__PURE__ */ jsxRuntimeExports.jsx(
            LazyLoadImgStandard,
            {
              src: getPathBySize(worker.avatar.pathByResolution),
              preloadImg: preloadCoverImg$1,
              className: "aspect-square w-24 h-24 rounded-lg object-cover cursor-pointer",
              onClick: () => {
                push(reservationUrl);
              }
            }
          ),
          renderElse: () => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-lg bg-gray-700 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400 text-2xl", children: "👤" }) })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100",
            children: worker.fullName
          }
        ),
        worker.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-400 dark:text-gray-500 line-clamp-1 mb-2", children: worker.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          IonButton,
          {
            color: "dark",
            size: "small",
            className: "mt-2",
            routerLink: reservationUrl,
            children: t("Zakažite")
          }
        )
      ] })
    ] }),
    worker.id && shouldShowSlotsSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      WorkerNextSlots,
      {
        workerId: worker.id,
        locationSlug: activeLocation
      }
    ) })
  ] }) });
}
const WorkerItem$1 = reactExports.memo(WorkerItem);
function WorkersList({ locationSlug }) {
  const { data: workersResult, isLoading: workersLoading } = useGetFeWorkersQuery({ locationSlug });
  if (workersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SceletonLoader, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: workersResult == null ? void 0 : workersResult.data.map((worker) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerItem$1, { worker }, worker.id)) });
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
