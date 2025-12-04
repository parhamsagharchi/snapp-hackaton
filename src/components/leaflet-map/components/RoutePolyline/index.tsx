import { Polyline, Popup } from "react-leaflet";
import { useMapStore } from "@/store/map.store";
import { calculateRouteDistance } from "@/utils/tsp";

export const RoutePolyline = () => {
  const optimizedRoute = useMapStore((state) => state.optimizedRoute);

  if (!optimizedRoute || optimizedRoute.length < 2) {
    return null;
  }

  const totalDistance = calculateRouteDistance(optimizedRoute);

  return (
    <Polyline
      positions={optimizedRoute.map((point) => [point.lat, point.lng])}
      pathOptions={{
        color: "#FF6B6B",
        weight: 4,
        opacity: 0.8,
        dashArray: "10, 5",
      }}
    >
      <Popup>
        <div className="text-center">
          <strong>مسیر بهینه شده (TSP)</strong>
          <br />
          فاصله کل: {totalDistance.toFixed(2)} کیلومتر
          <br />
          تعداد نقاط: {optimizedRoute.length}
        </div>
      </Popup>
    </Polyline>
  );
};

