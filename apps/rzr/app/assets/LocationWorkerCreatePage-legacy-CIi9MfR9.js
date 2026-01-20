;
(function () {
  System.register(['./vendor_react-legacy-DX-mYdP5.js', './App-legacy-D9i3zTWV.js', './vendor_ionic-legacy-DitOK8Rz.js', './vendor_leaflet-legacy-DW0hIt0g.js', './index-legacy-C1Nz3TCW.js', './vendor_firebase-legacy-CM5O5LjC.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.M;
        useHistory = module.G;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.a9;
        WorkerForm = module.aa;
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
