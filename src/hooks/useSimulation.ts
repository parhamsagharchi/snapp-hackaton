import { useMapStore } from "@/store/map.store";
import toast from "react-hot-toast";

/**
 * Custom hook for simulation control logic following Single Responsibility Principle
 * Handles starting, stopping, and clearing simulation
 */
export function useSimulation() {
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
      toast.error("ابتدا یک مسافر انتخاب کنید");
      return;
    }
    
    // Parcel is optional - simulation can start without parcel
    // But if passenger has orderOptionsActive, they cannot receive parcels
    if (selectedPassenger.orderOptionsActive && selectedParcel) {
      toast.error(
        "این مسافر گزینه‌های سفارش فعال دارد و نمی‌تواند بسته دریافت کند"
      );
      return;
    }
    
    if (!optimizedRoute || optimizedRoute.length === 0) {
      toast.error("مسیر بهینه‌سازی نشده است");
      return;
    }

    setSimulationActive(true);
    const message = selectedParcel
      ? "شبیه‌سازی با مسافر و بسته شروع شد"
      : "شبیه‌سازی با مسافر (بدون بسته) شروع شد";
    toast.success(message);
  };

  const handleStopSimulation = () => {
    setSimulationActive(false);
    toast("شبیه‌سازی متوقف شد", { icon: "ℹ️" });
  };

  const handleClearSelection = () => {
    setSelectedPassenger(null);
    setSelectedParcel(null);
    setSimulationActive(false);
    toast("انتخاب‌ها پاک شد", { icon: "ℹ️" });
  };

  return {
    simulationActive,
    handleStartSimulation,
    handleStopSimulation,
    handleClearSelection,
  };
}

