import { useMapStore, type IPassenger } from "@/store/map.store";
import toast from "react-hot-toast";
import { useTranslation } from "@/i18n";

/**
 * Custom hook for passenger selection logic following Single Responsibility Principle
 * Handles validation and selection of passengers
 */
export function usePassengerSelection() {
  const { t, tName } = useTranslation();
  const setSelectedPassenger = useMapStore(
    (state) => state.setSelectedPassenger
  );

  const handleSelectPassenger = (passenger: IPassenger) => {
    // Allow selection of passengers with orderOptionsActive
    // They can be picked up but cannot receive parcels
    setSelectedPassenger(passenger);
    const name = tName(passenger.displayName);
    if (passenger.orderOptionsActive) {
      toast.success(t("toast.passengerSelectedOrderOptions", { name }), {
        icon: "ℹ️",
      });
    } else {
      toast.success(t("toast.passengerSelected", { name }));
    }
  };

  return { handleSelectPassenger };
}
