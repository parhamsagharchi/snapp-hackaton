import type { CSSProperties, ReactNode, Ref } from 'react';
import type L from 'leaflet';

export interface ILeafletMap {
  ref?: Ref<LeafletMapRef | null>;
  style?: CSSProperties;
  render?: ReactNode;
  className?: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface LeafletMapRef extends L.Map {
  setCenter: (coordinates: ICoordinates) => void;
}
