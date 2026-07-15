import { Polyline, Marker, Popup } from "react-leaflet";
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useMapStore } from "@/store/map.store";
import { useSettingsStore } from "@/store/settings.store";
import { useMapZoomVisibility } from "@/hooks/useMapZoomVisibility";
import L from "leaflet";
import toast from "react-hot-toast";
import { t as translateStatic, useTranslation } from "@/i18n";

/** Stable semantic identifiers for the points along a route. */
type RoutePointKey =
  | "driver"
  | "passenger"
  | "parcel"
  | "passengerDest"
  | "parcelDest";

/**
 * Calculate points for a smooth arc between two points using Bezier curve
 * Creates a beautiful curved line that looks 3D
 */
function calculateArcPoints(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  height: number = 0.015 // Arc height in degrees (slightly increased for better visibility)
): [number, number][] {
  const points: [number, number][] = [];
  const steps = 60; // Increased points for smoother curve

  // Calculate distance
  const dx = end.lng - start.lng;
  const dy = end.lat - start.lat;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate perpendicular direction for arc (normalized)
  const perpX = -dy / distance;
  const perpY = dx / distance;

  // Calculate control points for Bezier curve
  // Control point is at the midpoint, elevated perpendicular to the line
  const midLat = (start.lat + end.lat) / 2;
  const midLng = (start.lng + end.lng) / 2;

  // Control point with arc height
  const controlLat = midLat + perpY * height;
  const controlLng = midLng + perpX * height;

  // Generate smooth Bezier curve points
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    // Cubic Bezier curve formula: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    // For quadratic Bezier: B(t) = (1-t)²P₀ + 2(1-t)tP₁ + t²P₂
    // Using quadratic Bezier for smoother arc
    const mt = 1 - t;
    const mt2 = mt * mt;
    const t2 = t * t;
    const twoMtT = 2 * mt * t;

    // Calculate point on Bezier curve
    const lat = mt2 * start.lat + twoMtT * controlLat + t2 * end.lat;
    const lng = mt2 * start.lng + twoMtT * controlLng + t2 * end.lng;

    points.push([lat, lng]);
  }

  return points;
}

/**
 * Create a custom icon for route numbers
 */
function createRouteNumberIcon(number: number, color: string) {
  return L.divIcon({
    className: "route-number-icon",
    html: `
      <div style="
        background-color: ${color};
        color: white;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        font-family: 'Vazirmatn', 'Vazir Matn', sans-serif;
      ">${number}</div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

/**
 * Create animated flow marker icon
 */
function createFlowMarkerIcon(color: string) {
  return L.divIcon({
    className: "flow-marker-icon",
    html: `
      <div style="
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        animation: pulse 1.5s ease-in-out infinite;
      "></div>
      <style>
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }
      </style>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

interface RouteArcProps {
  start: { lat: number; lng: number };
  end: { lat: number; lng: number };
  number: number;
  color: string;
  isActive: boolean;
  onComplete: () => void;
  startKey: RoutePointKey;
  endKey: RoutePointKey;
}

function RouteArc({
  start,
  end,
  number,
  color,
  isActive,
  onComplete,
  startKey,
  endKey,
}: RouteArcProps) {
  const { t } = useTranslation();
  const arcPoints = calculateArcPoints(start, end);
  const midPoint = arcPoints[Math.floor(arcPoints.length / 2)];
  const [currentPosition, setCurrentPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(!isActive); // Show immediately if not active
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setIsVisible(true);
      setCurrentPosition(0);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Show toast when arc starts animating
    if (isActive && currentPosition === 0) {
      const movementMessage = translateStatic(`route.movement.${endKey}`);
      toast.success(movementMessage, {
        duration: 2000,
        icon: "🚗",
      });
    }

    setIsVisible(true);
    startTimeRef.current = Date.now();
    const duration = 10000; // 10 seconds per arc - slower for better message readability

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      setCurrentPosition(progress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - show arrival message
        const arrivalMessage = translateStatic(`route.arrival.${endKey}`);
        toast.success(arrivalMessage, {
          duration: 2000,
          icon: "✅",
        });
        onComplete();
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, number, startKey, endKey, onComplete]);

  // Calculate visible portion of arc
  const visiblePoints = isVisible
    ? arcPoints.slice(0, Math.floor(arcPoints.length * currentPosition) + 1)
    : [];

  // Current flow marker position
  const flowMarkerIndex = Math.floor(arcPoints.length * currentPosition);
  const flowMarkerPosition =
    flowMarkerIndex < arcPoints.length
      ? arcPoints[flowMarkerIndex]
      : arcPoints[arcPoints.length - 1];

  return (
    <>
      {/* Full arc (always visible, but with opacity based on active state) */}
      <Polyline
        positions={arcPoints}
        pathOptions={{
          color,
          weight: 4,
          opacity: isActive ? 0.3 : 0.8, // Dimmed when active, full opacity when not
          lineCap: "round",
          lineJoin: "round",
        }}
        smoothFactor={1.0}
      />
      {/* Animated flow portion */}
      {isActive && visiblePoints.length > 1 && (
        <Polyline
          positions={visiblePoints}
          pathOptions={{
            color,
            weight: 5,
            opacity: 1,
            lineCap: "round",
            lineJoin: "round",
          }}
          smoothFactor={1.0}
        />
      )}
      {/* Route number marker */}
      <Marker position={midPoint} icon={createRouteNumberIcon(number, color)}>
        <Popup>
          <div className="text-center">
            <strong>{t("route.step", { number })}</strong>
            <br />
            {t(`route.point.${startKey}`)} → {t(`route.point.${endKey}`)}
          </div>
        </Popup>
      </Marker>
      {/* Animated flow marker */}
      {isActive && currentPosition > 0 && (
        <Marker
          position={flowMarkerPosition}
          icon={createFlowMarkerIcon(color)}
          interactive={false}
        />
      )}
    </>
  );
}

export const RoutePolyline = () => {
  const location = useLocation();
  const driver = useMapStore((state) => state.driver);
  const selectedPassenger = useMapStore((state) => state.selectedPassenger);
  const selectedParcel = useMapStore((state) => state.selectedParcel);
  const simulationActive = useMapStore((state) => state.simulationActive);
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );

  const [activeArcIndex, setActiveArcIndex] = useState<number | null>(null);

  // Only show route polylines on home page
  const currentPath = location.pathname;
  const isHomePage = currentPath === "/";

  // Check zoom level for route visibility
  const { shouldShowRoute } = useMapZoomVisibility();

  // Reset active arc when simulation stops
  useEffect(() => {
    if (!simulationActive) {
      setActiveArcIndex(null);
    } else if (activeArcIndex === null && isHomePage) {
      // Start animation from first arc only on home page
      setActiveArcIndex(0);
    }
  }, [simulationActive, activeArcIndex, isHomePage]);

  // Don't show route polylines on other pages or if zoom is too low
  // Parcel is optional - route can be shown without parcel
  if (!isHomePage || !selectedPassenger || !shouldShowRoute) {
    return null;
  }

  // Get destinations
  const passengerDest = selectedPassenger.destination || {
    lat: selectedPassenger.lat + 0.05,
    lng: selectedPassenger.lng + 0.05,
  };

  const arcs: Array<{
    start: { lat: number; lng: number };
    end: { lat: number; lng: number };
    number: number;
    color: string;
    startKey: RoutePointKey;
    endKey: RoutePointKey;
  }> = [];

  // If no parcel is selected, show simple route: Driver -> Passenger -> Passenger Destination
  if (!selectedParcel) {
    // 1: Driver -> Passenger
    arcs.push({
      start: driver,
      end: selectedPassenger,
      number: 1,
      color: "#3B82F6", // Blue
      startKey: "driver",
      endKey: "passenger",
    });

    // 2: Passenger -> Passenger Destination
    arcs.push({
      start: selectedPassenger,
      end: passengerDest,
      number: 2,
      color: "#10B981", // Green
      startKey: "passenger",
      endKey: "passengerDest",
    });
  } else {
    // Parcel is selected - show full route
    const parcelDest = selectedParcel.destination || {
      lat: selectedParcel.lat + 0.05,
      lng: selectedParcel.lng + 0.05,
    };

    if (routeOrderPreference === "passenger_first") {
      // 1: Driver -> Passenger
      arcs.push({
        start: driver,
        end: selectedPassenger,
        number: 1,
        color: "#3B82F6", // Blue
        startKey: "driver",
        endKey: "passenger",
      });

      // 2: Passenger -> Parcel
      arcs.push({
        start: selectedPassenger,
        end: selectedParcel,
        number: 2,
        color: "#10B981", // Green
        startKey: "passenger",
        endKey: "parcel",
      });

      // 3: Parcel -> Passenger Destination
      arcs.push({
        start: selectedParcel,
        end: passengerDest,
        number: 3,
        color: "#F59E0B", // Orange
        startKey: "parcel",
        endKey: "passengerDest",
      });

      // 4: Passenger Destination -> Parcel Destination
      arcs.push({
        start: passengerDest,
        end: parcelDest,
        number: 4,
        color: "#EF4444", // Red
        startKey: "passengerDest",
        endKey: "parcelDest",
      });
    } else {
      // package_first
      // 1: Driver -> Parcel
      arcs.push({
        start: driver,
        end: selectedParcel,
        number: 1,
        color: "#3B82F6", // Blue
        startKey: "driver",
        endKey: "parcel",
      });

      // 2: Parcel -> Passenger
      arcs.push({
        start: selectedParcel,
        end: selectedPassenger,
        number: 2,
        color: "#10B981", // Green
        startKey: "parcel",
        endKey: "passenger",
      });

      // 3: Passenger -> Passenger Destination
      arcs.push({
        start: selectedPassenger,
        end: passengerDest,
        number: 3,
        color: "#F59E0B", // Orange
        startKey: "passenger",
        endKey: "passengerDest",
      });

      // 4: Passenger Destination -> Parcel Destination
      arcs.push({
        start: passengerDest,
        end: parcelDest,
        number: 4,
        color: "#EF4444", // Red
        startKey: "passengerDest",
        endKey: "parcelDest",
      });
    }
  }

  const handleArcComplete = () => {
    if (activeArcIndex !== null && activeArcIndex < arcs.length - 1) {
      // Move to next arc
      setActiveArcIndex(activeArcIndex + 1);
    } else {
      // All arcs completed
      toast.success(translateStatic("route.complete"), { duration: 3000 });
    }
  };

  return (
    <>
      {arcs.map((arc, index) => (
        <RouteArc
          key={index}
          {...arc}
          isActive={simulationActive && activeArcIndex === index}
          onComplete={handleArcComplete}
        />
      ))}
    </>
  );
};
