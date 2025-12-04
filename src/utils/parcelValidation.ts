import type { IParcel, IPassenger } from "@/store/map.types";
import { calculateDistance } from "./tsp";
import { DEFAULT_DESTINATION_OFFSET } from "./constants";

/**
 * Get default destination for a point (offset by default distance)
 */
export function getDefaultDestination(point: { lat: number; lng: number }) {
  return {
    lat: point.lat + DEFAULT_DESTINATION_OFFSET,
    lng: point.lng + DEFAULT_DESTINATION_OFFSET,
  };
}

/**
 * Validate parcel selection based on origin and destination radii
 * Returns validation result with error message if invalid
 */
export interface ParcelValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export function validateParcelSelection(
  parcel: IParcel,
  passenger: IPassenger,
  originSelectionRadius: number,
  destinationSelectionRadius: number
): ParcelValidationResult {
  // Check origin radius
  const originDistance = calculateDistance(passenger, parcel) * 1000; // Convert to meters

  // Use passenger destination or default
  const passengerDest = passenger.destination || getDefaultDestination(passenger);

  // Use parcel destination or default
  const parcelDest = parcel.destination || getDefaultDestination(parcel);

  // Check destination radius
  const destinationDistance =
    calculateDistance(passengerDest, parcelDest) * 1000; // Convert to meters

  if (originDistance > originSelectionRadius) {
    return {
      isValid: false,
      errorMessage: `مبدا این بسته خارج از محدوده انتخاب است (${(
        originDistance / 1000
      ).toFixed(1)} کیلومتر)`,
    };
  }

  if (destinationDistance > destinationSelectionRadius) {
    return {
      isValid: false,
      errorMessage: `مقصد این بسته خارج از محدوده انتخاب است (${(
        destinationDistance / 1000
      ).toFixed(1)} کیلومتر)`,
    };
  }

  return { isValid: true };
}

