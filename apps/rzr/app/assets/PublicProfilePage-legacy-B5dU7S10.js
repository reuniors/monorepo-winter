;
(function () {
  System.register(['./vendor_react-legacy-CndWC4n9.js', './vendor_ionic-legacy-DaXnMmdX.js', './client-profile.fe-services-legacy-yeaz3tzU.js', './App-legacy-BZWqGSgH.js', './vendor_leaflet-legacy-BBJO0vvi.js', './statistics.fe-services-legacy-Hx_-3iFt.js', './index-legacy-DkVF9sGh.js', './vendor_firebase-legacy-xyFeamUN.js'], function (exports, module) {
    'use strict';

    var useTranslation, useParams, jsxRuntimeExports, IonCard, IonCardContent, IonSpinner, IonCardHeader, IonCardTitle, IonList, IonItem, IonIcon, mailOutline, IonLabel, callOutline, calendarOutline, personOutline, useClipboard, useGetWorkerClientDataQuery, UserAvatar, ClientStatistics, useUser, activeLocation, ConditionalComponent, isWebPlatform;
    return {
      setters: [module => {
        useTranslation = module.aD;
        useParams = module.aQ;
        jsxRuntimeExports = module.j;
      }, module => {
        IonCard = module.aS;
        IonCardContent = module.aV;
        IonSpinner = module.n;
        IonCardHeader = module.aT;
        IonCardTitle = module.aU;
        IonList = module.F;
        IonItem = module.q;
        IonIcon = module.l;
        mailOutline = module.ah;
        IonLabel = module.E;
        callOutline = module.bf;
        calendarOutline = module.ad;
        personOutline = module.aQ;
      }, module => {
        useClipboard = module.u;
        useGetWorkerClientDataQuery = module.a;
        UserAvatar = module.U;
        ClientStatistics = module.C;
      }, module => {
        useUser = module.b;
        activeLocation = module.h;
        ConditionalComponent = module.C;
        isWebPlatform = module.t;
      }, null, null, null, null],
      execute: function () {
        exports("default", PublicProfilePage);
        function PublicProfilePage() {
          const {
            t
          } = useTranslation();
          const {
            clientId
          } = useParams();
          const {
            isOwnerOrWorker,
            isAdmin
          } = useUser();
          const {
            setValue: copyToClipboard
          } = useClipboard();
          if (!isOwnerOrWorker && !isAdmin) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-text-center",
                    children: t("Nemate dozvolu za pristup ovoj stranici")
                  })
                })
              })
            });
          }
          const {
            data,
            isLoading,
            error
          } = useGetWorkerClientDataQuery({
            clientId
          });
          const handleEmailClick = email => {
            if (email && isWebPlatform) {
              copyToClipboard(email);
            } else {
              window.open(`mailto:${email}`, "_blank");
            }
          };
          const handlePhoneClick = phoneNumber => {
            if (phoneNumber) {
              window.location.href = `tel:${phoneNumber}`;
            }
          };
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {});
          }
          if (error || !data?.data) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "ion-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "ion-text-center",
                    children: t("Profil nije pronađen")
                  })
                })
              })
            });
          }
          console.log(data, "data");
          const client = data.data;
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            className: "ion-padding",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                className: "ion-text-left",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                  className: "ion-padding-top flex items-center justify-between",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                    className: "ion-padding-left flex items-center",
                    children: [client.fullName && /* @__PURE__ */jsxRuntimeExports.jsx(UserAvatar, {
                      fullName: client.fullName,
                      size: 30
                    }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                      className: "ion-padding-left ml-2",
                      children: client.fullName || t("Nije uneto")
                    })]
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonList, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    lines: "none",
                    button: !!client.user?.email,
                    onClick: () => handleEmailClick(client.user?.email || ""),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: mailOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: client.user?.email || t("Nije uneto")
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    lines: "none",
                    button: !!client.phoneNumber,
                    onClick: () => handlePhoneClick(client.phoneNumber || ""),
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: callOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: client.phoneNumber || t("Nije uneto")
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    lines: "none",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: calendarOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                      children: client.dateOfBirth || t("Nije unet datum rođenja")
                    })]
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
                    lines: "none",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: personOutline,
                      slot: "start"
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                      children: [t("ID klijenta"), ": ", client.id]
                    })]
                  })]
                })
              })]
            }), activeLocation && /* @__PURE__ */jsxRuntimeExports.jsx(ConditionalComponent, {
              condition: isOwnerOrWorker ?? false,
              render: () => /* @__PURE__ */jsxRuntimeExports.jsx(ClientStatistics, {
                clientId: client.id || 0,
                locationSlug: activeLocation
              }),
              renderElse: () => /* @__PURE__ */jsxRuntimeExports.jsx(ClientStatistics, {
                clientId: client.id || 0,
                locationSlug: activeLocation
              })
            })]
          });
        }
      }
    };
  });
})();
