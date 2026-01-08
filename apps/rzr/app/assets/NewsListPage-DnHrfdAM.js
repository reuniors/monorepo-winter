import { a3 as useTranslation, e as reactExports, j as jsxRuntimeExports } from "./vendor_react-LOGlbA9o.js";
import { al as useIonRouter, n as IonSpinner, a$ as IonCard, b1 as IonCardHeader, b2 as IonCardTitle, d as IonButton, l as IonIcon, a7 as addOutline, b0 as IonCardContent, q as IonItem, F as IonLabel, b4 as IonBadge, c as IonText, aN as megaphoneOutline, bx as alertOutline, ae as timeOutline, bu as closeCircleOutline, b3 as checkmarkCircleOutline } from "./vendor_ionic-D94VuZ44.js";
import { u as useGetNewsListQuery } from "./news.fe-services-ByKBkhA1.js";
import { m as activeLocation, L as LayoutMainPage, f as urlPrefix } from "./App-Byz-BlJA.js";
import { P as Pagination } from "./Pagination-CTyTKUPM.js";
import "./vendor_leaflet-DPGBd-b-.js";
import "./index-DB6rcYif.js";
import "./vendor_firebase-BP40AiT5.js";
const ITEMS_PER_PAGE = 10;
function NewsListPage() {
  var _a, _b, _c, _d, _e;
  const { t } = useTranslation();
  const router = useIonRouter();
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [filters, setFilters] = reactExports.useState({
    type: void 0,
    status: void 0
  });
  const { data, isLoading } = useGetNewsListQuery({
    locationSlug: activeLocation,
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
    ...filters
  });
  const handleCreateNews = () => {
    router.push("".concat(urlPrefix, "/podesavanja/vesti/novo"));
  };
  const handleEditNews = (newsId) => {
    router.push("".concat(urlPrefix, "/podesavanja/vesti/edit/").concat(newsId));
  };
  const getTypeIcon = (type) => {
    switch (type) {
      case "news":
        return megaphoneOutline;
      case "chyron":
        return timeOutline;
      case "alert":
        return alertOutline;
      default:
        return megaphoneOutline;
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return checkmarkCircleOutline;
      case "pending":
        return timeOutline;
      case "draft":
        return closeCircleOutline;
      default:
        return closeCircleOutline;
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "draft":
        return "medium";
      default:
        return "medium";
    }
  };
  const getLevelColor = (level) => {
    if (level >= 8) return "danger";
    if (level >= 6) return "warning";
    if (level >= 4) return "primary";
    return "medium";
  };
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  const totalPages = ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.lastPage) || 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LayoutMainPage,
    {
      title: t("Vesti i važna saopštenja"),
      hasBackButton: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardTitle, { children: t("Lista vesti") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonButton,
            {
              size: "small",
              onClick: handleCreateNews,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: addOutline, slot: "start" }),
                t("Nova vest")
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardContent, { children: [
          (_c = (_b = data == null ? void 0 : data.data) == null ? void 0 : _b.data) == null ? void 0 : _c.map((news) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            IonItem,
            {
              button: true,
              onClick: () => handleEditNews(news.id),
              className: "border-t border-gray-200",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: getTypeIcon(news.type), slot: "start" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(IonLabel, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: news.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: news.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { color: getLevelColor(news.level), children: [
                      t("Nivo"),
                      ": ",
                      news.level
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonBadge, { color: getStatusColor(news.status), children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: getStatusIcon(news.status) }),
                      t(news.status)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IonBadge, { color: "primary", children: t(news.type) })
                  ] })
                ] })
              ]
            },
            news.id
          )),
          ((_e = (_d = data == null ? void 0 : data.data) == null ? void 0 : _d.data) == null ? void 0 : _e.length) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "medium", children: t("Nema vesti") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pagination,
            {
              currentPage,
              totalPages,
              onPageChange: setCurrentPage,
              isLoading,
              className: "ion-padding-top"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  NewsListPage as default
};
