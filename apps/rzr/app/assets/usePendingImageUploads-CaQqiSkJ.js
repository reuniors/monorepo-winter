import { a7 as useWatch, e as reactExports } from "./vendor_react-CcaSbe82.js";
function usePendingImageUploads(form, imageFieldNames) {
  const formValues = useWatch({ control: form.control });
  const detectedImageFields = reactExports.useMemo(() => {
    if (imageFieldNames) {
      return imageFieldNames;
    }
    const allValues = form.getValues();
    const detected = [];
    for (const key in allValues) {
      const value = allValues[key];
      if (Array.isArray(value) && value.length > 0 && value.some(
        (item) => item && typeof item === "object" && "url" in item
      )) {
        detected.push(key);
      } else if (Array.isArray(value) && value.length === 0) ;
    }
    return detected;
  }, [form, imageFieldNames]);
  const pendingImagesByField = reactExports.useMemo(() => {
    const counts = {};
    const allValues = form.getValues();
    detectedImageFields.forEach((fieldName) => {
      const fieldValue = allValues[fieldName];
      if (Array.isArray(fieldValue)) {
        const pendingCount = fieldValue.filter(
          (photo) => !(photo == null ? void 0 : photo.id) || photo.id === null || photo.id === void 0
        ).length;
        counts[fieldName] = pendingCount;
      } else {
        counts[fieldName] = 0;
      }
    });
    return counts;
  }, [form, detectedImageFields, formValues]);
  const uploadingImages = reactExports.useMemo(() => {
    return Object.values(pendingImagesByField).reduce(
      (sum, count) => sum + count,
      0
    );
  }, [pendingImagesByField]);
  const hasPendingUploads = uploadingImages > 0;
  return {
    uploadingImages,
    hasPendingUploads,
    pendingImagesByField,
    imageFieldNames: detectedImageFields
  };
}
export {
  usePendingImageUploads as u
};
