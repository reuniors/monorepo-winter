import { ai as useTranslation, j as jsxRuntimeExports } from "./vendor_react-Dl-vfqHg.js";
import { al as useIonRouter, a9 as useIonToast } from "./vendor_ionic-DT63KrXZ.js";
import { N as NewsForm } from "./NewsForm-CsFpdYUQ.js";
import { a as useCreateNewsMutation } from "./news.fe-services-D23Pauxh.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Ryha8Grr.js";
import "./vendor_leaflet-CMAV6dQB.js";
import "./index-DhtA5eBI.js";
import "./vendor_firebase-CwUSvu6C.js";
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
