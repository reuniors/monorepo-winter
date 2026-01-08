;
(function () {
  System.register(['./vendor_react-legacy-CFXrDSu1.js', './App-legacy-DT3CUYN8.js', './vendor_ionic-legacy-kFTPXAWE.js', './vendor_leaflet-legacy-DzrMDhpu.js', './index-legacy-D7f7Ap3o.js', './vendor_firebase-legacy-BISQ33kA.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.a3;
        useHistory = module.ak;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a6;
        WorkerForm = module.a7;
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
