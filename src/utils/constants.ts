/**
 * Application-wide constants following DRY and KISS principles
 * Centralized location for magic numbers and configuration values
 */

// Distance and radius constants (in meters)
export const DEFAULT_ORIGIN_SELECTION_RADIUS = 2000; // 2km
export const DEFAULT_DESTINATION_SELECTION_RADIUS = 2000; // 2km
export const RADIUS_TOLERANCE = 50; // meters - for rounding errors and user-friendliness

// Distance constants (in kilometers)
export const DEFAULT_DESTINATION_OFFSET = 0.05; // ~7 km away
export const MAX_ROUTE_ALIGNMENT_DISTANCE = 10; // kilometers

// Coordinate comparison tolerance
export const COORDINATE_TOLERANCE = 0.0001; // degrees

// TSP algorithm constants
export const MAX_2OPT_ITERATIONS = 100;
export const MIN_POINTS_FOR_2OPT = 3;

// Route calculation constants
export const AVERAGE_SPEED_KMH = 50; // kilometers per hour
export const EARTH_RADIUS_KM = 6371; // kilometers

// Scoring algorithm weights
export const SCORING_WEIGHTS = {
  TOTAL_DISTANCE: 0.35,
  DETOUR_DISTANCE: 0.3,
  FIRST_PICKUP_DISTANCE: 0.15,
  ROUTE_ALIGNMENT: 0.2,
} as const;

// Parcel offer constants
export const DEFAULT_MAX_OFFERS = 5;

