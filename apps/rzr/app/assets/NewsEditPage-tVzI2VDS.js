import { aD as useTranslation, aK as useParams, j as jsxRuntimeExports } from "./vendor_react-Begs2_df.js";
import { aj as useIonRouter, a9 as useIonToast, n as IonSpinner } from "./vendor_ionic-BfPI5OT6.js";
import { N as NewsForm } from "./NewsForm-Bn6Yv-CN.js";
import { b as useUpdateNewsMutation, c as useGetNewsOneQuery } from "./news.fe-services-Rzb47yq5.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Bv0n3nAb.js";
import "./vendor_leaflet-Ccp0Txkg.js";
import "./index-CyEsMI4q.js";
import "./vendor_firebase-BY6JE5BB.js";
function NewsEditPage() {
  const { t } = useTranslation();
  const router = useIonRouter();
  const [presentToast] = useIonToast();
  const { id } = useParams();
  const [updateNews, { isLoading: isUpdating }] = useUpdateNewsMutation();
  const { data: newsResponse, isLoading: isLoadingNews } = useGetNewsOneQuery(
    { id },
    { skip: !id }
  );
  const handleSubmit = async (data) => {
    if (!id) return;
    try {
      await updateNews({ id, ...data }).unwrap();
      presentToast({
        message: t("Vest je uspešno ažurirana"),
        duration: 2e3,
        color: "success"
      });
      router.push("".concat(urlPrefix, "/podesavanja/vesti"));
    } catch (error) {
      presentToast({
        message: t("Greška pri ažuriranju vesti"),
        duration: 3e3,
        color: "danger"
      });
    }
  };
  if (isLoadingNews) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutMainPage, { title: t("Učitavanje..."), hasBackButton: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {}) }) });
  }
  if (!(newsResponse == null ? void 0 : newsResponse.data)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutMainPage, { title: t("Greška"), hasBackButton: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-text-center ion-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t("Vest nije pronađena") }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutMainPage, { title: t("Izmeni vest"), hasBackButton: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NewsForm,
    {
      news: newsResponse.data,
      onSubmit: handleSubmit,
      isLoading: isUpdating,
      isEdit: true
    }
  ) });
}
export {
  NewsEditPage as default
};
