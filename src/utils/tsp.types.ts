import type { IMapPin } from "@/store/map.types";

export interface TSPPoint extends IMapPin {
  id: string;
  type: "driver" | "passenger_origin" | "passenger_destination" | "parcel_origin" | "parcel_destination";
}

export interface TSPRoute {
  points: TSPPoint[];
  totalDistance: number;
}

