import { e as reactExports, j as jsxRuntimeExports, b9 as buildExports } from "./vendor_react-qB5C-kEe.js";
const preloadCoverImg$1 = "/app/assets/preload-cover-CPxF8vUC.webp";
const preloadSquareImg = "/app/assets/preload-square-DKFvohGs.webp";
const imageCache = {};
const preloadImage = (url) => {
  if (!imageCache[url]) {
    const img = new Image();
    img.src = url;
    imageCache[url] = img;
  }
};
const pl = (url) => {
  if (!url) {
    return void 0;
  }
  preloadImage(url);
  return imageCache[url].src;
};
function LazyLoadImgStandard({
  preloadRatio,
  preloadImg,
  ...props
}) {
  const [showEffect, setShowEffect] = reactExports.useState(true);
  const src = pl(props.src);
  preloadImg = preloadImg != null ? preloadImg : preloadRatio === "1-1" ? preloadSquareImg : preloadCoverImg$1;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    buildExports.LazyLoadImage,
    {
      onLoad: () => showEffect && setShowEffect(false),
      effect: showEffect ? "blur" : void 0,
      placeholderSrc: preloadImg,
      ...props,
      src
    }
  );
}
const LazyLoadImgStandard$1 = reactExports.memo(LazyLoadImgStandard);
const preloadCoverImg = "/app/assets/logo-square-Bsnn6NiG.webp";
export {
  LazyLoadImgStandard$1 as L,
  preloadCoverImg as p
};
