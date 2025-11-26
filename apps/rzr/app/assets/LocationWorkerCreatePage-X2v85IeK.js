import { aD as useTranslation, aE as useHistory, j as jsxRuntimeExports } from "./vendor_react-DIPb0ryL.js";
import { W as useCreateWorkerMutation, X as WorkerForm } from "./App-BV4viTVE.js";
import "./vendor_ionic-Be4hhgUj.js";
import "./vendor_leaflet-73gyo1Vx.js";
import "./index-CyIFz9O8.js";
import "./vendor_firebase-B4BzB2N5.js";
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
