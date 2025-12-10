import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-DUHraSvm.js";
import { W as useCreateWorkerMutation, X as WorkerForm } from "./App-3ar7Cq0a.js";
import "./vendor_ionic-COxsUFYm.js";
import "./vendor_leaflet-Lu2AnQEo.js";
import "./index-CiZrsLGn.js";
import "./vendor_firebase-CC6UAdG5.js";
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
