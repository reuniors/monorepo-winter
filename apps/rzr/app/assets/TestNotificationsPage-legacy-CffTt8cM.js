;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './vendor_ionic-legacy-DvZl6sBE.js', './App-legacy-CRCzN3kk.js', './test-notification.services-legacy-CWMr7IHW.js', './vendor_leaflet-legacy-DUCVU90d.js', './index-legacy-CYMNsaJ2.js', './vendor_firebase-legacy-tNokQwyN.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, useTranslation, reactExports, IonItem, IonAvatar, IonLabel, IonBadge, IonIcon, chevronForwardOutline, useIonRouter, IonSearchbar, IonSpinner, IonText, IonList, activeLocation, Pagination, urlPrefix, useGetAdminUsersQuery;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
        useTranslation = module.M;
        reactExports = module.e;
      }, module => {
        IonItem = module.r;
        IonAvatar = module.bv;
        IonLabel = module.G;
        IonBadge = module.ba;
        IonIcon = module.b;
        chevronForwardOutline = module.a4;
        useIonRouter = module.ao;
        IonSearchbar = module.F;
        IonSpinner = module.o;
        IonText = module.m;
        IonList = module.H;
      }, module => {
        activeLocation = module.n;
        Pagination = module.P;
        urlPrefix = module.g;
      }, module => {
        useGetAdminUsersQuery = module.u;
      }, null, null, null],
      execute: function () {
        exports("default", TestNotificationsPage);
        function UserListItem({
          user,
          onClick
        }) {
          const getInitials = name => {
            const parts = name.trim().split(" ");
            if (parts.length >= 2) {
              return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
            }
            return name.substring(0, 2).toUpperCase();
          };
          const initials = getInitials(user.fullName);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            button: true,
            onClick,
            detail: false,
            lines: "none",
            className: "mb-2",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
              slot: "start",
              className: "w-12 h-12",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold",
                children: initials
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                className: "text-base font-semibold",
                children: user.fullName
              }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex flex-col gap-1 mt-1",
                children: [user.email && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: user.email
                }), user.phoneNumber && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "text-sm text-gray-600 dark:text-gray-400",
                  children: user.phoneNumber
                })]
              })]
            }), user.hasConnectedDevices && /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
              color: "success",
              slot: "end",
              className: "mr-2",
              children: "Uređaji"
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              slot: "end",
              icon: chevronForwardOutline
            })]
          });
        }
        function TestNotificationsPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [searchText, setSearchText] = reactExports.useState("");
          const [currentPage, setCurrentPage] = reactExports.useState(1);
          const perPage = 20;
          const {
            data,
            isLoading,
            error
          } = useGetAdminUsersQuery({
            locationSlug: activeLocation,
            page: currentPage,
            perPage,
            search: searchText || void 0
          });
          const handleUserClick = userId => {
            router.push(`${urlPrefix}/podesavanja/test-notifikacije/${userId}`);
          };
          const handleSearch = e => {
            setSearchText(e.detail.value || "");
            setCurrentPage(1);
          };
          const totalPages = data?.data?.lastPage || 1;
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "max-w-4xl mx-auto",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "mb-4",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSearchbar, {
                  value: searchText,
                  onIonInput: handleSearch,
                  placeholder: t("Pretraži korisnike..."),
                  debounce: 500
                })
              }), isLoading && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex justify-center items-center py-8",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
              }), error && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "text-center py-8",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "danger",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    children: t("Greška pri učitavanju korisnika")
                  })
                })
              }), !isLoading && !error && data?.data?.data && /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                children: data.data.data.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center py-8",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Nema korisnika")
                    })
                  })
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                    className: "bg-transparent",
                    children: data.data.data.map(user => /* @__PURE__ */jsxRuntimeExports.jsx(UserListItem, {
                      user,
                      onClick: () => handleUserClick(user.id)
                    }, user.id))
                  }), totalPages > 1 && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "mt-6",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(Pagination, {
                      currentPage,
                      totalPages,
                      onPageChange: setCurrentPage,
                      isLoading
                    })
                  })]
                })
              })]
            })
          });
        }
      }
    };
  });
})();
