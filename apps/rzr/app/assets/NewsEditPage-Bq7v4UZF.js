import { a3 as useTranslation, aK as useParams, j as jsxRuntimeExports } from "./vendor_react-B3gTLzrh.js";
import { al as useIonRouter, u as useIonToast, n as IonSpinner } from "./vendor_ionic-Bk4xGa1M.js";
import { N as NewsForm } from "./NewsForm-COJ04A8X.js";
import { b as useUpdateNewsMutation, c as useGetNewsOneQuery } from "./news.fe-services-CKhKJ2Ds.js";
import { L as LayoutMainPage, f as urlPrefix } from "./App-Zs0gdlX8.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./index-B1uhtDiW.js";
import "./vendor_firebase-Pt9WfZwV.js";
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
