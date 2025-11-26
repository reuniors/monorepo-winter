import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-CkWllzXf.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-DWBJibLm.js";
import { N as NewsForm } from "./NewsForm-uUIFD8M7.js";
import { a as useCreateNewsMutation } from "./news.fe-services-BfG_dC0B.js";
import { s as LayoutMainPage, f as urlPrefix } from "./App-Bh_O7g2K.js";
import "./vendor_leaflet-Gu71t5Xc.js";
import "./index-BTCKI7vG.js";
import "./vendor_firebase-DJKa_fIS.js";
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
