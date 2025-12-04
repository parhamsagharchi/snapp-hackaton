import type { IMapPin } from "@/store/map.types";
import { COORDINATE_TOLERANCE } from "./constants";

/**
 * Utility functions for coordinate operations following DRY principle
 */

/**
 * Check if two coordinates are equal (with tolerance)
 */
export function areCoordinatesEqual(
  coord1: IMapPin,
  coord2: IMapPin,
  tolerance: number = COORDINATE_TOLERANCE
): boolean {
  return (
    Math.abs(coord1.lat - coord2.lat) < tolerance &&
    Math.abs(coord1.lng - coord2.lng) < tolerance
  );
}

/**
 * Format coordinates as string
 */
export function formatCoordinates(coord: IMapPin, precision: number = 4): string {
  return `${coord.lat.toFixed(precision)}, ${coord.lng.toFixed(precision)}`;
}

