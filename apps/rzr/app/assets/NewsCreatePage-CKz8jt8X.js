import { M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-g1Lb8P9R.js";
import { ao as useIonRouter, u as useIonToast } from "./vendor_ionic-XqfGltiy.js";
import { N as NewsForm } from "./NewsForm-Bg7pIfRs.js";
import { a as useCreateNewsMutation } from "./news.fe-services-B4M2ixvF.js";
import { L as LayoutMainPage, g as urlPrefix } from "./App-BTZwZ6xb.js";
import "./vendor_leaflet-BPPv1iLj.js";
import "./index-BVYNZAUg.js";
import "./vendor_firebase-DofBCW2C.js";
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
