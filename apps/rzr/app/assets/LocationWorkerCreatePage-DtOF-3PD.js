import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-Begs2_df.js";
import { a4 as useCreateWorkerMutation, a5 as WorkerForm } from "./App-Ctlu7R2P.js";
import "./vendor_ionic-BfPI5OT6.js";
import "./vendor_leaflet-Ccp0Txkg.js";
import "./index-Pjp-BPoc.js";
import "./vendor_firebase-BY6JE5BB.js";
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
