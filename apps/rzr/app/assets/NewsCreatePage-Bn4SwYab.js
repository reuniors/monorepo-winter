import { aD as useTranslation, j as jsxRuntimeExports } from "./vendor_react-DIPb0ryL.js";
import { aj as useIonRouter, a9 as useIonToast } from "./vendor_ionic-Be4hhgUj.js";
import { N as NewsForm } from "./NewsForm-Dif-DW32.js";
import { a as useCreateNewsMutation } from "./news.fe-services-fE-cG7C2.js";
import { s as LayoutMainPage, f as urlPrefix } from "./App-BV4viTVE.js";
import "./vendor_leaflet-73gyo1Vx.js";
import "./index-CyIFz9O8.js";
import "./vendor_firebase-B4BzB2N5.js";
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
