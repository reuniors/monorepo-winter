import { aC as useTranslation, aD as useHistory, j as jsxRuntimeExports } from "./vendor_react-BPEc7kYp.js";
import { E as useCreateWorkerMutation, W as WorkerForm } from "./App-B-mTjDKy.js";
import "./vendor_ionic-BMqxWymV.js";
import "./vendor_leaflet-C9Fu3KeG.js";
import "./index-C0QBvKc5.js";
import "./vendor_firebase-CuH2P4NS.js";
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
