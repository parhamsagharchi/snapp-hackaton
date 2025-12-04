import type { IPassenger, IParcel, IDriver } from "@/store/map.types";
import { calculateDistance, optimizeDriverRoute } from "./tsp";
import type { ParcelOffer } from "./parcelOffers.types";
import { getDefaultDestination } from "./parcelValidation";
import {
  RADIUS_TOLERANCE,
  MAX_ROUTE_ALIGNMENT_DISTANCE,
  AVERAGE_SPEED_KMH,
  SCORING_WEIGHTS,
  DEFAULT_MAX_OFFERS,
} from "./constants";

// Re-export types for backward compatibility
export type { ParcelOffer } from "./parcelOffers.types";

/**
 * Find best parcel offers for a driver and passenger using TSP algorithm
 * Returns top N offers sorted by score (lower is better)
 * Filters parcels based on two radii:
 * 1. Origin radius: distance between passenger origin and parcel origin
 * 2. Destination radius: distance between passenger destination and parcel destination
 */
export function findBestParcelOffers(
  driver: IDriver,
  passenger: IPassenger,
  parcels: IParcel[],
  packageFirst: boolean = false,
  maxOffers: number = DEFAULT_MAX_OFFERS,
  originSelectionRadius: number = 2000, // in meters, default 2km
  destinationSelectionRadius: number = 2000 // in meters, default 2km
): ParcelOffer[] {
  if (parcels.length === 0) return [];

  // Use passenger destination or default offset (more realistic distance)
  const passengerDest = passenger.destination || getDefaultDestination(passenger);

  // Calculate direct passenger route distance (baseline)
  const directPassengerRoute = calculateDistance(passenger, passengerDest);

  // Filter parcels based on both origin and destination radii
  // Add a small tolerance to account for rounding errors and make the filter more user-friendly
  const parcelsInRadius = parcels.filter((parcel) => {
    // Check origin radius: distance between passenger origin and parcel origin
    const originDistance = calculateDistance(passenger, parcel) * 1000; // Convert to meters
    const originInRadius = originDistance <= originSelectionRadius + RADIUS_TOLERANCE;

    // Use parcel destination or default offset
    const parcelDest = parcel.destination || getDefaultDestination(parcel);

    // Check destination radius: distance between passenger destination and parcel destination
    const destinationDistance = calculateDistance(passengerDest, parcelDest) * 1000; // Convert to meters
    const destinationInRadius = destinationDistance <= destinationSelectionRadius + RADIUS_TOLERANCE;

    // Parcel must satisfy both conditions
    return originInRadius && destinationInRadius;
  });

  if (parcelsInRadius.length === 0) return [];

  // Score each parcel
  const offers: ParcelOffer[] = parcelsInRadius
    .map((parcel) => {
      // Use parcel destination or default offset (more realistic distance)
      const parcelDest = parcel.destination || getDefaultDestination(parcel);

      // Calculate optimized route using TSP
      const route = optimizeDriverRoute(
        driver,
        passenger,
        passengerDest,
        parcel,
        parcelDest,
        packageFirst
      );

      const totalDistance = route.totalDistance;
      const detourDistance = totalDistance - directPassengerRoute;

      // Calculate distances for scoring
      const driverToParcel = calculateDistance(driver, parcel);
      const driverToPassenger = calculateDistance(driver, passenger);

      // Check if parcel destination is on the way
      const passengerRouteMidpoint = {
        lat: (passenger.lat + passengerDest.lat) / 2,
        lng: (passenger.lng + passengerDest.lng) / 2,
      };
      const parcelDestToRoute = calculateDistance(
        parcelDest,
        passengerRouteMidpoint
      );

      // Scoring algorithm (lower is better)
      const routeAlignmentFactor = Math.min(
        parcelDestToRoute / MAX_ROUTE_ALIGNMENT_DISTANCE,
        1
      );

      const score =
        totalDistance * SCORING_WEIGHTS.TOTAL_DISTANCE +
        Math.max(detourDistance, 0) * SCORING_WEIGHTS.DETOUR_DISTANCE +
        Math.min(driverToParcel, driverToPassenger) *
          SCORING_WEIGHTS.FIRST_PICKUP_DISTANCE +
        routeAlignmentFactor * 10 * SCORING_WEIGHTS.ROUTE_ALIGNMENT;

      // Estimate time (assuming average speed)
      const estimatedTime = (totalDistance / AVERAGE_SPEED_KMH) * 60;

      return {
        parcel,
        score,
        totalDistance,
        detourDistance,
        estimatedTime,
      };
    })
    .sort((a, b) => a.score - b.score)
    .slice(0, maxOffers);

  return offers;
}
