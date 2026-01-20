import { M as useTranslation, G as useHistory, j as jsxRuntimeExports } from "./vendor_react-g1Lb8P9R.js";
import { a9 as useCreateWorkerMutation, aa as WorkerForm } from "./App-BTZwZ6xb.js";
import "./vendor_ionic-XqfGltiy.js";
import "./vendor_leaflet-BPPv1iLj.js";
import "./index-BVYNZAUg.js";
import "./vendor_firebase-DofBCW2C.js";
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
