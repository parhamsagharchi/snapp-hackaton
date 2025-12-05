import { useMapAutoFit } from "@/hooks/useMapAutoFit";
import { useMapStore } from "@/store/map.store";
import { useLocation } from "react-router-dom";
import { isContentOnlyPage } from "@/layout/content-only-pages.constant";

/**
 * Component to automatically fit map view to show all markers
 * Must be used inside MapContainer
 */
export const MapAutoFit = () => {
  const location = useLocation();
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const driver = useMapStore((state) => state.driver);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);

  // Don't auto-fit on content-only pages (they don't show map)
  const isContentOnly = isContentOnlyPage(location.pathname);

  // Collect all marker coordinates
  const allMarkers = [
    driver,
    ...passengers,
    ...parcels,
    ...(selectedPassenger
      ? [
          selectedPassenger,
          ...(selectedPassenger.destination
            ? [{ lat: selectedPassenger.destination.lat, lng: selectedPassenger.destination.lng }]
            : []),
        ]
      : []),
    ...(selectedParcel
      ? [
          selectedParcel,
          ...(selectedParcel.destination
            ? [{ lat: selectedParcel.destination.lat, lng: selectedParcel.destination.lng }]
            : []),
        ]
      : []),
  ].filter((marker) => marker && marker.lat && marker.lng);

  // Auto-fit when markers are available and not on content-only pages
  useMapAutoFit(
    allMarkers,
    allMarkers.length > 0 && !isContentOnly,
    location.pathname
  );

  return null;
};

