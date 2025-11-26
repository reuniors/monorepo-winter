import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-B_SHD62b.js";
import { V as useCreateWorkerMutation, W as WorkerForm } from "./App-5MUv5Yp_.js";
import "./vendor_ionic-DsqPkyBY.js";
import "./vendor_leaflet-3i4_BfO8.js";
import "./index-CQxQA23_.js";
import "./vendor_firebase-2UNIOsdf.js";
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
