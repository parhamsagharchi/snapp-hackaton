import { Circle, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";

export const SelectionCircle = () => {
  const location = useLocation();
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const driver = useMapStore((state) => state.driver);
  const originSelectionRadius = useSettingsStore(
    (state) => state.originSelectionRadius
  );
  const destinationSelectionRadius = useSettingsStore(
    (state) => state.destinationSelectionRadius
  );

  const currentPath = location.pathname;
  const isSettingsPage = currentPath === "/settings";
  const isHomePage = currentPath === "/";

  // On settings page, show circles centered on driver to visualize radii
  if (isSettingsPage) {
    return (
      <>
        <Circle
          center={[driver.lat, driver.lng]}
          radius={originSelectionRadius}
          pathOptions={{
            color: "#4ECDC4",
            fillColor: "#4ECDC4",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "10, 5",
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>شعاع انتخاب مبدا</strong>
              <br />
              فاصله بین مبدا مسافر و مبدا بسته
              <br />
              شعاع فعلی: {(originSelectionRadius / 1000).toFixed(1)} کیلومتر
              <br />
              ({originSelectionRadius.toLocaleString()} متر)
            </div>
          </Popup>
        </Circle>
        <Circle
          center={[driver.lat, driver.lng]}
          radius={destinationSelectionRadius}
          pathOptions={{
            color: "#F59E0B",
            fillColor: "#F59E0B",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "5, 10",
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>شعاع انتخاب مقصد</strong>
              <br />
              فاصله بین مقصد مسافر و مقصد بسته
              <br />
              شعاع فعلی: {(destinationSelectionRadius / 1000).toFixed(1)} کیلومتر
              <br />
              ({destinationSelectionRadius.toLocaleString()} متر)
            </div>
          </Popup>
        </Circle>
      </>
    );
  }

  // On home page, show circles only when passenger is selected
  if (isHomePage && selectedPassenger) {
    const passengerDest = selectedPassenger.destination || {
      lat: selectedPassenger.lat + 0.05,
      lng: selectedPassenger.lng + 0.05,
    };

    return (
      <>
        {/* Origin circle - around passenger origin */}
        <Circle
          center={[selectedPassenger.lat, selectedPassenger.lng]}
          radius={originSelectionRadius}
          pathOptions={{
            color: "#4ECDC4",
            fillColor: "#4ECDC4",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "10, 5",
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>شعاع انتخاب مبدا</strong>
              <br />
              مبدا بسته باید در این محدوده از مبدا مسافر باشد
              <br />
              شعاع: {(originSelectionRadius / 1000).toFixed(1)} کیلومتر
            </div>
          </Popup>
        </Circle>
        {/* Destination circle - around passenger destination */}
        <Circle
          center={[passengerDest.lat, passengerDest.lng]}
          radius={destinationSelectionRadius}
          pathOptions={{
            color: "#F59E0B",
            fillColor: "#F59E0B",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "5, 10",
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>شعاع انتخاب مقصد</strong>
              <br />
              مقصد بسته باید در این محدوده از مقصد مسافر باشد
              <br />
              شعاع: {(destinationSelectionRadius / 1000).toFixed(1)} کیلومتر
            </div>
          </Popup>
        </Circle>
      </>
    );
  }

  return null;
};

