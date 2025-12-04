import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type RouteOrderPreference = "passenger_first" | "package_first";

interface ISettingsStore {
  routeOrderPreference: RouteOrderPreference;
  originSelectionRadius: number; // in meters - radius between passenger origin and parcel origin
  destinationSelectionRadius: number; // in meters - radius between passenger destination and parcel destination
  setRouteOrderPreference: (preference: RouteOrderPreference) => void;
  setOriginSelectionRadius: (radius: number) => void;
  setDestinationSelectionRadius: (radius: number) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      routeOrderPreference: "passenger_first",
      originSelectionRadius: 1500, // 1.5km default (max: 2km) - radius between passenger origin and parcel origin
      destinationSelectionRadius: 1500, // 1.5km default (max: 2km) - radius between passenger destination and parcel destination

      setRouteOrderPreference: (preference) =>
        set({
          routeOrderPreference: preference,
        }),

      setOriginSelectionRadius: (radius) =>
        set({
          originSelectionRadius: Math.min(Math.max(radius, 1000), 2000), // Clamp between 1km and 2km
        }),

      setDestinationSelectionRadius: (radius) =>
        set({
          destinationSelectionRadius: Math.min(Math.max(radius, 1000), 2000), // Clamp between 1km and 2km
        }),
    }),
    {
      name: "settings-store",
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState: unknown, currentState: ISettingsStore) => {
        const persisted = persistedState as Partial<ISettingsStore>;
        const merged = {
          ...currentState,
          ...persisted,
        } as ISettingsStore;
        
        // Ensure originSelectionRadius is within valid range (1km - 2km)
        if (merged.originSelectionRadius) {
          merged.originSelectionRadius = Math.min(
            Math.max(merged.originSelectionRadius, 1000),
            2000
          );
        }
        
        // Ensure destinationSelectionRadius is within valid range (1km - 2km)
        if (merged.destinationSelectionRadius) {
          merged.destinationSelectionRadius = Math.min(
            Math.max(merged.destinationSelectionRadius, 1000),
            2000
          );
        }
        
        // Migrate old packageSelectionRadius to originSelectionRadius if exists
        if ((persisted as any).packageSelectionRadius && !merged.originSelectionRadius) {
          merged.originSelectionRadius = Math.min(
            Math.max((persisted as any).packageSelectionRadius, 1000),
            2000
          );
        }
        
        return merged;
      },
    }
  )
);

