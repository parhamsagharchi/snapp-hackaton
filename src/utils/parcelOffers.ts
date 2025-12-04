import type { IPassenger, IParcel, IDriver } from "@/store/map.store";
import { calculateDistance, optimizeDriverRoute } from "./tsp";

export interface ParcelOffer {
  parcel: IParcel;
  score: number;
  totalDistance: number;
  detourDistance: number;
  estimatedTime: number; // in minutes
}

/**
 * Find best parcel offers for a driver and passenger using TSP algorithm
 * Returns top N offers sorted by score (lower is better)
 * Only includes parcels within the specified selection radius from passenger
 */
export function findBestParcelOffers(
  driver: IDriver,
  passenger: IPassenger,
  parcels: IParcel[],
  packageFirst: boolean = false,
  maxOffers: number = 5,
  packageSelectionRadius: number = 2000 // in meters, default 2km
): ParcelOffer[] {
  if (parcels.length === 0) return [];

  // Use passenger destination or default offset (more realistic distance)
  const passengerDest = passenger.destination || {
    lat: passenger.lat + 0.05, // ~7 km away
    lng: passenger.lng + 0.05,
  };

  // Calculate direct passenger route distance (baseline)
  const directPassengerRoute = calculateDistance(passenger, passengerDest);

  // Filter parcels within selection radius from passenger
  // Add a small tolerance (50m) to account for rounding errors and make the filter more user-friendly
  const tolerance = 50; // meters
  const parcelsInRadius = parcels.filter((parcel) => {
    const distanceFromPassenger = calculateDistance(passenger, parcel) * 1000; // Convert to meters
    return distanceFromPassenger <= packageSelectionRadius + tolerance;
  });

  if (parcelsInRadius.length === 0) return [];

  // Score each parcel
  const offers: ParcelOffer[] = parcelsInRadius
    .map((parcel) => {
      // Use parcel destination or default offset (more realistic distance)
      const parcelDest = parcel.destination || {
        lat: parcel.lat + 0.05, // ~7 km away
        lng: parcel.lng + 0.05,
      };

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

      // Scoring algorithm (lower is better):
      // 1. Total distance (weight: 0.30)
      // 2. Detour distance (weight: 0.25)
      // 3. Distance from driver to first pickup (weight: 0.15)
      // 4. Parcel volume factor (weight: 0.10) - smaller parcels preferred
      // 5. Route alignment (weight: 0.20) - parcel destination close to passenger route

      const volumeFactor = Math.min(parcel.volume / 500, 1); // Normalize volume (max 500L)
      const routeAlignmentFactor = Math.min(parcelDestToRoute / 10, 1); // Normalize (max 10km)

      const score =
        totalDistance * 0.3 +
        Math.max(detourDistance, 0) * 0.25 +
        Math.min(driverToParcel, driverToPassenger) * 0.15 +
        volumeFactor * 5 * 0.1 +
        routeAlignmentFactor * 10 * 0.2;

      // Estimate time (assuming average speed of 50 km/h)
      const estimatedTime = (totalDistance / 50) * 60;

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
