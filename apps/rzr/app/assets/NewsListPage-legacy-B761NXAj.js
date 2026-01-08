;
(function () {
  System.register(['./vendor_react-legacy-CFXrDSu1.js', './vendor_ionic-legacy-kFTPXAWE.js', './news.fe-services-legacy-ByMtuCkR.js', './App-legacy-DT3CUYN8.js', './Pagination-legacy-BxNr8-04.js', './vendor_leaflet-legacy-DzrMDhpu.js', './index-legacy-D7f7Ap3o.js', './vendor_firebase-legacy-BISQ33kA.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonButton, IonIcon, addOutline, IonCardContent, IonItem, IonLabel, IonBadge, IonText, megaphoneOutline, alertOutline, timeOutline, closeCircleOutline, checkmarkCircleOutline, useGetNewsListQuery, activeLocation, LayoutMainPage, urlPrefix, Pagination;
    return {
      setters: [module => {
        useTranslation = module.a3;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.al;
        IonSpinner = module.n;
        IonCard = module.a$;
        IonCardHeader = module.b1;
        IonCardTitle = module.b2;
        IonButton = module.d;
        IonIcon = module.l;
        addOutline = module.a7;
        IonCardContent = module.b0;
        IonItem = module.q;
        IonLabel = module.F;
        IonBadge = module.b4;
        IonText = module.c;
        megaphoneOutline = module.aN;
        alertOutline = module.bx;
        timeOutline = module.ae;
        closeCircleOutline = module.bu;
        checkmarkCircleOutline = module.b3;
      }, module => {
        useGetNewsListQuery = module.u;
      }, module => {
        activeLocation = module.m;
        LayoutMainPage = module.L;
        urlPrefix = module.f;
      }, module => {
        Pagination = module.P;
      }, null, null, null],
      execute: function () {
        exports("default", NewsListPage);
        const ITEMS_PER_PAGE = 10;
        function NewsListPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [currentPage, setCurrentPage] = reactExports.useState(1);
          const [filters, setFilters] = reactExports.useState({
            type: void 0,
            status: void 0
          });
          const {
            data,
            isLoading
          } = useGetNewsListQuery({
            locationSlug: activeLocation,
            page: currentPage,
            perPage: ITEMS_PER_PAGE,
            ...filters
          });
          const handleCreateNews = () => {
            router.push(`${urlPrefix}/podesavanja/vesti/novo`);
          };
          const handleEditNews = newsId => {
            router.push(`${urlPrefix}/podesavanja/vesti/edit/${newsId}`);
          };
          const getTypeIcon = type => {
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
          const getStatusIcon = status => {
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
          const getStatusColor = status => {
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
          const getLevelColor = level => {
            if (level >= 8) return "danger";
            if (level >= 6) return "warning";
            if (level >= 4) return "primary";
            return "medium";
          };
          if (isLoading) return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
          const totalPages = data?.data?.lastPage || 1;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Vesti i važna saopštenja"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                    children: t("Lista vesti")
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    size: "small",
                    onClick: handleCreateNews,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), t("Nova vest")]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                children: [data?.data?.data?.map(news => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  button: true,
                  onClick: () => handleEditNews(news.id),
                  className: "border-t border-gray-200",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: getTypeIcon(news.type),
                    slot: "start"
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                      children: news.title
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: news.description
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "flex gap-2 mt-2",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonBadge, {
                        color: getLevelColor(news.level),
                        children: [t("Nivo"), ": ", news.level]
                      }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonBadge, {
                        color: getStatusColor(news.status),
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: getStatusIcon(news.status)
                        }), t(news.status)]
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                        color: "primary",
                        children: t(news.type)
                      })]
                    })]
                  })]
                }, news.id)), data?.data?.data?.length === 0 && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-text-center ion-padding",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: t("Nema vesti")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
                  currentPage,
                  totalPages,
                  onPageChange: setCurrentPage,
                  isLoading,
                  className: "ion-padding-top"
                })]
              })]
            })
          });
        }
      }
    };
  });
})();
