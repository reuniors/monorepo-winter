import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-AVDGa64O.js";
import { a4 as useCreateWorkerMutation, a5 as WorkerForm } from "./App-McS3GyVa.js";
import "./vendor_ionic-DxHtCw90.js";
import "./vendor_leaflet-Cvlut8nW.js";
import "./index-B9Vob7XV.js";
import "./vendor_firebase-Chyyt7SL.js";
const LocationWorkerCreatePage = ({
  locationSlug
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const [createWorker, { isLoading }] = useCreateWorkerMutation();
  const handleSubmit = async (data) => {
    const { userId, avatar, ...workerData } = data;
    const payload = userId ? { ...workerData, userId } : workerData;
    const result = await createWorker({ ...payload, locationSlug }).unwrap();
    history.push("/zakazivanje/podesavanja/radnici/edit/".concat(result.data.id));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    WorkerForm,
    {
      initialValues: {},
      onSubmit: handleSubmit,
      isEdit: false,
      loading: isLoading
    }
  );
};
export {
  LocationWorkerCreatePage as default
};
