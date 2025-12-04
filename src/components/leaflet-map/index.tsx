import { useImperativeHandle, useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import type L from "leaflet";
import type {
  ILeafletMap,
  ICoordinates,
  LeafletMapRef,
} from "./leaflet-map.types";
import {
  DEFAULT_MAP_ZOOM,
  TTILE_LAYER_ATTRIBUTION,
  TTILE_LAYER_URL,
  DEFAULT_MAP_CENTER,
} from "./leaflet-map.constant";

// Global map instances tracker to prevent double initialization in React 19 StrictMode
const initializedMaps = new WeakSet<HTMLDivElement>();

function LeafletMap({ ref, style = {}, render, className }: ILeafletMap) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  // Use useState with lazy initialization to create a stable unique ID
  const [mapInstanceId] = useState(
    () => `leaflet-map-${Date.now()}-${Math.random()}`
  );

  const [isReady, setIsReady] = useState(false);
  const [mapCenter] = useState<[number, number]>(
    DEFAULT_MAP_CENTER as [number, number]
  );

  useEffect(() => {
    const container = containerRef.current;

    // Check if this container has already been initialized (React 19 StrictMode protection)
    if (container && initializedMaps.has(container)) {
      return;
    }

    // Delay initialization to prevent double mount in React 19 StrictMode
    const timer = setTimeout(() => {
      if (container && !initializedMaps.has(container)) {
        initializedMaps.add(container);
        setIsReady(true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Removed useEffect that was causing map to jump when clicking on map
  // The map should stay in place when user clicks directly on it

  useImperativeHandle(ref, () => {
    const map = mapRef.current;
    if (!map) {
      return null as unknown as LeafletMapRef;
    }
    return {
      ...map,
      setCenter: (coordinates: ICoordinates) => {
        map.setView([coordinates.lat, coordinates.lng], map.getZoom());
      },
    } as LeafletMapRef;
  });

  // Don't render MapContainer until ready (React 19 StrictMode double mount protection)
  if (!isReady) {
    return (
      <div
        ref={containerRef}
        className={className}
        id={mapInstanceId}
        style={{ height: "100%", width: "100%", ...style }}
      >
        <div className="flex h-full items-center justify-center text-slate-400">
          در حال بارگذاری نقشه...
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      id={mapInstanceId}
      style={style}
    >
      <MapContainer
        key={mapInstanceId}
        center={mapCenter}
        zoom={DEFAULT_MAP_ZOOM}
        style={{ height: "100%", width: "100%", borderRadius: "0.75rem" }}
        className="z-0"
        ref={mapRef}
      >
        <TileLayer
          url={TTILE_LAYER_URL}
          attribution={TTILE_LAYER_ATTRIBUTION}
        />
        {render}
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
