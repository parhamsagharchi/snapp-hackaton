import { Circle, Popup, Tooltip } from "react-leaflet";
import { useLocation } from "react-router-dom";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { useTranslation } from "@/i18n";

export const SelectionCircle = () => {
  const { t } = useTranslation();
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
            color: "#10B981",
            fillColor: "#10B981",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "10, 5",
          }}
        >
          <Tooltip permanent={false} direction="top" offset={[0, -10]}>
            <div className="text-center font-semibold text-green-600">
              {t("circle.originTooltip")}
            </div>
          </Tooltip>
          <Popup>
            <div className="text-center">
              <strong>{t("circle.originTitle")}</strong>
              <br />
              {t("circle.originBetween")}
              <br />
              {t("circle.currentRadius", {
                km: (originSelectionRadius / 1000).toFixed(1),
              })}
              <br />
              {t("circle.metersParen", {
                meters: originSelectionRadius.toLocaleString(),
              })}
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
          <Tooltip permanent={false} direction="top" offset={[0, -10]}>
            <div className="text-center font-semibold text-orange-600">
              {t("circle.destTooltip")}
            </div>
          </Tooltip>
          <Popup>
            <div className="text-center">
              <strong>{t("circle.destTitle")}</strong>
              <br />
              {t("circle.destBetween")}
              <br />
              {t("circle.currentRadius", {
                km: (destinationSelectionRadius / 1000).toFixed(1),
              })}
              <br />
              {t("circle.metersParen", {
                meters: destinationSelectionRadius.toLocaleString(),
              })}
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
            color: "#10B981",
            fillColor: "#10B981",
            fillOpacity: 0.1,
            weight: 2,
            dashArray: "10, 5",
          }}
        >
          <Tooltip permanent={false} direction="top" offset={[0, -10]}>
            <div className="text-center font-semibold text-green-600">
              {t("circle.originTooltip")}
            </div>
          </Tooltip>
          <Popup>
            <div className="text-center">
              <strong>{t("circle.originTitle")}</strong>
              <br />
              {t("circle.originInRange")}
              <br />
              {t("circle.radius", {
                km: (originSelectionRadius / 1000).toFixed(1),
              })}
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
          <Tooltip permanent={false} direction="top" offset={[0, -10]}>
            <div className="text-center font-semibold text-orange-600">
              {t("circle.destTooltip")}
            </div>
          </Tooltip>
          <Popup>
            <div className="text-center">
              <strong>{t("circle.destTitle")}</strong>
              <br />
              {t("circle.destInRange")}
              <br />
              {t("circle.radius", {
                km: (destinationSelectionRadius / 1000).toFixed(1),
              })}
            </div>
          </Popup>
        </Circle>
      </>
    );
  }

  return null;
};

