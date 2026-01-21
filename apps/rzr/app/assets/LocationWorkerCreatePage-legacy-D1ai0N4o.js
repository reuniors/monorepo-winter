;
(function () {
  System.register(['./vendor_react-legacy-CSf8zLqi.js', './App-legacy-CRCzN3kk.js', './vendor_ionic-legacy-DvZl6sBE.js', './vendor_leaflet-legacy-DUCVU90d.js', './index-legacy-CYMNsaJ2.js', './vendor_firebase-legacy-tNokQwyN.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.M;
        useHistory = module.I;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a7;
        WorkerForm = module.a8;
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
