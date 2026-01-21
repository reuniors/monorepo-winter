import { M as useTranslation, I as useHistory, j as jsxRuntimeExports } from "./vendor_react-CZodnfjS.js";
import { a7 as useCreateWorkerMutation, a8 as WorkerForm } from "./App-kfoom-0N.js";
import "./vendor_ionic-DAnbjjdE.js";
import "./vendor_leaflet-DLEgU4Uz.js";
import "./index-DZE_gcZd.js";
import "./vendor_firebase-CcPbfcOR.js";
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
