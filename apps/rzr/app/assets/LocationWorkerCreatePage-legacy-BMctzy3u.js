;
(function () {
  System.register(['./vendor_react-legacy-j-OXaHGn.js', './App-legacy-C1PSXo8s.js', './vendor_ionic-legacy-B27OJI2l.js', './vendor_leaflet-legacy-aVamlEE1.js', './index-legacy-DzaXWAZQ.js', './vendor_firebase-legacy-BLL9XPHC.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.aD;
        useHistory = module.aE;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.W;
        WorkerForm = module.X;
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
