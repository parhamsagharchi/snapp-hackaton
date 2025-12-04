import { useMemo } from "react";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { findBestParcelOffers } from "@/utils/parcelOffers";

/**
 * Custom hook for calculating parcel offers following Single Responsibility Principle
 * Handles memoized calculation of best parcel offers
 */
export function useParcelOffers() {
  const driver = useMapStore((state) => state.driver);
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );
  const originSelectionRadius = useSettingsStore(
    (state) => state.originSelectionRadius
  );
  const destinationSelectionRadius = useSettingsStore(
    (state) => state.destinationSelectionRadius
  );

  // Filter out passengers with orderOptionsActive = true
  const availablePassengers = useMemo(
    () => passengers.filter((p) => !p.orderOptionsActive),
    [passengers]
  );

  // Calculate best parcel offers when passenger is selected
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

  return {
    availablePassengers,
    parcelOffers,
  };
}

