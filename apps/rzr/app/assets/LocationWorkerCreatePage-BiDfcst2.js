import { M as useTranslation, G as useHistory, j as jsxRuntimeExports } from "./vendor_react-BAn6__hR.js";
import { a9 as useCreateWorkerMutation, aa as WorkerForm } from "./App-B1XxS5D6.js";
import "./vendor_ionic-BUXN7OTv.js";
import "./vendor_leaflet-DChmu6Ei.js";
import "./index-DFR6X33s.js";
import "./vendor_firebase-BU9b2OVt.js";
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
