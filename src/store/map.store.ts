import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { IMapStore } from "./map.types";
import {
  initialDriver,
  initialPassengers,
  initialParcels,
} from "./map.constant";

// Re-export types for backward compatibility
export type { IMapPin, IPassenger, IParcel, IDriver } from "./map.types";

export const useMapStore = create<IMapStore>()(
  persist(
    (set) => ({
      passengers: initialPassengers,
      parcels: initialParcels,
      driver: initialDriver,
      selectedPassenger: null,
      selectedParcel: null,
      optimizedRoute: null,
      simulationActive: false,

      // Passengers methods
      pushPassenger: (passenger) =>
        set((state) => ({
          passengers: [...state.passengers, passenger],
        })),

      removePassengerWithLatLng: ({ lat, lng }) =>
        set((state) => ({
          passengers: state.passengers.filter(
            (passenger) => !(passenger.lat === lat && passenger.lng === lng)
          ),
        })),

      removePassengerByIndex: (index) =>
        set((state) => ({
          passengers: state.passengers.filter((_, i) => i !== index),
        })),

      updatePassengerWithLatLng: (passenger) =>
        set((state) => ({
          passengers: state.passengers.map((p) =>
            p.lat === passenger.lat && p.lng === passenger.lng ? passenger : p
          ),
        })),

      updatePassengerByIndex: (index, passenger) =>
        set((state) => ({
          passengers: state.passengers.map((p, i) =>
            i === index ? passenger : p
          ),
        })),

      // Parcels methods
      pushParcel: (parcel) =>
        set((state) => ({
          parcels: [...state.parcels, parcel],
        })),

      removeParcelWithLatLng: ({ lat, lng }) =>
        set((state) => ({
          parcels: state.parcels.filter(
            (parcel) => !(parcel.lat === lat && parcel.lng === lng)
          ),
        })),

      removeParcelByIndex: (index) =>
        set((state) => ({
          parcels: state.parcels.filter((_, i) => i !== index),
        })),

      updateParcelWithLatLng: (parcel) =>
        set((state) => ({
          parcels: state.parcels.map((p) =>
            p.lat === parcel.lat && p.lng === parcel.lng ? parcel : p
          ),
        })),

      updateParcelByIndex: (index, parcel) =>
        set((state) => ({
          parcels: state.parcels.map((p, i) => (i === index ? parcel : p)),
        })),

      // Driver methods
      setDriver: (driver) =>
        set({
          driver,
        }),

      updateDriver: (driver) =>
        set({
          driver,
        }),

      // Selection methods
      setSelectedPassenger: (passenger) =>
        set({
          selectedPassenger: passenger,
          // Clear parcel selection when passenger changes
          selectedParcel: null,
          optimizedRoute: null,
        }),

      setSelectedParcel: (parcel) =>
        set({
          selectedParcel: parcel,
        }),

      clearSelection: () =>
        set({
          selectedPassenger: null,
          selectedParcel: null,
          optimizedRoute: null,
        }),

      // Route methods
      setOptimizedRoute: (route) =>
        set({
          optimizedRoute: route,
        }),

      // Simulation
      setSimulationActive: (active) =>
        set({
          simulationActive: active,
        }),

      resetMapState: () =>
        set({
          passengers: initialPassengers,
          parcels: initialParcels,
          driver: initialDriver,
          selectedPassenger: null,
          selectedParcel: null,
          optimizedRoute: null,
          simulationActive: false,
        }),
    }),
    {
      name: "map-store",
      storage: createJSONStorage(() => localStorage),
      version: 4, // Increment version to reset old data (changed passenger structure)
      merge: (persistedState: unknown, currentState: IMapStore) => {
        const persisted = persistedState as Partial<IMapStore> & {
          version?: number;
        };

        // Preserve driver from persisted state if it exists, even on version mismatch
        const preservedDriver = persisted?.driver || initialDriver;

        // If version mismatch or no version, use initial data but preserve driver
        if (!persisted || persisted.version !== 4) {
          return {
            ...currentState,
            passengers: initialPassengers,
            parcels: initialParcels,
            driver: preservedDriver, // Preserve driver even on version mismatch
            selectedPassenger: null,
            selectedParcel: null,
            optimizedRoute: null,
            simulationActive: false,
          } as IMapStore;
        }

        const merged = {
          ...currentState,
          ...persisted,
        } as IMapStore;
        // Ensure driver is never null - use persisted driver if available
        if (!merged.driver || !merged.driver.lat || !merged.driver.lng) {
          merged.driver = preservedDriver;
        }
        // Ensure initial passengers and parcels exist if arrays are empty
        if (!merged.passengers || merged.passengers.length === 0) {
          merged.passengers = initialPassengers;
        }
        if (!merged.parcels || merged.parcels.length === 0) {
          merged.parcels = initialParcels;
        }
        return merged;
      },
    }
  )
);
