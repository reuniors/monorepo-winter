;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './NewsForm-legacy-DstnmGVe.js', './news.fe-services-legacy-BIoRsKrF.js', './App-legacy-BEzc__N_.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-BVEqw4ar.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var useTranslation, jsxRuntimeExports, useIonRouter, useIonToast, NewsForm, useCreateNewsMutation, LayoutMainPage, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.M;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.ao;
        useIonToast = module.u;
      }, module => {
        NewsForm = module.N;
      }, module => {
        useCreateNewsMutation = module.a;
      }, module => {
        LayoutMainPage = module.L;
        urlPrefix = module.g;
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
