;
(function () {
  System.register([], function (exports, module) {
    'use strict';

    return {
      execute: function () {
        var AppointmentStatus = exports("a", /* @__PURE__ */(AppointmentStatus2 => {
          AppointmentStatus2[AppointmentStatus2["DRAFT"] = 0] = "DRAFT";
          AppointmentStatus2[AppointmentStatus2["PENDING"] = 1] = "PENDING";
          AppointmentStatus2[AppointmentStatus2["CONFIRMED"] = 2] = "CONFIRMED";
          AppointmentStatus2[AppointmentStatus2["CANCELLED"] = 3] = "CANCELLED";
          AppointmentStatus2[AppointmentStatus2["NO_SHOW"] = 4] = "NO_SHOW";
          return AppointmentStatus2;
        })(AppointmentStatus || {}));
        const APPOINTMENT_STATUS_LABELS = exports("A", {
          [0 /* DRAFT */]: "Nacrt",
          [1 /* PENDING */]: "Na čekanju",
          [2 /* CONFIRMED */]: "Potvrđen",
          [3 /* CANCELLED */]: "Otkazan",
          [4 /* NO_SHOW */]: "Nije se pojavio"
        });
      }
    };
  });
})();
