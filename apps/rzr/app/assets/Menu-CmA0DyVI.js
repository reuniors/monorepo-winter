import { aD as useTranslation, v as instance, j as jsxRuntimeExports, n as withRouter, aJ as useLocation, e as reactExports } from "./vendor_react-AVDGa64O.js";
import { l as IonIcon, b7 as globe, w as IonSelect, x as IonSelectOption, b8 as IonMenu, b as IonContent, F as IonList, al as IonListHeader, b9 as IonMenuToggle, q as IonItem, aB as logInOutline, ba as powerOutline, o as IonFooter, E as IonLabel, bb as home, aS as alarmOutline, aG as settingsOutline, aT as personOutline, aJ as notificationsOutline } from "./vendor_ionic-DxHtCw90.js";
import { u as useAppDispatch, a as useAppDispatch$1, b as useUser, c as useAppSelector, d as useRemoveConnectedDeviceMutation, i as isPwa, e as isIos, f as urlPrefix } from "./App-XFq6fpYq.js";
import { s as sharedApi, T as TagType, k as getDeviceData, r as rzrApi, o as TagType$1, j as setShowLoginModal } from "./index-C53w0MWC.js";
import "./vendor_leaflet-Cvlut8nW.js";
import "./vendor_firebase-Chyyt7SL.js";
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
  languageNames: languageNames2
}) => {
  var _a;
  useTranslation();
  const dispatch = useAppDispatch();
  if (!instance.isInitialized || !instance.options.supportedLngs || instance.options.supportedLngs.length === 0) {
    return null;
  }
  const changeLanguage = (lng) => {
    instance.changeLanguage(lng).then(() => {
      dispatch(sharedApi.util.invalidateTags([TagType.APP_LANG]));
      onLanguageChange == null ? void 0 : onLanguageChange(lng);
    });
  };
  const availableLanguages = ((_a = instance.options.supportedLngs) == null ? void 0 : _a.filter((lang) => lang !== "cimode")) || [];
  const currentLanguage = instance.language || instance.options.fallbackLng;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: globe, color: "warning" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonSelect,
      {
        "aria-label": "Izbor jezika",
        interface: "popover",
        value: currentLanguage,
        onIonChange: (e) => changeLanguage(e.detail.value),
        className: "flex-1",
        children: availableLanguages.map((langCode) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonSelectOption, { value: langCode, children: (languageNames2 == null ? void 0 : languageNames2[langCode]) || langCode }, langCode))
      }
    )
  ] });
};
function LogoIcon({ className }) {
  const basePath = "/app/";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      src: "".concat(basePath, "public/projects/rzr/images/logo-big.png"),
      alt: "Logo",
      className: "bg-blue-100 ".concat(className)
    }
  );
}
const routes = {
  appPages: [
    {
      title: "Home",
      path: "home",
      icon: home
    },
    {
      title: "Termini",
      path: "termini",
      icon: alarmOutline
    },
    {
      title: "Podešavanja",
      path: "podesavanja",
      icon: settingsOutline
    }
  ],
  userPages: [
    { title: "Profil", path: "profil", icon: personOutline },
    {
      title: "Notifikacije",
      path: "notifikacije",
      icon: notificationsOutline
    }
  ]
};
const Menu = ({ history }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useAppDispatch$1();
  const { userData, logoutUser } = useUser();
  const device = useAppSelector(getDeviceData);
  const menuRef = reactExports.useRef(null);
  const [removeConnectedDevice] = useRemoveConnectedDeviceMutation();
  function renderListItems(list) {
    return list.filter((route) => !!route.path).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(IonMenuToggle, { "auto-hide": "false", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      IonItem,
      {
        detail: false,
        routerLink: "".concat(urlPrefix, "/t/").concat(p.path),
        routerDirection: "none",
        className: location.pathname.endsWith(p.path) ? "selected" : void 0,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "start", icon: p.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { children: t(p.title) })
        ]
      }
    ) }, p.title));
  }
  const handleLogout = () => {
    if (device.notificationsToken) {
      removeConnectedDevice({
        token: device == null ? void 0 : device.notificationsToken
      });
    }
    logoutUser();
  };
  const handleLogin = () => {
    dispatch(setShowLoginModal(true));
  };
  const handleLanguageChange = (lng) => {
    var _a;
    dispatch(rzrApi.util.invalidateTags([TagType$1.APP_LANG]));
    (_a = menuRef.current) == null ? void 0 : _a.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    IonMenu,
    {
      ref: menuRef,
      type: "overlay",
      disabled: false,
      contentId: "main",
      className: "border-r-2 border-black",
      swipeGesture: !isIos && isPwa,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(IonContent, { class: "ion-no-padding", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            LanguageSelector,
            {
              onLanguageChange: handleLanguageChange,
              languageNames
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IonList, { lines: "none", inset: false, className: "mt-0 pt-0", children: renderListItems(routes.appPages) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(IonList, { lines: "none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonListHeader, { children: t("Nalog") }),
            renderListItems(routes.userPages),
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonMenuToggle, { "auto-hide": "false", children: !userData ? /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { detail: false, button: true, onClick: handleLogin, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "start", icon: logInOutline }),
              t("Uloguj se")
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { button: true, onClick: handleLogout, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { slot: "start", icon: powerOutline }),
              t("Izloguj se")
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/registracija-rezervacija", className: "contents", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogoIcon, { className: "px-2" }) }) })
      ]
    }
  );
};
const Menu$1 = withRouter(Menu);
export {
  Menu$1 as default
};
