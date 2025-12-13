import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-DSVIR5Ln.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-DMW4l-HL.js";
import { N as NewsForm } from "./NewsForm-D0TSaOLU.js";
import { a as useCreateNewsMutation } from "./news.fe-services-DIbWpoYO.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-DmsCuVFw.js";
import "./vendor_leaflet-6FPNYOO1.js";
import "./index-CnRQbzop.js";
import "./vendor_firebase-BBFHMPrQ.js";
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
