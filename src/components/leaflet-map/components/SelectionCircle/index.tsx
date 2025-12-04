import { Circle, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";

export const SelectionCircle = () => {
  const location = useLocation();
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const driver = useMapStore((state) => state.driver);
  const packageSelectionRadius = useSettingsStore(
    (state) => state.packageSelectionRadius
  );

  const currentPath = location.pathname;
  const isSettingsPage = currentPath === "/settings";
  const isHomePage = currentPath === "/";

  // On settings page, show circle centered on driver to visualize radius
  // On home page, show circle only when passenger is selected
  if (isSettingsPage) {
    return (
      <Circle
        center={[driver.lat, driver.lng]}
        radius={packageSelectionRadius}
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
            <strong>شعاع انتخاب بسته</strong>
            <br />
            این دایره نشان می‌دهد که بسته‌ها باید در چه فاصله‌ای از مسافر باشند
            <br />
            شعاع فعلی: {(packageSelectionRadius / 1000).toFixed(1)} کیلومتر
            <br />
            ({packageSelectionRadius.toLocaleString()} متر)
          </div>
        </Popup>
      </Circle>
    );
  }

  // On home page, show circle only when passenger is selected
  if (isHomePage && selectedPassenger) {
    return (
      <Circle
        center={[selectedPassenger.lat, selectedPassenger.lng]}
        radius={packageSelectionRadius}
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
            <strong>محدوده قابل قبول</strong>
            <br />
            فقط بسته‌هایی که در این محدوده هستند قابل انتخاب می‌باشند
            <br />
            شعاع: {(packageSelectionRadius / 1000).toFixed(1)} کیلومتر
          </div>
        </Popup>
      </Circle>
    );
  }

  return null;
};

