function getReservationUrlWithParams(params) {
  const searchParams = new URLSearchParams(params);
  return "/zakazivanje/zakazi-novo?".concat(searchParams.toString());
}
function getReservationUrlWithSlot(workerId, slot, date) {
  return getReservationUrlWithParams({
    worker: workerId.toString(),
    step: "1",
    slot,
    date
  });
}
export {
  getReservationUrlWithSlot as a,
  getReservationUrlWithParams as g
};
