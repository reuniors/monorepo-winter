;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './vendor_ionic-legacy-DYIGQWbn.js', './App-legacy-DiiuRRmT.js', './index-legacy-ClYp8cKz.js', './vendor_leaflet-legacy-DKuaEqMF.js', './vendor_firebase-legacy-Bicf26rb.js'], function (exports, module) {
    'use strict';

    var useTranslation, instance, jsxRuntimeExports, withRouter, useLocation, reactExports, IonIcon, globe, IonSelect, IonSelectOption, IonMenu, IonContent, IonList, IonListHeader, IonMenuToggle, IonItem, logInOutline, powerOutline, IonFooter, IonLabel, home, alarmOutline, settingsOutline, personOutline, notificationsOutline, useAppDispatch, useAppDispatch$1, useUser, useAppSelector, useRemoveConnectedDeviceMutation, isPwa, isIos, urlPrefix, sharedApi, TagType, getDeviceData, rzrApi, TagType$1, setShowLoginModal;
    return {
      setters: [module => {
        useTranslation = module.aD;
        instance = module.v;
        jsxRuntimeExports = module.j;
        withRouter = module.n;
        useLocation = module.aJ;
        reactExports = module.e;
      }, module => {
        IonIcon = module.l;
        globe = module.b6;
        IonSelect = module.w;
        IonSelectOption = module.x;
        IonMenu = module.b7;
        IonContent = module.b;
        IonList = module.F;
        IonListHeader = module.al;
        IonMenuToggle = module.b8;
        IonItem = module.q;
        logInOutline = module.aB;
        powerOutline = module.b9;
        IonFooter = module.o;
        IonLabel = module.E;
        home = module.ba;
        alarmOutline = module.aS;
        settingsOutline = module.aG;
        personOutline = module.aT;
        notificationsOutline = module.aJ;
      }, module => {
        useAppDispatch = module.u;
        useAppDispatch$1 = module.a;
        useUser = module.b;
        useAppSelector = module.c;
        useRemoveConnectedDeviceMutation = module.d;
        isPwa = module.i;
        isIos = module.e;
        urlPrefix = module.f;
      }, module => {
        sharedApi = module.s;
        TagType = module.T;
        getDeviceData = module.k;
        rzrApi = module.r;
        TagType$1 = module.o;
        setShowLoginModal = module.j;
      }, null, null],
      execute: function () {
        var __vite_style__ = document.createElement('style');
        __vite_style__.textContent = "ion-menu ion-content {\n  --padding-top: 20px;\n  --padding-bottom: 20px;\n\n  --background: var(--ion-item-background, var(--ion-background-color, #fff));\n}\n\n/* Remove background transitions for switching themes */\nion-menu ion-item {\n  --transition: none;\n}\n\nion-item.selected {\n  --color: var(--ion-color-primary);\n}\n\n/*\n * Material Design Menu\n*/\nion-menu.md ion-list {\n  padding: 20px 0;\n}\n\nion-menu.md ion-list-header {\n  padding-left: 18px;\n  padding-right: 18px;\n\n  text-transform: uppercase;\n  letter-spacing: .1em;\n  font-weight: 450;\n}\n\nion-menu.md ion-item {\n  --padding-start: 18px;\n\n  margin-right: 10px;\n\n  border-radius: 0 50px 50px 0;\n\n  font-weight: 500;\n}\n\nion-menu.md ion-item.selected {\n  --background: rgba(var(--ion-color-primary-rgb), 0.14);\n}\n\nion-menu.md ion-item.selected ion-icon {\n  color: var(--ion-color-primary);\n}\n\nion-menu.md ion-list-header,\nion-menu.md ion-item ion-icon {\n  color: var(--ion-color-step-650, #5f6368);\n}\n\nion-menu.md ion-list:not(:last-of-type) {\n  border-bottom: 1px solid var(--ion-color-step-150, #d7d8da);\n}\n\n\n/*\n * iOS Menu\n*/\nion-menu.ios ion-list-header {\n  padding-left: 16px;\n  padding-right: 16px;\n\n  margin-bottom: 8px;\n}\n\nion-menu.ios ion-list {\n  padding: 20px 0 0;\n}\n\nion-menu.ios ion-item {\n  --padding-start: 16px;\n  --min-height: 50px;\n}\n\nion-menu.ios ion-item ion-icon {\n  font-size: 24px;\n  color: #73849a;\n}\n\nion-menu.ios ion-item.selected ion-icon {\n  color: var(--ion-color-primary);\n}\n/*$vite$:1*/";
        document.head.appendChild(__vite_style__);
        const languageNames = {
          eng: "English",
          rs: "Srpski",
          en: "English",
          sr: "Srpski",
          de: "Deutsch",
          fr: "Français",
          es: "Español",
          it: "Italiano",
          pt: "Português",
          ru: "Русский",
          zh: "中文",
          ja: "日本語",
          ko: "한국어",
          ar: "العربية",
          hi: "हिन्दी",
          tr: "Türkçe",
          pl: "Polski",
          nl: "Nederlands",
          sv: "Svenska",
          da: "Dansk",
          no: "Norsk",
          fi: "Suomi",
          cs: "Čeština",
          sk: "Slovenčina",
          hu: "Magyar",
          ro: "Română",
          bg: "Български",
          hr: "Hrvatski",
          sl: "Slovenščina",
          et: "Eesti",
          lv: "Latviešu",
          lt: "Lietuvių",
          el: "Ελληνικά",
          he: "עברית",
          th: "ไทย",
          vi: "Tiếng Việt",
          id: "Bahasa Indonesia",
          ms: "Bahasa Melayu",
          tl: "Filipino",
          uk: "Українська",
          be: "Беларуская",
          ka: "ქართული",
          hy: "Հայերեն",
          az: "Azərbaycan",
          kk: "Қазақ",
          ky: "Кыргыз",
          uz: "Oʻzbek",
          tg: "Тоҷикӣ",
          mn: "Монгол",
          my: "မြန်မာ",
          km: "ខ្មែរ",
          lo: "ລາວ",
          si: "සිංහල",
          ne: "नेपाली",
          bn: "বাংলা",
          gu: "ગુજરાતી",
          pa: "ਪੰਜਾਬੀ",
          ta: "தமிழ்",
          te: "తెలుగు",
          kn: "ಕನ್ನಡ",
          ml: "മലയാളം",
          or: "ଓଡ଼ିଆ",
          as: "অসমীয়া",
          mr: "मराठी",
          sa: "संस्कृत",
          ur: "اردو",
          fa: "فارسی",
          ps: "پښتو",
          sd: "سنڌي",
          cimode: "Developer Mode"
        };
        const LanguageSelector = ({
          onLanguageChange,
          languageNames
        }) => {
          useTranslation();
          const dispatch = useAppDispatch();
          if (!instance.isInitialized || !instance.options.supportedLngs || instance.options.supportedLngs.length === 0) {
            return null;
          }
          const changeLanguage = lng => {
            instance.changeLanguage(lng).then(() => {
              dispatch(sharedApi.util.invalidateTags([TagType.APP_LANG]));
              onLanguageChange?.(lng);
            });
          };
          const availableLanguages = instance.options.supportedLngs?.filter(lang => lang !== "cimode") || [];
          const currentLanguage = instance.language || instance.options.fallbackLng;
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "flex items-center gap-2",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
              icon: globe,
              color: "warning"
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelect, {
              "aria-label": "Izbor jezika",
              interface: "popover",
              value: currentLanguage,
              onIonChange: e => changeLanguage(e.detail.value),
              className: "flex-1",
              children: availableLanguages.map(langCode => /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                value: langCode,
                children: languageNames?.[langCode] || langCode
              }, langCode))
            })]
          });
        };
        function LogoIcon({
          className
        }) {
          const basePath = "/app/";
          return /* @__PURE__ */jsxRuntimeExports.jsx("img", {
            src: `${basePath}public/projects/rzr/images/logo-big.png`,
            alt: "Logo",
            className: `bg-blue-100 ${className}`
          });
        }
        const routes = {
          appPages: [{
            title: "Home",
            path: "home",
            icon: home
          }, {
            title: "Termini",
            path: "termini",
            icon: alarmOutline
          }, {
            title: "Podešavanja",
            path: "podesavanja",
            icon: settingsOutline
          }],
          userPages: [{
            title: "Profil",
            path: "profil",
            icon: personOutline
          }, {
            title: "Notifikacije",
            path: "notifikacije",
            icon: notificationsOutline
          }]
        };
        const Menu = ({
          history
        }) => {
          const {
            t
          } = useTranslation();
          const location = useLocation();
          const dispatch = useAppDispatch$1();
          const {
            userData,
            logoutUser
          } = useUser();
          const device = useAppSelector(getDeviceData);
          const menuRef = reactExports.useRef(null);
          const [removeConnectedDevice] = useRemoveConnectedDeviceMutation();
          function renderListItems(list) {
            return list.filter(route => !!route.path).map(p => /* @__PURE__ */jsxRuntimeExports.jsx(IonMenuToggle, {
              "auto-hide": "false",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                detail: false,
                routerLink: `${urlPrefix}/t/${p.path}`,
                routerDirection: "none",
                className: location.pathname.endsWith(p.path) ? "selected" : void 0,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "start",
                  icon: p.icon
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t(p.title)
                })]
              })
            }, p.title));
          }
          const handleLogout = () => {
            if (device.notificationsToken) {
              removeConnectedDevice({
                token: device?.notificationsToken
              });
            }
            logoutUser();
          };
          const handleLogin = () => {
            dispatch(setShowLoginModal(true));
          };
          const handleLanguageChange = lng => {
            dispatch(rzrApi.util.invalidateTags([TagType$1.APP_LANG]));
            menuRef.current?.close();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonMenu, {
            ref: menuRef,
            type: "overlay",
            disabled: false,
            contentId: "main",
            className: "border-r-2 border-black",
            swipeGesture: !isIos && isPwa,
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
              class: "ion-no-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "mt-4 px-4",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(LanguageSelector, {
                  onLanguageChange: handleLanguageChange,
                  languageNames
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                lines: "none",
                inset: false,
                className: "mt-0 pt-0",
                children: renderListItems(routes.appPages)
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                lines: "none",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonListHeader, {
                  children: t("Nalog")
                }), renderListItems(routes.userPages), /* @__PURE__ */jsxRuntimeExports.jsx(IonMenuToggle, {
                  "auto-hide": "false",
                  children: !userData ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    detail: false,
                    button: true,
                    onClick: handleLogin,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      slot: "start",
                      icon: logInOutline
                    }), t("Uloguj se")]
                  }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    onClick: handleLogout,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      slot: "start",
                      icon: powerOutline
                    }), t("Izloguj se")]
                  })
                })]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx("a", {
                href: `/registracija-rezervacija`,
                className: "contents",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(LogoIcon, {
                  className: "px-2"
                })
              })
            })]
          });
        };
        const Menu$1 = exports("default", withRouter(Menu));
      }
    };
  });
})();
