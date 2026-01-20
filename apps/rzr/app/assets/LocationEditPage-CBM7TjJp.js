import { aX as O, aY as w, aZ as useMap, e as reactExports, R as React, j as jsxRuntimeExports, a_ as MapContainer, a$ as TileLayer, a2 as t, a9 as Controller, a7 as create$3, aL as create$5, aM as create$7, a8 as create$6, M as useTranslation, aN as create$2 } from "./vendor_react-g1Lb8P9R.js";
import { I as IonModal, e as IonHeader, f as IonToolbar, h as IonTitle, i as IonButtons, d as IonButton, b as IonIcon, j as closeOutline, k as IonContent, r as IonItem, p as IonFooter, m as IonText, G as IonLabel, t as IonInput, b3 as informationCircleOutline, bF as imagesOutline, bG as locationOutline, aR as settingsOutline, ao as useIonRouter, o as IonSpinner } from "./vendor_ionic-XqfGltiy.js";
import { F as FieldType, H as transformStandardResponseToCamelCase, b as useUser, q as useGetFeWorkersQuery, J as useShowNotification, x as useFormWithSchema, D as DynamicForm, K as SimpleFormStepperActions, M as photosArrayWithIdYup, O as StepIndicator, Q as SimpleFormStepper, m as useGetFeLocationQuery, n as activeLocation } from "./App-BTZwZ6xb.js";
import { t as rzrApi, v as TagType } from "./index-BVYNZAUg.js";
import { g as getLocationEditSettingsFormFields } from "./location-settings.data-CkL2xlcy.js";
import { u as usePendingImageUploads } from "./usePendingImageUploads-BUdhJMWe.js";
import { L } from "./vendor_leaflet-BPPv1iLj.js";
import "./vendor_firebase-DofBCW2C.js";
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
const LOCATION_STEPS = [
  {
    id: "basic-info",
    title: "Osnovni podaci",
    icon: informationCircleOutline
  },
  {
    id: "pictures",
    title: "Slike",
    icon: imagesOutline
  },
  {
    id: "location",
    title: "Adresa",
    icon: locationOutline
  },
  {
    id: "settings",
    title: "Podešavanja",
    icon: settingsOutline
  }
];
const LOCATION_STEP_CONFIG = {
  steps: LOCATION_STEPS,
  maxSteps: LOCATION_STEPS.length
};
const locationEditFormSchema = create$3().shape({
  locationSlug: create$6().required(t("Polje je obavezno")),
  title: create$6().required(t("Naslov je obavezan")),
  slug: create$6().required(t("Slug je obavezan")),
  description: create$6().required(t("Opis je obavezan")),
  snippet: create$6().nullable().defined(),
  active: create$7().required(),
  isPrivate: create$7().required(),
  hasMultipleActivities: create$7().nullable().defined(),
  mainOwnerId: create$5().nullable().defined()
});
const getLocationEditFormFields = (locationId, isAdmin, ownerUsers) => {
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
      keyName: "active",
      name: "active",
      data: {
        type: FieldType.Switch,
        label: t("Lokacija Aktivna")
      },
      disabled: !isAdmin,
      gridSize: { size: "12" }
    },
    {
      keyName: "isPrivate",
      name: "isPrivate",
      data: {
        type: FieldType.Switch,
        label: t("Sakriveno od klijenata")
      },
      disabled: !isAdmin,
      gridSize: { size: "12" }
    },
    {
      keyName: "hasMultipleActivities",
      name: "hasMultipleActivities",
      data: {
        type: FieldType.Switch,
        label: t("Ima više delatnosti")
      },
      disabled: !isAdmin,
      gridSize: { size: "12" }
    },
    {
      keyName: "mainOwnerId",
      name: "mainOwnerId",
      data: {
        type: FieldType.Select,
        label: t("Glavni vlasnik"),
        options: ownerUsers.length > 0 ? ownerUsers.map((user) => ({
          text: user.email ? user.name ? "".concat(user.name, " (").concat(user.email, ")") : user.email : user.name || "",
          value: user.id.toString()
        })) : [],
        selectProps: {
          interface: "action-sheet"
        }
      },
      disabled: !isAdmin,
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
function LocationBasicInfoStep({
  locationData,
  locationSlug,
  locationId,
  onBack,
  onNext,
  onExit,
  isBackDisabled = false,
  isLastPage = false
}) {
  var _a, _b, _c, _d, _e, _f;
  const { t: t2 } = useTranslation();
  const { isAdmin } = useUser();
  const { data: workersData } = useGetFeWorkersQuery({
    locationSlug
  });
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [updateLocation] = useUpdateLocationDataMutation();
  useShowNotification({
    message: t2("Podaci su uspešno sačuvani"),
    color: "success"
  });
  const [showErrorNotification] = useShowNotification({
    message: t2("Greška pri čuvanju podataka"),
    color: "danger"
  });
  const ownerUsers = reactExports.useMemo(() => {
    if (!(workersData == null ? void 0 : workersData.data)) {
      return [];
    }
    return workersData.data.filter((worker) => worker.userId !== null && worker.userId !== void 0).map((worker) => {
      var _a2;
      return {
        id: worker.userId,
        name: worker.fullName || "NN",
        email: ((_a2 = worker.userData) == null ? void 0 : _a2.email) || "NN"
      };
    });
  }, [workersData]);
  const form = useFormWithSchema(locationEditFormSchema, {
    defaultValues: {
      locationSlug,
      title: (locationData == null ? void 0 : locationData.title) || "",
      slug: (locationData == null ? void 0 : locationData.slug) || "",
      description: (_a = locationData == null ? void 0 : locationData.description) != null ? _a : "",
      snippet: (_b = locationData == null ? void 0 : locationData.snippet) != null ? _b : null,
      active: (_c = locationData == null ? void 0 : locationData.active) != null ? _c : true,
      isPrivate: (_d = locationData == null ? void 0 : locationData.isPrivate) != null ? _d : false,
      hasMultipleActivities: (_e = locationData == null ? void 0 : locationData.hasMultipleActivities) != null ? _e : false,
      mainOwnerId: (_f = locationData == null ? void 0 : locationData.mainOwnerId) != null ? _f : null
    }
  });
  const formFields = locationId ? getLocationEditFormFields(locationId, isAdmin, ownerUsers) : [];
  const handleSubmit = (formValues) => {
    var _a2, _b2, _c2, _d2, _e2;
    setIsSaving(true);
    return updateLocation({
      locationSlug,
      title: formValues.title || "",
      slug: formValues.slug || "",
      description: formValues.description || "",
      snippet: (_a2 = formValues.snippet) != null ? _a2 : null,
      active: (_b2 = formValues.active) != null ? _b2 : true,
      isPrivate: (_c2 = formValues.isPrivate) != null ? _c2 : false,
      hasMultipleActivities: (_d2 = formValues.hasMultipleActivities) != null ? _d2 : null,
      mainOwnerId: (_e2 = formValues.mainOwnerId) != null ? _e2 : null
    }).unwrap().then((result) => {
      setIsSaving(false);
      if (result == null ? void 0 : result.success) {
        onNext == null ? void 0 : onNext();
      }
    }).catch(() => {
      setIsSaving(false);
      showErrorNotification();
      return false;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DynamicForm,
      {
        fields: formFields,
        form,
        itemProps: { color: "light" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepperActions,
      {
        onBack,
        onAction: form.handleSubmit(handleSubmit),
        onExit,
        isBackDisabled,
        isLastPage,
        isLoading: isSaving
      }
    )
  ] });
}
const locationSettingsFormSchema = create$3().shape({
  wifiPassword: create$6().nullable().defined(),
  pwaMetadata: create$3().shape({
    name: create$6().nullable().defined(),
    shortName: create$6().nullable().defined(),
    themeColor: create$6().nullable().defined(),
    backgroundColor: create$6().nullable().defined(),
    scope: create$6().nullable().defined()
  })
});
function LocationSettingsStep({
  locationData,
  locationSlug,
  onBack,
  onNext,
  onExit,
  isBackDisabled = false,
  isLastPage = false
}) {
  var _a;
  const { t: t2 } = useTranslation();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [updateLocation] = useUpdateLocationDataMutation();
  const [showErrorNotification] = useShowNotification({
    message: t2("Greška pri čuvanju podataka"),
    color: "danger"
  });
  const form = useFormWithSchema(locationSettingsFormSchema, {
    defaultValues: {
      wifiPassword: (_a = locationData == null ? void 0 : locationData.wifiPassword) != null ? _a : null,
      pwaMetadata: (locationData == null ? void 0 : locationData.pwaMetadata) || {
        name: null,
        shortName: null,
        themeColor: null,
        backgroundColor: null,
        scope: null
      }
    }
  });
  const formFields = getLocationEditSettingsFormFields();
  const handleSubmit = (formValues) => {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
    setIsSaving(true);
    const pwaMetadata = {
      name: (_b = (_a2 = formValues.pwaMetadata) == null ? void 0 : _a2.name) != null ? _b : null,
      shortName: (_d = (_c = formValues.pwaMetadata) == null ? void 0 : _c.shortName) != null ? _d : null,
      themeColor: (_f = (_e = formValues.pwaMetadata) == null ? void 0 : _e.themeColor) != null ? _f : null,
      backgroundColor: (_h = (_g = formValues.pwaMetadata) == null ? void 0 : _g.backgroundColor) != null ? _h : null,
      scope: (_j = (_i = formValues.pwaMetadata) == null ? void 0 : _i.scope) != null ? _j : null
    };
    return updateLocation({
      locationSlug,
      wifiPassword: (_k = formValues.wifiPassword) != null ? _k : null,
      pwaMetadata
    }).unwrap().then((result) => {
      setIsSaving(false);
      if (result == null ? void 0 : result.success) {
        if (!isLastPage) {
          onNext == null ? void 0 : onNext();
        } else {
          onExit == null ? void 0 : onExit();
        }
      }
    }).catch(() => {
      setIsSaving(false);
      showErrorNotification();
      return false;
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DynamicForm,
      {
        fields: formFields,
        form,
        itemProps: { color: "light" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepperActions,
      {
        onBack,
        onAction: form.handleSubmit(handleSubmit),
        isBackDisabled,
        isLastPage,
        isLoading: isSaving
      }
    )
  ] });
}
const convertToPhoto = (productPhoto) => {
  if (!productPhoto) return [];
  return [
    {
      id: productPhoto.id,
      url: productPhoto.path,
      name: productPhoto.fileName,
      index: 0
    }
  ];
};
const convertGalleryToPhotos = (gallery) => {
  if (!gallery || !Array.isArray(gallery)) return [];
  return gallery.map((photo, index) => ({
    id: photo.id,
    url: photo.path,
    name: photo.fileName,
    index
  }));
};
const getLocationImagesFormFields = (locationData, locationSlug = "", onImageUploadSuccess) => [
  {
    keyName: "logo",
    name: "logo",
    data: {
      type: FieldType.GalleryArea,
      label: t("Logo"),
      oneImage: true,
      maxPhotos: 1,
      photos: convertToPhoto(locationData == null ? void 0 : locationData.logo),
      uploadRequestData: { locationSlug, attachmentName: "logo" },
      deleteRequestData: { locationSlug, attachmentName: "logo" },
      uploadUrl: "rzr/locations/image/upload",
      deleteUrl: "rzr/locations/image/delete",
      uploadBehavior: "onSaveBefore",
      cropAspectRatio: {
        width: 1,
        height: 1
      },
      onUploadSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onUploadError: (error) => {
        console.error("Logo upload error:", error);
      },
      onDeleteSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onDeleteError: (error) => {
        console.error("Logo delete error:", error);
      }
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "cover",
    name: "cover",
    data: {
      type: FieldType.GalleryArea,
      label: t("Cover slika"),
      oneImage: true,
      maxPhotos: 1,
      photos: convertToPhoto(locationData == null ? void 0 : locationData.cover),
      uploadRequestData: { locationSlug, attachmentName: "cover" },
      deleteRequestData: { locationSlug, attachmentName: "cover" },
      uploadUrl: "rzr/locations/image/upload",
      deleteUrl: "rzr/locations/image/delete",
      uploadBehavior: "onSaveBefore",
      cropAspectRatio: {
        width: 16,
        height: 9
      },
      onUploadSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onUploadError: (error) => {
        console.error("Cover upload error:", error);
      },
      onDeleteSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onDeleteError: (error) => {
        console.error("Cover delete error:", error);
      }
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "gallery",
    name: "gallery",
    data: {
      type: FieldType.GalleryArea,
      label: t("Galerija slika"),
      photos: convertGalleryToPhotos(locationData == null ? void 0 : locationData.gallery),
      uploadRequestData: { locationSlug, attachmentName: "gallery" },
      deleteRequestData: { locationSlug, attachmentName: "gallery" },
      reorderRequestData: { locationSlug, attachmentName: "gallery" },
      uploadUrl: "rzr/locations/image/upload",
      deleteUrl: "rzr/locations/image/delete",
      reorderUrl: "rzr/locations/image/reorder",
      uploadBehavior: "onSaveBefore",
      maxPhotos: 20,
      maxSize: 2 * 1024 * 1024,
      // 2MB
      onUploadSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onUploadError: (error) => {
        console.error("Gallery upload error:", error);
      },
      onDeleteSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onDeleteError: (error) => {
        console.error("Gallery delete error:", error);
      },
      onReorderSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onReorderError: (error) => {
        console.error("Gallery reorder error:", error);
      }
    },
    gridSize: { size: "12" }
  },
  {
    keyName: "pwaIcon",
    name: "pwaIcon",
    data: {
      type: FieldType.GalleryArea,
      label: t("PWA ikonica (favicon, manifest, iOS)"),
      oneImage: true,
      maxPhotos: 1,
      photos: convertToPhoto(locationData == null ? void 0 : locationData.pwaIcon),
      uploadRequestData: { locationSlug, attachmentName: "pwa_icon" },
      deleteRequestData: { locationSlug, attachmentName: "pwa_icon" },
      uploadUrl: "rzr/locations/image/upload",
      deleteUrl: "rzr/locations/image/delete",
      uploadBehavior: "onSaveBefore",
      cropAspectRatio: {
        width: 1,
        height: 1
      },
      onUploadSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onUploadError: (error) => {
        console.error("PWA Icon upload error:", error);
      },
      onDeleteSuccess: () => {
        onImageUploadSuccess == null ? void 0 : onImageUploadSuccess();
      },
      onDeleteError: (error) => {
        console.error("PWA Icon delete error:", error);
      }
    },
    gridSize: { size: "12" }
  }
];
const locationImagesValidationSchema = create$3().shape({
  logo: photosArrayWithIdYup(),
  cover: photosArrayWithIdYup(),
  gallery: photosArrayWithIdYup(),
  pwaIcon: photosArrayWithIdYup()
});
function LocationPicturesStep({
  locationData,
  locationSlug,
  onBack,
  onNext,
  onSave,
  isBackDisabled = false,
  isLastPage = false,
  onImageUploadSuccess
}) {
  const form = useFormWithSchema(locationImagesValidationSchema, {
    defaultValues: {
      logo: null,
      cover: null,
      gallery: null
    }
  });
  const imageFields = getLocationImagesFormFields(
    locationData,
    locationSlug,
    onImageUploadSuccess
  );
  const { uploadingImages } = usePendingImageUploads(form, [
    "logo",
    "cover",
    "gallery"
  ]);
  const handleSubmit = () => {
    if (isLastPage) ;
    else {
      onNext == null ? void 0 : onNext();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DynamicForm,
      {
        fields: imageFields,
        form,
        itemProps: { color: "light" }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepperActions,
      {
        onBack,
        onAction: form.handleSubmit(handleSubmit),
        isBackDisabled,
        isLastPage,
        uploadingImages,
        isUploadOnly: true
      }
    )
  ] });
}
const locationLocationFormSchema = create$3().shape({
  locationSlug: create$6().required(t("Polje je obavezno")),
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
  googleMapUrl: create$6().url(t("URL mora biti validan")).nullable().defined()
});
const getLocationLocationFormFields = () => {
  return [
    {
      keyName: "googleMapUrl",
      name: "googleMapUrl",
      data: {
        type: FieldType.Text,
        label: t("Google Maps URL")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "addressData",
      keyNameChild: "municipality",
      name: "Opština",
      data: {
        type: FieldType.Text,
        label: t("Opština")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "addressData",
      keyNameChild: "street",
      name: "Ulica",
      data: {
        type: FieldType.Text,
        label: t("Ulica")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "addressData",
      keyNameChild: "streetNumber",
      name: "Broj ulice",
      data: {
        type: FieldType.Text,
        label: t("Broj ulice")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "coordinates",
      name: "Koordinate",
      data: {
        type: FieldType.Callback,
        label: t("Koordinate")
      },
      gridSize: { size: "12" }
    },
    {
      keyName: "phoneData",
      keyNameChild: "phoneNumbers",
      name: "Brojevi telefona",
      data: {
        type: FieldType.List,
        label: t("Brojevi telefona"),
        inputType: "tel"
      },
      gridSize: { size: "12" }
    }
  ];
};
function LocationLocationStep({
  locationData,
  locationSlug,
  onBack,
  onNext,
  onExit,
  isBackDisabled = false,
  isLastPage = false
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const { t: t2 } = useTranslation();
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [updateLocation] = useUpdateLocationDataMutation();
  const [showErrorNotification] = useShowNotification({
    message: t2("Greška pri čuvanju podataka"),
    color: "danger"
  });
  const form = useFormWithSchema(locationLocationFormSchema, {
    defaultValues: {
      locationSlug,
      addressData: {
        street: (_b = (_a = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _a.street) != null ? _b : "",
        streetNumber: (_d = (_c = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _c.streetNumber) != null ? _d : "",
        municipality: (_f = (_e = locationData == null ? void 0 : locationData.addressData) == null ? void 0 : _e.municipality) != null ? _f : ""
      },
      phoneData: (_g = locationData == null ? void 0 : locationData.phoneData) != null ? _g : { phoneNumbers: [] },
      googleMapUrl: (_h = locationData == null ? void 0 : locationData.googleMapUrl) != null ? _h : null,
      coordinates: {
        lat: (_i = locationData == null ? void 0 : locationData.addressLat) != null ? _i : void 0,
        lng: (_j = locationData == null ? void 0 : locationData.addressLong) != null ? _j : void 0
      }
    }
  });
  const formFields = getLocationLocationFormFields();
  const handleSubmit = (formValues) => {
    var _a2, _b2, _c2, _d2, _e2;
    setIsSaving(true);
    return updateLocation({
      locationSlug,
      addressData: formValues.addressData || {
        street: "",
        streetNumber: "",
        municipality: ""
      },
      phoneData: formValues.phoneData || { phoneNumbers: [] },
      addressLat: (_b2 = (_a2 = formValues.coordinates) == null ? void 0 : _a2.lat) != null ? _b2 : null,
      addressLong: (_d2 = (_c2 = formValues.coordinates) == null ? void 0 : _c2.lng) != null ? _d2 : null,
      googleMapUrl: (_e2 = formValues.googleMapUrl) != null ? _e2 : null
    }).unwrap().then((result) => {
      setIsSaving(false);
      if (result == null ? void 0 : result.success) {
        if (!isLastPage) {
          onNext == null ? void 0 : onNext();
        } else {
          onExit == null ? void 0 : onExit();
        }
      }
    }).catch(() => {
      setIsSaving(false);
      showErrorNotification();
      return false;
    });
  };
  const handleFormCallback = (field) => {
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
          label: t2("Koordinate"),
          register: form.register("coordinates"),
          errorLat: (_a2 = form.formState.errors.coordinates) == null ? void 0 : _a2.lat,
          errorLong: (_b2 = form.formState.errors.coordinates) == null ? void 0 : _b2.lng,
          control: form.control,
          searchAddress: getSearchedAddress
        }
      );
    }
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DynamicForm,
      {
        fields: formFields,
        form,
        itemProps: { color: "light" },
        callback: handleFormCallback
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepperActions,
      {
        onBack,
        onAction: form.handleSubmit(handleSubmit),
        onExit,
        isBackDisabled,
        isLastPage,
        isLoading: isSaving
      }
    )
  ] });
}
function LocationEditForm({
  locationData,
  locationSlug,
  onClose
}) {
  const { goBack } = useIonRouter();
  const [currentStep, setCurrentStep] = reactExports.useState(0);
  const isFirstPage = currentStep === 0;
  const isLastPage = currentStep === LOCATION_STEP_CONFIG.steps.length - 1;
  const handleStepChange = (step) => {
    if (step !== void 0) {
      setCurrentStep(step);
    }
  };
  const handleNext = () => {
    if (currentStep < LOCATION_STEP_CONFIG.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderSteps = () => {
    return [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationBasicInfoStep,
        {
          locationData,
          locationSlug,
          locationId: locationData == null ? void 0 : locationData.id,
          onNext: handleNext,
          onExit: goBack,
          isBackDisabled: isFirstPage,
          isLastPage
        },
        "basic-info"
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationPicturesStep,
        {
          locationData,
          locationSlug,
          onBack: handleBack,
          onNext: handleNext,
          isBackDisabled: isFirstPage,
          isLastPage
        },
        "pictures"
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationLocationStep,
        {
          locationData,
          locationSlug,
          onBack: handleBack,
          onNext: handleNext,
          onExit: goBack,
          isBackDisabled: isFirstPage,
          isLastPage
        },
        "location"
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LocationSettingsStep,
        {
          locationData,
          locationSlug,
          onBack: handleBack,
          onNext: handleNext,
          onExit: goBack,
          isBackDisabled: isFirstPage,
          isLastPage
        },
        "settings"
      )
    ];
  };
  if (!locationData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(IonSpinner, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StepIndicator,
      {
        steps: LOCATION_STEP_CONFIG.steps,
        currentStep,
        allowStepNavigation: true,
        onStepClick: setCurrentStep
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SimpleFormStepper,
      {
        renderSteps,
        initialStep: 0,
        currentStep: currentStep || 0,
        onCurrentStepChange: handleStepChange
      }
    )
  ] });
}
function LocationEditPage({
  isModalOpen,
  setIsModalOpen
}) {
  const { t: t2 } = useTranslation();
  const { data: locationResponse, isLoading } = useGetFeLocationQuery({
    slug: activeLocation
  });
  const locationData = locationResponse == null ? void 0 : locationResponse.data;
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
