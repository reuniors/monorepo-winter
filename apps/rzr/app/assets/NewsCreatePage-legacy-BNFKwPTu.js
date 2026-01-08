;
(function () {
  System.register(['./vendor_react-legacy-BJQu1VnE.js', './vendor_ionic-legacy-C5RSb9DR.js', './NewsForm-legacy-iuchWTny.js', './news.fe-services-legacy-D-7U0bbb.js', './App-legacy-CeIZSQzJ.js', './vendor_leaflet-legacy-VV-trcYk.js', './index-legacy-SMp-2h98.js', './vendor_firebase-legacy-BEYs4Jgn.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, useIonRouter, useIonToast, NewsForm, useCreateNewsMutation, LayoutMainPage, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.a3;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.al;
        useIonToast = module.u;
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
