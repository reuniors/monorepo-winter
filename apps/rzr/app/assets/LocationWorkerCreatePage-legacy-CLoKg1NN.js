;
(function () {
  System.register(['./vendor_react-legacy-DonFScn3.js', './App-legacy-CxwuunNq.js', './vendor_ionic-legacy-mZi8EIkK.js', './vendor_leaflet-legacy-CSx1IcTV.js', './index-legacy-B6X2T6eC.js', './vendor_firebase-legacy-BNHQcAgT.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.ai;
        useHistory = module.ah;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a3;
        WorkerForm = module.a4;
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
