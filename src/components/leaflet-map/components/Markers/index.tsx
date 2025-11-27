import { useId } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "react-leaflet";
import type L from "leaflet";
import { useMapStore } from "@/store/map.store";
import type { ICoordinates } from "../../leaflet-map.types";
import { CustomMarker } from "./CustomMarker";

export const Markers = () => {
  const id = useId();
  const location = useLocation();
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const driver = useMapStore((state) => state.driver);
  const activePin = useMapStore((state) => state.activePin);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const updateDriver = useMapStore((state) => state.updateDriver);
  const updatePassengerByIndex = useMapStore(
    (state) => state.updatePassengerByIndex
  );
  const updateParcelByIndex = useMapStore((state) => state.updateParcelByIndex);

  const handleOnClickPin = (pin: ICoordinates) => {
    setActivePin(pin);
  };

  // Check if activePin matches a marker position (with small tolerance)
  const isActivePin = (lat: number, lng: number) => {
    if (!activePin) return false;
    const tolerance = 0.0001;
    return (
      Math.abs(activePin.lat - lat) < tolerance &&
      Math.abs(activePin.lng - lng) < tolerance
    );
  };

  // Handle drag end for driver
  const handleDriverDragEnd = (e: L.DragEndEvent) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    const updatedDriver = {
      ...driver,
      lat: newPosition.lat,
      lng: newPosition.lng,
    };
    updateDriver(updatedDriver);
    setActivePin({ lat: newPosition.lat, lng: newPosition.lng });
  };

  // Handle drag end for passenger
  const handlePassengerDragEnd = (index: number) => (e: L.DragEndEvent) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    const passenger = passengers[index];
    const updatedPassenger = {
      ...passenger,
      lat: newPosition.lat,
      lng: newPosition.lng,
    };
    updatePassengerByIndex(index, updatedPassenger);
    setActivePin({ lat: newPosition.lat, lng: newPosition.lng });
  };

  // Handle drag end for parcel
  const handleParcelDragEnd = (index: number) => (e: L.DragEndEvent) => {
    const marker = e.target;
    const newPosition = marker.getLatLng();
    const parcel = parcels[index];
    const updatedParcel = {
      ...parcel,
      lat: newPosition.lat,
      lng: newPosition.lng,
    };
    updateParcelByIndex(index, updatedParcel);
    setActivePin({ lat: newPosition.lat, lng: newPosition.lng });
  };

  // Determine which markers to show based on current route
  const currentPath = location.pathname;
  const showDriver = currentPath === "/" || currentPath === "/driver";
  const showPassengers = currentPath === "/" || currentPath === "/passengers";
  const showParcels = currentPath === "/parcels"; // Only show parcels on parcels page

  const driverIsActive = showDriver && isActivePin(driver.lat, driver.lng);
  const driverShortLabel = driver.displayName
    ? driver.displayName.charAt(0)
    : "ر";

  return (
    <>
      {/* Driver Marker - Circle Style */}
      {showDriver && (
        <CustomMarker
          key={`driver-${driver.lat}-${driver.lng}-${driver.capacityVolume}-${id}`}
          position={[driver.lat, driver.lng]}
          label={driver.displayName || "راننده"}
          shortLabel={driverShortLabel}
          color="#3B82F6"
          onClick={() => handleOnClickPin(driver)}
          draggable={driverIsActive}
          onDragEnd={handleDriverDragEnd}
        >
          <Popup>
            <div>
              <strong>{driver.displayName || "راننده"}</strong>
              <div>ظرفیت: {driver.capacityVolume} لیتر</div>
            </div>
          </Popup>
        </CustomMarker>
      )}

      {/* Passengers Markers */}
      {showPassengers &&
        passengers?.map((passenger, index) => {
          const passengerIsActive = isActivePin(
            passenger.lat,
            passenger.lng
          );
          const shortLabel = passenger.displayName
            ? passenger.displayName.charAt(0)
            : `${index + 1}`;
          return (
            <CustomMarker
              key={`passenger-${index}-${passengers.length}-${passenger.lat}-${passenger.lng}-${id}`}
              position={[passenger.lat, passenger.lng]}
              label={passenger.displayName || `مسافر ${index + 1}`}
              shortLabel={shortLabel}
              color="#10B981"
              onClick={() => handleOnClickPin(passenger)}
              draggable={passengerIsActive}
              onDragEnd={handlePassengerDragEnd(index)}
            >
              <Popup>
                <div>
                  <strong>{passenger.displayName || `مسافر ${index + 1}`}</strong>
                  <div>
                    عجله دارم: {passenger.isActiveRideInHurry ? "بله" : "خیر"}
                  </div>
                  <div>بار دارد: {passenger.hasLuggage ? "بله" : "خیر"}</div>
                </div>
              </Popup>
            </CustomMarker>
          );
        })}

      {/* Parcels Markers */}
      {showParcels &&
        parcels?.map((parcel, index) => {
          const parcelIsActive = isActivePin(parcel.lat, parcel.lng);
          const shortLabel = parcel.displayName
            ? parcel.displayName.charAt(0)
            : `${index + 1}`;
          return (
            <CustomMarker
              key={`parcel-${index}-${parcels.length}-${parcel.lat}-${parcel.lng}-${id}`}
              position={[parcel.lat, parcel.lng]}
              label={parcel.displayName || `بسته ${index + 1}`}
              shortLabel={shortLabel}
              color="#F59E0B"
              onClick={() => handleOnClickPin(parcel)}
              draggable={parcelIsActive}
              onDragEnd={handleParcelDragEnd(index)}
            >
              <Popup>
                <div>
                  <strong>{parcel.displayName || `بسته ${index + 1}`}</strong>
                  <div>حجم: {parcel.volume} لیتر</div>
                </div>
              </Popup>
            </CustomMarker>
          );
        })}
    </>
  );
};
