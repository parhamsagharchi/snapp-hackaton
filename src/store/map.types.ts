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
  vendor?: string; // Vendor name (e.g., اسنپ‌شاپ, اسنپ‌دکتر, اسنپ‌مارکت, اسنپ‌باکس)
}

export interface IDriver extends IMapPin {
  displayName: string;
  capacityVolume: number; // in litres
}

export interface IMapStore {
  passengers: IPassenger[];
  parcels: IParcel[];
  driver: IDriver;
  activePin: IMapPin | null;
  selectedPassenger: IPassenger | null;
  selectedParcel: IParcel | null;
  optimizedRoute: IMapPin[] | null; // TSP optimized route
  simulationActive: boolean;

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
  
  // Simulation
  setSimulationActive: (active: boolean) => void;
  
  resetMapState: () => void;
}

