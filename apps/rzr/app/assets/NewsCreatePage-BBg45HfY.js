import { M as useTranslation, j as jsxRuntimeExports } from "./vendor_react-qB5C-kEe.js";
import { ao as useIonRouter, u as useIonToast } from "./vendor_ionic-Dg_6JWqB.js";
import { N as NewsForm } from "./NewsForm-nDHOlIKR.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CEiA5Jyj.js";
import { L as LayoutMainPage, g as urlPrefix } from "./App-CXosnGFT.js";
import "./vendor_leaflet-qZKAsj11.js";
import "./index-DHkbSrdz.js";
import "./vendor_firebase-BHFFFgOS.js";
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
