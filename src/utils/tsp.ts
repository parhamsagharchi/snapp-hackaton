import type { IMapPin } from "@/store/map.types";
import type { TSPPoint, TSPRoute } from "./tsp.types";
import {
  EARTH_RADIUS_KM,
  MAX_2OPT_ITERATIONS,
  MIN_POINTS_FOR_2OPT,
} from "./constants";

// Re-export types for backward compatibility
export type { TSPPoint, TSPRoute } from "./tsp.types";

/**
 * Calculate distance between two points using Haversine formula (in kilometers)
 */
export function calculateDistance(point1: IMapPin, point2: IMapPin): number {
  const R = EARTH_RADIUS_KM;
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((point1.lat * Math.PI) / 180) *
      Math.cos((point2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Calculate total distance of a route
 */
export function calculateRouteDistance(points: IMapPin[]): number {
  if (points.length < 2) return 0;
  let totalDistance = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateDistance(points[i], points[i + 1]);
  }
  return totalDistance;
}


/**
 * Nearest Neighbor heuristic for TSP (fast approximation)
 */
function nearestNeighborTSP(points: TSPPoint[], startIndex: number): TSPRoute {
  if (points.length <= 1) {
    return { points, totalDistance: 0 };
  }

  const visited = new Set<number>([startIndex]);
  const route: TSPPoint[] = [points[startIndex]];
  let currentIndex = startIndex;
  let totalDistance = 0;

  while (visited.size < points.length) {
    let nearestIndex = -1;
    let nearestDistance = Infinity;

    for (let i = 0; i < points.length; i++) {
      if (!visited.has(i)) {
        const distance = calculateDistance(points[currentIndex], points[i]);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = i;
        }
      }
    }

    if (nearestIndex !== -1) {
      visited.add(nearestIndex);
      route.push(points[nearestIndex]);
      totalDistance += nearestDistance;
      currentIndex = nearestIndex;
    }
  }

  return { points: route, totalDistance };
}

/**
 * 2-opt improvement for TSP route
 */
function twoOptImprovement(route: TSPRoute): TSPRoute {
  let improved = true;
  let bestRoute = { ...route };
  const maxIterations = MAX_2OPT_ITERATIONS;
  let iterations = 0;

  while (improved && iterations < maxIterations) {
    improved = false;
    iterations++;

    for (let i = 1; i < bestRoute.points.length - 2; i++) {
      for (let j = i + 1; j < bestRoute.points.length; j++) {
        if (j - i === 1) continue;

        // Calculate distance if we reverse segment between i and j
        const oldDistance =
          calculateDistance(bestRoute.points[i - 1], bestRoute.points[i]) +
          calculateDistance(bestRoute.points[j - 1], bestRoute.points[j]);

        const newDistance =
          calculateDistance(bestRoute.points[i - 1], bestRoute.points[j - 1]) +
          calculateDistance(bestRoute.points[i], bestRoute.points[j]);

        if (newDistance < oldDistance) {
          // Reverse segment
          const newPoints = [...bestRoute.points];
          const segment = newPoints.slice(i, j).reverse();
          newPoints.splice(i, j - i, ...segment);

          const newTotalDistance = calculateRouteDistance(newPoints);
          bestRoute = { points: newPoints, totalDistance: newTotalDistance };
          improved = true;
        }
      }
    }
  }

  return bestRoute;
}

/**
 * Solve TSP using Nearest Neighbor + 2-opt improvement
 */
export function solveTSP(points: TSPPoint[], startIndex: number = 0): TSPRoute {
  if (points.length <= 1) {
    return { points, totalDistance: 0 };
  }

  // Start with nearest neighbor
  let route = nearestNeighborTSP(points, startIndex);

  // Improve with 2-opt if we have enough points
  if (points.length > MIN_POINTS_FOR_2OPT) {
    route = twoOptImprovement(route);
  }

  return route;
}

/**
 * Optimize route for driver with passenger and parcel
 * Respects constraints: passenger origin -> passenger destination, parcel origin -> parcel destination
 */
export function optimizeDriverRoute(
  driver: IMapPin,
  passengerOrigin: IMapPin,
  passengerDestination: IMapPin,
  parcelOrigin: IMapPin,
  parcelDestination: IMapPin,
  packageFirst: boolean = false
): TSPRoute {
  // Create points with constraints
  const driverPoint: TSPPoint = {
    ...driver,
    id: "driver",
    type: "driver",
  };

  const passengerOriginPoint: TSPPoint = {
    ...passengerOrigin,
    id: "passenger_origin",
    type: "passenger_origin",
  };

  const passengerDestPoint: TSPPoint = {
    ...passengerDestination,
    id: "passenger_destination",
    type: "passenger_destination",
  };

  const parcelOriginPoint: TSPPoint = {
    ...parcelOrigin,
    id: "parcel_origin",
    type: "parcel_origin",
  };

  const parcelDestPoint: TSPPoint = {
    ...parcelDestination,
    id: "parcel_destination",
    type: "parcel_destination",
  };

  // Use TSP to optimize the route while respecting constraints:
  // - Driver must start first
  // - Passenger Origin must come before Passenger Destination
  // - Parcel Origin must come before Parcel Destination
  // Generate all valid route combinations and pick the best
  
  const validRoutes: TSPPoint[][] = [];
  const points = [
    passengerOriginPoint,
    passengerDestPoint,
    parcelOriginPoint,
    parcelDestPoint,
  ];

  // Generate all valid permutations where:
  // - passengerOrigin comes before passengerDest
  // - parcelOrigin comes before parcelDest
  // - If packageFirst: parcelOrigin comes before passengerOrigin
  // - If !packageFirst: passengerOrigin comes before parcelOrigin (or can be interleaved)
  
  function isValidRoute(route: TSPPoint[]): boolean {
    const passengerOriginIdx = route.findIndex((p) => p.id === "passenger_origin");
    const passengerDestIdx = route.findIndex((p) => p.id === "passenger_destination");
    const parcelOriginIdx = route.findIndex((p) => p.id === "parcel_origin");
    const parcelDestIdx = route.findIndex((p) => p.id === "parcel_destination");

    // Check constraints
    if (passengerOriginIdx >= passengerDestIdx) return false;
    if (parcelOriginIdx >= parcelDestIdx) return false;

    if (packageFirst) {
      // Package origin must come before passenger origin
      if (parcelOriginIdx >= passengerOriginIdx) return false;
    }

    return true;
  }

  // Generate all permutations of the 4 points
  function permute(arr: TSPPoint[]): TSPPoint[][] {
    if (arr.length <= 1) return [arr];
    const result: TSPPoint[][] = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const perms = permute(rest);
      for (const perm of perms) {
        result.push([arr[i], ...perm]);
      }
    }
    return result;
  }

  // Generate all valid routes
  const allPermutations = permute(points);
  for (const perm of allPermutations) {
    const route = [driverPoint, ...perm];
    if (isValidRoute(route)) {
      validRoutes.push(route);
    }
  }

  // If no valid routes found (shouldn't happen), use fallback
  if (validRoutes.length === 0) {
    if (packageFirst) {
      validRoutes.push([
        driverPoint,
        parcelOriginPoint,
        passengerOriginPoint,
        passengerDestPoint,
        parcelDestPoint,
      ]);
    } else {
      validRoutes.push([
        driverPoint,
        passengerOriginPoint,
        parcelOriginPoint,
        passengerDestPoint,
        parcelDestPoint,
      ]);
    }
  }

  // Find the route with minimum distance
  let bestRoute = validRoutes[0];
  let bestDistance = calculateRouteDistance(bestRoute);

  for (const testRoute of validRoutes) {
    const distance = calculateRouteDistance(testRoute);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestRoute = testRoute;
    }
  }

  return {
    points: bestRoute,
    totalDistance: bestDistance,
  };
}

