;
(function () {
  System.register(['./vendor_react-legacy-BlcubaNj.js', './App-legacy-B_CrLuzT.js', './vendor_ionic-legacy-DMDRhAuO.js', './vendor_leaflet-legacy-C0625EaZ.js', './index-legacy-D4TPg-pG.js', './vendor_firebase-legacy-Cowo1GnG.js'], function (exports, module) {
    'use strict';

    var useTranslation, useHistory, jsxRuntimeExports, useCreateWorkerMutation, WorkerForm;
    return {
      setters: [module => {
        useTranslation = module.ap;
        useHistory = module.aq;
        jsxRuntimeExports = module.j;
      }, module => {
        useCreateWorkerMutation = module.z;
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
