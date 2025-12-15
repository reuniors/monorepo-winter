;
(function () {
  System.register(['./vendor_react-legacy-B8lcDdWC.js', './App-legacy-Dxsizkch.js', './vendor_ionic-legacy-DHCFIBri.js', './vendor_leaflet-legacy-CM2JtPiy.js', './index-legacy-Yl7KTZ0d.js', './vendor_firebase-legacy-wVCteeen.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.aD;
        useHistory = module.aE;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a2;
        WorkerForm = module.a3;
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
