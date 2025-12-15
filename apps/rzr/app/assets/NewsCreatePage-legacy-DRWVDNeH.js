;
(function () {
  System.register(['./vendor_react-legacy-B8lcDdWC.js', './vendor_ionic-legacy-DHCFIBri.js', './NewsForm-legacy-BT7yw-2J.js', './news.fe-services-legacy-Ct-Imrdw.js', './App-legacy-CdiC__0s.js', './vendor_leaflet-legacy-CM2JtPiy.js', './index-legacy-CTRrzI45.js', './vendor_firebase-legacy-wVCteeen.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, useIonRouter, useIonToast, NewsForm, useCreateNewsMutation, LayoutMainPage, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.aj;
        useIonToast = module.a9;
      }, module => {
        NewsForm = module.N;
      }, module => {
        useCreateNewsMutation = module.a;
      }, module => {
        LayoutMainPage = module.L;
        urlPrefix = module.f;
      }, null, null, null],
      execute: function () {
        exports("default", NewsCreatePage);
        function NewsCreatePage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [presentToast] = useIonToast();
          const [createNews, {
            isLoading
          }] = useCreateNewsMutation();
          const handleSubmit = async data => {
            try {
              await createNews(data).unwrap();
              presentToast({
                message: t("Vest je uspešno kreirana"),
                duration: 2e3,
                color: "success"
              });
              router.push(`${urlPrefix}/podesavanja/vesti`);
            } catch (error) {
              presentToast({
                message: t("Greška pri kreiranju vesti"),
                duration: 3e3,
                color: "danger"
              });
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Nova vest"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NewsForm, {
              onSubmit: handleSubmit,
              isLoading,
              isEdit: false
            })
          });
        }
      }
    };
  });
})();
