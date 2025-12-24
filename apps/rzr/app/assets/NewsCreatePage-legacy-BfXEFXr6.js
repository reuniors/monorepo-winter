;
(function () {
  System.register(['./vendor_react-legacy-BvXhJo_m.js', './vendor_ionic-legacy-dqJd8vxA.js', './NewsForm-legacy-DukY1S51.js', './news.fe-services-legacy-Cr3UKkqV.js', './App-legacy-6uxV_yyL.js', './vendor_leaflet-legacy-DGSDSOBP.js', './index-legacy-BNd-0eI_.js', './vendor_firebase-legacy-G_df00wk.js'], function (exports, module) {
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
