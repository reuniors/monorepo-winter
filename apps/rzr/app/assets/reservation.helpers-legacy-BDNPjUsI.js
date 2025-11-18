;
(function () {
  System.register([], function (exports, module) {
    'use strict';

    return {
      execute: function () {
        exports({
          a: getReservationUrlWithSlot,
          g: getReservationUrlWithParams
        });
        function getReservationUrlWithParams(params) {
          const searchParams = new URLSearchParams(params);
          return `/zakazivanje/zakazi-novo?${searchParams.toString()}`;
        }
        function getReservationUrlWithSlot(workerId, slot, date) {
          return getReservationUrlWithParams({
            worker: workerId.toString(),
            step: "1",
            slot,
            date
          });
        }
      }
    };
  });
})();
