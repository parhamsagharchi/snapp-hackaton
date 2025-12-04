import type { IParcel } from "@/store/map.types";

export interface ParcelOffer {
  parcel: IParcel;
  score: number;
  totalDistance: number;
  detourDistance: number;
  estimatedTime: number; // in minutes
}

