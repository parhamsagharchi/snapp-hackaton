import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ISettingsStore } from "./settings.types";
import {
  DEFAULT_ROUTE_ORDER_PREFERENCE,
  DEFAULT_ORIGIN_SELECTION_RADIUS,
  DEFAULT_DESTINATION_SELECTION_RADIUS,
} from "./settings.constant";

// Re-export types for backward compatibility
export type { RouteOrderPreference } from "./settings.types";

export const useSettingsStore = create<ISettingsStore>()(
  persist(
    (set) => ({
      routeOrderPreference: DEFAULT_ROUTE_ORDER_PREFERENCE,
      originSelectionRadius: DEFAULT_ORIGIN_SELECTION_RADIUS,
      destinationSelectionRadius: DEFAULT_DESTINATION_SELECTION_RADIUS,

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

