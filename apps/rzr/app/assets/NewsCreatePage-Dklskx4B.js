import { a3 as useTranslation, j as jsxRuntimeExports } from "./vendor_react-B3gTLzrh.js";
import { al as useIonRouter, u as useIonToast } from "./vendor_ionic-Bk4xGa1M.js";
import { N as NewsForm } from "./NewsForm-COJ04A8X.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CKhKJ2Ds.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Zs0gdlX8.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./index-B1uhtDiW.js";
import "./vendor_firebase-Pt9WfZwV.js";
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
