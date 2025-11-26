import { MapPin } from "lucide-react";
import type { IMapPin } from "@/store/map.store";

interface LocationDisplayProps {
  activePin: IMapPin | null;
}

/**
 * Reusable location display component following Single Responsibility Principle
 */
export const LocationDisplay = ({ activePin }: LocationDisplayProps) => {
  return (
    <div className="rounded-lg border border-slate-600 bg-slate-700/30 p-3">
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <MapPin className="h-4 w-4" />
        {activePin ? (
          <span>
            موقعیت انتخاب شده: {activePin.lat.toFixed(6)},{" "}
            {activePin.lng.toFixed(6)}
          </span>
        ) : (
          <span className="text-red-400">
            لطفاً موقعیت را از نقشه انتخاب کنید *
          </span>
        )}
      </div>
    </div>
  );
};

