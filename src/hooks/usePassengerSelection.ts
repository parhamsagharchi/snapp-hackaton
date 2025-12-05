import { useMapStore, type IPassenger } from "@/store/map.store";
import toast from "react-hot-toast";

/**
 * Custom hook for passenger selection logic following Single Responsibility Principle
 * Handles validation and selection of passengers
 */
export function usePassengerSelection() {
  const setSelectedPassenger = useMapStore(
    (state) => state.setSelectedPassenger
  );

  const handleSelectPassenger = (passenger: IPassenger) => {
    // Allow selection of passengers with orderOptionsActive
    // They can be picked up but cannot receive parcels
    setSelectedPassenger(passenger);
    if (passenger.orderOptionsActive) {
      toast.success(
        `مسافر ${passenger.displayName} انتخاب شد (این مسافر گزینه‌های سفارش را فعال کرده است)`,
        { icon: "ℹ️" }
      );
    } else {
      toast.success(`مسافر ${passenger.displayName} انتخاب شد`);
    }
  };

  return { handleSelectPassenger };
}
