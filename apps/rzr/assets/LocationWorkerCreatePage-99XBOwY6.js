import { ap as useTranslation, aq as useHistory, j as jsxRuntimeExports } from "./vendor_react-Dna2AK9N.js";
import { z as useCreateWorkerMutation, W as WorkerForm } from "./App-D9vbFQN1.js";
import "./vendor_ionic-DxRiTffW.js";
import "./vendor_leaflet-DNRNsWmZ.js";
import "./index-DWAtctn1.js";
import "./vendor_firebase-BjBnt0gj.js";
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
