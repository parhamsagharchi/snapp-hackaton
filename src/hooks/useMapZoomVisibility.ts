import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";

/**
 * Hook to manage marker and route visibility based on zoom level
 * Hides markers when zoomed out too much (back zoom) for better UX
 */
export const useMapZoomVisibility = () => {
  const map = useMap();
  const [shouldShowMarkers, setShouldShowMarkers] = useState(true);
  const [shouldShowRoute, setShouldShowRoute] = useState(true);

  // Thresholds for showing/hiding markers and routes
  const MIN_ZOOM_FOR_MARKERS = 12; // Show markers when zoom >= 12
  const MIN_ZOOM_FOR_ROUTE = 13; // Show route when zoom >= 13

  useEffect(() => {
    if (!map) return;

    const updateVisibility = () => {
      const currentZoom = map.getZoom();
      
      // Update marker visibility
      const showMarkers = currentZoom >= MIN_ZOOM_FOR_MARKERS;
      setShouldShowMarkers(showMarkers);
      
      // Update route visibility
      const showRoute = currentZoom >= MIN_ZOOM_FOR_ROUTE;
      setShouldShowRoute(showRoute);
    };

    // Initial check
    updateVisibility();

    // Listen to zoom events
    map.on("zoomend", updateVisibility);
    map.on("zoom", updateVisibility);

    return () => {
      map.off("zoomend", updateVisibility);
      map.off("zoom", updateVisibility);
    };
  }, [map]);

  return {
    shouldShowMarkers,
    shouldShowRoute,
  };
};

