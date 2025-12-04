import { useMapStore, type IParcel } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { validateParcelSelection } from "@/utils/parcelValidation";
import toast from "react-hot-toast";

/**
 * Custom hook for parcel selection logic following Single Responsibility Principle
 * Handles validation and selection of parcels
 */
export function useParcelSelection() {
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const setSelectedParcel = useMapStore((state) => state.setSelectedParcel);
  const originSelectionRadius = useSettingsStore(
    (state) => state.originSelectionRadius
  );
  const destinationSelectionRadius = useSettingsStore(
    (state) => state.destinationSelectionRadius
  );

  const handleSelectParcel = (parcel: IParcel) => {
    if (!selectedPassenger) {
      toast.error("ابتدا یک مسافر انتخاب کنید");
      return;
    }

    const validation = validateParcelSelection(
      parcel,
      selectedPassenger,
      originSelectionRadius,
      destinationSelectionRadius
    );

    if (!validation.isValid) {
      toast.error(validation.errorMessage!);
      return;
    }

    setSelectedParcel(parcel);
    toast.success(`بسته ${parcel.displayName} انتخاب شد`);
  };

  return { handleSelectParcel };
}

