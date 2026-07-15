import { useId } from "react";
import { useLocation } from "react-router-dom";
import { Popup } from "react-leaflet";
import type L from "leaflet";
import { useMapStore } from "@/store/map.store";
import { CustomMarker } from "./CustomMarker";
import { useRouteOptimization } from "@/hooks/useRouteOptimization";
import { areCoordinatesEqual } from "@/utils/coordinates";
import { useMapZoomVisibility } from "@/hooks/useMapZoomVisibility";
import { useTranslation } from "@/i18n";

export const Markers = () => {
  const { t, tName } = useTranslation();
  const id = useId();
  const location = useLocation();
  const passengers = useMapStore((state) => state.passengers);
  const parcels = useMapStore((state) => state.parcels);
  const driver = useMapStore((state) => state.driver);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const simulationActive = useMapStore((state) => state.simulationActive);
  const updateDriver = useMapStore((state) => state.updateDriver);
  const updatePassengerByIndex = useMapStore(
    (state) => state.updatePassengerByIndex
  );
  const updateParcelByIndex = useMapStore((state) => state.updateParcelByIndex);
  const setSelectedPassenger = useMapStore((state) => state.setSelectedPassenger);
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);

  // Calculate optimized route when passenger and parcel are selected
  useRouteOptimization();

  // Check zoom level for marker visibility
  const { shouldShowMarkers } = useMapZoomVisibility();

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
  // BUT: Don't show parcels if selected passenger has orderOptionsActive
  const showParcels = 
    currentPath === "/parcels" || 
    (currentPath === "/" && selectedPassenger !== null && !selectedPassenger.orderOptionsActive);

  // Driver is draggable only on driver page
  const driverIsActive = showDriver && currentPath === "/driver";
  const driverName = driver.displayName
    ? tName(driver.displayName)
    : t("map.driver");
  const driverShortLabel = driverName.charAt(0) || t("map.driverInitial");

  // Don't render markers if zoom is too low
  if (!shouldShowMarkers) {
    return null;
  }

  return (
    <>
      {/* Driver Marker - Car Icon */}
      {showDriver && (
        <CustomMarker
          key={`driver-${driver.lat}-${driver.lng}-${id}`}
          position={[driver.lat, driver.lng]}
          label={driverName}
          shortLabel={driverShortLabel}
          color="#3B82F6"
          iconType="driver"
          onClick={() => {}}
          draggable={driverIsActive}
          onDragEnd={handleDriverDragEnd}
        >
          <Popup>
            <div>
              <strong>{driverName}</strong>
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
            const isSelected =
              selectedPassenger && areCoordinatesEqual(selectedPassenger, passenger);
            const passengerName = passenger.displayName
              ? tName(passenger.displayName)
              : t("map.passengerN", { n: index + 1 });
            const shortLabel = passenger.displayName
              ? passengerName.charAt(0)
              : `${index + 1}`;
            return (
              <CustomMarker
                key={`passenger-${index}-${passengers.length}-${passenger.lat}-${passenger.lng}-${id}`}
                position={[passenger.lat, passenger.lng]}
                label={
                  isSelected
                    ? t("map.originLabel", { name: passengerName })
                    : passengerName
                }
                shortLabel={shortLabel}
                color={isSelected ? "#059669" : "#10B981"}
                iconType="passenger"
                onClick={() => {}}
                draggable={false}
                onDragEnd={handlePassengerDragEnd(index)}
              >
                <Popup>
                  <div>
                    <strong>{passengerName}</strong>
                    {isSelected && (
                      <div className="mt-1 text-xs font-semibold text-green-400">
                        {t("map.selectedMark")}
                      </div>
                    )}
                    <div className="mt-1">
                      {t("map.orderOptions")}{" "}
                      {passenger.orderOptionsActive ? (
                        <span className="text-yellow-400">
                          {t("common.active")}
                        </span>
                      ) : (
                        <span className="text-slate-400">
                          {t("common.inactive")}
                        </span>
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
          const passengerDestName = selectedPassenger.displayName
            ? tName(selectedPassenger.displayName)
            : t("map.passengerFallback");
          return (
            <CustomMarker
              key={`passenger-dest-${selectedPassenger.lat}-${selectedPassenger.lng}-${id}`}
              position={[passengerDest.lat, passengerDest.lng]}
              label={t("map.destLabel", { name: passengerDestName })}
              shortLabel={passengerDestName.charAt(0)}
              color="#059669"
              iconType="passenger"
              onClick={() => {}}
              draggable={true}
              onDragEnd={handlePassengerDestinationDragEnd}
            >
              <Popup>
                <div>
                  <strong>
                    {t("map.destLabel", { name: passengerDestName })}
                  </strong>
                </div>
              </Popup>
            </CustomMarker>
          );
        })()}

      {/* Parcels Markers */}
      {showParcels &&
        parcels
          ?.filter((parcel) => {
            // During simulation, only show the selected parcel to avoid clutter
            if (simulationActive && selectedParcel) {
              return areCoordinatesEqual(selectedParcel, parcel);
            }
            // On home page, when a parcel is selected, only show the selected parcel
            if (currentPath === "/" && selectedParcel) {
              return areCoordinatesEqual(selectedParcel, parcel);
            }
            // Otherwise, show all parcels
            return true;
          })
          .map((parcel, index) => {
            const isSelected =
              selectedParcel && areCoordinatesEqual(selectedParcel, parcel);
            const parcelName = parcel.displayName
              ? tName(parcel.displayName)
              : t("map.parcelN", { n: index + 1 });
            const shortLabel = parcel.displayName
              ? parcelName.charAt(0)
              : `${index + 1}`;
            return (
              <CustomMarker
                key={`parcel-${index}-${parcels.length}-${parcel.lat}-${parcel.lng}-${id}`}
                position={[parcel.lat, parcel.lng]}
                label={
                  isSelected
                    ? t("map.originLabel", { name: parcelName })
                    : parcelName
                }
                shortLabel={shortLabel}
                color={isSelected ? "#D97706" : "#F59E0B"}
                iconType="parcel"
                onClick={() => {}}
                draggable={false}
                onDragEnd={handleParcelDragEnd(index)}
              >
                <Popup>
                  <div>
                    <strong>{parcelName}</strong>
                    {isSelected && (
                      <div className="mt-1 text-xs font-semibold text-orange-400">
                        {t("map.selectedMark")}
                      </div>
                    )}
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
          const parcelDestName = selectedParcel.displayName
            ? tName(selectedParcel.displayName)
            : t("map.parcelFallback");
          return (
            <CustomMarker
              key={`parcel-dest-${selectedParcel.lat}-${selectedParcel.lng}-${id}`}
              position={[parcelDest.lat, parcelDest.lng]}
              label={t("map.destLabel", { name: parcelDestName })}
              shortLabel={parcelDestName.charAt(0)}
              color="#D97706"
              iconType="parcel"
              onClick={() => {}}
              draggable={true}
              onDragEnd={handleParcelDestinationDragEnd}
            >
              <Popup>
                <div>
                  <strong>{t("map.destLabel", { name: parcelDestName })}</strong>
                </div>
              </Popup>
            </CustomMarker>
          );
        })()}
    </>
  );
};
