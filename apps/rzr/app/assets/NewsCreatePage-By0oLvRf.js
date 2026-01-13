import { M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { ao as useIonRouter, u as useIonToast } from "./vendor_ionic-BUXN7OTv.js";
import { N as NewsForm } from "./NewsForm-COrKAJwX.js";
import { a as useCreateNewsMutation } from "./news.fe-services-BVfZikg7.js";
import { L as LayoutMainPage, g as urlPrefix } from "./App-FZ41U8hJ.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./index-7S9lYcjM.js";
import "./vendor_firebase-BU9b2OVt.js";
function NewsCreatePage() {
  const { t } = useTranslation();
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const [createNews, { isLoading }] = useCreateNewsMutation();
  const handleSubmit = async (data) => {
    try {
      await createNews(data).unwrap();
      presentToast({
        message: t("Vest je uspešno kreirana"),
        duration: 2e3,
        color: "success"
      });
      router.push("".concat(urlPrefix, "/podesavanja/vesti"));
    } catch (error) {
      presentToast({
        message: t("Greška pri kreiranju vesti"),
        duration: 3e3,
        color: "danger"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutMainPage, { title: t("Nova vest"), hasBackButton: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NewsForm, { onSubmit: handleSubmit, isLoading, isEdit: false }) });
}
export {
  NewsCreatePage as default
};
