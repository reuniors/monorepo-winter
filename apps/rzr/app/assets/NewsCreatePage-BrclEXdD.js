import { ai as useTranslation, j as jsxRuntimeExports } from "./vendor_react-BVRDO8z9.js";
import { al as useIonRouter, a9 as useIonToast } from "./vendor_ionic-CnFg9owC.js";
import { N as NewsForm } from "./NewsForm-CoSFxHFw.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CBRvtksj.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Bv-Um4fR.js";
import "./vendor_leaflet-BdieFp9x.js";
import "./index-Ied8tlTH.js";
import "./vendor_firebase-DKsXaMug.js";
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
