;
(function () {
  System.register(['./vendor_react-legacy-B0yst0tN.js', './App-legacy-D5D6TSxV.js', './vendor_ionic-legacy-DYIGQWbn.js', './vendor_leaflet-legacy-DKuaEqMF.js', './index-legacy-D1XlU8IL.js', './vendor_firebase-legacy-Bicf26rb.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.aD;
        useHistory = module.aE;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a4;
        WorkerForm = module.a5;
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
