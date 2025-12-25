import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-CCLq7r1n.js";
import { al as useIonRouter, a9 as useIonToast } from "./vendor_ionic-CVwFN5FQ.js";
import { N as NewsForm } from "./NewsForm-CdBcDKTk.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CiAUVRTF.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-BtUhbQB_.js";
import "./vendor_leaflet-Dv5yPm6v.js";
import "./index-C-L2pUlb.js";
import "./vendor_firebase-DAp4wSRa.js";
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
