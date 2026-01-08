import { a3 as useTranslation, j as jsxRuntimeExports } from "./vendor_react-LOGlbA9o.js";
import { al as useIonRouter, u as useIonToast } from "./vendor_ionic-D94VuZ44.js";
import { N as NewsForm } from "./NewsForm-DJWwNDTz.js";
import { a as useCreateNewsMutation } from "./news.fe-services-ByKBkhA1.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Byz-BlJA.js";
import "./vendor_leaflet-DPGBd-b-.js";
import "./index-DB6rcYif.js";
import "./vendor_firebase-BP40AiT5.js";
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
