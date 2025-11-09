;
(function () {
  System.register(['./vendor_react-legacy-BlcubaNj.js', './vendor_ionic-legacy-DMDRhAuO.js', './App-legacy-B_CrLuzT.js', './index-legacy-D4TPg-pG.js', './vendor_leaflet-legacy-C0625EaZ.js', './vendor_firebase-legacy-Cowo1GnG.js'], function (exports, module) {
    'use strict';

    var O, w, useMap, reactExports, React, jsxRuntimeExports, MapContainer, TileLayer, t, Controller, create$3, create$6, create$7, create$5, create$2, useTranslation, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, closeOutline, IonContent, IonItem, IonFooter, IonText, IonLabel, IonInput, useIonRouter, IonCard, IonCardHeader, IonCardTitle, createOutline, IonCardContent, saveOutline, IonSpinner, useUser, FieldType, transformStandardResponseToCamelCase, useFormWithSchema, useShowNotification, DynamicForm, useGetFeLocationQuery, activeLocation, preloadedLocationData, rzrApi, TagType, L;
    return {
      setters: [module => {
        O = module.aP;
        w = module.aQ;
        useMap = module.aR;
        reactExports = module.e;
        React = module.R;
        jsxRuntimeExports = module.j;
        MapContainer = module.aS;
        TileLayer = module.aT;
        t = module.a0;
        Controller = module.a3;
        create$3 = module.a1;
        create$6 = module.a2;
        create$7 = module.aL;
        create$5 = module.aM;
        create$2 = module.aO;
        useTranslation = module.ap;
      }, module => {
        IonModal = module.I;
        IonHeader = module.b;
        IonToolbar = module.c;
        IonTitle = module.e;
        IonButtons = module.f;
        IonButton = module.h;
        IonIcon = module.i;
        closeOutline = module.j;
        IonContent = module.k;
        IonItem = module.o;
        IonFooter = module.m;
        IonText = module.u;
        IonLabel = module.D;
        IonInput = module.p;
        useIonRouter = module.aj;
        IonCard = module.aC;
        IonCardHeader = module.aD;
        IonCardTitle = module.aK;
        createOutline = module.aX;
        IonCardContent = module.aE;
        saveOutline = module.s;
        IonSpinner = module.l;
      }, module => {
        useUser = module.b;
        FieldType = module.F;
        transformStandardResponseToCamelCase = module.t;
        useFormWithSchema = module.n;
        useShowNotification = module.o;
        DynamicForm = module.D;
        useGetFeLocationQuery = module.p;
        activeLocation = module.h;
        preloadedLocationData = module.q;
      }, module => {
        rzrApi = module.r;
        TagType = module.o;
      }, module => {
        L = module.L;
      }, null],
      execute: function () {
        exports("default", LocationEditPage);
        const SearchField = ({
          handlers,
          searchAddress
        }) => {
          const provider = new O({
            params: {
              countrycodes: "rs"
            }
          });
          const searchControl = new w({
            provider,
            style: "bar",
            marker: {
              draggable: true
            },
            searchLabel: "Unesite adresu"
          });
          const map = useMap();
          reactExports.useEffect(() => {
            if (searchAddress) {
              searchControl.searchElement.input.value = searchAddress;
              searchControl.onSubmit({
                query: searchAddress
              });
            }
          }, [searchAddress]);
          reactExports.useEffect(() => {
            map.addControl(searchControl);
            map.on("geosearch/marker/dragend", event => {
              if ("location" in event && handlers?.onMarkerDrag) {
                const location = event.location;
                handlers.onMarkerDrag({
                  x: location.lng,
                  y: location.lat
                });
              }
            });
            map.on("geosearch/showlocation", event => {
              if ("location" in event && handlers?.onMarkerDrag) {
                handlers.onMarkerDrag(event.location);
              }
            });
            return () => {
              searchControl.close();
              map.removeControl(searchControl);
              map.off("geosearch/marker/dragend");
              map.off("geosearch/showlocation");
            };
          }, []);
          return null;
        };
        const defaultPosition = {
          x: 44,
          y: 20
        };
        {
          L.Icon.Default.imagePath = "/assets/leaflet/";
        }
        const MapWithSearch = ({
          searchAddress,
          handleLocationSelect,
          hasSearch,
          mapHeight
        }) => {
          const mapRef = reactExports.useRef(null);
          const [showSearch, setShowSearch] = React.useState(false);
          mapHeight = mapHeight || 400;
          const initialHasSearch = hasSearch;
          hasSearch = initialHasSearch === void 0 ? true : initialHasSearch;
          const onMarkerDrag = location => {
            handleLocationSelect?.(location);
          };
          const position = {
            lat: defaultPosition.x,
            lng: defaultPosition.y
          };
          reactExports.useEffect(() => {
            if (hasSearch) {
              setTimeout(() => {
                setShowSearch(true);
              }, 300);
              return () => {
                setShowSearch(false);
              };
            }
          }, [hasSearch]);
          reactExports.useEffect(() => {
            const timeout = setTimeout(() => {
              window.dispatchEvent(new Event("resize"));
            }, 200);
            return () => {
              clearTimeout(timeout);
            };
          }, []);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(MapContainer, {
            ref: mapRef,
            center: position,
            zoom: 7,
            style: {
              height: `${mapHeight}px`,
              maxHeight: "50vh",
              width: "100%"
            },
            children: [showSearch && /* @__PURE__ */jsxRuntimeExports.jsx(SearchField, {
              handlers: {
                onMarkerDrag
              },
              searchAddress
            }, initialHasSearch === void 0 ? searchAddress : void 0), /* @__PURE__ */jsxRuntimeExports.jsx(TileLayer, {
              attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
              url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            })]
          });
        };
        function MapSearchModal({
          searchAddress,
          show,
          setShow,
          handleLocationSelect,
          autoSearch
        }) {
          const [location, setLocation] = React.useState(void 0);
          const handleClose = () => {
            setShow(false);
          };
          const handleSave = () => {
            if (location) {
              handleLocationSelect?.(location);
            }
            handleClose();
          };
          const handleSetLocation = location2 => {
            setLocation(location2);
            if (autoSearch && !show) {
              handleSave();
            }
          };
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonModal, {
            isOpen: show,
            onDidDismiss: handleClose,
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonTitle, {
                  children: t("Izaberi lokaciju na mapi")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButtons, {
                  slot: "end",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                    onClick: handleClose,
                    children: /* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: closeOutline
                    })
                  })
                })]
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonContent, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(MapWithSearch, {
                searchAddress,
                handleLocationSelect: handleSetLocation
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
                className: "text-center",
                children: /* @__PURE__ */jsxRuntimeExports.jsx("span", {
                  children: t("Pomerite marker na odgovarajuću poziciju na mapi")
                })
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonFooter, {
              children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonToolbar, {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleClose,
                  color: "default",
                  children: t("Zatvori")
                }), /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                  onClick: handleSave,
                  color: "primary",
                  slot: "end",
                  disabled: !location,
                  children: t("Izaberi")
                })]
              })
            })]
          });
        }
        function CoordinatesFields({
          label,
          onChange,
          value,
          searchAddress
        }) {
          const [lat, setLat] = React.useState(value?.lat ?? "");
          const [lng, setLng] = React.useState(value?.lng ?? "");
          const [showMapModal, setShowMapModal] = React.useState(false);
          const [init, setInit] = reactExports.useState(false);
          reactExports.useEffect(() => {
            onChange({
              lat,
              lng
            });
          }, [lat, lng]);
          reactExports.useEffect(() => {
            if (!init && value?.lat && value?.lng) {
              setLat(value?.lat);
              setLng(value?.lng);
              setInit(true);
            }
          }, [init, value]);
          const handleLatChange = e => {
            setLat(e.detail.value ?? "");
          };
          const handleLngChange = e => {
            setLng(e.detail.value ?? "");
          };
          const handleShowMapModal = () => {
            setShowMapModal(!showMapModal);
          };
          const handleLocationSelect = location => {
            setLat(location.y.toString());
            setLng(location.x.toString());
          };
          const searchAddressData = searchAddress?.();
          return /* @__PURE__ */jsxRuntimeExports.jsxs("div", {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonLabel, {
              className: "py-2",
              children: label
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonButton, {
                onClick: handleShowMapModal,
                size: "default",
                children: t("Izaberi lokaciju na mapi")
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsxs(IonItem, {
              children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                label: "Lat",
                labelPlacement: "floating",
                value: lat,
                onIonChange: handleLatChange,
                type: "text",
                className: "mr-2"
              }), /* @__PURE__ */jsxRuntimeExports.jsx(IonInput, {
                label: "Long",
                labelPlacement: "floating",
                value: lng,
                onIonChange: handleLngChange,
                type: "text"
              })]
            }), /* @__PURE__ */jsxRuntimeExports.jsx(MapSearchModal, {
              show: showMapModal,
              setShow: setShowMapModal,
              searchAddress: searchAddressData?.search,
              handleLocationSelect,
              autoSearch: searchAddressData?.autoSearch
            })]
          });
        }
        function CommonCoordinates(props) {
          const {
            label,
            labelPlacement,
            register,
            errorLat,
            errorLong
          } = props;
          const {
            itemProps,
            inputProps,
            control,
            searchAddress
          } = props;
          return /* @__PURE__ */jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonItem, {
              ...itemProps,
              children: /* @__PURE__ */jsxRuntimeExports.jsx(Controller, {
                name: register.name,
                control,
                render: ({
                  field
                }) => /* @__PURE__ */jsxRuntimeExports.jsx(CoordinatesFields, {
                  label,
                  onChange: field.onChange,
                  value: field.value,
                  searchAddress
                })
              })
            }), (errorLat || errorLong) && /* @__PURE__ */jsxRuntimeExports.jsxs(IonText, {
              color: "danger",
              className: "ion-padding-start",
              children: [errorLat && /* @__PURE__ */jsxRuntimeExports.jsx("small", {
                children: errorLat.message
              }), errorLong && /* @__PURE__ */jsxRuntimeExports.jsxs("small", {
                children: [/* @__PURE__ */jsxRuntimeExports.jsx("br", {}), errorLong.message]
              })]
            })]
          });
        }
        const CommonCoordinates$1 = reactExports.memo(CommonCoordinates);
        const locationEditFormSchema = create$3().shape({
          locationSlug: create$6().required(t("Polje je obavezno")),
          title: create$6().required(t("Naslov je obavezan")),
          slug: create$6().required(t("Slug je obavezan")),
          description: create$6().required(t("Opis je obavezan")),
          snippet: create$6().nullable().defined(),
          active: create$7().required(),
          addressData: create$3().shape({
            street: create$6().required(t("Ulica je obavezna")),
            streetNumber: create$6().required(t("Broj ulice je obavezan")),
            municipality: create$6().required(t("Opština je obavezna"))
          }),
          phoneData: create$3().shape({
            phoneNumbers: create$2().required()
          }),
          coordinates: create$3().shape({
            lat: create$5().required(),
            lng: create$5().required()
          }),
          wifiPassword: create$6().nullable().defined(),
          googleMapUrl: create$6().url(t("URL mora biti validan")).nullable().defined()
        });
        const getLocationEditFormFields = locationId => {
          const {
            isAdmin
          } = useUser();
          return [{
            keyName: "title",
            name: "title",
            data: {
              type: FieldType.Text,
              label: t("Naslov"),
              translation: {
                type: "location",
                fieldName: "title",
                dataId: locationId
              }
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "slug",
            name: "slug",
            data: {
              type: FieldType.Text,
              label: t("Slug")
            },
            disabled: !isAdmin,
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "description",
            name: "description",
            data: {
              type: FieldType.RichEditor,
              label: t("Opis"),
              translation: {
                type: "location",
                fieldName: "description",
                dataId: locationId
              }
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "snippet",
            name: "snippet",
            data: {
              type: FieldType.TextArea,
              label: t("Kratak opis"),
              translation: {
                type: "location",
                fieldName: "snippet",
                dataId: locationId
              }
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "active",
            name: "active",
            data: {
              type: FieldType.Switch,
              label: t("Aktivno")
            },
            disabled: !isAdmin,
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "addressData",
            keyNameChild: "municipality",
            name: "Opština",
            data: {
              type: FieldType.Text,
              label: "City"
            }
          }, {
            keyName: "addressData",
            keyNameChild: "street",
            name: "Ulica",
            data: {
              type: FieldType.Text,
              label: "Ulica"
            }
          }, {
            keyName: "addressData",
            keyNameChild: "streetNumber",
            name: "Broj ulice",
            data: {
              type: FieldType.Text,
              label: "Broj ulice"
            }
          }, {
            keyName: "coordinates",
            name: "Koordinate",
            data: {
              type: FieldType.Callback,
              label: "Koordinate"
            },
            gridSize: {
              size: "12"
            }
          }, {
            keyName: "wifiPassword",
            name: "wifiPassword",
            data: {
              type: FieldType.Text,
              label: t("WiFi lozinka")
            },
            gridSize: {
              size: "6"
            }
          }, {
            keyName: "phoneData",
            keyNameChild: "phoneNumbers",
            name: "Brojevi telefona",
            data: {
              type: FieldType.List,
              label: "Brojevi telefona",
              inputType: "tel"
            }
          }, {
            keyName: "googleMapUrl",
            name: "googleMapUrl",
            data: {
              type: FieldType.Text,
              label: t("Google Maps URL")
            },
            gridSize: {
              size: "12"
            }
          }];
        };
        const locationEditApi = rzrApi.injectEndpoints({
          endpoints: builder => ({
            updateLocationData: builder.mutation({
              query: data => ({
                url: `locations/update`,
                method: "PUT",
                body: data
              }),
              invalidatesTags: [TagType.LOCATION],
              transformResponse: transformStandardResponseToCamelCase
            })
          })
        });
        const {
          useUpdateLocationDataMutation
        } = locationEditApi;
        function LocationEditForm({
          locationData,
          locationSlug,
          onClose
        }) {
          const {
            t
          } = useTranslation();
          const {
            goBack
          } = useIonRouter();
          const form = useFormWithSchema(locationEditFormSchema, {
            defaultValues: {
              locationSlug,
              title: locationData?.title ?? "",
              slug: locationData?.slug ?? "",
              description: locationData?.description ?? "",
              snippet: locationData?.snippet ?? null,
              active: locationData?.active ?? true,
              addressData: {
                street: locationData?.addressData?.street ?? "",
                streetNumber: locationData?.addressData?.streetNumber ?? "",
                municipality: locationData?.addressData?.municipality ?? ""
              },
              phoneData: locationData?.phoneData,
              wifiPassword: locationData?.wifiPassword ?? null,
              googleMapUrl: locationData?.googleMapUrl ?? null,
              coordinates: {
                lat: locationData?.addressLat ?? void 0,
                lng: locationData?.addressLong ?? void 0
              }
            }
          });
          const [updateLocation, updateLocationResponse] = useUpdateLocationDataMutation();
          const [showSuccessNotification] = useShowNotification({
            message: t("Podaci su uspešno sačuvani"),
            color: "success"
          });
          const [showErrorNotification] = useShowNotification({
            message: t("Greška pri čuvanju podataka"),
            color: "danger"
          });
          const formFields = locationData?.id ? getLocationEditFormFields(locationData.id) : [];
          const formState = form.formState;
          const handleSubmit = data => {
            updateLocation({
              locationSlug: data.locationSlug,
              title: data.title,
              slug: data.slug,
              description: data.description,
              snippet: data.snippet,
              active: data.active,
              addressData: data.addressData,
              phoneData: data.phoneData,
              addressLat: data.coordinates?.lat ?? null,
              addressLong: data.coordinates?.lng ?? null,
              wifiPassword: data.wifiPassword,
              googleMapUrl: data.googleMapUrl
            }).then(result => {
              if ("data" in result && result.data?.success) {
                goBack();
              }
            });
          };
          const handleAddressFormCallback = field => {
            const getSearchedAddress = () => {
              const addressData = form.getValues("addressData");
              let search = "";
              let autoSearch = false;
              if (addressData) {
                const addressComponents = [addressData.streetNumber, addressData.street, addressData.municipality];
                const filteredComponents = addressComponents.filter(Boolean);
                search = filteredComponents.join(", ");
                autoSearch = filteredComponents.length === 3;
              }
              return {
                search,
                autoSearch
              };
            };
            if (field.keyName === "coordinates") {
              return /* @__PURE__ */jsxRuntimeExports.jsx(CommonCoordinates$1, {
                label: "Koordinate",
                register: form.register("coordinates"),
                errorLat: formState.errors.coordinates?.lat,
                errorLong: formState.errors.coordinates?.lng,
                control: form.control,
                searchAddress: getSearchedAddress
              });
            }
          };
          reactExports.useEffect(() => {
            if (updateLocationResponse.isSuccess) {
              showSuccessNotification();
              onClose();
            }
          }, [updateLocationResponse.isSuccess, onClose]);
          reactExports.useEffect(() => {
            if (updateLocationResponse.isError) {
              showErrorNotification();
            }
          }, [updateLocationResponse.isError, showErrorNotification]);
          reactExports.useEffect(() => {
            if (locationData) {
              form.setValue("title", locationData.title);
              form.setValue("slug", locationData.slug);
              form.setValue("description", locationData.description ?? "");
              form.setValue("snippet", locationData.snippet ?? null);
              form.setValue("active", locationData.active ?? true);
              form.setValue("addressData", {
                street: locationData.addressData?.street ?? "",
                streetNumber: locationData.addressData?.streetNumber ?? "",
                municipality: locationData.addressData?.municipality ?? ""
              });
              form.setValue("wifiPassword", locationData.wifiPassword ?? null);
              form.setValue("googleMapUrl", locationData.googleMapUrl ?? null);
              form.setValue("phoneData", locationData.phoneData ?? {
                phoneNumbers: []
              });
              if (locationData.addressLat && locationData.addressLong) {
                form.setValue("coordinates", {
                  lat: locationData.addressLat,
                  lng: locationData.addressLong
                });
              }
            }
          }, [locationData, form]);
          return /* @__PURE__ */jsxRuntimeExports.jsxs(IonCard, {
            children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonCardHeader, {
              children: /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                className: "flex items-center justify-between",
                children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonCardTitle, {
                  className: "flex items-center gap-2",
                  children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                    icon: createOutline
                  }), t("Izmeni podatke lokacije")]
                })
              })
            }), /* @__PURE__ */jsxRuntimeExports.jsx(IonCardContent, {
              className: "ion-no-padding",
              children: /* @__PURE__ */jsxRuntimeExports.jsxs("form", {
                onSubmit: form.handleSubmit(handleSubmit),
                children: [/* @__PURE__ */jsxRuntimeExports.jsx(DynamicForm, {
                  fields: formFields,
                  form,
                  itemProps: {
                    color: "light"
                  },
                  callback: handleAddressFormCallback
                }), /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding-top",
                  children: /* @__PURE__ */jsxRuntimeExports.jsxs(IonButton, {
                    type: "submit",
                    expand: "block",
                    disabled: updateLocationResponse.isLoading,
                    color: "success",
                    children: [/* @__PURE__ */jsxRuntimeExports.jsx(IonIcon, {
                      icon: saveOutline,
                      slot: "start"
                    }), updateLocationResponse.isLoading ? /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                      name: "crescent"
                    }) : t("Sačuvaj podatke")]
                  })
                }), updateLocationResponse.isError && /* @__PURE__ */jsxRuntimeExports.jsx("div", {
                  className: "ion-padding-top",
                  children: /* @__PURE__ */jsxRuntimeExports.jsx(IonText, {
                    color: "danger",
                    children: t("Greška pri čuvanju podataka")
                  })
                })]
              })
            })]
          });
        }
        function LocationEditPage({
          isModalOpen,
          setIsModalOpen
        }) {
          const {
            t
          } = useTranslation();
          const {
            data: locationResponse,
            isLoading
          } = useGetFeLocationQuery({
            slug: activeLocation
          }, {
            skip: !!preloadedLocationData?.id
          });
          const locationData = preloadedLocationData ?? locationResponse?.data;
          if (isLoading) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center h-full",
              children: /* @__PURE__ */jsxRuntimeExports.jsx(IonSpinner, {
                name: "crescent"
              })
            });
          }
          if (!locationData) {
            return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
              className: "flex justify-center items-center h-full",
              children: /* @__PURE__ */jsxRuntimeExports.jsx("p", {
                children: t("Lokacija nije pronađena")
              })
            });
          }
          return /* @__PURE__ */jsxRuntimeExports.jsx("div", {
            children: /* @__PURE__ */jsxRuntimeExports.jsx(LocationEditForm, {
              locationData,
              locationSlug: activeLocation,
              onClose: () => setIsModalOpen(false)
            })
          });
        }
      }
    };
  });
})();
