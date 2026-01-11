import { M as useTranslation, G as useHistory, j as jsxRuntimeExports } from "./vendor_react-qB5C-kEe.js";
import { a8 as useCreateWorkerMutation, a9 as WorkerForm } from "./App-CXosnGFT.js";
import "./vendor_ionic-Dg_6JWqB.js";
import "./vendor_leaflet-qZKAsj11.js";
import "./index-DHkbSrdz.js";
import "./vendor_firebase-BHFFFgOS.js";
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
