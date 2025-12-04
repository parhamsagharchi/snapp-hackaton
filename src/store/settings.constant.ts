import type { RouteOrderPreference } from "./settings.types";

export const DEFAULT_ROUTE_ORDER_PREFERENCE: RouteOrderPreference = "passenger_first";
export const DEFAULT_ORIGIN_SELECTION_RADIUS = 1500; // 1.5km default (max: 2km) - radius between passenger origin and parcel origin
export const DEFAULT_DESTINATION_SELECTION_RADIUS = 1500; // 1.5km default (max: 2km) - radius between passenger destination and parcel destination

