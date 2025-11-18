import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-D2bpVGXr.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-31A1eU6n.js";
import { N as NewsForm } from "./NewsForm-BJ1h6VQf.js";
import { a as useCreateNewsMutation } from "./news.fe-services-DXKh_h2y.js";
import { s as LayoutMainPage, f as urlPrefix } from "./App-NJG84E_P.js";
import "./vendor_leaflet-DZM5QjPU.js";
import "./index-D3Szu2cc.js";
import "./vendor_firebase-DcKiwNms.js";
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
