import { PageLayout } from "@/components/shared/layout/PageLayout";
import { useMapStore } from "@/store/map.store";
import {
  SimulationControls,
  PassengerSelection,
  ParcelOffers,
} from "./components";
import { useSimulation } from "@/hooks/useSimulation";
import { usePassengerSelection } from "@/hooks/usePassengerSelection";
import { useParcelSelection } from "@/hooks/useParcelSelection";
import { useParcelOffers } from "@/hooks/useParcelOffers";
import { useTranslation } from "@/i18n";

function HomePage() {
  const { t } = useTranslation();
  const driver = useMapStore((state) => state.driver);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const optimizedRoute = useMapStore((state) => state.optimizedRoute);

  const { availablePassengers, parcelOffers } = useParcelOffers();
  const { handleSelectPassenger } = usePassengerSelection();
  const { handleSelectParcel } = useParcelSelection();
  const {
    simulationActive,
    handleStartSimulation,
    handleStopSimulation,
    handleClearSelection,
  } = useSimulation();

  return (
    <PageLayout title={t("home.title")}>
      <div className="space-y-3">
        <SimulationControls
          simulationActive={simulationActive}
          selectedPassenger={selectedPassenger}
          selectedParcel={selectedParcel}
          optimizedRoute={optimizedRoute}
          onStartSimulation={handleStartSimulation}
          onStopSimulation={handleStopSimulation}
          onClearSelection={handleClearSelection}
        />

        <PassengerSelection
          driver={driver}
          passengers={availablePassengers}
          selectedPassenger={selectedPassenger}
          onSelectPassenger={handleSelectPassenger}
        />

        {selectedPassenger && (
          <ParcelOffers
            selectedPassenger={selectedPassenger}
            selectedParcel={selectedParcel}
            parcelOffers={parcelOffers}
            onSelectParcel={handleSelectParcel}
          />
        )}
      </div>
    </PageLayout>
  );
}

export default HomePage;
