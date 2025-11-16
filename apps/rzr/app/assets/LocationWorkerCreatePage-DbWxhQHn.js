import { aC as useTranslation, aD as useHistory, j as jsxRuntimeExports } from "./vendor_react-CwmcyK5O.js";
import { G as useCreateWorkerMutation, W as WorkerForm } from "./App-ApQjM-oG.js";
import "./vendor_ionic-Bx5nIVFZ.js";
import "./vendor_leaflet-ibnEmoJR.js";
import "./index-BaKD2imp.js";
import "./vendor_firebase-O9nGtifs.js";
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
