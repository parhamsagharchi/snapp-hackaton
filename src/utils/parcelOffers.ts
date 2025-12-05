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
 * Find best parcel offers for a driver and passenger using simplified algorithm
 * Returns top N offers sorted by score (lower is better)
 * 
 * Algorithm steps (matching /algorithm page):
 * 1. Filter by origin radius: d(P_passenger, P_parcel) <= R_origin + tolerance
 * 2. Filter by destination radius: d(D_passenger, D_parcel) <= R_destination + tolerance
 * 3. Calculate optimized route for each valid parcel
 * 4. Score each parcel based on 4 criteria (normalized)
 * 5. Sort by score and return top N
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
  if (parcels.length === 0) {
    console.log("🔍 [Algorithm] No parcels available");
    return [];
  }

  // Use passenger destination or default offset
  const passengerDest = passenger.destination || getDefaultDestination(passenger);

  // Calculate direct passenger route distance (baseline for detour calculation)
  const directPassengerRoute = calculateDistance(passenger, passengerDest);

  console.log("🔍 [Algorithm] Starting calculation:", {
    passenger: passenger.displayName,
    passengerOrigin: { lat: passenger.lat, lng: passenger.lng },
    passengerDest: { lat: passengerDest.lat, lng: passengerDest.lng },
    originRadius: originSelectionRadius,
    destinationRadius: destinationSelectionRadius,
    totalParcels: parcels.length,
  });

  // STEP 1: Filter by origin radius
  // Condition: d(P_passenger, P_parcel) <= R_origin + tolerance
  const parcelsAfterOriginFilter = parcels.filter((parcel) => {
    const originDistance = calculateDistance(passenger, parcel) * 1000; // Convert to meters
    const originInRadius = originDistance <= originSelectionRadius + RADIUS_TOLERANCE;

    if (!originInRadius) {
      console.log(`❌ [Filter Origin] ${parcel.displayName} rejected:`, {
        distance: `${originDistance.toFixed(1)}m`,
        maxAllowed: `${originSelectionRadius + RADIUS_TOLERANCE}m`,
        parcelOrigin: { lat: parcel.lat, lng: parcel.lng },
        passengerOrigin: { lat: passenger.lat, lng: passenger.lng },
      });
    } else {
      console.log(`✅ [Filter Origin] ${parcel.displayName} passed:`, {
        distance: `${originDistance.toFixed(1)}m`,
        maxAllowed: `${originSelectionRadius + RADIUS_TOLERANCE}m`,
      });
    }
    
    return originInRadius;
  });

  console.log(`✅ [Filter Origin] ${parcelsAfterOriginFilter.length} parcels passed origin filter:`, 
    parcelsAfterOriginFilter.map(p => p.displayName)
  );

  // STEP 2: Filter by destination radius
  // Condition: d(D_passenger, D_parcel) <= R_destination + tolerance
  const parcelsInRadius = parcelsAfterOriginFilter.filter((parcel) => {
    const parcelDest = parcel.destination || getDefaultDestination(parcel);
    const destinationDistance = calculateDistance(passengerDest, parcelDest) * 1000; // Convert to meters
    const destinationInRadius = destinationDistance <= destinationSelectionRadius + RADIUS_TOLERANCE;

    if (!destinationInRadius) {
      console.log(`❌ [Filter Destination] ${parcel.displayName} rejected:`, {
        distance: `${destinationDistance.toFixed(1)}m`,
        maxAllowed: `${destinationSelectionRadius + RADIUS_TOLERANCE}m`,
        parcelDest: { lat: parcelDest.lat, lng: parcelDest.lng },
        passengerDest: { lat: passengerDest.lat, lng: passengerDest.lng },
      });
    } else {
      console.log(`✅ [Filter] ${parcel.displayName} passed both filters:`, {
        originDistance: `${(calculateDistance(passenger, parcel) * 1000).toFixed(1)}m`,
        destinationDistance: `${destinationDistance.toFixed(1)}m`,
      });
    }

    return destinationInRadius;
  });

  console.log(`✅ [Filter Destination] ${parcelsInRadius.length} parcels passed both filters:`, 
    parcelsInRadius.map(p => p.displayName)
  );

  if (parcelsInRadius.length === 0) {
    console.log("⚠️ [Algorithm] No parcels passed both filters");
    return [];
  }

  // STEP 3: Calculate routes for all valid parcels
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

  // STEP 4: Find max values for normalization
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

  console.log("📊 [Normalization] Max values:", {
    maxTotalDistance: maxTotalDistance.toFixed(2),
    maxDetourDistance: maxDetourDistance.toFixed(2),
    maxFirstPickup: maxFirstPickup.toFixed(2),
    maxRouteAlignment: maxRouteAlignment.toFixed(2),
  });

  // STEP 5: Score each parcel with normalized values
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

      console.log(`📈 [Scoring] ${parcel.displayName}:`, {
        totalDistance: totalDistance.toFixed(2),
        detourDistance: detourDistance.toFixed(2),
        score: score.toFixed(4),
        normalized: {
          total: normalizedTotalDistance.toFixed(4),
          detour: normalizedDetourDistance.toFixed(4),
          first: normalizedFirstPickup.toFixed(4),
          alignment: normalizedRouteAlignment.toFixed(4),
        },
      });

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

  console.log("🎯 [Algorithm] Final offers:", offers.map((o, i) => ({
    rank: i + 1,
    parcel: o.parcel.displayName,
    score: o.score.toFixed(4),
    totalDistance: o.totalDistance.toFixed(2),
  })));

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
