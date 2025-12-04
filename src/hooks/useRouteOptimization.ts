import { useEffect } from "react";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { optimizeDriverRoute } from "@/utils/tsp";

export function useRouteOptimization() {
  const driver = useMapStore((state) => state.driver);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const setOptimizedRoute = useMapStore((state) => state.setOptimizedRoute);
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );

  useEffect(() => {
    if (selectedPassenger && selectedParcel) {
      // Use default destinations if not provided
      const passengerDest = selectedPassenger.destination || {
        lat: selectedPassenger.lat + 0.01,
        lng: selectedPassenger.lng + 0.01,
      };
      const parcelDest = selectedParcel.destination || {
        lat: selectedParcel.lat + 0.01,
        lng: selectedParcel.lng + 0.01,
      };

      const route = optimizeDriverRoute(
        driver,
        selectedPassenger,
        passengerDest,
        selectedParcel,
        parcelDest,
        routeOrderPreference === "package_first"
      );

      setOptimizedRoute(route.points);
    } else {
      setOptimizedRoute(null);
    }
  }, [
    driver,
    selectedPassenger,
    selectedParcel,
    routeOrderPreference,
    setOptimizedRoute,
  ]);
}

