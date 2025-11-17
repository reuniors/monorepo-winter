;
(function () {
  System.register(['./vendor_react-legacy-DV1SlEeb.js', './App-legacy-DaMGkUa_.js', './vendor_ionic-legacy-E6_G7KHN.js', './vendor_leaflet-legacy-DEZLfQ5q.js', './index-legacy-BsCYJ2SO.js', './vendor_firebase-legacy-auYnrKck.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.aC;
        useHistory = module.aD;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.G;
        WorkerForm = module.W;
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
