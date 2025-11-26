import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-CkWllzXf.js";
import { V as useCreateWorkerMutation, W as WorkerForm } from "./App-Bh_O7g2K.js";
import "./vendor_ionic-DWBJibLm.js";
import "./vendor_leaflet-Gu71t5Xc.js";
import "./index-BTCKI7vG.js";
import "./vendor_firebase-DJKa_fIS.js";
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
