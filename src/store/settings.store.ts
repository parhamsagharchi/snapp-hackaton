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
      packageSelectionRadius: 5000, // 5km default

      setRouteOrderPreference: (preference) =>
        set({
          routeOrderPreference: preference,
        }),

      setPackageSelectionRadius: (radius) =>
        set({
          packageSelectionRadius: radius,
        }),
    }),
    {
      name: "settings-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

