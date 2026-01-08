import { a3 as useTranslation, ak as useHistory, j as jsxRuntimeExports } from "./vendor_react-B3gTLzrh.js";
import { a6 as useCreateWorkerMutation, a7 as WorkerForm } from "./App-Zs0gdlX8.js";
import "./vendor_ionic-Bk4xGa1M.js";
import "./vendor_leaflet-CW_5KyQe.js";
import "./index-B1uhtDiW.js";
import "./vendor_firebase-Pt9WfZwV.js";
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
