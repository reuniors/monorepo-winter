import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-Begs2_df.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-BfPI5OT6.js";
import { N as NewsForm } from "./NewsForm-Bn6Yv-CN.js";
import { a as useCreateNewsMutation } from "./news.fe-services-Rzb47yq5.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Bv0n3nAb.js";
import "./vendor_leaflet-Ccp0Txkg.js";
import "./index-CyEsMI4q.js";
import "./vendor_firebase-BY6JE5BB.js";
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
