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
    if (passenger.orderOptionsActive) {
      toast.error(
        "این مسافر گزینه‌های سفارش فعال دارد و نمی‌تواند بسته دریافت کند"
      );
      return;
    }
    setSelectedPassenger(passenger);
    toast.success(`مسافر ${passenger.displayName} انتخاب شد`);
  };

  return { handleSelectPassenger };
}

