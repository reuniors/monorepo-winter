const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/App-CNuYiPPZ.js","assets/vendor_ionic-7y52xm55.js","assets/vendor_react-CMjr4Gvv.js","assets/vendor_leaflet-0lyiJUDC.js","assets/vendor_leaflet-Bvr-Ab8i.css","assets/vendor_react-Z09ODb1v.css","assets/vendor_ionic-D7N1wSx9.css","assets/vendor_firebase-BM_4Mc6z.js","assets/App--SOcKfRT.css"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
function __vite_legacy_guard() {
  import.meta.url;
  import("_").catch(() => 1);
  (async function* () {
  })().next();
}
;
import { I as IonPage, b as IonContent, c as IonText, d as IonButton, _ as __vitePreload, e as defineCustomElements } from "./vendor_ionic-7y52xm55.js";
import { v as instance, x as Backend, y as Browser, z as initReactI18next, A as fetchBaseQuery, C as gBase64, D as createApi, E as createAction, F as createSlice, G as humpsExports, I as isRejectedWithValue, J as combineReducers, K as configureStore, j as jsxRuntimeExports, L as persistStore, M as persistReducer, N as FLUSH, O as REHYDRATE, P as PAUSE, Q as PERSIST, S as PURGE, T as REGISTER, U as storage, e as reactExports, V as clientExports, W as Provider, X as PersistGate, Y as ErrorBoundary } from "./vendor_react-CMjr4Gvv.js";
import "./vendor_leaflet-0lyiJUDC.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) return;
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) processPreload(link);
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") continue;
      for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
    }
  }).observe(document, {
    childList: true,
    subtree: true
  });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep) return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
instance.use(Backend).use(Browser).use(initReactI18next);
var AuthType = /* @__PURE__ */ ((AuthType2) => {
  AuthType2["SANCTUM"] = "sanctum";
  AuthType2["TEST"] = "test";
  AuthType2["NO_AUTH"] = "noAuth";
  return AuthType2;
})(AuthType || {});
var TagType$1 = /* @__PURE__ */ ((TagType2) => {
  TagType2["LOCATION"] = "location";
  TagType2["QUESTIONNAIRE"] = "questionnaire";
  TagType2["QUESTIONNAIRE_DATA"] = "questionnaireData";
  TagType2["QUESTIONNAIRE_DATA_DRAFT"] = "questionnaireDataDraft";
  TagType2["QUESTIONNAIRE_RESTAURANT_MENU"] = "restaurantMenu";
  TagType2["TAGS"] = "tags";
  TagType2["TAG_GROUPS"] = "tagGroups";
  TagType2["QA_QUESTION"] = "qaQuestion";
  TagType2["USER"] = "users";
  TagType2["APP_LANG"] = "appLang";
  TagType2["TRANSLATIONS"] = "translations";
  TagType2["CHANGE_REQUESTS"] = "changeRequests";
  TagType2["USER_ADDRESS"] = "userAddress";
  TagType2["USER_SETTINGS"] = "userSettings";
  TagType2["FOOD_ORDER"] = "foodOrder";
  TagType2["ADMIN_USERS"] = "AdminUsers";
  TagType2["USER_DEVICES"] = "UserDevices";
  return TagType2;
})(TagType$1 || {});
var TagId$1 = /* @__PURE__ */ ((TagId2) => {
  TagId2["LIST"] = "LIST";
  return TagId2;
})(TagId$1 || {});
const mainBaseQuery = (args, api, extraOptions, baseUrl) => fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const appLang = instance.language === "eng" ? "en" : instance.language;
    headers.set("App-Lang", appLang);
    if (extraOptions.auth) {
      switch (extraOptions.auth) {
        case AuthType.TEST: {
          const basicToken = "".concat(void 0);
          headers.set("Authorization", "Basic ".concat(gBase64.encode(basicToken)));
          break;
        }
        case AuthType.NO_AUTH:
          break;
        case AuthType.SANCTUM: {
          const state = getState();
          const token = state.user.token;
          headers.set("Authorization", "Bearer ".concat(token));
          break;
        }
        default:
          headers.set("Authorization", "Bearer ".concat(extraOptions.token));
          break;
      }
    }
    return headers;
  },
  paramsSerializer: "1" ? (params) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== void 0 && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    return searchParams.toString();
  } : void 0
})(args, api, extraOptions);
function customBaseQuery(baseUrl) {
  const customBaseQuery2 = async (args, api, extraOptions = {}) => {
    extraOptions = { auth: AuthType.SANCTUM, ...extraOptions };
    return await mainBaseQuery(args, api, extraOptions, baseUrl);
  };
  return customBaseQuery2;
}
const apiBaseUrl = "/api/v1";
const sharedApiPrefix = "";
const sharedApi = createApi({
  reducerPath: "sharedApi",
  baseQuery: customBaseQuery(apiBaseUrl),
  tagTypes: [
    TagType$1.LOCATION,
    TagType$1.QUESTIONNAIRE,
    TagType$1.QUESTIONNAIRE_DATA,
    TagType$1.QUESTIONNAIRE_DATA_DRAFT,
    TagType$1.QUESTIONNAIRE_RESTAURANT_MENU,
    TagType$1.TAGS,
    TagType$1.TAG_GROUPS,
    TagType$1.QA_QUESTION,
    TagType$1.USER,
    TagType$1.APP_LANG,
    TagType$1.TRANSLATIONS,
    TagType$1.CHANGE_REQUESTS,
    TagType$1.USER_ADDRESS,
    TagType$1.USER_SETTINGS,
    TagType$1.FOOD_ORDER,
    TagType$1.ADMIN_USERS,
    TagType$1.USER_DEVICES
  ],
  endpoints: () => ({})
});
const logoutAction = createAction("LOGOUT");
const initialState$4 = {
  user: null
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState$4,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (action.payload.userHash !== void 0) {
          state.userHash = action.payload.userHash;
        }
      }
    },
    setUserHash: (state, action) => {
      state.userHash = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = void 0;
      state.userHash = void 0;
    },
    setShowCompleteProfileModal: (state, action) => {
      state.showCompleteProfileModal = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, (state) => {
      state.user = null;
      state.token = void 0;
      state.userHash = void 0;
    });
  }
});
const {
  setUser,
  updateUserData,
  removeUser,
  setShowCompleteProfileModal,
  setSettings,
  setUserHash
} = userSlice.actions;
const getUser = (state) => state.user.user;
const getUserHash = (state) => state.user.userHash;
const initialState$3 = {
  data: {
    themeMode: null,
    // null = system default
    loading: false,
    notifications: [],
    showLoginModal: void 0,
    showWorkingHeader: false,
    showCreatePostModal: void 0,
    showAddNewAddressModal: void 0,
    showNetworkErrorModal: void 0,
    imageModalData: void 0,
    openingTimes: [
      { day: "Monday", hours: "8:00 AM–11:45 PM" },
      { day: "Tuesday", hours: "8:00 AM–11:45 PM" },
      { day: "Wednesday", hours: "8:00 AM–11:45 PM" },
      { day: "Thursday", hours: "8:00 AM–11:45 PM" },
      { day: "Friday", hours: "8:00 AM–11:45 PM" },
      { day: "Saturday", hours: "8:00 AM–11:45 PM" },
      { day: "Sunday", hours: "8:00 AM–11:00 PM" }
    ],
    deliveryInformation: [
      { day: "Monday", hours: "9:00 AM–11:45 PM" },
      { day: "Tuesday", hours: "9:00 AM–11:45 PM" },
      { day: "Wednesday", hours: "9:00 AM–11:45 PM" },
      { day: "Thursday", hours: "9:00 AM–11:45 PM" },
      { day: "Friday", hours: "9:00 AM–11:45 PM" },
      { day: "Saturday", hours: "9:00 AM–11:45 PM" },
      { day: "Sunday", hours: "9:00 AM–11:00 PM" }
    ],
    searchQuery: "",
    filterType: null
  },
  popstateCallbackName: void 0
};
const uiSlices = createSlice({
  name: "ui",
  initialState: initialState$3,
  reducers: {
    setUiData(state, action) {
      state.data = {
        ...state.data,
        ...action.payload
      };
    },
    setThemeMode(state, action) {
      state.data.themeMode = action.payload;
    },
    setFilterType(state, action) {
      state.data.filterType = action.payload;
    },
    setLoading(state, action) {
      state.data.loading = action.payload;
    },
    setNotification(state, action) {
      state.data.notifications.push(action.payload);
    },
    setShowLoginModal(state, action) {
      state.data.showLoginModal = action.payload;
    },
    setShowCreatePostModal(state, action) {
      state.data.showCreatePostModal = action.payload;
    },
    setImageModalData(state, action) {
      state.data.imageModalData = action.payload;
    },
    closeImageModal(state) {
      if (state.data.imageModalData) {
        state.data.imageModalData.showModal = false;
      }
    },
    setPopstateCallbackName(state, action) {
      state.popstateCallbackName = action.payload;
    },
    changeSearchTerm(state, action) {
      state.data.searchQuery = action.payload;
    },
    setShowWorkingHeader(state, action) {
      state.data.showWorkingHeader = action.payload;
    },
    setShowAddNewAddressModal(state, action) {
      state.data.showAddNewAddressModal = action.payload;
    },
    setShowNetworkErrorModal(state, action) {
      state.data.showNetworkErrorModal = action.payload;
    }
  }
});
const getShowLoginModal = (state) => state.ui.data.showLoginModal;
const getShowImageModal = (state) => {
  var _a2;
  return (_a2 = state.ui.data.imageModalData) == null ? void 0 : _a2.showModal;
};
const getShowNetworkErrorModal = (state) => state.ui.data.showNetworkErrorModal;
const getImageModalData = (state) => state.ui.data.imageModalData;
const {
  setUiData,
  setThemeMode,
  setFilterType,
  setLoading,
  setNotification,
  setShowLoginModal,
  setShowCreatePostModal,
  setImageModalData,
  closeImageModal,
  setPopstateCallbackName,
  changeSearchTerm,
  setShowWorkingHeader,
  setShowAddNewAddressModal,
  setShowNetworkErrorModal
} = uiSlices.actions;
const initialData = window == null ? void 0 : window.__INIT_DATA__;
const initialDataLoaded = [];
function getInitialData(name, deleteAfterGet, camelCase = false) {
  var _a2;
  if (initialData && !initialDataLoaded.includes(name)) {
    initialDataLoaded.push(name);
    setTimeout(() => {
      deleteAfterGet && deleteInitialData(name);
    });
    if (camelCase && initialData[name]) {
      return humpsExports.camelizeKeys(initialData[name]);
    }
    return (_a2 = initialData[name]) != null ? _a2 : void 0;
  }
  return void 0;
}
function deleteInitialData(name) {
  if (initialData && initialDataLoaded.includes(name)) {
    delete initialData[name];
  }
}
var UploadType = /* @__PURE__ */ ((UploadType2) => {
  UploadType2["PHOTO"] = "photo";
  UploadType2["VIDEO"] = "video";
  UploadType2["FILE"] = "file";
  UploadType2["PDF"] = "pdf";
  return UploadType2;
})(UploadType || {});
var UploadingAlertType = /* @__PURE__ */ ((UploadingAlertType2) => {
  UploadingAlertType2["overlay"] = "overlay";
  UploadingAlertType2["modal"] = "modal";
  UploadingAlertType2["background"] = "background";
  return UploadingAlertType2;
})(UploadingAlertType || {});
const initialState$2 = {
  uploadingAlertType: UploadingAlertType.overlay,
  data: {
    files: []
  }
};
const uploadSlices = createSlice({
  name: "upload",
  initialState: initialState$2,
  reducers: {
    setUploadState: (state, action) => ({
      ...state,
      ...action.payload
    }),
    setUploadData(state, action) {
      state.data = {
        ...state.data,
        ...action.payload
      };
    },
    setUploadFiles(state, action) {
      state.data.files = action.payload;
    },
    setRequiredUploadData: (state, action) => ({
      ...state,
      ...action.payload
    }),
    resetUploadData: () => initialState$2
  }
});
const { setUploadState, resetUploadData, setRequiredUploadData } = uploadSlices.actions;
const initialState$1 = {
  code: void 0,
  qType: void 0
};
const routeSlice = createSlice({
  name: "route",
  initialState: initialState$1,
  reducers: {
    setRouteState: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});
const { setRouteState } = routeSlice.actions;
const initialState = {
  notificationsToken: null,
  // Push notifikacije su podrazumevano isključene dok ih korisnik eksplicitno ne uključi
  notificationsEnabled: false,
  swReady: false
};
const deviceSlice = createSlice({
  name: "device",
  initialState,
  reducers: {
    setDeviceData: (state, action) => ({
      ...state,
      ...action.payload
    }),
    resetDeviceData: () => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(logoutAction, () => initialState);
  }
});
const getDeviceData = (state) => state.device;
const { setDeviceData, resetDeviceData } = deviceSlice.actions;
const unauthorizedMiddleware = (store2) => (next) => (action) => {
  var _a2, _b, _c;
  if (isRejectedWithValue(action)) {
    const payload = action.payload;
    const state = store2.getState();
    if (((_a2 = state.user.user) == null ? void 0 : _a2.id) && (payload == null ? void 0 : payload.status) === 403 && ((_b = payload == null ? void 0 : payload.data) == null ? void 0 : _b.data) === "invalid token: permission denied") {
      store2.dispatch(logoutAction());
      (_c = sharedApi.util) == null ? void 0 : _c.invalidateTags([TagType$1.USER]);
    }
  }
  return next(action);
};
const rootReducer$1 = combineReducers({
  [sharedApi.reducerPath]: sharedApi.reducer,
  ui: uiSlices.reducer,
  user: userSlice.reducer,
  upload: uploadSlices.reducer,
  route: routeSlice.reducer,
  device: deviceSlice.reducer
});
configureStore({
  reducer: rootReducer$1,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    sharedApi.middleware,
    unauthorizedMiddleware
  ])
});
const initializeServiceWorker = () => {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  window.addEventListener("load", () => {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "[::1]" || window.location.hostname.startsWith("192.168.") || window.location.hostname.startsWith("10.") || window.location.port === "5173";
    if (isLocalhost) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) {
              console.log("SW unregistered in development/localhost mode");
            }
          });
        }
      });
      if ("caches" in window) {
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              return caches.delete(cacheName);
            })
          );
        });
      }
      return;
    } else {
      const registerSw = async () => {
        try {
          const registration = await navigator.serviceWorker.register(
            "/sw.js",
            {
              scope: "/"
            }
          );
          console.log("SW registered successfully:", registration);
        } catch (error) {
          console.error("SW registration failed:", error);
        }
      };
      registerSw();
    }
  });
};
const ErrorFallback = ({
  error,
  resetErrorBoundary
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { role: "alert", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white", children: "Something went wrong:" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "red" }, children: error.message }),
    resetErrorBoundary && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: resetErrorBoundary,
        className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
        children: "Try again"
      }
    )
  ] });
};
const fallbackRender = ({
  error,
  resetErrorBoundary
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorFallback, { error, resetErrorBoundary });
};
const projectName = "rzr";
const locale = getInitialData("locale");
const debug = false;
const fallbackLng = "rs";
instance.init({
  fallbackLng,
  debug,
  returnNull: false,
  supportedLngs: ["eng", "rs"],
  nonExplicitSupportedLngs: true,
  interpolation: {
    escapeValue: false
    // not needed for react as it escapes by default
  },
  backend: {
    loadPath: "".concat("/app/", "public/projects/").concat(projectName, "/locales/{{lng}}/{{ns}}.json")
  },
  ns: ["photoEditor", "translation"]
}).then(() => {
  if (locale && locale !== fallbackLng) {
    instance.changeLanguage(locale);
  }
});
var TagType = /* @__PURE__ */ ((TagType2) => {
  TagType2["LOCATION"] = "location";
  TagType2["RESERVATION"] = "reservation";
  TagType2["CLIENT"] = "client";
  TagType2["CLIENT_RESERVATION"] = "clientReservation";
  TagType2["LOCATION_WORKERS"] = "locationWorkers";
  TagType2["LOCATION_WORKING_HOURS"] = "locationWorkingHours";
  TagType2["WORKER_WORKING_HOURS"] = "workerWorkingHours";
  TagType2["SHIFT"] = "shift";
  TagType2["SHIFT_BY_DAYS"] = "shiftByDays";
  TagType2["USER"] = "user";
  TagType2["USER_NOTIFICATIONS"] = "user";
  TagType2["APP_LANG"] = "appLang";
  TagType2["NEWS"] = "news";
  TagType2["SERVICES_GROUPS"] = "servicesGroups";
  TagType2["SERVICES"] = "services";
  TagType2["LOCATION_PROMO_CODES"] = "locationPromoCodes";
  TagType2["TRANSLATIONS"] = "translations";
  TagType2["CHANGE_REQUESTS"] = "changeRequests";
  TagType2["ADMIN_USERS"] = "AdminUsers";
  TagType2["USER_DEVICES"] = "UserDevices";
  return TagType2;
})(TagType || {});
var TagId = /* @__PURE__ */ ((TagId2) => {
  TagId2["LIST"] = "LIST";
  return TagId2;
})(TagId || {});
const apiUrl = (_a = getInitialData("rzrApiUrl")) != null ? _a : "/api/v1/rzr";
const rzrApi = createApi({
  baseQuery: customBaseQuery(apiUrl),
  tagTypes: [
    "user",
    "location",
    "reservation",
    "client",
    "clientReservation",
    "locationWorkers",
    "locationWorkingHours",
    "workerWorkingHours",
    "shift",
    "shiftByDays",
    "user",
    "appLang",
    "news",
    "servicesGroups",
    "services",
    "locationPromoCodes",
    "translations",
    "changeRequests",
    "AdminUsers",
    "UserDevices"
    /* USER_DEVICES */
  ],
  endpoints: () => ({})
});
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "device", "ui"]
  // Add ui to persist theme
};
const rootReducer = combineReducers({
  [rzrApi.reducerPath]: rzrApi.reducer,
  [sharedApi.reducerPath]: sharedApi.reducer,
  user: userSlice.reducer,
  ui: uiSlices.reducer,
  device: deviceSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat([
    rzrApi.middleware,
    sharedApi.middleware,
    unauthorizedMiddleware
  ])
});
const persistedStore = persistStore(store);
class ChunkLoadErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    __publicField(this, "handleReload", () => {
      window.location.reload();
    });
    this.state = { hasError: false, isChunkError: false };
  }
  static getDerivedStateFromError(error) {
    const isChunkError = error.name === "ChunkLoadError" || error.message.includes("Failed to fetch dynamically imported module") || error.message.includes("Importing a module script failed");
    return {
      hasError: true,
      isChunkError
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ChunkLoadErrorBoundary caught an error:", error, errorInfo);
    if (this.state.isChunkError) {
      console.log("Chunk load error detected, reloading page in 1 second...");
      setTimeout(() => {
        window.location.reload();
      }, 1e3);
    }
  }
  render() {
    if (this.state.hasError && this.state.isChunkError) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(IonPage, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonContent, { className: "ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            padding: "20px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(IonText, { color: "medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Ažuriranje aplikacije..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nova verzija aplikacije je dostupna." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Stranica će se automatski osvežiti." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              IonButton,
              {
                onClick: this.handleReload,
                color: "primary",
                style: { marginTop: "20px" },
                children: "Osveži odmah"
              }
            )
          ]
        }
      ) }) });
    }
    return this.props.children;
  }
}
const THEME_STORAGE_KEY = "app-theme-mode";
function getSavedTheme() {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return "dark";
  } catch (e) {
    return "dark";
  }
}
function saveTheme(theme) {
  if (typeof window === "undefined") return;
  try {
    if (theme === null) {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } else {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  } catch (error) {
    console.error("Failed to save theme:", error);
  }
}
function applyTheme(theme) {
  if (typeof window === "undefined") return;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = theme === "dark" || theme === null && prefersDark.matches;
  document.documentElement.classList.remove("ion-palette-dark", "dark");
  if (isDark) {
    document.documentElement.classList.add("ion-palette-dark", "dark");
  }
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  if (document.body) {
    document.body.classList.remove("ion-palette-dark", "dark-theme");
    if (isDark) {
      document.body.classList.add("ion-palette-dark", "dark-theme");
    }
  }
}
function initializeTheme() {
  if (typeof window === "undefined") return;
  const savedTheme = getSavedTheme();
  applyTheme(savedTheme);
  const applyWhenBodyReady = () => {
    if (document.body) {
      applyTheme(savedTheme);
    } else {
      const observer = new MutationObserver(() => {
        if (document.body) {
          applyTheme(savedTheme);
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true });
      requestAnimationFrame(() => {
        if (document.body) {
          applyTheme(savedTheme);
          observer.disconnect();
        }
      });
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyWhenBodyReady, {
      once: true
    });
  } else {
    applyWhenBodyReady();
  }
}
const App = reactExports.lazy(() => __vitePreload(() => import("./App-CNuYiPPZ.js").then((n) => n.ai), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8]) : void 0));
initializeTheme();
clientExports.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(PersistGate, { loading: null, persistor: persistedStore, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: null, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChunkLoadErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallbackRender, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) }) }) }) }) })
  // </React.StrictMode>,
);
initializeServiceWorker();
defineCustomElements();
export {
  saveTheme as A,
  TagId$1 as T,
  UploadType as U,
  __vite_legacy_guard,
  TagType$1 as a,
  setUser as b,
  setUiData as c,
  setShowCompleteProfileModal as d,
  sharedApiPrefix as e,
  closeImageModal as f,
  getImageModalData as g,
  setShowNetworkErrorModal as h,
  getShowLoginModal as i,
  getShowImageModal as j,
  getShowNetworkErrorModal as k,
  setShowLoginModal as l,
  getDeviceData as m,
  setDeviceData as n,
  getUser as o,
  logoutAction as p,
  getUserHash as q,
  setUserHash as r,
  sharedApi as s,
  rzrApi as t,
  updateUserData as u,
  TagType as v,
  getInitialData as w,
  getSavedTheme as x,
  applyTheme as y,
  TagId as z
};
