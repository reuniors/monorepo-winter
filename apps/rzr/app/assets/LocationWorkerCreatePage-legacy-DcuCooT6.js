;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './App-legacy-B4qymwvx.js', './vendor_ionic-legacy-Br2UrGvg.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-C5NlRqhK.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.M;
        useHistory = module.G;
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
