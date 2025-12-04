import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface IMapPin {
  lat: number;
  lng: number;
}

export interface IPassenger extends IMapPin {
  displayName: string;
  orderOptionsActive: boolean; // If true, algorithm should ignore this passenger
  destination?: IMapPin; // Optional destination for passenger
}

export interface IParcel extends IMapPin {
  displayName: string;
  volume: number; // in litres
  destination?: IMapPin; // Optional destination for parcel
}

export interface IDriver extends IMapPin {
  displayName: string;
  capacityVolume: number; // in litres
}

interface IMapStore {
  passengers: IPassenger[];
  parcels: IParcel[];
  driver: IDriver;
  activePin: IMapPin | null;
  selectedPassenger: IPassenger | null;
  selectedParcel: IParcel | null;
  optimizedRoute: IMapPin[] | null; // TSP optimized route

  // Passengers methods
  pushPassenger: (passenger: IPassenger) => void;
  removePassengerWithLatLng: (coordinates: {
    lat: number;
    lng: number;
  }) => void;
  removePassengerByIndex: (index: number) => void;
  updatePassengerWithLatLng: (passenger: IPassenger) => void;
  updatePassengerByIndex: (index: number, passenger: IPassenger) => void;

  // Parcels methods
  pushParcel: (parcel: IParcel) => void;
  removeParcelWithLatLng: (coordinates: { lat: number; lng: number }) => void;
  removeParcelByIndex: (index: number) => void;
  updateParcelWithLatLng: (parcel: IParcel) => void;
  updateParcelByIndex: (index: number, parcel: IParcel) => void;

  // Driver methods
  setDriver: (driver: IDriver) => void;
  updateDriver: (driver: IDriver) => void;

  // Selection methods
  setSelectedPassenger: (passenger: IPassenger | null) => void;
  setSelectedParcel: (parcel: IParcel | null) => void;
  clearSelection: () => void;

  // Route methods
  setOptimizedRoute: (route: IMapPin[] | null) => void;

  // Active pin
  setActivePin: (pin: IMapPin | null) => void;
  resetMapState: () => void;
}

const initialDriver: IDriver = {
  displayName: "احمد حسینی",
  lat: 35.72,
  lng: 51.45,
  capacityVolume: 470,
};

// Initial passengers data (8 passengers from East Tehran)
const initialPassengers: IPassenger[] = [
  {
    displayName: "علی احمدی",
    lat: 35.73,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "فاطمه رضایی",
    lat: 35.71,
    lng: 51.47,
    orderOptionsActive: false,
  },
  {
    displayName: "محمد کریمی",
    lat: 35.75,
    lng: 51.48,
    orderOptionsActive: false,
  },
  {
    displayName: "زهرا موسوی",
    lat: 35.7,
    lng: 51.45,
    orderOptionsActive: false,
  },
  {
    displayName: "حسین نوری",
    lat: 35.74,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "مریم صادقی",
    lat: 35.72,
    lng: 51.48,
    orderOptionsActive: false,
  },
  {
    displayName: "رضا حسینی",
    lat: 35.69,
    lng: 51.46,
    orderOptionsActive: false,
  },
  {
    displayName: "سارا محمدی",
    lat: 35.76,
    lng: 51.47,
    orderOptionsActive: false,
  },
];

// Initial parcels data (10 parcels from East Tehran)
const initialParcels: IParcel[] = [
  {
    displayName: "بسته ۱",
    lat: 35.73,
    lng: 51.47,
    volume: 2.5 * 10, // Convert weight (kg) to volume (liters)
  },
  {
    displayName: "بسته ۲",
    lat: 35.71,
    lng: 51.46,
    volume: 1.8 * 10,
  },
  {
    displayName: "بسته ۳",
    lat: 35.74,
    lng: 51.48,
    volume: 3.2 * 10,
  },
  {
    displayName: "بسته ۴",
    lat: 35.7,
    lng: 51.47,
    volume: 1.5 * 10,
  },
  {
    displayName: "بسته ۵",
    lat: 35.75,
    lng: 51.46,
    volume: 2.8 * 10,
  },
  {
    displayName: "بسته ۶",
    lat: 35.72,
    lng: 51.49,
    volume: 1.2 * 10,
  },
  {
    displayName: "بسته ۷",
    lat: 35.69,
    lng: 51.48,
    volume: 2.3 * 10,
  },
  {
    displayName: "بسته ۸",
    lat: 35.77,
    lng: 51.47,
    volume: 1.9 * 10,
  },
  {
    displayName: "بسته ۹",
    lat: 35.73,
    lng: 51.49,
    volume: 3.5 * 10,
  },
  {
    displayName: "بسته ۱۰",
    lat: 35.71,
    lng: 51.5,
    volume: 2.1 * 10,
  },
];

export const useMapStore = create<IMapStore>()(
  persist(
    (set) => ({
      passengers: initialPassengers,
      parcels: initialParcels,
      driver: initialDriver,
      activePin: null,
      selectedPassenger: null,
      selectedParcel: null,
      optimizedRoute: null,

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

      // Active pin
      setActivePin: (pin) =>
        set({
          activePin: pin,
        }),

      resetMapState: () =>
        set({
          passengers: initialPassengers,
          parcels: initialParcels,
          driver: initialDriver,
          activePin: null,
          selectedPassenger: null,
          selectedParcel: null,
          optimizedRoute: null,
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

        // If version mismatch or no version, use initial data
        if (!persisted || persisted.version !== 4) {
          return {
            ...currentState,
            passengers: initialPassengers,
            parcels: initialParcels,
            driver: initialDriver,
            activePin: null,
            selectedPassenger: null,
            selectedParcel: null,
            optimizedRoute: null,
          } as IMapStore;
        }

        const merged = {
          ...currentState,
          ...persisted,
        } as IMapStore;
        // Ensure driver is never null
        if (!merged.driver) {
          merged.driver = initialDriver;
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
