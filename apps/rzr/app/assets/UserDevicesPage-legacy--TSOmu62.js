;
(function () {
  System.register(['./vendor_react-legacy-CKjKS6zA.js', './vendor_ionic-legacy-Br2UrGvg.js', './App-legacy-DZgevgqC.js', './test-notification.services-legacy-DcuWmEAr.js', './vendor_leaflet-legacy-Dzs4-G2p.js', './index-legacy-CuEOqhSX.js', './vendor_firebase-legacy-D-vUgmbk.js'], function (exports, module) {
    'use strict';

    var jsxRuntimeExports, format, parseISO, useForm, Controller, useTranslation, reactExports, globeOutline, logoAndroid, logoApple, IonCard, IonCardContent, IonIcon, checkmarkCircle, IonBadge, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, useIonToast, IonSpinner, IonText, IonCardHeader, IonCardTitle, IonButton, send, activeLocation, useGetUserConnectedDevicesQuery, useSendTestNotificationMutation;
    return {
      setters: [module => {
        jsxRuntimeExports = module.j;
        format = module.aC;
        parseISO = module.az;
        useForm = module.a0;
        Controller = module.a9;
        useTranslation = module.M;
        reactExports = module.e;
      }, module => {
        globeOutline = module.bG;
        logoAndroid = module.at;
        logoApple = module.as;
        IonCard = module.b2;
        IonCardContent = module.b3;
        IonIcon = module.b;
        checkmarkCircle = module.bj;
        IonBadge = module.b7;
        IonItem = module.r;
        IonLabel = module.G;
        IonInput = module.t;
        IonTextarea = module.ad;
        IonSelect = module.y;
        IonSelectOption = module.z;
        useIonToast = module.u;
        IonSpinner = module.o;
        IonText = module.m;
        IonCardHeader = module.b4;
        IonCardTitle = module.b5;
        IonButton = module.d;
        send = module.bH;
      }, module => {
        activeLocation = module.n;
      }, module => {
        useGetUserConnectedDevicesQuery = module.a;
        useSendTestNotificationMutation = module.b;
      }, null, null, null],
      execute: function () {
        exports("default", UserDevicesPage);
        const platformIcons = {
          ios: logoApple,
          android: logoAndroid,
          web: globeOutline
        };
        const platformNames = {
          ios: "iOS",
          android: "Android",
          web: "Web"
        };
        function DeviceCard({
          device,
          isSelected,
          onSelect
        }) {
          const platformIcon = platformIcons[device.platform] || globeOutline;
          const platformName = platformNames[device.platform] || "Unknown";
          return /* @__PURE__ */jsxRuntimeExports.jsx(IonCard, {
            button: true,
            onClick: onSelect,
            className: `m-0 relative ${isSelected ? "border-2 border-green-500 bg-green-500/10" : "border border-gray-300 dark:border-gray-700"}`,
            children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
              className: "p-4",
              children: [isSelected && /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                icon: checkmarkCircle,
                className: "absolute top-2 right-2 text-2xl text-green-500"
              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex justify-center mb-3",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: `w-16 h-16 rounded-full flex items-center justify-center ${isSelected ? "bg-green-500/20" : "bg-gray-200 dark:bg-gray-700"}`,
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: platformIcon,
                    className: "text-3xl text-gray-700 dark:text-gray-300"
                  })
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx("h3", {
                className: "text-sm font-semibold text-center mb-2 line-clamp-2",
                children: device.deviceName
              }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex justify-center mb-2",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonBadge, {
                  color: "primary",
                  className: "text-xs",
                  children: platformName
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                className: "flex flex-col gap-1 mt-3 text-xs text-gray-600 dark:text-gray-400",
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs("div", {
                  className: "flex items-center justify-center gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: `w-2 h-2 rounded-full ${device.isActive ? "bg-green-500" : "bg-gray-400"}`
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                    children: device.isActive ? "Aktivan" : "Neaktivan"
                  })]
                }), device.lastUsedAt && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center",
                  children: format(parseISO(device.lastUsedAt), "dd.MM.yyyy HH:mm")
                })]
              })]
            })
          });
        }
        function NotificationForm({
          formRef,
          onSubmit,
          isSubmitting
        }) {
          const {
            control,
            handleSubmit,
            formState: {
              errors
            }
          } = useForm({
            defaultValues: {
              title: "",
              body: "",
              type: "info",
              level: 1,
              clickAction: "",
              data: ""
            }
          });
          const onSubmitForm = formData => {
            let parsedData;
            if (formData.data && formData.data.trim()) {
              try {
                parsedData = JSON.parse(formData.data);
              } catch (error) {
                alert("Invalid JSON format in Data field");
                return;
              }
            }
            onSubmit({
              title: formData.title,
              body: formData.body,
              type: formData.type,
              level: formData.level,
              clickAction: formData.clickAction && formData.clickAction.trim() ? formData.clickAction.trim() : void 0,
              data: parsedData
            });
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
            ref: formRef,
            onSubmit: handleSubmit(onSubmitForm),
            className: "space-y-4",
            children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                position: "stacked",
                children: ["Naslov ", /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "title",
                control,
                rules: {
                  required: "Naslov je obavezan"
                },
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                  ...field,
                  placeholder: "Unesite naslov notifikacije",
                  disabled: isSubmitting,
                  onIonInput: e => field.onChange(e.detail.value)
                })
              }), errors.title && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-red-500 text-xs mt-1",
                children: errors.title.message
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonLabel, {
                position: "stacked",
                children: ["Tekst ", /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  className: "text-red-500",
                  children: "*"
                })]
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "body",
                control,
                rules: {
                  required: "Tekst je obavezan"
                },
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonTextarea, {
                  ...field,
                  placeholder: "Unesite tekst notifikacije",
                  rows: 4,
                  disabled: isSubmitting,
                  onIonInput: e => field.onChange(e.detail.value)
                })
              }), errors.body && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-red-500 text-xs mt-1",
                children: errors.body.message
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                position: "stacked",
                children: "Tip"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "type",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsxs(IonSelect, {
                  ...field,
                  placeholder: "Izaberite tip",
                  disabled: isSubmitting,
                  onIonChange: e => field.onChange(e.detail.value),
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "info",
                    children: "Info"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "success",
                    children: "Success"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "warning",
                    children: "Warning"
                  }), /* @__PURE__ */jsxRuntimeExports.jsx(IonSelectOption, {
                    value: "error",
                    children: "Error"
                  })]
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                position: "stacked",
                children: "Nivo (1-5)"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "level",
                control,
                rules: {
                  min: {
                    value: 1,
                    message: "Minimum je 1"
                  },
                  max: {
                    value: 5,
                    message: "Maksimum je 5"
                  }
                },
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                  ...field,
                  type: "number",
                  min: 1,
                  max: 5,
                  placeholder: "1",
                  disabled: isSubmitting,
                  onIonInput: e => field.onChange(Number(e.detail.value))
                })
              }), errors.level && /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-red-500 text-xs mt-1",
                children: errors.level.message
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                position: "stacked",
                children: "URL za klik (opciono)"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "clickAction",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                  ...field,
                  type: "url",
                  placeholder: "https://example.com/page",
                  disabled: isSubmitting,
                  onIonInput: e => field.onChange(e.detail.value)
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-xs text-gray-500 mt-1",
                children: "Opciono: URL koji se otvara na klik notifikacije (default: home page)"
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
                position: "stacked",
                children: "Data (JSON, opciono)"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: "data",
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(IonTextarea, {
                  ...field,
                  placeholder: '{"key": "value"}',
                  rows: 3,
                  disabled: isSubmitting,
                  onIonInput: e => field.onChange(e.detail.value)
                })
              }), /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                className: "text-xs text-gray-500 mt-1",
                children: "Opciono: dodatni podaci u JSON formatu"
              })]
            })]
          });
        }
        function UserDevicesPage({
          match
        }) {
          const {
            t
          } = useTranslation();
          const [presentToast] = useIonToast();
          const userId = parseInt(match.params.userId, 10);
          const [selectedDevice, setSelectedDevice] = reactExports.useState(null);
          const formRef = reactExports.useRef(null);
          const {
            data,
            isLoading,
            error
          } = useGetUserConnectedDevicesQuery({
            locationSlug: activeLocation,
            userId
          });
          const [sendNotification, {
            isLoading: isSending
          }] = useSendTestNotificationMutation();
          const handleDeviceSelect = device => {
            setSelectedDevice(device.id === selectedDevice?.id ? null : device);
          };
          const handleSendNotification = async formData => {
            if (!selectedDevice) {
              presentToast({
                message: t("Molimo izaberite uređaj"),
                duration: 3e3,
                color: "warning"
              });
              return;
            }
            try {
              const result = await sendNotification({
                userId,
                locationSlug: activeLocation,
                deviceId: selectedDevice.deviceId,
                ...formData
              }).unwrap();
              if (result.success) {
                presentToast({
                  message: t("Notifikacija uspešno poslata!"),
                  duration: 3e3,
                  color: "success"
                });
              }
            } catch (err) {
              const message = err?.data?.message || t("Greška pri slanju notifikacije");
              if (err?.status === 410) {
                presentToast({
                  message: t("Token je neva važeći i uklonjen je. Osvežavanje..."),
                  duration: 2e3,
                  color: "warning"
                });
                setTimeout(() => {
                  window.location.reload();
                }, 2e3);
                return;
              }
              presentToast({
                message,
                duration: 3e3,
                color: "danger"
              });
            }
          };
          const handleSubmitClick = () => {
            if (formRef.current) {
              const submitEvent = new Event("submit", {
                bubbles: true,
                cancelable: true
              });
              formRef.current.dispatchEvent(submitEvent);
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {
            children: /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
              className: "max-w-4xl mx-auto",
              children: [isLoading && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex justify-center items-center py-8",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {})
              }), error && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "text-center py-8",
                children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                  color: "danger",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                    children: t("Greška pri učitavanju uređaja")
                  })
                })
              }), !isLoading && !error && data?.data && /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                  className: "mb-6",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                      children: data.data.user.fullName
                    })
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                    children: [data.data.user.email && /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                      className: "text-sm text-gray-600 dark:text-gray-400",
                      children: ["Email: ", data.data.user.email]
                    }), data.data.user.phoneNumber && /* @__PURE__ */jsxRuntimeExports.jsxs("p", {
                      className: "text-sm text-gray-600 dark:text-gray-400",
                      children: ["Telefon: ", data.data.user.phoneNumber]
                    })]
                  })]
                }), data.data.devices.length === 0 ? /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "text-center py-8",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "medium",
                    children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                      children: t("Korisnik nema povezanih uređaja")
                    })
                  })
                }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx("h2", {
                    className: "text-lg font-semibold mb-4",
                    children: t("Izaberite uređaj")
                  }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                    className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6",
                    children: data.data.devices.map(device => /* @__PURE__ */jsxRuntimeExports.jsx(DeviceCard, {
                      device,
                      isSelected: selectedDevice?.id === device.id,
                      onSelect: () => handleDeviceSelect(device)
                    }, device.id))
                  }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
                      children: /* @__PURE__ */jsxRuntimeExports.jsx(IonCardTitle, {
                        children: t("Kreiraj notifikaciju")
                      })
                    }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardContent, {
                      children: [/* @__PURE__ */jsxRuntimeExports.jsx(NotificationForm, {
                        formRef,
                        onSubmit: handleSendNotification,
                        isSubmitting: isSending
                      }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                        className: "mt-6",
                        children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                          expand: "block",
                          color: "primary",
                          size: "large",
                          disabled: !selectedDevice || isSending,
                          onClick: handleSubmitClick,
                          children: isSending ? /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                              slot: "start"
                            }), t("Slanje...")]
                          }) : /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
                            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                              icon: send,
                              slot: "start"
                            }), t("Pošalji notifikaciju")]
                          })
                        })
                      })]
                    })]
                  })]
                })]
              })]
            })
          });
        }
      }
    };
  });
})();
