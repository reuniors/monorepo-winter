import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-DSVIR5Ln.js";
import { W as useCreateWorkerMutation, X as WorkerForm } from "./App-DmsCuVFw.js";
import "./vendor_ionic-DMW4l-HL.js";
import "./vendor_leaflet-6FPNYOO1.js";
import "./index-CnRQbzop.js";
import "./vendor_firebase-BBFHMPrQ.js";
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
