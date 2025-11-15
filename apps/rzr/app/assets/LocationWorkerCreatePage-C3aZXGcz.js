import { aC as useTranslation, aD as useHistory, j as jsxRuntimeExports } from "./vendor_react-CwmcyK5O.js";
import { E as useCreateWorkerMutation, W as WorkerForm } from "./App-DPiy04Om.js";
import "./vendor_ionic-Bx5nIVFZ.js";
import "./vendor_leaflet-ibnEmoJR.js";
import "./index-BxZPnDwj.js";
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
