import { j as jsxRuntimeExports } from "./vendor_react-Begs2_df.js";
import { d as IonButton, l as IonIcon, by as chevronBack, bz as chevronForward } from "./vendor_ionic-BfPI5OT6.js";
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  className = ""
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-4 ".concat(className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonButton,
      {
        fill: "clear",
        onClick: handlePrevPage,
        disabled: currentPage === 1 || isLoading,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronBack })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
      currentPage,
      "/",
      totalPages
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      IonButton,
      {
        fill: "clear",
        onClick: handleNextPage,
        disabled: currentPage === totalPages || isLoading,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IonIcon, { icon: chevronForward })
      }
    )
  ] });
};
export {
  Pagination as P
};
