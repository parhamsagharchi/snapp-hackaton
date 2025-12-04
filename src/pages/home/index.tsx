import { useMemo } from "react";
import { PageLayout } from "@/components/shared/layout/PageLayout";
import { useMapStore, type IPassenger, type IParcel } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { findBestParcelOffers } from "@/utils/parcelOffers";
import { calculateDistance } from "@/utils/tsp";
import toast from "react-hot-toast";

function HomePage() {
  const driver = useMapStore((state) => state.driver);
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const setSelectedPassenger = useMapStore(
    (state) => state.setSelectedPassenger
  );
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);
  const optimizedRoute = useMapStore((state) => state.optimizedRoute);
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );
  const originSelectionRadius = useSettingsStore(
    (state) => state.originSelectionRadius
  );
  const destinationSelectionRadius = useSettingsStore(
    (state) => state.destinationSelectionRadius
  );

  const simulationActive = useMapStore((state) => state.simulationActive);
  const setSimulationActive = useMapStore((state) => state.setSimulationActive);

  // Filter out passengers with orderOptionsActive = true
  const availablePassengers = passengers.filter((p) => !p.orderOptionsActive);

  // Calculate best parcel offers when passenger is selected
  // Skip if passenger has orderOptionsActive = true
  const parcelOffers = useMemo(() => {
    if (selectedPassenger && !selectedPassenger.orderOptionsActive) {
      return findBestParcelOffers(
        driver,
        selectedPassenger,
        parcels,
        routeOrderPreference === "package_first",
        5,
        originSelectionRadius,
        destinationSelectionRadius
      );
    }
    return [];
  }, [
    selectedPassenger,
    driver,
    parcels,
    routeOrderPreference,
    originSelectionRadius,
    destinationSelectionRadius,
  ]);

  const handleSelectPassenger = (passenger: IPassenger) => {
    if (passenger.orderOptionsActive) {
      toast.error(
        "این مسافر گزینه‌های سفارش فعال دارد و نمی‌تواند بسته دریافت کند"
      );
      return;
    }
    setSelectedPassenger(passenger);
    toast.success(`مسافر ${passenger.displayName} انتخاب شد`);
  };

  const handleSelectParcel = (parcel: IParcel) => {
    if (!selectedPassenger) {
      toast.error("ابتدا یک مسافر انتخاب کنید");
      return;
    }

    // Check origin radius
    const originDistance = calculateDistance(selectedPassenger, parcel) * 1000; // Convert to meters

    // Use passenger destination or default
    const passengerDest = selectedPassenger.destination || {
      lat: selectedPassenger.lat + 0.05,
      lng: selectedPassenger.lng + 0.05,
    };

    // Use parcel destination or default
    const parcelDest = parcel.destination || {
      lat: parcel.lat + 0.05,
      lng: parcel.lng + 0.05,
    };

    // Check destination radius
    const destinationDistance =
      calculateDistance(passengerDest, parcelDest) * 1000; // Convert to meters

    if (originDistance > originSelectionRadius) {
      toast.error(
        `مبدا این بسته خارج از محدوده انتخاب است (${(
          originDistance / 1000
        ).toFixed(1)} کیلومتر)`
      );
      return;
    }

    if (destinationDistance > destinationSelectionRadius) {
      toast.error(
        `مقصد این بسته خارج از محدوده انتخاب است (${(
          destinationDistance / 1000
        ).toFixed(1)} کیلومتر)`
      );
      return;
    }

    setSelectedParcel(parcel);
    toast.success(`بسته ${parcel.displayName} انتخاب شد`);
  };

  const handleStartSimulation = () => {
    if (!selectedPassenger) {
      toast.error("ابتدا یک مسافر انتخاب کنید");
      return;
    }
    if (!selectedParcel) {
      toast.error("ابتدا یک بسته انتخاب کنید");
      return;
    }
    if (!optimizedRoute || optimizedRoute.length === 0) {
      toast.error("مسیر بهینه‌سازی نشده است");
      return;
    }

    setSimulationActive(true);
    toast.success("شبیه‌سازی شروع شد");
  };

  const handleStopSimulation = () => {
    setSimulationActive(false);
    toast("شبیه‌سازی متوقف شد", { icon: "ℹ️" });
  };

  const handleClearSelection = () => {
    setSelectedPassenger(null);
    setSelectedParcel(null);
    setSimulationActive(false);
    toast("انتخاب‌ها پاک شد", { icon: "ℹ️" });
  };

  return (
    <PageLayout title="شبیه‌سازی مسیر">
      <div className="space-y-3">
        {/* Simulation Controls */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                کنترل شبیه‌سازی
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                ابتدا مسافر و سپس بسته را انتخاب کنید
              </p>
            </div>
            <div className="flex gap-1.5">
              {simulationActive ? (
                <button
                  onClick={handleStopSimulation}
                  className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
                >
                  توقف شبیه‌سازی
                </button>
              ) : (
                <button
                  onClick={handleStartSimulation}
                  disabled={!selectedPassenger || !selectedParcel}
                  className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  شروع شبیه‌سازی
                </button>
              )}
              {(selectedPassenger || selectedParcel) && (
                <button
                  onClick={handleClearSelection}
                  className="rounded-md border border-slate-600 bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-600"
                >
                  پاک کردن انتخاب‌ها
                </button>
              )}
            </div>
          </div>

          {/* Selected Info */}
          {(selectedPassenger || selectedParcel) && (
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              {selectedPassenger && (
                <div className="rounded-md border border-green-500/30 bg-green-500/10 p-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">👤</span>
                    <div>
                      <div className="text-xs font-semibold text-green-400">
                        مسافر انتخاب شده
                      </div>
                      <div className="text-xs text-slate-300">
                        {selectedPassenger.displayName}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedParcel && (
                <div className="rounded-md border border-orange-500/30 bg-orange-500/10 p-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">📦</span>
                    <div>
                      <div className="text-xs font-semibold text-orange-400">
                        بسته انتخاب شده
                      </div>
                      <div className="text-xs text-slate-300">
                        {selectedParcel.displayName}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Route Info */}
          {optimizedRoute && optimizedRoute.length > 0 && (
            <div className="mt-2 rounded-md border border-blue-500/30 bg-blue-500/10 p-2">
              <div className="text-xs font-semibold text-blue-400">
                مسیر بهینه‌سازی شده
              </div>
              <div className="mt-1 text-xs text-slate-300">
                تعداد نقاط: {optimizedRoute.length} | فاصله کل:{" "}
                {optimizedRoute
                  .reduce((sum, point, i, arr) => {
                    if (i === 0) return 0;
                    return sum + calculateDistance(arr[i - 1], point);
                  }, 0)
                  .toFixed(2)}{" "}
                کیلومتر
              </div>
            </div>
          )}
        </div>

        {/* Passengers Section */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h3 className="mb-2 text-sm font-semibold text-slate-100">
            انتخاب مسافر
          </h3>
          {availablePassengers.length === 0 ? (
            <p className="text-xs text-slate-400">
              هیچ مسافر مناسبی موجود نیست (مسافران با گزینه‌های سفارش فعال نمایش
              داده نمی‌شوند)
            </p>
          ) : (
            <div className="grid gap-1.5 md:grid-cols-2 lg:grid-cols-3">
              {availablePassengers.map((passenger, index) => {
                const isSelected =
                  selectedPassenger &&
                  selectedPassenger.lat === passenger.lat &&
                  selectedPassenger.lng === passenger.lng;
                const distance = calculateDistance(driver, passenger);

                return (
                  <div
                    key={index}
                    onClick={() => handleSelectPassenger(passenger)}
                    className={`cursor-pointer rounded-md border p-2 transition-all ${
                      isSelected
                        ? "border-green-500 bg-green-500/20"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">👤</span>
                        <div>
                          <div className="text-xs font-medium text-slate-100">
                            {passenger.displayName}
                          </div>
                          <div className="text-xs text-slate-400">
                            فاصله: {distance.toFixed(2)} کیلومتر
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <span className="text-xs text-green-400">✓</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Parcel Offers Section */}
        {selectedPassenger && (
          <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
            <h3 className="mb-2 text-sm font-semibold text-slate-100">
              پیشنهادات بسته (الگوریتم TSP)
            </h3>
            {parcelOffers.length === 0 ? (
              <p className="text-xs text-slate-400">
                بسته مناسبی در محدوده انتخاب شده یافت نشد
              </p>
            ) : (
              <div className="space-y-1.5">
                {parcelOffers.map((offer, index) => {
                  const isSelected =
                    selectedParcel &&
                    selectedParcel.lat === offer.parcel.lat &&
                    selectedParcel.lng === offer.parcel.lng;
                  const distance = calculateDistance(
                    selectedPassenger,
                    offer.parcel
                  );

                  return (
                    <div
                      key={index}
                      onClick={() => handleSelectParcel(offer.parcel)}
                      className={`cursor-pointer rounded-md border p-2 transition-all ${
                        isSelected
                          ? "border-orange-500 bg-orange-500/20"
                          : index === 0
                          ? "border-yellow-500/50 bg-yellow-500/10"
                          : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-1.5">
                          <span className="text-sm">📦</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-medium text-slate-100">
                                {offer.parcel.displayName}
                              </span>
                              {index === 0 && (
                                <span className="rounded bg-yellow-500/20 px-1 py-0.5 text-xs font-medium text-yellow-400">
                                  ⭐ بهترین پیشنهاد
                                </span>
                              )}
                              {isSelected && (
                                <span className="text-xs text-orange-400">
                                  ✓
                                </span>
                              )}
                            </div>
                            <div className="mt-1 grid grid-cols-2 gap-1 text-xs text-slate-400">
                              <div>
                                فاصله تا مسافر: {distance.toFixed(2)} کیلومتر
                              </div>
                              <div>حجم: {offer.parcel.volume} لیتر</div>
                              <div>
                                فاصله کل مسیر: {offer.totalDistance.toFixed(2)}{" "}
                                کیلومتر
                              </div>
                              <div>
                                انحراف: {offer.detourDistance.toFixed(2)}{" "}
                                کیلومتر
                              </div>
                              <div>
                                زمان تخمینی: {offer.estimatedTime.toFixed(0)}{" "}
                                دقیقه
                              </div>
                              <div>امتیاز: {offer.score.toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
}

export default HomePage;
