;
(function () {
  System.register(['./vendor_react-legacy-3NN3kxAt.js', './App-legacy-DGOCT5cL.js', './vendor_ionic-legacy-O-KkNIDb.js', './vendor_leaflet-legacy-D7880HPH.js', './index-legacy-BCs5NMF5.js', './vendor_firebase-legacy-PP5vvGhm.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.ai;
        useHistory = module.ah;
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
