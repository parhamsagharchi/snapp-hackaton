import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type RouteOrderPreference = "passenger_first" | "package_first";

interface ISettingsStore {
  routeOrderPreference: RouteOrderPreference;
  packageSelectionRadius: number; // in meters
  setRouteOrderPreference: (preference: RouteOrderPreference) => void;
  setPackageSelectionRadius: (radius: number) => void;
}

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      routeOrderPreference: "passenger_first",
      packageSelectionRadius: 1500, // 1.5km default (max: 2km)

      setRouteOrderPreference: (preference) =>
        set({
          routeOrderPreference: preference,
        }),

      setPackageSelectionRadius: (radius) =>
        set({
          packageSelectionRadius: Math.min(Math.max(radius, 1000), 2000), // Clamp between 1km and 2km
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
        
        // Ensure packageSelectionRadius is within valid range (1km - 2km)
        if (merged.packageSelectionRadius) {
          merged.packageSelectionRadius = Math.min(
            Math.max(merged.packageSelectionRadius, 1000),
            2000
          );
        }
        
        return merged;
      },
    }
  )
);

