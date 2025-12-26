;
(function () {
  System.register(['./vendor_react-legacy-3NN3kxAt.js', './vendor_ionic-legacy-O-KkNIDb.js', './App-legacy-TNpJykv7.js', './vendor_leaflet-legacy-D7880HPH.js', './index-legacy-C1Ac2ckm.js', './vendor_firebase-legacy-PP5vvGhm.js'], function (exports, module) {
    'use strict';

    var useTranslation, reactExports, jsxRuntimeExports, IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonIcon, timeOutline, IonButton, addOutline, IonCardContent, peopleOutline, IonList, IonAvatar, IonLabel, IonSegment, IonSegmentButton, useGetLocationWorkingHoursQuery, WorkingHoursList, WorkingHoursForm, useGetWorkerWorkingHoursQuery, activeLocation;
    return {
      setters: [module => {
        useTranslation = module.ai;
        reactExports = module.e;
        jsxRuntimeExports = module.j;
      }, module => {
        IonSpinner = module.n;
        IonCard = module.a_;
        IonCardHeader = module.b0;
        IonCardTitle = module.b1;
        IonIcon = module.l;
        timeOutline = module.ae;
        IonButton = module.d;
        addOutline = module.a6;
        IonCardContent = module.a$;
        peopleOutline = module.aM;
        IonList = module.F;
        IonAvatar = module.be;
        IonLabel = module.E;
        IonSegment = module.aG;
        IonSegmentButton = module.aH;
      }, module => {
        useGetLocationWorkingHoursQuery = module.B;
        WorkingHoursList = module.W;
        WorkingHoursForm = module.E;
        useGetWorkerWorkingHoursQuery = module.G;
        activeLocation = module.k;
      }, null, null, null],
      execute: function () {
        exports("default", LocationWorkingTimePage);
        function LocationWorkingHoursSection({
          locationSlug
        }) {
          const {
            t
          } = useTranslation();
          const [showAddForm, setShowAddForm] = reactExports.useState(false);
          const [activeWorkingTime, setActiveWorkingTime] = reactExports.useState(void 0);
          const {
            data: workingHoursResponse,
            isLoading,
            error
          } = useGetLocationWorkingHoursQuery({
            locationSlug
          });
          const workingHours = workingHoursResponse?.data || [];
          const handleShowEditForm = reactExports.useCallback(workingTime => {
            setActiveWorkingTime(workingTime);
            setShowAddForm(true);
          }, []);
          const handleAddWorkingTime = reactExports.useCallback(() => {
            setActiveWorkingTime(void 0);
            setShowAddForm(true);
          }, []);
          const handleCloseForm = reactExports.useCallback(() => {
            setShowAddForm(false);
            setActiveWorkingTime(void 0);
          }, []);
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center p-8",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          if (error) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-center p-8 text-red-500",
              children: t("Greška pri učitavanju radnog vremena")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: timeOutline
                    }), t("Radno vreme lokala")]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    size: "small",
                    onClick: handleAddWorkingTime,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), t("Dodaj radno vreme")]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                className: "p-0",
                children: !workingHours?.length ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center p-4 text-gray-500",
                  children: t("Nema definisanog radnog vremena")
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(WorkingHoursList, {
                  workingHours,
                  onEdit: handleShowEditForm
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkingHoursForm, {
              isOpen: showAddForm,
              onDidDismiss: handleCloseForm,
              locationSlug,
              activeSegment: "location",
              workingTime: activeWorkingTime
            }, `${activeWorkingTime?.id}`)]
          });
        }
        function WorkersWorkingHoursSection({
          locationSlug
        }) {
          const {
            t
          } = useTranslation();
          const [showAddForm, setShowAddForm] = reactExports.useState(false);
          const [activeWorkerId, setActiveWorkerId] = reactExports.useState(void 0);
          const [activeWorkingTime, setActiveWorkingTime] = reactExports.useState(void 0);
          const {
            data: workersResponse,
            isLoading,
            error
          } = useGetWorkerWorkingHoursQuery({
            locationSlug
          });
          const workers = workersResponse?.data || [];
          const handleAddWorkerHours = reactExports.useCallback(() => {
            setActiveWorkingTime(void 0);
            setActiveWorkerId(void 0);
            setShowAddForm(true);
          }, []);
          const handleShowEditForm = reactExports.useCallback(workerId => workingTime => {
            setActiveWorkingTime(workingTime);
            setActiveWorkerId(workerId);
            setShowAddForm(true);
          }, []);
          const handleCloseForm = reactExports.useCallback(() => {
            setShowAddForm(false);
            setActiveWorkingTime(void 0);
            setActiveWorkerId(void 0);
          }, []);
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center p-8",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
            });
          }
          if (error) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "text-center p-8 text-red-500",
              children: t("Greška pri učitavanju radnog vremena radnika")
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                    className: "flex items-center gap-2",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: peopleOutline
                    }), t("Radno vreme radnika")]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    size: "small",
                    onClick: handleAddWorkerHours,
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: addOutline,
                      slot: "start"
                    }), t("Dodaj radno vreme")]
                  })]
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                children: workers.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center p-4 text-gray-500",
                  children: t("Nema definisanog radnog vremena radnika")
                }) : /* @__PURE__ */jsxRuntimeExports.jsx(IonList, {
                  children: workers.map(worker => /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "mb-4",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                      className: "flex items-center gap-2 mb-2",
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonAvatar, {
                        className: "w-8 h-8",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx("img", {
                          src: worker.avatar?.fileName || `${"/app/"}public/projects/rzr/images/avatar.svg`,
                          alt: worker.fullName
                        })
                      }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                        className: "font-medium",
                        children: worker.fullName
                      })]
                    }), !worker.workingHours?.length ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "text-center p-2 text-gray-400 ml-10",
                      children: t("Nema definisanog radnog vremena")
                    }) : /* @__PURE__ */jsxRuntimeExports.jsx(WorkingHoursList, {
                      workingHours: worker.workingHours,
                      onEdit: handleShowEditForm(worker.id)
                    })]
                  }, worker.id))
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(WorkingHoursForm, {
              isOpen: showAddForm,
              onDidDismiss: handleCloseForm,
              locationSlug,
              activeSegment: "worker",
              workingTime: activeWorkingTime,
              activeWorkerId
            }, `${activeWorkerId}-${activeWorkingTime?.id}`)]
          });
        }
        function LocationWorkingTimePage() {
          const {
            t
          } = useTranslation();
          const [activeSegment, setActiveSegment] = reactExports.useState("location");
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "ion-padding",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonSegment, {
              value: activeSegment,
              onIonChange: e => setActiveSegment(e.detail.value),
              className: "mb-4",
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonSegmentButton, {
                value: "location",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: timeOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Lokal")
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonSegmentButton, {
                value: "worker",
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                  icon: peopleOutline
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                  children: t("Radnici")
                })]
              })]
            }), activeSegment === "location" && /* @__PURE__ */jsxRuntimeExports.jsx(LocationWorkingHoursSection, {
              locationSlug: activeLocation
            }), activeSegment === "worker" && /* @__PURE__ */jsxRuntimeExports.jsx(WorkersWorkingHoursSection, {
              locationSlug: activeLocation
            })]
          });
        }
      }
    };
  });
})();
