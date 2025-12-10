import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-DUHraSvm.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-COxsUFYm.js";
import { N as NewsForm } from "./NewsForm-pmtaAc1i.js";
import { a as useCreateNewsMutation } from "./news.fe-services-Dw52PloP.js";
import { s as LayoutMainPage, f as urlPrefix } from "./App-3ar7Cq0a.js";
import "./vendor_leaflet-Lu2AnQEo.js";
import "./index-CiZrsLGn.js";
import "./vendor_firebase-CC6UAdG5.js";
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
