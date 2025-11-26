import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapStore } from "@/store/map.store";

export const MapClickHandler = () => {
  const map = useMap();
  const setActivePin = useMapStore((state) => state.setActivePin);

  useEffect(() => {
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      setActivePin({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map, setActivePin]);

  return null;
};

