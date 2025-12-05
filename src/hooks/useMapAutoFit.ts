import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import type L from "leaflet";

interface Coordinate {
  lat: number;
  lng: number;
}

/**
 * Hook to automatically fit map view to show all markers
 * Centers the map on all markers and adjusts zoom to show them all
 */
export const useMapAutoFit = (
  markers: Coordinate[],
  enabled: boolean = true,
  routeKey?: string // Route pathname to trigger refit on route change
) => {
  const map = useMap();
  const previousMarkersCountRef = useRef(0);
  const previousRouteRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!map || !enabled || markers.length === 0) {
      previousMarkersCountRef.current = markers.length;
      previousRouteRef.current = routeKey;
      return;
    }

    // Only auto-fit when marker count changes or route changes
    const currentCount = markers.length;
    const previousCount = previousMarkersCountRef.current;
    const currentRoute = routeKey;
    const previousRoute = previousRouteRef.current;

    // Auto-fit if:
    // 1. First time markers are loaded (previousCount === 0)
    // 2. Marker count changed (added or removed)
    // 3. Route changed (but skip if coming from content-only pages to avoid jump)
    const isRouteChange = currentRoute !== previousRoute;
    const isFromContentOnlyPage = previousRoute === "/algorithm" || previousRoute === "/pitch";
    
    const shouldFit =
      previousCount === 0 ||
      currentCount !== previousCount ||
      (isRouteChange && !isFromContentOnlyPage);

    if (shouldFit) {
      // Add a small delay to prevent jump when navigating from content-only pages
      const timeoutId = setTimeout(() => {
        try {
          // Create bounds from all marker coordinates
          const bounds = L.latLngBounds(
            markers.map((marker) => [marker.lat, marker.lng])
          );

          // Fit map to bounds with padding
          map.fitBounds(bounds, {
            padding: [50, 50], // Padding in pixels
            maxZoom: 15, // Maximum zoom level
            animate: true,
            duration: 0.8, // Animation duration in seconds
          });

          previousMarkersCountRef.current = currentCount;
          previousRouteRef.current = currentRoute;
        } catch (error) {
          console.error("Error fitting map bounds:", error);
        }
      }, isFromContentOnlyPage ? 100 : 0); // Small delay if coming from content-only page

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      // Update refs even if we don't fit
      previousMarkersCountRef.current = currentCount;
      previousRouteRef.current = currentRoute;
    }
  }, [map, markers, enabled, routeKey]);
};

/**
 * Function to manually fit map to markers
 */
export const fitMapToMarkers = (
  map: L.Map,
  markers: Coordinate[],
  options?: {
    padding?: [number, number];
    maxZoom?: number;
    animate?: boolean;
  }
) => {
  if (!map || markers.length === 0) return;

  try {
    const bounds = L.latLngBounds(
      markers.map((marker) => [marker.lat, marker.lng])
    );

    map.fitBounds(bounds, {
      padding: options?.padding || [50, 50],
      maxZoom: options?.maxZoom || 15,
      animate: options?.animate !== false,
      duration: 0.8,
    });
  } catch (error) {
    console.error("Error fitting map bounds:", error);
  }
};

