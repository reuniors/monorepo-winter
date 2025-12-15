;
(function () {
  System.register(['./vendor_ionic-legacy-DGRHWrdu.js', './vendor_react-legacy-VZwyi0Js.js', './vendor_leaflet-legacy-CfYyL1ry.js'], function (exports, module) {
    'use strict';

    var IonPage, IonContent, IonText, IonButton, __vitePreload, defineCustomElements, instance, Backend, Browser, initReactI18next, fetchBaseQuery, gBase64, createApi, humpsExports, createAction, createSlice, isRejectedWithValue, combineReducers, configureStore, jsxRuntimeExports, persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, storage, reactExports, clientExports, Provider, PersistGate, ErrorBoundary;
    return {
      setters: [module => {
        IonPage = module.I;
        IonContent = module.b;
        IonText = module.c;
        IonButton = module.d;
        __vitePreload = module._;
        defineCustomElements = module.e;
      }, module => {
        instance = module.v;
        Backend = module.x;
        Browser = module.y;
        initReactI18next = module.z;
        fetchBaseQuery = module.A;
        gBase64 = module.C;
        createApi = module.D;
        humpsExports = module.E;
        createAction = module.F;
        createSlice = module.G;
        isRejectedWithValue = module.I;
        combineReducers = module.J;
        configureStore = module.K;
        jsxRuntimeExports = module.j;
        persistStore = module.L;
        persistReducer = module.M;
        FLUSH = module.N;
        REHYDRATE = module.O;
        PAUSE = module.P;
        PERSIST = module.Q;
        PURGE = module.S;
        REGISTER = module.T;
        storage = module.U;
        reactExports = module.e;
        clientExports = module.V;
        Provider = module.W;
        PersistGate = module.X;
        ErrorBoundary = module.Y;
      }, null],
      execute: function () {
        var __vite_style__ = document.createElement('style');
        __vite_style__.textContent = "*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}\n\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-gradient-from-position:  ;\n  --tw-gradient-via-position:  ;\n  --tw-gradient-to-position:  ;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n  --tw-contain-size:  ;\n  --tw-contain-layout:  ;\n  --tw-contain-paint:  ;\n  --tw-contain-style:  ;\n}/*\n! tailwindcss v3.4.18 | MIT License | https://tailwindcss.com\n*//*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n\n::before,\n::after {\n  --tw-content: '';\n}\n\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n5. Use the user's configured `sans` font-feature-settings by default.\n6. Use the user's configured `sans` font-variation-settings by default.\n7. Disable tap highlights on iOS\n*/\n\nhtml,\n:host {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n  font-feature-settings: normal; /* 5 */\n  font-variation-settings: normal; /* 6 */\n  -webkit-tap-highlight-color: transparent; /* 7 */\n}\n\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\n\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\n\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\n\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n\n/*\nRemove the default font size and weight for headings.\n*/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\n\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n\n/*\nAdd the correct font weight in Edge and Safari.\n*/\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/*\n1. Use the user's configured `mono` font-family by default.\n2. Use the user's configured `mono` font-feature-settings by default.\n3. Use the user's configured `mono` font-variation-settings by default.\n4. Correct the odd `em` font sizing in all browsers.\n*/\n\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-feature-settings: normal; /* 2 */\n  font-variation-settings: normal; /* 3 */\n  font-size: 1em; /* 4 */\n}\n\n/*\nAdd the correct font size in all browsers.\n*/\n\nsmall {\n  font-size: 80%;\n}\n\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\n\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-feature-settings: inherit; /* 1 */\n  font-variation-settings: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  letter-spacing: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\n\nbutton,\ninput:where([type='button']),\ninput:where([type='reset']),\ninput:where([type='submit']) {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n\n:-moz-focusring {\n  outline: auto;\n}\n\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\n\nprogress {\n  vertical-align: baseline;\n}\n\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*\nAdd the correct display in Chrome and Safari.\n*/\n\nsummary {\n  display: list-item;\n}\n\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nfieldset {\n  margin: 0;\n  padding: 0;\n}\n\nlegend {\n  padding: 0;\n}\n\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/*\nReset default styling for dialogs.\n*/\ndialog {\n  padding: 0;\n}\n\n/*\nPrevent resizing textareas horizontally by default.\n*/\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\n\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n\n/*\nSet the default cursor for buttons.\n*/\n\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\n\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\n\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n\n/* Make elements with the HTML hidden attribute stay hidden by default */\n[hidden]:where(:not([hidden=\"until-found\"])) {\n  display: none;\n}\n.container {\n  width: 100%;\n}\n@media (min-width: 480px) {\n\n  .container {\n    max-width: 480px;\n  }\n}\n@media (min-width: 768px) {\n\n  .container {\n    max-width: 768px;\n  }\n}\n@media (min-width: 976px) {\n\n  .container {\n    max-width: 976px;\n  }\n}\n@media (min-width: 1440px) {\n\n  .container {\n    max-width: 1440px;\n  }\n}\n.pointer-events-none {\n  pointer-events: none;\n}\n.visible {\n  visibility: visible;\n}\n.collapse {\n  visibility: collapse;\n}\n.static {\n  position: static;\n}\n.fixed {\n  position: fixed;\n}\n.absolute {\n  position: absolute;\n}\n.relative {\n  position: relative;\n}\n.sticky {\n  position: sticky;\n}\n.-bottom-2\\.5 {\n  bottom: -0.625rem;\n}\n.bottom-0 {\n  bottom: 0px;\n}\n.bottom-2 {\n  bottom: 0.5rem;\n}\n.bottom-4 {\n  bottom: 1rem;\n}\n.bottom-\\[20vh\\] {\n  bottom: 20vh;\n}\n.bottom-\\[50vh\\] {\n  bottom: 50vh;\n}\n.bottom-\\[60vh\\] {\n  bottom: 60vh;\n}\n.left-0 {\n  left: 0px;\n}\n.left-1\\/2 {\n  left: 50%;\n}\n.right-0 {\n  right: 0px;\n}\n.right-1 {\n  right: 0.25rem;\n}\n.right-2 {\n  right: 0.5rem;\n}\n.right-4 {\n  right: 1rem;\n}\n.top-0 {\n  top: 0px;\n}\n.top-1 {\n  top: 0.25rem;\n}\n.top-1\\/2 {\n  top: 50%;\n}\n.top-2 {\n  top: 0.5rem;\n}\n.top-2\\.5 {\n  top: 0.625rem;\n}\n.-z-10 {\n  z-index: -10;\n}\n.z-10 {\n  z-index: 10;\n}\n.z-20 {\n  z-index: 20;\n}\n.z-\\[100\\] {\n  z-index: 100;\n}\n.col-span-2 {\n  grid-column: span 2 / span 2;\n}\n.m-0 {\n  margin: 0px;\n}\n.m-1 {\n  margin: 0.25rem;\n}\n.m-2 {\n  margin: 0.5rem;\n}\n.mx-2 {\n  margin-left: 0.5rem;\n  margin-right: 0.5rem;\n}\n.mx-auto {\n  margin-left: auto;\n  margin-right: auto;\n}\n.my-1 {\n  margin-top: 0.25rem;\n  margin-bottom: 0.25rem;\n}\n.my-2 {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.mb-0 {\n  margin-bottom: 0px;\n}\n.mb-0\\.5 {\n  margin-bottom: 0.125rem;\n}\n.mb-1 {\n  margin-bottom: 0.25rem;\n}\n.mb-1\\.5 {\n  margin-bottom: 0.375rem;\n}\n.mb-2 {\n  margin-bottom: 0.5rem;\n}\n.mb-3 {\n  margin-bottom: 0.75rem;\n}\n.mb-4 {\n  margin-bottom: 1rem;\n}\n.mb-6 {\n  margin-bottom: 1.5rem;\n}\n.mb-8 {\n  margin-bottom: 2rem;\n}\n.mb-\\[1px\\] {\n  margin-bottom: 1px;\n}\n.mb-\\[50vh\\] {\n  margin-bottom: 50vh;\n}\n.mb-\\[80px\\] {\n  margin-bottom: 80px;\n}\n.ml-0 {\n  margin-left: 0px;\n}\n.ml-1 {\n  margin-left: 0.25rem;\n}\n.ml-10 {\n  margin-left: 2.5rem;\n}\n.ml-2 {\n  margin-left: 0.5rem;\n}\n.ml-4 {\n  margin-left: 1rem;\n}\n.mr-0 {\n  margin-right: 0px;\n}\n.mr-1 {\n  margin-right: 0.25rem;\n}\n.mr-10 {\n  margin-right: 2.5rem;\n}\n.mr-2 {\n  margin-right: 0.5rem;\n}\n.mr-\\[2px\\] {\n  margin-right: 2px;\n}\n.mt-0 {\n  margin-top: 0px;\n}\n.mt-0\\.5 {\n  margin-top: 0.125rem;\n}\n.mt-1 {\n  margin-top: 0.25rem;\n}\n.mt-1\\.5 {\n  margin-top: 0.375rem;\n}\n.mt-10 {\n  margin-top: 2.5rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.mt-5 {\n  margin-top: 1.25rem;\n}\n.mt-6 {\n  margin-top: 1.5rem;\n}\n.mt-\\[2px\\] {\n  margin-top: 2px;\n}\n.mt-auto {\n  margin-top: auto;\n}\n.line-clamp-1 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 1;\n}\n.line-clamp-2 {\n  overflow: hidden;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n}\n.\\!block {\n  display: block !important;\n}\n.block {\n  display: block;\n}\n.inline-block {\n  display: inline-block;\n}\n.inline {\n  display: inline;\n}\n.flex {\n  display: flex;\n}\n.inline-flex {\n  display: inline-flex;\n}\n.table {\n  display: table;\n}\n.grid {\n  display: grid;\n}\n.contents {\n  display: contents;\n}\n.hidden {\n  display: none;\n}\n.aspect-square {\n  aspect-ratio: 1 / 1;\n}\n.h-0 {\n  height: 0px;\n}\n.h-0\\.5 {\n  height: 0.125rem;\n}\n.h-1\\.5 {\n  height: 0.375rem;\n}\n.h-10 {\n  height: 2.5rem;\n}\n.h-12 {\n  height: 3rem;\n}\n.h-14 {\n  height: 3.5rem;\n}\n.h-16 {\n  height: 4rem;\n}\n.h-2 {\n  height: 0.5rem;\n}\n.h-20 {\n  height: 5rem;\n}\n.h-3 {\n  height: 0.75rem;\n}\n.h-4 {\n  height: 1rem;\n}\n.h-5 {\n  height: 1.25rem;\n}\n.h-64 {\n  height: 16rem;\n}\n.h-8 {\n  height: 2rem;\n}\n.h-\\[64px\\] {\n  height: 64px;\n}\n.h-\\[76px\\] {\n  height: 76px;\n}\n.h-auto {\n  height: auto;\n}\n.h-full {\n  height: 100%;\n}\n.max-h-40 {\n  max-height: 10rem;\n}\n.max-h-80 {\n  max-height: 20rem;\n}\n.max-h-96 {\n  max-height: 24rem;\n}\n.max-h-\\[200px\\] {\n  max-height: 200px;\n}\n.max-h-\\[3em\\] {\n  max-height: 3em;\n}\n.max-h-\\[48px\\] {\n  max-height: 48px;\n}\n.max-h-\\[500px\\] {\n  max-height: 500px;\n}\n.max-h-none {\n  max-height: none;\n}\n.min-h-3 {\n  min-height: 0.75rem;\n}\n.min-h-\\[150px\\] {\n  min-height: 150px;\n}\n.min-h-\\[300px\\] {\n  min-height: 300px;\n}\n.min-h-\\[320px\\] {\n  min-height: 320px;\n}\n.min-h-\\[50vh\\] {\n  min-height: 50vh;\n}\n.min-h-screen {\n  min-height: 100vh;\n}\n.w-1\\.5 {\n  width: 0.375rem;\n}\n.w-10 {\n  width: 2.5rem;\n}\n.w-12 {\n  width: 3rem;\n}\n.w-14 {\n  width: 3.5rem;\n}\n.w-16 {\n  width: 4rem;\n}\n.w-2 {\n  width: 0.5rem;\n}\n.w-20 {\n  width: 5rem;\n}\n.w-24 {\n  width: 6rem;\n}\n.w-3 {\n  width: 0.75rem;\n}\n.w-4 {\n  width: 1rem;\n}\n.w-5 {\n  width: 1.25rem;\n}\n.w-8 {\n  width: 2rem;\n}\n.w-\\[40vw\\] {\n  width: 40vw;\n}\n.w-\\[600px\\] {\n  width: 600px;\n}\n.w-\\[64px\\] {\n  width: 64px;\n}\n.w-auto {\n  width: auto;\n}\n.w-full {\n  width: 100%;\n}\n.min-w-0 {\n  min-width: 0px;\n}\n.min-w-\\[40px\\] {\n  min-width: 40px;\n}\n.min-w-\\[41px\\] {\n  min-width: 41px;\n}\n.max-w-2xl {\n  max-width: 42rem;\n}\n.max-w-4xl {\n  max-width: 56rem;\n}\n.max-w-\\[100\\%\\] {\n  max-width: 100%;\n}\n.max-w-\\[1200px\\] {\n  max-width: 1200px;\n}\n.max-w-\\[300px\\] {\n  max-width: 300px;\n}\n.max-w-\\[48px\\] {\n  max-width: 48px;\n}\n.max-w-\\[64px\\] {\n  max-width: 64px;\n}\n.max-w-\\[80vw\\] {\n  max-width: 80vw;\n}\n.max-w-\\[900px\\] {\n  max-width: 900px;\n}\n.max-w-full {\n  max-width: 100%;\n}\n.max-w-md {\n  max-width: 28rem;\n}\n.flex-1 {\n  flex: 1 1 0%;\n}\n.flex-shrink-0 {\n  flex-shrink: 0;\n}\n.-translate-x-1\\/2 {\n  --tw-translate-x: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-translate-y-1\\/2 {\n  --tw-translate-y: -50%;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.-rotate-90 {\n  --tw-rotate: -90deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.rotate-180 {\n  --tw-rotate: 180deg;\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n.transform {\n  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));\n}\n@keyframes bounce {\n\n  0%, 100% {\n    transform: translateY(-25%);\n    animation-timing-function: cubic-bezier(0.8,0,1,1);\n  }\n\n  50% {\n    transform: none;\n    animation-timing-function: cubic-bezier(0,0,0.2,1);\n  }\n}\n.animate-bounce {\n  animation: bounce 1s infinite;\n}\n@keyframes pulse {\n\n  50% {\n    opacity: .5;\n  }\n}\n.animate-pulse {\n  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n.cursor-not-allowed {\n  cursor: not-allowed;\n}\n.cursor-pointer {\n  cursor: pointer;\n}\n.select-none {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n          user-select: none;\n}\n.resize {\n  resize: both;\n}\n.grid-cols-1 {\n  grid-template-columns: repeat(1, minmax(0, 1fr));\n}\n.grid-cols-2 {\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n}\n.grid-cols-3 {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n.grid-cols-7 {\n  grid-template-columns: repeat(7, minmax(0, 1fr));\n}\n.flex-col {\n  flex-direction: column;\n}\n.items-center {\n  align-items: center;\n}\n.justify-start {\n  justify-content: flex-start;\n}\n.justify-end {\n  justify-content: flex-end;\n}\n.justify-center {\n  justify-content: center;\n}\n.justify-between {\n  justify-content: space-between;\n}\n.gap-1 {\n  gap: 0.25rem;\n}\n.gap-2 {\n  gap: 0.5rem;\n}\n.gap-3 {\n  gap: 0.75rem;\n}\n.gap-4 {\n  gap: 1rem;\n}\n.gap-6 {\n  gap: 1.5rem;\n}\n.space-x-1 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.25rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-x-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.5rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-x-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(0.75rem * var(--tw-space-x-reverse));\n  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-x-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-x-reverse: 0;\n  margin-right: calc(1rem * var(--tw-space-x-reverse));\n  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));\n}\n.space-y-2 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));\n}\n.space-y-3 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));\n}\n.space-y-4 > :not([hidden]) ~ :not([hidden]) {\n  --tw-space-y-reverse: 0;\n  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));\n  margin-bottom: calc(1rem * var(--tw-space-y-reverse));\n}\n.divide-y > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-y-reverse: 0;\n  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));\n  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));\n}\n.divide-gray-200 > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-divide-opacity, 1));\n}\n.overflow-hidden {\n  overflow: hidden;\n}\n.overflow-x-auto {\n  overflow-x: auto;\n}\n.overflow-y-auto {\n  overflow-y: auto;\n}\n.overflow-y-scroll {\n  overflow-y: scroll;\n}\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.text-ellipsis {\n  text-overflow: ellipsis;\n}\n.whitespace-nowrap {\n  white-space: nowrap;\n}\n.text-nowrap {\n  text-wrap: nowrap;\n}\n.rounded {\n  border-radius: 0.25rem;\n}\n.rounded-2xl {\n  border-radius: 1rem;\n}\n.rounded-full {\n  border-radius: 9999px;\n}\n.rounded-lg {\n  border-radius: 0.5rem;\n}\n.rounded-md {\n  border-radius: 0.375rem;\n}\n.rounded-xl {\n  border-radius: 0.75rem;\n}\n.border {\n  border-width: 1px;\n}\n.border-0 {\n  border-width: 0px;\n}\n.border-2 {\n  border-width: 2px;\n}\n.border-x-8 {\n  border-left-width: 8px;\n  border-right-width: 8px;\n}\n.border-y {\n  border-top-width: 1px;\n  border-bottom-width: 1px;\n}\n.border-y-2 {\n  border-top-width: 2px;\n  border-bottom-width: 2px;\n}\n.border-b {\n  border-bottom-width: 1px;\n}\n.border-b-2 {\n  border-bottom-width: 2px;\n}\n.border-b-4 {\n  border-bottom-width: 4px;\n}\n.border-l-2 {\n  border-left-width: 2px;\n}\n.border-l-4 {\n  border-left-width: 4px;\n}\n.border-r-2 {\n  border-right-width: 2px;\n}\n.border-t {\n  border-top-width: 1px;\n}\n.border-t-2 {\n  border-top-width: 2px;\n}\n.border-amber-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(252 211 77 / var(--tw-border-opacity, 1));\n}\n.border-amber-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(245 158 11 / var(--tw-border-opacity, 1));\n}\n.border-black {\n  --tw-border-opacity: 1;\n  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));\n}\n.border-blue-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));\n}\n.border-cyan-700 {\n  --tw-border-opacity: 1;\n  border-color: rgb(14 116 144 / var(--tw-border-opacity, 1));\n}\n.border-gray-200 {\n  --tw-border-opacity: 1;\n  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));\n}\n.border-gray-300 {\n  --tw-border-opacity: 1;\n  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));\n}\n.border-gray-400 {\n  --tw-border-opacity: 1;\n  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));\n}\n.border-gray-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));\n}\n.border-gray-700 {\n  --tw-border-opacity: 1;\n  border-color: rgb(55 65 81 / var(--tw-border-opacity, 1));\n}\n.border-gray-800 {\n  --tw-border-opacity: 1;\n  border-color: rgb(31 41 55 / var(--tw-border-opacity, 1));\n}\n.border-green-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(34 197 94 / var(--tw-border-opacity, 1));\n}\n.border-red-600 {\n  --tw-border-opacity: 1;\n  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));\n}\n.border-white {\n  --tw-border-opacity: 1;\n  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));\n}\n.border-yellow-500 {\n  --tw-border-opacity: 1;\n  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));\n}\n.border-b-gray-600\\/60 {\n  border-bottom-color: rgb(75 85 99 / 0.6);\n}\n.border-b-green-500 {\n  --tw-border-opacity: 1;\n  border-bottom-color: rgb(34 197 94 / var(--tw-border-opacity, 1));\n}\n.border-l-blue-500 {\n  --tw-border-opacity: 1;\n  border-left-color: rgb(59 130 246 / var(--tw-border-opacity, 1));\n}\n.border-l-gray-500 {\n  --tw-border-opacity: 1;\n  border-left-color: rgb(107 114 128 / var(--tw-border-opacity, 1));\n}\n.border-l-green-500 {\n  --tw-border-opacity: 1;\n  border-left-color: rgb(34 197 94 / var(--tw-border-opacity, 1));\n}\n.border-r-yellow-600 {\n  --tw-border-opacity: 1;\n  border-right-color: rgb(202 138 4 / var(--tw-border-opacity, 1));\n}\n.bg-\\[\\#050505\\] {\n  --tw-bg-opacity: 1;\n  background-color: rgb(5 5 5 / var(--tw-bg-opacity, 1));\n}\n.bg-amber-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));\n}\n.bg-black {\n  --tw-bg-opacity: 1;\n  background-color: rgb(0 0 0 / var(--tw-bg-opacity, 1));\n}\n.bg-blue-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));\n}\n.bg-blue-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));\n}\n.bg-emerald-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(16 185 129 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-100 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-600 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(75 85 99 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(55 65 81 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));\n}\n.bg-gray-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity, 1));\n}\n.bg-green-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));\n}\n.bg-green-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));\n}\n.bg-green-500\\/10 {\n  background-color: rgb(34 197 94 / 0.1);\n}\n.bg-green-500\\/30 {\n  background-color: rgb(34 197 94 / 0.3);\n}\n.bg-green-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(20 83 45 / var(--tw-bg-opacity, 1));\n}\n.bg-inherit {\n  background-color: inherit;\n}\n.bg-orange-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 115 22 / var(--tw-bg-opacity, 1));\n}\n.bg-purple-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(168 85 247 / var(--tw-bg-opacity, 1));\n}\n.bg-red-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 242 242 / var(--tw-bg-opacity, 1));\n}\n.bg-red-500 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));\n}\n.bg-transparent {\n  background-color: transparent;\n}\n.bg-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n}\n.bg-white\\/10 {\n  background-color: rgb(255 255 255 / 0.1);\n}\n.bg-yellow-50 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));\n}\n.bg-opacity-50 {\n  --tw-bg-opacity: 0.5;\n}\n.bg-gradient-to-tr {\n  background-image: linear-gradient(to top right, var(--tw-gradient-stops));\n}\n.from-blue-600 {\n  --tw-gradient-from: #2563eb var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(37 99 235 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.from-red-600 {\n  --tw-gradient-from: #dc2626 var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(220 38 38 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.from-teal-600 {\n  --tw-gradient-from: #0d9488 var(--tw-gradient-from-position);\n  --tw-gradient-to: rgb(13 148 136 / 0) var(--tw-gradient-to-position);\n  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);\n}\n.to-blue-400 {\n  --tw-gradient-to: #60a5fa var(--tw-gradient-to-position);\n}\n.to-red-400 {\n  --tw-gradient-to: #f87171 var(--tw-gradient-to-position);\n}\n.to-teal-400 {\n  --tw-gradient-to: #2dd4bf var(--tw-gradient-to-position);\n}\n.bg-clip-border {\n  background-clip: border-box;\n}\n.object-cover {\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.p-0 {\n  padding: 0px;\n}\n.p-1 {\n  padding: 0.25rem;\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.p-3 {\n  padding: 0.75rem;\n}\n.p-4 {\n  padding: 1rem;\n}\n.p-6 {\n  padding: 1.5rem;\n}\n.p-8 {\n  padding: 2rem;\n}\n.\\!px-0 {\n  padding-left: 0px !important;\n  padding-right: 0px !important;\n}\n.\\!px-2 {\n  padding-left: 0.5rem !important;\n  padding-right: 0.5rem !important;\n}\n.\\!py-0 {\n  padding-top: 0px !important;\n  padding-bottom: 0px !important;\n}\n.px-0 {\n  padding-left: 0px;\n  padding-right: 0px;\n}\n.px-1 {\n  padding-left: 0.25rem;\n  padding-right: 0.25rem;\n}\n.px-1\\.5 {\n  padding-left: 0.375rem;\n  padding-right: 0.375rem;\n}\n.px-2 {\n  padding-left: 0.5rem;\n  padding-right: 0.5rem;\n}\n.px-3 {\n  padding-left: 0.75rem;\n  padding-right: 0.75rem;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.px-6 {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.px-8 {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.py-0 {\n  padding-top: 0px;\n  padding-bottom: 0px;\n}\n.py-1 {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n}\n.py-10 {\n  padding-top: 2.5rem;\n  padding-bottom: 2.5rem;\n}\n.py-12 {\n  padding-top: 3rem;\n  padding-bottom: 3rem;\n}\n.py-16 {\n  padding-top: 4rem;\n  padding-bottom: 4rem;\n}\n.py-2 {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.py-3 {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n}\n.py-4 {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.py-8 {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n.pb-1 {\n  padding-bottom: 0.25rem;\n}\n.pb-14 {\n  padding-bottom: 3.5rem;\n}\n.pb-2 {\n  padding-bottom: 0.5rem;\n}\n.pb-24 {\n  padding-bottom: 6rem;\n}\n.pb-3 {\n  padding-bottom: 0.75rem;\n}\n.pb-4 {\n  padding-bottom: 1rem;\n}\n.pb-64 {\n  padding-bottom: 16rem;\n}\n.pl-2 {\n  padding-left: 0.5rem;\n}\n.pl-4 {\n  padding-left: 1rem;\n}\n.pr-1 {\n  padding-right: 0.25rem;\n}\n.pr-2 {\n  padding-right: 0.5rem;\n}\n.pt-0 {\n  padding-top: 0px;\n}\n.pt-2 {\n  padding-top: 0.5rem;\n}\n.pt-3 {\n  padding-top: 0.75rem;\n}\n.pt-4 {\n  padding-top: 1rem;\n}\n.text-left {\n  text-align: left;\n}\n.text-center {\n  text-align: center;\n}\n.font-sans {\n  font-family: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n}\n.text-2xl {\n  font-size: 1.5rem;\n  line-height: 2rem;\n}\n.text-3xl {\n  font-size: 1.875rem;\n  line-height: 2.25rem;\n}\n.text-4xl {\n  font-size: 2.25rem;\n  line-height: 2.5rem;\n}\n.text-6xl {\n  font-size: 3.75rem;\n  line-height: 1;\n}\n.text-base {\n  font-size: 1rem;\n  line-height: 1.5rem;\n}\n.text-lg {\n  font-size: 1.125rem;\n  line-height: 1.75rem;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.text-xs {\n  font-size: 0.75rem;\n  line-height: 1rem;\n}\n.font-bold {\n  font-weight: 700;\n}\n.font-medium {\n  font-weight: 500;\n}\n.font-normal {\n  font-weight: 400;\n}\n.font-semibold {\n  font-weight: 600;\n}\n.uppercase {\n  text-transform: uppercase;\n}\n.italic {\n  font-style: italic;\n}\n.leading-relaxed {\n  line-height: 1.625;\n}\n.leading-snug {\n  line-height: 1.375;\n}\n.tracking-normal {\n  letter-spacing: 0em;\n}\n.tracking-wide {\n  letter-spacing: 0.025em;\n}\n.\\!text-orange-600 {\n  --tw-text-opacity: 1 !important;\n  color: rgb(234 88 12 / var(--tw-text-opacity, 1)) !important;\n}\n.\\!text-rose-600 {\n  --tw-text-opacity: 1 !important;\n  color: rgb(225 29 72 / var(--tw-text-opacity, 1)) !important;\n}\n.text-amber-400 {\n  --tw-text-opacity: 1;\n  color: rgb(251 191 36 / var(--tw-text-opacity, 1));\n}\n.text-amber-500 {\n  --tw-text-opacity: 1;\n  color: rgb(245 158 11 / var(--tw-text-opacity, 1));\n}\n.text-black {\n  --tw-text-opacity: 1;\n  color: rgb(0 0 0 / var(--tw-text-opacity, 1));\n}\n.text-blue-400 {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity, 1));\n}\n.text-blue-600 {\n  --tw-text-opacity: 1;\n  color: rgb(37 99 235 / var(--tw-text-opacity, 1));\n}\n.text-gray-200 {\n  --tw-text-opacity: 1;\n  color: rgb(229 231 235 / var(--tw-text-opacity, 1));\n}\n.text-gray-300 {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity, 1));\n}\n.text-gray-400 {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity, 1));\n}\n.text-gray-500 {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity, 1));\n}\n.text-gray-600 {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity, 1));\n}\n.text-gray-700 {\n  --tw-text-opacity: 1;\n  color: rgb(55 65 81 / var(--tw-text-opacity, 1));\n}\n.text-gray-800 {\n  --tw-text-opacity: 1;\n  color: rgb(31 41 55 / var(--tw-text-opacity, 1));\n}\n.text-gray-900 {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity, 1));\n}\n.text-green-500 {\n  --tw-text-opacity: 1;\n  color: rgb(34 197 94 / var(--tw-text-opacity, 1));\n}\n.text-green-600 {\n  --tw-text-opacity: 1;\n  color: rgb(22 163 74 / var(--tw-text-opacity, 1));\n}\n.text-red-500 {\n  --tw-text-opacity: 1;\n  color: rgb(239 68 68 / var(--tw-text-opacity, 1));\n}\n.text-red-600 {\n  --tw-text-opacity: 1;\n  color: rgb(220 38 38 / var(--tw-text-opacity, 1));\n}\n.text-red-700 {\n  --tw-text-opacity: 1;\n  color: rgb(185 28 28 / var(--tw-text-opacity, 1));\n}\n.text-rose-600 {\n  --tw-text-opacity: 1;\n  color: rgb(225 29 72 / var(--tw-text-opacity, 1));\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.text-yellow-500 {\n  --tw-text-opacity: 1;\n  color: rgb(234 179 8 / var(--tw-text-opacity, 1));\n}\n.text-yellow-600 {\n  --tw-text-opacity: 1;\n  color: rgb(202 138 4 / var(--tw-text-opacity, 1));\n}\n.underline {\n  text-decoration-line: underline;\n}\n.antialiased {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.opacity-0 {\n  opacity: 0;\n}\n.opacity-25 {\n  opacity: 0.25;\n}\n.opacity-70 {\n  opacity: 0.7;\n}\n.opacity-75 {\n  opacity: 0.75;\n}\n.opacity-80 {\n  opacity: 0.8;\n}\n.shadow {\n  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-lg {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-md {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-sm {\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.shadow-blue-500\\/20 {\n  --tw-shadow-color: rgb(59 130 246 / 0.2);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.shadow-gray-500\\/10 {\n  --tw-shadow-color: rgb(107 114 128 / 0.1);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.shadow-red-500\\/20 {\n  --tw-shadow-color: rgb(239 68 68 / 0.2);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.shadow-teal-500\\/20 {\n  --tw-shadow-color: rgb(20 184 166 / 0.2);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.outline {\n  outline-style: solid;\n}\n.ring-2 {\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n}\n.ring-emerald-500 {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(16 185 129 / var(--tw-ring-opacity, 1));\n}\n.ring-gray-600 {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(75 85 99 / var(--tw-ring-opacity, 1));\n}\n.blur {\n  --tw-blur: blur(8px);\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.drop-shadow {\n  --tw-drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.filter {\n  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);\n}\n.transition {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-all {\n  transition-property: all;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-colors {\n  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.transition-opacity {\n  transition-property: opacity;\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n  transition-duration: 150ms;\n}\n.duration-200 {\n  transition-duration: 200ms;\n}\n.duration-300 {\n  transition-duration: 300ms;\n}\n.ease-in-out {\n  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n}\n.ease-out {\n  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);\n}\n\n#root {\n  width: 100%;\n  height: 100vh;\n  display: flex;\n}\n\n/* Centralni deo - ograničen i centriran */\nion-split-pane {\n  --side-width: 250px;\n  --side-max-width: 300px;\n}\n\nion-router-outlet {\n  max-width: 1100px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n/* Glavni sadržaj stranice */\nion-content {\n  max-width: 1100px;\n  margin: 0 auto;\n  width: 100%;\n}\n\n:root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-text-size-adjust: 100%;\n\n  --swiper-navigation-color: #803205;\n  --swiper-navigation-size: 22px;\n}\n\n/* Autofill styles - use Ionic CSS variables */\ninput:-webkit-autofill,\ninput:-webkit-autofill:hover,\ninput:-webkit-autofill:focus,\ninput:-webkit-autofill:active {\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: var(--ion-text-color);\n  -webkit-transition: background-color 5000s ease-in-out 0s;\n  transition: background-color 5000s ease-in-out 0s;\n  box-shadow: inset 0 0 20px 20px var(--ion-background-color);\n}\n\n.swiper-button-next,\n.swiper-button-prev {\n  color: var(--swiper-navigation-color) !important;\n  width: var(--swiper-navigation-size) !important;\n  height: var(--swiper-navigation-size) !important;\n}\n\n.swiper-button-next::after,\n.swiper-button-prev::after {\n  font-size: var(--swiper-navigation-size) !important;\n}\n\n.swiper-pagination-bullet-active {\n  background-color: var(--swiper-navigation-color) !important;\n}\n\n/* Outline buttons in dark mode - ensure visible borders and text */\n.ion-palette-dark ion-button[color='dark'][fill='outline'] .button-native {\n  border-color: #ffffff !important;\n  color: #ffffff !important;\n}\n.hover\\:bg-blue-600:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));\n}\n.hover\\:bg-gray-100:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));\n}\n.hover\\:bg-gray-50:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));\n}\n.hover\\:text-blue-300:hover {\n  --tw-text-opacity: 1;\n  color: rgb(147 197 253 / var(--tw-text-opacity, 1));\n}\n.hover\\:underline:hover {\n  text-decoration-line: underline;\n}\n.hover\\:opacity-80:hover {\n  opacity: 0.8;\n}\n.hover\\:shadow-lg:hover {\n  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.hover\\:shadow-md:hover {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.hover\\:shadow-blue-500\\/40:hover {\n  --tw-shadow-color: rgb(59 130 246 / 0.4);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.hover\\:shadow-red-500\\/40:hover {\n  --tw-shadow-color: rgb(239 68 68 / 0.4);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.hover\\:shadow-teal-500\\/40:hover {\n  --tw-shadow-color: rgb(20 184 166 / 0.4);\n  --tw-shadow: var(--tw-shadow-colored);\n}\n.focus\\:outline-none:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n}\n.active\\:opacity-\\[0\\.85\\]:active {\n  opacity: 0.85;\n}\n.disabled\\:pointer-events-none:disabled {\n  pointer-events: none;\n}\n.disabled\\:opacity-50:disabled {\n  opacity: 0.5;\n}\n.disabled\\:shadow-none:disabled {\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n.dark\\:divide-gray-700:is(.dark *) > :not([hidden]) ~ :not([hidden]) {\n  --tw-divide-opacity: 1;\n  border-color: rgb(55 65 81 / var(--tw-divide-opacity, 1));\n}\n.dark\\:border-gray-500:is(.dark *) {\n  --tw-border-opacity: 1;\n  border-color: rgb(107 114 128 / var(--tw-border-opacity, 1));\n}\n.dark\\:border-gray-600:is(.dark *) {\n  --tw-border-opacity: 1;\n  border-color: rgb(75 85 99 / var(--tw-border-opacity, 1));\n}\n.dark\\:border-gray-700:is(.dark *) {\n  --tw-border-opacity: 1;\n  border-color: rgb(55 65 81 / var(--tw-border-opacity, 1));\n}\n.dark\\:border-b-gray-600\\/70:is(.dark *) {\n  border-bottom-color: rgb(75 85 99 / 0.7);\n}\n.dark\\:border-l-gray-500:is(.dark *) {\n  --tw-border-opacity: 1;\n  border-left-color: rgb(107 114 128 / var(--tw-border-opacity, 1));\n}\n.dark\\:bg-\\[var\\(--ion-background-color\\)\\]:is(.dark *) {\n  background-color: var(--ion-background-color);\n}\n.dark\\:bg-emerald-400:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(52 211 153 / var(--tw-bg-opacity, 1));\n}\n.dark\\:bg-gray-100:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));\n}\n.dark\\:bg-gray-600:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(75 85 99 / var(--tw-bg-opacity, 1));\n}\n.dark\\:bg-gray-800:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));\n}\n.dark\\:bg-gray-900:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(17 24 39 / var(--tw-bg-opacity, 1));\n}\n.dark\\:bg-white:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));\n}\n.dark\\:text-blue-400:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(96 165 250 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-100:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(243 244 246 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-200:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(229 231 235 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-300:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(209 213 219 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-400:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(156 163 175 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-500:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(107 114 128 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-600:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-gray-900:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(17 24 39 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-green-500:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(34 197 94 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-red-400:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(248 113 113 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-white:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity, 1));\n}\n.dark\\:text-yellow-400:is(.dark *) {\n  --tw-text-opacity: 1;\n  color: rgb(250 204 21 / var(--tw-text-opacity, 1));\n}\n.dark\\:ring-emerald-400:is(.dark *) {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(52 211 153 / var(--tw-ring-opacity, 1));\n}\n.dark\\:ring-gray-400:is(.dark *) {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity, 1));\n}\n.dark\\:hover\\:bg-gray-800:hover:is(.dark *) {\n  --tw-bg-opacity: 1;\n  background-color: rgb(31 41 55 / var(--tw-bg-opacity, 1));\n}\n@media (min-width: 480px) {\n\n  .sm\\:flex-row {\n    flex-direction: row;\n  }\n\n  .sm\\:items-center {\n    align-items: center;\n  }\n\n  .sm\\:justify-between {\n    justify-content: space-between;\n  }\n}\n@media (min-width: 768px) {\n\n  .md\\:block {\n    display: block;\n  }\n\n  .md\\:hidden {\n    display: none;\n  }\n\n  .md\\:grid-cols-2 {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n}\n@media (min-width: 976px) {\n\n  .lg\\:grid-cols-3 {\n    grid-template-columns: repeat(3, minmax(0, 1fr));\n  }\n}\n\n/*\n * Ionic Variables and Theming\n * ----------------------------------------------------------------------------\n * For more information, please see\n * https://www.ionicframework.com/docs/theming/\n */\n\n/*\n * Ionic Colors\n * ----------------------------------------------------------------------------\n * Named colors make it easy to reuse colors on various components.\n * It's highly recommended to change the default colors\n * to match your app's branding. Ionic provides nine layered colors\n * that can be changed to theme an app. Additional colors can be\n * added as well (see below). For more information, please see\n * https://www.ionicframework.com/docs/theming/colors\n *\n * To easily create custom color palettes for your app’s UI,\n * check out our color generator:\n * https://www.ionicframework.com/docs/theming/color-generator\n */\n :root {\n  /** primary **/\n  --ion-color-primary: #3880ff;\n  --ion-color-primary-rgb: 56, 128, 255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255, 255, 255;\n  --ion-color-primary-shade: #3171e0;\n  --ion-color-primary-tint: #4c8dff;\n\n  /** secondary **/\n  --ion-color-secondary: #3dc2ff;\n  --ion-color-secondary-rgb: 61, 194, 255;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255, 255, 255;\n  --ion-color-secondary-shade: #36abe0;\n  --ion-color-secondary-tint: #50c8ff;\n\n  /** tertiary **/\n  --ion-color-tertiary: #5260ff;\n  --ion-color-tertiary-rgb: 82, 96, 255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255, 255, 255;\n  --ion-color-tertiary-shade: #4854e0;\n  --ion-color-tertiary-tint: #6370ff;\n\n  /** success **/\n  --ion-color-success: #2dd36f;\n  --ion-color-success-rgb: 45, 211, 111;\n  --ion-color-success-contrast: #ffffff;\n  --ion-color-success-contrast-rgb: 255, 255, 255;\n  --ion-color-success-shade: #28ba62;\n  --ion-color-success-tint: #42d77d;\n\n  /** warning **/\n  --ion-color-warning: #ffc409;\n  --ion-color-warning-rgb: 255, 196, 9;\n  --ion-color-warning-contrast: #000000;\n  --ion-color-warning-contrast-rgb: 0, 0, 0;\n  --ion-color-warning-shade: #e0ac08;\n  --ion-color-warning-tint: #ffca22;\n\n  /** danger **/\n  --ion-color-danger: #eb445a;\n  --ion-color-danger-rgb: 235, 68, 90;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255, 255, 255;\n  --ion-color-danger-shade: #cf3c4f;\n  --ion-color-danger-tint: #ed576b;\n\n  /** dark **/\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 36, 40;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n\n  /** medium **/\n  --ion-color-medium: #92949c;\n  --ion-color-medium-rgb: 146, 148, 156;\n  --ion-color-medium-contrast: #ffffff;\n  --ion-color-medium-contrast-rgb: 255, 255, 255;\n  --ion-color-medium-shade: #808289;\n  --ion-color-medium-tint: #9d9fa6;\n\n  /** light **/\n  --ion-color-light: #f4f5f8;\n  --ion-color-light-rgb: 244, 245, 248;\n  --ion-color-light-contrast: #000000;\n  --ion-color-light-contrast-rgb: 0, 0, 0;\n  --ion-color-light-shade: #d7d8da;\n  --ion-color-light-tint: #f5f6f9;\n}\n\n\n/*\n * Additional Ionic Colors\n * ----------------------------------------------------------------------------\n * In order to add colors to be used within Ionic components,\n * the color should be added as a class with the convention `.ion-color-{COLOR}`\n * where `{COLOR}` is the color to be used on the Ionic component.\n * For more information on adding new colors, please see\n * https://ionicframework.com/docs/theming/colors#adding-colors\n *\n * To generate the code for a new color, check out our new color creator:\n * https://ionicframework.com/docs/theming/colors#new-color-creator\n */\n\n :root {\n  --ion-color-favorite: #69bb7b;\n  --ion-color-favorite-rgb: 105,187,123;\n  --ion-color-favorite-contrast: #ffffff;\n  --ion-color-favorite-contrast-rgb: 255,255,255;\n  --ion-color-favorite-shade: #5ca56c;\n  --ion-color-favorite-tint: #78c288;\n\n  --ion-color-twitter: #1da1f4;\n  --ion-color-twitter-rgb: 29,161,244;\n  --ion-color-twitter-contrast: #ffffff;\n  --ion-color-twitter-contrast-rgb: 255,255,255;\n  --ion-color-twitter-shade: #1a8ed7;\n  --ion-color-twitter-tint: #34aaf5;\n\n  --ion-color-instagram: #5956d8;\n  --ion-color-instagram-rgb: 89,86,216;\n  --ion-color-instagram-contrast: #ffffff;\n  --ion-color-instagram-contrast-rgb: 255,255,255;\n  --ion-color-instagram-shade: #4e4cbe;\n  --ion-color-instagram-tint: #6a67dc;\n\n  --ion-color-vimeo: #23b6ea;\n  --ion-color-vimeo-rgb: 35,182,234;\n  --ion-color-vimeo-contrast: #ffffff;\n  --ion-color-vimeo-contrast-rgb: 255,255,255;\n  --ion-color-vimeo-shade: #1fa0ce;\n  --ion-color-vimeo-tint: #39bdec;\n\n  --ion-color-facebook: #3b5998;\n  --ion-color-facebook-rgb: 59,89,152;\n  --ion-color-facebook-contrast: #ffffff;\n  --ion-color-facebook-contrast-rgb: 255,255,255;\n  --ion-color-facebook-shade: #344e86;\n  --ion-color-facebook-tint: #4f6aa2;\n}\n\n.ion-color-favorite {\n  --ion-color-base: var(--ion-color-favorite);\n  --ion-color-base-rgb: var(--ion-color-favorite-rgb);\n  --ion-color-contrast: var(--ion-color-favorite-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-favorite-contrast-rgb);\n  --ion-color-shade: var(--ion-color-favorite-shade);\n  --ion-color-tint: var(--ion-color-favorite-tint);\n}\n\n.ion-color-twitter {\n  --ion-color-base: var(--ion-color-twitter);\n  --ion-color-base-rgb: var(--ion-color-twitter-rgb);\n  --ion-color-contrast: var(--ion-color-twitter-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-twitter-contrast-rgb);\n  --ion-color-shade: var(--ion-color-twitter-shade);\n  --ion-color-tint: var(--ion-color-twitter-tint);\n}\n\n.ion-color-google {\n  --ion-color-base: var(--ion-color-google);\n  --ion-color-base-rgb: var(--ion-color-google-rgb);\n  --ion-color-contrast: var(--ion-color-google-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-google-contrast-rgb);\n  --ion-color-shade: var(--ion-color-google-shade);\n  --ion-color-tint: var(--ion-color-google-tint);\n}\n\n.ion-color-instagram {\n  --ion-color-base: var(--ion-color-instagram);\n  --ion-color-base-rgb: var(--ion-color-instagram-rgb);\n  --ion-color-contrast: var(--ion-color-instagram-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-instagram-contrast-rgb);\n  --ion-color-shade: var(--ion-color-instagram-shade);\n  --ion-color-tint: var(--ion-color-instagram-tint);\n}\n\n.ion-color-vimeo {\n  --ion-color-base: var(--ion-color-vimeo);\n  --ion-color-base-rgb: var(--ion-color-vimeo-rgb);\n  --ion-color-contrast: var(--ion-color-vimeo-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-vimeo-contrast-rgb);\n  --ion-color-shade: var(--ion-color-vimeo-shade);\n  --ion-color-tint: var(--ion-color-vimeo-tint);\n}\n\n.ion-color-facebook {\n  --ion-color-base: var(--ion-color-facebook);\n  --ion-color-base-rgb: var(--ion-color-facebook-rgb);\n  --ion-color-contrast: var(--ion-color-facebook-contrast);\n  --ion-color-contrast-rgb: var(--ion-color-facebook-contrast-rgb);\n  --ion-color-shade: var(--ion-color-facebook-shade);\n  --ion-color-tint: var(--ion-color-facebook-tint);\n}\n\n.ion-color-github {\n  --ion-color-base: #211F1F;\n  --ion-color-base-rgb: 33,31,31;\n  --ion-color-contrast: #ffffff;\n  --ion-color-contrast-rgb: 255,255,255;\n  --ion-color-shade: #1d1b1b;\n  --ion-color-tint: #373535;\n}\n\n.ion-color-instagram {\n  --ion-color-base: #9537BC;\n  --ion-color-base-rgb: 149,55,188;\n  --ion-color-contrast: #ffffff;\n  --ion-color-contrast-rgb: 255,255,255;\n  --ion-color-shade: #8330a5;\n  --ion-color-tint: #a04bc3;\n}\n\n/*\n * Shared Variables\n * ----------------------------------------------------------------------------\n * To customize the look and feel of this app, you can override\n * the CSS variables found in Ionic's source files.\n * To view all of the possible Ionic variables, see:\n * https://ionicframework.com/docs/theming/css-variables#ionic-variables\n */\n\n@font-face {\n  font-family: RobotoRegular;\n  src: url(\"/app/public/assets/fonts/Roboto/Roboto-Regular.ttf\");\n}\n\n:root {\n  --ion-font-family: RobotoRegular;\n  --ion-headings-font-weight: 300;\n\n  --ion-color-angular: #ac282b;\n  --ion-color-communication: #8e8d93;\n  --ion-color-tooling: #fe4c52;\n  --ion-color-services: #fd8b2d;\n  --ion-color-design: #fed035;\n  --ion-color-workshop: #69bb7b;\n  --ion-color-food: #3bc7c4;\n  --ion-color-documentation: #b16be3;\n  --ion-color-navigation: #6600cc;\n}\n\n/*\n * App iOS Variables\n * ----------------------------------------------------------------------------\n * iOS only CSS variables can go here\n */\n\n.ios {\n\n}\n\n/*\n * App Material Design Variables\n * ----------------------------------------------------------------------------\n * Material Design only CSS variables can go here\n */\n\n.md {\n\n}\n\n/*\n * App Theme\n * ----------------------------------------------------------------------------\n * Ionic apps can have different themes applied, which can\n * then be further customized. These variables come last\n * so that the above variables are used by default.\n */\n\n/*\n * Dark Theme\n * ----------------------------------------------------------------------------\n */\n\n.dark-theme {\n\n  --ion-color-primary: #428cff;\n  --ion-color-primary-rgb: 66,140,255;\n  --ion-color-primary-contrast: #ffffff;\n  --ion-color-primary-contrast-rgb: 255,255,255;\n  --ion-color-primary-shade: #3a7be0;\n  --ion-color-primary-tint: #5598ff;\n\n  --ion-color-secondary: #50c8ff;\n  --ion-color-secondary-rgb: 80,200,255;\n  --ion-color-secondary-contrast: #ffffff;\n  --ion-color-secondary-contrast-rgb: 255,255,255;\n  --ion-color-secondary-shade: #46b0e0;\n  --ion-color-secondary-tint: #62ceff;\n\n  --ion-color-tertiary: #6a64ff;\n  --ion-color-tertiary-rgb: 106,100,255;\n  --ion-color-tertiary-contrast: #ffffff;\n  --ion-color-tertiary-contrast-rgb: 255,255,255;\n  --ion-color-tertiary-shade: #5d58e0;\n  --ion-color-tertiary-tint: #7974ff;\n\n  --ion-color-success: #2fdf75;\n  --ion-color-success-rgb: 47,223,117;\n  --ion-color-success-contrast: #000000;\n  --ion-color-success-contrast-rgb: 0,0,0;\n  --ion-color-success-shade: #29c467;\n  --ion-color-success-tint: #44e283;\n\n  --ion-color-warning: #ffd534;\n  --ion-color-warning-rgb: 255,213,52;\n  --ion-color-warning-contrast: #000000;\n  --ion-color-warning-contrast-rgb: 0,0,0;\n  --ion-color-warning-shade: #e0bb2e;\n  --ion-color-warning-tint: #ffd948;\n\n  --ion-color-danger: #ff4961;\n  --ion-color-danger-rgb: 255,73,97;\n  --ion-color-danger-contrast: #ffffff;\n  --ion-color-danger-contrast-rgb: 255,255,255;\n  --ion-color-danger-shade: #e04055;\n  --ion-color-danger-tint: #ff5b71;\n\n  --ion-color-dark: #f4f5f8;\n  --ion-color-dark-rgb: 244,245,248;\n  --ion-color-dark-contrast: #000000;\n  --ion-color-dark-contrast-rgb: 0,0,0;\n  --ion-color-dark-shade: #d7d8da;\n  --ion-color-dark-tint: #f5f6f9;\n\n  --ion-color-medium: #989aa2;\n  --ion-color-medium-rgb: 152,154,162;\n  --ion-color-medium-contrast: #000000;\n  --ion-color-medium-contrast-rgb: 0,0,0;\n  --ion-color-medium-shade: #86888f;\n  --ion-color-medium-tint: #a2a4ab;\n\n  --ion-color-light: #222428;\n  --ion-color-light-rgb: 34,36,40;\n  --ion-color-light-contrast: #ffffff;\n  --ion-color-light-contrast-rgb: 255,255,255;\n  --ion-color-light-shade: #1e2023;\n  --ion-color-light-tint: #383a3e;\n}\n\n/*\n * iOS Dark Theme\n * ----------------------------------------------------------------------------\n */\n\n.dark-theme.ioss {\n  --ion-background-color: #000000;\n  --ion-background-color-rgb: 0,0,0;\n\n  --ion-text-color: #ffffff;\n  --ion-text-color-rgb: 255,255,255;\n\n  --ion-color-step-50: #0d0d0d;\n  --ion-color-step-100: #1a1a1a;\n  --ion-color-step-150: #262626;\n  --ion-color-step-200: #333333;\n  --ion-color-step-250: #404040;\n  --ion-color-step-300: #4d4d4d;\n  --ion-color-step-350: #595959;\n  --ion-color-step-400: #666666;\n  --ion-color-step-450: #737373;\n  --ion-color-step-500: #808080;\n  --ion-color-step-550: #8c8c8c;\n  --ion-color-step-600: #999999;\n  --ion-color-step-650: #a6a6a6;\n  --ion-color-step-700: #b3b3b3;\n  --ion-color-step-750: #bfbfbf;\n  --ion-color-step-800: #cccccc;\n  --ion-color-step-850: #d9d9d9;\n  --ion-color-step-900: #e6e6e6;\n  --ion-color-step-950: #f2f2f2;\n\n  --ion-toolbar-background: #0d0d0d;\n\n  --ion-item-background: #000000;\n}\n\n\n/*\n * Material Design Dark Theme\n * ----------------------------------------------------------------------------\n */\n\n.dark-theme.md, .dark-theme.ios {\n  --ion-background-color: #121212;\n  --ion-background-color-rgb: 18,18,18;\n\n  --ion-text-color: #ffffff;\n  --ion-text-color-rgb: 255,255,255;\n\n  --ion-border-color: #222222;\n\n  --ion-color-step-50: #1e1e1e;\n  --ion-color-step-100: #2a2a2a;\n  --ion-color-step-150: #363636;\n  --ion-color-step-200: #414141;\n  --ion-color-step-250: #4d4d4d;\n  --ion-color-step-300: #595959;\n  --ion-color-step-350: #656565;\n  --ion-color-step-400: #717171;\n  --ion-color-step-450: #7d7d7d;\n  --ion-color-step-500: #898989;\n  --ion-color-step-550: #949494;\n  --ion-color-step-600: #a0a0a0;\n  --ion-color-step-650: #acacac;\n  --ion-color-step-700: #b8b8b8;\n  --ion-color-step-750: #c4c4c4;\n  --ion-color-step-800: #d0d0d0;\n  --ion-color-step-850: #dbdbdb;\n  --ion-color-step-900: #e7e7e7;\n  --ion-color-step-950: #f3f3f3;\n\n  --ion-item-background: #1e1e1e;\n\n  --ion-toolbar-background: #1f1f1f;\n\n  --ion-tab-bar-background: #1f1f1f;\n}\n\nion-toolbar.actions  {\n  --background: #050505;\n}/* Ionic Variables and Theming\n * ---------------------------------------------------------------\n * Any overrides to theme variables should be placed in this file.\n * For more information, please see:\n * http://ionicframework.com/docs/theming/\n */\n\n/* Light mode - default theme */\n:root {\n  --ion-item-border-color: var(--ion-background-color-step-200);\n  \n  /* Ensure dark color is properly defined in light theme */\n  --ion-color-dark: #222428;\n  --ion-color-dark-rgb: 34, 36, 40;\n  --ion-color-dark-contrast: #ffffff;\n  --ion-color-dark-contrast-rgb: 255, 255, 255;\n  --ion-color-dark-shade: #1e2023;\n  --ion-color-dark-tint: #383a3e;\n}\n\n/* Light mode - iOS specific */\n:root.ios {\n  --ion-background-color: var(--ion-background-color-step-50, #f2f2f6);\n  --ion-toolbar-background: var(--ion-background-color);\n  --ion-item-background: #fff;\n}\n\n/* Light mode - Material Design specific */\n:root.md {\n  --ion-background-color: var(--ion-background-color-step-100, #f9f9f9);\n  --ion-toolbar-background: var(--ion-background-color);\n  --ion-item-background: #fff;\n}\n\n/* Light mode - input fields should have white background */\n:root ion-input,\n:root ion-textarea {\n  --background: #ffffff;\n}\n\n/* Ensure light color items have white background in light theme */\n:root .ion-color-light,\n:root ion-item[color='light'] {\n  --ion-color-base: #f4f5f8;\n  --ion-color-base-rgb: 244, 245, 248;\n  --ion-color-contrast: #000000;\n  --ion-color-contrast-rgb: 0, 0, 0;\n  --background: #ffffff;\n}\n\n/* Dark mode - item background */\n.ion-palette-dark.ios,\n.ion-palette-dark.md {\n  --ion-item-background: #1e1e1e;\n}\n\n/* Dark mode - input fields should use same background as item (transparent) */\n.ion-palette-dark ion-input,\n.ion-palette-dark ion-textarea {\n  --background: transparent !important;\n}\n\n/* Override light color for items in dark mode - when color=\"light\" is used */\n.ion-palette-dark .ion-color-light,\n.ion-palette-dark ion-item[color='light'] {\n  --ion-color-base: #1e1e1e !important;\n  --ion-color-base-rgb: 30, 30, 30 !important;\n  --ion-color-contrast: #ffffff !important;\n  --ion-color-contrast-rgb: 255, 255, 255 !important;\n}\n\n/* \n * Dark color palette - Ionic's default behavior:\n * - In light theme: color='dark' = dark background (#222428) with white text\n * - In dark theme: color='dark' = light background (#f4f5f8) with black text\n * \n * Apply .dark-theme styles when ion-palette-dark is active\n * This ensures dark color inverts properly in dark theme\n */\n.ion-palette-dark {\n  /* Apply dark theme color overrides for dark color */\n  --ion-color-dark: #f4f5f8;\n  --ion-color-dark-rgb: 244, 245, 248;\n  --ion-color-dark-contrast: #000000;\n  --ion-color-dark-contrast-rgb: 0, 0, 0;\n  --ion-color-dark-shade: #d7d8da;\n  --ion-color-dark-tint: #f5f6f9;\n}\n/*$vite$:1*/";
        document.head.appendChild(__vite_style__);
        exports({
          p: getInitialData,
          q: getSavedTheme,
          t: applyTheme,
          v: saveTheme
        });
        false              && function polyfill() {
          const relList = document.createElement("link").relList;
          if (relList && relList.supports && relList.supports("modulepreload")) return;
          for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
          new MutationObserver(mutations => {
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
            if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";else fetchOpts.credentials = "same-origin";
            return fetchOpts;
          }
          function processPreload(link) {
            if (link.ep) return;
            link.ep = true;
            const fetchOpts = getFetchOpts(link);
            fetch(link.href, fetchOpts);
          }
        }();
        instance.use(Backend).use(Browser).use(initReactI18next);
        var AuthType = /* @__PURE__ */(AuthType2 => {
          AuthType2["SANCTUM"] = "sanctum";
          AuthType2["TEST"] = "test";
          AuthType2["NO_AUTH"] = "noAuth";
          return AuthType2;
        })(AuthType || {});
        var TagType$1 = exports("T", /* @__PURE__ */(TagType2 => {
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
          return TagType2;
        })(TagType$1 || {}));
        var TagId$1 = exports("b", /* @__PURE__ */(TagId2 => {
          TagId2["LIST"] = "LIST";
          return TagId2;
        })(TagId$1 || {}));
        const mainBaseQuery = (args, api, extraOptions, baseUrl) => fetchBaseQuery({
          baseUrl,
          prepareHeaders: (headers, {
            getState
          }) => {
            const appLang = instance.language === "eng" ? "en" : instance.language;
            headers.set("App-Lang", appLang);
            if (extraOptions.auth) {
              switch (extraOptions.auth) {
                case AuthType.TEST:
                  {
                    const basicToken = `${undefined}`;
                    headers.set("Authorization", `Basic ${gBase64.encode(basicToken)}`);
                    break;
                  }
                case AuthType.NO_AUTH:
                  break;
                case AuthType.SANCTUM:
                  {
                    const state = getState();
                    const token = state.user.token;
                    headers.set("Authorization", `Bearer ${token}`);
                    break;
                  }
                default:
                  headers.set("Authorization", `Bearer ${extraOptions.token}`);
                  break;
              }
            }
            return headers;
          },
          paramsSerializer: "1" ? params => {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
              if (value !== void 0 && value !== null) {
                searchParams.append(key, String(value));
              }
            });
            searchParams.append("XDEBUG_SESSION_START", "PHPSTORM");
            return searchParams.toString();
          } : void 0
        })(args, api, extraOptions);
        function customBaseQuery(baseUrl) {
          const customBaseQuery2 = async (args, api, extraOptions = {}) => {
            extraOptions = {
              auth: AuthType.SANCTUM,
              ...extraOptions
            };
            return await mainBaseQuery(args, api, extraOptions, baseUrl);
          };
          return customBaseQuery2;
        }
        const apiBaseUrl = "/api/v1";
        const sharedApiPrefix = exports("a", "");
        const sharedApi = exports("s", createApi({
          reducerPath: "sharedApi",
          baseQuery: customBaseQuery(apiBaseUrl),
          tagTypes: [TagType$1.LOCATION, TagType$1.QUESTIONNAIRE, TagType$1.QUESTIONNAIRE_DATA, TagType$1.QUESTIONNAIRE_DATA_DRAFT, TagType$1.QUESTIONNAIRE_RESTAURANT_MENU, TagType$1.TAGS, TagType$1.TAG_GROUPS, TagType$1.QA_QUESTION, TagType$1.USER, TagType$1.APP_LANG, TagType$1.TRANSLATIONS, TagType$1.CHANGE_REQUESTS, TagType$1.USER_ADDRESS, TagType$1.USER_SETTINGS, TagType$1.FOOD_ORDER],
          endpoints: () => ({})
        }));
        const initialData = window?.__INIT_DATA__;
        const initialDataLoaded = [];
        function getInitialData(name, deleteAfterGet, camelCase = false) {
          if (initialData && !initialDataLoaded.includes(name)) {
            initialDataLoaded.push(name);
            setTimeout(() => {
              deleteAfterGet && deleteInitialData(name);
            });
            if (camelCase && initialData[name]) {
              return humpsExports.camelizeKeys(initialData[name]);
            }
            return initialData[name] ?? void 0;
          }
          return void 0;
        }
        function deleteInitialData(name) {
          if (initialData && initialDataLoaded.includes(name)) {
            delete initialData[name];
          }
        }
        const logoutAction = exports("n", createAction("LOGOUT"));
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
                state.user = {
                  ...state.user,
                  ...action.payload
                };
              }
            },
            removeUser: state => {
              state.user = null;
              state.token = void 0;
            },
            setShowCompleteProfileModal: (state, action) => {
              state.showCompleteProfileModal = action.payload;
            },
            setSettings: (state, action) => {
              state.settings = action.payload;
            }
          },
          extraReducers: builder => {
            builder.addCase(logoutAction, state => {
              state.user = null;
              state.token = void 0;
            });
          }
        });
        const {
          setUser,
          updateUserData,
          removeUser,
          setShowCompleteProfileModal,
          setSettings
        } = userSlice.actions;
        exports({
          d: setUser,
          c: setShowCompleteProfileModal
        });
        const getUser = exports("m", state => state.user.user);
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
            imageModalData: void 0,
            openingTimes: [{
              day: "Monday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Tuesday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Wednesday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Thursday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Friday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Saturday",
              hours: "8:00 AM–11:45 PM"
            }, {
              day: "Sunday",
              hours: "8:00 AM–11:00 PM"
            }],
            deliveryInformation: [{
              day: "Monday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Tuesday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Wednesday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Thursday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Friday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Saturday",
              hours: "9:00 AM–11:45 PM"
            }, {
              day: "Sunday",
              hours: "9:00 AM–11:00 PM"
            }],
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
            }
          }
        });
        const getShowLoginModal = exports("h", state => state.ui.data.showLoginModal);
        const getShowImageModal = exports("i", state => state.ui.data.imageModalData?.showModal);
        const getImageModalData = exports("g", state => state.ui.data.imageModalData);
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
          setShowAddNewAddressModal
        } = uiSlices.actions;
        exports({
          e: setUiData,
          j: setShowLoginModal,
          f: closeImageModal
        });
        var UploadType = exports("U", /* @__PURE__ */(UploadType2 => {
          UploadType2["PHOTO"] = "photo";
          UploadType2["VIDEO"] = "video";
          UploadType2["FILE"] = "file";
          UploadType2["PDF"] = "pdf";
          return UploadType2;
        })(UploadType || {}));
        var UploadingAlertType = /* @__PURE__ */(UploadingAlertType2 => {
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
        const {
          setUploadState,
          resetUploadData,
          setRequiredUploadData
        } = uploadSlices.actions;
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
        const {
          setRouteState
        } = routeSlice.actions;
        const initialState = {
          notificationsToken: null,
          notificationsEnabled: true,
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
          extraReducers: builder => {
            builder.addCase(logoutAction, () => initialState);
          }
        });
        const getDeviceData = exports("k", state => state.device);
        const {
          setDeviceData,
          resetDeviceData
        } = deviceSlice.actions;
        exports("l", setDeviceData);
        const unauthorizedMiddleware = store2 => next => action => {
          if (isRejectedWithValue(action)) {
            const payload = action.payload;
            const state = store2.getState();
            if (state.user.user?.id && payload?.status === 403 && payload?.data?.data === "invalid token: permission denied") {
              store2.dispatch(logoutAction());
              sharedApi.util?.invalidateTags([TagType$1.USER]);
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
          middleware: getDefaultMiddleware => getDefaultMiddleware().concat([sharedApi.middleware, unauthorizedMiddleware])
        });
        const initializeServiceWorker = () => {
          if (!("serviceWorker" in navigator)) {
            return;
          }
          window.addEventListener("load", () => {
            const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" || window.location.hostname === "[::1]" || window.location.hostname.startsWith("192.168.") || window.location.hostname.startsWith("10.") || window.location.port === "5173";
            if (isLocalhost) {
              navigator.serviceWorker.getRegistrations().then(registrations => {
                for (const registration of registrations) {
                  registration.unregister().then(success => {
                    if (success) {
                      console.log("SW unregistered in development/localhost mode");
                    }
                  });
                }
              });
              if ("caches" in window) {
                caches.keys().then(cacheNames => {
                  return Promise.all(cacheNames.map(cacheName => {
                    return caches.delete(cacheName);
                  }));
                });
              }
              return;
            } else {
              const cleanupAndRegister = async () => {
                try {
                  const registrations = await navigator.serviceWorker.getRegistrations();
                  const unregisterPromises = registrations.map(registration => registration.unregister().catch(err => {
                    console.warn("Failed to unregister SW:", err);
                    return false;
                  }));
                  await Promise.all(unregisterPromises);
                  if ("caches" in window) {
                    try {
                      const cacheNames = await caches.keys();
                      await Promise.all(cacheNames.map(cacheName => {
                        return caches.delete(cacheName).catch(err => {
                          console.warn(`Failed to delete cache ${cacheName}:`, err);
                          return false;
                        });
                      }));
                    } catch (cacheError) {
                      console.warn("Failed to clear caches:", cacheError);
                    }
                  }
                  await new Promise(resolve => setTimeout(resolve, 100));
                  try {
                    const registration = await navigator.serviceWorker.register("/sw.js", {
                      scope: "/"
                    });
                    console.log("SW registered successfully:", registration);
                    registration.addEventListener("updatefound", () => {
                      const newWorker = registration.installing;
                      if (newWorker) {
                        newWorker.addEventListener("statechange", () => {
                          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                            console.log("New SW available, reloading page...");
                            window.location.reload();
                          }
                        });
                      }
                    });
                  } catch (registerError) {
                    console.error("SW registration failed:", registerError);
                  }
                } catch (error) {
                  console.error("Error during SW cleanup/registration:", error);
                  try {
                    await navigator.serviceWorker.register("/sw.js", {
                      scope: "/"
                    });
                  } catch (fallbackError) {
                    console.error("Fallback SW registration also failed:", fallbackError);
                  }
                }
              };
              cleanupAndRegister();
            }
          });
        };
        const ErrorFallback = ({
          error,
          resetErrorBoundary
        }) => {
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            role: "alert",
            children: [/* @__PURE__ */jsxRuntimeExports.jsx("h1", {
              className: "text-white",
              children: "Something went wrong:"
            }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              style: {
                color: "red"
              },
              children: error.message
            }), resetErrorBoundary && /* @__PURE__ */jsxRuntimeExports.jsx("button", {
              onClick: resetErrorBoundary,
              className: "mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",
              children: "Try again"
            })]
          });
        };
        const fallbackRender = ({
          error,
          resetErrorBoundary
        }) => {
          return /* @__PURE__ */jsxRuntimeExports.jsx(ErrorFallback, {
            error,
            resetErrorBoundary
          });
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
            loadPath: `${"/app/"}public/projects/${projectName}/locales/{{lng}}/{{ns}}.json`
          },
          ns: ["photoEditor", "translation"]
        }).then(() => {
          if (locale && locale !== fallbackLng) {
            instance.changeLanguage(locale);
          }
        });
        var TagType = exports("o", /* @__PURE__ */(TagType2 => {
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
          return TagType2;
        })(TagType || {}));
        var TagId = exports("u", /* @__PURE__ */(TagId2 => {
          TagId2["LIST"] = "LIST";
          return TagId2;
        })(TagId || {}));
        const apiUrl = getInitialData("rzrApiUrl") ?? "/api/v1/rzr";
        const rzrApi = exports("r", createApi({
          baseQuery: customBaseQuery(apiUrl),
          tagTypes: ["user", "location", "reservation", "client", "clientReservation", "locationWorkers", "locationWorkingHours", "workerWorkingHours", "shift", "shiftByDays", "user", "appLang", "news", "servicesGroups", "services", "locationPromoCodes", "translations", "changeRequests"
          /* CHANGE_REQUESTS */],
          endpoints: () => ({})
        }));
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
          middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
          }).concat([rzrApi.middleware, sharedApi.middleware, unauthorizedMiddleware])
        });
        const persistedStore = persistStore(store);
        class ChunkLoadErrorBoundary extends reactExports.Component {
          constructor(props) {
            super(props);
            this.state = {
              hasError: false,
              isChunkError: false
            };
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
          handleReload = () => {
            window.location.reload();
          };
          render() {
            if (this.state.hasError && this.state.isChunkError) {
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
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
                      color: "medium",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                        children: "Ažuriranje aplikacije..."
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                        children: "Nova verzija aplikacije je dostupna."
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                        children: "Stranica će se automatski osvežiti."
                      })]
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                      onClick: this.handleReload,
                      color: "primary",
                      style: {
                        marginTop: "20px"
                      },
                      children: "Osveži odmah"
                    })]
                  })
                })
              });
            }
            return this.props.children;
          }
        }
        const THEME_STORAGE_KEY = "app-theme-mode";
        function getSavedTheme() {
          if (typeof window === "undefined") return null;
          try {
            const saved = localStorage.getItem(THEME_STORAGE_KEY);
            if (saved === "light" || saved === "dark") {
              return saved;
            }
            return null;
          } catch {
            return null;
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
              observer.observe(document.documentElement, {
                childList: true
              });
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
        const App = reactExports.lazy(() => __vitePreload(() => module.import('./App-legacy-6ilZbwqB.js').then(n => n.a9), false              ? __VITE_PRELOAD__ : void 0));
        initializeTheme();
        clientExports.createRoot(document.getElementById("root")).render(
        // <React.StrictMode>
        /* @__PURE__ */
        jsxRuntimeExports.jsx(Provider, {
          store,
          children: /* @__PURE__ */jsxRuntimeExports.jsx(PersistGate, {
            loading: null,
            persistor: persistedStore,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(reactExports.Suspense, {
              fallback: null,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(ChunkLoadErrorBoundary, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(ErrorBoundary, {
                  fallbackRender,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(App, {})
                })
              })
            })
          })
        })
        // </React.StrictMode>,
        );
        initializeServiceWorker();
        defineCustomElements();
      }
    };
  });
})();
