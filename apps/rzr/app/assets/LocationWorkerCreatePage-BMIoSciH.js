import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-BF1Ucyx8.js";
import { a4 as useCreateWorkerMutation, a5 as WorkerForm } from "./App-BRoMxjGu.js";
import "./vendor_ionic-BiOFnPTY.js";
import "./vendor_leaflet-BGtorNQ9.js";
import "./index-CC8Rp0im.js";
import "./vendor_firebase-Z856UVCm.js";
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
