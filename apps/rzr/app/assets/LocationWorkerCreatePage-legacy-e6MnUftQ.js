;
(function () {
  System.register(['./vendor_react-legacy-J-9YdXs8.js', './App-legacy-J1QG38FO.js', './vendor_ionic-legacy-qIZJoxql.js', './vendor_leaflet-legacy-CcTkPRIU.js', './index-legacy-1AgAoADQ.js', './vendor_firebase-legacy-DUkuu2E4.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.a3;
        useHistory = module.ak;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a8;
        WorkerForm = module.a9;
      }, null, null, null, null],
      execute: function () {
        const LocationWorkerCreatePage = exports("default", ({
          locationSlug
        }) => {
          const {
            t
          } = useTranslation();
          const history = useHistory();
          const [createWorker, {
            isLoading
          }] = useCreateWorkerMutation();
          const handleSubmit = async data => {
            const {
              userId,
              avatar,
              ...workerData
            } = data;
            const payload = userId ? {
              ...workerData,
              userId
            } : workerData;
            const result = await createWorker({
              ...payload,
              locationSlug
            }).unwrap();
            history.push(`/zakazivanje/podesavanja/radnici/edit/${result.data.id}`);
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(WorkerForm, {
            initialValues: {},
            onSubmit: handleSubmit,
            isEdit: false,
            loading: isLoading
          });
        });
      }
    };
  });
})();
