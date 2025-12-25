import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-CCLq7r1n.js";
import { a4 as useCreateWorkerMutation, a5 as WorkerForm } from "./App-BtUhbQB_.js";
import "./vendor_ionic-CVwFN5FQ.js";
import "./vendor_leaflet-Dv5yPm6v.js";
import "./index-C-L2pUlb.js";
import "./vendor_firebase-DAp4wSRa.js";
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
