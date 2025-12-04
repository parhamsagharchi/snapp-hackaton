import { useId } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "react-leaflet";
import type L from "leaflet";
import { useMapStore } from "@/store/map.store";
import type { ICoordinates } from "../../leaflet-map.types";
import { CustomMarker } from "./CustomMarker";
import { useRouteOptimization } from "@/hooks/useRouteOptimization";
import { areCoordinatesEqual } from "@/utils/coordinates";

export const Markers = () => {
  const id = useId();
  const location = useLocation();
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const driver = useMapStore((state) => state.driver);
  const activePin = useMapStore((state) => state.activePin);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const updateDriver = useMapStore((state) => state.updateDriver);
  const updatePassengerByIndex = useMapStore(
    (state) => state.updatePassengerByIndex
  );
  const updateParcelByIndex = useMapStore((state) => state.updateParcelByIndex);
  const setSelectedPassenger = useMapStore((state) => state.setSelectedPassenger);
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);

  // Calculate optimized route when passenger and parcel are selected
  useRouteOptimization();

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

  // Handle drag end for passenger destination
  const handlePassengerDestinationDragEnd = (e: L.DragEndEvent) => {
    if (!selectedPassenger) return;
    const marker = e.target;
    const newPosition = marker.getLatLng();
    const passengerIndex = passengers.findIndex(
      (p) =>
        p.lat === selectedPassenger.lat && p.lng === selectedPassenger.lng
    );
    if (passengerIndex !== -1) {
      const updatedPassenger = {
        ...selectedPassenger,
        destination: { lat: newPosition.lat, lng: newPosition.lng },
      };
      updatePassengerByIndex(passengerIndex, updatedPassenger);
      setSelectedPassenger(updatedPassenger); // Update selected passenger
      setActivePin({ lat: newPosition.lat, lng: newPosition.lng });
    }
  };

  // Handle drag end for parcel destination
  const handleParcelDestinationDragEnd = (e: L.DragEndEvent) => {
    if (!selectedParcel) return;
    const marker = e.target;
    const newPosition = marker.getLatLng();
    const parcelIndex = parcels.findIndex(
      (p) => p.lat === selectedParcel.lat && p.lng === selectedParcel.lng
    );
    if (parcelIndex !== -1) {
      const updatedParcel = {
        ...selectedParcel,
        destination: { lat: newPosition.lat, lng: newPosition.lng },
      };
      updateParcelByIndex(parcelIndex, updatedParcel);
      setSelectedParcel(updatedParcel); // Update selected parcel
      setActivePin({ lat: newPosition.lat, lng: newPosition.lng });
    }
  };

  // Determine which markers to show based on current route
  const currentPath = location.pathname;
  
  // Driver: show on home, settings, and driver pages
  const showDriver = currentPath === "/" || currentPath === "/driver" || currentPath === "/settings";
  
  // Passengers: show on home and passengers pages
  // On home page, hide other passengers when one is selected (for better visibility)
  const showPassengers = 
    currentPath === "/passengers" || 
    currentPath === "/"; // Always show passengers on home, but filter will hide others when selected
  
  // Parcels: show on parcels page or when passenger is selected on home page
  const showParcels = 
    currentPath === "/parcels" || 
    (currentPath === "/" && selectedPassenger !== null);

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
        passengers
          ?.filter((passenger) => {
            // On home page, when a passenger is selected, only show the selected passenger
            if (currentPath === "/" && selectedPassenger) {
              return areCoordinatesEqual(selectedPassenger, passenger);
            }
            // Otherwise, show all passengers
            return true;
          })
          .map((passenger, index) => {
            const passengerIsActive = isActivePin(passenger.lat, passenger.lng);
            const isSelected =
              selectedPassenger && areCoordinatesEqual(selectedPassenger, passenger);
            const shortLabel = passenger.displayName
              ? passenger.displayName.charAt(0)
              : `${index + 1}`;
            return (
              <CustomMarker
                key={`passenger-${index}-${passengers.length}-${passenger.lat}-${passenger.lng}-${id}`}
                position={[passenger.lat, passenger.lng]}
                label={passenger.displayName || `مسافر ${index + 1}`}
                shortLabel={shortLabel}
                color={isSelected ? "#059669" : "#10B981"}
                onClick={() => handleOnClickPin(passenger)}
                draggable={passengerIsActive}
                onDragEnd={handlePassengerDragEnd(index)}
              >
                <Popup>
                  <div>
                    <strong>
                      {passenger.displayName || `مسافر ${index + 1}`}
                    </strong>
                    {isSelected && (
                      <div className="mt-1 text-xs font-semibold text-green-400">
                        ✓ انتخاب شده
                      </div>
                    )}
                    <div className="mt-1">
                      گزینه های سفارش:{" "}
                      {passenger.orderOptionsActive ? (
                        <span className="text-yellow-400">فعال</span>
                      ) : (
                        <span className="text-slate-400">غیرفعال</span>
                      )}
                    </div>
                  </div>
                </Popup>
              </CustomMarker>
            );
          })}

      {/* Passenger Destination Markers - only show when passenger is selected */}
      {showPassengers &&
        selectedPassenger &&
        (() => {
          const passengerDest = selectedPassenger.destination || {
            lat: selectedPassenger.lat + 0.05,
            lng: selectedPassenger.lng + 0.05,
          };
          const passengerDestIsActive = isActivePin(passengerDest.lat, passengerDest.lng);
          return (
            <CustomMarker
              key={`passenger-dest-${selectedPassenger.lat}-${selectedPassenger.lng}-${id}`}
              position={[passengerDest.lat, passengerDest.lng]}
              label={`مقصد ${selectedPassenger.displayName || "مسافر"}`}
              shortLabel="م"
              color="#059669"
              onClick={() => handleOnClickPin(passengerDest)}
              draggable={passengerDestIsActive}
              onDragEnd={handlePassengerDestinationDragEnd}
            >
              <Popup>
                <div>
                  <strong>مقصد {selectedPassenger.displayName || "مسافر"}</strong>
                </div>
              </Popup>
            </CustomMarker>
          );
        })()}

      {/* Parcels Markers */}
      {showParcels &&
        parcels
          ?.filter((parcel) => {
            // On home page, when a parcel is selected, only show the selected parcel
            if (currentPath === "/" && selectedParcel) {
              return areCoordinatesEqual(selectedParcel, parcel);
            }
            // Otherwise, show all parcels
            return true;
          })
          .map((parcel, index) => {
            const parcelIsActive = isActivePin(parcel.lat, parcel.lng);
            const isSelected =
              selectedParcel && areCoordinatesEqual(selectedParcel, parcel);
            const shortLabel = parcel.displayName
              ? parcel.displayName.charAt(0)
              : `${index + 1}`;
            return (
              <CustomMarker
                key={`parcel-${index}-${parcels.length}-${parcel.lat}-${parcel.lng}-${id}`}
                position={[parcel.lat, parcel.lng]}
                label={parcel.displayName || `بسته ${index + 1}`}
                shortLabel={shortLabel}
                color={isSelected ? "#D97706" : "#F59E0B"}
                onClick={() => handleOnClickPin(parcel)}
                draggable={parcelIsActive}
                onDragEnd={handleParcelDragEnd(index)}
              >
                <Popup>
                  <div>
                    <strong>{parcel.displayName || `بسته ${index + 1}`}</strong>
                    {isSelected && (
                      <div className="mt-1 text-xs font-semibold text-orange-400">
                        ✓ انتخاب شده
                      </div>
                    )}
                    <div>حجم: {parcel.volume} لیتر</div>
                  </div>
                </Popup>
              </CustomMarker>
            );
          })}

      {/* Parcel Destination Markers - only show when parcel is selected */}
      {showParcels &&
        selectedParcel &&
        (() => {
          const parcelDest = selectedParcel.destination || {
            lat: selectedParcel.lat + 0.05,
            lng: selectedParcel.lng + 0.05,
          };
          const parcelDestIsActive = isActivePin(parcelDest.lat, parcelDest.lng);
          return (
            <CustomMarker
              key={`parcel-dest-${selectedParcel.lat}-${selectedParcel.lng}-${id}`}
              position={[parcelDest.lat, parcelDest.lng]}
              label={`مقصد ${selectedParcel.displayName || "بسته"}`}
              shortLabel="م"
              color="#D97706"
              onClick={() => handleOnClickPin(parcelDest)}
              draggable={parcelDestIsActive}
              onDragEnd={handleParcelDestinationDragEnd}
            >
              <Popup>
                <div>
                  <strong>مقصد {selectedParcel.displayName || "بسته"}</strong>
                </div>
              </Popup>
            </CustomMarker>
          );
        })()}
    </>
  );
};
