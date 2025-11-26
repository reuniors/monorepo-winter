import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-B_SHD62b.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-DsqPkyBY.js";
import { N as NewsForm } from "./NewsForm-DIK-VL3Q.js";
import { a as useCreateNewsMutation } from "./news.fe-services-ATTd3TKr.js";
import { s as LayoutMainPage, f as urlPrefix } from "./App-5MUv5Yp_.js";
import "./vendor_leaflet-3i4_BfO8.js";
import "./index-CQxQA23_.js";
import "./vendor_firebase-2UNIOsdf.js";
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
