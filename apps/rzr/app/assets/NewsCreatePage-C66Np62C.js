import { M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-CZodnfjS.js";
import { ao as useIonRouter, u as useIonToast } from "./vendor_ionic-DAnbjjdE.js";
import { N as NewsForm } from "./NewsForm-D2SMLZbe.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CQz-hxru.js";
import { L as LayoutMainPage, g as urlPrefix } from "./App-kfoom-0N.js";
import "./vendor_leaflet-DLEgU4Uz.js";
import "./index-DZE_gcZd.js";
import "./vendor_firebase-CcPbfcOR.js";
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
