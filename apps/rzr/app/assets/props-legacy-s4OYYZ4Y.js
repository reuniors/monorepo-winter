;
(function () {
  System.register([], function (exports, module) {
    'use strict';

    return {
      execute: function () {
        exports("u", useDefaultProps);
        function useDefaultProps(props, defaultProps) {
          return {
            ...defaultProps,
            ...props
          };
        }
      }
    };
  });
})();
