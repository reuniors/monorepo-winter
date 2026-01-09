import { a3 as useTranslation, j as jsxRuntimeExports } from "./vendor_react-CMjr4Gvv.js";
import { al as useIonRouter, u as useIonToast } from "./vendor_ionic-7y52xm55.js";
import { N as NewsForm } from "./NewsForm-LH2_mBpc.js";
import { a as useCreateNewsMutation } from "./news.fe-services-hiE9_URR.js";
import { L as LayoutMainPage, g as urlPrefix } from "./App-CNuYiPPZ.js";
import "./vendor_leaflet-0lyiJUDC.js";
import "./index-DHw_Gx8b.js";
import "./vendor_firebase-BM_4Mc6z.js";
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
