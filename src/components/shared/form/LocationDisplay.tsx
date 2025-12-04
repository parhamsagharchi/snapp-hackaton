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
    <div className="rounded-md border border-slate-600 bg-slate-700/30 p-2">
      <div className="flex items-center gap-1.5 text-xs text-slate-300">
        <MapPin className="h-3.5 w-3.5" />
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

