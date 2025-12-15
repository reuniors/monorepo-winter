import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-CDpfJxnK.js";
import { a2 as useCreateWorkerMutation, a3 as WorkerForm } from "./App-CTu3eXM2.js";
import "./vendor_ionic-ZVUk9kYn.js";
import "./vendor_leaflet-C9fBH8Uj.js";
import "./index-yaxBA1B3.js";
import "./vendor_firebase-2Hq2X7Xz.js";
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
