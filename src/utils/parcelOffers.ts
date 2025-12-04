import type { IPassenger, IParcel, IDriver } from "@/store/map.types";
import { calculateDistance, optimizeDriverRoute } from "./tsp";
import type { ParcelOffer } from "./parcelOffers.types";
import { getDefaultDestination } from "./parcelValidation";
import {
  RADIUS_TOLERANCE,
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

  // Calculate all routes first to get normalization ranges
  const routeData = parcelsInRadius.map((parcel) => {
    const parcelDest = parcel.destination || getDefaultDestination(parcel);
    const route = optimizeDriverRoute(
      driver,
      passenger,
      passengerDest,
      parcel,
      parcelDest,
      packageFirst
    );
    const totalDistance = route.totalDistance;
    const detourDistance = Math.max(totalDistance - directPassengerRoute, 0);
    const driverToParcel = calculateDistance(driver, parcel);
    const driverToPassenger = calculateDistance(driver, passenger);
    
    // Calculate distance from parcel destination to passenger route line
    // Using perpendicular distance formula for better accuracy
    const parcelDestToRoute = calculateDistanceToLineSegment(
      parcelDest,
      passenger,
      passengerDest
    );

    return {
      parcel,
      route,
      totalDistance,
      detourDistance,
      driverToParcel,
      driverToPassenger,
      parcelDestToRoute,
    };
  });

  // Find max values for normalization
  const maxTotalDistance = Math.max(...routeData.map((r) => r.totalDistance), 1);
  const maxDetourDistance = Math.max(...routeData.map((r) => r.detourDistance), 1);
  const maxFirstPickup = Math.max(
    ...routeData.map((r) => Math.min(r.driverToParcel, r.driverToPassenger)),
    1
  );
  const maxRouteAlignment = Math.max(
    ...routeData.map((r) => r.parcelDestToRoute),
    1
  );

  // Score each parcel with normalized values
  const offers: ParcelOffer[] = routeData
    .map((data) => {
      const { parcel, totalDistance, detourDistance, driverToParcel, driverToPassenger, parcelDestToRoute } = data;

      // Normalize all factors to 0-1 range (lower is better)
      const normalizedTotalDistance = totalDistance / maxTotalDistance;
      const normalizedDetourDistance = detourDistance / maxDetourDistance;
      const normalizedFirstPickup = Math.min(driverToParcel, driverToPassenger) / maxFirstPickup;
      const normalizedRouteAlignment = Math.min(parcelDestToRoute / maxRouteAlignment, 1);

      // Calculate weighted score (lower is better)
      const score =
        normalizedTotalDistance * SCORING_WEIGHTS.TOTAL_DISTANCE +
        normalizedDetourDistance * SCORING_WEIGHTS.DETOUR_DISTANCE +
        normalizedFirstPickup * SCORING_WEIGHTS.FIRST_PICKUP_DISTANCE +
        normalizedRouteAlignment * SCORING_WEIGHTS.ROUTE_ALIGNMENT;

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

/**
 * Calculate perpendicular distance from a point to a line segment
 * Returns the minimum distance from point to any point on the line segment
 */
function calculateDistanceToLineSegment(
  point: { lat: number; lng: number },
  lineStart: { lat: number; lng: number },
  lineEnd: { lat: number; lng: number }
): number {
  // Convert to Cartesian-like coordinates for calculation
  // Using simplified approach: calculate distance to closest point on line segment
  
  // Vector from lineStart to lineEnd
  const dx = lineEnd.lng - lineStart.lng;
  const dy = lineEnd.lat - lineStart.lat;
  const lineLengthSq = dx * dx + dy * dy;

  if (lineLengthSq === 0) {
    // Line segment is a point
    return calculateDistance(point, lineStart);
  }

  // Vector from lineStart to point
  const px = point.lng - lineStart.lng;
  const py = point.lat - lineStart.lat;

  // Project point onto line segment
  const t = Math.max(0, Math.min(1, (px * dx + py * dy) / lineLengthSq));
  
  // Closest point on line segment
  const closestPoint = {
    lat: lineStart.lat + t * dy,
    lng: lineStart.lng + t * dx,
  };

  return calculateDistance(point, closestPoint);
}
