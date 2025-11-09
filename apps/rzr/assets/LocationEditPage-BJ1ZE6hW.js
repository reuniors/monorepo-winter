import { aP as O, aQ as w, aR as useMap, e as reactExports, R as React, j as jsxRuntimeExports, aS as MapContainer, aT as TileLayer, a0 as t, a3 as Controller, a1 as create$3, a2 as create$6, aL as create$7, aM as create$5, aO as create$2, ap as useTranslation } from "./vendor_react-Dna2AK9N.js";
import { I as IonModal, b as IonHeader, c as IonToolbar, e as IonTitle, f as IonButtons, h as IonButton, i as IonIcon, j as closeOutline, k as IonContent, o as IonItem, m as IonFooter, u as IonText, D as IonLabel, p as IonInput, aj as useIonRouter, aC as IonCard, aD as IonCardHeader, aK as IonCardTitle, aX as createOutline, aE as IonCardContent, s as saveOutline, l as IonSpinner } from "./vendor_ionic-DxRiTffW.js";
import { b as useUser, F as FieldType, t as transformStandardResponseToCamelCase, n as useFormWithSchema, o as useShowNotification, D as DynamicForm, p as useGetFeLocationQuery, h as activeLocation, q as preloadedLocationData } from "./App-D9vbFQN1.js";
import { r as rzrApi, o as TagType } from "./index-DWAtctn1.js";
import { L } from "./vendor_leaflet-DNRNsWmZ.js";
import "./vendor_firebase-BjBnt0gj.js";
const SearchField = ({ handlers, searchAddress }) => {
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
      searchControl.onSubmit({ query: searchAddress });
    }
  }, [searchAddress]);
  reactExports.useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/marker/dragend", (event) => {
      if ("location" in event && (handlers == null ? void 0 : handlers.onMarkerDrag)) {
        const location = event.location;
        handlers.onMarkerDrag({
          x: location.lng,
          y: location.lat
        });
      }
    });
    map.on("geosearch/showlocation", (event) => {
      if ("location" in event && (handlers == null ? void 0 : handlers.onMarkerDrag)) {
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
  const onMarkerDrag = (location) => {
    handleLocationSelect == null ? void 0 : handleLocationSelect(location);
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MapContainer,
    {
      ref: mapRef,
      center: position,
      zoom: 7,
      style: {
        height: "".concat(mapHeight, "px"),
        maxHeight: "50vh",
        width: "100%"
      },
      children: [
        showSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
          SearchField,
          {
            handlers: { onMarkerDrag },
            searchAddress
          },
          initialHasSearch === void 0 ? searchAddress : void 0
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TileLayer,
          {
            attribution: '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            url: "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          }
        )
      ]
    }
  );
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
      handleLocationSelect == null ? void 0 : handleLocationSelect(location);
    }
    handleClose();
  };
  const handleSetLocation = (location2) => {
    setLocation(location2);
    if (autoSearch && !show) {
      handleSave();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonModal, { isOpen: show, onDidDismiss: handleClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonTitle, { children: t("Izaberi lokaciju na mapi") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonButtons, { slot: "end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: closeOutline }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MapWithSearch,
        {
          searchAddress,
          handleLocationSelect: handleSetLocation
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("Pomerite marker na odgovarajuću poziciju na mapi") }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonToolbar, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleClose, color: "default", children: t("Zatvori") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonButton,
        {
          onClick: handleSave,
          color: "primary",
          slot: "end",
          disabled: !location,
          children: t("Izaberi")
        }
      )
    ] }) })
  ] });
}
function CoordinatesFields({
  label,
  onChange,
  value,
  searchAddress
}) {
  var _a, _b;
  const [lat, setLat] = React.useState((_a = value == null ? void 0 : value.lat) != null ? _a : "");
  const [lng, setLng] = React.useState((_b = value == null ? void 0 : value.lng) != null ? _b : "");
  const [showMapModal, setShowMapModal] = React.useState(false);
  const [init, setInit] = reactExports.useState(false);
  reactExports.useEffect(() => {
    onChange({ lat, lng });
  }, [lat, lng]);
  reactExports.useEffect(() => {
    if (!init && (value == null ? void 0 : value.lat) && (value == null ? void 0 : value.lng)) {
      setLat(value == null ? void 0 : value.lat);
      setLng(value == null ? void 0 : value.lng);
      setInit(true);
    }
  }, [init, value]);
  const handleLatChange = (e) => {
    var _a2;
    setLat((_a2 = e.detail.value) != null ? _a2 : "");
  };
  const handleLngChange = (e) => {
    var _a2;
    setLng((_a2 = e.detail.value) != null ? _a2 : "");
  };
  const handleShowMapModal = () => {
    setShowMapModal(!showMapModal);
  };
  const handleLocationSelect = (location) => {
    setLat(location.y.toString());
    setLng(location.x.toString());
  };
  const searchAddressData = searchAddress == null ? void 0 : searchAddress();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonLabel, { className: "py-2", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonButton, { onClick: handleShowMapModal, size: "default", children: t("Izaberi lokaciju na mapi") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(IonItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonInput,
        {
          label: "Lat",
          labelPlacement: "floating",
          value: lat,
          onIonChange: handleLatChange,
          type: "text",
          className: "mr-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        IonInput,
        {
          label: "Long",
          labelPlacement: "floating",
          value: lng,
          onIonChange: handleLngChange,
          type: "text"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MapSearchModal,
      {
        show: showMapModal,
        setShow: setShowMapModal,
        searchAddress: searchAddressData == null ? void 0 : searchAddressData.search,
        handleLocationSelect,
        autoSearch: searchAddressData == null ? void 0 : searchAddressData.autoSearch
      }
    )
  ] });
}
function CommonCoordinates(props) {
  const { label, labelPlacement, register, errorLat, errorLong } = props;
  const { itemProps, inputProps, control, searchAddress } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonItem, { ...itemProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Controller,
      {
        name: register.name,
        control,
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CoordinatesFields,
          {
            label,
            onChange: field.onChange,
            value: field.value,
            searchAddress
          }
        )
      }
    ) }),
    (errorLat || errorLong) && /* @__PURE__ */ jsxRuntimeExports.jsxs(IonText, { color: "danger", className: "ion-padding-start", children: [
      errorLat && /* @__PURE__ */ jsxRuntimeExports.jsx("small", { children: errorLat.message }),
      errorLong && /* @__PURE__ */ jsxRuntimeExports.jsxs("small", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        errorLong.message
      ] })
    ] })
  ] });
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
const getLocationEditFormFields = (locationId) => {
  const { isAdmin } = useUser();
  return [
    {
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
      gridSize: { size: "12" }
    },
    {
      keyName: "slug",
      name: "slug",
      data: {
        type: FieldType.Text,
        label: t("Slug")
      },
      disabled: !isAdmin,
      gridSize: { size: "12" }
    },
    {
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
      gridSize: { size: "12" }
    },
    {
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
      gridSize: { size: "12" }
    },
    {
      keyName: "active",
      name: "active",
      data: {
        type: FieldType.Switch,
        label: t("Aktivno")
      },
      disabled: !isAdmin,
      gridSize: { size: "12" }
    },
    {
      keyName: "addressData",
      keyNameChild: "municipality",
      name: "Opština",
      data: {
        type: FieldType.Text,
        label: "City"
      }
    },
    {
      keyName: "addressData",
      keyNameChild: "street",
      name: "Ulica",
      data: {
        type: FieldType.Text,
        label: "Ulica"
      }
    },
    {
      keyName: "addressData",
      keyNameChild: "streetNumber",
      name: "Broj ulice",
      data: {
        type: FieldType.Text,
        label: "Broj ulice"
      }
    },
    {
      keyName: "coordinates",
      name: "Koordinate",
      data: {
        type: FieldType.Callback,
        label: "Koordinate"
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "wifiPassword",
      name: "wifiPassword",
      data: {
        type: FieldType.Text,
        label: t("WiFi lozinka")
      },
      gridSize: { size: "6" }
    },
    {
      keyName: "phoneData",
      keyNameChild: "phoneNumbers",
      name: "Brojevi telefona",
      data: {
        type: FieldType.List,
        label: "Brojevi telefona",
        inputType: "tel"
      }
    },
    {
      keyName: "googleMapUrl",
      name: "googleMapUrl",
      data: {
        type: FieldType.Text,
        label: t("Google Maps URL")
      },
      gridSize: { size: "12" }
    }
  ];
};
const locationEditApi = rzrApi.injectEndpoints({
  endpoints: (builder) => ({
    updateLocationData: builder.mutation({
      query: (data) => ({
        url: "locations/update",
        method: "PUT",
        body: data
      }),
      invalidatesTags: [TagType.LOCATION],
      transformResponse: transformStandardResponseToCamelCase
    })
  })
});
const { useUpdateLocationDataMutation } = locationEditApi;
function LocationEditForm({
  locationData,
  locationSlug,
  onClose
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o;
  const { t: t2 } = useTranslation();
  const { goBack } = useIonRouter();
  const form = useFormWithSchema(locationEditFormSchema, {
    defaultValues: {
      locationSlug,
      title: (_a = locationData == null ? void 0 : locationData.title) != null ? _a : "",
      slug: (_b = locationData == null ? void 0 : locationData.slug) != null ? _b : "",
      description: (_c = locationData == null ? void 0 : locationData.description) != null ? _c : "",
      snippet: (_d = locationData == null ? void 0 : locationData.snippet) != null ? _d : null,
      active: (_e = locationData == null ? void 0 : locationData.active) != null ? _e : true,
      addressData: {
        street: (_g = (_f = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _f.street) != null ? _g : "",
        streetNumber: (_i = (_h = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _h.streetNumber) != null ? _i : "",
        municipality: (_k = (_j = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _j.municipality) != null ? _k : ""
      },
      phoneData: locationData == null ? void 0 : locationData.phoneData,
      wifiPassword: (_l = locationData == null ? void 0 : locationData.wifiPassword) != null ? _l : null,
      googleMapUrl: (_m = locationData == null ? void 0 : locationData.googleMapUrl) != null ? _m : null,
      coordinates: {
        lat: (_n = locationData == null ? void 0 : locationData.addressLat) != null ? _n : void 0,
        lng: (_o = locationData == null ? void 0 : locationData.addressLong) != null ? _o : void 0
      }
    }
  });
  const [updateLocation, updateLocationResponse] = useUpdateLocationDataMutation();
  const [showSuccessNotification] = useShowNotification({
    message: t2("Podaci su uspešno sačuvani"),
    color: "success"
  });
  const [showErrorNotification] = useShowNotification({
    message: t2("Greška pri čuvanju podataka"),
    color: "danger"
  });
  const formFields = (locationData == null ? void 0 : locationData.id) ? getLocationEditFormFields(locationData.id) : [];
  const formState = form.formState;
  const handleSubmit = (data) => {
    var _a2, _b2, _c2, _d2;
    updateLocation({
      locationSlug: data.locationSlug,
      title: data.title,
      slug: data.slug,
      description: data.description,
      snippet: data.snippet,
      active: data.active,
      addressData: data.addressData,
      phoneData: data.phoneData,
      addressLat: (_b2 = (_a2 = data.coordinates) == null ? void 0 : _a2.lat) != null ? _b2 : null,
      addressLong: (_d2 = (_c2 = data.coordinates) == null ? void 0 : _c2.lng) != null ? _d2 : null,
      wifiPassword: data.wifiPassword,
      googleMapUrl: data.googleMapUrl
    }).then((result) => {
      var _a3;
      if ("data" in result && ((_a3 = result.data) == null ? void 0 : _a3.success)) {
        goBack();
      }
    });
  };
  const handleAddressFormCallback = (field) => {
    var _a2, _b2;
    const getSearchedAddress = () => {
      const addressData = form.getValues("addressData");
      let search = "";
      let autoSearch = false;
      if (addressData) {
        const addressComponents = [
          addressData.streetNumber,
          addressData.street,
          addressData.municipality
        ];
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
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        CommonCoordinates$1,
        {
          label: "Koordinate",
          register: form.register("coordinates"),
          errorLat: (_a2 = formState.errors.coordinates) == null ? void 0 : _a2.lat,
          errorLong: (_b2 = formState.errors.coordinates) == null ? void 0 : _b2.lng,
          control: form.control,
          searchAddress: getSearchedAddress
        }
      );
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
    var _a2, _b2, _c2, _d2, _e2, _f2, _g2, _h2, _i2, _j2, _k2, _l2;
    if (locationData) {
      form.setValue("title", locationData.title);
      form.setValue("slug", locationData.slug);
      form.setValue("description", (_a2 = locationData.description) != null ? _a2 : "");
      form.setValue("snippet", (_b2 = locationData.snippet) != null ? _b2 : null);
      form.setValue("active", (_c2 = locationData.active) != null ? _c2 : true);
      form.setValue("addressData", {
        street: (_e2 = (_d2 = locationData.addressData) == null ? void 0 : _d2.street) != null ? _e2 : "",
        streetNumber: (_g2 = (_f2 = locationData.addressData) == null ? void 0 : _f2.streetNumber) != null ? _g2 : "",
        municipality: (_i2 = (_h2 = locationData.addressData) == null ? void 0 : _h2.municipality) != null ? _i2 : ""
      });
      form.setValue("wifiPassword", (_j2 = locationData.wifiPassword) != null ? _j2 : null);
      form.setValue("googleMapUrl", (_k2 = locationData.googleMapUrl) != null ? _k2 : null);
      form.setValue("phoneData", (_l2 = locationData.phoneData) != null ? _l2 : { phoneNumbers: [] });
      if (locationData.addressLat && locationData.addressLong) {
        form.setValue("coordinates", {
          lat: locationData.addressLat,
          lng: locationData.addressLong
        });
      }
    }
  }, [locationData, form]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(IonCardTitle, { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: createOutline }),
      t2("Izmeni podatke lokacije")
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(IonCardContent, { className: "ion-no-padding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DynamicForm,
        {
          fields: formFields,
          form,
          itemProps: { color: "light" },
          callback: handleAddressFormCallback
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        IonButton,
        {
          type: "submit",
          expand: "block",
          disabled: updateLocationResponse.isLoading,
          color: "success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: saveOutline, slot: "start" }),
            updateLocationResponse.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) : t2("Sačuvaj podatke")
          ]
        }
      ) }),
      updateLocationResponse.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ion-padding-top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonText, { color: "danger", children: t2("Greška pri čuvanju podataka") }) })
    ] }) })
  ] });
}
function LocationEditPage({
  isModalOpen,
  setIsModalOpen
}) {
  var _a, _b;
  const { t: t2 } = useTranslation();
  const { data: locationResponse, isLoading } = useGetFeLocationQuery(
    {
      slug: activeLocation
    },
    { skip: !!((_a = preloadedLocationData) == null ? void 0 : _a.id) }
  );
  const locationData = (_b = preloadedLocationData) != null ? _b : locationResponse == null ? void 0 : locationResponse.data;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, { name: "crescent" }) });
  }
  if (!locationData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: t2("Lokacija nije pronađena") }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    LocationEditForm,
    {
      locationData,
      locationSlug: activeLocation,
      onClose: () => setIsModalOpen(false)
    }
  ) });
}
export {
  LocationEditPage as default
};
