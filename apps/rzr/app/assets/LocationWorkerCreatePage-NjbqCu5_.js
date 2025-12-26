import { ai as useTranslation, ah as useHistory, j as jsxRuntimeExports } from "./vendor_react-Dl-vfqHg.js";
import { a3 as useCreateWorkerMutation, a4 as WorkerForm } from "./App-Ryha8Grr.js";
import "./vendor_ionic-DT63KrXZ.js";
import "./vendor_leaflet-CMAV6dQB.js";
import "./index-DhtA5eBI.js";
import "./vendor_firebase-CwUSvu6C.js";
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
