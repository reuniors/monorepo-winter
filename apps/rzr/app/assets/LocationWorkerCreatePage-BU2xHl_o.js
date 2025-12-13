import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-Be2cnnNd.js";
import { W as useCreateWorkerMutation, X as WorkerForm } from "./App-DeWcIyVH.js";
import "./vendor_ionic-CEbfXmBJ.js";
import "./vendor_leaflet-EfOgX15p.js";
import "./index-gP-eEdFZ.js";
import "./vendor_firebase-CEH7Eikm.js";
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
