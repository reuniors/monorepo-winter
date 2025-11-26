;
(function () {
  System.register(['./vendor_react-legacy-Dr5RK8rs.js', './vendor_ionic-legacy-BouRDOo5.js', './news.fe-services-legacy-D3k1ueXh.js', './App-legacy-COHPHKDC.js', './Pagination-legacy-DSjEne2Z.js', './vendor_leaflet-legacy-5Hsu9Ykl.js', './index-legacy-BHIGnBEX.js', './vendor_firebase-legacy-DZHWzyZG.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, useIonRouter, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonBadge, IonText, IonButton, addOutline, megaphoneOutline, alertOutline, timeOutline, closeCircleOutline, checkmarkCircleOutline, useGetNewsListQuery, activeLocation, LayoutMainPage, urlPrefix, Pagination;
    return {
      setters: [module => {
        useTranslation = module.aD;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        IonSpinner = module.n;
        IonCard = module.aS;
        IonCardHeader = module.aU;
        IonCardTitle = module.aV;
        IonCardContent = module.aW;
        IonItem = module.q;
        IonIcon = module.l;
        IonLabel = module.E;
        IonBadge = module.a_;
        IonText = module.c;
        IonButton = module.d;
        addOutline = module.a6;
        megaphoneOutline = module.aG;
        alertOutline = module.bj;
        timeOutline = module.ae;
        closeCircleOutline = module.bk;
        checkmarkCircleOutline = module.b4;
      }, module => {
        useGetNewsListQuery = module.u;
      }, module => {
        activeLocation = module.h;
        LayoutMainPage = module.s;
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
            footer: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              onClick: handleCreateNews,
              color: "dark",
              size: "large",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: addOutline,
                slot: "start"
              }), t("Nova vest")]
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                  children: t("Lista vesti")
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
