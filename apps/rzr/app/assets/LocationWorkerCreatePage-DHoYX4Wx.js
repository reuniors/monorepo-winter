import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-B_GNTQkY.js";
import { a4 as useCreateWorkerMutation, a5 as WorkerForm } from "./App-DUJk1ofP.js";
import "./vendor_ionic-BgkSNDC1.js";
import "./vendor_leaflet-Dg6qYX7z.js";
import "./index-C9pdRbuJ.js";
import "./vendor_firebase-9X84xifg.js";
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
