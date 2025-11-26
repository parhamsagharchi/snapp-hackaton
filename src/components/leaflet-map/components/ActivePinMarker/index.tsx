import { Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useMapStore } from "@/store/map.store";
import { useState, useEffect } from "react";
import type L from "leaflet";

export const ActivePinMarker = () => {
  const location = useLocation();
  const activePin = useMapStore((state) => state.activePin);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const driver = useMapStore((state) => state.driver);
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const [position, setPosition] = useState<[number, number] | null>(
    activePin ? [activePin.lat, activePin.lng] : null
  );

  // Check if activePin matches any existing marker
  const matchesExistingMarker = () => {
    if (!activePin) return true;
    const tolerance = 0.0001;

    // Check driver
    if (
      Math.abs(activePin.lat - driver.lat) < tolerance &&
      Math.abs(activePin.lng - driver.lng) < tolerance
    ) {
      return true;
    }

    // Check passengers
    for (const passenger of passengers) {
      if (
        Math.abs(activePin.lat - passenger.lat) < tolerance &&
        Math.abs(activePin.lng - passenger.lng) < tolerance
      ) {
        return true;
      }
    }

    // Check parcels
    for (const parcel of parcels) {
      if (
        Math.abs(activePin.lat - parcel.lat) < tolerance &&
        Math.abs(activePin.lng - parcel.lng) < tolerance
      ) {
        return true;
      }
    }

    return false;
  };

  // Update position when activePin changes
  useEffect(() => {
    if (activePin) {
      setPosition([activePin.lat, activePin.lng]);
    } else {
      setPosition(null);
    }
  }, [activePin]);

  // Don't show active pin on main page or if activePin matches an existing marker
  if (location.pathname === "/" || !activePin || !position || matchesExistingMarker()) {
    return null;
  }

  const handleDragEnd = (e: L.DragEndEvent) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    setPosition([newPosition.lat, newPosition.lng]);
    setActivePin({
      lat: newPosition.lat,
      lng: newPosition.lng,
    });
  };

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
      opacity={0.9}
    >
      <Popup>
        <div className="text-center">
          <strong className="text-primary">موقعیت انتخاب شده</strong>
          <div className="mt-1 text-xs text-slate-500">
            {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            می‌توانید این marker را drag کنید
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

