;
(function () {
  System.register(['./vendor_react-legacy-J-9YdXs8.js', './vendor_ionic-legacy-qIZJoxql.js', './NewsForm-legacy-BlP9Tt6Z.js', './news.fe-services-legacy-CdjeQSfm.js', './App-legacy-CSGT8g8C.js', './vendor_leaflet-legacy-CcTkPRIU.js', './index-legacy-CKc2LGlm.js', './vendor_firebase-legacy-DUkuu2E4.js'], function (exports, module) {
    'use strict';

    var useTranslation, useParams, jsxRuntimeExports, useIonRouter, useIonToast, IonSpinner, NewsForm, useUpdateNewsMutation, useGetNewsOneQuery, LayoutMainPage, urlPrefix;
    return {
      setters: [module => {
        useTranslation = module.a3;
        useParams = module.aK;
        jsxRuntimeExports = module.j;
      }, module => {
        useIonRouter = module.al;
        useIonToast = module.u;
        IonSpinner = module.n;
      }, module => {
        NewsForm = module.N;
      }, module => {
        useUpdateNewsMutation = module.b;
        useGetNewsOneQuery = module.c;
      }, module => {
        LayoutMainPage = module.L;
        urlPrefix = module.g;
      }, null, null, null],
      execute: function () {
        exports("default", NewsEditPage);
        function NewsEditPage() {
          const {
            t
          } = useTranslation();
          const router = useIonRouter();
          const [presentToast] = useIonToast();
          const {
            id
          } = useParams();
          const [updateNews, {
            isLoading: isUpdating
          }] = useUpdateNewsMutation();
          const {
            data: newsResponse,
            isLoading: isLoadingNews
          } = useGetNewsOneQuery({
            id
          }, {
            skip: !id
          });
          const handleSubmit = async data => {
            if (!id) return;
            try {
              await updateNews({
                id,
                ...data
              }).unwrap();
              presentToast({
                message: t("Vest je uspešno ažurirana"),
                duration: 2e3,
                color: "success"
              });
              router.push(`${urlPrefix}/podesavanja/vesti`);
            } catch (error) {
              presentToast({
                message: t("Greška pri ažuriranju vesti"),
                duration: 3e3,
                color: "danger"
              });
            }
          };
          if (isLoadingNews) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
              title: t("Učitavanje..."),
              hasBackButton: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-text-center ion-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
              })
            });
          }
          if (!newsResponse?.data) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
              title: t("Greška"),
              hasBackButton: true,
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "ion-text-center ion-padding",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                  children: t("Vest nije pronađena")
                })
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx(LayoutMainPage, {
            title: t("Izmeni vest"),
            hasBackButton: true,
            children: /* @__PURE__ */jsxRuntimeExports.jsx(NewsForm, {
              news: newsResponse.data,
              onSubmit: handleSubmit,
              isLoading: isUpdating,
              isEdit: true
            })
          });
        }
      }
    };
  });
})();
