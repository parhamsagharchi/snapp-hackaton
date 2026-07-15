import type { Language } from "@/i18n/config";

export type RouteOrderPreference = "passenger_first" | "package_first";

export interface ISettingsStore {
  routeOrderPreference: RouteOrderPreference;
  originSelectionRadius: number; // in meters - radius between passenger origin and parcel origin
  destinationSelectionRadius: number; // in meters - radius between passenger destination and parcel destination
  language: Language; // active UI language
  setRouteOrderPreference: (preference: RouteOrderPreference) => void;
  setOriginSelectionRadius: (radius: number) => void;
  setDestinationSelectionRadius: (radius: number) => void;
  setLanguage: (language: Language) => void;
}

