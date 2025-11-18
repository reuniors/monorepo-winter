;
(function () {
  System.register(['./vendor_ionic-legacy-CtJTU_-p.js', './vendor_react-legacy-CWUgxXrv.js', './index-legacy-DzHmmkBv.js', './vendor_firebase-legacy-BNPMIeNn.js'], function (exports, module) {
    'use strict';

    var IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, closeOutline, IonContent, IonSpinner, IonFooter, saveOutline, languageOutline, IonItem, IonInput, eye, eyeOff, logoGoogle, IonText, IonSelect, IonSelectOption, videocam, videocamOff, IonGrid, IonRow, IonCol, IonSearchbar, IonLabel, IonList, IonCheckbox, arrowUndoOutline, IonPage, createAnimation, useIonModal, useIonLoading, useIonAlert, useIonActionSheet, trashOutline, IonImg, cropOutline, optionsOutline, cloudUploadOutline, funnelOutline, listCircleSharp, IonItemSliding, IonItemOptions, IonThumbnail, IonReorder, menuOutline, chevronForwardOutline, IonItemOption, constructOutline, checkboxOutline, squareOutline, IonReorderGroup, checkmarkOutline, addOutline, isPlatform, icons, useIonToast, IonTextarea, IonDatetime, IonToggle, __vitePreload, calendarOutline, timeOutline, IonChip, IonLoading, mailOutline, keyOutline, useIonRouter, IonToast, IonListHeader, IonSkeletonText, exitOutline, logoApple, logoAndroid, IonMenuButton, chevronBackOutline, ellipsisVertical, ellipsisHorizontal, IonRefresher, IonRefresherContent, IonPopover, IonAlert, lockClosedOutline, logInOutline, IonSegment, IonSegmentButton, createOutline, giftOutline, settingsOutline, peopleOutline, megaphoneOutline, useIonViewWillLeave, IonActionSheet, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, homeOutline, alarmOutline, notificationsOutline, personOutline, IonAvatar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, removeOutline, IonBadge, cashOutline, calendarClearOutline, arrowBack, arrowForward, useIonViewDidLeave, checkmarkCircleOutline, IonApp, IonReactRouter, IonSplitPane, setupIonicReact, jsxRuntimeExports, useForm, o, humpsExports, t, reactExports, create$3, create$6, React, Controller, yup, setLocale, lodashExports, useWatch, DraftExports, reactDraftWysiwygExports, draftToHtml, qr, Swiper, createSlice, l, combineReducers, configureStore, c, SwiperSlide, register, V, arrayMove, useSensors, useSensor, DndContext, closestCenter, SortableContext, verticalListSortingStrategy, TouchSensor, sortableKeyboardCoordinates, KeyboardSensor, PointerSensor, useSortable, CSS, parseISO, formatInTimeZone, toZonedTime, format, fromZonedTime, isValid, useDispatch, useSelector, useTranslation, useHistory, GoogleOAuthProvider, useGoogleLogin, ErrorBoundary, Route, buildExports, Redirect, parse, addMinutes, isWithinInterval, differenceInMinutes, addDays, useLocation, useParams, create$5, create$7, create$2, ErrorBoundary$1, sharedApi, TagType, sharedApiPrefix, UploadType, TagId, setShowCompleteProfileModal, setUser, setUiData, getImageModalData, closeImageModal, getShowLoginModal, getShowImageModal, setShowLoginModal, getDeviceData, setDeviceData, getUser, logoutAction, rzrApi, TagType$1, TagId$1, getInitialData, initializeApp, getMessagingInWindow, getAnalytics, onMessage, getToken;
    return {
      setters: [module => {
        IonModal = module.I;
        IonHeader = module.b;
        IonToolbar = module.c;
        IonTitle = module.e;
        IonButtons = module.f;
        IonButton = module.h;
        IonIcon = module.i;
        closeOutline = module.j;
        IonContent = module.k;
        IonSpinner = module.l;
        IonFooter = module.m;
        saveOutline = module.s;
        languageOutline = module.n;
        IonItem = module.o;
        IonInput = module.p;
        eye = module.q;
        eyeOff = module.r;
        logoGoogle = module.t;
        IonText = module.u;
        IonSelect = module.v;
        IonSelectOption = module.w;
        videocam = module.x;
        videocamOff = module.y;
        IonGrid = module.z;
        IonRow = module.A;
        IonCol = module.B;
        IonSearchbar = module.C;
        IonLabel = module.D;
        IonList = module.E;
        IonCheckbox = module.F;
        arrowUndoOutline = module.G;
        IonPage = module.H;
        createAnimation = module.J;
        useIonModal = module.K;
        useIonLoading = module.L;
        useIonAlert = module.M;
        useIonActionSheet = module.N;
        trashOutline = module.O;
        IonImg = module.P;
        cropOutline = module.Q;
        optionsOutline = module.R;
        cloudUploadOutline = module.S;
        funnelOutline = module.T;
        listCircleSharp = module.U;
        IonItemSliding = module.V;
        IonItemOptions = module.W;
        IonThumbnail = module.X;
        IonReorder = module.Y;
        menuOutline = module.Z;
        chevronForwardOutline = module.$;
        IonItemOption = module.a0;
        constructOutline = module.a1;
        checkboxOutline = module.a2;
        squareOutline = module.a3;
        IonReorderGroup = module.a4;
        checkmarkOutline = module.a5;
        addOutline = module.a6;
        isPlatform = module.a7;
        icons = module.a8;
        useIonToast = module.a9;
        IonTextarea = module.aa;
        IonDatetime = module.ab;
        IonToggle = module.ac;
        __vitePreload = module._;
        calendarOutline = module.ad;
        timeOutline = module.ae;
        IonChip = module.af;
        IonLoading = module.ag;
        mailOutline = module.ah;
        keyOutline = module.ai;
        useIonRouter = module.aj;
        IonToast = module.ak;
        IonListHeader = module.al;
        IonSkeletonText = module.am;
        exitOutline = module.an;
        logoApple = module.ao;
        logoAndroid = module.ap;
        IonMenuButton = module.aq;
        chevronBackOutline = module.ar;
        ellipsisVertical = module.as;
        ellipsisHorizontal = module.at;
        IonRefresher = module.au;
        IonRefresherContent = module.av;
        IonPopover = module.aw;
        IonAlert = module.ax;
        lockClosedOutline = module.ay;
        logInOutline = module.az;
        IonSegment = module.aA;
        IonSegmentButton = module.aB;
        createOutline = module.aC;
        giftOutline = module.aD;
        settingsOutline = module.aE;
        peopleOutline = module.aF;
        megaphoneOutline = module.aG;
        useIonViewWillLeave = module.aH;
        IonActionSheet = module.aI;
        IonTabs = module.aJ;
        IonRouterOutlet = module.aK;
        IonTabBar = module.aL;
        IonTabButton = module.aM;
        homeOutline = module.aN;
        alarmOutline = module.aO;
        notificationsOutline = module.aP;
        personOutline = module.aQ;
        IonAvatar = module.aR;
        IonCard = module.aS;
        IonCardHeader = module.aT;
        IonCardTitle = module.aU;
        IonCardContent = module.aV;
        removeOutline = module.aW;
        IonBadge = module.aX;
        cashOutline = module.aY;
        calendarClearOutline = module.aZ;
        arrowBack = module.a_;
        arrowForward = module.a$;
        useIonViewDidLeave = module.b0;
        checkmarkCircleOutline = module.b1;
        IonApp = module.b2;
        IonReactRouter = module.b3;
        IonSplitPane = module.b4;
        setupIonicReact = module.b5;
      }, module => {
        jsxRuntimeExports = module.j;
        useForm = module.Z;
        o = module.$;
        humpsExports = module.E;
        t = module.a0;
        reactExports = module.e;
        create$3 = module.a1;
        create$6 = module.a2;
        React = module.R;
        Controller = module.a3;
        yup = module.a4;
        setLocale = module.a5;
        lodashExports = module.a6;
        useWatch = module.a7;
        DraftExports = module.a8;
        reactDraftWysiwygExports = module.a9;
        draftToHtml = module.aa;
        qr = module.ab;
        Swiper = module.ac;
        createSlice = module.G;
        l = module.ad;
        combineReducers = module.J;
        configureStore = module.K;
        c = module.ae;
        SwiperSlide = module.af;
        register = module.ag;
        V = module.ah;
        arrayMove = module.ai;
        useSensors = module.aj;
        useSensor = module.ak;
        DndContext = module.al;
        closestCenter = module.am;
        SortableContext = module.an;
        verticalListSortingStrategy = module.ao;
        TouchSensor = module.ap;
        sortableKeyboardCoordinates = module.aq;
        KeyboardSensor = module.ar;
        PointerSensor = module.as;
        useSortable = module.at;
        CSS = module.au;
        parseISO = module.av;
        formatInTimeZone = module.aw;
        toZonedTime = module.ax;
        format = module.ay;
        fromZonedTime = module.az;
        isValid = module.aA;
        useDispatch = module.aB;
        useSelector = module.aC;
        useTranslation = module.aD;
        useHistory = module.aE;
        GoogleOAuthProvider = module.aF;
        useGoogleLogin = module.aG;
        ErrorBoundary = module.aH;
        Route = module.q;
        buildExports = module.aI;
        Redirect = module.aJ;
        parse = module.aK;
        addMinutes = module.aL;
        isWithinInterval = module.aM;
        differenceInMinutes = module.aN;
        addDays = module.aO;
        useLocation = module.aP;
        useParams = module.aQ;
        create$5 = module.aR;
        create$7 = module.aS;
        create$2 = module.aT;
        ErrorBoundary$1 = module.Y;
      }, module => {
        sharedApi = module.s;
        TagType = module.T;
        sharedApiPrefix = module.a;
        UploadType = module.U;
        TagId = module.b;
        setShowCompleteProfileModal = module.c;
        setUser = module.d;
        setUiData = module.e;
        getImageModalData = module.g;
        closeImageModal = module.f;
        getShowLoginModal = module.h;
        getShowImageModal = module.i;
        setShowLoginModal = module.j;
        getDeviceData = module.k;
        setDeviceData = module.l;
        getUser = module.m;
        logoutAction = module.n;
        rzrApi = module.r;
        TagType$1 = module.o;
        TagId$1 = module.p;
        getInitialData = module.q;
      }, module => {
        initializeApp = module.i;
        getMessagingInWindow = module.g;
        getAnalytics = module.a;
        onMessage = module.o;
        getToken = module.b;
      }],
      execute: function () {
        var __vite_style__ = document.createElement('style');
        __vite_style__.textContent = ".rich-editor-wrapper .rdw-editor-main {\n  width: 100%;\n  font-family: sans-serif;\n  background-color: #fff;\n  color: #000;\n  min-height: 350px;\n}\n\n.rich-editor-wrapper {\n  min-height: 350px;\n}\n\n.rdw-image-modal, .rdw-emoji-modal, .rdw-embedded-modal, .rdw-link-modal {\n  left: -150px !important;\n  color: #000;\n}.swiper-button-next,\n.swiper-button-prev {\n  position: absolute;\n  top: 50%;\n  width: 44px;\n  height: 44px;\n  margin-top: -22px;\n  z-index: 10;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #007aff;\n  background: rgba(100, 0, 0, 0.1);\n  border-radius: 50%;\n}\n.swiper-button-next::after,\n.swiper-button-prev::after {\n  content: \"\";\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  z-index: 2;\n}\n.swiper-button-next .swiper-navigation-icon,\n.swiper-button-prev .swiper-navigation-icon {\n  width: 11px;\n  height: 20px;\n  fill: currentColor;\n  display: block;\n  visibility: visible;\n  opacity: 1;\n  position: relative;\n  z-index: 1;\n}\n.swiper-button-next.swiper-button-disabled,\n.swiper-button-prev.swiper-button-disabled {\n  opacity: 0.35;\n  cursor: auto;\n  pointer-events: none;\n}\n\n.swiper-button-prev {\n  left: 10px;\n  right: auto;\n}\n.swiper-button-prev::after {\n  border-right: 10px solid currentColor;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  margin-left: -5px;\n}\n\n.swiper-button-next {\n  right: 10px;\n  left: auto;\n}\n.swiper-button-next::after {\n  border-left: 10px solid currentColor;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  margin-right: -5px;\n}\n\n* {\n  -webkit-touch-callout: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\n#app {\n  height: 100%;\n}\n\n.demo-app {\n  overflow: auto;\n  height: 100%;\n}\n\n.demo-title {\n  padding: 24px 12px 12px;\n}\n\n.demo-stories {\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  overflow: auto;\n  scrollbar-width: none;\n  border-bottom: 1px solid #262626;\n}\n.demo-stories::-webkit-scrollbar {\n  display: none;\n  opacity: 0;\n}\n.demo-stories a + a {\n  margin-left: 12px;\n}\n.demo-stories a {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  transition-duration: 300ms;\n  transition-property: opacity;\n}\n.demo-stories a:active {\n  opacity: 0.55;\n  transition-duration: 50ms;\n}\n.demo-stories-avatar {\n  position: relative;\n  border-radius: 50%;\n  padding: 4px;\n  background-image: linear-gradient(to right top, #ffc600 20%, #ff0040, #e600cc 80%);\n}\n.demo-stories-avatar::before {\n  content: \"\";\n  position: absolute;\n  left: 2px;\n  top: 2px;\n  right: 2px;\n  bottom: 2px;\n  background: #000;\n  border-radius: 50%;\n  z-index: 1;\n}\n.demo-stories-avatar img {\n  position: relative;\n  z-index: 2;\n  display: block;\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n}\n.demo-stories-name {\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1;\n  margin-top: 10px;\n}\n\n.demo-post-header {\n  display: flex;\n  align-items: center;\n  padding: 14px;\n  border-top: 1px solid #ccc;\n}\n.demo-post-header-actions {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  margin: 0;\n  padding: 0;\n  border: none;\n  outline: 0;\n  position: relative;\n  box-shadow: none;\n  border-radius: 0;\n  background: none;\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition-duration: 300ms;\n  transition-property: opacity;\n}\n.demo-post-header-actions:active {\n  opacity: 0.55;\n  transition-duration: 50ms;\n}\n.demo-post-header-actions span {\n  width: 3px;\n  height: 3px;\n  background: #fff;\n  border-radius: 50%;\n}\n.demo-post-header-actions span + span {\n  margin-left: 3px;\n}\n.demo-post-avatar {\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  margin-right: 8px;\n  padding: 2px;\n  box-sizing: border-box;\n  position: relative;\n  cursor: pointer;\n  background-image: linear-gradient(to right top, #ffc600 20%, #ff0040, #e600cc 80%);\n  transition-property: opacity;\n  transition-duration: 200ms;\n}\n.demo-post-avatar:active {\n  opacity: 0.55;\n  transition-duration: 0;\n}\n.demo-post-avatar::before {\n  content: \"\";\n  left: 1px;\n  top: 1px;\n  right: 1px;\n  bottom: 1px;\n  background: #000;\n  position: absolute;\n  border-radius: 50%;\n  z-index: 0;\n}\n.demo-post-avatar img {\n  width: 100%;\n  height: 100%;\n  border-radius: 50%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n  position: relative;\n  z-index: 1;\n}\n.demo-post-name {\n  font-size: 14px;\n  font-weight: 600;\n}\n.demo-post-image {\n  height: 320px;\n}\n.demo-post-image img {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -o-object-position: center;\n     object-position: center;\n}\n.demo-post-footer {\n  padding: 16px;\n}\n.demo-post-footer-actions {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding-bottom: 16px;\n}\n.demo-post-footer-actions-left, .demo-post-footer-actions-right {\n  display: flex;\n  align-items: center;\n}\n.demo-post-footer-actions button {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  border: none;\n  outline: 0;\n  position: relative;\n  box-shadow: none;\n  border-radius: 0;\n  background: none;\n  margin-left: auto;\n  display: flex;\n  align-items: center;\n  cursor: pointer;\n  transition-duration: 300ms;\n  transition-property: opacity;\n  padding: 0;\n  margin: 0;\n}\n.demo-post-footer-actions button:active {\n  opacity: 0.55;\n  transition-duration: 50ms;\n}\n.demo-post-footer-actions button img {\n  width: 22px;\n  height: 22px;\n  -o-object-fit: contain;\n     object-fit: contain;\n  -o-object-position: center;\n     object-position: center;\n}\n.demo-post-footer-actions button + button {\n  margin-left: 16px;\n}\n.demo-post-likes {\n  font-size: 14px;\n  font-weight: 600;\n}\n.demo-post-content {\n  font-size: 14px;\n  margin-top: 4px;\n  line-height: 1.25;\n}\n.demo-post-content-name {\n  font-weight: 600;\n}\n.demo-post-content-text {\n  opacity: 0.85;\n}\n.demo-post-date {\n  margin-top: 4px;\n  font-size: 12px;\n  opacity: 0.5;\n  font-weight: 500;\n}\n\n.stories-slider {\n  position: fixed;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1000;\n  transform: scale(0);\n  transform: translate3d(0, 0, 0) scale(0.5);\n  opacity: 0;\n  background: #000;\n}\n@media (min-width: 415px), (min-height: 897px) {\n  .stories-slider {\n    background: rgb(41, 40, 49);\n  }\n}\n.stories-slider > .swiper {\n  z-index: 2;\n  max-width: 414px;\n  max-height: 896px;\n}\n.stories-slider:not(.stories-slider-in) {\n  pointer-events: none;\n}\n.stories-slider:not(.stories-slider-in) * {\n  pointer-events: none !important;\n}\n.stories-slider-in {\n  animation: stories-slider-in 400ms forwards;\n  pointer-events: auto;\n  transform: translate3d(0, 0, 0) scale(1);\n  opacity: 1;\n}\n.stories-slider-out {\n  pointer-events: none;\n  animation: stories-slider-out 400ms forwards !important;\n}\n\n@keyframes stories-slider-in {\n  0% {\n    transform: translate3d(0, 0, 0) scale(0.5);\n    opacity: 0;\n  }\n  50% {\n    transform: translate3d(0, 0, 0) scale(1.05);\n    opacity: 1;\n  }\n  100% {\n    transform: translate3d(0, 0, 0) scale(1);\n    opacity: 1;\n  }\n}\n@keyframes stories-slider-out {\n  0% {\n    transform: translate3d(0, 0, 0) scale(1);\n    opacity: 1;\n  }\n  50% {\n    transform: translate3d(0, 0, 0) scale(0.5);\n    opacity: 0;\n  }\n  100% {\n    transform: translate3d(0, 0, 0) scale(0.5);\n    opacity: 0;\n  }\n}.photo-gallery-img::part(image) {\n  max-height: 400px;\n}\n\n.photo-gallery-swiper {\n  min-height: 45px;\n}#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n@keyframes logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  a:nth-of-type(2) .logo {\n    animation: logo-spin infinite 20s linear;\n  }\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n/*$vite$:1*/";
        document.head.appendChild(__vite_style__);
        exports({
          D: DynamicForm,
          I: IonAlertConfirmation,
          M: ModalActionButtons,
          U: useDefaultProps,
          V: ServiceEditForm,
          a9: useContentRefFunctions,
          b: useUser,
          m: useFormWithSchema,
          q: useQueryParamsHook,
          s: LayoutMainPage
        });
        const ConditionalComponent = exports("C", ({
          condition,
          render,
          elseCondition = true,
          renderElse
        }) => {
          if (!!condition) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: render()
            });
          }
          if (elseCondition && renderElse) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: renderElse()
            });
          }
          return null;
        });
        var FieldType = exports("F", /* @__PURE__ */(FieldType2 => {
          FieldType2["Text"] = "TextField";
          FieldType2["TextArea"] = "TextArea";
          FieldType2["Password"] = "Password";
          FieldType2["Number"] = "NumberField";
          FieldType2["Switch"] = "Switch";
          FieldType2["Select"] = "Select";
          FieldType2["Autocomplete"] = "Autocomplete";
          FieldType2["Checkbox"] = "Checkbox";
          FieldType2["MultiCheckbox"] = "MultiCheckbox";
          FieldType2["List"] = "List";
          FieldType2["DateTime"] = "DateTime";
          FieldType2["Date"] = "Date";
          FieldType2["Time"] = "Time";
          FieldType2["WorkingHours"] = "WorkingHours";
          FieldType2["WorkingHoursSingle"] = "WorkingHoursSingle";
          FieldType2["Callback"] = "Callback";
          FieldType2["RichEditor"] = "RichEditor";
          FieldType2["PhotoUploader"] = "PhotoUploader";
          FieldType2["GalleryArea"] = "GalleryArea";
          FieldType2["Coordinates"] = "Coordinates";
          FieldType2["IonIcon"] = "IonIcon";
          FieldType2["ChangeRequest"] = "ChangeRequest";
          FieldType2["Slug"] = "Slug";
          return FieldType2;
        })(FieldType || {}));
        function useFormWithSchema(schema, useFormProps) {
          return useForm({
            ...useFormProps,
            resolver: o(schema)
          });
        }
        const transformPaginationResponseToCamelCase = exports("Z", response => humpsExports.camelizeKeys(response.data));
        const transformStandardResponseToCamelCase = exports("v", response => humpsExports.camelizeKeys(response));
        const translationsApi = sharedApi.injectEndpoints({
          endpoints: builder => ({
            getTranslations: builder.query({
              query: params => ({
                url: "translations",
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.TRANSLATIONS]
            }),
            createTranslation: builder.mutation({
              query: body => ({
                url: "translations",
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.TRANSLATIONS]
            })
          })
        });
        const {
          useGetTranslationsQuery,
          useCreateTranslationMutation
        } = translationsApi;
        const getTranslationFormFields = (fieldType, label) => {
          const fields = [{
            keyName: "language",
            name: t("Jezik"),
            data: {
              type: FieldType.Select,
              label: t("Jezik"),
              options: [{
                text: t("Engleski"),
                value: "eng"
              }, {
                text: t("Srpski"),
                value: "rs"
              }]
            },
            gridSize: {
              size: "12"
            }
          }];
          switch (fieldType) {
            case FieldType.Text:
              fields.push({
                keyName: "translationValue",
                name: t("Prevod"),
                data: {
                  type: FieldType.Text,
                  label
                },
                gridSize: {
                  size: "12"
                },
                newRow: true
              });
              break;
            case FieldType.TextArea:
              fields.push({
                keyName: "translationValue",
                name: t("Prevod"),
                data: {
                  type: FieldType.TextArea,
                  label
                },
                gridSize: {
                  size: "12"
                },
                newRow: true
              });
              break;
            case FieldType.RichEditor:
              fields.push({
                keyName: "translationValue",
                name: t("Prevod"),
                data: {
                  type: FieldType.RichEditor,
                  label
                },
                gridSize: {
                  size: "12"
                },
                newRow: true
              });
              break;
          }
          return fields;
        };
        const LANGUAGE_MAPPING = {
          eng: "eng",
          en: "eng",
          rs: "sr"
        };
        function frontendToBackendLang(frontendLang) {
          return LANGUAGE_MAPPING[frontendLang] || frontendLang;
        }
        const schema$2 = create$3().shape({
          language: create$6().required(t("Jezik je obavezan")),
          translationValue: create$6().required(t("Prevod je obavezan"))
        });
        function TranslationEditor({
          isOpen,
          onClose,
          translation,
          fieldType,
          label,
          currentValue
        }) {
          const [formKey, setFormKey] = reactExports.useState("");
          const [selectedLanguage, setSelectedLanguage] = reactExports.useState("eng");
          const {
            data: translationData,
            isLoading: isLoadingTranslations
          } = useGetTranslationsQuery({
            entityType: translation.type,
            entityId: translation.dataId
          });
          const [createTranslation, {
            isLoading: isCreating
          }] = useCreateTranslationMutation();
          const form = useFormWithSchema(schema$2, {
            defaultValues: {
              language: "eng",
              translationValue: ""
            }
          });
          const {
            handleSubmit,
            watch,
            setValue
          } = form;
          const watchedLanguage = watch("language");
          const formFields = reactExports.useMemo(() => getTranslationFormFields(fieldType, label), [fieldType, label]);
          const isLoading = isCreating || isLoadingTranslations;
          reactExports.useEffect(() => {
            if (translationData?.success && translationData.data) {
              const backendLanguage = frontendToBackendLang(watchedLanguage);
              const languageData = translationData.data[backendLanguage];
              console.log("languageData", languageData, backendLanguage, watchedLanguage);
              if (languageData && languageData[translation.fieldName]) {
                setValue("translationValue", languageData[translation.fieldName]);
                setFormKey(watchedLanguage);
              } else {
                setValue("translationValue", "");
                setFormKey(watchedLanguage);
              }
            }
          }, [translationData, watchedLanguage, translation.fieldName, setValue]);
          reactExports.useEffect(() => {
            if (isOpen) {
              setSelectedLanguage("eng");
              setValue("language", "eng");
            }
          }, [isOpen, setValue]);
          const handleSaveTranslation = async formData => {
            try {
              const backendLanguage = frontendToBackendLang(formData.language);
              const translationPayload = {
                entityType: translation.type,
                entityId: translation.dataId,
                language: backendLanguage,
                fieldName: translation.fieldName,
                fieldValue: formData.translationValue
              };
              await createTranslation(translationPayload).unwrap();
              onClose();
            } catch (error) {
              console.error("Error saving translation:", error);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen,
            onDidDismiss: onClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonTitle, {
                  children: [t("Prevod"), " - ", label]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onClose,
                    fill: "clear",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              className: "ion-padding",
              children: isLoading ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex justify-center items-center p-8",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {}), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  className: "ml-2",
                  children: t("Učitavanje...")
                })]
              }) : /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "space-y-4",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                  fields: formFields,
                  form
                }, formKey)
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex gap-2 p-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "outline",
                    onClick: onClose,
                    disabled: isLoading,
                    children: t("Otkaži")
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    onClick: handleSubmit(handleSaveTranslation),
                    disabled: isLoading,
                    className: "flex-1",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: saveOutline,
                      slot: "start"
                    }), isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                      name: "crescent"
                    }) : t("Sačuvaj prevod")]
                  })]
                })
              })
            })]
          });
        }
        const TranslationEditor$1 = reactExports.memo(TranslationEditor);
        function TranslationButton({
          translation,
          fieldName,
          fieldType,
          label,
          currentValue,
          buttonProps = {}
        }) {
          const [showTranslationEditor, setShowTranslationEditor] = reactExports.useState(false);
          const openTranslationEditor = () => {
            setShowTranslationEditor(true);
          };
          const closeTranslationEditor = () => {
            setShowTranslationEditor(false);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              fill: buttonProps.fill || "clear",
              size: buttonProps.size || "small",
              slot: "end",
              onClick: openTranslationEditor,
              className: buttonProps.className,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: languageOutline
              })
            }), showTranslationEditor && /* @__PURE__ */jsxRuntimeExports.jsx(TranslationEditor$1, {
              isOpen: showTranslationEditor,
              onClose: closeTranslationEditor,
              translation,
              fieldType,
              label,
              currentValue
            })]
          });
        }
        function CommonIonicInput(props) {
          const {
            label,
            labelPlacement = "floating",
            type,
            register,
            error
          } = props;
          const {
            itemProps,
            inputProps,
            control
          } = props;
          const {
            showEye,
            googleIt,
            translation
          } = props;
          const [showPassword, setShowPassword] = React.useState(false);
          const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              ...itemProps,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsxs(IonInput, {
                  label,
                  type: showPassword ? "text" : type,
                  labelPlacement,
                  onIonBlur: register.onBlur,
                  onKeyUp: register.onBlur,
                  step: "any",
                  ...inputProps,
                  ...register,
                  children: [showEye && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "clear",
                    slot: "end",
                    onClick: togglePasswordVisibility,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: showPassword ? eye : eyeOff
                    })
                  }), translation && /* @__PURE__ */jsxRuntimeExports.jsx(TranslationButton, {
                    translation,
                    fieldName: register.name,
                    fieldType: FieldType.Text,
                    label,
                    currentValue: field.value || ""
                  }), !!googleIt?.length && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "clear",
                    slot: "end",
                    onClick: () => window.open(`https://www.google.com/search?q=${googleIt}`, "_blank"),
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: logoGoogle
                    })
                  })]
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        function CommonIonicSelect(props) {
          const {
            ariaLabel,
            interfaceProp = "action-sheet",
            selectProps,
            placeholder,
            multiple,
            register,
            options = [],
            control,
            error,
            labelPlacement = "floating",
            emptyOption
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsxs(IonSelect, {
                  ...selectProps,
                  label: ariaLabel,
                  interface: interfaceProp,
                  placeholder,
                  multiple: !!multiple,
                  onIonBlur: register.onBlur,
                  onIonChange: register.onChange,
                  labelPlacement,
                  value: field.value?.toString(),
                  ...register,
                  children: [emptyOption && /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: null,
                    children: emptyOption
                  }), options.map((option, index) => /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    ...option,
                    children: option.text
                  }, index))]
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const commonValidationMessages = {
          required: "Obavezno polje",
          min: "minimalno ${min}",
          max: "maksimalno ${max}",
          email: "Neispravan email"
        };
        const tV = key => {
          return t(commonValidationMessages[key]);
        };
        setLocale({
          number: {
            min: tV("min")
          },
          array: {
            min: tV("min")
          },
          string: {
            min: tV("min")
          },
          mixed: {
            required: tV("required")
          }
        });
        const convertEmptyStringToNull = exports("O", value => value === "" || lodashExports.isNumber(value) && isNaN(value) ? null : value);
        const generateSlugForValidation = exports("P", text => {
          return text.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
        });
        const validatePhotosHaveId = photos => {
          if (!photos || photos.length === 0) {
            return true;
          }
          return photos.every(photo => photo?.id !== void 0 && photo?.id !== null);
        };
        const photosArrayWithIdYup = exports("A", errorMsg => yup.array().nullable().defined().test("all-photos-have-id", "", function (value) {
          return validatePhotosHaveId(value);
        }));
        function CommonIonicSlug(props) {
          const {
            label,
            labelPlacement = "floating",
            register,
            error
          } = props;
          const {
            itemProps,
            inputProps,
            control,
            sourceField,
            placeholder,
            isWatched,
            isWatchedDefault
          } = props;
          const [isWatchedState, setIsWatchedState] = reactExports.useState(isWatchedDefault ?? true);
          const fieldOnChangeRef = reactExports.useRef(null);
          const watchSourceField = useWatch({
            control,
            name: sourceField
          });
          const handleToggleWatched = () => {
            setIsWatchedState(!isWatchedState);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            ...itemProps,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
              name: register.name,
              control,
              render: ({
                field
              }) => {
                fieldOnChangeRef.current = field.onChange;
                const sourceValue = watchSourceField || "";
                const shouldAutoGenerate = (isWatched ?? isWatchedState) && sourceValue;
                if (shouldAutoGenerate) {
                  const slug = generateSlugForValidation(sourceValue);
                  if (slug && slug !== field.value) {
                    field.onChange(slug);
                  }
                }
                return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    width: "100%"
                  },
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                    ...field,
                    ...inputProps,
                    label,
                    labelPlacement,
                    placeholder,
                    readonly: !!shouldAutoGenerate,
                    className: error ? "ion-invalid" : "",
                    style: {
                      flex: 1
                    }
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    fill: "clear",
                    size: "small",
                    color: isWatchedState ? "success" : "danger",
                    onClick: handleToggleWatched,
                    style: {
                      marginLeft: "8px"
                    },
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: isWatchedState ? videocam : videocamOff
                    })
                  })]
                });
              }
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-margin-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "ion-text-wrap",
                children: error.message
              })
            })]
          });
        }
        function MultiSelectAutocomplete(props) {
          const {
            selectedItems
          } = props;
          const [filteredItems, setFilteredItems] = reactExports.useState([...props.items]);
          const [workingSelectedValues, setWorkingSelectedValues] = reactExports.useState([...selectedItems]);
          const dataRowClassNames = props.dataRowClassNames ?? "ion-no-padding";
          const isChecked = value => {
            return workingSelectedValues.find(item => item === value) !== void 0;
          };
          const cancelChanges = () => {
            const {
              onSelectionCancel
            } = props;
            if (onSelectionCancel !== void 0) {
              onSelectionCancel();
            }
          };
          const confirmChanges = () => {
            const {
              onSelectionChange
            } = props;
            if (onSelectionChange !== void 0) {
              onSelectionChange(workingSelectedValues);
            }
          };
          const searchbarInput = ev => {
            filterList(ev.target.value);
          };
          const filterList = searchQuery => {
            if (searchQuery === void 0 || searchQuery === null) {
              setFilteredItems([...props.items]);
            } else {
              const normalizedQuery = searchQuery.toLowerCase();
              setFilteredItems(props.items.filter(item => {
                return item.text.toLowerCase().includes(normalizedQuery);
              }));
            }
          };
          const checkboxChange = ev => {
            const {
              checked,
              value
            } = ev.detail;
            if (checked) {
              setWorkingSelectedValues([...workingSelectedValues, value]);
            } else {
              setWorkingSelectedValues(workingSelectedValues.filter(item => item !== value));
            }
          };
          const checkSelectedValuesHasDiff = reactExports.useCallback(() => {
            if (workingSelectedValues.length === 0 && selectedItems.length === 0) {
              return false;
            }
            if (workingSelectedValues.length !== selectedItems.length || workingSelectedValues.length === 0) {
              return true;
            }
            return workingSelectedValues.filter(x => !selectedItems.includes(x)).length;
          }, [workingSelectedValues, selectedItems]);
          reactExports.useEffect(() => {
            if (props.hideSearchbar && checkSelectedValuesHasDiff()) {
              confirmChanges();
            }
          }, [workingSelectedValues, selectedItems]);
          reactExports.useEffect(() => {
            setFilteredItems([...props.items]);
          }, [props.items]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
              className: "ion-no-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  children: !props.hideSearchbar ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonHeader, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                        slot: "start",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                          onClick: cancelChanges,
                          children: "Cancel"
                        })
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                        children: props.title
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                        slot: "end",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                          onClick: confirmChanges,
                          children: "Done"
                        })
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSearchbar, {
                        onIonInput: searchbarInput
                      })
                    })]
                  }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                    className: "ion-no-padding",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: props.title
                    })
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                className: dataRowClassNames,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  className: "ion-no-padding",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                    className: "ion-no-margin",
                    children: filteredItems.map(item => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      disabled: props.disabled,
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                        value: item.value,
                        checked: isChecked(item.value),
                        onIonChange: checkboxChange,
                        disabled: item.disabled || props.disabled,
                        children: item.text
                      })
                    }, item.value))
                  })
                })
              })]
            })
          });
        }
        function CommonIonicMultiCheckbox(props) {
          const {
            disabled,
            register,
            control,
            error,
            showSearchbar = true,
            label,
            dataRowClassNames,
            interfaceProp = "action-sheet",
            labelPlacement = "floating",
            options = []
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(MultiSelectAutocomplete, {
                  disabled,
                  items: options.map(option => ({
                    value: option.value,
                    text: option.text ?? option.value,
                    disabled: option.disabled
                  })),
                  selectedItems: value ?? [],
                  onSelectionChange: items => onChange(items),
                  hideSearchbar: !showSearchbar,
                  title: label,
                  dataRowClassNames
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const RichEditor = ({
          onChange,
          value,
          label,
          children,
          ...other
        }, ref) => {
          const initialVal = DraftExports.convertFromHTML(String(value ?? ""));
          const wrapperClassName = other.wrapperClassName ?? "rich-editor-wrapper";
          const [editorState, setEditorState] = reactExports.useState(value ? DraftExports.EditorState.createWithContent(DraftExports.ContentState.createFromBlockArray(initialVal.contentBlocks)) : DraftExports.EditorState.createEmpty());
          const [text, setText] = reactExports.useState();
          const onEditorStateChange = function (editorState2) {
            setEditorState(editorState2);
            const {
              blocks
            } = DraftExports.convertToRaw(editorState2.getCurrentContent());
            const rawContentState = DraftExports.convertToRaw(editorState2.getCurrentContent());
            const markup = draftToHtml(rawContentState);
            setText(markup);
            onChange(markup);
          };
          reactExports.useEffect(() => {
            if (value && !editorState.getLastChangeType()) {
              const val = DraftExports.convertFromHTML(String(value));
              setEditorState(DraftExports.EditorState.createWithContent(DraftExports.ContentState.createFromBlockArray(val.contentBlocks)));
            }
          }, [value]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "mt-5 w-full",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex items-center justify-between",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                children: label
              }), children]
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: wrapperClassName,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(reactDraftWysiwygExports.Editor, {
                editorState,
                onEditorStateChange,
                toolbarClassName: "toolbarClassName",
                wrapperClassName: "wrapperClassName",
                editorClassName: "editorClassName",
                toolbar: {
                  options: ["inline", "blockType", "list", "textAlign", "link", "emoji", "image", "history"]
                }
              })
            })]
          });
        };
        const RichEditor$1 = reactExports.memo(reactExports.forwardRef(RichEditor));
        function FormRichEditor(props) {
          const {
            register,
            error,
            label
          } = props;
          const {
            itemProps,
            control,
            translation
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              ...itemProps,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(RichEditor$1, {
                  ...field,
                  label,
                  children: translation && /* @__PURE__ */jsxRuntimeExports.jsx(TranslationButton, {
                    translation,
                    fieldName: register.name,
                    fieldType: FieldType.RichEditor,
                    label,
                    currentValue: field.value || ""
                  })
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        function SelectAutocomplete(props) {
          const [searchQuery, setSearchQuery] = reactExports.useState("");
          const {
            items,
            handleAddNewOption
          } = props;
          const [filteredItems, setFilteredItems] = reactExports.useState([...items]);
          const cancelChanges = () => {
            const {
              onSelectionCancel
            } = props;
            if (onSelectionCancel !== void 0) {
              onSelectionCancel();
            }
          };
          const searchbarInput = ev => {
            filterList(ev.target.value);
            setSearchQuery(ev.target.value);
          };
          const filterList = searchQuery2 => {
            if (searchQuery2 === void 0 || searchQuery2 === null) {
              setFilteredItems([...props.items]);
            } else {
              const normalizedQuery = searchQuery2.toLowerCase();
              setFilteredItems(props.items.filter(item => {
                return item.filterField === false || item.text.toLowerCase().includes(normalizedQuery);
              }));
            }
          };
          const handleSelected = item => () => {
            props.onSelectionChange?.(item);
          };
          const handleSelectAddNew = () => {
            if (searchQuery) {
              handleAddNewOption?.(searchQuery);
              cancelChanges();
            }
          };
          reactExports.useEffect(() => {
            setFilteredItems(items);
          }, [items]);
          const searchPlaceholder = handleAddNewOption ? t("Pretraži / Dodaj novo") : t("Pretraga");
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  children: !props.hideSearchbar ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonHeader, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                        children: props.title
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                        slot: "end",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                          onClick: handleSelected(void 0),
                          children: t("Resetuj")
                        })
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSearchbar, {
                        onIonInput: searchbarInput,
                        placeholder: searchPlaceholder
                      })
                    })]
                  }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                    className: "ion-no-padding",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: props.title
                    })
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                    id: "modal-list",
                    inset: true,
                    children: [handleAddNewOption && searchQuery && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      button: true,
                      onClick: handleSelectAddNew,
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                          color: "primary",
                          children: [t("Dodaj novo:"), " ", searchQuery]
                        })
                      })
                    }), items.length === 0 && /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {}), /* @__PURE__ */jsxRuntimeExports.jsx(qr, {
                      totalCount: filteredItems.length,
                      style: {
                        height: "400px"
                      },
                      itemContent: index => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        disabled: props.disabled,
                        onClick: handleSelected(filteredItems[index].value),
                        button: true,
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                          children: filteredItems[index].childNode ?? filteredItems[index].text
                        })
                      }, filteredItems[index].value)
                    })]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    button: true,
                    onClick: cancelChanges,
                    detail: false,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline,
                      className: "mr-2",
                      slot: "end"
                    }), t("Zatvori")]
                  })
                })
              })]
            })
          });
        }
        function SelectAutocompleteModal({
          onSelectionChanged,
          selectedItemValue,
          handleAddNewOption,
          options,
          title,
          startIcon,
          endIcon,
          hideInput,
          hideOnSelection = true
        }) {
          const [isNewSelected, setIsNewSelected] = reactExports.useState(false);
          const modal = reactExports.useRef(null);
          selectedItemValue = selectedItemValue?.toString();
          const selectedItemText = isNewSelected ? selectedItemValue : options.find(option => option.value === selectedItemValue)?.text;
          const [showModal, setShowModal] = reactExports.useState(false);
          const handleSelectChange = (item, isNewSelected2) => {
            onSelectionChanged?.(item);
            if (hideOnSelection || options.length <= 1) {
              modal.current?.dismiss();
            }
            setIsNewSelected(!!isNewSelected2);
          };
          const handleAddNewSelectedOption = value => {
            handleAddNewOption?.(value);
            handleSelectChange(value, true);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              onClick: () => setShowModal(true),
              button: true,
              hidden: hideInput,
              children: [startIcon && /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                slot: "start",
                icon: startIcon
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                label: title,
                readonly: true,
                value: selectedItemText,
                labelPlacement: "floating"
              }), endIcon && /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                slot: "end",
                icon: endIcon
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonModal, {
              ref: modal,
              isOpen: showModal,
              onDidDismiss: () => setShowModal(false),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(SelectAutocomplete, {
                  title,
                  items: options,
                  selectedItem: selectedItemValue,
                  onSelectionCancel: () => modal.current?.dismiss(),
                  onSelectionChange: handleSelectChange,
                  handleAddNewOption: handleAddNewOption ? handleAddNewSelectedOption : void 0
                })
              })
            })]
          });
        }
        function CommonIonicAutocompleteSelect(props) {
          const {
            register,
            options,
            control,
            error,
            label,
            handleAddNewOption
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(SelectAutocompleteModal, {
                  selectedItemValue: value,
                  onSelectionChanged: item => {
                    onChange(item !== void 0 ? item : control._defaultValues?.[register.name] ?? null);
                  },
                  options,
                  title: label,
                  handleAddNewOption
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        function SwiperWrapper(props, ref) {
          const {
            currentStep,
            ...swiperProps
          } = props;
          const swiperRef = reactExports.useRef(null);
          reactExports.useEffect(() => {
            if (currentStep !== void 0) {
              const timeout = setTimeout(() => {
                if (swiperRef?.current?.swiper?.activeIndex !== currentStep) {
                  swiperRef?.current?.swiper?.slideTo(currentStep);
                }
              }, 100);
              return () => clearTimeout(timeout);
            }
          }, [currentStep]);
          reactExports.useImperativeHandle(ref, () => ({
            swiper: swiperRef.current?.swiper
          }));
          const onSlideChange = reactExports.useMemo(() => {
            return currentStep !== void 0 ? swiper => {
              if (currentStep !== void 0 && swiper.activeIndex !== currentStep) {
                swiperRef.current?.swiper?.slideTo(currentStep);
              }
            } : void 0;
          }, [currentStep]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(Swiper, {
              onSlideChange,
              watchSlidesProgress: true,
              ...swiperProps,
              initialSlide: currentStep,
              ref: swiperRef
            })
          });
        }
        const SwiperWrapper$1 = exports("l", reactExports.memo(reactExports.forwardRef(SwiperWrapper)));
        const getFirstUploadedFileIdSortedBehindIndex = (manageDataItems, fileIndex) => {
          return manageDataItems?.find((item, itemIndex) => itemIndex > fileIndex && item.id !== void 0)?.id ?? "";
        };
        const fixManageDataItemsIndexes = (manageDataItems, fromIndex = 0) => manageDataItems.map((item, index) => ({
          ...item,
          index: fromIndex + index,
          sortOrder: index + fromIndex + 1,
          image: item.image ? {
            ...item.image,
            index: fromIndex + index
          } : void 0
        }));
        const initialState = {
          data: {
            manageDataItems: [],
            itemsReorderFromTo: [],
            showSortItemsModal: void 0,
            showManageListModal: void 0
          }
        };
        const manageDataSlices = createSlice({
          name: "manageItems",
          initialState,
          reducers: {
            setManageData(state, action) {
              const manageDataItems = action.payload.manageDataItems ? fixManageDataItemsIndexes(action.payload.manageDataItems) : state.data.manageDataItems;
              state.data = {
                ...state.data,
                ...action.payload,
                manageDataItems
              };
            },
            setShowSortDataModal(state, action) {
              state.data.showSortItemsModal = action.payload;
            },
            setShowManageListModal(state, action) {
              state.data.showManageListModal = action.payload;
            },
            setManageDataItems(state, action) {
              state.data.manageDataItems = fixManageDataItemsIndexes(action.payload);
            },
            updateManageDataItemPhoto(state, action) {
              const itemIndex = action.payload.index;
              if (state.data.manageDataItems && state.data.manageDataItems[itemIndex]) {
                state.data.manageDataItems[itemIndex].image = action.payload.image;
              }
            },
            updateManageDataItemProductPhoto(state, action) {
              const itemIndex = action.payload.index;
              if (state.data.manageDataItems && state.data.manageDataItems[itemIndex]) {
                const existingImage = state.data.manageDataItems[itemIndex].image;
                if (existingImage) {
                  state.data.manageDataItems[itemIndex].image = {
                    ...existingImage,
                    id: action.payload.productImage.id
                  };
                }
              }
            },
            updateManageDataItems(state, action) {
              action.payload.forEach(item => {
                const itemIndex = item.index;
                if (state.data.manageDataItems && state.data.manageDataItems[itemIndex]) {
                  state.data.manageDataItems[itemIndex] = item.data;
                }
              });
            },
            addManageDataItems(state, action) {
              state.data.manageDataItems?.push(...fixManageDataItemsIndexes(action.payload, state.data.manageDataItems?.length));
            },
            removeManageDataItems(state, action) {
              state.data.manageDataItems = fixManageDataItemsIndexes(state.data.manageDataItems?.filter((item, index) => !action.payload.includes(index)) ?? []);
            },
            resetManageDataItems(state) {
              state.data.manageDataItems = [];
            },
            addReorderFromTo(state, action) {
              state.data.itemsReorderFromTo?.push(action.payload);
            },
            resetReorderFromTo(state) {
              state.data.itemsReorderFromTo = [];
            },
            removeReorderFromToItems(state, action) {
              state.data.itemsReorderFromTo = state.data.itemsReorderFromTo?.filter(item => !action.payload.includes(item));
            }
          }
        });
        const isCroppedItemImage = (item, aspectRatioStr) => item.image?.croppedUrls?.[aspectRatioStr] !== void 0 || item.id !== void 0;
        const getManageItems = state => state.manageData.data.manageDataItems;
        const manageItemsMaxSortOrder = state => state.manageData.data.manageDataItems?.length ? Math.max(...(state.manageData.data.manageDataItems?.map(item => item.sortOrder ?? 0) || [])) : 0;
        const getNonCroppedItems = aspectRatioStr => state => state.manageData.data.manageDataItems?.filter(item => !isCroppedItemImage(item, aspectRatioStr));
        const getItemsReorderFromTo = state => state.manageData.data.itemsReorderFromTo;
        const {
          setManageData,
          setShowSortDataModal,
          setManageDataItems,
          updateManageDataItemPhoto,
          updateManageDataItemProductPhoto,
          updateManageDataItems,
          addManageDataItems,
          removeManageDataItems,
          setShowManageListModal,
          addReorderFromTo,
          resetReorderFromTo,
          removeReorderFromToItems,
          resetManageDataItems
        } = manageDataSlices.actions;
        const CropView = (props, ref) => {
          const aspectRatioSizes = props.aspectRatio ?? {
            width: 4,
            height: 5
          };
          const {
            image,
            hideActions
          } = props;
          const {
            autoCrop,
            autoCropIndex,
            onAutoCrop
          } = props;
          const {
            onSave,
            onDiscard
          } = props;
          const cropperRef = reactExports.useRef(null);
          const [cropData, setCropData] = React.useState();
          let loadingPreview = false;
          const [resizedImage, setResizedImage] = React.useState(void 0);
          const handleCrop = () => {
            try {
              const cropper = cropperRef.current?.cropper;
              const cropData2 = cropper?.getCroppedCanvas().toDataURL();
              handleSave(cropData2);
            } catch (e) {
              setTimeout(() => {
                handleCrop();
              }, 200);
            }
          };
          const onZoom = () => {
            if (!loadingPreview) {
              loadingPreview = true;
              setTimeout(() => {
                const cropper = cropperRef.current?.cropper;
                setCropData(cropper?.getCroppedCanvas().toDataURL());
                loadingPreview = false;
              }, 1e3);
            }
          };
          reactExports.useImperativeHandle(ref, () => ({
            handleSave: () => {
              handleSave();
            }
          }));
          const handleDiscard = () => {
            onDiscard?.();
          };
          const handleSave = cropData2 => {
            if (cropData2) {
              if (autoCrop) {
                onAutoCrop?.(cropData2, autoCropIndex);
              } else {
                onSave?.(cropData2);
              }
            }
          };
          const handleSetCropData = src => {
            if (autoCrop) {
              setTimeout(() => {
                handleCrop();
              }, 500);
            } else {
              setCropData(src);
            }
          };
          const handleCropInit = () => {
            handleSetCropData(resizedImage);
          };
          reactExports.useEffect(() => {
            const existingImage = new Image();
            existingImage.onload = function () {
              const aspectRatio = aspectRatioSizes?.height / aspectRatioSizes?.width;
              if (existingImage.height > existingImage.width * aspectRatio) {
                setResizedImage(image.url);
                return null;
              }
              const canvas = document.createElement("canvas");
              const canvasWidth = existingImage.width;
              const canvasHeight = existingImage.width * aspectRatio;
              canvas.width = canvasWidth;
              canvas.height = canvasHeight;
              const ctx = canvas.getContext("2d");
              const verticalOffset = (canvasHeight - existingImage.height) / 2;
              ctx.drawImage(existingImage, 0, verticalOffset, existingImage.width, existingImage.height);
              const newImage = new Image();
              newImage.src = canvas.toDataURL();
              setTimeout(() => {
                setResizedImage(newImage.src);
              }, 200);
            };
            existingImage.src = image.url;
          }, [image.url]);
          reactExports.useEffect(() => {
            if (resizedImage && autoCrop && autoCropIndex) {
              handleSetCropData(resizedImage);
            }
          }, [resizedImage, autoCropIndex]);
          if (!resizedImage) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("img", {
              src: image.url,
              alt: "cropped"
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(l, {
              src: resizedImage,
              style: {
                height: 400,
                width: "100%"
              },
              viewMode: 1,
              initialAspectRatio: aspectRatioSizes.width / aspectRatioSizes.height,
              dragMode: "move",
              aspectRatio: aspectRatioSizes.width / aspectRatioSizes.height,
              autoCrop: true,
              guides: false,
              scalable: false,
              cropBoxResizable: false,
              cropBoxMovable: false,
              minCropBoxHeight: 700,
              movable: true,
              zoom: onZoom,
              onInitialized: handleCropInit,
              ref: cropperRef
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              hidden: hideActions,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "start",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    onClick: handleDiscard,
                    color: "danger",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      slot: "start",
                      icon: arrowUndoOutline
                    }), t("Odustani")]
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    onClick: handleCrop,
                    color: "secondary",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      slot: "start",
                      icon: saveOutline
                    }), t("Primeni")]
                  })
                })]
              })
            })]
          });
        };
        const CropView$1 = reactExports.memo(reactExports.forwardRef(CropView));
        function AutoCropControllerModal(props, ref) {
          const {
            image,
            aspectRatio
          } = props;
          const {
            handleClose,
            cropViewProps
          } = props;
          const cropViewRef = reactExports.useRef(null);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonPage, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: aspectRatio && /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                    children: [aspectRatio.width, " x ", aspectRatio.height]
                  })
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              fullscreen: true,
              className: "ion-padding ion-text-center",
              children: image && /* @__PURE__ */jsxRuntimeExports.jsx(CropView$1, {
                ref: cropViewRef,
                image,
                onDiscard: handleClose,
                hideActions: true,
                aspectRatio,
                ...cropViewProps
              })
            })]
          });
        }
        const AutoCropControllerModal$1 = reactExports.memo(reactExports.forwardRef(AutoCropControllerModal));
        const modalEnterAnimation = baseEl => {
          const root = baseEl.shadowRoot;
          const backdropAnimation = createAnimation().addElement(root?.querySelector("ion-backdrop")).fromTo("opacity", "0.01", "var(--backdrop-opacity)");
          const wrapperAnimation = createAnimation().addElement(root?.querySelector(".modal-wrapper")).keyframes([{
            offset: 0,
            opacity: "0",
            transform: "scale(0)"
          }, {
            offset: 1,
            opacity: "0.99",
            transform: "scale(1)"
          }]);
          return createAnimation().addElement(baseEl).duration(350).addAnimation([backdropAnimation, wrapperAnimation]);
        };
        const manageDataReducers = {
          manageData: manageDataSlices.reducer
        };
        const rootReducer = combineReducers(manageDataReducers);
        configureStore({
          reducer: rootReducer,
          middleware: getDefaultMiddleware => getDefaultMiddleware()
        });
        function withManageDataWrapper(WrappedComponent) {
          return class extends React.Component {
            render() {
              return /* @__PURE__ */jsxRuntimeExports.jsx(ManageDataWrapper, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(WrappedComponent, {
                  ...this.props
                })
              });
            }
          };
        }
        const DataContext = reactExports.createContext(void 0);
        const DispatchContext = reactExports.createContext(void 0);
        function useManageDataSelector(selector) {
          const manageDataState = React.useContext(DataContext);
          if (!manageDataState) {
            throw new Error("useManageDataSelector must be used within a ManageDataProvider");
          }
          return selector(manageDataState);
        }
        function useManageDataDispatch() {
          const dispatchContext = React.useContext(DispatchContext);
          if (dispatchContext?.dispatch === void 0) {
            throw new Error("useManageDataDispatch must be used within a ManageDataWrapper");
          }
          return action => {
            dispatchContext.dispatch(action);
            dispatchContext.reRender();
          };
        }
        function ManageDataWrapper({
          children
        }) {
          const manageDataStore = reactExports.useMemo(() => configureStore({
            reducer: combineReducers(manageDataReducers)
          }), []);
          const storeState = manageDataStore.getState();
          const dispatch = manageDataStore.dispatch;
          const [render, setRender] = reactExports.useState(false);
          const reRender = reactExports.useCallback(() => {
            setRender(!render);
          }, [render]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(DataContext.Provider, {
            value: storeState,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(DispatchContext.Provider, {
              value: {
                dispatch,
                reRender
              },
              children
            })
          });
        }
        reactExports.memo(ManageDataWrapper);
        const useAutoCropModalController = props => {
          const {
            cropAspectRatio
          } = props;
          const [images, setImages] = React.useState([]);
          const [image, setImage] = React.useState(void 0);
          const [activeIndex, setActiveIndex] = React.useState(void 0);
          const [croppedIndexes, setCroppedIndexes] = React.useState([]);
          const dispatch = useManageDataDispatch();
          const cropAspectRatioStr = `${cropAspectRatio.width}x${cropAspectRatio.height}`;
          const AutoCropControllerModalWrapper = () => {
            return /* @__PURE__ */jsxRuntimeExports.jsx(AutoCropControllerModal$1, {
              image,
              handleClose: function () {
                setActiveIndex((activeIndex ?? 0) + 1);
              },
              aspectRatio: cropAspectRatio,
              cropViewProps: {
                autoCropIndex: activeIndex,
                autoCrop: true,
                onAutoCrop: (croppedSrc, autoCropIndex) => {
                  if (autoCropIndex !== void 0) {
                    updateSelectedImage(croppedSrc, autoCropIndex).then(() => {
                      setActiveIndex(autoCropIndex + 1);
                    });
                  }
                }
              }
            });
          };
          const updateSelectedImage = async (croppedSrc, autoCropIndex) => {
            const selectedImage = images[autoCropIndex];
            if (!croppedIndexes.includes(autoCropIndex)) {
              setCroppedIndexes([...croppedIndexes, autoCropIndex]);
              dispatch(updateManageDataItemPhoto({
                index: selectedImage.index,
                image: {
                  ...selectedImage,
                  croppedUrls: {
                    [cropAspectRatioStr]: croppedSrc
                  }
                }
              }));
            }
          };
          const [present, dismiss] = useIonModal(AutoCropControllerModalWrapper, {
            onDismiss: (data, role) => dismiss(data, role)
          });
          const [presentLoader, dismissLoader] = useIonLoading();
          reactExports.useEffect(() => {
            if (activeIndex !== void 0) {
              if (activeIndex >= images.length) {
                dismiss();
                dismissLoader();
                setActiveIndex(void 0);
                setCroppedIndexes([]);
              } else {
                setImage(images[activeIndex]);
              }
            }
          }, [activeIndex]);
          const startAutoCrop = images2 => {
            setImages(images2);
            setActiveIndex(0);
            present({
              enterAnimation: modalEnterAnimation
            });
            presentLoader({
              message: t("Auto-cropping images...")
            });
          };
          return {
            startAutoCrop
          };
        };
        const useConfirmationAlert = (callbacks, options) => {
          const [presentAlert, dismiss] = useIonAlert();
          return [overrideOptions => {
            const {
              cancelCallback,
              confirmCallback,
              buttonsTextsKeys,
              ...presentOptions
            } = {
              ...options,
              ...callbacks,
              ...overrideOptions
            };
            const cancelKey = buttonsTextsKeys?.cancel ?? "Odustani";
            const confirmKey = buttonsTextsKeys?.confirm ?? "OK";
            return presentAlert({
              header: t("Potvrda"),
              buttons: [{
                text: t(cancelKey),
                role: "cancel",
                handler: cancelCallback
              }, {
                text: t(confirmKey),
                role: "confirm",
                handler: confirmCallback
              }],
              ...presentOptions
            });
          }, dismiss];
        };
        const formatBytes = bytes => {
          if (bytes === 0) return "0 Bytes";
          const k = 1024;
          const sizes = ["Bytes", "KB", "MB", "GB"];
          const i = Math.floor(Math.log(bytes) / Math.log(k));
          return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
        };
        const getFileSizeFromUrl = async url => {
          try {
            if (url.startsWith("data:")) {
              const base64String = url.split(",")[1];
              if (base64String) {
                return base64String.length * 3 / 4;
              }
            } else if (url.startsWith("blob:")) {
              const response = await fetch(url);
              const blob = await response.blob();
              return blob.size;
            }
            return 0;
          } catch {
            return 0;
          }
        };
        const ImageSizeDisplay = ({
          url,
          maxSize = 10 * 1024 * 1024
        }) => {
          const [size, setSize] = reactExports.useState(null);
          reactExports.useEffect(() => {
            const fetchSize = async () => {
              const fileSize = await getFileSizeFromUrl(url);
              if (fileSize > 0) {
                setSize(fileSize);
              }
            };
            fetchSize();
          }, [url]);
          if (!size) return null;
          const isOverLimit = size > maxSize;
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: isOverLimit ? "animate-pulse" : "",
            style: {
              position: "absolute",
              bottom: "8px",
              right: "8px",
              padding: "4px 8px",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              borderRadius: "4px",
              zIndex: 10
            },
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              },
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: isOverLimit ? "danger" : "light",
                style: {
                  fontSize: "12px",
                  color: isOverLimit ? "#ff6b6b" : "#ffffff",
                  fontWeight: isOverLimit ? "bold" : "normal"
                },
                children: formatBytes(size)
              }), isOverLimit && /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                color: "danger",
                style: {
                  fontSize: "10px",
                  color: "#ff6b6b",
                  fontWeight: "normal"
                },
                children: ["Max: ", formatBytes(maxSize)]
              })]
            })
          });
        };
        register();
        function PhotoGallery(props, ref) {
          const {
            defaultActiveSlide,
            photos,
            setSelectedImageIndex
          } = props;
          const {
            cropAspectRatio,
            notCroppedPhotos,
            editOnSelect
          } = props;
          const {
            handleRemoveImages,
            handleOnManageAction,
            handleOnSortAction,
            pendingUploadCount = 0,
            onUploadClick
          } = props;
          const availableActions = {
            ...{
              crop: true,
              sort: true
            },
            ...props.availableActions
          };
          const [presentRemovePhoto] = useConfirmationAlert({
            confirmCallback: () => {
              removePhoto();
            }
          });
          const cropAspectRatioStr = `${cropAspectRatio.width}x${cropAspectRatio.height}`;
          const [presentActions] = useIonActionSheet();
          const [activeSlide, setActiveSlide] = React.useState(defaultActiveSlide ?? 0);
          const swiperRef = React.useRef(null);
          const dispatch = useManageDataDispatch();
          const {
            startAutoCrop
          } = useAutoCropModalController({
            cropAspectRatio
          });
          reactExports.useImperativeHandle(ref, () => ({
            setGalleryStep: step => {
              setActiveSlide(step);
            },
            handleStartAutoCrop: () => {
              handleOnAutoCrop();
            }
          }));
          const handleImageClick = () => {
            canCrop && editOnSelect && setSelectedImageIndex(activeSlide ?? 0);
          };
          const handleSlideChange = swiper => {
            setActiveSlide(swiper.activeIndex);
          };
          const handleOnSort = () => handleOnSortAction ? handleOnSortAction() : dispatch(setShowSortDataModal(true));
          const handleOnManage = () => handleOnManageAction ? handleOnManageAction() : dispatch(setShowManageListModal(true));
          const handleOnCrop = () => {
            setSelectedImageIndex(activeSlide ?? 0);
          };
          const handleOnAutoCrop = () => {
            if (notCroppedPhotos?.length) {
              startAutoCrop(notCroppedPhotos);
            }
          };
          const presentAdditionActions = () => {
            presentActions({
              header: t("Dodatne opcije"),
              buttons: [{
                icon: funnelOutline,
                text: t("Sortiraj"),
                data: {
                  action: "sort"
                },
                cssClass: photos.length < 2 ? "cursor-not-allowed focus:outline-none opacity-25" : void 0,
                handler: () => {
                  if (photos.length >= 2) {
                    handleOnSort();
                  }
                }
              }, {
                icon: cropOutline,
                text: t(`Auto Crop (${notCroppedPhotos?.length})`),
                data: {
                  action: "crop"
                },
                cssClass: !notCroppedPhotos?.length ? "cursor-not-allowed focus:outline-none opacity-25" : void 0,
                handler: () => {
                  if (notCroppedPhotos?.length) {
                    handleOnAutoCrop();
                  }
                }
              }, {
                icon: listCircleSharp,
                text: t("Upravljanje slikama"),
                data: {
                  action: "sort"
                },
                handler: () => {
                  handleOnManage();
                }
              }, {
                text: t("Obriši"),
                role: "destructive",
                data: {
                  action: "delete"
                },
                handler: () => {
                  handleRemovePhoto();
                }
              }, {
                text: t("Cancel"),
                role: "cancel",
                data: {
                  action: "cancel"
                }
              }]
            });
          };
          const removePhotoLocally = photoIndex => {
            dispatch(removeManageDataItems([photoIndex]));
          };
          const removePhoto = () => {
            if (activeSlide !== void 0) {
              if (photos[activeSlide].id !== void 0 && handleRemoveImages) {
                handleRemoveImages?.([photos[activeSlide]])?.then(response => {
                  if ("data" in response && response.data.success) {
                    removePhotoLocally(activeSlide);
                  }
                });
              } else {
                removePhotoLocally(activeSlide);
              }
            }
          };
          const handleRemovePhoto = () => {
            if (photos.length === 1 && props.handleClose) {
              props.handleClose();
            } else {
              presentRemovePhoto({
                message: t("Da li ste sigurni da želite da obrišete sliku?")
              });
            }
          };
          const canCrop = reactExports.useMemo(() => {
            if (activeSlide !== void 0 && photos.length) {
              const photo = photos[activeSlide];
              return photo?.id === void 0 && availableActions.crop;
            }
            return false;
          }, [activeSlide, photos]);
          const bindDouble = c(() => {
            canCrop && handleOnCrop();
          }, void 0, {
            onSingleTap: () => {
              handleImageClick();
            }
          });
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
              style: {
                position: "absolute"
              },
              color: "translucent",
              hidden: !photos.length,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                slot: "end",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleRemovePhoto,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    slot: "end",
                    icon: trashOutline,
                    color: "danger"
                  })
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper$1, {
              ref: swiperRef,
              spaceBetween: 50,
              slidesPerView: 1,
              navigation: true,
              pagination: {
                clickable: true
              },
              scrollbar: {
                draggable: true
              },
              speed: 400,
              initialSlide: activeSlide,
              currentStep: activeSlide ?? 0,
              onSlideChange: handleSlideChange,
              autoHeight: false,
              className: "photo-gallery-swiper",
              children: photos.map((photo, index) => {
                const isNewImage = photo?.id === void 0;
                const imageUrl = cropAspectRatio && photo.croppedUrls?.[cropAspectRatioStr] ? photo.croppedUrls?.[cropAspectRatioStr] : photo.url;
                return /* @__PURE__ */jsxRuntimeExports.jsxs(SwiperSlide, {
                  style: {
                    position: "relative"
                  },
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonImg, {
                    src: imageUrl,
                    alt: photo.name,
                    ...bindDouble,
                    className: "photo-gallery-img"
                  }), isNewImage && /* @__PURE__ */jsxRuntimeExports.jsx(ImageSizeDisplay, {
                    url: imageUrl,
                    maxSize: props.maxSize
                  })]
                }, "slide" + index);
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
              className: "actions",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                slot: "start",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  color: "secondary",
                  onClick: handleOnCrop,
                  disabled: !canCrop,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    slot: "start",
                    icon: cropOutline
                  }), "Crop"]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: presentAdditionActions,
                  disabled: !photos.length,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    slot: "icon-only",
                    icon: optionsOutline
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                slot: "end",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  color: pendingUploadCount > 0 ? "warning" : "medium",
                  onClick: onUploadClick,
                  disabled: pendingUploadCount === 0,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    slot: "start",
                    icon: cloudUploadOutline
                  }), pendingUploadCount > 0 ? `${t("Upload")} (${pendingUploadCount})` : t("Upload")]
                })
              })]
            })]
          });
        }
        const PhotoGallery$1 = reactExports.memo(reactExports.forwardRef(PhotoGallery));
        function CropViewModal(props, ref) {
          const {
            isActive,
            image,
            aspectRatio
          } = props;
          const {
            handleClose,
            cropViewProps
          } = props;
          const cropViewRef = reactExports.useRef(null);
          const enterAnimation = baseEl => {
            const root = baseEl.shadowRoot;
            const backdropAnimation = createAnimation().addElement(root?.querySelector("ion-backdrop")).fromTo("opacity", "0.01", "var(--backdrop-opacity)");
            const wrapperAnimation = createAnimation().addElement(root?.querySelector(".modal-wrapper")).keyframes([{
              offset: 0,
              opacity: "0",
              transform: "scale(0)"
            }, {
              offset: 1,
              opacity: "0.99",
              transform: "scale(1)"
            }]);
            return createAnimation().addElement(baseEl).duration(350).addAnimation([backdropAnimation, wrapperAnimation]);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen: isActive,
            onDidDismiss: handleClose,
            enterAnimation,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: aspectRatio && /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                    children: [aspectRatio.width, " x ", aspectRatio.height]
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: "Close"
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              fullscreen: true,
              className: "ion-padding ion-text-center",
              children: image && /* @__PURE__ */jsxRuntimeExports.jsx(CropView$1, {
                ref: cropViewRef,
                image,
                onDiscard: handleClose,
                aspectRatio,
                ...cropViewProps
              })
            })]
          });
        }
        const CropViewModal$1 = reactExports.memo(reactExports.forwardRef(CropViewModal));
        const getAspectRatioStr = aspectRatio => `${aspectRatio.width}x${aspectRatio.height}`;
        const windowWidth = window.innerWidth;
        const commonPhotoAspectRatio = {
          width: 4,
          height: 5
        };
        const getPathBySize = exports("k", img => {
          if (!img) {
            return "";
          }
          switch (true) {
            case windowWidth >= 1920:
              return img["fullHd" /* fullHd */];
            case windowWidth >= 1280:
              return img["hd" /* hd */];
            case windowWidth >= 768:
              return img["small" /* small */];
            default:
              return img["mobile" /* mobile */];
          }
        });
        function PhotoEditor(props, ref) {
          const dispatch = useManageDataDispatch();
          const [selectedImageIndex, setSelectedImageIndex] = reactExports.useState(void 0);
          const manageDataItems = useManageDataSelector(getManageItems);
          const selectedImage = selectedImageIndex !== void 0 ? manageDataItems?.[selectedImageIndex].image : void 0;
          const cropViewModalRef = reactExports.useRef(null);
          const photoGalleryRef = reactExports.useRef(null);
          const photos = reactExports.useMemo(() => manageDataItems?.length ? manageDataItems.map(manageDataItem => manageDataItem.image) : [], [manageDataItems]);
          const photoAspectRatio = props.photoAspectRatio ?? commonPhotoAspectRatio;
          const photoAspectRatioStr = getAspectRatioStr(photoAspectRatio);
          const notCroppedPhotos = useManageDataSelector(getNonCroppedItems(photoAspectRatioStr))?.map(manageDataItem => manageDataItem.image) ?? [];
          const [uploadedImages, setUploadedImages] = reactExports.useState(photos);
          reactExports.useImperativeHandle(ref, () => ({
            setGalleryStep: step => {
              photoGalleryRef.current?.setGalleryStep(step);
            },
            handleAutoCrop: () => {
              photoGalleryRef.current?.handleStartAutoCrop?.();
            }
          }));
          const updateSelectedImage = async (croppedSrc, removeSelected = true) => {
            if (selectedImageIndex !== void 0 && selectedImage) {
              dispatch(updateManageDataItemPhoto({
                index: selectedImageIndex,
                image: {
                  ...selectedImage,
                  croppedUrls: {
                    [photoAspectRatioStr]: croppedSrc
                  }
                }
              }));
              removeSelected && setSelectedImageIndex(void 0);
            }
          };
          const handleGalleryClose = props.onSetStep ? () => {
            props.onSetStep?.(0);
          } : void 0;
          reactExports.useEffect(() => {
            setUploadedImages(photos);
          }, [photos]);
          reactExports.useEffect(() => {
            dispatch(setManageDataItems(props.photos?.map(photo => ({
              id: photo.id,
              index: photo.index,
              image: photo,
              sortOrder: photo.index
            })) ?? []));
          }, [props.photos]);
          reactExports.useEffect(() => {
            if (props.onChangedPhotos) {
              props.onChangedPhotos(manageDataItems?.map(manageDataItem => ({
                id: manageDataItem.id,
                url: manageDataItem.image?.croppedUrls?.[photoAspectRatioStr] ?? "",
                fileAfterId: getFirstUploadedFileIdSortedBehindIndex(manageDataItems ?? [], manageDataItem.image?.index ?? 0)
              })).filter(image => image.url.length || image.id) ?? []);
            }
          }, [manageDataItems]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(PhotoGallery$1, {
              ref: photoGalleryRef,
              photos: uploadedImages,
              notCroppedPhotos,
              setSelectedImageIndex,
              cropAspectRatio: photoAspectRatio,
              handleClose: handleGalleryClose,
              ...props.galleryProps
            }), /* @__PURE__ */jsxRuntimeExports.jsx(CropViewModal$1, {
              ref: cropViewModalRef,
              isActive: selectedImageIndex !== void 0,
              handleClose: () => {
                setSelectedImageIndex(void 0);
              },
              image: selectedImage,
              aspectRatio: photoAspectRatio,
              cropViewProps: {
                onSave: updateSelectedImage
              }
            })]
          });
        }
        const PhotoEditor$1 = reactExports.memo(reactExports.forwardRef(PhotoEditor));
        var ItemsActions = /* @__PURE__ */(ItemsActions2 => {
          ItemsActions2["Remove"] = "Remove";
          ItemsActions2["Edit"] = "Edit";
          ItemsActions2["Check"] = "Check";
          return ItemsActions2;
        })(ItemsActions || {});
        var ListActions = /* @__PURE__ */(ListActions2 => {
          ListActions2["Remove"] = "Remove";
          ListActions2["Add"] = "Add";
          ListActions2["SelectEnable"] = "SelectEnable";
          ListActions2["SelectAll"] = "SelectAll";
          ListActions2["AutoCrop"] = "AutoCrop";
          return ListActions2;
        })(ListActions || {});
        function ManageListItem(props) {
          const {
            data,
            onHandleAction
          } = props;
          const {
            showCheckbox,
            setShowCheckbox,
            isSelected
          } = props;
          const {
            availableActions
          } = props;
          const [isChecked, setIsChecked] = React.useState(isSelected);
          const [preventToggle, setPreventToggle] = React.useState(false);
          const [isOptionsDisabled, setIsOptionsDisabled] = reactExports.useState(true);
          const slideRef = reactExports.useRef(null);
          const slideOptionRef = reactExports.useRef(null);
          const handleSlide = () => {
            if (slideRef.current?.classList.contains("item-sliding-active-options-end")) {
              slideClose();
            } else {
              slideRef.current?.open("end");
              setIsOptionsDisabled(false);
            }
          };
          const slideClose = () => {
            slideRef.current?.close();
            setIsOptionsDisabled(true);
          };
          const handleAction = action => event => {
            event.stopPropagation();
            onHandleAction?.({
              data,
              type: action
            });
          };
          const handleDragMove = event => {
            if (event.detail.amount < -30) {
              if (!showCheckbox) {
                setShowCheckbox(true);
              }
              if (!isChecked) {
                setIsChecked(true);
              }
              slideClose();
            } else if (event.detail.amount > 30 && showCheckbox) {
              setShowCheckbox(false);
              setIsChecked(false);
              slideClose();
            }
            if (event.detail.ratio === 1) {
              if (!showCheckbox) {
                setIsOptionsDisabled(false);
              }
            }
          };
          const toggleIsChecked = () => {
            setIsChecked(!isChecked);
          };
          const handleItemDoubleClick = () => {
            if (!showCheckbox) {
              setShowCheckbox(true);
              setIsChecked(true);
            }
          };
          reactExports.useEffect(() => {
            if (!showCheckbox && isChecked !== void 0) {
              setIsChecked(void 0);
            }
          }, [showCheckbox]);
          reactExports.useEffect(() => {
            if (isChecked !== void 0 && isChecked !== isSelected) {
              onHandleAction?.({
                data,
                type: ItemsActions.Check,
                isChecked
              });
            }
          }, [isChecked]);
          reactExports.useEffect(() => {
            if (isChecked !== isSelected) {
              setIsChecked(isSelected);
            }
          }, [isSelected]);
          const bindDouble = c(() => {
            handleItemDoubleClick();
          });
          const bindHold = V(showCheckbox ? null : () => {
            handleItemDoubleClick();
          }, {
            threshold: 300,
            onStart: () => {
              setPreventToggle(true);
            },
            onCancel: () => {
              setTimeout(() => {
                setPreventToggle(false);
              });
            },
            onFinish: () => {
              setTimeout(() => {
                setPreventToggle(false);
              }, 200);
            }
          });
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItemSliding, {
            ref: slideRef,
            onIonDrag: handleDragMove,
            onAnimationEnd: () => console.log("animation end"),
            disabled: showCheckbox,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItemOptions, {
              side: "start"
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonThumbnail, {
                slot: "start",
                ...bindHold(),
                ...bindDouble,
                children: /* @__PURE__ */jsxRuntimeExports.jsx("img", {
                  alt: "Silhouette of mountains",
                  src: data.image?.url
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                ...bindDouble,
                children: showCheckbox ? /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                    checked: isChecked,
                    onIonChange: toggleIsChecked,
                    disabled: preventToggle,
                    children: data.label ?? data.id ?? data.index
                  })
                }) : data.label ?? data.id ?? data.index
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonReorder, {
                color: "light",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: menuOutline
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                onClick: handleSlide,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: chevronForwardOutline,
                  slot: "end",
                  role: "img"
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItemOptions, {
              side: "end",
              onClick: handleSlide,
              ref: slideOptionRef,
              children: [availableActions?.includes(ItemsActions.Edit) && /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOption, {
                onClick: handleAction(ItemsActions.Edit),
                disabled: isOptionsDisabled,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "icon-only",
                  icon: constructOutline
                })
              }), availableActions?.includes(ItemsActions.Remove) && /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOption, {
                onClick: handleAction(ItemsActions.Remove),
                color: "danger",
                disabled: isOptionsDisabled,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "icon-only",
                  icon: trashOutline
                })
              })]
            })]
          });
        }
        const ManageListItem$1 = reactExports.memo(ManageListItem);
        function ManageListActions(props) {
          const {
            showCheckbox,
            setShowCheckbox,
            selectedCount = 0,
            totalCount = 0
          } = props;
          const handleShowCheckbox = show => () => {
            setShowCheckbox(show);
          };
          const handleAction = action => () => {
            props.handleListAction?.({
              type: action
              // todo remove any (fix ts)
            });
          };
          const allSelected = showCheckbox && selectedCount > 0 && selectedCount === totalCount;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              color: "light",
              size: "small",
              onClick: handleAction(ListActions.SelectAll),
              disabled: totalCount === 0,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: checkboxOutline,
                slot: "start"
              }), allSelected ? t("Poništi sve") : t("Selektuj sve")]
            }), showCheckbox ? /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              color: "light",
              onClick: handleShowCheckbox(false),
              size: "small",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: closeOutline,
                slot: "start"
              }), t("Zatvori selekciju")]
            }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              color: "light",
              onClick: handleShowCheckbox(true),
              size: "small",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: squareOutline,
                slot: "start"
              }), t("Selektuj slike")]
            })]
          });
        }
        const ManageListActions$1 = reactExports.memo(ManageListActions);
        function List(props) {
          const {
            handleCallAction
          } = props;
          const {
            manageItems,
            callAddReorderFromTo,
            callRemoveManageDataItems,
            callSetManageDataItems
          } = props;
          const addNew = props.addNew ? {
            labelKey: "addNew",
            position: "top",
            ...props.addNew
          } : void 0;
          const [items, setItems] = reactExports.useState(manageItems ?? []);
          const [selectedItems, setSelectedItems] = reactExports.useState([]);
          const [showCheckboxes, setShowCheckboxes] = React.useState(false);
          const onSelectionChangeRef = reactExports.useRef(props.onSelectionChange);
          const handleDeleteItems = selectedItems2 => {
            if (selectedItems2.length) {
              const localSelected = selectedItems2.filter(item => item.id === void 0);
              const existingSelected = selectedItems2.filter(item => item.id !== void 0);
              if (existingSelected.length) {
                handleCallAction?.({
                  data: existingSelected,
                  type: ItemsActions.Remove
                })?.then(() => {
                  deleteSelectedItems(selectedItems2);
                });
              } else if (localSelected.length) {
                deleteSelectedItems(localSelected);
              }
            }
          };
          const deleteSelectedItems = selectedItems2 => {
            callRemoveManageDataItems?.(selectedItems2.map(item => item.index));
            setSelectedItems([]);
            setShowCheckboxes(false);
          };
          const [presentDeleteItems] = useConfirmationAlert({
            confirmCallback: () => {
              handleDeleteItems(selectedItems);
            }
          });
          const handleAction = manageDataAction => {
            switch (manageDataAction.type) {
              case ItemsActions.Remove:
                presentDeleteItems({
                  confirmCallback: () => {
                    const selectedItems2 = Array.isArray(manageDataAction.data) ? manageDataAction.data : [manageDataAction.data];
                    handleDeleteItems(selectedItems2);
                  }
                });
                break;
              case ItemsActions.Edit:
                break;
              case ItemsActions.Check:
                toggleSelectedItems(manageDataAction.data, !manageDataAction.isChecked);
                break;
            }
          };
          const handleListAction = listAction => {
            switch (listAction.type) {
              case ListActions.Remove:
                presentDeleteItems();
                break;
              case ListActions.SelectAll:
                if (showCheckboxes && selectedItems.length === items.length && items.length > 0) {
                  setSelectedItems([]);
                } else {
                  setSelectedItems(items);
                  setShowCheckboxes(true);
                }
                break;
            }
          };
          const addToSelectedItems = (item, force = false) => {
            if (force || !selectedItems.includes(item)) {
              setSelectedItems(selectedItems2 => [...selectedItems2, item]);
            }
          };
          const removeFromSelectedItems = item => {
            setSelectedItems(selectedItems2 => selectedItems2.filter(selectedItem => selectedItem !== item));
          };
          const toggleSelectedItems = (item, remove) => {
            if (remove && selectedItems.includes(item)) {
              removeFromSelectedItems(item);
            } else if (!remove) {
              addToSelectedItems(item, true);
            }
          };
          reactExports.useEffect(() => {
            setItems(manageItems ?? []);
          }, [manageItems]);
          reactExports.useEffect(() => {
            if (!showCheckboxes && selectedItems.length) {
              setSelectedItems([]);
            }
          }, [showCheckboxes]);
          function handleReorder(event) {
            const from = event.detail.from;
            const to = event.detail.to;
            const itemFrom = items[from];
            const itemTo = items[to];
            if (from !== to) {
              const newItems = (sortItems => {
                return arrayMove(sortItems, from, to);
              })(items);
              setItems(newItems);
              setTimeout(() => {
                callSetManageDataItems?.(newItems);
              });
              if (itemFrom.id && itemTo.id && itemFrom.id !== itemTo.id) {
                callAddReorderFromTo?.({
                  from: itemFrom.id,
                  to: itemTo.id
                });
              }
            }
            event.detail.complete();
          }
          const AddNewButton = reactExports.useMemo(() => addNew && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
            expand: "full",
            fill: "outline",
            className: "mt-10",
            color: "dark",
            children: t(addNew.labelKey)
          }), [addNew]);
          reactExports.useEffect(() => {
            onSelectionChangeRef.current = props.onSelectionChange;
          }, [props.onSelectionChange]);
          const handleDeleteClickRef = reactExports.useRef();
          const handleDeleteClick = reactExports.useCallback(() => {
            presentDeleteItems({
              confirmCallback: () => {
                handleDeleteItems(selectedItems);
              }
            });
          }, [selectedItems, presentDeleteItems, handleDeleteItems]);
          reactExports.useEffect(() => {
            handleDeleteClickRef.current = handleDeleteClick;
          }, [handleDeleteClick]);
          reactExports.useEffect(() => {
            onSelectionChangeRef.current?.({
              showCheckboxes,
              selectedCount: selectedItems.length,
              onDelete: () => {
                handleDeleteClickRef.current?.();
              }
            });
          }, [showCheckboxes, selectedItems.length]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ManageListActions$1, {
              showCheckbox: showCheckboxes,
              setShowCheckbox: setShowCheckboxes,
              handleListAction,
              selectedCount: selectedItems.length,
              totalCount: items.length
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              children: [addNew?.position === "top" && AddNewButton, /* @__PURE__ */jsxRuntimeExports.jsx(IonReorderGroup, {
                disabled: false,
                onIonItemReorder: handleReorder,
                children: items?.map(sortItemData => /* @__PURE__ */jsxRuntimeExports.jsx(ManageListItem$1, {
                  data: sortItemData,
                  showCheckbox: showCheckboxes,
                  setShowCheckbox: setShowCheckboxes,
                  isSelected: selectedItems.includes(sortItemData),
                  availableActions: [ItemsActions.Edit, ItemsActions.Remove],
                  onHandleAction: handleAction
                }, sortItemData.sortOrder))
              }), addNew?.position === "bottom" && AddNewButton]
            })]
          });
        }
        const List$1 = reactExports.memo(List);
        function ManageList(props) {
          const dispatch = useManageDataDispatch();
          const manageItems = useManageDataSelector(getManageItems);
          const handAddReorderFromTo = data => {
            dispatch(addReorderFromTo(data));
          };
          const handleRemoveManageDataItems = data => {
            dispatch(removeManageDataItems(data));
          };
          const handleSetManageDataItems = data => {
            dispatch(setManageDataItems(data));
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(List$1, {
            ...props,
            manageItems,
            callAddReorderFromTo: handAddReorderFromTo,
            callRemoveManageDataItems: handleRemoveManageDataItems,
            callSetManageDataItems: handleSetManageDataItems
          });
        }
        const ManageList$1 = reactExports.memo(ManageList);
        function ManageListModal(props) {
          const {
            open,
            manageListProps,
            onHandleClose
          } = props;
          const [footerProps, setFooterProps] = reactExports.useState(null);
          const handleClose = () => {
            onHandleClose();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen: open,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Upravljanje slikama")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: t("Zatvori")
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(ManageList$1, {
                ...manageListProps,
                onSelectionChange: props2 => {
                  setFooterProps(props2);
                }
              })
            }), footerProps?.showCheckboxes && /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  expand: "block",
                  color: "danger",
                  disabled: footerProps.selectedCount === 0,
                  onClick: footerProps.onDelete,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: trashOutline,
                    slot: "start"
                  }), t("Obriši selektovano"), " ", footerProps.selectedCount > 0 && `(${footerProps.selectedCount})`]
                })
              })
            })]
          });
        }
        function SortableImageItem({
          photo,
          index
        }) {
          const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition
          } = useSortable({
            id: index
          });
          const style = {
            transform: CSS.Transform.toString(transform),
            touchAction: "none",
            transition
          };
          const imageUrl = photo.croppedUrls && Object.keys(photo.croppedUrls).length > 0 ? Object.values(photo.croppedUrls)[0] : photo.url;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
            ref: setNodeRef,
            style,
            ...attributes,
            ...listeners,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonThumbnail, {
              slot: "start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("img", {
                alt: photo.name || `Image ${index + 1}`,
                src: imageUrl
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
              children: [photo.name || `Slika ${index + 1}`, photo.id && /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                children: ["ID: ", photo.id]
              })]
            })]
          });
        }
        function SortImagesModal({
          open,
          photos,
          onClose,
          onSave
        }) {
          const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
          }), useSensor(TouchSensor));
          const [sortedPhotos, setSortedPhotos] = reactExports.useState(photos);
          const [hasChanges, setHasChanges] = reactExports.useState(false);
          const [isSaving, setIsSaving] = reactExports.useState(false);
          reactExports.useEffect(() => {
            setSortedPhotos(photos);
            setHasChanges(false);
          }, [photos, open]);
          const orderIds = reactExports.useMemo(() => sortedPhotos.map((_, index) => index), [sortedPhotos]);
          const handleDragEnd = event => {
            const {
              active,
              over
            } = event;
            if (over && active.id !== over.id) {
              setSortedPhotos(items => {
                const oldIndex = active.id;
                const newIndex = over.id;
                return arrayMove(items, oldIndex, newIndex);
              });
              setHasChanges(true);
            }
          };
          const handleSave = async () => {
            if (!hasChanges) {
              onClose();
              return;
            }
            const reorderData = [];
            const photosWithIds = sortedPhotos.filter(photo => photo.id);
            for (let i = 0; i < photosWithIds.length; i++) {
              const currentPhoto = photosWithIds[i];
              const originalIndex = photos.findIndex(p => p.id === currentPhoto.id);
              if (originalIndex !== i && originalIndex !== -1) {
                if (i > 0) {
                  const previousPhoto = photosWithIds[i - 1];
                  if (previousPhoto?.id) {
                    reorderData.push({
                      from: Number(currentPhoto.id),
                      to: Number(previousPhoto.id)
                    });
                  }
                } else {
                  const originalPreviousIndex = originalIndex - 1;
                  if (originalPreviousIndex >= 0 && photos[originalPreviousIndex]?.id) {
                    reorderData.push({
                      from: Number(currentPhoto.id),
                      to: Number(photos[originalPreviousIndex].id)
                    });
                  }
                }
              }
            }
            if (reorderData.length > 0) {
              setIsSaving(true);
              try {
                await onSave(reorderData);
                setHasChanges(false);
                onClose();
              } catch (error) {
                console.error("Error saving sort order:", error);
              } finally {
                setIsSaving(false);
              }
            } else {
              onClose();
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen: open,
            onDidDismiss: onClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Sortiraj slike")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(DndContext, {
                sensors,
                collisionDetection: closestCenter,
                onDragEnd: handleDragEnd,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(SortableContext, {
                  items: orderIds,
                  strategy: verticalListSortingStrategy,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                    children: sortedPhotos.map((photo, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SortableImageItem, {
                      photo,
                      index
                    }, photo.id || index))
                  })
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "start",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onClose,
                    disabled: isSaving,
                    children: t("Otkaži")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    onClick: handleSave,
                    disabled: isSaving || !hasChanges && sortedPhotos.length < 2,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: checkmarkOutline,
                      slot: "start"
                    }), isSaving ? t("Čuvanje...") : t("Sačuvaj")]
                  })
                })]
              })
            })]
          });
        }
        function useOnReorder(props) {
          const {
            callReorderApi,
            callReorderApiResult
          } = props;
          const itemsReorderFromTo = useManageDataSelector(getItemsReorderFromTo);
          const debounce = 1500;
          const dispatch = useManageDataDispatch();
          const [toggleReorderDataCheck, setToggleReorderDataCheck] = reactExports.useState(false);
          reactExports.useEffect(() => {
            const callReorder = () => {
              if (itemsReorderFromTo && itemsReorderFromTo.length && !callReorderApiResult?.isLoading) {
                return setTimeout(() => {
                  callReorderApi?.(itemsReorderFromTo)?.then(response => {
                    if ("data" in response) {
                      if (response.data.success) {
                        setToggleReorderDataCheck(!toggleReorderDataCheck);
                      }
                    }
                  });
                  dispatch(resetReorderFromTo());
                }, debounce);
              }
              return void 0;
            };
            const timeout = callReorder();
            return () => timeout ? clearTimeout(timeout) : void 0;
          }, [itemsReorderFromTo, toggleReorderDataCheck]);
        }
        const resizeImageToFullHD = async file => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Could not get canvas context"));
              return;
            }
            img.onload = () => {
              const {
                width,
                height
              } = img;
              const maxWidth = 1920;
              const maxHeight = 1080;
              let newWidth = width;
              let newHeight = height;
              if (width > maxWidth || height > maxHeight) {
                const aspectRatio = width / height;
                if (width > height) {
                  newWidth = Math.min(width, maxWidth);
                  newHeight = newWidth / aspectRatio;
                  if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = newHeight * aspectRatio;
                  }
                } else {
                  newHeight = Math.min(height, maxHeight);
                  newWidth = newHeight * aspectRatio;
                  if (newWidth > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = newWidth / aspectRatio;
                  }
                }
              }
              canvas.width = newWidth;
              canvas.height = newHeight;
              ctx.drawImage(img, 0, 0, newWidth, newHeight);
              canvas.toBlob(blob => {
                if (blob) {
                  const resizedFile = new File([blob], file.name, {
                    type: file.type,
                    lastModified: file.lastModified
                  });
                  resolve(resizedFile);
                } else {
                  reject(new Error("Could not create blob from canvas"));
                }
              }, file.type, 0.9
              // Quality (0.9 = 90%)
              );
            };
            img.onerror = () => {
              reject(new Error("Could not load image"));
            };
            img.src = URL.createObjectURL(file);
          });
        };
        const resizeImagesToFullHD = async files => {
          const resizePromises = files.map(file => resizeImageToFullHD(file));
          return Promise.all(resizePromises);
        };
        function PhotoUploader(props) {
          const {
            error,
            label
          } = props;
          const {
            register,
            control
          } = props;
          const [isManageListModalOpen, setIsManageListModalOpen] = React.useState(false);
          const [isSortModalOpen, setIsSortModalOpen] = React.useState(false);
          const {
            handleAddedPhotos,
            handleReorderImages,
            handleRemovedPhotos,
            handleUploadImages
          } = props.handlers;
          const handleOnSortAction = () => {
            setIsSortModalOpen(true);
          };
          const handleSortSave = async reorderData => {
            if (handleReorderImages) {
              await handleReorderImages(reorderData);
            }
          };
          const {
            reorderImagesResult,
            photos
          } = props;
          const {
            oneImage,
            cropAspectRatio
          } = props;
          const maxPhotos = oneImage ? 1 : props.maxPhotos ?? 20;
          const maxSize = props.maxSize ?? 10 * 1024 * 1024;
          const photoEditorRef = reactExports.useRef(null);
          const fileInputRef = reactExports.useRef(null);
          const dispatch = useManageDataDispatch();
          const manageDataItems = useManageDataSelector(getManageItems);
          const maxSortOrder = useManageDataSelector(manageItemsMaxSortOrder);
          const images = reactExports.useMemo(() => manageDataItems?.map(manageDataItem => manageDataItem.image) ?? [], [manageDataItems]);
          useOnReorder({
            callReorderApi: handleReorderImages,
            callReorderApiResult: reorderImagesResult
          });
          const handleSelectFile = async () => {
            let files = Object.values(fileInputRef?.current?.files ?? []);
            const imagesLength = oneImage ? 0 : images.length;
            if (files.length && imagesLength + files.length <= maxPhotos) {
              files = files.slice(0, maxPhotos - imagesLength);
              try {
                const resizedFiles = await resizeImagesToFullHD(files);
                const manageDataItems2 = [...Object.values(resizedFiles).map((file, index) => ({
                  sortOrder: maxSortOrder + index + 1,
                  index: imagesLength + index,
                  image: {
                    index: imagesLength + index,
                    name: file.name,
                    url: URL.createObjectURL(file)
                  },
                  label: file.name
                }))];
                if (oneImage) {
                  dispatch(setManageDataItems(manageDataItems2));
                } else {
                  dispatch(addManageDataItems(manageDataItems2));
                }
                photoEditorRef?.current?.setGalleryStep(imagesLength);
                setTimeout(() => {
                  handleAddedPhotos?.(resizedFiles, maxSortOrder);
                  if (fileInputRef.current?.files) {
                    fileInputRef.current.value = "";
                  }
                  photoEditorRef?.current?.handleAutoCrop?.();
                });
              } catch (error2) {
                console.error("Error resizing images:", error2);
                const manageDataItems2 = [...Object.values(files).map((file, index) => ({
                  sortOrder: maxSortOrder + index + 1,
                  index: imagesLength + index,
                  image: {
                    index: imagesLength + index,
                    name: file.name,
                    url: URL.createObjectURL(file)
                  },
                  label: file.name
                }))];
                if (oneImage) {
                  dispatch(setManageDataItems(manageDataItems2));
                } else {
                  dispatch(addManageDataItems(manageDataItems2));
                }
                photoEditorRef?.current?.setGalleryStep(imagesLength);
                setTimeout(() => {
                  handleAddedPhotos?.(files, maxSortOrder);
                  if (fileInputRef.current?.files) {
                    fileInputRef.current.value = "";
                  }
                  photoEditorRef?.current?.handleAutoCrop?.();
                });
              }
            }
          };
          const handleAddPhotos = () => {
            setTimeout(() => fileInputRef?.current?.click(), 200);
          };
          const canAddPhotos = oneImage || images.length < maxPhotos;
          const oneImageAddPhotoTitle = images.length ? t("Izmeni sliku") : t("Dodaj sliku");
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("input", {
                ref: fileInputRef,
                hidden: true,
                type: "file",
                accept: "image/*",
                multiple: !oneImage,
                onChange: handleSelectFile
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                  className: "actions",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    slot: "start",
                    className: "pl-4",
                    children: label
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                    slot: "end",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      color: "medium",
                      onClick: handleAddPhotos,
                      disabled: !canAddPhotos,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: addOutline
                      }), oneImage ? oneImageAddPhotoTitle : t("Dodaj slike")]
                    })
                  })]
                })
              }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: "danger",
                className: "ion-padding-start",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                  children: error.message
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              style: {
                position: "relative"
              },
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => {
                  const photosWithoutId = (field.value || []).filter(photo => !photo?.id || photo.id === null || photo.id === void 0);
                  const pendingUploadCount = photosWithoutId.length;
                  return /* @__PURE__ */jsxRuntimeExports.jsx(PhotoEditor$1, {
                    ref: photoEditorRef,
                    galleryProps: {
                      handleOnManageAction: () => {
                        setIsManageListModalOpen(true);
                      },
                      handleOnSortAction,
                      handleRemoveImages: handleRemovedPhotos,
                      maxSize,
                      pendingUploadCount,
                      onUploadClick: async () => {
                        if (pendingUploadCount > 0 && handleUploadImages) {
                          await handleUploadImages();
                        }
                      }
                    },
                    photos,
                    onChangedPhotos: field.onChange,
                    photoAspectRatio: cropAspectRatio
                  });
                }
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ManageListModal, {
              open: isManageListModalOpen,
              onHandleClose: () => setIsManageListModalOpen(false),
              manageListProps: {
                handleCallAction: manageDataAction => {
                  switch (manageDataAction.type) {
                    case ItemsActions.Remove:
                      {
                        const images2 = Array.isArray(manageDataAction.data) ? manageDataAction.data.map(item => item.image) : [manageDataAction.data.image];
                        if (images2.length) {
                          return new Promise(resolve => {
                            handleRemovedPhotos?.(images2)?.then(() => {
                              resolve();
                            });
                          });
                        }
                        break;
                      }
                  }
                }
              }
            }), /* @__PURE__ */jsxRuntimeExports.jsx(SortImagesModal, {
              open: isSortModalOpen,
              photos: photos || [],
              onClose: () => setIsSortModalOpen(false),
              onSave: handleSortSave
            })]
          });
        }
        const PhotoUploader$1 = withManageDataWrapper(PhotoUploader);
        let appTimezone = "Europe/Belgrade";
        const utcTimezone = "UTC";
        let cachedDate = null;
        let cachedHour = -1;
        const setAppTimezone = timezone => {
          appTimezone = timezone;
        };
        const getAppTimezone = exports("a7", () => {
          return appTimezone;
        });
        const getCurrentDateString = tz => {
          const timezone = tz || getAppTimezone();
          const now = /* @__PURE__ */new Date();
          const currentHour = now.getHours();
          if (cachedDate && cachedHour === currentHour) {
            return cachedDate;
          }
          const dateInTimezone = formatInTimeZone(now, timezone, "yyyy-MM-dd");
          cachedDate = dateInTimezone;
          cachedHour = currentHour;
          return cachedDate;
        };
        const toUtc = exports("a2", (timeString, tz) => {
          const timezone = getAppTimezone();
          const today = /* @__PURE__ */new Date();
          const timeParts = timeString.split(":");
          const hours = parseInt(timeParts[0], 10);
          const minutes = parseInt(timeParts[1], 10);
          const seconds = timeParts[2] ? parseInt(timeParts[2], 10) : 0;
          const localDateTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes, seconds);
          const utcDateTime = fromZonedTime(localDateTime, timezone);
          return formatInTimeZone(utcDateTime, utcTimezone, "HH:mm:ss");
        });
        const fromUtc = exports("a1", (utcTimeString, tz) => {
          const timezone = getAppTimezone();
          const currentDate = getCurrentDateString(timezone);
          const utcDate = parseISO(`${currentDate}T${utcTimeString}Z`);
          return formatInTimeZone(utcDate, timezone, "HH:mm:ss");
        });
        const fromUtcHM = exports("w", (utcTimeString, tz) => {
          const timezone = getAppTimezone();
          const timeWithSeconds = utcTimeString.split(":").length === 2 ? `${utcTimeString}:00` : utcTimeString;
          const currentDateUtc = getCurrentDateString(timezone);
          const utcDate = parseISO(`${currentDateUtc}T${timeWithSeconds}Z`);
          return formatInTimeZone(utcDate, timezone, "HH:mm");
        });
        const toLocalISOStringForIonDatetime = (utcDateTimeString, tz) => {
          const timezone = getAppTimezone();
          const utcDate = parseISO(utcDateTimeString);
          const localDate = toZonedTime(utcDate, timezone);
          return localDate.toISOString();
        };
        const fromUtcDateTimeToTime = exports("j", (utcDateTime, tz) => {
          const timezone = getAppTimezone();
          const localDate = toZonedTime(utcDateTime, timezone);
          return format(localDate, "HH:mm");
        });
        const parseUtcDate = exports("ac", (utcDateString, tz) => {
          const dateUtc = parseISO(utcDateString);
          if (!tz) {
            const dateFormatted2 = formatInTimeZone(dateUtc, utcTimezone, "yyyy-MM-dd");
            return {
              date: dateUtc,
              dateFormatted: dateFormatted2
            };
          }
          const timezone = tz;
          const dateInTz = toZonedTime(dateUtc, timezone);
          const dateFormatted = formatInTimeZone(dateUtc, timezone, "yyyy-MM-dd");
          return {
            date: dateInTz,
            dateFormatted
          };
        });
        const getUtcDateFormattedInTz = exports("a8", (utcDateString, tz) => {
          const timezone = getAppTimezone();
          const parsedDate = parseISO(utcDateString);
          return formatInTimeZone(parsedDate, timezone, "yyyy-MM-dd");
        });
        const daysOfWeek = {
          mon: {
            label: "Pon",
            key: "mon"
          },
          tue: {
            label: "Uto",
            key: "tue",
            prevKey: "mon"
          },
          wed: {
            label: "Sre",
            key: "wed",
            prevKey: "tue"
          },
          thu: {
            label: "Čet",
            key: "thu",
            prevKey: "wed"
          },
          fri: {
            label: "Pet",
            key: "fri",
            prevKey: "thu"
          },
          sat: {
            label: "Sub",
            key: "sat",
            prevKey: "fri"
          },
          sun: {
            label: "Ned",
            key: "sun",
            prevKey: "sat",
            color: "danger"
          }
        };
        const defaultWorkTimeFrom = "2023-01-01T09:00:00";
        const defaultWorkTimeTo = "2023-01-01T22:00:00";
        const dayOfWeeksValues = Object.values(daysOfWeek);
        const getSelectedWorkingHoursLabel = selectedDays => {
          const daysOfWeekArr = dayOfWeeksValues;
          let firstDay;
          let lastDay;
          const selectedDaysFormatted = [];
          const appendFirstAndLastDay = (firstDay2, lastDay2) => {
            const firstDayLabel = daysOfWeek[firstDay2].label;
            const lastDayLabel = daysOfWeek[lastDay2].label;
            if (firstDay2 === lastDay2) {
              selectedDaysFormatted.push(firstDayLabel);
            } else if (firstDay2 !== daysOfWeek[lastDay2].prevKey) {
              selectedDaysFormatted.push(`${firstDayLabel} - ${lastDayLabel}`);
            } else {
              selectedDaysFormatted.push(firstDayLabel, lastDayLabel);
            }
          };
          daysOfWeekArr.forEach(day => {
            if (selectedDays.includes(day.key)) {
              if (!firstDay) {
                firstDay = day.key;
                lastDay = day.key;
              } else if (lastDay === day.prevKey) {
                lastDay = day.key;
              }
            } else if (firstDay && lastDay) {
              appendFirstAndLastDay(firstDay, lastDay);
              firstDay = lastDay = void 0;
            }
          });
          if (firstDay && lastDay) {
            appendFirstAndLastDay(firstDay, lastDay);
          }
          return selectedDaysFormatted.join(", ");
        };
        const formatWorkingTime = workingTime => workingTime ? format(parseISO(workingTime), "HH:mm") : void 0;
        const timeToDateTime = time => {
          const date = parseISO(time);
          if (isValid(date)) {
            return time;
          }
          const currentTime = /* @__PURE__ */new Date();
          const [hours, minutes] = time.split(":");
          currentTime.setHours(Number(hours));
          currentTime.setMinutes(Number(minutes));
          return format(currentTime, "yyyy-MM-dd'T'HH:mm:ss");
        };
        const dateTimeToTime = dateTime => {
          const date = parseISO(dateTime);
          if (isValid(date)) {
            return format(date, "HH:mm:ss");
          }
          return dateTime;
        };
        const isWebPlatform = exports("t", isPlatform("desktop"));
        const isIos = exports("e", isPlatform("ios"));
        const isPwa = exports("i", isPlatform("pwa"));
        isPlatform("capacitor");
        const getIsWebview = userAgent => {
          return /webview|wv|ip((?!.*Safari)|(?=.*like Safari))/i.test(userAgent);
        };
        const tabPosition = isWebPlatform ? "top" : "bottom";
        const isWebView = window?.navigator && window?.navigator?.userAgent ? getIsWebview(window.navigator.userAgent) : true;
        const ionIconList = [];
        const ionIcons = {};
        const fetchIonIconsList = exports("ae", () => {
          if (!ionIconList.length) {
            ionIconList.push(...Object.keys(icons).map((name, index) => {
              ionIcons[name] = {
                value: icons[name],
                key: name,
                index
              };
              return ionIcons[name];
            }));
          }
          return ionIconList;
        });
        const getIonIconByName = name => {
          if (!ionIconList.length) {
            fetchIonIconsList();
          }
          return ionIcons[name];
        };
        const generateSlug = str => {
          str = str.replace(/^\s+|\s+$/g, "");
          str = str.toLowerCase();
          const from = "àáäâèéëêìíïîòóöôùúüûñçčćđšž·/_,:;";
          const to = "aaaaeeeeiiiioooouuuuncccdsz------";
          for (let i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
          }
          str = str.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
          return str;
        };
        function DataURIToBlob(dataURI) {
          const splitDataURI = dataURI.split(",");
          const byteString = splitDataURI[0].indexOf("base64") >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
          const mimeString = splitDataURI[0].split(":")[1].split(";")[0];
          const ia = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
          return new Blob([ia], {
            type: mimeString
          });
        }
        function createFormData(body, files) {
          const form = new FormData();
          const bodyKeys = Object.keys(body);
          bodyKeys.forEach(key => {
            const item = body[key];
            if (files[key] && typeof item === "string") {
              const file = DataURIToBlob(item);
              form.append(key, file, files[key]);
            } else {
              form.append(key, item);
            }
          });
          return form;
        }
        const userHasRoles = (user, roles, all = false) => {
          const userGroups = user.groups?.map(group => group.code);
          return all ? roles.every(role => userGroups?.includes(role)) : roles.some(role => userGroups?.includes(role));
        };
        function useDefaultProps(props, defaultProps) {
          return {
            ...defaultProps,
            ...props
          };
        }
        const fixUrlPath = url => url[url.length - 1] !== "/" ? url : url.slice(0, url.length - 1);
        const useAppDispatch$1 = exports("u", () => useDispatch());
        const useAppSelector$1 = useSelector;
        const commonSharedApi = sharedApi.injectEndpoints({
          endpoints: build => ({
            uploadFile: build.mutation({
              query: body => ({
                url: body.meta.apiUrl,
                method: "POST",
                body: body.data
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            deleteFile: build.mutation({
              query: ({
                apiUrl,
                attachmentId,
                ...rest
              }) => ({
                url: apiUrl,
                method: "DELETE",
                body: {
                  attachmentId,
                  ...rest
                }
                // Include all additional requestData
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            reorderFile: build.mutation({
              query: ({
                apiUrl,
                reorderData,
                ...rest
              }) => ({
                url: apiUrl,
                method: "POST",
                body: {
                  reorderData,
                  ...rest
                }
                // Include all additional requestData
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            getCountries: build.query({
              query: () => ({
                url: "/countries"
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            getCities: build.query({
              query: params => ({
                url: `${sharedApiPrefix}/cities`,
                params: params ?? {}
              }),
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useUploadFileMutation,
          useDeleteFileMutation,
          useReorderFileMutation
        } = commonSharedApi;
        const useShowNotification = exports("z", options => {
          const [presentToast, dismiss] = useIonToast();
          const memoOptions = reactExports.useMemo(() => options, []);
          const showNotification = reactExports.useCallback(overrideOptions => {
            return presentToast({
              position: "bottom",
              duration: 1500,
              ...memoOptions,
              ...overrideOptions
            });
          }, [presentToast, memoOptions]);
          return [showNotification, dismiss];
        });
        const useFileUploader = (uploadRequestData, callbacks, alertOptions) => {
          const [presentLoader, dismiss] = useIonLoading();
          const [showNotification] = useShowNotification();
          const hasShownErrorRef = reactExports.useRef(false);
          const [filesDataToUpload, setFilesDataToUpload] = reactExports.useState([]);
          const [currentFileIndex, setCurrentFileIndex] = reactExports.useState(void 0);
          const [retryCount, setRetryCount] = reactExports.useState(0);
          const [fileKey, setFileKey] = reactExports.useState("file");
          const [isUploading, setIsUploading] = reactExports.useState(false);
          const retryCountLimit = 10;
          const {
            apiUrl,
            uploadType,
            bodyData,
            skipUpload
          } = uploadRequestData;
          const [uploadFile, uploadFileResult] = useUploadFileMutation();
          const {
            data,
            isSuccess,
            isError
          } = uploadFileResult;
          const setFiles = (files, fileKey2) => {
            setFilesDataToUpload(files ?? []);
            if (fileKey2) {
              setFileKey(fileKey2);
            }
          };
          const handleUploadFile = async () => {
            if (apiUrl && uploadType && currentFileIndex !== void 0 && !skipUpload) {
              uploadFile({
                meta: {
                  apiUrl,
                  uploadType
                },
                data: createFormData({
                  ...bodyData,
                  ...filesDataToUpload[currentFileIndex]
                }, {
                  [fileKey]: fileKey + currentFileIndex
                })
              });
            }
          };
          const resetUploader = () => {
            setCurrentFileIndex(void 0);
            setFilesDataToUpload([]);
            setRetryCount(0);
            setIsUploading(false);
            hasShownErrorRef.current = false;
            dismiss();
          };
          reactExports.useEffect(() => {
            if (filesDataToUpload.length && !isUploading) {
              setIsUploading(true);
              presentLoader({
                message: "Uploading files..."
              });
              setCurrentFileIndex(0);
            }
          }, [filesDataToUpload, isUploading]);
          reactExports.useEffect(() => {
            if (currentFileIndex === void 0) {
              return;
            }
            if (currentFileIndex < filesDataToUpload.length) {
              handleUploadFile();
            }
          }, [currentFileIndex]);
          reactExports.useEffect(() => {
            if (isSuccess && data) {
              if (currentFileIndex !== void 0 && currentFileIndex < filesDataToUpload.length - 1) {
                callbacks?.onUploadSuccessful?.(filesDataToUpload[currentFileIndex], data.data);
                setCurrentFileIndex(currentFileIndex + 1);
              } else {
                if (currentFileIndex !== void 0) {
                  callbacks?.onUploadSuccessful?.(filesDataToUpload[currentFileIndex], data.data);
                }
                callbacks?.onSuccessful?.();
                resetUploader();
              }
            } else if (isSuccess && retryCount < retryCountLimit) {
              handleUploadFile();
              setRetryCount(retryCount + 1);
            }
          }, [isSuccess, uploadFileResult, retryCount]);
          reactExports.useEffect(() => {
            if (isError && !hasShownErrorRef.current) {
              hasShownErrorRef.current = true;
              resetUploader();
              showNotification({
                message: t("Greška pri upload-u") || "Error uploading",
                color: "danger",
                duration: 3e3
              });
              callbacks?.onError?.();
            }
          }, [isError, t, showNotification]);
          return {
            setFiles
          };
        };
        const useFileDeleter = (deleteRequestData, callbacks, alertOptions) => {
          const [presentLoader, dismiss] = useIonLoading();
          const [showNotification] = useShowNotification();
          const hasShownErrorRef = reactExports.useRef(false);
          const [photosToDelete, setPhotosToDelete] = reactExports.useState([]);
          const [currentPhotoIndex, setCurrentPhotoIndex] = reactExports.useState(void 0);
          const [retryCount, setRetryCount] = reactExports.useState(0);
          const [isDeleting, setIsDeleting] = reactExports.useState(false);
          const retryCountLimit = 10;
          const {
            apiUrl,
            deleteRequestData: requestData
          } = deleteRequestData;
          const [deleteFile, deleteFileResult] = useDeleteFileMutation();
          const {
            data,
            isSuccess,
            isError
          } = deleteFileResult;
          const deletePhotos = photoIds => {
            setPhotosToDelete(photoIds ?? []);
          };
          const handleDeleteFile = async () => {
            if (apiUrl && currentPhotoIndex !== void 0) {
              deleteFile({
                apiUrl,
                attachmentId: photosToDelete[currentPhotoIndex],
                ...(requestData || {})
              });
            }
          };
          const resetDeleter = () => {
            setCurrentPhotoIndex(void 0);
            setPhotosToDelete([]);
            setRetryCount(0);
            setIsDeleting(false);
            hasShownErrorRef.current = false;
            dismiss();
          };
          reactExports.useEffect(() => {
            if (photosToDelete.length && !isDeleting) {
              setIsDeleting(true);
              presentLoader({
                message: "Deleting files..."
              });
              setCurrentPhotoIndex(0);
            }
          }, [photosToDelete, isDeleting]);
          reactExports.useEffect(() => {
            if (currentPhotoIndex === void 0) {
              return;
            }
            if (currentPhotoIndex < photosToDelete.length) {
              handleDeleteFile();
            }
          }, [currentPhotoIndex]);
          reactExports.useEffect(() => {
            if (isSuccess && data) {
              if (currentPhotoIndex !== void 0 && currentPhotoIndex < photosToDelete.length - 1) {
                callbacks?.onDeleteSuccessful?.(photosToDelete[currentPhotoIndex]);
                setCurrentPhotoIndex(currentPhotoIndex + 1);
              } else {
                if (currentPhotoIndex !== void 0) {
                  callbacks?.onDeleteSuccessful?.(photosToDelete[currentPhotoIndex]);
                }
                callbacks?.onSuccessful?.();
                resetDeleter();
              }
            } else if (isSuccess && retryCount < retryCountLimit) {
              handleDeleteFile();
              setRetryCount(retryCount + 1);
            }
          }, [isSuccess, deleteFileResult, retryCount]);
          reactExports.useEffect(() => {
            if (isError && !hasShownErrorRef.current) {
              hasShownErrorRef.current = true;
              resetDeleter();
              showNotification({
                message: t("Greška pri brisanju") || "Error deleting",
                color: "danger",
                duration: 3e3
              });
              callbacks?.onError?.();
            }
          }, [isError, t, showNotification]);
          return {
            deletePhotos
          };
        };
        function GalleryArea({
          field,
          register,
          control,
          error,
          form
        }) {
          const {
            t
          } = useTranslation();
          const [showNotification] = useShowNotification();
          const [reorderFile] = useReorderFileMutation();
          const [photos, setPhotos] = reactExports.useState(field.photos || []);
          const [pendingFiles, setPendingFiles] = reactExports.useState([]);
          const [isUploading, setIsUploading] = reactExports.useState(false);
          const uploadValidationFieldName = "_upload_" + register.name;
          form?.watch(register.name);
          form ? useWatch({
            control: form.control,
            name: uploadValidationFieldName
          }) : null;
          form?.formState.errors;
          const {
            setFiles
          } = useFileUploader({
            apiUrl: field.uploadUrl,
            uploadType: UploadType.PHOTO,
            bodyData: field.uploadRequestData
            // Merge requestData with upload data
          }, {
            onUploadSuccessful: (file, uploadedPhoto) => {
              const newPhoto = {
                id: uploadedPhoto.id,
                url: uploadedPhoto.path,
                name: uploadedPhoto.fileName,
                index: 0
              };
              if (field.oneImage) {
                setPhotos([newPhoto]);
              } else {
                setPhotos(prev => [...prev, newPhoto]);
              }
              setPendingFiles(prev => prev.filter(f => f !== file));
              setIsUploading(false);
              field.onUploadSuccess?.(newPhoto);
            },
            onError: error2 => {
              setIsUploading(false);
              const errorMessage = error2?.data?.message || error2?.message || "Upload failed";
              field.onUploadError?.(errorMessage);
            }
          });
          const {
            deletePhotos
          } = useFileDeleter({
            apiUrl: field.deleteUrl || "",
            deleteRequestData: field.deleteRequestData
            // Merge requestData with delete data
          }, {
            onDeleteSuccessful: photoId => {
              setPhotos(prev => prev.filter(p => p.id !== photoId));
              field.onDeleteSuccess?.(photoId);
            },
            onError: () => {
              field.onDeleteError?.(new Error("Delete failed"));
            }
          });
          const handleAddedPhotos = reactExports.useCallback(files => {
            if (field.uploadBehavior === "immediate") {
              setIsUploading(true);
              setFiles(files.map(file => ({
                file
              })));
            } else {
              setPendingFiles(prev => [...prev, ...files]);
            }
          }, [field.uploadBehavior, setFiles]);
          const handleRemovedPhotos = reactExports.useCallback(async photosToRemove => {
            const photosWithIds = photosToRemove.filter(photo => photo.id);
            const photosWithoutIds = photosToRemove.filter(photo => !photo.id);
            photosWithoutIds.forEach(photo => {
              setPendingFiles(prev => prev.filter((_, index) => index !== photosToRemove.indexOf(photo)));
            });
            if (photosWithIds.length > 0) {
              deletePhotos(photosWithIds.map(photo => Number(photo.id)));
            }
          }, [deletePhotos]);
          const handleReorderImages = reactExports.useCallback(async reorderData => {
            try {
              if (field.reorderUrl && reorderData.length > 0) {
                const response = await reorderFile({
                  apiUrl: field.reorderUrl,
                  reorderData,
                  ...(field.reorderRequestData || {})
                }).unwrap();
                if (response?.data) {
                  const updatedPhotos = Array.isArray(response.data) ? response.data.map((photo, index) => ({
                    id: photo.id,
                    url: photo.path || photo.url,
                    name: photo.fileName || photo.name,
                    index
                  })) : photos;
                  setPhotos(updatedPhotos);
                  field.onReorderSuccess?.(updatedPhotos);
                } else {
                  field.onReorderSuccess?.(photos);
                }
              }
            } catch (error2) {
              showNotification({
                message: t("Greška pri sortiranju slika") || "Error reordering images",
                color: "danger",
                duration: 3e3
              });
              field.onReorderError?.(error2 instanceof Error ? error2 : new Error(String(error2)));
            }
          }, [field.reorderUrl, field.reorderRequestData, field.onReorderSuccess, field.onReorderError, showNotification, t, photos, reorderFile]);
          const uploadPendingFiles = reactExports.useCallback(async () => {
            if (form && pendingFiles.length > 0) {
              setIsUploading(true);
              const formPhotos = form.getValues(register.name);
              const photosToUpload = formPhotos?.filter(photo => !photo.id)?.map(photo => ({
                file: photo.url,
                // This is already the cropped image URL
                fileAfterId: photo.fileAfterId
              })) || [];
              if (photosToUpload.length > 0) {
                setFiles(photosToUpload);
              }
              return new Promise(resolve => {
                const checkUpload = () => {
                  if (pendingFiles.length === 0) {
                    resolve();
                  } else {
                    setTimeout(checkUpload, 100);
                  }
                };
                checkUpload();
              });
            }
          }, [pendingFiles, setFiles, form, register.name]);
          const handlers = reactExports.useMemo(() => ({
            handleAddedPhotos: (files, startIndex) => {
              handleAddedPhotos(files);
            },
            handleRemovedPhotos: async images => {
              await handleRemovedPhotos(images);
              return {
                data: {
                  data: null,
                  success: true
                }
              };
            },
            handleReorderImages: async reorderData => {
              await handleReorderImages(reorderData);
              return {
                data: {
                  data: null,
                  success: true
                }
              };
            },
            handleUploadImages: async () => {
              await uploadPendingFiles();
            }
          }), [handleAddedPhotos, handleRemovedPhotos, handleReorderImages, uploadPendingFiles]);
          reactExports.useEffect(() => {
            if (form && pendingFiles.length > 0 && form?.formState.isValidating) {
              uploadPendingFiles();
            }
          }, [form?.formState.isSubmitting, field.uploadBehavior, pendingFiles.length
          // Removed uploadPendingFiles from dependencies to prevent infinite loop
          ]);
          reactExports.useEffect(() => {
            if (field.onFormSave) {
              field.onFormSave();
            }
          }, [field.onFormSave]);
          reactExports.useEffect(() => {
            if (field.onFormError && error) {
              field.onFormError({
                [register.name]: error.message
              });
            }
          }, [field.onFormError, error, register.name]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(PhotoUploader$1, {
            label: field.label,
            register,
            error,
            control,
            handlers,
            photos,
            oneImage: field.oneImage,
            maxPhotos: field.maxPhotos,
            maxSize: field.maxSize,
            cropAspectRatio: field.cropAspectRatio
          });
        }
        function CommonIonicTextarea(props) {
          const {
            label,
            labelPlacement = "floating",
            register,
            error
          } = props;
          const {
            itemProps,
            inputProps,
            control
          } = props;
          const {
            maxlength,
            rows,
            translation
          } = props;
          const handleKeyPress = event => {
            if (props.preventEnter && event.key === "Enter") {
              event.preventDefault();
            }
          };
          const textAreaRef = reactExports.useRef(null);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              ...itemProps,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonTextarea, {
                  ref: textAreaRef,
                  label,
                  labelPlacement,
                  onIonInput: event => field.onChange(event),
                  onIonBlur: field.onBlur,
                  onKeyPress: handleKeyPress,
                  onIonChange: register.onBlur,
                  value: field.value,
                  autoGrow: true,
                  counter: !!maxlength,
                  maxlength,
                  rows: rows ?? 5,
                  className: "max-h-[500px] overflow-y-auto",
                  ...inputProps,
                  children: translation && /* @__PURE__ */jsxRuntimeExports.jsx(TranslationButton, {
                    translation,
                    fieldName: register.name,
                    fieldType: FieldType.TextArea,
                    label: label || "",
                    currentValue: field.value || ""
                  })
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const IonModalExtended = reactExports.forwardRef(({
          name,
          onClose,
          isPresented,
          onDidPresent,
          onDidDismiss,
          ...props
        }, ref) => {
          const history = useHistory();
          const handlePresentModal = reactExports.useCallback(event => {
            if (isPresented === void 0) {
              const params = new URLSearchParams(window.location.search);
              if (!params.has(name)) {
                params.append(name, "show");
                history.push({
                  search: params.toString()
                });
              }
            }
            onDidPresent?.(event);
          }, [history, name, isPresented, onDidPresent]);
          const handleDismissModal = reactExports.useCallback(event => {
            if (isPresented === void 0) {
              const params = new URLSearchParams(window.location.search);
              if (params.has(name)) {
                history.goBack();
              }
            }
            onDidDismiss?.(event);
            onClose();
          }, [history, name, isPresented, onDidDismiss, onClose]);
          reactExports.useEffect(() => {
            const handleBackNavigation = () => {
              const params = new URLSearchParams(window.location.search);
              if (!params.has(name)) {
                onClose();
              }
            };
            window.addEventListener("popstate", handleBackNavigation);
            return () => {
              window.removeEventListener("popstate", handleBackNavigation);
            };
          }, [history, onClose, name]);
          reactExports.useEffect(() => {
            const params = new URLSearchParams(window.location.search);
            if (params.has(name)) {
              params.delete(name);
              history.replace({
                search: params.toString()
              });
            }
          }, [name]);
          reactExports.useEffect(() => {
            if (isPresented === void 0) return;
            const params = new URLSearchParams(window.location.search);
            if (isPresented) {
              if (!params.has(name)) {
                params.append(name, "show");
                history.push({
                  search: params.toString()
                });
              }
            } else {
              if (params.has(name)) {
                params.delete(name);
                history.replace({
                  search: params.toString()
                });
              }
            }
          }, [isPresented]);
          const propsExtended = {
            onDidPresent: handlePresentModal,
            onDidDismiss: handleDismissModal
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonModal, {
            ...props,
            ...propsExtended,
            ref
          });
        });
        const IonModalExtended$1 = exports("y", reactExports.memo(IonModalExtended));
        function ModalActionButtons({
          onSave,
          onCancel,
          onDelete,
          isSaving = false,
          isDeleting = false,
          isSaveDisabled = false,
          showDelete = false,
          saveText,
          cancelText,
          deleteText,
          saveColor = "primary",
          cancelColor = "dark",
          deleteColor = "danger",
          cancelFill = "clear",
          deleteFill = "clear",
          className = "ion-no-padding"
        }) {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
            className,
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              onClick: onCancel,
              color: cancelColor,
              fill: cancelFill,
              slot: "start",
              className: showDelete ? "pr-2" : "pl-2",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: closeOutline,
                slot: "start"
              }), cancelText || t("Otkaži")]
            }), showDelete && onDelete && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              onClick: onDelete,
              color: deleteColor,
              fill: deleteFill,
              slot: "end",
              className: "pl-2",
              disabled: isDeleting,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: trashOutline,
                slot: "start"
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              onClick: onSave,
              color: saveColor,
              slot: "end",
              className: "pr-2",
              disabled: isSaving || isSaveDisabled,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: saveOutline,
                slot: "start"
              }), isSaving ? t("Čuvanje...") : saveText || t("Sačuvaj")]
            })]
          });
        }
        function WorkingTimeEditor({
          show,
          handleClose,
          handleSave,
          workingTime,
          modalTitle,
          defaultTimeFrom,
          defaultTimeTo,
          defaultDays
        }) {
          const getDefaultTimeFrom = () => {
            if (workingTime?.timeFromUtc) {
              return timeToDateTime(workingTime.timeFromUtc);
            }
            if (defaultTimeFrom) {
              return `2023-01-01T${defaultTimeFrom}:00`;
            }
            return defaultWorkTimeFrom;
          };
          const getDefaultTimeTo = () => {
            if (workingTime?.timeToUtc) {
              return timeToDateTime(workingTime.timeToUtc);
            }
            if (defaultTimeTo) {
              return `2023-01-01T${defaultTimeTo}:00`;
            }
            return defaultWorkTimeTo;
          };
          const [workingTimeFrom, setWorkingTimeFrom] = reactExports.useState(getDefaultTimeFrom());
          const [workingTimeTo, setWorkingTimeTo] = reactExports.useState(getDefaultTimeTo());
          const [selectedDays, setSelectedDays] = reactExports.useState(workingTime?.daysCodes || defaultDays || []);
          const [slotName, setSlotName] = reactExports.useState(workingTime?.name ?? "");
          const daysOfWeekArr = Object.values(daysOfWeek);
          const handleSelected = key => () => {
            if (!selectedDays.includes(key)) {
              setSelectedDays([...selectedDays, key]);
            } else {
              setSelectedDays(selectedDays.filter(day => day !== key));
            }
          };
          const isSelected = key => selectedDays.includes(key);
          const canSave = workingTimeFrom && workingTimeTo && selectedDays.length;
          const selectedWorkingHoursLabel = reactExports.useMemo(() => getSelectedWorkingHoursLabel(selectedDays), [selectedDays]);
          const slotNameReal = slotName.length ? slotName : selectedWorkingHoursLabel;
          const resetData = () => {
            setWorkingTimeFrom(getDefaultTimeFrom());
            setWorkingTimeTo(getDefaultTimeTo());
            setSelectedDays(defaultDays || []);
            setSlotName("");
          };
          const onSave = () => {
            if (canSave) {
              const timeFromUtc = dateTimeToTime(workingTimeFrom);
              const timeToUtc = dateTimeToTime(workingTimeTo);
              handleSave?.({
                name: slotNameReal,
                daysCodes: selectedDays,
                timeFromUtc,
                timeToUtc
              });
              resetData();
            }
          };
          const onClose = () => {
            handleClose();
            resetData();
          };
          const handleDateChangeFrom = event => {
            const newDate = event.detail.value;
            setWorkingTimeFrom(newDate);
          };
          const handleDateChangeTo = event => {
            const newDate = event.detail.value;
            setWorkingTimeTo(newDate);
          };
          const workingTimeFromFormatted = reactExports.useMemo(() => formatWorkingTime(workingTimeFrom), [workingTimeFrom]);
          const workingTimeToFormatted = reactExports.useMemo(() => formatWorkingTime(workingTimeTo), [workingTimeTo]);
          const handleSlotNameChange = event => {
            const newSlotName = event.detail.value ?? "";
            setSlotName(newSlotName);
          };
          reactExports.useEffect(() => {
            if (workingTime) {
              setWorkingTimeFrom(timeToDateTime(workingTime.timeFromUtc));
              setWorkingTimeTo(timeToDateTime(workingTime.timeToUtc));
              setSelectedDays(workingTime.daysCodes ?? workingTime.days);
              const nameLabel = getSelectedWorkingHoursLabel(workingTime.daysCodes ?? workingTime.days);
              setSlotName(nameLabel === workingTime.name ? "" : workingTime.name);
            }
          }, [workingTime]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended$1, {
            name: "working-time-editor",
            isOpen: show,
            onClose,
            ...(!isWebPlatform && {
              initialBreakpoint: 1,
              breakpoints: [0, 1]
            }),
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: workingTime ? modalTitle ? t("Izmena") + " " + modalTitle.toLowerCase() : t("Izmena radnog vremena") : modalTitle || t("Novo radno vreme")
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonGrid, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    style: {
                      textAlign: "-webkit-center"
                    },
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      children: t("Vreme od")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                      itemType: "time",
                      presentation: "time",
                      preferWheel: true,
                      hourCycle: "h24",
                      minuteValues: "0,15,30,45",
                      onIonChange: handleDateChangeFrom,
                      value: workingTimeFrom
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    style: {
                      textAlign: "-webkit-center"
                    },
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      children: t("Vreme do")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                      itemType: "time",
                      presentation: "time",
                      preferWheel: true,
                      hourCycle: "h24",
                      minuteValues: "0,15,30,45",
                      onIonChange: handleDateChangeTo,
                      value: workingTimeTo
                    })]
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                  children: daysOfWeekArr.map(day => /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                    className: "text-center",
                    children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      mode: "ios",
                      fill: !isSelected(day.key) ? "outline" : "solid",
                      color: "dark",
                      onClick: handleSelected(day.key),
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        color: day.color ?? void 0,
                        children: day.label
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                        condition: isSelected(day.key),
                        render: () => /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                          className: "ml-1 text-green-500 font-bold",
                          children: "✓"
                        }),
                        renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                          className: "ml-1 text-red-500 font-bold",
                          children: "✗"
                        })
                      })]
                    })
                  }, day.key))
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonFooter, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                      size: "6",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        className: "text-center",
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                          children: selectedWorkingHoursLabel
                        }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          children: [workingTimeFromFormatted ?? t("from"), " - ", workingTimeToFormatted ?? t("to")]
                        })]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                      size: "6",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                          label: "Naziv",
                          labelPlacement: "floating",
                          onIonChange: handleSlotNameChange,
                          value: slotName.length ? slotName : selectedWorkingHoursLabel
                        })
                      })
                    })]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(ModalActionButtons, {
                onSave,
                onCancel: onClose,
                isSaveDisabled: !canSave
              })]
            })]
          });
        }
        function WorkingTimeListItem({
          workingTime,
          editWorkingTime,
          handleRemoveItem
        }) {
          const slideRef = reactExports.useRef(null);
          const ionItemOptionsRef = reactExports.useRef(null);
          const showItemActions = event => {
            event.stopPropagation();
            slideRef.current?.open("end");
          };
          const handleSlotClick = event => {
            if (event.target && event.target !== ionItemOptionsRef.current) {
              return;
            }
            slideRef.current?.close();
          };
          const onRemoveItem = () => {
            handleRemoveItem?.(workingTime);
            slideRef.current?.close();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItemSliding, {
            ref: slideRef,
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              button: true,
              onClick: editWorkingTime(workingTime),
              detail: false,
              className: "ion-no-padding",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                slot: "start",
                children: workingTime.name
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                slot: "end",
                children: [formatWorkingTime(timeToDateTime(workingTime.timeFromUtc)), " -", " ", formatWorkingTime(timeToDateTime(workingTime.timeToUtc))]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                slot: "end",
                color: "default",
                onClick: showItemActions,
                size: "default",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: chevronForwardOutline,
                  className: "p-1"
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOptions, {
              side: "end",
              onClick: handleSlotClick,
              ref: ionItemOptionsRef,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOption, {
                color: "danger",
                onClick: onRemoveItem,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "icon-only",
                  icon: trashOutline
                })
              })
            })]
          });
        }
        const transformWorkingHoursBack = workingHours => {
          return workingHours;
        };
        function WorkingTimeList({
          workingHours,
          onChange,
          label,
          addNewLabel,
          modalTitle,
          defaultTimeFrom,
          defaultTimeTo,
          defaultDays
        }) {
          const [selectedWorkingTime, setSelectedWorkingTime] = reactExports.useState(void 0);
          const [showWorkingTimeEditor, setShowWorkingTimeEditor] = reactExports.useState(false);
          const handleClose = () => {
            setShowWorkingTimeEditor(false);
            selectedWorkingTime && setSelectedWorkingTime(void 0);
          };
          const handleOnChange = workingHours2 => {
            onChange(transformWorkingHoursBack(workingHours2));
          };
          const handleSave = workingTime => {
            if (selectedWorkingTime) {
              const index = workingHours.findIndex(wt => wt.name === selectedWorkingTime.name);
              if (index > -1) {
                workingHours[index] = workingTime;
                handleOnChange([...workingHours]);
              }
            } else {
              handleOnChange([...workingHours, workingTime]);
            }
            setShowWorkingTimeEditor(false);
            selectedWorkingTime && setSelectedWorkingTime(void 0);
          };
          const handleRemove = workingTime => {
            const index = workingHours.findIndex(wt => wt.name === workingTime.name);
            if (index > -1) {
              workingHours.splice(index, 1);
              handleOnChange([...workingHours]);
            }
          };
          const addWorkingTime = () => {
            selectedWorkingTime && setSelectedWorkingTime(void 0);
            setShowWorkingTimeEditor(true);
          };
          const editWorkingTime = workingTime => () => {
            setSelectedWorkingTime(workingTime);
            setShowWorkingTimeEditor(true);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              className: "w-full",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                className: "py-2 border-b-2",
                children: label
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                onClick: addWorkingTime,
                className: "ion-no-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: addOutline,
                  className: "pr-2"
                }), addNewLabel || t("Dodaj novo radno vreme")]
              }), workingHours.map((workingTime, index) => /* @__PURE__ */jsxRuntimeExports.jsx(WorkingTimeListItem, {
                workingTime,
                editWorkingTime,
                handleRemoveItem: handleRemove
              }, index))]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkingTimeEditor, {
              show: showWorkingTimeEditor,
              workingTime: selectedWorkingTime,
              handleClose,
              handleSave,
              modalTitle,
              defaultTimeFrom,
              defaultTimeTo,
              defaultDays
            })]
          });
        }
        const transformWorkingHours = workingHours => {
          return workingHours;
        };
        function CommonWorkingTime(props) {
          const {
            register,
            control,
            error,
            label,
            addNewLabel,
            modalTitle,
            defaultTimeFrom,
            defaultTimeTo,
            defaultDays
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(WorkingTimeList, {
                  workingHours: value ? transformWorkingHours(value) : [],
                  onChange,
                  label,
                  addNewLabel,
                  modalTitle,
                  defaultTimeFrom,
                  defaultTimeTo,
                  defaultDays
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        function WorkingTimeItem({
          workingTime,
          onChange,
          label,
          addNewLabel
        }) {
          const [showWorkingTimeEditor, setShowWorkingTimeEditor] = reactExports.useState(false);
          const [currentWorkingTime, setCurrentWorkingTime] = reactExports.useState(void 0);
          const handleClose = () => {
            setShowWorkingTimeEditor(false);
            setCurrentWorkingTime(void 0);
          };
          const handleSave = newWorkingTime => {
            onChange(newWorkingTime);
            setShowWorkingTimeEditor(false);
            setCurrentWorkingTime(void 0);
          };
          const handleAddWorkingTime = () => {
            setCurrentWorkingTime(void 0);
            setShowWorkingTimeEditor(true);
          };
          const handleEditWorkingTime = () => {
            setCurrentWorkingTime(workingTime);
            setShowWorkingTimeEditor(true);
          };
          workingTime ? getSelectedWorkingHoursLabel(workingTime.daysCodes ?? workingTime.days) : "";
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "w-full",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "py-2 border-b-2",
                children: label
              }), workingTime ? /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  button: true,
                  onClick: handleEditWorkingTime,
                  detail: false,
                  className: "ion-no-padding",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    slot: "start",
                    children: workingTime.name
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                    slot: "end",
                    children: [formatWorkingTime(timeToDateTime(workingTime.timeFromUtc)), " -", " ", formatWorkingTime(timeToDateTime(workingTime.timeToUtc))]
                  })]
                })
              }) : /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                onClick: handleAddWorkingTime,
                className: "ion-no-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: addOutline,
                  className: "pr-2"
                }), addNewLabel || t("Izaberite radno vreme")]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkingTimeEditor, {
              show: showWorkingTimeEditor,
              workingTime: currentWorkingTime,
              handleClose,
              handleSave
            })]
          });
        }
        function CommonWorkingTimeSingle(props) {
          const {
            register,
            control,
            error,
            label,
            addNewLabel
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(WorkingTimeItem, {
                  workingTime: value,
                  onChange,
                  label,
                  addNewLabel
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        function CommonListDataListItem(props) {
          const {
            placeholder,
            isNewItem,
            inputType
          } = props;
          const [item, setItem] = reactExports.useState(props.item ?? "");
          const [editMode, setEditMode] = reactExports.useState(false);
          const minLength = props.minLength ?? 3;
          const ionItemOptionsRef = reactExports.useRef(null);
          const handleChange = event => {
            setItem(event.currentTarget.value);
          };
          const handleEnter = event => {
            if (event.key === "Enter") {
              event.preventDefault();
              event.stopPropagation();
              if (item.length >= minLength) {
                handleSave();
              }
            }
          };
          const showEdit = () => {
            setEditMode(true);
            setTimeout(() => {
              inputRef.current?.setFocus();
            }, 120);
          };
          const inputRef = reactExports.useRef(null);
          const slideRef = reactExports.useRef(null);
          const handleSave = () => {
            props.onSave(props.index, item);
            setEditMode(false);
            if (isNewItem) {
              setItem("");
            }
          };
          const handleCancel = () => {
            setTimeout(() => {
              if (editMode) {
                setEditMode(false);
                setItem(isNewItem ? "" : props.item);
              }
            }, 300);
          };
          const handleDelete = () => {
            props.onRemove?.(props.index);
            setEditMode(false);
          };
          const showItemActions = event => {
            event.stopPropagation();
            slideRef.current?.open("end");
          };
          const handleSlotClick = event => {
            if (event.target && event.target !== ionItemOptionsRef.current) {
              return;
            }
            slideRef.current?.close();
          };
          reactExports.useEffect(() => {
            if (props.item !== item) {
              setItem(props.item);
            }
          }, [props.item]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonItemSliding, {
            ref: slideRef,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              button: true,
              detail: false,
              onClick: showEdit,
              children: editMode ? /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                  value: item,
                  onKeyUp: handleChange,
                  onKeyPress: handleEnter,
                  ref: inputRef,
                  onIonBlur: handleCancel,
                  type: inputType ?? "text"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSave,
                  slot: "end",
                  disabled: item.length < minLength,
                  size: "default",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: saveOutline,
                    slot: "icon-only"
                  })
                })]
              }) : isNewItem ? /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  children: placeholder
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  slot: "end",
                  color: "default",
                  size: "default",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: addOutline,
                    slot: "icon-only"
                  })
                })]
              }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  children: placeholder ?? item
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  slot: "end",
                  color: "default",
                  onClick: showItemActions,
                  size: "default",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronForwardOutline,
                    className: "p-1"
                  })
                })]
              })
            }), !isNewItem && !editMode && /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOptions, {
              side: "end",
              ref: ionItemOptionsRef,
              onClick: handleSlotClick,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonItemOption, {
                color: "danger",
                onClick: handleDelete,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "icon-only",
                  icon: trashOutline
                })
              })
            })]
          });
        }
        function CommonListDataList(props) {
          const {
            items,
            onChange,
            label,
            inputType,
            errors
          } = props;
          const handleSave = (itemIndex, item) => {
            items[itemIndex] = item;
            onChange([...items]);
          };
          const handleDelete = itemIndex => {
            items.splice(itemIndex, 1);
            onChange([...items]);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
            className: "w-full",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
              className: "py-2 border-b-2",
              children: label
            }), /* @__PURE__ */jsxRuntimeExports.jsx(CommonListDataListItem, {
              item: "",
              onSave: handleSave,
              index: items.length,
              placeholder: "Dodaj",
              isNewItem: true,
              inputType
            }), items.map((item, index) => /* @__PURE__ */jsxRuntimeExports.jsxs(reactExports.Fragment, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(CommonListDataListItem, {
                item,
                index,
                onSave: handleSave,
                onRemove: handleDelete,
                inputType
              }), errors && errors[index] && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: "danger",
                className: "ion-padding-start",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                  children: errors[index].message
                })
              })]
            }, item + index))]
          });
        }
        function CommonList(props) {
          const {
            register,
            control,
            error,
            label,
            inputType
          } = props;
          const singleError = !Array.isArray(error) ? error : void 0;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(CommonListDataList, {
                  items: value ?? [],
                  onChange,
                  label,
                  inputType,
                  errors: Array.isArray(error) ? error : void 0
                })
              })
            }), singleError && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: singleError.message
              })
            })]
          });
        }
        const CommonList$1 = reactExports.memo(CommonList);
        function CommonIonicSwitch(props) {
          const {
            label,
            labelPlacement,
            type,
            register,
            error
          } = props;
          const {
            itemProps,
            inputProps,
            control
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              ...itemProps,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                  checked: field.value,
                  onIonChange: e => field.onChange(e.detail.checked ? 1 : 0),
                  children: label
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const ListIonIcons = reactExports.lazy(() => __vitePreload(() => module.import('./ListIonIcons-legacy-Bt0QhebT.js'), false              ? __VITE_PRELOAD__ : void 0));
        function ListIonIconsModal({
          isOpen,
          setIsOpen,
          onSelectIcon
        }) {
          const [searchIcon, setSearchIcon] = React.useState(void 0);
          const handleDismiss = () => {
            setIsOpen(false);
          };
          const handleSelectIcon = icon => {
            setIsOpen(false);
            onSelectIcon?.(icon);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen,
            onDidDismiss: handleDismiss,
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonHeader, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Ikonice")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleDismiss,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSearchbar, {
                  debounce: 700,
                  onIonInput: ev => setSearchIcon(ev.target?.value),
                  onIonClear: () => setSearchIcon(null),
                  value: searchIcon
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
                fallback: "Ućitavanje ikonica...",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(ListIonIcons, {
                  onSelectIcon: handleSelectIcon,
                  searchIcon
                })
              })
            })]
          });
        }
        function SelectIonicIcon({
          onSelectionChanged,
          selectedItemValue,
          title
        }) {
          const modal = reactExports.useRef(null);
          selectedItemValue = selectedItemValue?.toString();
          const selectedIcon = selectedItemValue ? getIonIconByName(selectedItemValue) : void 0;
          const [showModal, setShowModal] = reactExports.useState(false);
          const handleSelectChange = item => {
            onSelectionChanged?.(item?.key);
            modal.current?.dismiss();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              onClick: () => setShowModal(true),
              button: true,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                label: title,
                readonly: true,
                value: selectedIcon?.key,
                labelPlacement: "floating"
              }), selectedIcon && /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                slot: "end",
                icon: selectedIcon.value
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(ListIonIconsModal, {
              isOpen: showModal,
              setIsOpen: setShowModal,
              onSelectIcon: handleSelectChange
            })]
          });
        }
        function CommonIonicIconSelect(props) {
          const {
            register,
            control,
            error,
            label
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field: {
                    onChange,
                    value
                  }
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(SelectIonicIcon, {
                  selectedItemValue: value,
                  onSelectionChanged: item => {
                    onChange(item);
                  },
                  title: label
                })
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const formatDate = dateString => {
          if (!dateString) return null;
          try {
            const date = parseISO(dateString);
            return format(date, "dd.MM.yyyy");
          } catch (e) {
            return dateString;
          }
        };
        function CommonIonicDatePicker({
          label,
          labelPlacement = "stacked",
          itemProps,
          inputProps,
          register,
          error,
          control,
          defaultValue
        }) {
          const [isOpen, setIsOpen] = reactExports.useState(false);
          const containerRef = reactExports.useRef(null);
          const handleToggle = () => {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            if (newIsOpen && containerRef.current) {
              setTimeout(() => {
                containerRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest"
                });
              }, 100);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
              name: register.name,
              control,
              render: ({
                field
              }) => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                ref: containerRef,
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  ...itemProps,
                  button: true,
                  detail: false,
                  onClick: handleToggle,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: label
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    slot: "end",
                    className: "ion-text-end",
                    children: field.value ? /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      color: "medium",
                      children: formatDate(field.value)
                    }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: calendarOutline,
                      color: "medium",
                      style: {
                        fontSize: "1.2em"
                      }
                    })
                  })]
                }), isOpen && /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                  presentation: "date",
                  size: "cover",
                  value: field.value ?? defaultValue,
                  onIonChange: e => {
                    field.onChange(e.detail.value || null);
                  },
                  ...inputProps
                })]
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const formatDateTime = dateString => {
          if (!dateString) return null;
          try {
            const date = parseISO(dateString);
            return format(date, "dd.MM.yyyy HH:mm");
          } catch (e) {
            return dateString;
          }
        };
        function CommonIonicDateTimePicker({
          label,
          labelPlacement = "stacked",
          itemProps,
          inputProps,
          register,
          error,
          control,
          defaultValue
        }) {
          const [isOpen, setIsOpen] = reactExports.useState(false);
          const containerRef = reactExports.useRef(null);
          const handleToggle = () => {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            if (newIsOpen && containerRef.current) {
              setTimeout(() => {
                containerRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                  inline: "nearest"
                });
              }, 100);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
              name: register.name,
              control,
              render: ({
                field
              }) => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                ref: containerRef,
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  ...itemProps,
                  button: true,
                  detail: false,
                  onClick: handleToggle,
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: label
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    slot: "end",
                    className: "ion-text-end",
                    children: field.value ? /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      color: "medium",
                      children: formatDateTime(field.value)
                    }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: timeOutline,
                      color: "medium",
                      style: {
                        fontSize: "1.2em"
                      }
                    })
                  })]
                }), isOpen && /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                  presentation: "date-time",
                  size: "cover",
                  value: field.value ? toLocalISOStringForIonDatetime(field.value) : defaultValue,
                  onIonChange: e => {
                    field.onChange(e.detail.value || null);
                  },
                  ...inputProps
                })]
              })
            }), error && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: error.message
              })
            })]
          });
        }
        const changeRequestApi = sharedApi.injectEndpoints({
          endpoints: builder => ({
            getPendingChangeRequests: builder.query({
              query: () => ({
                url: "change-requests/pending",
                method: "GET"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType.CHANGE_REQUESTS]
            }),
            getEntityChangeRequests: builder.query({
              query: ({
                entityType,
                entityId
              }) => ({
                url: `change-requests/get-entity`,
                method: "GET",
                params: {
                  entityType,
                  entityId
                }
              }),
              providesTags: [TagType.CHANGE_REQUESTS],
              transformResponse: transformStandardResponseToCamelCase
            }),
            approveChangeRequest: builder.mutation({
              query: ({
                id
              }) => ({
                url: `change-requests/${id}/approve`,
                method: "POST"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.CHANGE_REQUESTS]
            }),
            rejectChangeRequest: builder.mutation({
              query: ({
                id
              }) => ({
                url: `change-requests/${id}/reject`,
                method: "POST"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType.CHANGE_REQUESTS]
            })
          })
        });
        const {
          useGetEntityChangeRequestsQuery
        } = changeRequestApi;
        function ChangeRequestList({
          changeRequests,
          onSelectChangeRequest,
          isLoading = false,
          entityType
        }) {
          const {
            t
          } = useTranslation();
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex items-center justify-center p-4",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {}), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                className: "ml-2",
                children: t("Učitavanje planiranih promena...")
              })]
            });
          }
          if (!changeRequests || changeRequests.length === 0) {
            return null;
          }
          const formatDate = dateString => {
            const date = new Date(dateString);
            return date.toLocaleDateString("sr-RS", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            });
          };
          const getStatusColor = status => {
            switch (status) {
              case "pending":
                return "warning";
              case "approved":
                return "success";
              case "rejected":
                return "danger";
              case "executed":
                return "primary";
              case "failed":
                return "danger";
              default:
                return "medium";
            }
          };
          const getStatusText = status => {
            switch (status) {
              case "pending":
                return t("Na čekanju");
              case "approved":
                return t("Odobreno");
              case "rejected":
                return t("Odbijeno");
              case "executed":
                return t("Izvršeno");
              case "failed":
                return t("Neuspešno");
              default:
                return status;
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "space-y-3",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex items-center gap-2",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: calendarOutline,
                className: "text-lg"
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                className: "font-medium",
                children: [t("Planirane promene"), " (", changeRequests.length, ")"]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "space-y-2",
              children: changeRequests.map(changeRequest => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    fill: "outline",
                    size: "small",
                    color: "warning",
                    onClick: () => onSelectChangeRequest(changeRequest),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: timeOutline,
                      className: "mr-2"
                    }), formatDate(changeRequest.scheduledDateUtc)]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex flex-col gap-1",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonChip, {
                      color: getStatusColor(changeRequest.status),
                      children: getStatusText(changeRequest.status)
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                      className: "text-sm text-gray-600 dark:text-gray-400",
                      children: [t("Tip"), ":", " ", changeRequest.changeType === "update" ? t("Ažuriranje") : changeRequest.changeType === "create" ? t("Kreiranje") : changeRequest.changeType === "delete" ? t("Brisanje") : changeRequest.changeType]
                    })]
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-xs text-gray-500",
                  children: new Date(changeRequest.createdAt).toLocaleDateString("sr-RS")
                })]
              }, changeRequest.id))
            })]
          });
        }
        function CommonIonicChangeRequest({
          label,
          name,
          control,
          disabled = false,
          required = false,
          placeholder = "",
          entityId,
          entityType,
          error,
          form
        }) {
          const {
            t
          } = useTranslation();
          const [isOpen, setIsOpen] = reactExports.useState(false);
          const [selectedDate, setSelectedDate] = reactExports.useState(() => {
            const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1e3);
            return tomorrow.toISOString().split("T")[0];
          });
          const {
            data: existingChangeRequests,
            isLoading: isLoadingChangeRequests
          } = useGetEntityChangeRequestsQuery({
            entityType: entityType || "service",
            entityId: entityId || ""
          }, {
            skip: !entityId || !entityType
          });
          const openModal = () => setIsOpen(true);
          const closeModal = () => setIsOpen(false);
          const handleSubmit = onChange => {
            if (selectedDate) {
              onChange({
                isEnabled: true,
                scheduledDateUtc: selectedDate
              });
              setIsOpen(false);
            }
          };
          const handleDisable = onChange => {
            onChange({
              isEnabled: false,
              scheduledDateUtc: null
            });
            setIsOpen(false);
          };
          const handleSelectChangeRequest = changeRequest => {
            if (form && changeRequest.data) {
              Object.keys(changeRequest.data).forEach(key => {
                if (key !== "changeRequest" && key !== "id") {
                  const value = changeRequest.data[key];
                  if (value !== void 0) {
                    form.setValue(key, value);
                  }
                }
              });
              form.setValue(name, {
                isEnabled: true,
                scheduledDateUtc: changeRequest.scheduledDateUtc
              });
              console.log("Change request data loaded into form:", changeRequest.data);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
            name,
            control,
            defaultValue: {
              isEnabled: false,
              scheduledDateUtc: null
            },
            render: ({
              field: {
                onChange,
                value
              }
            }) => {
              const isEnabled = value?.isEnabled || false;
              const scheduledDate = value?.scheduledDateUtc || null;
              return /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                className: "ion-no-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "w-full p-4",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    className: "mb-2 block",
                    children: [label, required && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                      className: "text-red-500 ml-1",
                      children: "*"
                    })]
                  }), entityId && entityType && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "mb-4",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(ChangeRequestList, {
                      changeRequests: existingChangeRequests?.data || [],
                      onSelectChangeRequest: handleSelectChangeRequest,
                      isLoading: isLoadingChangeRequests,
                      entityType
                    })
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      fill: "outline",
                      size: "small",
                      onClick: openModal,
                      disabled,
                      color: error ? "danger" : isEnabled ? "warning" : "primary",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: timeOutline,
                        className: "mr-2"
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                        children: isEnabled ? t("Promeni datum") : t("Podesi datum promena")
                      })]
                    }), isEnabled && scheduledDate && /* @__PURE__ */jsxRuntimeExports.jsxs(IonChip, {
                      color: "warning",
                      outline: true,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: timeOutline
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        children: scheduledDate
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                        fill: "clear",
                        size: "small",
                        onClick: () => handleDisable(onChange),
                        disabled,
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                          icon: closeOutline
                        })
                      })]
                    })]
                  }), error && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "mt-2",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      color: "danger",
                      className: "text-sm",
                      children: error.message
                    })
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
                    isOpen,
                    onDidDismiss: closeModal,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                          children: isEnabled ? t("Promeni datum promena") : t("Podesi datum promena")
                        })
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
                      className: "ion-padding",
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        className: "space-y-4",
                        children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx("label", {
                            className: "block text-sm font-medium mb-2",
                            children: t("Izaberi datum")
                          }), /* @__PURE__ */jsxRuntimeExports.jsx(IonDatetime, {
                            value: selectedDate,
                            onIonChange: e => setSelectedDate(e.detail.value || ""),
                            min: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString().split("T")[0],
                            presentation: "date"
                          })]
                        }), isEnabled && scheduledDate && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          className: "text-sm text-gray-600",
                          children: [t("Trenutno podešen datum"), ": ", scheduledDate]
                        })]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                        children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          className: "flex gap-2 p-2",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                            fill: "outline",
                            onClick: closeModal,
                            children: t("Otkaži")
                          }), isEnabled && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                            fill: "outline",
                            onClick: () => handleDisable(onChange),
                            color: "danger",
                            children: t("Ukloni")
                          }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                            onClick: () => handleSubmit(onChange),
                            disabled: !selectedDate,
                            children: isEnabled ? t("Promeni") : t("Podesi")
                          })]
                        })
                      })
                    })]
                  })]
                })
              });
            }
          });
        }
        function DynamicForm(props) {
          const {
            fields,
            callback,
            itemProps
          } = props;
          const form = props.form;
          const errors = form.formState.errors;
          const getField = field => {
            const keyName = field.keyNameChild ? `${field.keyName}.${field.keyNameChild}` : field.keyName;
            const register = form.register(keyName, {
              required: field.required,
              setValueAs: value => typeof value === "string" ? value.trim() : value
            });
            const fieldError = field.keyNameChild ? errors[field.keyName]?.[field.keyNameChild] : errors[field.keyName];
            const label = "label" in field.data && field.data.label ? field.required ? `${field.data.label} *` : field.data.label : "";
            switch (field.data.type) {
              case FieldType.Text:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicInput, {
                  label,
                  type: "text",
                  register,
                  error: fieldError,
                  control: form.control,
                  itemProps: {
                    ...itemProps,
                    disabled: field.disabled
                  },
                  inputProps: {
                    readonly: field.readOnly
                  },
                  labelPlacement: field.data.labelPlacement,
                  translation: field.data.translation,
                  googleIt: field.data.googleIt
                });
              case FieldType.Slug:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicSlug, {
                  label,
                  register,
                  error: fieldError,
                  control: form.control,
                  sourceField: field.data.sourceField,
                  placeholder: field.data.placeholder,
                  isWatched: field.data.isWatched,
                  isWatchedDefault: field.data.isWatchedDefault,
                  itemProps: {
                    ...itemProps,
                    disabled: field.disabled
                  }
                });
              case FieldType.Number:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicInput, {
                  label,
                  type: "number",
                  itemProps: {
                    ...itemProps,
                    disabled: field.disabled
                  },
                  inputProps: {
                    readonly: field.readOnly
                  },
                  register,
                  error: fieldError,
                  control: form.control
                });
              case FieldType.Switch:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicSwitch, {
                  label,
                  type: "number",
                  register,
                  error: fieldError,
                  control: form.control
                });
              case FieldType.Password:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicInput, {
                  label,
                  type: "password",
                  register,
                  error: fieldError,
                  control: form.control,
                  showEye: field.data.showEye ?? true
                });
              case FieldType.Select:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicSelect, {
                  register,
                  options: field.data.options ?? [],
                  ariaLabel: field.data.label ?? field.name,
                  placeholder: field.data.placeholder,
                  error: fieldError,
                  control: form.control,
                  selectProps: {
                    ...field.data.selectProps,
                    disabled: field.disabled
                  }
                });
              case FieldType.Callback:
                return callback?.(field);
              case FieldType.MultiCheckbox:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicMultiCheckbox, {
                  control: form.control,
                  error: fieldError,
                  register,
                  disabled: field.disabled,
                  options: field.data.options ?? [],
                  showSearchbar: field.data.showSearchbar,
                  label: field.name,
                  dataRowClassNames: field.data.rowClassNames
                });
              case FieldType.Autocomplete:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicAutocompleteSelect, {
                  control: form.control,
                  error: fieldError,
                  options: field.data.options ?? [],
                  handleAddNewOption: field.data.handleAddNewOption,
                  register,
                  label: field.data.label ?? field.name,
                  selectedItem: form.getValues(keyName)
                });
              case FieldType.RichEditor:
                return /* @__PURE__ */jsxRuntimeExports.jsx(FormRichEditor, {
                  label: field.data.label,
                  register,
                  error: fieldError,
                  control: form.control,
                  translation: field.data.translation
                });
              case FieldType.TextArea:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicTextarea, {
                  control: form.control,
                  label: field.data.label,
                  error: fieldError,
                  register,
                  maxlength: field.data.maxlength,
                  itemProps: {
                    ...itemProps
                  },
                  translation: field.data.translation
                });
              case FieldType.PhotoUploader:
                return /* @__PURE__ */jsxRuntimeExports.jsx(PhotoUploader$1, {
                  label: field.data.label,
                  register,
                  error: fieldError,
                  control: form.control,
                  handlers: field.data.handlers,
                  reorderImagesResult: field.data.reorderImagesResult,
                  photos: field.data.photos,
                  oneImage: field.data.oneImage,
                  cropAspectRatio: field.data.cropAspectRatio,
                  maxPhotos: field.data.maxPhotos
                });
              case FieldType.GalleryArea:
                return /* @__PURE__ */jsxRuntimeExports.jsx(GalleryArea, {
                  field: field.data,
                  register,
                  error: fieldError,
                  control: form.control,
                  form
                });
              case FieldType.WorkingHours:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonWorkingTime, {
                  label: field.data.label,
                  addNewLabel: field.data.addNewLabel,
                  modalTitle: field.data.modalTitle,
                  defaultTimeFrom: field.data.defaultTimeFrom,
                  defaultTimeTo: field.data.defaultTimeTo,
                  defaultDays: field.data.defaultDays,
                  register,
                  error: fieldError,
                  control: form.control
                });
              case FieldType.WorkingHoursSingle:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonWorkingTimeSingle, {
                  label: field.data.label,
                  addNewLabel: field.data.addNewLabel,
                  register,
                  error: fieldError,
                  control: form.control
                });
              case FieldType.List:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonList$1, {
                  label: field.data.label,
                  register,
                  error: fieldError,
                  control: form.control,
                  inputType: field.data.inputType
                });
              case FieldType.IonIcon:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicIconSelect, {
                  register,
                  error: fieldError,
                  control: form.control,
                  label: field.data.label
                });
              case FieldType.Date:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicDatePicker, {
                  label: field.data.label,
                  register,
                  error: fieldError,
                  control: form.control,
                  itemProps: field.data.itemProps,
                  inputProps: field.data.inputProps,
                  defaultValue: field.data.defaultValue
                });
              case FieldType.DateTime:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicDateTimePicker, {
                  label: field.data.label,
                  register,
                  error: fieldError,
                  control: form.control,
                  itemProps: field.data.itemProps,
                  inputProps: field.data.inputProps,
                  defaultValue: field.data.defaultValue
                });
              case FieldType.ChangeRequest:
                return /* @__PURE__ */jsxRuntimeExports.jsx(CommonIonicChangeRequest, {
                  label,
                  name: keyName,
                  control: form.control,
                  disabled: field.disabled,
                  required: field.required,
                  entityId: field.data.entityId,
                  entityType: field.data.entityType,
                  error: fieldError,
                  form
                });
              default:
                return /* @__PURE__ */jsxRuntimeExports.jsx("div", {});
            }
          };
          const getFields = () => {
            const returnFields = [];
            let rowElements = [];
            fields.forEach((field, index) => {
              const gridSize = field.gridSize ?? {
                size: "12",
                sizeSm: "12",
                sizeMd: "6"
              };
              if (field.newRow && rowElements.length > 0) {
                returnFields.push(/* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                  children: rowElements
                }, index));
                rowElements = [];
              }
              const fieldElement = getField(field);
              if (fieldElement && field.visible !== false) {
                rowElements.push(/* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
                  ...gridSize,
                  className: field.colClassNames,
                  children: fieldElement
                }, index));
              }
            });
            if (rowElements.length > 0) {
              returnFields.push(/* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                children: rowElements
              }, fields.length));
            }
            return returnFields;
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
            children: getFields()
          });
        }
        const loginApi = sharedApi.injectEndpoints({
          endpoints: build => ({
            login: build.mutation({
              query: body => ({
                url: "/login",
                method: "POST",
                body
              })
            }),
            loginWithCode: build.mutation({
              query: body => ({
                url: "/user/login-with-code",
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            prepareLoginRegister: build.mutation({
              query: body => ({
                url: "/user/prepare",
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            loginGoogle: build.mutation({
              query: body => ({
                url: "/login/google",
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            register: build.mutation({
              query: body => ({
                url: "/register",
                method: "POST",
                body
              })
            }),
            userCompleteRegistration: build.mutation({
              query: body => ({
                url: "/user/register/complete",
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase
            }),
            getUserSettings: build.query({
              query: () => "/user/settings",
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [{
                type: TagType.USER_SETTINGS,
                id: TagId.LIST
              }]
            }),
            updateUserSettings: build.mutation({
              query: data => ({
                url: "/user/settings",
                method: "PUT",
                body: {
                  data: humpsExports.decamelizeKeys(data)
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [{
                type: TagType.USER_SETTINGS,
                id: TagId.LIST
              }]
            }),
            getUserAddresses: build.query({
              query: () => "/user/addresses",
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [{
                type: TagType.USER_ADDRESS,
                id: TagId.LIST
              }]
            }),
            createUserAddress: build.mutation({
              query: data => ({
                url: "/user/addresses",
                method: "POST",
                body: {
                  data: humpsExports.decamelizeKeys(data)
                }
              }),
              invalidatesTags: [{
                type: TagType.USER_ADDRESS,
                id: TagId.LIST
              }]
            }),
            deleteUserAddresses: build.mutation({
              query: ids => ({
                url: `/user/addresses`,
                method: "DELETE",
                body: {
                  ids
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [{
                type: TagType.USER_ADDRESS,
                id: TagId.LIST
              }]
            })
          })
        });
        const {
          useLoginWithCodeMutation,
          usePrepareLoginRegisterMutation,
          useLoginGoogleMutation
        } = loginApi;
        var UserGroupCode = /* @__PURE__ */(UserGroupCode2 => {
          UserGroupCode2["Admin"] = "admin";
          UserGroupCode2["Registered"] = "registered";
          UserGroupCode2["Guest"] = "guest";
          UserGroupCode2["Agent"] = "agent";
          UserGroupCode2["Client"] = "client";
          UserGroupCode2["Worker"] = "worker";
          UserGroupCode2["SocialGoogle"] = "social-google";
          UserGroupCode2["Owner"] = "owner";
          return UserGroupCode2;
        })(UserGroupCode || {});
        function getLoginFields(t) {
          return [{
            name: "email",
            keyName: "login",
            data: {
              type: FieldType.Text,
              label: t("Email")
            },
            gridSize: {
              size: "12"
            }
          }];
        }
        const schema$1 = yup.object({
          login: yup.string().email(t("Email nije validan")).required()
        });
        const defaultDuration = 20 * 1e3;
        function CommonLoginForm(props) {
          const {
            t: t2
          } = useTranslation();
          const fields = getLoginFields(t2);
          const [isLoading, setIsLoading] = reactExports.useState(false);
          const [showConfirmationCodeField, setShowConfirmationCodeField] = reactExports.useState(false);
          const [confirmationCode, setConfirmationCode] = reactExports.useState("");
          const [showLoadingDuration, setShowLoadingDuration] = reactExports.useState(defaultDuration);
          const [presentToast] = useIonToast();
          const form = useFormWithSchema(schema$1);
          const {
            handleSubmit
          } = form;
          const dispatch = useDispatch();
          const [prepareUser, prepareResult] = usePrepareLoginRegisterMutation();
          const [loginWithCode, {
            data: loginWithCodeResponse,
            isSuccess: isLoginWithCodeSuccess,
            isError: isLoginWithCodeError,
            error: loginWithCodeError
          }] = useLoginWithCodeMutation();
          const [loginGoogle, loginGoogleResult] = useLoginGoogleMutation();
          const {
            data: googleUserData,
            isSuccess: isGoogleLoginSuccess,
            isError: isGoogleLoginError
          } = loginGoogleResult;
          const showLoading = (duration = 20) => {
            setShowLoadingDuration(duration * 1e3);
            setIsLoading(true);
          };
          const hideLoading = () => {
            setShowLoadingDuration(defaultDuration);
            setIsLoading(false);
          };
          const onSubmit = data => {
            prepareUser(data);
          };
          const handleSuccessfulLogin = loginData => {
            dispatch(setUser(loginData));
            dispatch(setUiData({
              showLoginModal: false
            }));
            hideLoading();
            props.onSuccessfulLogin?.();
          };
          const {
            isSuccess: isPrepareSuccess,
            isLoading: isPrepareLoading,
            isError: isPrepareError,
            error
          } = prepareResult;
          reactExports.useEffect(() => {
            if (isPrepareSuccess) {
              setShowConfirmationCodeField(true);
            }
            if (isPrepareError) {
              showNotification({
                message: errorMessage ?? "Unknown error",
                color: "danger"
              }, 1);
              hideLoading();
            }
          }, [isPrepareSuccess, isPrepareError, error]);
          reactExports.useEffect(() => {
            if (isLoginWithCodeSuccess && loginWithCodeResponse) {
              handleSuccessfulLogin(loginWithCodeResponse.data);
              if (!prepareResult?.data?.data.isExistingUser) {
                dispatch(setShowCompleteProfileModal(true));
              }
            }
            if (isLoginWithCodeError && loginWithCodeError) {
              const errorMessage2 = loginWithCodeError?.data?.message;
              showNotification({
                message: (errorMessage2 == "Invalid code" ? t2("Kod nije validan") : errorMessage2) ?? "Unknown error",
                color: "danger",
                position: "bottom"
              }, 1);
              hideLoading();
            }
          }, [loginWithCodeResponse]);
          reactExports.useEffect(() => {
            if (isGoogleLoginSuccess) {
              handleSuccessfulLogin(googleUserData.data);
            }
            if (isPrepareError) {
              hideLoading();
            }
          }, [googleUserData, isGoogleLoginSuccess, isGoogleLoginError]);
          const errorMessage = error?.data?.message;
          const showNotification = (options, durationSec) => {
            presentToast({
              duration: durationSec * 1e3,
              position: "top",
              ...options
            });
          };
          const googleLogin = useGoogleLogin({
            onSuccess: tokenResponse => {
              showLoading();
              loginGoogle({
                accessToken: tokenResponse.access_token
              });
            },
            onError: () => {
              hideLoading();
            },
            onNonOAuthError: () => {
              hideLoading();
            }
          });
          const onLogin = () => {
            showLoading(30);
            googleLogin();
          };
          const handleConfirmationCode = () => {
            showLoading();
            loginWithCode({
              code: confirmationCode,
              login: form.getValues().login
            });
          };
          const handleCodeInputChange = e => {
            setConfirmationCode((e.currentTarget.value || "").trim());
          };
          const codeValidationError =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          loginWithCodeResponse?.error?.data?.message;
          const disabledCodeButton = !confirmationCode || confirmationCode.length < 4;
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "ion-padding",
            children: [isLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: isLoading,
              onDidDismiss: hideLoading,
              message: "Login - Molim vas sačekajte...",
              duration: showLoadingDuration
            }), isPrepareLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: isPrepareLoading,
              onDidDismiss: hideLoading,
              message: "Šalje se mejl sa kodom za aktivaciju...",
              duration: showLoadingDuration
            }), showConfirmationCodeField ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-text-center",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: mailOutline,
                style: {
                  fontSize: "48px",
                  color: "var(--ion-color-success)",
                  marginBottom: "16px"
                }
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                color: "success",
                className: "ion-padding-bottom",
                children: t2("Proverite mejl sanduče")
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                className: "ion-margin-bottom",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                  label: t2("Kod za aktivaciju"),
                  labelPlacement: "stacked",
                  placeholder: t2("Unesite kod ovde"),
                  onKeyUp: handleCodeInputChange,
                  value: confirmationCode,
                  className: "ion-margin-top"
                })
              }), codeValidationError && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: "danger",
                className: "ion-padding-bottom",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                  children: codeValidationError
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                onClick: handleConfirmationCode,
                disabled: disabledCodeButton,
                expand: "block",
                className: "ion-margin-top",
                children: t2("Potvrdi")
              })]
            }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("form", {
                onSubmit: handleSubmit(onSubmit),
                autoComplete: "off",
                className: "ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                  fields,
                  form
                }), isPrepareError && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "danger",
                  className: "ion-padding-top",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    children: errorMessage
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  type: "submit",
                  expand: "block",
                  className: "ion-margin-top",
                  children: [t2("Uloguj se"), " / ", t2("Registruj se")]
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-text-center ion-margin-bottom",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                      children: t2("ili se prijavite sa")
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  fill: "solid",
                  onClick: onLogin,
                  color: "dark",
                  expand: "block",
                  className: "ion-margin-top",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    slot: "start",
                    icon: logoGoogle,
                    className: "ion-margin-end"
                  }), t2("Google Log In")]
                })]
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-text-center ion-margin-bottom mt-2",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: keyOutline,
                style: {
                  fontSize: "48px",
                  color: "var(--ion-color-primary)",
                  marginBottom: "16px"
                }
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                  children: t2("Dobro došli nazad!")
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  className: "ion-color-medium",
                  children: t2("Prijavite se ili registrujte za pristup")
                })]
              })]
            })]
          });
        }
        const withGoogleOAuth = Component => {
          const WrappedComponent = props => {
            const googleApiKey = "528191814583-ovprc30ec231gtc7t24apkep4kqo7npo.apps.googleusercontent.com";
            return /* @__PURE__ */jsxRuntimeExports.jsx(GoogleOAuthProvider, {
              clientId: googleApiKey,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Component, {
                ...props
              })
            });
          };
          WrappedComponent.displayName = `withGoogleOAuth(${Component.displayName || Component.name || "Component"})`;
          return WrappedComponent;
        };
        const CommonLoginForm$1 = withGoogleOAuth(CommonLoginForm);
        function CommonLoginModal(props) {
          const {
            t
          } = useTranslation();
          const {
            showLoginModal,
            onClose
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended$1, {
            name: "login-modal",
            isOpen: showLoginModal,
            onClose,
            initialBreakpoint: 0.9,
            breakpoints: [0, 0.9, 1],
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Log in / Registracija")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: onClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(CommonLoginForm$1, {})
            })]
          });
        }
        const ImageModal = () => {
          const imageData = useAppSelector$1(getImageModalData);
          const dispatch = useAppDispatch$1();
          const [isBackgroundColorBlack, setIsBackgroundColorBlack] = React.useState(true);
          const handleClose = () => {
            dispatch(closeImageModal());
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen: imageData?.showModal,
            onDidDismiss: handleClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {}), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: "Close"
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
              fullscreen: true,
              className: "ion-padding ion-text-center",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx("img", {
                src: imageData?.src,
                alt: imageData?.alt,
                className: "inline modal-image-preview",
                style: {
                  backgroundColor: isBackgroundColorBlack ? "black" : "white"
                }
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                checked: isBackgroundColorBlack,
                labelPlacement: "start",
                onIonChange: () => setIsBackgroundColorBlack(!isBackgroundColorBlack),
                children: "Crna Pozadina"
              })]
            })]
          });
        };
        function CommonModalWrappers() {
          const dispatch = useAppDispatch$1();
          const showLoginModal = useAppSelector$1(getShowLoginModal);
          const showImageModal = useAppSelector$1(getShowImageModal);
          const handleCloseLoginModal = reactExports.useCallback(() => {
            dispatch(setShowLoginModal(false));
          }, [dispatch]);
          const LoginModalWrapper = reactExports.useMemo(() => {
            if (showLoginModal !== void 0) {
              return /* @__PURE__ */jsxRuntimeExports.jsx(CommonLoginModal, {
                showLoginModal,
                onClose: handleCloseLoginModal
              });
            }
            return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
          }, [showLoginModal, handleCloseLoginModal]);
          const ImageModalWrapper = reactExports.useMemo(() => {
            if (showImageModal !== void 0) {
              return /* @__PURE__ */jsxRuntimeExports.jsx(ImageModal, {});
            }
            return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
          }, [showImageModal]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [LoginModalWrapper, ImageModalWrapper]
          });
        }
        const CommonModalWrappers$1 = reactExports.memo(CommonModalWrappers);
        const firebaseConfig = {
          apiKey: "AIzaSyBrqIvAMt2f_G4bZMV2GkkGCHYGdWOxVLU",
          authDomain: "rezervacije-417408.firebaseapp.com",
          projectId: "rezervacije-417408",
          storageBucket: "rezervacije-417408.appspot.com",
          messagingSenderId: "528191814583",
          appId: "1:528191814583:web:00b4a81579862dea1dc632",
          measurementId: "G-887PF27E5L"
        };
        let messagingTemp;
        const firebaseApp = initializeApp(firebaseConfig);
        try {
          messagingTemp = getMessagingInWindow(firebaseApp);
        } catch (e) {
          console.error(e);
          messagingTemp = void 0;
        }
        getAnalytics(firebaseApp);
        const messaging = messagingTemp;
        const __vite_import_meta_env__ = {
          "LEGACY": true,
          "VITE_RZR_VAPID_KEY": "BLgl3XyX_NID8-aSxeMXjfw3I9dt0cHPtoTQRKX0kGSDgvSJ89UFaO2rUTsis2x4oYrqn-tN4X84WmpMyvX5e9Y"
        };
        const {
          VITE_RZR_VAPID_KEY
        } = __vite_import_meta_env__;
        function useDeviceNotification({
          handleMessage,
          onConnected,
          connectDeviceInit
        }) {
          const deviceData = useAppSelector$1(getDeviceData);
          const dispatch = useAppDispatch$1();
          const [swNotReady, setSwNotReady] = reactExports.useState(false);
          const onConnectedRef = reactExports.useRef(onConnected);
          const handleMessageRef = reactExports.useRef(handleMessage);
          reactExports.useEffect(() => {
            onConnectedRef.current = onConnected;
          }, [onConnected]);
          reactExports.useEffect(() => {
            handleMessageRef.current = handleMessage;
          }, [handleMessage]);
          reactExports.useEffect(() => {
            if (!messaging) {
              return;
            }
            onMessage(messaging, payload => {
              if (handleMessageRef.current) {
                handleMessageRef.current(payload);
              }
            });
            return () => {};
          }, []);
          const handleConnectDevice = reactExports.useCallback(async enabled => {
            if (!messaging) {
              return;
            }
            if (!enabled && !deviceData.notificationsEnabled) {
              return;
            }
            const registration = await navigator?.serviceWorker?.getRegistration("/");
            if (!registration) {
              setSwNotReady(true);
              return;
            }
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
              const token = await getToken(messaging, {
                serviceWorkerRegistration: registration,
                vapidKey: VITE_RZR_VAPID_KEY
              });
              if (deviceData.notificationsToken !== token) {
                onConnectedRef.current(token);
                dispatch(setDeviceData({
                  notificationsToken: token
                }));
              }
            }
          }, [deviceData.notificationsEnabled, deviceData.notificationsToken, dispatch]);
          reactExports.useEffect(() => {
            if (connectDeviceInit && messaging) {
              handleConnectDevice(true);
            }
          }, [connectDeviceInit, handleConnectDevice]);
          reactExports.useEffect(() => {
            if (swNotReady && messaging) {
              navigator?.serviceWorker?.ready.then(() => {
                console.log("service worker ready");
                setSwNotReady(false);
                handleConnectDevice(true);
              });
            }
          }, [swNotReady, handleConnectDevice]);
          return messaging ? {
            connectDevice: handleConnectDevice
          } : null;
        }
        function useUser(props) {
          const user = useAppSelector$1(getUser);
          const [userId, setUserId] = reactExports.useState(user?.id);
          const dispatch = useAppDispatch$1();
          const {
            roles
          } = {};
          const [presentToast] = useIonToast();
          const wrapUserLoginModal = reactExports.useCallback(callbackFunc => {
            const showLoginResponse = () => {
              dispatch(setShowLoginModal(true));
            };
            if (user) {
              if (roles && roles.length > 0) {
                const hasRole = userHasRoles(user, roles);
                if (!hasRole) {
                  return showLoginResponse;
                }
              }
              return callbackFunc ?? (() => {});
            }
            return showLoginResponse;
          }, [user, roles, dispatch]);
          const isGroup = group => {
            return user && userHasRoles(user, [group]);
          };
          const isOwner = isGroup(UserGroupCode.Owner);
          const isWorker = isGroup(UserGroupCode.Worker);
          const isAdmin = isGroup(UserGroupCode.Admin);
          const isOwnerOrWorker = isOwner || isWorker;
          const logoutUser = () => {
            dispatch(logoutAction());
            dispatch(sharedApi.util?.invalidateTags([TagType.USER]));
          };
          reactExports.useEffect(() => {
            if (!user?.id && userId) {
              presentToast({
                message: t("Korisnik je izlogovan"),
                duration: 4e3,
                color: "warning"
              });
              setUserId(void 0);
            } else if (user?.id && userId !== user.id) {
              setUserId(user.id);
            }
          }, [user]);
          return {
            wrapUserLoginModal,
            isOwner,
            isAdmin,
            isWorker,
            isGroup,
            isOwnerOrWorker,
            userData: user,
            logoutUser,
            skipNoUser: {
              skip: !user
            }
          };
        }
        const notificationServices = sharedApi.injectEndpoints({
          endpoints: builder => ({
            addConnectedDevice: builder.mutation({
              query: body => ({
                url: `users/connected-devices`,
                method: "POST",
                body
              })
            }),
            removeConnectedDevice: builder.mutation({
              query: body => ({
                url: `users/connected-devices`,
                method: "DELETE",
                body
              })
            })
          })
        });
        const {
          useAddConnectedDeviceMutation,
          useRemoveConnectedDeviceMutation
        } = notificationServices;
        exports("d", useRemoveConnectedDeviceMutation);
        function CommonNotificationWrapper({
          activeLocation
        } = {}) {
          const [addConnectedDevice] = useAddConnectedDeviceMutation();
          const {
            isOwnerOrWorker
          } = useUser();
          const [presentToast] = useIonToast();
          const {
            push
          } = useIonRouter();
          const deviceData = useAppSelector$1(getDeviceData);
          const deviceNotification = useDeviceNotification({
            handleMessage: payload => {
              const notification = payload?.data?.notification;
              const data = payload?.data?.data;
              if (!data || !notification) return;
              presentToast({
                message: t("Obaveštenje: ") + (notification.body ?? t("nema poruke")),
                duration: 5e3,
                color: "warning",
                buttons: data?.url ? [{
                  text: t("Link"),
                  role: "info",
                  handler: () => {
                    push(data.url);
                  }
                }] : void 0
              });
            },
            onConnected: token => {
              if (activeLocation) {
                addConnectedDevice({
                  token,
                  locationSlug: activeLocation
                });
              }
            },
            connectDeviceInit: !!isOwnerOrWorker
          });
          reactExports.useEffect(() => {
            if (!!deviceNotification && !isOwnerOrWorker && deviceData.notificationsEnabled) {
              deviceNotification?.connectDevice(true);
            }
          }, [deviceData]);
          return null;
        }
        const NotificationToast = ({
          message,
          type,
          duration = 2500,
          position = "bottom",
          isOpen,
          onDidDismiss,
          cssClass
        }) => {
          const {
            t
          } = useTranslation();
          const getColor = () => {
            switch (type) {
              case "success":
                return "success";
              case "error":
                return "danger";
              case "warning":
                return "warning";
              case "info":
                return "primary";
              default:
                return "primary";
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonToast, {
            isOpen,
            onDidDismiss,
            message: t(message),
            duration,
            color: getColor(),
            position,
            cssClass
          });
        };
        function ShowLoading({
          message,
          otherProps
        }) {
          if (!message) return null;
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
            isOpen: !!message,
            message: message === true ? "" : message.toString(),
            ...otherProps
          });
        }
        const ShowLoading$1 = exports("T", reactExports.memo(ShowLoading));
        function SkeletonLoader() {
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonListHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSkeletonText, {
                animated: true,
                style: {
                  width: "80px"
                }
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonThumbnail, {
                slot: "start",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSkeletonText, {
                  animated: true
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSkeletonText, {
                    animated: true,
                    style: {
                      width: "80%"
                    }
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSkeletonText, {
                    animated: true,
                    style: {
                      width: "60%"
                    }
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSkeletonText, {
                    animated: true,
                    style: {
                      width: "30%"
                    }
                  })
                })]
              })]
            })]
          });
        }
        const SceletonLoader = exports("S", reactExports.memo(SkeletonLoader));
        function InstallInstructionsIosModal({
          isOpen,
          onClose
        }) {
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonModal, {
            isOpen,
            onDidDismiss: onClose,
            breakpoints: [0.9, 1],
            initialBreakpoint: 0.9,
            children: isWebView ? /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonHeader, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("h1", {
                  children: t("Instalacija je moguća samo preko pretraživača")
                }), /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                  children: "(Google Chrome, Safari, ...)"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  expand: "block",
                  onClick: onClose,
                  className: "mt-6",
                  children: t("Zatvori")
                })
              })]
            }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx("h1", {
                  className: "text-2xl border-b-2 pb-4",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("iOS uputstvo za instalaciju")
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
                className: "ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: " text-xl",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    className: "mb-4"
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("ol", {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs("li", {
                      className: "mb-2",
                      children: [t("1) Kliknite na ikonu"), " ", /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: exitOutline,
                        className: "-rotate-90",
                        color: "secondary",
                        size: "large"
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("li", {
                      className: "mb-2",
                      children: t("2) Izaberite 'Dodaj na početni ekran'.")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("li", {
                      className: "mb-2",
                      children: t("3) Kliknite na 'Dodaj'.")
                    })]
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  expand: "block",
                  onClick: onClose,
                  className: "mt-6",
                  children: t("Zatvori")
                }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("h5", {
                    className: "mt-10",
                    children: t("Ako vam je telefon na engleskom:")
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("ol", {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("li", {
                      className: "mb-2",
                      children: t("2) Izaberite 'Add to Home Screen'.")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("li", {
                      className: "mb-2",
                      children: t("3) Kliknite na 'Add'.")
                    })]
                  })]
                })]
              })]
            })
          });
        }
        function useInstallPrompt({
          onSuccess,
          onFailure
        }) {
          const [installPrompt, setInstallPrompt] = reactExports.useState(null);
          reactExports.useEffect(() => {
            const handleBeforeInstallPrompt = e => {
              e.preventDefault();
              setInstallPrompt(e);
            };
            window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            return () => {
              window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            };
          }, []);
          const promptInstall = async () => {
            if (installPrompt) {
              installPrompt.prompt();
              const choiceResult = await installPrompt.userChoice;
              if (choiceResult.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
                setInstallPrompt(null);
                onSuccess?.();
              } else {
                console.log("User dismissed the A2HS prompt");
                onFailure?.();
              }
            }
          };
          return {
            promptInstall
          };
        }
        const fallbackRenderContent = ({
          error
        }) => {
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            role: "alert",
            className: "p-4",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("p", {
              className: "text-red-500",
              children: "Something went wrong:"
            }), /* @__PURE__ */jsxRuntimeExports.jsx("pre", {
              className: "mt-2 text-sm text-red-700",
              children: error.message
            })]
          });
        };
        const formatPriceSimple = price => {
          const rounded = Math.round(price * 100) / 100;
          const hasDecimals = rounded % 1 !== 0;
          if (hasDecimals) {
            const parts = rounded.toFixed(2).split(".");
            const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return `${integerPart},${parts[1]}`;
          } else {
            return Math.round(rounded).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          }
        };
        function useWindowSize() {
          const [windowSize, setWindowSize] = reactExports.useState({
            width: window.innerWidth,
            height: window.innerHeight
          });
          reactExports.useEffect(() => {
            function handleResize() {
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
              });
            }
            window.addEventListener("resize", handleResize);
            handleResize();
            return () => window.removeEventListener("resize", handleResize);
          }, []);
          return windowSize;
        }
        const ContentDataContext = reactExports.createContext(null);
        function useContentData() {
          return reactExports.useContext(ContentDataContext);
        }
        function ContentDataProvider({
          children,
          contentRef,
          scrollTop
        }) {
          const isScrolled = scrollTop > 0;
          const scrollToTop = (duration = 300) => {
            contentRef.current?.scrollToTop(duration);
          };
          const scrollToBottom = (duration = 300) => {
            contentRef.current?.scrollToBottom(duration);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(ContentDataContext.Provider, {
            value: {
              isScrolled,
              scrollTop,
              scrollToTop,
              scrollToBottom,
              contentRef
            },
            children
          });
        }
        const ContentRefContext = reactExports.createContext(null);
        function useContentRefFunctions() {
          return reactExports.useContext(ContentRefContext);
        }
        const defaultTitleSlot = "start";
        function LayoutMainPage({
          hasPage,
          children,
          contentLoading,
          popoverChildren,
          popoverItem,
          headerEndActions,
          hideHeader,
          headerClasses,
          title,
          titleSlot = defaultTitleSlot,
          headerContent,
          hasBackButton,
          hasMenuButton = true,
          backButtonIcon,
          backButtonTitle,
          backButtonCss = "",
          onBackClick,
          additionalHeader,
          footer,
          backButtonUrl,
          showLoadingMessage,
          installAppHeaderHandle,
          contentClasses,
          hasRefresher = true
        }) {
          useTranslation();
          const [showPopover, setShowPopover] = reactExports.useState(false);
          const [popoverEvent, setPopoverEvent] = reactExports.useState();
          const [scrollTop, setScrollTop] = reactExports.useState(0);
          const router = useIonRouter();
          title = title && typeof title === "string" ? t(title) : title;
          hasPage = hasPage ?? true;
          const {
            width
          } = useWindowSize();
          const {
            userData
          } = useUser();
          const appKey = (userData?.email ?? "no-user") + width.toString();
          const [showIosModal, setShowIosModal] = reactExports.useState(false);
          const {
            promptInstall
          } = useInstallPrompt({});
          const contentRef = reactExports.useRef(null);
          const presentPopover = e => {
            setPopoverEvent(e.nativeEvent);
            setShowPopover(true);
          };
          const handleBack = () => {
            if (onBackClick) {
              onBackClick();
            } else if (backButtonUrl) {
              router.push(backButtonUrl, "back");
            } else {
              router.goBack();
            }
          };
          const PopoverChild = popoverChildren ?? void 0;
          const PopoverItem = popoverItem ?? void 0;
          const scrollToTop = duration => {
            contentRef.current?.scrollToTop(duration);
          };
          const scrollToBottom = duration => {
            contentRef.current?.scrollToBottom(duration);
          };
          const handleInstallApp = () => {
            if (isIos || isWebView) {
              setShowIosModal(true);
            } else {
              promptInstall();
            }
          };
          const handleRefresh = e => {
            window.location.reload();
            e.detail.complete();
          };
          const responseNode = /* @__PURE__ */jsxRuntimeExports.jsxs(reactExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ShowLoading$1, {
              message: showLoadingMessage
            }), installAppHeaderHandle && !isPwa && !isWebPlatform && /* @__PURE__ */jsxRuntimeExports.jsxs(IonHeader, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                color: "dark",
                onClick: handleInstallApp,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: isIos ? logoApple : logoAndroid,
                  className: "mr-2"
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Instaliraj Aplikaciju")
                })]
              }), (isIos || isWebView) && /* @__PURE__ */jsxRuntimeExports.jsx(InstallInstructionsIosModal, {
                isOpen: showIosModal,
                onClose: () => setShowIosModal(false)
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              className: `ion-no-border ${headerClasses ?? ""}`,
              translucent: true,
              collapse: "fade",
              hidden: hideHeader,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "start",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                    condition: hasBackButton ?? false,
                    render: () => /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                      onClick: handleBack,
                      className: `min-w-[41px] ${backButtonCss}`,
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        slot: !backButtonTitle ? "icon-only" : "start",
                        icon: backButtonIcon ?? chevronBackOutline
                      }), backButtonTitle]
                    }),
                    elseCondition: hasMenuButton,
                    renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                      className: "min-w-[41px]",
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonMenuButton, {
                        className: "my-2"
                      })
                    })
                  })
                }), headerContent, title && /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  ...(titleSlot ? {
                    slot: titleSlot
                  } : {}),
                  children: title
                }), PopoverChild && (PopoverItem ? PopoverItem : /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: presentPopover,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      slot: "icon-only",
                      ios: ellipsisHorizontal,
                      md: ellipsisVertical
                    })
                  })
                })), headerEndActions && /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: headerEndActions
                })]
              })
            }), additionalHeader && /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: additionalHeader
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(ContentDataProvider, {
              contentRef,
              scrollTop,
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
                ref: contentRef,
                className: contentClasses,
                scrollEvents: true,
                fullscreen: true,
                onIonScroll: e => {
                  setScrollTop(e.detail.scrollTop);
                },
                children: [hasRefresher && /* @__PURE__ */jsxRuntimeExports.jsx(IonRefresher, {
                  slot: "fixed",
                  onIonRefresh: handleRefresh,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonRefresherContent, {})
                }), /* @__PURE__ */jsxRuntimeExports.jsx(ContentRefContext.Provider, {
                  value: {
                    scrollToTop,
                    scrollToBottom,
                    contentRef
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(ErrorBoundary, {
                    fallbackRender: fallbackRenderContent,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
                      fallback: /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {}),
                      children: contentLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {}) : children
                    })
                  })
                })]
              }), footer]
            }), PopoverChild && /* @__PURE__ */jsxRuntimeExports.jsx(IonPopover, {
              isOpen: showPopover,
              event: popoverEvent,
              onDidDismiss: () => setShowPopover(false),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(PopoverChild, {
                dismiss: () => setShowPopover(false)
              })
            })]
          }, appKey);
          return hasPage ? /* @__PURE__ */jsxRuntimeExports.jsx(IonPage, {
            children: responseNode
          }) : responseNode;
        }
        function PageNotFound() {
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonPage, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: "404 Page Not Found"
            })
          });
        }
        function IonAlertConfirmation({
          confirmAction,
          cancelAction,
          cancelTextKey,
          confirmTextKey,
          confirmCssClass,
          cancelCssClass,
          ...alertProps
        }) {
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonAlert, {
            backdropDismiss: false,
            buttons: [{
              text: t(cancelTextKey ?? "Ne"),
              role: "cancel",
              cssClass: cancelCssClass,
              handler: cancelAction
            }, {
              text: t(confirmTextKey ?? "Da"),
              role: "confirm",
              cssClass: confirmCssClass,
              handler: confirmAction
            }],
            ...alertProps
          });
        }
        const IonAlertConfirmationBtn = ({
          alertProps,
          onConfirm,
          children,
          ...btnProps
        }) => {
          const [showAlert, setShowAlert] = reactExports.useState(false);
          const handleConfirm = async () => {
            setShowAlert(false);
            await onConfirm();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              ...btnProps,
              onClick: () => setShowAlert(true),
              children
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonAlertConfirmation, {
              isOpen: showAlert,
              confirmAction: handleConfirm,
              cancelAction: () => setShowAlert(false),
              onDidDismiss: () => setShowAlert(false),
              ...alertProps
            })]
          });
        };
        function FormActionButtons({
          onSave,
          isSaving = false,
          saveButtonProps = {},
          onDelete,
          isDeleting = false,
          showDelete = false,
          deleteButtonProps = {},
          deleteConfirmationProps = {},
          className = "mt-6 flex gap-2 justify-center"
        }) {
          const {
            t
          } = useTranslation();
          const [showDeleteAlert, setShowDeleteAlert] = reactExports.useState(false);
          const handleDelete = () => {
            if (onDelete) {
              setShowDeleteAlert(true);
            }
          };
          const confirmDelete = async () => {
            if (onDelete) {
              await onDelete();
            }
            setShowDeleteAlert(false);
          };
          const defaultSaveText = saveButtonProps.children || t("Sačuvaj");
          deleteButtonProps.children || t("Obriši");
          const defaultDeleteHeader = deleteConfirmationProps.header || t("Obriši?");
          const defaultDeleteMessage = deleteConfirmationProps.message || t("Da li ste sigurni da želite da obrišete ovaj podatak?");
          const defaultDeleteConfirmText = deleteConfirmationProps.confirmTextKey || t("Da");
          const defaultDeleteCancelText = deleteConfirmationProps.cancelTextKey || t("Ne");
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className,
              children: [showDelete && onDelete && /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                type: "button",
                onClick: handleDelete,
                disabled: isDeleting,
                fill: "clear",
                color: "danger",
                ...deleteButtonProps,
                children: deleteButtonProps.children || /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: trashOutline,
                  slot: "icon-only",
                  className: "px-4"
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                onClick: onSave,
                disabled: isSaving,
                expand: "block",
                style: {
                  flexGrow: 1,
                  maxWidth: "300px"
                },
                ...saveButtonProps,
                children: [isSaving && /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  slot: "start"
                }), saveButtonProps.children || /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: saveOutline,
                    slot: "start"
                  }), defaultSaveText]
                })]
              })]
            }), showDelete && onDelete && /* @__PURE__ */jsxRuntimeExports.jsx(IonAlertConfirmation, {
              isOpen: showDeleteAlert,
              header: defaultDeleteHeader,
              message: defaultDeleteMessage,
              confirmAction: confirmDelete,
              cancelAction: () => setShowDeleteAlert(false),
              onDidDismiss: () => setShowDeleteAlert(false),
              confirmTextKey: defaultDeleteConfirmText,
              cancelTextKey: defaultDeleteCancelText,
              confirmCssClass: "danger",
              ...deleteConfirmationProps
            })]
          });
        }
        const defaultProps = {
          minStep: 0,
          initialStep: 0
        };
        function FormStepper(props, ref) {
          const swiperRef = reactExports.useRef(null);
          const {
            renderSteps,
            onCurrentStepChange,
            returnQueryParams,
            swiperProps
          } = props;
          const {
            firstStepReset,
            initialStep
          } = useDefaultProps(props, defaultProps);
          const [formStep, setFormStep] = reactExports.useState(initialStep);
          const [keyIndex, setKeyIndex] = reactExports.useState(0);
          const {
            minStep
          } = useDefaultProps(props, defaultProps);
          const [presentAlert, dismiss] = useConfirmationAlert({
            cancelCallback: () => {
              dismiss();
              returnQueryParams?.();
            },
            confirmCallback: () => {
              const finishCallback = () => {
                setKeyIndex(keyIndex + 1);
                setFormStep(0);
                dismiss();
              };
              if (firstStepReset?.callback) {
                if (!firstStepReset?.callback?.(finishCallback)) {
                  finishCallback();
                }
              } else {
                finishCallback();
              }
            }
          });
          const resetStepper = () => {
            setKeyIndex(keyIndex + 1);
            setFormStep(0);
          };
          const handleReset = () => {
            if (firstStepReset) {
              if (firstStepReset.confirmationAlertOptions) {
                presentAlert(firstStepReset.confirmationAlertOptions);
              } else {
                firstStepReset.callback?.();
              }
            }
          };
          const setStepBack = () => {
            setStep(formStep - 1);
            handleSlideChange(formStep + 1);
          };
          const setStepNext = () => {
            setStep(formStep + 1);
            handleSlideChange(formStep + 1);
          };
          const handleSlideChange = slide => {
            swiperRef.current?.swiper.slideTo(slide);
          };
          const setStep = step => {
            if (step === minStep && firstStepReset) {
              handleReset();
            } else if (step <= maxStep) {
              setFormStep(step);
              handleSlideChange(step);
            }
          };
          reactExports.useImperativeHandle(ref, () => ({
            handleStepBack() {
              setStepBack();
            },
            handleStepNext() {
              setStepNext();
            },
            getCurrentStep() {
              return formStep;
            },
            handleSetStep(step) {
              setStep(step);
            },
            resetStepper() {
              resetStepper();
            }
          }));
          reactExports.useEffect(() => {
            onCurrentStepChange(formStep);
          }, [formStep]);
          const steps = reactExports.useMemo(() => renderSteps({
            handleStepNext: setStepNext,
            handleStepBack: setStepBack,
            setStep,
            getCurrentStep: () => formStep
          }), [renderSteps]);
          const maxStep = steps.length - 1;
          return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper$1, {
            className: props.className,
            speed: 400,
            initialSlide: formStep,
            allowTouchMove: false,
            currentStep: formStep,
            ...swiperProps,
            ref: swiperRef,
            children: steps.map((stepWrapper, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
              children: stepWrapper
            }, "slide" + index))
          });
        }
        const FormStepper$1 = reactExports.memo(reactExports.forwardRef(FormStepper));
        function NoAuthenticationPage() {
          const {
            t
          } = useTranslation();
          const dispatch = useAppDispatch$1();
          const handleLogin = () => {
            dispatch(setShowLoginModal(true));
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonPage, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              className: "ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  textAlign: "center",
                  padding: "20px"
                },
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: lockClosedOutline,
                  style: {
                    fontSize: "64px",
                    color: "var(--ion-color-medium)",
                    marginBottom: "20px"
                  }
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                    style: {
                      marginBottom: "16px"
                    },
                    children: t("Potrebna je autorizacija")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    style: {
                      color: "var(--ion-color-medium)",
                      marginBottom: "32px",
                      fontSize: "16px",
                      lineHeight: "1.5"
                    },
                    children: t("Da biste pristupili ovoj stranici, potrebno je da se prijavite ili registrujete.")
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: handleLogin,
                  expand: "block",
                  style: {
                    maxWidth: "300px",
                    margin: "0 auto"
                  },
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: logInOutline,
                    slot: "start"
                  }), t("Login / Registracija")]
                })]
              })
            })
          });
        }
        function UnauthorizedPage() {
          const {
            t
          } = useTranslation();
          const {
            goBack
          } = useIonRouter();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: "Nemate pristup stranici",
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonContent, {
              className: "ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs("h3", {
                  children: ["Žao mi je, ali nemate pristup ovoj stranici.", /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                    style: {
                      fontSize: "2em"
                    },
                    children: "😞"
                  })]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                  button: true,
                  routerLink: "/",
                  routerDirection: "back",
                  children: t("Nazad na početnu")
                })]
              })
            })
          });
        }
        const UnauthorizedPage$1 = reactExports.memo(UnauthorizedPage);
        const GuardedRoute = ({
          roles,
          fallbackRender,
          hasFallbackWithoutUser,
          ...rest
        }) => {
          const user = useAppSelector$1(getUser);
          roles = roles?.length ? roles : void 0;
          if (user && roles && roles.length > 0) {
            const hasRole = userHasRoles(user, roles);
            if (!hasRole) {
              rest.render = fallbackRender ?? void 0;
              rest.component = fallbackRender ? void 0 : UnauthorizedPage$1;
            }
          }
          if (!user) {
            rest.render = void 0;
            rest.component = NoAuthenticationPage;
            if (fallbackRender && hasFallbackWithoutUser) {
              rest.render = fallbackRender;
              rest.component = void 0;
            }
          }
          return /* @__PURE__ */reactExports.createElement(Route, {
            ...rest,
            key: user?.id
          });
        };
        const GuardedRoute$1 = reactExports.memo(GuardedRoute);
        const preloadCoverImg$1 = "/app/assets/preload-cover-CPxF8vUC.webp";
        const preloadSquareImg = "/app/assets/preload-square-DKFvohGs.webp";
        const imageCache = {};
        const preloadImage = url => {
          if (!imageCache[url]) {
            const img = new Image();
            img.src = url;
            imageCache[url] = img;
          }
        };
        const pl = url => {
          if (!url) {
            return void 0;
          }
          preloadImage(url);
          return imageCache[url].src;
        };
        function LazyLoadImgStandard({
          preloadRatio,
          preloadImg,
          ...props
        }) {
          const [showEffect, setShowEffect] = reactExports.useState(true);
          const src = pl(props.src);
          preloadImg = preloadImg ?? (preloadRatio === "1-1" ? preloadSquareImg : preloadCoverImg$1);
          return /* @__PURE__ */jsxRuntimeExports.jsx(buildExports.LazyLoadImage, {
            onLoad: () => showEffect && setShowEffect(false),
            effect: showEffect ? "blur" : void 0,
            placeholderSrc: preloadImg,
            ...props,
            src
          });
        }
        const LazyLoadImgStandard$1 = exports("L", reactExports.memo(LazyLoadImgStandard));
        function useQueryParamsHook({
          beforeNavigation,
          afterNavigation
        }) {
          const history = useHistory();
          const params = new URLSearchParams(window.location.search);
          const paramsData = Object.fromEntries(params.entries());
          const [queryParamsData, setQueryParamsData] = reactExports.useState(paramsData);
          const updateQueryParams = reactExports.useCallback((name, value) => {
            beforeNavigation?.();
            const params2 = new URLSearchParams(window.location.search);
            if (!value) {
              if (Array.isArray(name)) {
                name.forEach(n => {
                  params2.delete(n);
                });
              } else {
                params2.delete(name);
              }
              setQueryParamsData(prev => {
                if (Array.isArray(name)) {
                  return name.reduce((acc, n) => {
                    const {
                      [n]: _,
                      ...rest
                    } = acc;
                    return rest;
                  }, prev);
                } else {
                  const {
                    [name]: _,
                    ...rest
                  } = prev;
                  return rest;
                }
              });
            } else {
              if (Array.isArray(name)) {
                name.forEach(n => {
                  params2.set(n, value);
                });
              } else {
                params2.set(name, value);
              }
              setQueryParamsData(prev => {
                if (Array.isArray(name)) {
                  return name.reduce((acc, n) => {
                    return {
                      ...acc,
                      [n]: value
                    };
                  }, prev);
                } else {
                  return {
                    ...prev,
                    [name]: value
                  };
                }
              });
            }
            history.replace({
              search: params2.toString()
            });
            afterNavigation?.();
          }, [history]);
          const deleteQueryParams = reactExports.useCallback(name => {
            updateQueryParams(name, null);
          }, [updateQueryParams]);
          return {
            update: updateQueryParams,
            delete: deleteQueryParams,
            data: queryParamsData
          };
        }
        const useAppFocus = (options = {}) => {
          const {
            onFocus,
            onVisibilityChange
          } = options;
          reactExports.useEffect(() => {
            const handleFocus = () => {
              onFocus?.();
            };
            const handleVisibility = () => {
              const state = document.visibilityState;
              const isVisible = state === "visible";
              onVisibilityChange?.(isVisible);
              if (isVisible) {
                handleFocus();
              }
            };
            window.addEventListener("focus", handleFocus);
            window.addEventListener("visibilitychange", handleVisibility);
            return () => {
              window.removeEventListener("focus", handleFocus);
              window.removeEventListener("visibilitychange", handleVisibility);
            };
          }, [onFocus, onVisibilityChange]);
        };
        const pingApi = sharedApi.injectEndpoints({
          endpoints: build => ({
            ping: build.query({
              query: data => ({
                url: "/ping",
                method: "POST",
                body: data,
                transformResponse: transformStandardResponseToCamelCase
              })
            })
          })
        });
        const {
          usePingQuery
        } = pingApi;
        var PingType = /* @__PURE__ */(PingType2 => {
          PingType2["RESERVATIONS"] = "reservations";
          PingType2["WORKERS"] = "workers";
          PingType2["SERVICES"] = "services";
          PingType2["WORKING_HOURS"] = "working_hours";
          PingType2["NOTIFICATIONS"] = "notifications";
          return PingType2;
        })(PingType || {});
        const usePing = (types, requestData, onChangeHandler, options) => {
          const [requestDataState, setRequestDataState] = reactExports.useState({
            lastChecks: {},
            types,
            hashes: {}
          });
          const [isActive, setIsActive] = reactExports.useState(options?.autoStart ?? true);
          const [hasChanges, setHasChanges] = reactExports.useState(false);
          const handleChanges = reactExports.useCallback(changes => {
            onChangeHandler(changes);
            options?.onChanges?.(changes);
          }, [options, onChangeHandler]);
          const {
            data: pingResponse,
            error,
            isLoading
          } = usePingQuery({
            lastChecks: requestDataState.lastChecks,
            types: requestDataState.types,
            hashes: requestDataState.hashes,
            ...requestData
          }, {
            skip: !isActive || hasChanges,
            pollingInterval: options?.interval ?? 1e4
          });
          const data = pingResponse?.data;
          reactExports.useEffect(() => {
            const newLastChecks = {
              ...requestDataState.lastChecks
            };
            if (!data) return;
            if (data.hasChanges || !Object.values(requestDataState.lastChecks).length) {
              let hasChanges2 = false;
              Object.keys(data.changes).forEach(type => {
                if (data.changes[type]?.hasChanges || !requestDataState.lastChecks[type]) {
                  newLastChecks[type] = data.changes[type].lastUpdated;
                  hasChanges2 = true;
                }
              });
              if (hasChanges2) {
                setHasChanges(true);
                if (data.hasChanges) {
                  handleChanges(data.changes);
                }
                const timeout = setTimeout(() => {
                  setRequestDataState({
                    ...requestDataState,
                    lastChecks: newLastChecks,
                    hashes: data.hashes
                  });
                  setHasChanges(false);
                }, options?.interval ?? 1e4);
                return () => clearTimeout(timeout);
              }
            }
          }, [data, handleChanges]);
          const start = reactExports.useCallback(() => setIsActive(true), []);
          const stop = reactExports.useCallback(() => setIsActive(false), []);
          return {
            data,
            error,
            isActive,
            start,
            stop,
            lastChecks: requestDataState.lastChecks,
            hashes: requestDataState.hashes
          };
        };
        const mainHeaderClasses = isWebPlatform ? "max-w-[80vw]" : "";
        const locationApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeLocation: builder.query({
              query: ({
                slug
              }) => ({
                url: `locations/data`,
                method: "GET",
                params: {
                  slug
                }
              }),
              providesTags: [TagType$1.LOCATION, TagType$1.APP_LANG],
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useGetFeLocationQuery
        } = locationApi;
        exports("B", useGetFeLocationQuery);
        const HomePage = reactExports.lazy(() => __vitePreload(() => module.import('./HomePage-legacy-D6B2fOXk.js'), false              ? __VITE_PRELOAD__ : void 0));
        const HomePageWrapper = () => {
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: /* @__PURE__ */jsxRuntimeExports.jsx("h1", {
              className: "text-left",
              children: locationData?.title ?? "..."
            }),
            headerClasses: mainHeaderClasses,
            installAppHeaderHandle: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(HomePage, {})
            })
          });
        };
        const AppointmentPage = reactExports.lazy(() => __vitePreload(() => module.import('./AppointmentPage-legacy-CrDqbBH7.js'), false              ? __VITE_PRELOAD__ : void 0));
        const AppointmentPageWrapper = () => {
          const {
            t
          } = useTranslation();
          const [activeStep, handleSetStep] = reactExports.useState(0);
          const handleSegmentChange = segment => {
            if (activeStep !== segment.detail.value) {
              handleSetStep(segment.detail.value);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Termini"),
            titleSlot: "start",
            headerClasses: mainHeaderClasses,
            footer: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
              routerLink: `${urlPrefix}/zakazi-novo`,
              color: "dark",
              size: "large",
              className: "border border-gray-500 mb-8",
              children: t("Zakažite nov termin")
            }),
            additionalHeader: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
              className: "border-t",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonSegment, {
                value: activeStep,
                onIonChange: handleSegmentChange,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSegmentButton, {
                  value: 0,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Aktivni termini")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSegmentButton, {
                  value: 1,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    children: t("Arhiva")
                  })
                })]
              })
            }),
            installAppHeaderHandle: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentPage, {
                activeStep
              })
            })
          });
        };
        const ProfilePage = reactExports.lazy(() => __vitePreload(() => module.import('./ProfilePage-legacy-Cm7DJqbf.js'), false              ? __VITE_PRELOAD__ : void 0));
        const ProfilePageWrapper = () => {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Profil"),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(ProfilePage, {})
            })
          });
        };
        const NotificationPage = reactExports.lazy(() => __vitePreload(() => module.import('./NotificationPage-legacy-BLIV5JyT.js'), false              ? __VITE_PRELOAD__ : void 0));
        const NotificationPageWrapper = () => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Notifikacije"),
            headerClasses: mainHeaderClasses,
            installAppHeaderHandle: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(NotificationPage, {})
            })
          });
        };
        const locationWorkerApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeWorkers: builder.query({
              query: ({
                locationSlug
              }) => ({
                url: `locations/workers`,
                method: "GET",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [TagType$1.LOCATION_WORKERS]
            }),
            getFeWorker: builder.query({
              query: ({
                workerId,
                locationSlug
              }) => ({
                url: `locations/worker/${workerId}`,
                method: "GET",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: (result, error, {
                workerId
              }) => [{
                type: TagType$1.LOCATION_WORKERS,
                id: workerId
              }]
            }),
            createWorker: builder.mutation({
              query: ({
                locationSlug,
                ...body
              }) => ({
                url: `locations/workers/create`,
                method: "POST",
                body: {
                  ...humpsExports.decamelizeKeys(body),
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            updateWorker: builder.mutation({
              query: ({
                id,
                locationSlug,
                ...body
              }) => ({
                url: `locations/workers/update`,
                method: "POST",
                body: {
                  ...humpsExports.decamelizeKeys(body),
                  id,
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            deleteWorker: builder.mutation({
              query: body => ({
                url: `locations/workers/delete`,
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            getAllWorkers: builder.query({
              query: ({
                locationSlug
              }) => ({
                url: `locations/workers/all`,
                method: "GET",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [TagType$1.LOCATION_WORKERS]
            }),
            // Worker Services
            getWorkerServices: builder.query({
              query: ({
                locationSlug,
                workerId
              }) => ({
                url: `locations/worker/${workerId}/services`,
                method: "GET",
                params: {
                  locationSlug,
                  workerId
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType$1.LOCATION_WORKERS]
            }),
            storeWorkerService: builder.mutation({
              query: ({
                locationSlug,
                workerId,
                services
              }) => ({
                url: `locations/worker/${workerId}/services`,
                method: "POST",
                body: {
                  locationSlug,
                  workerId,
                  services: services.map(service => ({
                    serviceId: service.serviceId,
                    locationId: service.locationId,
                    price: service.price,
                    duration: service.duration,
                    sortOrder: service.sortOrder,
                    active: service.active
                  }))
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            updateWorkerService: builder.mutation({
              query: ({
                locationSlug,
                workerId,
                serviceId,
                ...body
              }) => ({
                url: `locations/worker/${workerId}/services/${serviceId}`,
                method: "PUT",
                body: {
                  ...humpsExports.decamelizeKeys(body),
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            deleteWorkerService: builder.mutation({
              query: ({
                locationSlug,
                workerId,
                serviceId
              }) => ({
                url: `locations/worker/${workerId}/services/${serviceId}`,
                method: "DELETE",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            }),
            deleteWorkerAvatar: builder.mutation({
              query: ({
                workerId,
                locationSlug
              }) => ({
                url: `locations/workers/${workerId}/avatar`,
                method: "DELETE",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_WORKERS]
            })
          })
        });
        const {
          useGetFeWorkersQuery,
          useGetFeWorkerQuery,
          useCreateWorkerMutation,
          useUpdateWorkerMutation,
          useDeleteWorkerMutation,
          useGetAllWorkersQuery,
          useGetWorkerServicesQuery,
          useStoreWorkerServiceMutation,
          useUpdateWorkerServiceMutation,
          useDeleteWorkerServiceMutation
        } = locationWorkerApi;
        exports({
          x: useGetFeWorkersQuery,
          W: useCreateWorkerMutation,
          G: useGetAllWorkersQuery
        });
        const useAppDispatch = exports("a", () => useDispatch());
        const useAppSelector = exports("c", useSelector);
        function SelectWorker({
          onSelectWorker,
          selectedWorker
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: workersResult,
            isLoading: workersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const userData = useAppSelector(getUser);
          const handleSelectWorker = workerId => {
            const selectedWorkerData = workersResult?.data.find(worker => worker.id.toString() === workerId.toString());
            if (selectedWorkerData) {
              onSelectWorker(selectedWorkerData);
            }
          };
          reactExports.useEffect(() => {
            if (!selectedWorker && workersResult?.data.length && userData) {
              const worker = workersResult?.data.find(worker2 => worker2.userId === userData.id);
              if (worker) {
                onSelectWorker(worker);
              }
            }
          }, [userData, workersResult]);
          if (workersLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
            className: "m-2",
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSelect, {
              placeholder: t("Odaberite radnika"),
              labelPlacement: "fixed",
              interface: "action-sheet",
              onIonChange: event => handleSelectWorker(event.detail.value),
              value: selectedWorker?.id,
              children: workersResult?.data.map(worker => /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                value: worker.id,
                children: worker.fullName
              }, worker.id))
            })
          });
        }
        const PrepareWorkingDaysShiftsPage = reactExports.lazy(() => __vitePreload(() => module.import('./PrepareWorkingDaysShiftsPage-legacy-NYdwGI4I.js'), false              ? __VITE_PRELOAD__ : void 0));
        const PrepareWorkingDaysShiftsPageWrapper = () => {
          const {
            t
          } = useTranslation();
          const [selectedWorker, setSelectedWorker] = reactExports.useState(null);
          const handleSelectWorker = worker => {
            setSelectedWorker(worker);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(LayoutMainPage, {
            title: t("Radni dani - Izmene"),
            hasBackButton: true,
            backButtonIcon: exitOutline,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(SelectWorker, {
              onSelectWorker: handleSelectWorker,
              selectedWorker
            }), /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(PrepareWorkingDaysShiftsPage, {
                selectedWorker
              })
            })]
          });
        };
        const getSettingsOptions = exports("Y", urlPrefix => [{
          title: "Priprema radnih dana",
          path: `${urlPrefix}/t/home/pripremi`,
          icon: timeOutline
        }, {
          title: "Izmeni podatke i slike",
          path: `${urlPrefix}/podesavanja/podaci`,
          icon: createOutline
        }, {
          title: "Usluge",
          path: `${urlPrefix}/podesavanja/usluge`,
          icon: constructOutline
        }, {
          title: "Promo kodovi",
          path: `${urlPrefix}/podesavanja/promo-kodovi`,
          icon: giftOutline
        }, {
          title: "Opšta podešavanja",
          path: `${urlPrefix}/podesavanja/generalno`,
          icon: settingsOutline
        }, {
          title: "Podesi radno vreme",
          path: `${urlPrefix}/podesavanja/radno-vreme`,
          icon: timeOutline
        }, {
          title: "Radnici",
          path: `${urlPrefix}/podesavanja/radnici`,
          icon: peopleOutline
        }, {
          title: "Vesti i važna saopštenja",
          path: `${urlPrefix}/podesavanja/vesti`,
          icon: megaphoneOutline
        }]);
        const OwnerHomePage = reactExports.lazy(() => __vitePreload(() => module.import('./OwnerHomePage-legacy-Ut2bQMvd.js'), false              ? __VITE_PRELOAD__ : void 0));
        const OwnerHomePageWrapper = () => {
          const {
            t
          } = useTranslation();
          const [showActionSheet, setShowActionSheet] = reactExports.useState(false);
          const router = useIonRouter();
          useIonViewWillLeave(() => {
            setShowActionSheet(false);
          });
          const {
            data: locationResponse
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          const settingsOptions = getSettingsOptions(urlPrefix);
          const handleActionSheetAction = path => {
            setShowActionSheet(false);
            router.push(path);
          };
          const headerEndActions = /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
            slot: "primary",
            className: "justify-center mt-1",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
              onClick: () => setShowActionSheet(true),
              color: "dark",
              className: "border-2 border-gray-300 rounded px-2 py-[2px]",
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                slot: "start",
                children: t("Podešavanja")
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: settingsOutline,
                slot: "end"
              })]
            })
          });
          const footer = /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex gap-2 p-4",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  routerLink: `${urlPrefix}/zakazi-novo`,
                  expand: "block",
                  className: "flex-1",
                  color: "dark",
                  children: t("Zakažite")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  routerLink: `${urlPrefix}/t/home/pripremi`,
                  expand: "block",
                  className: "flex-1",
                  color: "dark",
                  fill: "outline",
                  children: t("Priprema radnih dana")
                })]
              })
            })
          });
          return /* @__PURE__ */jsxRuntimeExports.jsxs(LayoutMainPage, {
            title: /* @__PURE__ */jsxRuntimeExports.jsx("h1", {
              className: "text-left",
              children: locationData?.title ?? "..."
            }),
            headerClasses: mainHeaderClasses,
            additionalHeader: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "px-2",
              children: headerEndActions
            }),
            installAppHeaderHandle: true,
            footer,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(OwnerHomePage, {})
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonActionSheet, {
              isOpen: showActionSheet,
              onDidDismiss: () => setShowActionSheet(false),
              header: t("Podešavanja"),
              buttons: [...settingsOptions.map(option => ({
                text: t(option.title),
                icon: option.icon,
                handler: () => handleActionSheetAction(option.path)
              })), {
                text: t("Otkaži"),
                role: "cancel"
              }]
            })]
          });
        };
        function OwnerAppointmentFooter() {
          const {
            t
          } = useTranslation();
          const {
            isScrolled
          } = useContentData() || {};
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
            routerLink: `${urlPrefix}/zakazi-novo`,
            className: "border border-gray-500 mb-1",
            color: "dark",
            size: isScrolled ? "small" : "large",
            children: t("Zakažite nov termin")
          });
        }
        const OwnerAppointmentPage = reactExports.lazy(() => __vitePreload(() => module.import('./OwnerAppointmentPage-legacy-Dc04xXpu.js'), false              ? __VITE_PRELOAD__ : void 0));
        const OwnerAppointmentPageWrapper = () => {
          const {
            t
          } = useTranslation();
          const [selectedWorker, setSelectedWorker] = reactExports.useState(null);
          const handleSelectWorker = worker => {
            setSelectedWorker(worker);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Termini"),
            titleSlot: "start",
            headerClasses: mainHeaderClasses,
            footer: /* @__PURE__ */jsxRuntimeExports.jsx(OwnerAppointmentFooter, {}),
            additionalHeader: /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(SelectWorker, {
                onSelectWorker: handleSelectWorker,
                selectedWorker
              })
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                className: "flex mx-auto mt-5"
              }),
              children: /* @__PURE__ */jsxRuntimeExports.jsx(OwnerAppointmentPage, {
                selectedWorker
              })
            })
          });
        };
        const SettingsPage = reactExports.lazy(() => __vitePreload(() => module.import('./SettingsPage-legacy-DBPfb4C_.js'), false              ? __VITE_PRELOAD__ : void 0));
        function SettingsPageWrapper() {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Podešavanja"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(SettingsPage, {})
          });
        }
        const MainTabs = ({
          match
        }) => {
          const {
            t
          } = useTranslation();
          const url = fixUrlPath(match.url);
          const tabBarClasses = isWebPlatform ? "justify-end py-1 mb-[1px] z-10 bg-transparent w-[40vw] right-0 absolute" : "";
          const mainRoles = [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker];
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonTabs, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonRouterOutlet, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(Route, {
                path: `${url}/`,
                exact: true,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(Redirect, {
                  to: `${url}/home`
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
                path: `${url}/salon`,
                exact: true,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(Redirect, {
                  to: `${url}/home`
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/home`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(OwnerHomePageWrapper, {}),
                fallbackRender: () => /* @__PURE__ */jsxRuntimeExports.jsx(HomePageWrapper, {}),
                hasFallbackWithoutUser: true,
                exact: true,
                roles: mainRoles
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/termini`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(OwnerAppointmentPageWrapper, {}),
                fallbackRender: () => /* @__PURE__ */jsxRuntimeExports.jsx(AppointmentPageWrapper, {}),
                hasFallbackWithoutUser: true,
                exact: true,
                roles: mainRoles
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/home/pripremi`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(PrepareWorkingDaysShiftsPageWrapper, {}),
                exact: true,
                roles: mainRoles
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/notifikacije`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(NotificationPageWrapper, {}),
                exact: true
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/profil`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(ProfilePageWrapper, {}),
                exact: true
              }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
                path: `${url}/podesavanja`,
                render: () => /* @__PURE__ */jsxRuntimeExports.jsx(SettingsPageWrapper, {}),
                exact: true,
                roles: mainRoles
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonTabBar, {
              slot: tabPosition,
              className: tabBarClasses,
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTabButton, {
                tab: "home",
                href: `${url}/home`,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: homeOutline
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonTabButton, {
                tab: "termini",
                href: `${url}/termini`,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: alarmOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Termini")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonTabButton, {
                tab: "notifikacije",
                href: `${url}/notifikacije`,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: notificationsOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Notifikacije")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonTabButton, {
                tab: "profil",
                href: `${url}/profil`,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: personOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Profil")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonTabButton, {
                tab: "podesavanja",
                href: `${url}/podesavanja`,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: settingsOutline
                })
              })]
            })]
          }, activeLocation);
        };
        const preloadCoverImg = exports("p", "/app/assets/logo-square-Bsnn6NiG.webp");
        function SelectWorkerStep({
          workerId,
          setSelectedWorker,
          activeWorkersCount = 0
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: workersResult,
            isLoading: workersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const workers = workersResult?.data || [];
          const handleSelectWorker = worker => () => {
            setSelectedWorker(worker);
          };
          reactExports.useEffect(() => {
            if (workerId && workers.length) {
              const worker = workers.find(w => w.id == workerId);
              setSelectedWorker(worker);
            }
          }, [workerId, workers]);
          if (workersLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(SceletonLoader, {});
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "w-full",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
              className: "px-4 py-2",
              children: t("Izaberite radnika")
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
              className: "w-full bg-inherit",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                onClick: handleSelectWorker(null),
                detail: false,
                disabled: activeWorkersCount === 1,
                className: "mb-2",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
                  slot: "start",
                  className: "w-14 h-14 rounded-full",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "w-full h-full bg-gray-700 flex items-center justify-center rounded-full",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: peopleOutline,
                      className: "text-3xl text-gray-300"
                    })
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: t("Prvi slobodan")
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "end",
                  icon: chevronForwardOutline
                })]
              }), workers.map(worker => /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                button: true,
                onClick: handleSelectWorker(worker),
                detail: false,
                className: "mb-2",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
                  slot: "start",
                  className: "w-14 h-14 rounded-full",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(LazyLoadImgStandard$1, {
                    src: getPathBySize(worker.avatar?.pathByResolution),
                    preloadImg: preloadCoverImg,
                    alt: worker.fullName,
                    className: "w-full h-full object-cover rounded-full"
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: worker.fullName
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  slot: "end",
                  icon: chevronForwardOutline
                })]
              }, worker.id))]
            })]
          });
        }
        var InputType = /* @__PURE__ */(InputType2 => {
          InputType2[InputType2["checkbox"] = 0] = "checkbox";
          InputType2[InputType2["radio"] = 1] = "radio";
          InputType2[InputType2["select"] = 2] = "select";
          return InputType2;
        })(InputType || {});
        const maxQuantity = 4;
        const maxServicesTime = 180;
        function SelectService({
          groupsSelectedServices,
          onSelectedService,
          serviceGroup,
          hasMultiplePersons,
          allSelectedServicesDurationSum,
          selectedWorker
        }) {
          const handleSelectService = service => () => {
            onSelectedService(serviceGroup, {
              ...service,
              quantity: 1
            });
          };
          const addQuantity = selectedService => () => {
            const quantity = selectedService.quantity ?? 1;
            onSelectedService(serviceGroup, selectedService);
            onSelectedService(serviceGroup, {
              ...selectedService,
              quantity: quantity + 1
            });
          };
          const removeQuantity = selectedService => () => {
            const quantity = selectedService.quantity ?? 1;
            onSelectedService(serviceGroup, selectedService);
            if (quantity > 1) {
              onSelectedService(serviceGroup, {
                ...selectedService,
                quantity: quantity - 1
              });
            }
          };
          const selectedServices = reactExports.useMemo(() => {
            const selectedGroup = groupsSelectedServices.find(group => group.serviceGroup.id === serviceGroup.id);
            return selectedGroup?.services || [];
          }, [groupsSelectedServices, serviceGroup]);
          const [expandedDescriptions, setExpandedDescriptions] = reactExports.useState({});
          const toggleDescription = serviceId => e => {
            e.stopPropagation();
            setExpandedDescriptions(prev => ({
              ...prev,
              [serviceId]: !prev[serviceId]
            }));
          };
          const renderService = service => {
            const selectedService = selectedServices.find(s => s.id === service.id);
            const isSelected = !!selectedService;
            const isDescriptionExpanded = expandedDescriptions[service.id];
            const hasLongDescription = service.description && service.description.length > 80;
            const displayDescription = !isDescriptionExpanded && service.description && service.description.length > 80 ? service.description.substring(0, 80) + "..." : service.description;
            let workerPrice;
            let workerDuration;
            if (selectedWorker && service.locationWorkers) {
              const workerData = service.locationWorkers.find(worker => worker.id === selectedWorker.id);
              if (workerData?.pivot) {
                workerPrice = workerData.pivot.price !== void 0 && workerData.pivot.price !== null ? workerData.pivot.price : service.price;
                workerDuration = workerData.pivot.duration !== void 0 && workerData.pivot.duration !== null ? workerData.pivot.duration : service.duration;
              }
            }
            const effectivePrice = workerPrice ?? service.price;
            const effectiveDuration = workerDuration ?? service.duration;
            const hasWorkerSelected = selectedWorker !== null && selectedWorker !== void 0;
            hasWorkerSelected ? `${formatPriceSimple(effectivePrice)} RSD` : service.minPrice && service.maxPrice && service.minPrice !== service.maxPrice ? `od ${formatPriceSimple(service.minPrice)} do ${formatPriceSimple(service.maxPrice)} RSD` : `${formatPriceSimple(effectivePrice)} RSD`;
            hasWorkerSelected ? `${effectiveDuration} min` : service.minDuration && service.maxDuration && service.minDuration !== service.maxDuration ? `od ${service.minDuration} do ${service.maxDuration} min` : `${effectiveDuration} min`;
            const isMaxedOut = selectedService?.quantity === maxQuantity || allSelectedServicesDurationSum >= maxServicesTime;
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonCol, {
              size: "12",
              sizeMd: "6",
              sizeLg: "4",
              className: "ion-align-self-stretch",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                disabled: isMaxedOut && !isSelected,
                className: `ion-no-padding ion-no-margin cursor-pointer relative h-full flex flex-col ${isSelected ? "border-2 border-green-500 shadow-lg service-selected" : "border border-gray-200 hover:shadow-md"}`,
                onClick: handleSelectService(service),
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                  className: "ion-no-padding ion-no-margin pb-1",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                    className: "text-md font-semibold line-clamp-2",
                    children: service.title
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                  className: "pt-0 ion-no-padding ion-no-margin pb-1 flex flex-col h-full",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                    condition: !!service.description?.length,
                    render: () => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "mb-1 text-xs text-gray-400 relative",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: `px-1 ${isDescriptionExpanded ? "inline-block max-w-full" : "inline-block max-w-full overflow-hidden text-ellipsis whitespace-nowrap"}`,
                        children: service.description ? displayDescription : " "
                      }), service.description && hasLongDescription && /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        onClick: toggleDescription(service.id),
                        className: `absolute right-2 text-xs text-blue-400 hover:text-blue-300 underline bg-transparent ${isDescriptionExpanded ? "-bottom-2.5" : "top-2.5"}`,
                        style: {
                          background: "transparent"
                        },
                        children: isDescriptionExpanded ? "manje" : "više"
                      })]
                    })
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "mt-auto",
                    children: [service.minDuration && service.maxDuration && service.minDuration !== service.maxDuration && !hasWorkerSelected ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "text-xs text-gray-300",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-gray-400",
                        children: "od "
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        children: service.minDuration
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-gray-400",
                        children: " do "
                      }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                        children: [service.maxDuration, " min"]
                      })]
                    }) : /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "text-xs text-gray-300",
                      children: [effectiveDuration, " min"]
                    }), hasWorkerSelected ? /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                      className: "text-sm font-bold px-2 py-1 text-green-500",
                      children: [formatPriceSimple(effectivePrice), " RSD"]
                    }) : service.minPrice && service.maxPrice && service.minPrice !== service.maxPrice ? /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "text-sm font-bold px-2 py-1 text-green-500",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-xs text-gray-400 font-normal",
                        children: "od "
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        children: formatPriceSimple(service.minPrice)
                      }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                        className: "text-xs text-gray-400 font-normal",
                        children: [" ", "do", " "]
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        children: formatPriceSimple(service.maxPrice)
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                        className: "text-sm font-bold text-green-500",
                        children: " RSD"
                      })]
                    }) : /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                      className: "text-sm font-bold px-2 py-1 text-green-500",
                      children: [formatPriceSimple(effectivePrice), " RSD"]
                    })]
                  }), selectedService && hasMultiplePersons && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "flex items-center justify-between mt-2 pt-2 border-t",
                    onClick: e => e.stopPropagation(),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                      size: "small",
                      fill: "clear",
                      color: "danger",
                      onClick: e => {
                        e.stopPropagation();
                        removeQuantity(selectedService)();
                      },
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: removeOutline
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                      className: "text-sm font-bold",
                      children: selectedService.quantity
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                      size: "small",
                      fill: "clear",
                      disabled: selectedService.quantity === maxQuantity || allSelectedServicesDurationSum >= maxServicesTime,
                      onClick: e => {
                        e.stopPropagation();
                        addQuantity(selectedService)();
                      },
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: addOutline
                      })
                    })]
                  })]
                })]
              })
            }, service.id);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
              className: "p-4",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                className: "border-2 bg-green-900 rounded-md text-white py-2",
                children: serviceGroup.title
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
              className: "px-2",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonRow, {
                className: "ion-align-items-stretch",
                children: serviceGroup.services.map(service => renderService(service))
              })
            })]
          });
        }
        const createValidationSchema = serviceGroups => {
          const schemaFields = {};
          serviceGroups.forEach(group => {
            if (group.inputType === InputType.checkbox) {
              schemaFields[`serviceGroup_${group.id}`] = yup.array().of(yup.string()).min(group.minSelected || 0, `Select at least ${group.minSelected} options`).max(group.maxSelected || Number.POSITIVE_INFINITY, `Select no more than ${group.maxSelected} options`).when([], () => group.required ? yup.array().required() : yup.array());
            } else if (group.inputType === InputType.select) {
              schemaFields[`serviceGroup_${group.id}`] = yup.string().when([], () => group.required ? yup.string().nullable().required() : yup.string().nullable());
            }
          });
          return yup.object().shape(schemaFields);
        };
        function SelectAppointmentStep({
          onBack,
          onNext,
          selectedWorker,
          serviceGroups,
          onSelectService,
          groupsSelectedServices,
          hasMultiplePersons,
          setHasMultiplePersons
        }) {
          const {
            t
          } = useTranslation();
          const formSchema = createValidationSchema(serviceGroups);
          const form = useForm({
            resolver: o(formSchema)
          });
          const onSubmit = data => {
            handleNext();
          };
          const handleNext = () => {
            onNext();
          };
          groupsSelectedServices.length;
          const toggleMultiplePersons = () => {
            setHasMultiplePersons(!hasMultiplePersons);
          };
          const filteredServiceGroups = reactExports.useMemo(() => {
            if (!selectedWorker) {
              return serviceGroups;
            }
            if (selectedWorker.isSyncedService) {
              return serviceGroups;
            }
            return serviceGroups.map(group => ({
              ...group,
              services: group.services.filter(service => {
                return service.locationWorkers && service.locationWorkers.some(worker => worker.id === selectedWorker.id);
              })
            }));
          }, [serviceGroups, selectedWorker]);
          const allSelectedServicesDurationSum = reactExports.useMemo(() => {
            return groupsSelectedServices.reduce((acc, group) => acc + (group.services?.reduce((acc2, service) => acc2 + service.duration * (service.quantity ?? 1), 0) ?? 0), 0);
          }, [groupsSelectedServices]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "mb-[80px]",
              children: [selectedWorker && /* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                children: selectedWorker.fullName
              }), /* @__PURE__ */jsxRuntimeExports.jsx("h4", {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                  checked: hasMultiplePersons,
                  onClick: toggleMultiplePersons,
                  children: t("Za više osoba")
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx("form", {
                onSubmit: form.handleSubmit(onSubmit),
                children: filteredServiceGroups.map((group, index) => /* @__PURE__ */jsxRuntimeExports.jsx(SelectService, {
                  groupsSelectedServices,
                  onSelectedService: onSelectService,
                  serviceGroup: group,
                  hasMultiplePersons,
                  allSelectedServicesDurationSum,
                  selectedWorker
                }, `${group.id} ${index}`))
              })]
            })
          });
        }
        const serviceGroupApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeServiceGroups: builder.query({
              query: ({
                locationSlug,
                workerId,
                withWorkers
              }) => ({
                url: `locations/services-groups`,
                method: "GET",
                params: {
                  locationSlug,
                  workerId,
                  withWorkers
                }
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [TagType$1.APP_LANG, TagType$1.SERVICES_GROUPS]
            })
          })
        });
        const {
          useGetFeServiceGroupsQuery
        } = serviceGroupApi;
        exports("N", useGetFeServiceGroupsQuery);
        const PAUSE_BETWEEN_SLOTS_MINUTES = 10;
        const MIN_SLOT_DIFFERENCE_MINUTES = 15;
        const generateTimeSlots = (date, timeFromUtc, timeToUtc, intervalMinutes, roundedSlotInterval, locationReservations, servicesDuration, delay, pauses) => {
          const currentTime = /* @__PURE__ */new Date();
          const dateIso = parseISO(date);
          const tz = getAppTimezone();
          const nowDate = formatInTimeZone(currentTime, tz, "yyyy-MM-dd") + "T00:00:00.000000Z";
          const nowDateIso = parseISO(nowDate);
          const nowTimeString = formatInTimeZone(currentTime, tz, "HH:mm:ss");
          const slots = [];
          let startTime = parse(timeFromUtc, "HH:mm:ss", dateIso);
          const endTime = parse(timeToUtc, "HH:mm:ss", dateIso);
          const currentTimeInTz = parse(nowTimeString, "HH:mm:ss", nowDateIso);
          if (startTime > endTime) {
            startTime = addMinutes(startTime, -24 * 60);
          }
          const interval = intervalMinutes;
          if (currentTimeInTz > endTime) {
            return slots;
          }
          if (isWithinInterval(currentTimeInTz, {
            start: startTime,
            end: endTime
          })) {
            const nowPlusDelay = addMinutes(currentTime, delay);
            const nextInterval = Math.ceil(nowPlusDelay.getMinutes() / intervalMinutes) * intervalMinutes;
            startTime = addMinutes(nowPlusDelay, nextInterval - nowPlusDelay.getMinutes());
          }
          if (startTime > endTime) {
            return slots;
          }
          let dynamicTime = startTime;
          while (isWithinInterval(dynamicTime, {
            start: startTime,
            end: endTime
          })) {
            const appointmentEndTime = addMinutes(dynamicTime, servicesDuration);
            if (appointmentEndTime > endTime) {
              break;
            }
            const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
            const isPreviousDay = isCrossMidnight && dynamicTime.getDate() !== dateIso.getDate();
            const slotTime = format(dynamicTime, "HH:mm");
            const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
            slots.push(prefixedSlot);
            const nextSlotStart = addMinutes(dynamicTime, interval);
            dynamicTime = nextSlotStart;
          }
          locationReservations.forEach(reservation => {
            const reservationStartUtc = parseISO(reservation.dateUtc);
            const reservationEndUtc = addMinutes(reservationStartUtc, reservation.servicesDuration);
            const pauseStartUtc = addMinutes(reservationEndUtc, PAUSE_BETWEEN_SLOTS_MINUTES);
            const slotTime = formatInTimeZone(pauseStartUtc, "UTC", "HH:mm");
            const isPreviousDay = reservationEndUtc.getUTCDate() != dateIso.getUTCDate();
            const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
            if (!slots.includes(prefixedSlot)) {
              slots.push(prefixedSlot);
            }
          });
          const slotsWithoutPauses = pauses?.length ? slots.filter(slot => {
            const slotStart = parse(slot, "HH:mm", dateIso);
            const slotEnd = addMinutes(slotStart, servicesDuration);
            format(dateIso, "EEE").toLowerCase();
            return !pauses.some(pause => {
              const pauseStart = parse(pause.timeFromUtc, "HH:mm:ss", dateIso);
              const pauseEnd = parse(pause.timeToUtc, "HH:mm:ss", dateIso);
              const hasOverlap = isWithinInterval(pauseStart, {
                start: slotStart,
                end: slotEnd
              }) && differenceInMinutes(pauseStart, slotEnd) !== 0 || isWithinInterval(pauseEnd, {
                start: slotStart,
                end: slotEnd
              }) && differenceInMinutes(pauseEnd, slotStart) !== 0 || isWithinInterval(slotStart, {
                start: pauseStart,
                end: pauseEnd
              }) && differenceInMinutes(slotStart, pauseEnd) !== 0;
              return hasOverlap;
            });
          }) : slots;
          if (!locationReservations) {
            return slotsWithoutPauses;
          }
          const filteredSlots = slotsWithoutPauses.filter(slot => {
            const isPreviousDay = slot.startsWith("-");
            const actualSlot = isPreviousDay ? slot.substring(1) : slot;
            const slotStart = parse(actualSlot, "HH:mm", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
            const slotEnd = addMinutes(slotStart, servicesDuration);
            return !locationReservations.some(reservation => {
              const reservationStartUtc = parseISO(reservation.dateUtc);
              const reservationStartTimeUtc = formatInTimeZone(reservationStartUtc, "UTC", "HH:mm:ss");
              const reservationStart = parse(reservationStartTimeUtc, "HH:mm:ss", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
              const reservationEnd = addMinutes(reservationStart, reservation.servicesDuration);
              const hasOverlap = isWithinInterval(reservationStart, {
                start: slotStart,
                end: slotEnd
              }) || isWithinInterval(reservationEnd, {
                start: slotStart,
                end: slotEnd
              }) || isWithinInterval(slotStart, {
                start: reservationStart,
                end: reservationEnd
              });
              if (hasOverlap) {
                return true;
              }
              const timeBetweenSlotEndAndReservationStart = differenceInMinutes(reservationStart, slotEnd);
              if (timeBetweenSlotEndAndReservationStart < PAUSE_BETWEEN_SLOTS_MINUTES && timeBetweenSlotEndAndReservationStart > 0) {
                return true;
              }
              const timeBetweenReservationEndAndSlotStart = differenceInMinutes(slotStart, reservationEnd);
              if (timeBetweenReservationEndAndSlotStart < PAUSE_BETWEEN_SLOTS_MINUTES && timeBetweenReservationEndAndSlotStart > 0) {
                return true;
              }
              return false;
            });
          });
          const additionalSlots = [];
          [...locationReservations].sort((a, b) => {
            const aStart = parseISO(a.dateUtc);
            const bStart = parseISO(b.dateUtc);
            return aStart.getTime() - bStart.getTime();
          });
          const allSlots = [...filteredSlots, ...additionalSlots].sort();
          const finalSlots = [];
          if (allSlots.length > 0) {
            const sortedSlots = [...allSlots].sort((a, b) => {
              const aTime = a.startsWith("-") ? a.substring(1) : a;
              const bTime = b.startsWith("-") ? b.substring(1) : b;
              if (!a.startsWith("-") && !b.startsWith("-")) {
                return aTime.localeCompare(bTime);
              }
              if (a.startsWith("-") && b.startsWith("-")) {
                return aTime.localeCompare(bTime);
              }
              if (a.startsWith("-") && !b.startsWith("-")) return -1;
              if (!a.startsWith("-") && b.startsWith("-")) return 1;
              return 0;
            });
            finalSlots.push(sortedSlots[0]);
            for (let i = 1; i < sortedSlots.length; i++) {
              const currentSlot = sortedSlots[i];
              const lastAddedSlot = finalSlots[finalSlots.length - 1];
              const currentSlotTimeStr = currentSlot.startsWith("-") ? currentSlot.substring(1) : currentSlot;
              const lastAddedSlotTimeStr = lastAddedSlot.startsWith("-") ? lastAddedSlot.substring(1) : lastAddedSlot;
              const currentSlotDate = currentSlot.startsWith("-") ? addMinutes(dateIso, -24 * 60) : dateIso;
              const lastAddedSlotDate = lastAddedSlot.startsWith("-") ? addMinutes(dateIso, -24 * 60) : dateIso;
              const currentSlotTime = parse(currentSlotTimeStr, "HH:mm", currentSlotDate);
              const lastAddedSlotTime = parse(lastAddedSlotTimeStr, "HH:mm", lastAddedSlotDate);
              const diff = differenceInMinutes(currentSlotTime, lastAddedSlotTime);
              if (diff >= MIN_SLOT_DIFFERENCE_MINUTES) {
                finalSlots.push(currentSlot);
              }
            }
          }
          return finalSlots;
        };
        const getTimeSlotsForTable = exports("ad", (locationReservations, date, timeFromUtc, timeToUtc, pauses, intervalMinutes = 30) => {
          const dateIso = parseISO(date);
          const dateIsoUTC = parseISO(`${date}T00:00:00Z`);
          const allSlots = [];
          const slotDuration = {};
          let startTime = parse(timeFromUtc, "HH:mm:ss", dateIso);
          const endTime = parse(timeToUtc, "HH:mm:ss", dateIso);
          if (startTime > endTime) {
            startTime = addMinutes(startTime, -24 * 60);
          }
          if (pauses?.length) {
            pauses.forEach(pause => {
              const pauseStartTime = parse(pause.timeFromUtc, "HH:mm:ss", dateIso);
              const pauseEndTime = parse(pause.timeToUtc, "HH:mm:ss", dateIso);
              let currentPauseTime = pauseStartTime;
              while (isWithinInterval(currentPauseTime, {
                start: pauseStartTime,
                end: pauseEndTime
              }) && differenceInMinutes(currentPauseTime, pauseEndTime) !== 0) {
                const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
                const isPreviousDay = isCrossMidnight && currentPauseTime.getDate() !== dateIso.getDate();
                const slotTime = format(currentPauseTime, "HH:mm");
                const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
                if (isWithinInterval(currentPauseTime, {
                  start: startTime,
                  end: endTime
                })) {
                  allSlots.push(prefixedSlot);
                  const pauseDuration = differenceInMinutes(pauseEndTime, pauseStartTime);
                  slotDuration[prefixedSlot] = pauseDuration;
                }
                currentPauseTime = addMinutes(currentPauseTime, intervalMinutes);
              }
            });
          }
          let currentTime = startTime;
          while (isWithinInterval(currentTime, {
            start: startTime,
            end: endTime
          })) {
            const isCrossMidnight = parse(timeFromUtc, "HH:mm:ss", dateIso) > parse(timeToUtc, "HH:mm:ss", dateIso);
            const isPreviousDay = isCrossMidnight && currentTime.getDate() !== dateIso.getDate();
            const slotTime = format(currentTime, "HH:mm");
            const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
            if (!allSlots.includes(prefixedSlot)) {
              allSlots.push(prefixedSlot);
            }
            currentTime = addMinutes(currentTime, intervalMinutes);
          }
          if (locationReservations?.length) {
            locationReservations.forEach(reservation => {
              const reservationStartUtc = parseISO(reservation.dateUtc);
              const reservationStartTimeUtc = formatInTimeZone(reservationStartUtc, "UTC", "HH:mm:ss");
              const isPreviousDay = reservationStartUtc.getUTCDate() !== dateIsoUTC.getUTCDate();
              const reservationStart = parse(reservationStartTimeUtc, "HH:mm:ss", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
              const slotTime = format(reservationStart, "HH:mm");
              const prefixedSlot = isPreviousDay ? `-${slotTime}` : slotTime;
              if (!allSlots.includes(prefixedSlot)) {
                allSlots.push(prefixedSlot);
              }
              slotDuration[prefixedSlot] = reservation.servicesDuration;
            });
          }
          const filteredSlots = allSlots.filter(slot => {
            if (slotDuration[slot]) {
              return true;
            }
            const isPreviousDay = slot.startsWith("-");
            const actualSlot = isPreviousDay ? slot.substring(1) : slot;
            const slotTime = parse(actualSlot, "HH:mm", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
            for (const [existingSlot, duration] of Object.entries(slotDuration)) {
              const existingIsPreviousDay = existingSlot.startsWith("-");
              const existingActualSlot = existingIsPreviousDay ? existingSlot.substring(1) : existingSlot;
              const existingSlotTime = parse(existingActualSlot, "HH:mm", existingIsPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
              const existingSlotEnd = addMinutes(existingSlotTime, duration);
              if (slotTime > existingSlotTime && slotTime < existingSlotEnd) {
                return false;
              }
            }
            return true;
          });
          const sortedSlots = filteredSlots.sort((a, b) => {
            const aTime = a.startsWith("-") ? a.substring(1) : a;
            const bTime = b.startsWith("-") ? b.substring(1) : b;
            if (!a.startsWith("-") && !b.startsWith("-")) {
              return aTime.localeCompare(bTime);
            }
            if (a.startsWith("-") && b.startsWith("-")) {
              return aTime.localeCompare(bTime);
            }
            if (a.startsWith("-") && !b.startsWith("-")) return -1;
            if (!a.startsWith("-") && b.startsWith("-")) return 1;
            return 0;
          });
          return sortedSlots.map(slot => {
            const isPreviousDay = slot.startsWith("-");
            const actualSlot = isPreviousDay ? slot.substring(1) : slot;
            const slotTime = parse(actualSlot, "HH:mm", isPreviousDay ? addMinutes(dateIso, -24 * 60) : dateIso);
            const isPauseSlot = pauses?.some(pause => {
              const pauseStartTime = parse(pause.timeFromUtc, "HH:mm:ss", dateIso);
              const pauseEndTime = parse(pause.timeToUtc, "HH:mm:ss", dateIso);
              let adjustedPauseStart = pauseStartTime;
              let adjustedPauseEnd = pauseEndTime;
              if (isPreviousDay && pauseStartTime > pauseEndTime) {
                adjustedPauseStart = addMinutes(pauseStartTime, -24 * 60);
              }
              return isWithinInterval(slotTime, {
                start: adjustedPauseStart,
                end: adjustedPauseEnd
              }) && differenceInMinutes(slotTime, adjustedPauseEnd) !== 0;
            });
            return {
              time: slot,
              isPause: !!isPauseSlot
            };
          });
        });
        const workingShiftsApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeWorkingShiftsByDays: builder.query({
              query: params => ({
                url: `locations/working-shifts-days`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType$1.SHIFT,
                id: "LIST"
              }, TagType$1.USER]
            }),
            getFeWorkerWorkingShiftsByDays: builder.query({
              query: params => ({
                url: `locations/workers/shifts-by-days`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType$1.SHIFT_BY_DAYS,
                id: "LIST"
              }, TagType$1.USER]
            }),
            setFeWorkingDayShift: builder.mutation({
              query: body => ({
                url: `locations/set-working-day-shift`,
                method: "POST",
                body
              }),
              invalidatesTags: [{
                type: TagType$1.SHIFT_BY_DAYS,
                id: "LIST"
              }, {
                type: TagType$1.SHIFT,
                id: "LIST"
              }, TagType$1.USER]
            }),
            deleteFeWorkingDayShift: builder.mutation({
              query: body => ({
                url: `locations/delete-working-day-shift`,
                method: "DELETE",
                body
              }),
              invalidatesTags: [{
                type: TagType$1.SHIFT_BY_DAYS,
                id: "LIST"
              }, {
                type: TagType$1.SHIFT,
                id: "LIST"
              }, TagType$1.USER]
            }),
            getWorkingHours: builder.query({
              query: ({
                locationSlug,
                workerId
              }) => ({
                url: `location/working-hours`,
                params: {
                  locationSlug,
                  workerId
                },
                method: "GET"
              }),
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useGetFeWorkingShiftsByDaysQuery,
          useGetFeWorkerWorkingShiftsByDaysQuery,
          useSetFeWorkingDayShiftMutation,
          useDeleteFeWorkingDayShiftMutation,
          useGetWorkingHoursQuery
        } = workingShiftsApi;
        exports({
          a3: useGetFeWorkingShiftsByDaysQuery,
          aa: useGetFeWorkerWorkingShiftsByDaysQuery,
          a5: useSetFeWorkingDayShiftMutation,
          a6: useDeleteFeWorkingDayShiftMutation,
          a4: useGetWorkingHoursQuery
        });
        const reservationApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            createFeReservation: builder.mutation({
              query: body => ({
                url: `locations/reservations/create-new`,
                method: "POST",
                body
              }),
              invalidatesTags: [{
                type: TagType$1.RESERVATION,
                id: TagId$1.LIST
              }, TagType$1.USER_NOTIFICATIONS]
            }),
            updateFeReservation: builder.mutation({
              query: ({
                clientData,
                ...body
              }) => ({
                url: `locations/reservations/update`,
                method: "PUT",
                body: {
                  ...body,
                  clientData: humpsExports.decamelizeKeys(clientData)
                }
              }),
              invalidatesTags: result => [{
                type: TagType$1.RESERVATION,
                id: TagId$1.LIST
              }, {
                type: TagType$1.RESERVATION,
                id: result?.data?.hash
              }, TagType$1.USER_NOTIFICATIONS]
            }),
            getOneFeReservation: builder.query({
              query: params => ({
                url: `locations/reservations/get-one`,
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: result => [{
                type: TagType$1.RESERVATION,
                id: result?.data?.hash
              }, TagType$1.USER]
            }),
            getFeLocationReservations: builder.query({
              query: params => ({
                url: `locations/reservations`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType$1.RESERVATION,
                id: TagId$1.LIST
              }, TagType$1.USER]
            }),
            getFeLocationClientReservations: builder.query({
              query: params => ({
                url: `locations/reservations/client`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [{
                type: TagType$1.RESERVATION,
                id: TagId$1.LIST
              }, TagType$1.USER]
            }),
            getFePromoCodeData: builder.query({
              query: params => ({
                url: `locations/promo-codes/find`,
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useCreateFeReservationMutation,
          useGetOneFeReservationQuery,
          useUpdateFeReservationMutation,
          useGetFeLocationReservationsQuery,
          useGetFeLocationClientReservationsQuery,
          useGetFePromoCodeDataQuery
        } = reservationApi;
        exports({
          g: useGetOneFeReservationQuery,
          r: useUpdateFeReservationMutation,
          ab: useGetFeLocationReservationsQuery,
          _: useGetFeLocationClientReservationsQuery
        });
        const clientApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getFeClientData: builder.query({
              query: () => ({
                url: `users/client-data`,
                method: "GET"
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType$1.CLIENT, TagType$1.USER]
            }),
            updateFeClientData: builder.mutation({
              query: body => ({
                url: `users/client`,
                method: "POST",
                body: humpsExports.decamelizeKeys(body)
              }),
              invalidatesTags: [TagType$1.CLIENT]
            }),
            getFeLocationClients: builder.query({
              query: params => ({
                url: `locations/clients`,
                method: "GET",
                params
              }),
              transformResponse: transformStandardResponseToCamelCase,
              providesTags: [TagType$1.USER]
            }),
            getUserNotifications: builder.query({
              query: params => ({
                url: `users/notifications`,
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [TagType$1.USER_NOTIFICATIONS]
            })
          })
        });
        const {
          useGetFeClientDataQuery,
          useUpdateFeClientDataMutation,
          useGetFeLocationClientsQuery,
          useGetUserNotificationsQuery
        } = clientApi;
        exports({
          o: useGetFeClientDataQuery,
          $: useUpdateFeClientDataMutation,
          n: useGetFeLocationClientsQuery,
          a0: useGetUserNotificationsQuery
        });
        const getCreateAppointmentFormFields = t => [{
          keyName: "note",
          name: "note",
          data: {
            type: FieldType.Text,
            label: t("Napomena")
          },
          gridSize: {
            size: "6"
          }
        }, {
          keyName: "promoCode",
          name: "promoCode",
          data: {
            type: FieldType.Text,
            label: t("Promo kod")
          },
          gridSize: {
            size: "6"
          }
        }];
        const pushDuplicateAndNavigate = (router, destination, referrer) => {
          const defaultReferrer = `${urlPrefix}/t/termini`;
          router.push(defaultReferrer, "forward", "push");
          router.push(defaultReferrer, "forward", "push");
          setTimeout(() => {
            router.push(destination, "root", "replace");
          }, 10);
        };
        const schema = yup.object().shape({
          note: yup.string().nullable().default(null),
          promoCode: yup.string().nullable().default(null)
        });
        function CreateReservationModal({
          onConfirm,
          onCancel,
          isOpen,
          worker,
          selectedServices,
          dateOnly,
          timeUtc,
          dateFormatted
        }, ref) {
          const {
            t
          } = useTranslation();
          const [createReservation, createReservationResponse] = useCreateFeReservationMutation();
          const {
            isOwnerOrWorker
          } = useUser();
          const initialModalBp = isOwnerOrWorker ? 0.4 : 0.5;
          const [promoCodeData, setPromoCodeData] = reactExports.useState(null);
          const [currentBreakpoint, setCurrentBreakpoint] = reactExports.useState(initialModalBp);
          const router = useIonRouter();
          const {
            push
          } = router;
          const [presentToast] = useIonToast();
          const internalModalRef = reactExports.useRef(null);
          reactExports.useImperativeHandle(ref, () => internalModalRef.current, []);
          const modalRef = internalModalRef;
          const {
            data: clientResponse
          } = useGetFeClientDataQuery(void 0, {
            skip: !!isOwnerOrWorker
          });
          const clientData = clientResponse?.data;
          const form = useFormWithSchema(schema, {
            defaultValues: {
              note: null,
              promoCode: null
            }
          });
          const formFields = getCreateAppointmentFormFields(t);
          const promoCode = form.watch("promoCode");
          const {
            data: promoCodeResponse,
            isFetching: isPromoCodeFetching,
            refetch
          } = useGetFePromoCodeDataQuery({
            locationSlug: activeLocation,
            code: promoCode ?? ""
          }, {
            skip: !promoCode?.length || !(promoCode ?? "").endsWith("#")
          });
          const duration = reactExports.useMemo(() => {
            return selectedServices?.reduce((acc, service) => acc + service.duration * (service.quantity ?? 1), 0);
          }, [selectedServices]);
          const cost = reactExports.useMemo(() => {
            return selectedServices?.reduce((acc, service) => acc + service.price * (service.quantity ?? 1), 0) || 0;
          }, [selectedServices]);
          const onSubmit = data => {
            handleConfirmReservation();
          };
          const handleConfirmReservation = () => {
            const dateUtcString = formatInTimeZone(dateOnly, "UTC", "yyyy-MM-dd") + `${timeUtc}:00`;
            createReservation({
              locationSlug: activeLocation,
              locationWorkerId: worker.id,
              dateUtc: dateUtcString,
              services: selectedServices.map(service => ({
                id: service.id,
                quantity: service.quantity ?? 1
              })),
              clientId: clientData?.id,
              promoCode: promoCodeData?.name,
              notice: form.getValues("note") ?? void 0
            });
          };
          const handleBreakpointChange = event => {
            setCurrentBreakpoint(event.detail.breakpoint);
          };
          const hasDiscount = promoCodeData?.discountValue ?? 0 > 0;
          const isDiscountInPercent = promoCodeData?.inPercent ?? false;
          const getPriceWithDiscount = () => {
            if (hasDiscount) {
              const discountPrice = isDiscountInPercent ? cost - cost * (promoCodeData?.discountValue ?? 0) / 100 : cost - (promoCodeData?.discountValue ?? 0);
              return Math.round(discountPrice / 50) * 50;
            } else {
              return cost;
            }
          };
          const isBigScreen = currentBreakpoint >= 0.8;
          const timeLocal = fromUtcHM(timeUtc);
          const footerBottomClass = reactExports.useMemo(() => {
            if (currentBreakpoint === 0.4) {
              return "bottom-[60vh]";
            } else if (currentBreakpoint === 0.5) {
              return "bottom-[50vh]";
            } else if (currentBreakpoint === 0.8) {
              return "bottom-[20vh]";
            }
            return "bottom-0";
          }, [currentBreakpoint]);
          const handleCloseModal = reactExports.useCallback(() => {
            modalRef?.current?.dismiss();
          }, [modalRef]);
          const handleInputFocus = () => {
            !isWebPlatform && modalRef?.current?.setCurrentBreakpoint(0.8);
          };
          reactExports.useEffect(() => {
            if (createReservationResponse.isSuccess && createReservationResponse.data?.success) {
              const data = createReservationResponse.data.data;
              onConfirm?.();
              onCancel();
              const destination = `${urlPrefix}/r/${data.hash}?backToHome=1`;
              pushDuplicateAndNavigate(router, destination);
            } else if (createReservationResponse.isError && createReservationResponse.error && "data" in createReservationResponse.error) {
              const errorData = createReservationResponse.error.data;
              presentToast({
                message: errorData.message,
                duration: 3e3,
                color: "danger"
              });
            }
          }, [createReservationResponse, router]);
          reactExports.useEffect(() => {
            if (promoCodeResponse?.data === null) {
              form.setValue("promoCode", "");
              presentToast({
                message: t("Promo kod nije validan"),
                duration: 3e3,
                color: "danger"
              });
            } else if (promoCodeResponse?.data) {
              setPromoCodeData(promoCodeResponse.data);
            }
          }, [promoCodeResponse]);
          reactExports.useEffect(() => {
            if (promoCode?.endsWith("#")) {
              if (promoCodeResponse?.data && promoCode === promoCodeResponse.data.name) {
                setPromoCodeData(promoCodeResponse?.data);
              } else {
                refetch();
              }
            } else {
              setPromoCodeData(null);
            }
          }, [promoCode]);
          const breakpoints = isWebPlatform ? void 0 : [0, initialModalBp, 0.8, 1];
          const initialBreakpoint = isWebPlatform ? void 0 : initialModalBp;
          const backdropBreakpoint = isWebPlatform ? void 0 : initialModalBp;
          const showBackdrop = isWebPlatform ? void 0 : false;
          const modalClassName = isWebPlatform ? void 0 : "hd-extended";
          const footerClassName = isWebPlatform ? void 0 : `fixed left-0 w-full z-[100] bg-neutral-900 ${footerBottomClass}`;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModalExtended$1, {
            name: "create-reservation-modal",
            isOpen,
            onClose: onCancel,
            breakpoints,
            showBackdrop,
            onIonBreakpointDidChange: handleBreakpointChange,
            backdropBreakpoint,
            initialBreakpoint,
            className: modalClassName,
            ref: modalRef,
            children: [createReservationResponse.isLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: true,
              message: t("Kreiranje rezervacije...")
            }), isPromoCodeFetching && /* @__PURE__ */jsxRuntimeExports.jsx(IonLoading, {
              isOpen: true,
              message: t("Provera promo koda...")
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              className: "px-1",
              color: "warning",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                className: "border",
                color: "dark",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: worker.fullName
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs("h3", {
                children: [dateFormatted, " ", timeLocal]
              }), !isOwnerOrWorker && /* @__PURE__ */jsxRuntimeExports.jsx("form", {
                onFocus: handleInputFocus,
                children: /* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                  fields: formFields,
                  form
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonGrid, {
                className: "ion-no-padding mt-2 !px-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonRow, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    size: isBigScreen ? "12" : "6",
                    className: "flex items-center justify-between",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                      condition: isBigScreen,
                      render: () => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        children: [t("Trajanje usluge"), ":"]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonBadge, {
                      className: "p-2",
                      color: "default",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: timeOutline,
                        className: "mr-1"
                      }), duration, " min"]
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCol, {
                    size: isBigScreen ? "12" : "6",
                    className: "flex items-center " + (isBigScreen ? "justify-between" : "justify-end"),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
                      condition: isBigScreen,
                      render: () => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        children: [t("Cena"), ":"]
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonBadge, {
                      color: "success",
                      className: "p-2 text-white",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                        icon: cashOutline,
                        className: "mr-1"
                      }), hasDiscount ? /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsx("s", {
                          className: "px-1 text-rose-600",
                          children: /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                            children: cost
                          })
                        }), getPriceWithDiscount()]
                      }) : cost, " ", "RSD"]
                    })]
                  })]
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              className: footerClassName,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  slot: "start",
                  color: "medium",
                  onClick: handleCloseModal,
                  className: "ml-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: closeOutline
                  }), t("Zatvori")]
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  slot: "end",
                  color: "primary",
                  onClick: form.handleSubmit(onSubmit),
                  className: "mr-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: calendarClearOutline,
                    className: "mr-1"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                    slot: "end",
                    children: t("Kreiraj rezervaciju")
                  })]
                })]
              })
            })]
          });
        }
        const CreateReservationModal$1 = reactExports.forwardRef(CreateReservationModal);
        function TimeSlotButton({
          timeUtc,
          slotDate,
          slotDateFormatted,
          workerId,
          isSelected,
          onClick
        }) {
          const isPreviousDay = timeUtc.startsWith("-");
          const actualTimeUtc = isPreviousDay ? timeUtc.substring(1) : timeUtc;
          const timeLocal = fromUtcHM(actualTimeUtc);
          ({
            date: isPreviousDay ? addDays(slotDate, -1) : slotDate
          });
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
            color: isSelected ? "success" : "dark",
            onClick,
            size: "large",
            mode: "ios",
            children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
              children: timeLocal
            })
          });
        }
        const TimeSlotButton$1 = reactExports.memo(TimeSlotButton);
        function TimeSlotsSwiper({
          slots,
          slotDate,
          slotDateFormatted,
          workerId,
          selectedSlot,
          onSlotSelect,
          shouldScrollToSlot = false,
          targetSlotTime,
          autoplay = false
        }, ref) {
          const swiperRef = reactExports.useRef(null);
          reactExports.useEffect(() => {
            if (shouldScrollToSlot && targetSlotTime && swiperRef?.current) {
              const targetIndex = slots.findIndex(slot => {
                const actualTime = slot.startsWith("-") ? slot.substring(1) : slot;
                return actualTime === targetSlotTime;
              });
              if (targetIndex !== -1) {
                swiperRef.current.swiper?.slideTo(targetIndex, 300);
              }
            }
          }, [shouldScrollToSlot, targetSlotTime, slots, swiperRef, slotDateFormatted]);
          const checkIsSameSlot = slot => {
            if (!selectedSlot) return false;
            return selectedSlot.dateFormatted === slot.dateFormatted && selectedSlot.timeUtc === slot.timeUtc && selectedSlot.workerId === slot.workerId;
          };
          reactExports.useImperativeHandle(ref, () => ({
            swiper: swiperRef.current?.swiper
          }));
          reactExports.useEffect(() => {
            if (swiperRef.current?.swiper) {
              setTimeout(() => {
                swiperRef.current?.swiper?.update();
              }, 50);
            }
          }, [slots.length]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper$1, {
            ref: swiperRef,
            spaceBetween: 10,
            slidesPerView: "auto",
            freeMode: true,
            observer: true,
            observeParents: true,
            observeSlideChildren: true,
            autoplay: autoplay ? {
              delay: 2e3,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            } : void 0,
            children: slots.map(timeUtc => {
              const isPreviousDay = timeUtc.startsWith("-");
              const actualTimeUtc = isPreviousDay ? timeUtc.substring(1) : timeUtc;
              const timeLocal = fromUtcHM(actualTimeUtc);
              const selectSlot = {
                date: isPreviousDay ? addDays(slotDate, -1) : slotDate,
                dateFormatted: slotDateFormatted,
                timeUtc: actualTimeUtc,
                timeLocal,
                workerId,
                isPreviousDay
              };
              return /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                style: {
                  width: "auto"
                },
                children: /* @__PURE__ */jsxRuntimeExports.jsx(TimeSlotButton$1, {
                  timeUtc,
                  slotDate,
                  slotDateFormatted,
                  workerId,
                  isSelected: checkIsSameSlot(selectSlot),
                  onClick: () => onSlotSelect(selectSlot)
                })
              }, timeUtc);
            })
          });
        }
        const TimeSlotsSwiper$1 = reactExports.memo(reactExports.forwardRef(TimeSlotsSwiper));
        function DaySlotsCard({
          dateFormatted,
          date,
          slots,
          workerId,
          workers,
          selectedSlot,
          onSlotSelect,
          isFirstDay = false,
          shouldScrollToSlot = false,
          targetSlotTime,
          showWorkerName = false
        }) {
          const {
            t
          } = useTranslation();
          const timeSlotsSwiperRef = reactExports.useRef(null);
          const getWorkerFullName = (workerId2, workers2) => {
            return workers2.find(worker => worker.id === workerId2)?.fullName + ": ";
          };
          const [isBeginning, setIsBeginning] = reactExports.useState(true);
          const [isEnd, setIsEnd] = reactExports.useState(false);
          const [showControls, setShowControls] = reactExports.useState(true);
          reactExports.useEffect(() => {
            const swiper = timeSlotsSwiperRef.current?.swiper;
            if (swiper) {
              const updateControls = () => {
                const isBeginningValue = swiper.isBeginning ?? false;
                const isEndValue = swiper.isEnd ?? false;
                setIsBeginning(isBeginningValue);
                setIsEnd(isEndValue);
              };
              updateControls();
              swiper.on("slideChange", updateControls);
              swiper.on("update", updateControls);
              return () => {
                swiper.off("slideChange", updateControls);
                swiper.off("update", updateControls);
              };
            }
          }, [slots.length]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              className: "ion-no-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex items-center justify-between",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  slot: "start",
                  fill: "clear",
                  color: "medium",
                  size: "small",
                  disabled: isBeginning,
                  onClick: () => timeSlotsSwiperRef.current?.swiper?.slidePrev(),
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronBackOutline
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                  className: "text-xl",
                  children: [showWorkerName && getWorkerFullName(workerId, workers), dateFormatted]
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  disabled: isEnd,
                  onClick: () => timeSlotsSwiperRef.current?.swiper?.slideNext(),
                  fill: "clear",
                  color: "medium",
                  size: "small",
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: chevronForwardOutline
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              children: [slots.length === 0 && /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                children: t("Nema slobodnih termina")
              }), /* @__PURE__ */jsxRuntimeExports.jsx(TimeSlotsSwiper$1, {
                ref: timeSlotsSwiperRef,
                slots,
                slotDate: date,
                slotDateFormatted: dateFormatted,
                workerId,
                selectedSlot,
                onSlotSelect,
                shouldScrollToSlot,
                targetSlotTime,
                autoplay: false
              })]
            }), showControls && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "w-full flex justify-between"
            })]
          });
        }
        const DaySlotsCard$1 = reactExports.memo(DaySlotsCard);
        function SelectDateTimeStep({
          locationWorker,
          selectedGroupServices,
          onBack,
          selectedSlot,
          selectedDate,
          onClearQueryParams
        }) {
          const {
            t
          } = useTranslation();
          const [selectedSlotState, setSelectedSlotState] = reactExports.useState(null);
          const createReservationModalRef = reactExports.useRef(null);
          const {
            wrapUserLoginModal,
            isOwnerOrWorker
          } = useUser();
          const {
            data: workersWorkingShiftsByDaysResult,
            isFetching: isWorkersWorkingShiftsFetching
          } = useGetFeWorkerWorkingShiftsByDaysQuery({
            locationSlug: activeLocation,
            workerId: locationWorker?.id
          });
          const {
            data: workersResult
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const {
            data: locationReservations,
            isLoading: isReservationsLoading
          } = useGetFeLocationReservationsQuery({
            locationSlug: activeLocation
          });
          const reservations = locationReservations?.data ?? [];
          const services = reactExports.useMemo(() => {
            return selectedGroupServices.filter(groupService => groupService.services?.length).map(group => group.services).flat();
          }, [selectedGroupServices]);
          const servicesDuration = reactExports.useMemo(() => {
            return services.reduce((acc, service) => {
              return acc + service.duration * (service.quantity ?? 1);
            }, 0);
          }, [services]);
          const workersReservationByDate = reactExports.useMemo(() =>
          // transform reservations to object with date as key
          locationReservations?.data.reduce((acc, reservation) => {
            const parsedDate = parseISO(reservation.dateUtc);
            const date = formatInTimeZone(parsedDate, getAppTimezone(), "yyyy-MM-dd");
            const workerId = reservation.locationWorkerId;
            if (!acc[workerId]) {
              acc[workerId] = {};
            }
            if (!acc[workerId][date]) {
              acc[workerId][date] = [];
            }
            acc[workerId][date].push(reservation);
            return acc;
          }, {}), [locationReservations]);
          const timeSlots = reactExports.useMemo(() => {
            if (!workersWorkingShiftsByDaysResult?.data || !workersResult?.data) {
              return void 0;
            }
            const slotsByDay = [];
            workersWorkingShiftsByDaysResult.data.forEach(shift => {
              const {
                date,
                dateFormatted: realDateFormatted
              } = parseUtcDate(shift.dateUtc, getAppTimezone());
              const utcDate = parseISO(shift.dateUtc);
              slotsByDay.push({
                workerId: shift.locationWorkerId,
                date: utcDate,
                dateFormatted: t(`weeks.${format(date, "EEEE")}`) + ", " + format(date, "dd.MM."),
                slots: generateTimeSlots(shift.dateUtc, shift.timeFromUtc, shift.timeToUtc, reservationTimeInterval, roundedSlotInterval, workersReservationByDate?.[shift.locationWorkerId]?.[realDateFormatted] ?? [], servicesDuration, isOwnerOrWorker ? 0 : 180, shift.pausesUtc)
              });
            });
            return slotsByDay.sort((a, b) => a.date.getTime() - b.date.getTime());
          }, [workersWorkingShiftsByDaysResult, workersResult, servicesDuration, reservations]);
          const autoSelectedSlot = reactExports.useMemo(() => {
            if (selectedSlot && selectedDate && timeSlots && !selectedSlotState) {
              const matchingSlot = timeSlots.find(slot => slot.dateFormatted.includes(selectedDate) || format(slot.date, "yyyy-MM-dd") === selectedDate);
              if (matchingSlot) {
                const matchingTimeSlot = matchingSlot.slots.find(timeSlot => timeSlot === selectedSlot || timeSlot.substring(1) === selectedSlot);
                if (matchingTimeSlot) {
                  const isPreviousDay = matchingTimeSlot.startsWith("-");
                  const actualTimeUtc = isPreviousDay ? matchingTimeSlot.substring(1) : matchingTimeSlot;
                  const timeLocal = fromUtcHM(actualTimeUtc);
                  return {
                    date: isPreviousDay ? addDays(matchingSlot.date, -1) : matchingSlot.date,
                    dateFormatted: matchingSlot.dateFormatted,
                    timeUtc: actualTimeUtc,
                    timeLocal,
                    workerId: matchingSlot.workerId,
                    isPreviousDay
                  };
                }
              }
            }
            return null;
          }, [selectedSlot, selectedDate, timeSlots, selectedSlotState]);
          const shouldShowNotification = reactExports.useMemo(() => selectedSlot && selectedDate && !autoSelectedSlot, [selectedSlot, selectedDate, autoSelectedSlot]);
          reactExports.useEffect(() => {
            if (autoSelectedSlot) {
              onClearQueryParams();
              setSelectedSlotState(autoSelectedSlot);
            }
          }, [autoSelectedSlot, onClearQueryParams]);
          const getWorkerDataByWorkerId = workerId => locationWorker ?? workersResult?.data?.find(worker => worker.id === workerId) ?? void 0;
          const timeSlotsLoading = isWorkersWorkingShiftsFetching ? true : timeSlots?.length ? false : void 0;
          const allSelectedServices = reactExports.useMemo(() => selectedGroupServices.filter(groupService => groupService.services?.length).map(group => group.services).flat(), [selectedGroupServices]);
          const checkIsSameSlot = reactExports.useCallback(slot => {
            if (!selectedSlotState) return false;
            return selectedSlotState.dateFormatted === slot.dateFormatted && selectedSlotState.timeUtc === slot.timeUtc && selectedSlotState.workerId === slot.workerId;
          }, [selectedSlotState]);
          const handleCloseSlotModal = reactExports.useCallback(() => {
            setSelectedSlotState(null);
          }, []);
          const handleSelectSlot = reactExports.useCallback(slot => {
            if (!slot || checkIsSameSlot(slot)) {
              createReservationModalRef?.current?.dismiss();
              return;
            }
            setSelectedSlotState(slot);
          }, [createReservationModalRef, checkIsSameSlot]);
          const handleSelectSlotWithAuth = reactExports.useCallback(slot => {
            return wrapUserLoginModal(() => handleSelectSlot(slot))?.();
          }, [wrapUserLoginModal, handleSelectSlot]);
          const wrapperClassName = selectedSlotState && !isWebPlatform ? "mb-[50vh]" : "";
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: `${wrapperClassName} min-h-[50vh]`,
              children: [timeSlotsLoading === void 0 ? /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Nema slobodnih termina")
                })
              }) : timeSlotsLoading && /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {}), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "pb-24",
                children: timeSlots?.map((slot, index) => {
                  const isSelectedDate = selectedDate && (slot.dateFormatted.includes(selectedDate) || format(slot.date, "yyyy-MM-dd") === selectedDate);
                  return /* @__PURE__ */jsxRuntimeExports.jsx(DaySlotsCard$1, {
                    dateFormatted: slot.dateFormatted,
                    date: slot.date,
                    slots: slot.slots,
                    workerId: slot.workerId,
                    workers: workersResult?.data || [],
                    selectedSlot: selectedSlotState,
                    onSlotSelect: handleSelectSlotWithAuth,
                    shouldScrollToSlot: !!selectedSlot && !!isSelectedDate,
                    targetSlotTime: selectedSlot,
                    showWorkerName: !locationWorker
                  }, slot.dateFormatted + index);
                })
              }, servicesDuration)]
            }), selectedSlotState && /* @__PURE__ */jsxRuntimeExports.jsx(CreateReservationModal$1, {
              ref: createReservationModalRef,
              isOpen: !!selectedSlotState,
              onCancel: handleCloseSlotModal,
              dateOnly: selectedSlotState.date,
              timeUtc: selectedSlotState.timeUtc,
              worker: getWorkerDataByWorkerId(selectedSlotState.workerId),
              dateFormatted: selectedSlotState.dateFormatted,
              selectedServices: allSelectedServices
            }), /* @__PURE__ */jsxRuntimeExports.jsx(NotificationToast, {
              message: t("Izabrani slot nije slobodan"),
              type: "error",
              duration: 5e3,
              position: "top",
              isOpen: !!shouldShowNotification,
              onDidDismiss: () => {},
              cssClass: "animate-pulse"
            })]
          });
        }
        const SelectDateTimeStep$1 = reactExports.memo(SelectDateTimeStep);
        const maxStep = 2;
        function CreateAppointmentSteps({
          appointment
        }) {
          const {
            t
          } = useTranslation();
          const location = useLocation();
          const history = useHistory();
          const {
            wrapUserLoginModal
          } = useUser();
          const {
            delete: deleteQueryParam,
            data: queryParams
          } = useQueryParamsHook({});
          const formRef = reactExports.useRef(null);
          const queryWorkerId = queryParams["worker"] ? parseInt(queryParams["worker"]) : void 0;
          const querySlot = queryParams["slot"];
          const queryDate = queryParams["date"];
          const [activeStep, setActiveStep] = reactExports.useState(parseInt(queryParams["step"] ?? "0"));
          const [hasMultiplePersons, setHasMultiplePersons] = reactExports.useState(false);
          const contentRefFunctions = useContentRefFunctions();
          const {
            data: workersResult,
            isLoading: workersLoading
          } = useGetFeWorkersQuery({
            locationSlug: activeLocation
          });
          const workers = workersResult?.data || [];
          const activeWorkers = workers.filter(worker => worker.active);
          const [selectedWorker, setSelectedWorker] = reactExports.useState();
          const [groupsSelectedServices, setGroupsSelectedServices] = reactExports.useState([]);
          const {
            data: serviceGroupsResult,
            isLoading: serviceGroupsLoading,
            isFetching: serviceGroupsFetching
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation,
            withWorkers: 1
            // Always load workers data
          });
          const serviceGroups = serviceGroupsResult?.data;
          const landedDirectlyOnStep1 = reactExports.useRef(false);
          reactExports.useEffect(() => {
            if (queryParams["step"] === "1" && history.length <= 2) {
              landedDirectlyOnStep1.current = true;
            }
          }, []);
          const canGoToStep = step => {
            if (step === 2 && groupsSelectedServices.length === 0) return false;
            return true;
          };
          const handleSetStep = (step, replace = false) => {
            if (!canGoToStep(step)) return;
            const params = new URLSearchParams(location.search);
            const currentStepFromUrl = parseInt(params.get("step") ?? "0", 10);
            params.set("step", step.toString());
            if (replace || currentStepFromUrl === step && activeStep === void 0) {
              history.replace({
                search: params.toString()
              });
            } else if (activeStep && activeStep > step) {
              history.goBack();
            } else if (activeStep === 2 && step === 1) {
              history.replace({
                search: params.toString()
              });
            } else {
              history.push({
                search: params.toString()
              });
            }
            setActiveStep(step);
            formRef.current?.handleSetStep(step);
            contentRefFunctions?.scrollToTop(50);
          };
          const handleNextStep = () => {
            if (activeStep !== void 0 && activeStep < maxStep) {
              handleSetStep(activeStep + 1);
            }
          };
          const handleBackStep = () => {
            if (activeStep === 1 && landedDirectlyOnStep1.current) {
              history.goBack();
            } else if (activeStep !== void 0 && activeStep > 0) {
              handleSetStep(activeStep - 1);
            }
          };
          const handleSelectWorker = worker => {
            setSelectedWorker(worker);
            if (activeStep === 0) {
              handleSetStep(1);
            }
          };
          const handleSelectService = (serviceGroup, service) => {
            setGroupsSelectedServices(prev => {
              const index = prev.findIndex(item => item.serviceGroup.id === serviceGroup.id);
              if (index > -1) {
                const group = prev[index].serviceGroup;
                const services = prev[index].services;
                if (services) {
                  const serviceIndex = services.findIndex(item => item.id === service.id);
                  if (serviceIndex > -1) {
                    services.splice(serviceIndex, 1);
                  } else if (group.inputType !== InputType.checkbox && !hasMultiplePersons) {
                    services.splice(0, services.length);
                    services.push(service);
                  } else {
                    services.push(service);
                  }
                  if (services.length === 0) {
                    prev.splice(index, 1);
                  }
                }
              } else {
                prev.push({
                  serviceGroup,
                  services: [service]
                });
              }
              return [...prev];
            });
          };
          const handleHasMultiplePersons = has => {
            setHasMultiplePersons(has);
            setGroupsSelectedServices([]);
          };
          const pickDateTimeEnabled = (activeStep ?? 0) >= 2 && groupsSelectedServices.length > 0 ? true : void 0;
          const allSelectedServices = reactExports.useMemo(() => groupsSelectedServices.filter(groupService => groupService.services?.length).map(group => group.services).flat(), [groupsSelectedServices]);
          const getBadgeQuantityOfServices = service => service.quantity && service.quantity > 1 ? `x${service.quantity}` : "";
          const handleClearQueryParams = reactExports.useCallback(() => {
            if (querySlot && queryDate) {
              deleteQueryParam(["slot", "date"]);
            }
          }, [deleteQueryParam, querySlot, queryDate]);
          reactExports.useEffect(() => {
            wrapUserLoginModal()?.();
          }, []);
          reactExports.useEffect(() => {
            if (activeWorkers.length === 1 && !selectedWorker && activeStep === 0) {
              const singleWorker = activeWorkers[0];
              setSelectedWorker(singleWorker);
              const params = new URLSearchParams(location.search);
              const stepFromUrl = parseInt(params.get("step") ?? "0", 10);
              handleSetStep(1, stepFromUrl === 0);
            }
          }, [activeWorkers, selectedWorker, activeStep]);
          reactExports.useEffect(() => {
            if (activeStep === 2 && groupsSelectedServices.length === 0) {
              const params = new URLSearchParams(location.search);
              params.set("step", "1");
              history.replace({
                search: params.toString()
              });
              setActiveStep(1);
            }
          }, [activeStep, selectedWorker, groupsSelectedServices]);
          reactExports.useEffect(() => {
            const params = new URLSearchParams(location.search);
            const stepFromUrl = parseInt(params.get("step") ?? "0", 10);
            setActiveStep(stepFromUrl);
            formRef.current?.handleSetStep(stepFromUrl);
          }, [location.search]);
          if ((serviceGroupsLoading || serviceGroupsFetching || workersLoading) && activeStep) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
              name: "crescent"
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
              condition: activeStep === 2,
              render: () => /* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
                className: "sticky top-0 pt-1",
                color: "dark",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
                  className: "px-2",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(SwiperWrapper$1, {
                    spaceBetween: 10,
                    slidesPerView: "auto",
                    freeMode: true,
                    children: allSelectedServices?.map(service => /* @__PURE__ */jsxRuntimeExports.jsx(SwiperSlide, {
                      style: {
                        width: "auto"
                      },
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                        className: "p-2 text-black",
                        color: "warning",
                        children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                          children: [service.title, " ", getBadgeQuantityOfServices(service)]
                        })
                      })
                    }, service.id))
                  })
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(FormStepper$1, {
              className: "mt-2 max-w-[1200px] overflow-y-scroll",
              ref: formRef,
              minStep: 0,
              swiperProps: {
                onSlideChangeTransitionEnd: () => {
                  contentRefFunctions?.scrollToTop(50);
                }
              },
              renderSteps: () => [/* @__PURE__ */jsxRuntimeExports.jsx(SelectWorkerStep, {
                selectedWorker,
                setSelectedWorker: handleSelectWorker,
                workerId: selectedWorker ? void 0 : queryWorkerId,
                activeWorkersCount: activeWorkers.length
              }), serviceGroups && !serviceGroupsLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(SelectAppointmentStep, {
                onBack: handleBackStep,
                onNext: handleNextStep,
                selectedWorker,
                serviceGroups,
                groupsSelectedServices,
                onSelectService: handleSelectService,
                hasMultiplePersons,
                setHasMultiplePersons: handleHasMultiplePersons
              }) : void 0, pickDateTimeEnabled && /* @__PURE__ */jsxRuntimeExports.jsx(SelectDateTimeStep$1, {
                locationWorker: selectedWorker,
                selectedGroupServices: groupsSelectedServices,
                onBack: handleBackStep,
                selectedSlot: querySlot,
                selectedDate: queryDate,
                onClearQueryParams: handleClearQueryParams
              })],
              initialStep: activeStep ?? 0,
              onCurrentStepChange: setActiveStep
            }), !!activeStep && /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              className: "ion-no-border fixed bottom-2 left-0 right-0",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                className: "px-2 h-[76px]",
                color: "translucent",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: handleBackStep,
                  slot: "start",
                  color: "light",
                  size: "large",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: arrowBack
                  }), t("Nazad")]
                }), activeStep === 1 && /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  onClick: handleNextStep,
                  slot: "end",
                  color: "dark",
                  size: "large",
                  disabled: !groupsSelectedServices.length,
                  children: [t("Dalje"), /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: arrowForward
                  })]
                })]
              })
            })]
          });
        }
        function CreateAppointmentPage() {
          const {
            t
          } = useTranslation();
          const [key, setKey] = reactExports.useState("appointment");
          const {
            userData
          } = useUser();
          const router = useIonRouter();
          const dispatch = useAppDispatch();
          const deviceData = useAppSelector(getDeviceData);
          const location = useLocation();
          const [backButtonUrl, setBackButtonUrl] = reactExports.useState(void 0);
          const initialStep = reactExports.useRef(0);
          const [useCustomBackHandler, setUseCustomBackHandler] = reactExports.useState(false);
          useIonViewDidLeave(() => {
            setTimeout(() => {
              setKey(prev => prev + "-new");
            }, 1e3);
          });
          reactExports.useEffect(() => {
            const params = new URLSearchParams(location.search);
            const step = parseInt(params.get("step") ?? "0", 10);
            initialStep.current = step;
            if (step === 0 || step === 1) {
              setBackButtonUrl(void 0);
              setUseCustomBackHandler(false);
            } else {
              setBackButtonUrl(void 0);
              setUseCustomBackHandler(true);
            }
          }, []);
          reactExports.useEffect(() => {
            const params = new URLSearchParams(location.search);
            const step = parseInt(params.get("step") ?? "0", 10);
            if (step !== initialStep.current && step >= 2) {
              setBackButtonUrl(void 0);
              setUseCustomBackHandler(true);
            } else if (step === 0 || step === 1) {
              setBackButtonUrl(void 0);
              setUseCustomBackHandler(false);
            }
          }, [location.search]);
          const handleBackClick = () => {
            const destination = `${urlPrefix}/t/termini`;
            pushDuplicateAndNavigate(router, destination);
          };
          reactExports.useEffect(() => {
            if (!deviceData.notificationsEnabled && userData) {
              dispatch(setDeviceData({
                notificationsEnabled: true
              }));
            }
          }, [deviceData, userData]);
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Nov termin"),
            hasBackButton: true,
            backButtonIcon: exitOutline,
            backButtonUrl,
            onBackClick: useCustomBackHandler ? handleBackClick : void 0,
            hasRefresher: false,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(CreateAppointmentSteps, {}, key)
          });
        }
        const ConfirmReservationPage = reactExports.lazy(() => __vitePreload(() => module.import('./ConfirmReservationPage-legacy-E8ollrk-.js'), false              ? __VITE_PRELOAD__ : void 0));
        const ConfirmReservationPageWrapper = props => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
            fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
              className: "flex mx-auto mt-5"
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ConfirmReservationPage, {
              ...props
            })
          });
        };
        const PublicProfilePage = reactExports.lazy(() => __vitePreload(() => module.import('./PublicProfilePage-legacy-i0b_Qe0z.js'), false              ? __VITE_PRELOAD__ : void 0));
        function PublicProfilePageWrapper() {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Profil klijenta"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(PublicProfilePage, {})
          });
        }
        const NewsListPage = reactExports.lazy(() => __vitePreload(() => module.import('./NewsListPage-legacy-D4wkG4_l.js'), false              ? __VITE_PRELOAD__ : void 0));
        const NewsListPageWrapper = () => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
            fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
              className: "flex mx-auto mt-5"
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NewsListPage, {})
          });
        };
        const NewsCreatePage = reactExports.lazy(() => __vitePreload(() => module.import('./NewsCreatePage-legacy-DKy_MOi6.js'), false              ? __VITE_PRELOAD__ : void 0));
        const NewsCreatePageWrapper = () => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
            fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
              className: "flex mx-auto mt-5"
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NewsCreatePage, {})
          });
        };
        const NewsEditPage = reactExports.lazy(() => __vitePreload(() => module.import('./NewsEditPage-legacy-jfhTiaEc.js'), false              ? __VITE_PRELOAD__ : void 0));
        const NewsEditPageWrapper = () => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
            fallback: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
              className: "flex mx-auto mt-5"
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NewsEditPage, {})
          });
        };
        const LocationWorkingTimePage = reactExports.lazy(() => __vitePreload(() => module.import('./LocationWorkingTimePage-legacy-DfSd0xxs.js'), false              ? __VITE_PRELOAD__ : void 0));
        function LocationWorkingTimePageWrapper() {
          const {
            t
          } = useTranslation();
          const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Radno vreme"),
            hasBackButton: true,
            footer: /* @__PURE__ */jsxRuntimeExports.jsx(IonToolbar, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "p-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                  expand: "block",
                  onClick: () => setIsModalOpen(true),
                  className: "flex items-center gap-1",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: addOutline
                  }), t("Dodaj radno vreme")]
                })
              })
            }),
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationWorkingTimePage, {
              isModalOpen,
              setIsModalOpen
            })
          });
        }
        const LocationEditPage = reactExports.lazy(() => __vitePreload(() => module.import('./LocationEditPage-legacy-BkWeZ040.js'), false              ? __VITE_PRELOAD__ : void 0));
        function LocationEditDataPageWrapper() {
          const {
            t
          } = useTranslation();
          const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-left",
              children: t("Izmeni podatke lokacije")
            }),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationEditPage, {
              isModalOpen,
              setIsModalOpen
            })
          });
        }
        const LocationWorkersPage = reactExports.lazy(() => __vitePreload(() => module.import('./LocationWorkersPage-legacy-OVvrbGEC.js'), false              ? __VITE_PRELOAD__ : void 0));
        function LocationWorkersPageWrapper() {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Radnici"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationWorkersPage, {
              locationSlug: activeLocation,
              onCreate: () => history.push(`/zakazivanje/podesavanja/radnici/novi`),
              onEdit: worker => history.push(`/zakazivanje/podesavanja/radnici/edit/${worker.id}`)
            })
          });
        }
        const LocationSettingsPage = reactExports.lazy(() => __vitePreload(() => module.import('./LocationSettingsPage-legacy-CW3PFDVW.js'), false              ? __VITE_PRELOAD__ : void 0));
        function LocationSettingsPageWrapper() {
          const {
            t
          } = useTranslation();
          const [isModalOpen, setIsModalOpen] = reactExports.useState(false);
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Podešavanja lokacije"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationSettingsPage, {
              isModalOpen,
              setIsModalOpen
            })
          });
        }
        const ServicesPage = reactExports.lazy(() => __vitePreload(() => module.import('./ServicesPage-legacy-DFOgFGHo.js'), false              ? __VITE_PRELOAD__ : void 0));
        function ServicesPageWrapper() {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Usluge"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ServicesPage, {})
          });
        }
        const ServiceGroupEditPage = reactExports.lazy(() => __vitePreload(() => module.import('./ServiceGroupEditPage-legacy-vKVIg-3X.js'), false              ? __VITE_PRELOAD__ : void 0));
        function ServiceGroupEditPageWrapper() {
          const {
            t
          } = useTranslation();
          const {
            serviceGroupId
          } = useParams();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Uredi grupu usluga"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupEditPage, {
              serviceGroupId: parseInt(serviceGroupId)
            })
          });
        }
        const ServiceEditPage = reactExports.lazy(() => __vitePreload(() => module.import('./ServiceEditPage-legacy-CeZ2__1j.js'), false              ? __VITE_PRELOAD__ : void 0));
        function ServiceEditPageWrapper() {
          const {
            t
          } = useTranslation();
          const {
            serviceId
          } = useParams();
          const {
            data: serviceGroupsResponse,
            isLoading,
            error
          } = useGetFeServiceGroupsQuery({
            locationSlug: activeLocation
          });
          const serviceGroups = serviceGroupsResponse?.data || [];
          const service = serviceGroups.flatMap(sg => sg.services).find(s => s.id === parseInt(serviceId));
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
              headerClasses: mainHeaderClasses,
              title: t("Učitavanje..."),
              hasBackButton: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "ion-text-center ion-padding",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  name: "crescent"
                }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  children: t("Učitavanje...")
                })]
              })
            });
          }
          if (error || !service) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
              headerClasses: mainHeaderClasses,
              title: t("Greška"),
              hasBackButton: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-text-center ion-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "danger",
                  children: t("Greška pri učitavanju usluge")
                })
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: service.title,
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceEditPage, {
              service
            })
          });
        }
        const serviceGroupEditApi = rzrApi.injectEndpoints({
          endpoints: build => ({
            updateServiceGroup: build.mutation({
              query: data => ({
                url: "locations/service-groups/update",
                method: "PUT",
                body: humpsExports.decamelizeKeys(data)
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.SERVICES_GROUPS]
            }),
            createServiceGroup: build.mutation({
              query: ({
                locationSlug,
                ...data
              }) => ({
                url: "locations/service-groups/create",
                method: "POST",
                body: {
                  ...humpsExports.decamelizeKeys(data),
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.SERVICES_GROUPS]
            }),
            deleteServiceGroup: build.mutation({
              query: id => ({
                url: `locations/service-groups/delete/${id}`,
                method: "DELETE"
              }),
              invalidatesTags: [TagType$1.SERVICES_GROUPS]
            })
          })
        });
        const {
          useUpdateServiceGroupMutation,
          useCreateServiceGroupMutation,
          useDeleteServiceGroupMutation
        } = serviceGroupEditApi;
        exports({
          Q: useUpdateServiceGroupMutation,
          H: useCreateServiceGroupMutation
        });
        const serviceGroupEditFormSchema = exports("K", create$3().shape({
          title: create$6().required(t("Naslov je obavezan")),
          slug: create$6().required(t("Slug je obavezan")),
          description: create$6().nullable().defined(),
          active: create$7().defined(),
          type: create$5().required(t("Tip je obavezan")),
          required: create$7().defined(),
          minSelected: create$5().nullable().transform(value => isNaN(value) ? void 0 : value).defined(t("Minimalno izabrano je obavezno")),
          maxSelected: create$5().nullable().transform(value => isNaN(value) ? void 0 : value).defined(t("Maksimalno izabrano je obavezno"))
        }));
        const getServiceGroupEditFormFields = exports("J", serviceGroupId => {
          const {
            isAdmin
          } = useUser();
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov"),
              translation: serviceGroupId ? {
                type: "service_group",
                fieldName: "title",
                dataId: serviceGroupId
              } : void 0
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug")
            },
            disabled: !isAdmin
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.TextArea,
              label: t("Opis"),
              translation: serviceGroupId ? {
                type: "service_group",
                fieldName: "description",
                dataId: serviceGroupId
              } : void 0
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivno")
            },
            disabled: !isAdmin
          }, {
            keyName: "type",
            name: "type",
            data: {
              type: FieldType.Select,
              label: t("Tip"),
              options: [{
                value: "0",
                text: t("Salon")
              }, {
                value: "1",
                text: t("Restoran")
              }]
            }
          }, {
            keyName: "required",
            name: "required",
            data: {
              type: FieldType.Switch,
              label: t("Obavezno")
            }
          }, {
            keyName: "minSelected",
            name: "minSelected",
            data: {
              type: FieldType.Number,
              label: t("Minimalno izabrano")
            }
          }, {
            keyName: "maxSelected",
            name: "maxSelected",
            data: {
              type: FieldType.Number,
              label: t("Maksimalno izabrano")
            }
          }];
        });
        function ServiceGroupEditForm({
          serviceGroup,
          onSubmit,
          isLoading: externalLoading
        }) {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceGroupEditFormSchema, {
            defaultValues: {
              title: serviceGroup?.title,
              slug: serviceGroup?.slug,
              description: serviceGroup?.description || null,
              active: serviceGroup?.active ?? true,
              type: typeof serviceGroup?.type === "string" ? parseInt(serviceGroup.type) : serviceGroup?.type || 0,
              required: serviceGroup?.required ?? false,
              minSelected: serviceGroup?.minSelected ?? null,
              maxSelected: serviceGroup?.maxSelected ?? null
            }
          });
          const title = form.watch("title");
          React.useEffect(() => {
            if (title) {
              const generated = generateSlug(title);
              form.setValue("slug", generated);
            }
          }, [title]);
          const [deleteServiceGroup, deleteResponse] = useDeleteServiceGroupMutation();
          const router = useIonRouter();
          useShowNotification({
            message: t("Podaci su uspešno sačuvani"),
            color: "success"
          });
          useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
          const formFields = getServiceGroupEditFormFields(serviceGroup?.id);
          const handleSubmit = data => {
            if (onSubmit) {
              onSubmit(data);
            }
          };
          const handleDelete = async () => {
            setShowDeleteAlert(true);
          };
          const confirmDelete = async () => {
            if (serviceGroup?.id) {
              await deleteServiceGroup(serviceGroup.id);
              router.goBack();
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: form.handleSubmit(handleSubmit),
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-padding-top flex gap-2",
              children: [serviceGroup?.id && /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  type: "button",
                  size: "small",
                  color: "danger",
                  onClick: handleDelete,
                  disabled: deleteResponse.isLoading,
                  fill: "clear",
                  style: {
                    minWidth: 0
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: trashOutline,
                    slot: "icon-only"
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonAlertConfirmation, {
                  isOpen: showDeleteAlert,
                  header: t("Obriši grupu?"),
                  message: t("Da li ste sigurni da želite da obrišete ovu grupu?"),
                  confirmAction: confirmDelete,
                  cancelAction: () => setShowDeleteAlert(false),
                  onDidDismiss: () => setShowDeleteAlert(false),
                  confirmTextKey: "Da",
                  cancelTextKey: "Ne",
                  confirmCssClass: "danger"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                type: "submit",
                expand: "block",
                disabled: externalLoading,
                color: "success",
                className: "flex-1",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: saveOutline,
                  slot: "start"
                }), externalLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  name: "crescent"
                }) : t("Sačuvaj podatke")]
              })]
            }), externalLoading && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding-top",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                color: "medium",
                children: t("Čuvanje podataka...")
              })
            })]
          });
        }
        function ServiceGroupCreatePage() {
          const {
            t
          } = useTranslation();
          const [createServiceGroup, createResponse] = useCreateServiceGroupMutation();
          const router = useIonRouter();
          const handleSubmit = data => {
            createServiceGroup({
              ...data,
              locationSlug: activeLocation
            }).then(response => {
              if ("data" in response) {
                router.goBack();
              }
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupEditForm, {
            serviceGroup: null,
            onSubmit: handleSubmit,
            isLoading: createResponse.isLoading
          });
        }
        function ServiceGroupCreatePageWrapper() {
          const {
            t
          } = useTranslation();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Nova grupa usluga"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceGroupCreatePage, {})
          });
        }
        const serviceEditApi = rzrApi.injectEndpoints({
          endpoints: build => ({
            updateService: build.mutation({
              query: data => ({
                url: "locations/services/update",
                method: "PUT",
                body: humpsExports.decamelizeKeys(data)
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.SERVICES_GROUPS, TagType$1.SERVICES]
            }),
            createService: build.mutation({
              query: data => ({
                url: "locations/services/create",
                method: "POST",
                body: humpsExports.decamelizeKeys(data)
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.SERVICES_GROUPS, TagType$1.SERVICES]
            }),
            deleteService: build.mutation({
              query: id => ({
                url: `locations/services/delete/${id}`,
                method: "DELETE"
              }),
              invalidatesTags: [TagType$1.SERVICES_GROUPS, TagType$1.SERVICES]
            })
          })
        });
        const {
          useUpdateServiceMutation,
          useCreateServiceMutation,
          useDeleteServiceMutation
        } = serviceEditApi;
        exports("R", useUpdateServiceMutation);
        const serviceEditFormSchema = create$3().shape({
          groupId: create$5().required("Grupa je obavezna"),
          title: create$6().required("Naslov je obavezan"),
          description: create$6().required().nullable(),
          slug: create$6().required("Slug je obavezan"),
          active: create$7().required(),
          duration: create$5().nullable().transform(value => isNaN(value) ? void 0 : value).defined("Trajanje je obavezno"),
          price: create$5().nullable().transform(value => isNaN(value) ? void 0 : value).defined("Cena je obavezna"),
          currency: create$5().required("Valuta je obavezna"),
          changeRequest: create$3({
            isEnabled: create$7().required(),
            scheduledDateUtc: create$6().nullable().required()
          }).nullable()
        });
        const getServiceEditFormFields = serviceId => {
          const {
            isAdmin
          } = useUser();
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov"),
              translation: serviceId ? {
                type: "service",
                fieldName: "title",
                dataId: serviceId
              } : void 0
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.TextArea,
              label: t("Opis"),
              translation: serviceId ? {
                type: "service",
                fieldName: "description",
                dataId: serviceId
              } : void 0
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug")
            },
            disabled: !isAdmin,
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivno")
            },
            disabled: !isAdmin,
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "duration",
            name: "duration",
            data: {
              type: FieldType.Number,
              label: t("Trajanje (minuti)")
            }
          }, {
            keyName: "price",
            name: "price",
            data: {
              type: FieldType.Number,
              label: t("Cena")
            }
          }, {
            keyName: "currency",
            name: "currency",
            data: {
              type: FieldType.Select,
              label: t("Valuta"),
              options: [{
                value: "0",
                text: "RSD"
              }, {
                value: "1",
                text: "EUR"
              }]
            }
          }, {
            keyName: "changeRequest",
            name: "changeRequest",
            data: {
              type: FieldType.ChangeRequest,
              label: t("Planirane promene"),
              entityId: serviceId,
              entityType: "service"
            },
            visible: !!serviceId,
            // Only show for existing services
            gridSize: {
              size: "12"
            }
          }];
        };
        function ServiceEditForm({
          service,
          onSubmit,
          isLoading: externalLoading
        }) {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(serviceEditFormSchema, {
            defaultValues: {
              groupId: service?.groupId,
              title: service?.title,
              description: service?.description ?? null,
              slug: service?.slug,
              active: service?.active ?? true,
              duration: service?.duration,
              price: service?.price,
              currency: service?.currency ?? 0,
              changeRequest: null
            }
          });
          const title = form.watch("title");
          React.useEffect(() => {
            if (title) {
              const generated = generateSlug(title);
              form.setValue("slug", generated);
            }
          }, [title]);
          const [deleteService, deleteResponse] = useDeleteServiceMutation();
          const router = useIonRouter();
          useShowNotification({
            message: t("Podaci su uspešno sačuvani"),
            color: "success"
          });
          useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const [showDeleteAlert, setShowDeleteAlert] = React.useState(false);
          const formFields = getServiceEditFormFields(service?.id);
          const handleSubmit = data => {
            console.log(data);
            if (onSubmit) {
              onSubmit(data);
            }
          };
          const handleDelete = async () => {
            setShowDeleteAlert(true);
          };
          const confirmDelete = async () => {
            if (service?.id) {
              deleteService(service.id).then(response => {
                if ("data" in response) {
                  router.goBack();
                }
              });
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: form.handleSubmit(handleSubmit),
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields: formFields,
              form
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "ion-padding-top flex gap-2",
              children: [service?.id && /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  type: "button",
                  size: "small",
                  color: "danger",
                  onClick: handleDelete,
                  disabled: deleteResponse.isLoading,
                  fill: "clear",
                  style: {
                    minWidth: 0
                  },
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: trashOutline,
                    slot: "icon-only"
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonAlertConfirmation, {
                  isOpen: showDeleteAlert,
                  header: t("Obriši uslugu?"),
                  message: t("Da li ste sigurni da želite da obrišete ovu uslugu?"),
                  confirmAction: confirmDelete,
                  cancelAction: () => setShowDeleteAlert(false),
                  onDidDismiss: () => setShowDeleteAlert(false),
                  confirmTextKey: "Da",
                  cancelTextKey: "Ne",
                  confirmCssClass: "danger"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                type: "submit",
                expand: "block",
                style: {
                  flexGrow: 1
                },
                disabled: externalLoading,
                color: "success",
                className: "flex-1",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: saveOutline,
                  slot: "start"
                }), externalLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                  name: "crescent"
                }) : t("Sačuvaj podatke")]
              })]
            })]
          });
        }
        function ServiceCreatePage({
          groupId
        }) {
          const {
            t
          } = useTranslation();
          const [createService, createResponse] = useCreateServiceMutation();
          const router = useIonRouter();
          const handleSubmit = data => {
            createService(data).then(response => {
              if ("data" in response) {
                router.goBack();
              }
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(ServiceEditForm, {
            service: {
              groupId
            },
            onSubmit: handleSubmit,
            isLoading: createResponse.isLoading
          });
        }
        function ServiceCreatePageWrapper() {
          const {
            t
          } = useTranslation();
          const {
            groupId
          } = useParams();
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Nova usluga"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(ServiceCreatePage, {
              groupId: parseInt(groupId, 10)
            })
          });
        }
        const LocationWorkerCreatePage = reactExports.lazy(() => __vitePreload(() => module.import('./LocationWorkerCreatePage-legacy-coc7UCEk.js'), false              ? __VITE_PRELOAD__ : void 0));
        function LocationWorkerCreatePageWrapper() {
          const {
            t
          } = useTranslation();
          const locationSlug = activeLocation;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Novi radnik"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationWorkerCreatePage, {
              locationSlug
            })
          });
        }
        const workerEditFormSchema = create$3().shape({
          firstName: create$6().required(t("Ime je obavezno")),
          lastName: create$6().required(t("Prezime je obavezno")),
          description: create$6().nullable().defined(),
          userId: create$5().nullable().defined(),
          active: create$7().defined(),
          avatar: create$2().nullable().defined()
        });
        const getWorkerEditFormFields = (users, workerId, initialValues, onAvatarUploadSuccess) => [{
          keyName: "firstName",
          name: "firstName",
          data: {
            type: FieldType.Text,
            label: t("Ime"),
            translation: workerId ? {
              type: "location_worker",
              fieldName: "first_name",
              dataId: workerId
            } : void 0
          }
        }, {
          keyName: "lastName",
          name: "lastName",
          data: {
            type: FieldType.Text,
            label: t("Prezime")
          }
        }, {
          keyName: "description",
          name: "description",
          data: {
            type: FieldType.TextArea,
            label: t("Opis"),
            translation: workerId ? {
              type: "location_worker",
              fieldName: "description",
              dataId: workerId
            } : void 0
          }
        }, {
          keyName: "userId",
          name: "userId",
          data: {
            type: FieldType.Autocomplete,
            // async search handled in DynamicForm
            label: t("Korisnik (email)"),
            options: users.map(user => ({
              text: user.email,
              value: user.id.toString()
            }))
          }
        }, {
          keyName: "avatar",
          name: "avatar",
          data: {
            type: FieldType.GalleryArea,
            label: t("Slika radnika"),
            oneImage: true,
            maxPhotos: 1,
            photos: initialValues?.avatar?.map(photo => ({
              id: photo.id,
              url: photo.url,
              name: photo.url.split("/").pop() || "avatar",
              index: 0
            })) || [],
            cropAspectRatio: {
              width: 1,
              height: 1
            },
            uploadUrl: `rzr/locations/worker/${workerId}/avatar`,
            deleteUrl: `rzr/locations/worker/${workerId}/avatar`,
            uploadBehavior: "onSave",
            onUploadSuccess: photo => {
              onAvatarUploadSuccess?.();
            },
            onUploadError: error => {
              console.error("Avatar upload error:", error);
            },
            onDeleteSuccess: photoId => {
              onAvatarUploadSuccess?.();
            },
            onDeleteError: error => {
              console.error("Avatar delete error:", error);
            }
          }
        }, {
          keyName: "active",
          name: "active",
          data: {
            type: FieldType.Switch,
            label: t("Aktivan")
          }
        }];
        const userApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            userSearch: builder.query({
              query: params => ({
                url: "users/list",
                method: "GET",
                params
              }),
              transformResponse: transformPaginationResponseToCamelCase
            })
          })
        });
        const {
          useUserSearchQuery
        } = userApi;
        const WorkerForm = exports("X", ({
          initialValues = {},
          onSubmit,
          onDelete,
          isEdit = false,
          loading = false,
          onAvatarUploadSuccess
        }) => {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(workerEditFormSchema, {
            defaultValues: initialValues
          });
          const {
            data: userData
          } = useUserSearchQuery({});
          const fields = getWorkerEditFormFields(userData?.data ?? [], initialValues?.id, initialValues, onAvatarUploadSuccess
          // Pass callback for avatar upload success
          );
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: form.handleSubmit(onSubmit),
            className: "p-0",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields,
              form
            }), /* @__PURE__ */jsxRuntimeExports.jsx(FormActionButtons, {
              onSave: form.handleSubmit(onSubmit),
              isSaving: loading,
              onDelete,
              isDeleting: loading,
              showDelete: isEdit,
              deleteConfirmationProps: {
                header: t("Obriši radnika?"),
                message: t("Da li ste sigurni da želite da obrišete ovog radnika?")
              }
            })]
          });
        });
        function WorkerServiceManagement({
          worker,
          locationSlug
        }) {
          const {
            t
          } = useTranslation();
          const [workerServices, setWorkerServices] = reactExports.useState(/* @__PURE__ */new Map());
          const [isLoading, setIsLoading] = reactExports.useState(false);
          const [isSyncedService, setIsSyncedService] = reactExports.useState(worker.isSyncedService);
          const [updateWorker, {
            isLoading: isUpdating
          }] = useUpdateWorkerMutation();
          const [storeWorkerService] = useStoreWorkerServiceMutation();
          const [updateWorkerService] = useUpdateWorkerServiceMutation();
          const [deleteWorkerService] = useDeleteWorkerServiceMutation();
          const {
            data: serviceGroupsResponse,
            isLoading: isLoadingServices,
            error
          } = useGetFeServiceGroupsQuery({
            locationSlug
          });
          const {
            data: workerServicesResponse,
            isLoading: isLoadingWorkerServices,
            error: workerServicesError
          } = useGetWorkerServicesQuery({
            locationSlug,
            workerId: worker.id
          });
          const serviceGroups = serviceGroupsResponse?.data || [];
          reactExports.useEffect(() => {
            if (workerServicesResponse?.data) {
              const servicesMap = /* @__PURE__ */new Map();
              workerServicesResponse.data.forEach(workerService => {
                servicesMap.set(workerService.serviceId, {
                  serviceId: workerService.serviceId,
                  price: workerService.price,
                  duration: workerService.duration,
                  active: workerService.active,
                  useDefaultPrice: workerService.price === null || workerService.price === void 0,
                  useDefaultDuration: workerService.duration === null || workerService.duration === void 0
                });
              });
              setWorkerServices(servicesMap);
            }
          }, [workerServicesResponse]);
          reactExports.useEffect(() => {
            setIsSyncedService(worker.isSyncedService);
          }, [worker.isSyncedService]);
          const handleServiceToggle = (service, checked) => {
            const newServices = new Map(workerServices);
            if (checked) {
              newServices.set(service.id, {
                serviceId: service.id,
                price: service.price,
                duration: service.duration,
                active: true,
                useDefaultPrice: true,
                useDefaultDuration: true
              });
            } else {
              newServices.delete(service.id);
            }
            setWorkerServices(newServices);
          };
          const handlePriceChange = (serviceId, price) => {
            const newServices = new Map(workerServices);
            const service = newServices.get(serviceId);
            if (service) {
              newServices.set(serviceId, {
                ...service,
                price
              });
            }
            setWorkerServices(newServices);
          };
          const handleDurationChange = (serviceId, duration) => {
            const newServices = new Map(workerServices);
            const service = newServices.get(serviceId);
            if (service) {
              newServices.set(serviceId, {
                ...service,
                duration
              });
            }
            setWorkerServices(newServices);
          };
          const handleUseDefaultPriceToggle = (serviceId, useDefault) => {
            const newServices = new Map(workerServices);
            const service = newServices.get(serviceId);
            if (service) {
              newServices.set(serviceId, {
                ...service,
                useDefaultPrice: useDefault,
                price: useDefault ? void 0 : service.price
              });
            }
            setWorkerServices(newServices);
          };
          const handleUseDefaultDurationToggle = (serviceId, useDefault) => {
            const newServices = new Map(workerServices);
            const service = newServices.get(serviceId);
            if (service) {
              newServices.set(serviceId, {
                ...service,
                useDefaultDuration: useDefault,
                duration: useDefault ? void 0 : service.duration
              });
            }
            setWorkerServices(newServices);
          };
          const handleOnFocus = e => {
            e.nativeEvent.target?.select();
          };
          const handleSyncedServiceToggle = async checked => {
            setIsSyncedService(checked);
            try {
              await updateWorker({
                id: worker.id,
                locationSlug,
                isSyncedService: checked
              }).unwrap();
              if (checked) {
                setWorkerServices(/* @__PURE__ */new Map());
              } else {
                const servicesMap = /* @__PURE__ */new Map();
                serviceGroups.forEach(group => {
                  group.services.forEach(service => {
                    servicesMap.set(service.id, {
                      serviceId: service.id,
                      price: service.price,
                      duration: service.duration,
                      active: true,
                      useDefaultPrice: true,
                      useDefaultDuration: true
                    });
                  });
                });
                setWorkerServices(servicesMap);
              }
            } catch (error2) {
              console.error("Error updating worker:", error2);
              setIsSyncedService(!checked);
            }
          };
          reactExports.useEffect(() => {
            if (isSyncedService && workerServicesResponse?.data) {
              const servicesMap = /* @__PURE__ */new Map();
              workerServicesResponse.data.forEach(workerService => {
                servicesMap.set(workerService.serviceId, {
                  serviceId: workerService.serviceId,
                  price: workerService.price,
                  duration: workerService.duration,
                  active: workerService.active,
                  useDefaultPrice: workerService.price === null || workerService.price === void 0,
                  useDefaultDuration: workerService.duration === null || workerService.duration === void 0
                });
              });
              setWorkerServices(servicesMap);
            }
          }, [isSyncedService, workerServicesResponse]);
          const handleSave = async () => {
            setIsLoading(true);
            try {
              const locationId = 1;
              const servicesToSave = Array.from(workerServices.entries()).map(([serviceId, serviceData]) => ({
                serviceId,
                locationId,
                price: serviceData.useDefaultPrice ? void 0 : serviceData.price,
                duration: serviceData.useDefaultDuration ? void 0 : serviceData.duration,
                sortOrder: void 0,
                // Add sortOrder field
                active: serviceData.active
              }));
              const bulkPayload = {
                locationSlug,
                workerId: worker.id,
                services: servicesToSave
              };
              try {
                const result = await storeWorkerService(bulkPayload).unwrap();
                console.log("Worker services saved successfully:", result);
              } catch (error2) {
                console.error("Error saving worker services:", error2);
              }
            } catch (error2) {
              console.error("Error saving worker services:", error2);
            } finally {
              setIsLoading(false);
            }
          };
          if (isLoadingServices) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center p-8",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          if (error) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-center p-8 text-red-500",
              children: t("Greška pri učitavanju usluga.")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              className: "mb-6",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonToggle, {
                    checked: isSyncedService,
                    onIonChange: e => handleSyncedServiceToggle(e.detail.checked),
                    disabled: isUpdating
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                      children: t("Podrazumevani svi servisi")
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Kada je stiklirano, radnik koristi sve servise sa default cenama i trajanjima")
                    })]
                  })]
                })
              })
            }), serviceGroups.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "text-center p-8",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "medium",
                  children: t("Nema usluga za prikaz.")
                })
              })
            }) : isSyncedService ? /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                className: "text-center p-8",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: checkmarkCircleOutline,
                  className: "text-4xl text-green-500 mb-4"
                }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                    className: "text-lg font-medium",
                    children: t("Radnik koristi sve servise sa default cenama")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    className: "text-sm mt-2",
                    children: t('Odstikliraj "Podrazumevani svi servisi" da bi prilagodio servise')
                  })]
                })]
              })
            }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
              children: [serviceGroups.map(group => /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                className: "mb-6",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                    children: group.title
                  })
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                    children: group.services.map(service => {
                      const isSelected = workerServices.has(service.id);
                      const workerService = workerServices.get(service.id);
                      return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                        children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                          button: true,
                          onClick: () => handleServiceToggle(service, !isSelected),
                          className: "ion-no-padding",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                            slot: "start",
                            checked: isSelected,
                            onIonChange: e => {
                              e.stopPropagation();
                              handleServiceToggle(service, e.detail.checked);
                            }
                          }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                            children: [/* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                              className: "font-medium",
                              children: service.title
                            }), service.description && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                              className: "text-sm text-gray-500 mt-1",
                              children: service.description
                            }), /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                              className: "text-xs text-gray-400 mt-1",
                              children: [service.price, " RSD • ", service.duration, " min"]
                            })]
                          })]
                        }), isSelected && /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          className: "py-2 border-b border-gray-200",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                            className: "flex gap-3 mb-3",
                            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                              checked: workerService?.useDefaultPrice ?? true,
                              onIonChange: e => {
                                handleUseDefaultPriceToggle(service.id, e.detail.checked);
                              },
                              labelPlacement: "end",
                              slot: "end",
                              color: "warning",
                              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                                className: "text-sm",
                                children: t("Osnovna cena")
                              })
                            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCheckbox, {
                              checked: workerService?.useDefaultDuration ?? true,
                              onIonChange: e => {
                                handleUseDefaultDurationToggle(service.id, e.detail.checked);
                              },
                              labelPlacement: "end",
                              slot: "start",
                              color: "warning",
                              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                                className: "text-sm",
                                children: t("Osnovno trajanje")
                              })
                            })]
                          }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                            className: "flex gap-3",
                            children: [!workerService?.useDefaultPrice && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                              className: "border rounded-lg",
                              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                                label: t("Cena (RSD)"),
                                labelPlacement: "floating",
                                type: "number",
                                value: workerService?.price || service.price,
                                onFocus: handleOnFocus,
                                onIonInput: e => {
                                  handlePriceChange(service.id, Number(e.detail.value));
                                }
                              })
                            }), !workerService?.useDefaultDuration && /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                              className: "border rounded-lg",
                              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                                label: t("Trajanje (min)"),
                                labelPlacement: "floating",
                                type: "number",
                                value: workerService?.duration || service.duration,
                                onFocus: handleOnFocus,
                                onIonInput: e => {
                                  handleDurationChange(service.id, Number(e.detail.value));
                                }
                              })
                            })]
                          })]
                        })]
                      }, service.id);
                    })
                  })
                })]
              }, group.id)), /* @__PURE__ */jsxRuntimeExports.jsx(FormActionButtons, {
                onSave: handleSave,
                isSaving: isLoading,
                saveButtonProps: {
                  children: t("Sačuvaj usluge"),
                  expand: "block"
                }
              })]
            })]
          });
        }
        const convertProductPhotoToUploadPhoto = productPhoto => ({
          url: productPhoto.path,
          id: productPhoto.id
        });
        const convertProductPhotosToUploadPhotos = productPhotos => {
          if (Array.isArray(productPhotos)) {
            return productPhotos.map(convertProductPhotoToUploadPhoto);
          }
          return [convertProductPhotoToUploadPhoto(productPhotos)];
        };
        const LocationWorkerEditPage = ({
          locationSlug,
          worker
        }) => {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          const [activeTab, setActiveTab] = reactExports.useState("details");
          const [updateWorker, {
            isLoading,
            isSuccess,
            isError
          }] = useUpdateWorkerMutation();
          const [deleteWorker, {
            isLoading: isDeleting
          }] = useDeleteWorkerMutation();
          const {
            refetch
          } = useGetFeWorkerQuery({
            workerId: worker.id,
            locationSlug
          });
          const handleSubmit = async data => {
            await updateWorker({
              ...data,
              id: worker.id,
              locationSlug
            }).unwrap();
          };
          const handleDelete = async () => {
            await deleteWorker({
              id: worker.id,
              locationSlug
            }).unwrap();
            history.goBack();
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "p-2",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonSegment, {
              value: activeTab,
              onIonChange: e => setActiveTab(e.detail.value),
              className: "mb-4",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonSegmentButton, {
                value: "details",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: personOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Podaci")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSegmentButton, {
                value: "services",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: settingsOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Usluge")
                })]
              })]
            }), activeTab === "details" && /* @__PURE__ */jsxRuntimeExports.jsx(WorkerForm, {
              initialValues: {
                ...worker,
                avatar: convertProductPhotosToUploadPhotos(worker.avatar || [])
              },
              onSubmit: handleSubmit,
              onDelete: handleDelete,
              isEdit: true,
              loading: isLoading || isDeleting,
              onAvatarUploadSuccess: () => {
                refetch();
              }
            }), activeTab === "services" && /* @__PURE__ */jsxRuntimeExports.jsx(WorkerServiceManagement, {
              worker,
              locationSlug
            }), /* @__PURE__ */jsxRuntimeExports.jsx(NotificationToast, {
              isOpen: isSuccess || isError,
              onDidDismiss: () => {},
              message: isSuccess ? "Radnik je uspešno sačuvan" : "Greška pri čuvanju radnika",
              type: isSuccess ? "success" : "error"
            })]
          });
        };
        function LocationWorkerEditPageWrapper() {
          const {
            t
          } = useTranslation();
          const locationSlug = activeLocation;
          const {
            workerId
          } = useParams();
          const {
            data: workerResponse,
            isLoading,
            isError
          } = useGetFeWorkerQuery({
            workerId: parseInt(workerId),
            locationSlug
          });
          const worker = workerResponse?.data;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Izmeni radnika"),
            hasBackButton: true,
            children: isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center p-8",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            }) : isError || !worker ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-center p-8 text-red-500",
              children: t("Greška pri učitavanju radnika.")
            }) : /* @__PURE__ */jsxRuntimeExports.jsx(LocationWorkerEditPage, {
              locationSlug,
              worker
            })
          });
        }
        const promoCodeApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            getAllPromoCodes: builder.query({
              query: ({
                locationSlug
              }) => ({
                url: `locations/promo-codes/all`,
                method: "GET",
                params: {
                  locationSlug
                }
              }),
              transformResponse: transformPaginationResponseToCamelCase,
              providesTags: [TagType$1.LOCATION_PROMO_CODES]
            }),
            createPromoCode: builder.mutation({
              query: ({
                locationSlug,
                ...body
              }) => ({
                url: `locations/promo-codes/create`,
                method: "POST",
                body: {
                  ...humpsExports.decamelizeKeys(body),
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_PROMO_CODES]
            }),
            updatePromoCode: builder.mutation({
              query: ({
                id,
                locationSlug,
                ...body
              }) => ({
                url: `locations/promo-codes/update`,
                method: "POST",
                body: {
                  ...humpsExports.decamelizeKeys(body),
                  id,
                  locationSlug
                }
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_PROMO_CODES]
            }),
            deletePromoCode: builder.mutation({
              query: body => ({
                url: `locations/promo-codes/delete`,
                method: "POST",
                body
              }),
              transformResponse: transformStandardResponseToCamelCase,
              invalidatesTags: [TagType$1.LOCATION_PROMO_CODES]
            })
          })
        });
        const {
          useGetAllPromoCodesQuery,
          useCreatePromoCodeMutation,
          useUpdatePromoCodeMutation,
          useDeletePromoCodeMutation
        } = promoCodeApi;
        function LocationPromoCodesPage({
          locationSlug,
          onCreate,
          onEdit
        }) {
          const {
            t
          } = useTranslation();
          const {
            data,
            isLoading,
            isError
          } = useGetAllPromoCodesQuery({
            locationSlug
          });
          const getStatusBadge = promoCode => {
            const now = /* @__PURE__ */new Date();
            const activateAt = new Date(promoCode.activateAtUtc);
            const deactivateAt = new Date(promoCode.deactivateAtUtc);
            if (!promoCode.isActive) {
              return /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                color: "medium",
                children: "Neaktivan"
              });
            }
            if (now < activateAt) {
              return /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                color: "warning",
                children: "Čeka"
              });
            }
            if (now > deactivateAt) {
              return /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                color: "danger",
                children: "Istekao"
              });
            }
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
              color: "success",
              children: "Aktivan"
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            className: "ion-padding",
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center justify-between",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: giftOutline
                    }), t("Promo kodovi")]
                  }), onCreate && /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    onClick: onCreate,
                    size: "small",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), t("Novi kod")]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "ion-no-padding",
                children: isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "flex justify-center p-8",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
                }) : isError ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center p-8 text-red-500",
                  children: t("Greška pri učitavanju promo kodova.")
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                  children: !data?.data?.length ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "text-center p-8 text-gray-500",
                    children: t("Nema promo kodova za ovu lokaciju.")
                  }) : /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
                    children: data.data.map(promoCode => /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                      button: true,
                      onClick: () => onEdit?.(promoCode),
                      children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                        className: "flex flex-col ion-no-padding",
                        children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                          className: "flex items-center justify-between",
                          children: [/* @__PURE__ */jsxRuntimeExports.jsx("span", {
                            className: "font-semibold",
                            children: promoCode.name
                          }), getStatusBadge(promoCode)]
                        }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                          className: "text-sm text-gray-600",
                          children: [promoCode.discountValue, promoCode.inPercent ? "%" : " RSD", " popusta", " - "]
                        }), /* @__PURE__ */jsxRuntimeExports.jsxs("span", {
                          className: "text-xs text-gray-500",
                          children: [t("Aktivno od"), ":", " ", format(promoCode.activateAtUtc, "dd.MM.yyyy"), " -", " ", format(promoCode.deactivateAtUtc, "dd.MM.yyyy")]
                        })]
                      })
                    }, promoCode.id))
                  })
                })
              })]
            })
          });
        }
        function LocationPromoCodesPageWrapper() {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          const locationSlug = activeLocation;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Promo kodovi"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationPromoCodesPage, {
              locationSlug,
              onCreate: () => history.push(`/zakazivanje/podesavanja/promo-kodovi/novo`),
              onEdit: promoCode => history.push(`/zakazivanje/podesavanja/promo-kodovi/edit/${promoCode.id}`)
            })
          });
        }
        const promoCodeFormSchema = create$3().shape({
          name: create$6().required(t("Naziv je obavezan")).min(3, t("Naziv mora imati najmanje 3 karaktera")).transform(value => {
            if (!value) return value;
            let cleanValue = value.replace(/#/g, "");
            return cleanValue + "#";
          }).test("single-hash-at-end", t("Naziv mora imati tačno jedan # na kraju"), value => {
            if (!value) return false;
            const hashCount = (value.match(/#/g) || []).length;
            return hashCount === 1 && value.endsWith("#");
          }),
          discountValue: create$5().transform(value => isNaN(value) ? void 0 : value).required(t("Vrednost popusta je obavezna")).min(0, t("Vrednost popusta mora biti veća od 0")).when("inPercent", {
            is: true,
            then: schema => schema.max(100, t("Procenat popusta ne može biti veći od 100")),
            otherwise: schema => schema
          }),
          inPercent: create$7().required(),
          activateAtUtc: create$6().required(t("Datum aktivacije je obavezan")),
          deactivateAtUtc: create$6().required(t("Datum deaktivacije je obavezan")),
          isActive: create$7().required()
        });
        const getPromoCodeFormFields = () => [{
          keyName: "name",
          name: "name",
          data: {
            type: FieldType.Text,
            label: t("Naziv")
          }
        }, {
          keyName: "discountValue",
          name: "discountValue",
          data: {
            type: FieldType.Number,
            label: t("Vrednost popusta")
          }
        }, {
          keyName: "inPercent",
          name: "inPercent",
          data: {
            type: FieldType.Switch,
            label: t("U procentima")
          }
        }, {
          keyName: "activateAtUtc",
          name: "activateAtUtc",
          data: {
            type: FieldType.DateTime,
            label: t("Aktivno od")
          }
        }, {
          keyName: "deactivateAtUtc",
          name: "deactivateAtUtc",
          data: {
            type: FieldType.DateTime,
            label: t("Aktivno do")
          }
        }, {
          keyName: "isActive",
          name: "isActive",
          data: {
            type: FieldType.Switch,
            label: t("Aktivan")
          }
        }];
        const PromoCodeForm = ({
          initialValues = {
            isActive: true,
            inPercent: true
          },
          onSubmit,
          onDelete,
          isEdit = false,
          loading = false
        }) => {
          const {
            t
          } = useTranslation();
          const form = useFormWithSchema(promoCodeFormSchema, {
            defaultValues: initialValues
          });
          const fields = getPromoCodeFormFields();
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            onSubmit: form.handleSubmit(onSubmit),
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
              fields,
              form
            }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "flex gap-2 mt-4 justify-center",
              children: [isEdit && onDelete && /* @__PURE__ */jsxRuntimeExports.jsxs(IonAlertConfirmationBtn, {
                color: "danger",
                alertProps: {
                  header: t("Da li ste sigurni?"),
                  message: t("Obriši promo kod")
                },
                onConfirm: onDelete,
                disabled: loading,
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: trashOutline
                }), t("Obriši")]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                type: "submit",
                expand: "block",
                disabled: loading,
                className: "w-full",
                children: isEdit ? t("Sačuvaj") : t("Kreiraj")
              })]
            })]
          });
        };
        const LocationPromoCodeCreatePage = ({
          locationSlug
        }) => {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          const [createPromoCode, {
            isLoading
          }] = useCreatePromoCodeMutation();
          const handleSubmit = async data => {
            try {
              await createPromoCode({
                ...data,
                locationSlug
              }).unwrap();
              history.goBack();
            } catch (e) {}
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(PromoCodeForm, {
            onSubmit: handleSubmit,
            loading: isLoading
          });
        };
        function LocationPromoCodeCreatePageWrapper() {
          const {
            t
          } = useTranslation();
          const locationSlug = activeLocation;
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Novi promo kod"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationPromoCodeCreatePage, {
              locationSlug
            })
          });
        }
        const LocationPromoCodeEditPage = ({
          locationSlug,
          promoCode
        }) => {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          const [updatePromoCode, {
            isLoading
          }] = useUpdatePromoCodeMutation();
          const [deletePromoCode, {
            isLoading: isDeleting
          }] = useDeletePromoCodeMutation();
          const handleSubmit = async data => {
            try {
              await updatePromoCode({
                ...data,
                id: promoCode.id,
                locationSlug
              }).unwrap();
              history.goBack();
            } catch (e) {}
          };
          const handleDelete = async () => {
            try {
              await deletePromoCode({
                id: promoCode.id,
                locationSlug
              }).unwrap();
              history.goBack();
            } catch (e) {}
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(PromoCodeForm, {
            initialValues: promoCode,
            onSubmit: handleSubmit,
            onDelete: handleDelete,
            isEdit: true,
            loading: isLoading || isDeleting
          });
        };
        function LocationPromoCodeEditPageWrapper() {
          const {
            t
          } = useTranslation();
          const locationSlug = activeLocation;
          const {
            promoCodeId
          } = useParams();
          const {
            data,
            isLoading,
            isError
          } = useGetAllPromoCodesQuery({
            locationSlug
          });
          const promoCode = data?.data?.find(p => String(p.id) === String(promoCodeId));
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            headerClasses: mainHeaderClasses,
            title: t("Izmeni promo kod"),
            hasBackButton: true,
            children: isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center p-8",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            }) : isError || !promoCode ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-center p-8 text-red-500",
              children: t("Greška pri učitavanju promo koda.")
            }) : /* @__PURE__ */jsxRuntimeExports.jsx(LocationPromoCodeEditPage, {
              locationSlug,
              promoCode
            })
          });
        }
        function Routes() {
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonRouterOutlet, {
            id: "main",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(Route, {
              path: `${urlPrefix}/t`,
              component: MainTabs
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/r/:reservationHash`,
              component: ConfirmReservationPageWrapper,
              exact: true
            }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
              path: `${urlPrefix}/zakazi-novo`,
              component: CreateAppointmentPage
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/public-profile/:clientId`,
              component: PublicProfilePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja`,
              component: SettingsPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/vesti`,
              component: NewsListPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/vesti/novo`,
              component: NewsCreatePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/vesti/edit/:id`,
              component: NewsEditPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/radno-vreme`,
              component: LocationWorkingTimePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/podaci`,
              component: LocationEditDataPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/generalno`,
              component: LocationSettingsPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/radnici`,
              component: LocationWorkersPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/radnici/novi`,
              component: LocationWorkerCreatePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/radnici/edit/:workerId`,
              component: LocationWorkerEditPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/usluge`,
              component: ServicesPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/usluge/groups/:serviceGroupId`,
              component: ServiceGroupEditPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/usluge/services/:serviceId`,
              component: ServiceEditPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/usluge/novo`,
              component: ServiceGroupCreatePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/usluge/services/novo/:groupId`,
              component: ServiceCreatePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/promo-kodovi`,
              component: LocationPromoCodesPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/promo-kodovi/novo`,
              component: LocationPromoCodeCreatePageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(GuardedRoute$1, {
              path: `${urlPrefix}/podesavanja/promo-kodovi/edit/:promoCodeId`,
              component: LocationPromoCodeEditPageWrapper,
              exact: true,
              roles: [UserGroupCode.Admin, UserGroupCode.Owner, UserGroupCode.Worker]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
              path: `/`,
              exact: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Redirect, {
                to: `${urlPrefix}/t`
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
              path: `${urlPrefix}`,
              exact: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Redirect, {
                to: `${urlPrefix}/t`
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
              component: PageNotFound,
              path: "/404"
            })]
          });
        }
        const useRzrPingHandler = () => {
          const dispatch = useAppDispatch();
          const handleRzrChanges = reactExports.useCallback(changes => {
            Object.entries(changes).forEach(([type, change]) => {
              if (change.hasChanges) {
                switch (type) {
                  case PingType.RESERVATIONS:
                    console.log("invalidating reservations");
                    dispatch(rzrApi.util.invalidateTags([TagType$1.RESERVATION]));
                    break;
                  case PingType.WORKERS:
                    dispatch(rzrApi.util.invalidateTags([TagType$1.LOCATION_WORKERS]));
                    break;
                  case PingType.SERVICES:
                    dispatch(rzrApi.util.invalidateTags([TagType$1.SERVICES]));
                    break;
                  case PingType.WORKING_HOURS:
                    dispatch(rzrApi.util.invalidateTags([TagType$1.LOCATION_WORKING_HOURS]));
                    break;
                  case PingType.NOTIFICATIONS:
                    dispatch(rzrApi.util.invalidateTags([TagType$1.USER_NOTIFICATIONS]));
                    break;
                }
              }
            });
          }, [dispatch]);
          return {
            handleRzrChanges
          };
        };
        function Ping() {
          const pingOptions = reactExports.useMemo(() => ({
            autoStart: true
          }), []);
          const {
            handleRzrChanges
          } = useRzrPingHandler();
          usePing([PingType.RESERVATIONS, PingType.NOTIFICATIONS],
          // , PingType.WORKERS, PingType.SERVICES, PingType.WORKING_HOURS
          {
            locationSlug: activeLocation
          }, handleRzrChanges, pingOptions);
          return null;
        }
        const Ping$1 = reactExports.memo(Ping);
        function UserLoginPageWrapper() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const handleSuccessfulLogin = () => {
            router.push(`${urlPrefix}/t`, "forward", "push");
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonPage, {
            children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding text-center w-full flex justify-center items-center",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "max-w-[100%] w-[600px] ",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(ErrorBoundary$1, {
                  fallback: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "text-center text-red-500",
                    children: "Error loading login form"
                  }),
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(CommonLoginForm$1, {
                    onSuccessfulLogin: handleSuccessfulLogin
                  })
                })
              })
            })
          });
        }
        const Menu = reactExports.lazy(() => __vitePreload(() => module.import('./Menu-legacy-dSWCVsV5.js'), false              ? __VITE_PRELOAD__ : void 0));
        setupIonicReact({
          swipeBackEnabled: isPwa && !isIos,
          animated: !isIos
        });
        const urlPrefix = exports("f", getInitialData("appSlug") ?? "/zakazivanje" ?? "/zakazivanje");
        const envActiveLocation = "berbernica-tanja";
        const envIsPrivate = parseInt("1");
        const preloadedLocationData = exports("E", getInitialData("locationData", true, true));
        const activeLocation = exports("h", preloadedLocationData?.slug ?? envActiveLocation);
        const isPrivate = preloadedLocationData?.isPrivate ?? envIsPrivate;
        const reservationTimeInterval = preloadedLocationData?.timeSlotInterval ?? 30;
        const roundedSlotInterval = preloadedLocationData?.roundedSlotInterval ?? 10;
        const locationTimezone = preloadedLocationData?.settings?.timezone ?? "Europe/Belgrade";
        setAppTimezone(locationTimezone);
        function App() {
          const {
            isAdmin,
            isOwnerOrWorker
          } = useUser();
          const dispatch = useAppDispatch$1();
          useAppFocus({
            onFocus: () => {
              dispatch(rzrApi.util?.invalidateTags([TagType$1.USER_NOTIFICATIONS, {
                type: TagType$1.RESERVATION,
                id: TagId$1.LIST
              }]));
            }
          });
          if (isPrivate && !isAdmin && !isOwnerOrWorker) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonApp, {
              className: `select-none ${"dark-theme"}`,
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonReactRouter, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(Route, {
                  path: `${urlPrefix}/login`,
                  component: UserLoginPageWrapper,
                  exact: true
                }), /* @__PURE__ */jsxRuntimeExports.jsx(Route, {
                  path: `${urlPrefix}`,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(Redirect, {
                    to: `${urlPrefix}/login`
                  })
                })]
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonApp, {
            className: `select-none ${"dark-theme"}`,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("swiper-container", {
              hidden: true
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonReactRouter, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(reactExports.Suspense, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(Ping$1, {}), /* @__PURE__ */jsxRuntimeExports.jsx(CommonModalWrappers$1, {})]
              }), !isWebView && isPwa && /* @__PURE__ */jsxRuntimeExports.jsx(CommonNotificationWrapper, {
                activeLocation
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSplitPane, {
                contentId: "main",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(Menu, {}), /* @__PURE__ */jsxRuntimeExports.jsx(Routes, {})]
              })]
            })]
          });
        }
        const App$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
          __proto__: null,
          activeLocation,
          default: App,
          isPrivate,
          preloadedLocationData,
          reservationTimeInterval,
          roundedSlotInterval,
          urlPrefix
        }, Symbol.toStringTag, {
          value: 'Module'
        }));
        exports("af", App$1);
      }
    };
  });
})();
