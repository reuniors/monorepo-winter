import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-CcaSbe82.js";
import { a2 as useCreateWorkerMutation, a3 as WorkerForm } from "./App-DPcICXng.js";
import "./vendor_ionic-CzUq-n1w.js";
import "./vendor_leaflet-DOGRMO2m.js";
import "./index-B7fjdNWw.js";
import "./vendor_firebase-B4S_IzfU.js";
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
