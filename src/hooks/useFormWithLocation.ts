import { useState } from "react";
import toast from "react-hot-toast";
import { useMapStore } from "@/store/map.store";
import { toastMessages } from "@/utils/toast-messages";

interface UseFormWithLocationOptions<T> {
  onAdd: (data: T) => void;
  onUpdate: (index: number, data: T) => void;
  successMessages: {
    add: string;
    update: string;
  };
}

/**
 * Custom hook for form handling with location following DRY and Single Responsibility
 */
export function useFormWithLocation<T extends { lat: number; lng: number }>({
  onAdd,
  onUpdate,
  successMessages,
}: UseFormWithLocationOptions<T>) {
  const activePin = useMapStore((state) => state.activePin);
  const setActivePin = useMapStore((state) => state.setActivePin);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const validateLocation = (): boolean => {
    if (!activePin) {
      toast.error(toastMessages.errors.locationRequired);
      return false;
    }
    return true;
  };

  const handleSubmit = (data: Omit<T, "lat" | "lng">, reset?: () => void) => {
    if (!validateLocation()) return;

    const entityWithLocation = {
      ...data,
      lat: activePin!.lat,
      lng: activePin!.lng,
    } as T;

    if (editingIndex !== null) {
      onUpdate(editingIndex, entityWithLocation);
      setEditingIndex(null);
      toast.success(successMessages.update);
    } else {
      onAdd(entityWithLocation);
      toast.success(successMessages.add);
    }

    if (reset) reset();
    setActivePin(null);
  };

  const handleCancel = (reset: () => void) => {
    setEditingIndex(null);
    reset();
    setActivePin(null);
  };

  return {
    activePin,
    editingIndex,
    setEditingIndex,
    handleSubmit,
    handleCancel,
  };
}

