import { Circle, Popup } from "react-leaflet";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";

export const SelectionCircle = () => {
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const packageSelectionRadius = useSettingsStore(
    (state) => state.packageSelectionRadius
  );

  if (!selectedPassenger) {
    return null;
  }

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
};

