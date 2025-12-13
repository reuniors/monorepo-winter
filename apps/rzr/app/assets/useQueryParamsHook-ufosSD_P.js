import { aE as useHistory, e as reactExports } from "./vendor_react-DSVIR5Ln.js";
function useQueryParamsHook({
  beforeNavigation,
  afterNavigation
}) {
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  const paramsData = Object.fromEntries(params.entries());
  const [queryParamsData, setQueryParamsData] = reactExports.useState(paramsData);
  const updateQueryParams = reactExports.useCallback(
    (name, value) => {
      beforeNavigation == null ? void 0 : beforeNavigation();
      const params2 = new URLSearchParams(window.location.search);
      if (!value) {
        if (Array.isArray(name)) {
          name.forEach((n) => {
            params2.delete(n);
          });
        } else {
          params2.delete(name);
        }
        setQueryParamsData((prev) => {
          if (Array.isArray(name)) {
            return name.reduce((acc, n) => {
              const { [n]: _, ...rest } = acc;
              return rest;
            }, prev);
          } else {
            const { [name]: _, ...rest } = prev;
            return rest;
          }
        });
      } else {
        if (Array.isArray(name)) {
          name.forEach((n) => {
            params2.set(n, value);
          });
        } else {
          params2.set(name, value);
        }
        setQueryParamsData((prev) => {
          if (Array.isArray(name)) {
            return name.reduce((acc, n) => {
              return { ...acc, [n]: value };
            }, prev);
          } else {
            return { ...prev, [name]: value };
          }
        });
      }
      history.replace({ search: params2.toString() });
      afterNavigation == null ? void 0 : afterNavigation();
    },
    [history]
  );
  const deleteQueryParams = reactExports.useCallback(
    (name) => {
      updateQueryParams(name, null);
    },
    [updateQueryParams]
  );
  return {
    update: updateQueryParams,
    delete: deleteQueryParams,
    data: queryParamsData
  };
}
export {
  useQueryParamsHook as u
};
