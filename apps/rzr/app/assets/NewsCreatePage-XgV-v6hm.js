import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-Be2cnnNd.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-CEbfXmBJ.js";
import { N as NewsForm } from "./NewsForm-Dfj7-Jmo.js";
import { a as useCreateNewsMutation } from "./news.fe-services-CjiwODgL.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-DeWcIyVH.js";
import "./vendor_leaflet-EfOgX15p.js";
import "./index-gP-eEdFZ.js";
import "./vendor_firebase-CEH7Eikm.js";
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
