import { useMapStore } from "@/store/map.store";
import toast from "react-hot-toast";
import { useTranslation } from "@/i18n";

/**
 * Custom hook for simulation control logic following Single Responsibility Principle
 * Handles starting, stopping, and clearing simulation
 */
export function useSimulation() {
  const { t } = useTranslation();
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const optimizedRoute = useMapStore((state) => state.optimizedRoute);
  const simulationActive = useMapStore((state) => state.simulationActive);
  const setSimulationActive = useMapStore((state) => state.setSimulationActive);
  const setSelectedPassenger = useMapStore(
    (state) => state.setSelectedPassenger
  );
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);

  const handleStartSimulation = () => {
    if (!selectedPassenger) {
      toast.error(t("toast.selectPassengerFirst"));
      return;
    }
    
    // Parcel is optional - simulation can start without parcel
    // But if passenger has orderOptionsActive, they cannot receive parcels
    if (selectedPassenger.orderOptionsActive && selectedParcel) {
      toast.error(t("toast.orderActiveNoParcel"));
      return;
    }
    
    if (!optimizedRoute || optimizedRoute.length === 0) {
      toast.error(t("toast.routeNotOptimized"));
      return;
    }

    setSimulationActive(true);
    const message = selectedParcel
      ? t("toast.startedWithParcel")
      : t("toast.startedWithoutParcel");
    toast.success(message);
  };

  const handleStopSimulation = () => {
    setSimulationActive(false);
    toast(t("toast.stopped"), { icon: "ℹ️" });
  };

  const handleClearSelection = () => {
    setSelectedPassenger(null);
    setSelectedParcel(null);
    setSimulationActive(false);
    toast(t("toast.selectionsCleared"), { icon: "ℹ️" });
  };

  return {
    simulationActive,
    handleStartSimulation,
    handleStopSimulation,
    handleClearSelection,
  };
}

