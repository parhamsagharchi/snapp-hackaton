import clsx from "clsx";
import type { IPassenger, IDriver } from "@/store/map.store";
import { calculateDistance } from "@/utils/tsp";
import { useTranslation } from "@/i18n";

interface PassengerCardProps {
  passenger: IPassenger;
  driver: IDriver;
  isSelected: boolean;
  onSelect: (passenger: IPassenger) => void;
}

export function PassengerCard({
  passenger,
  driver,
  isSelected,
  onSelect,
}: PassengerCardProps) {
  const { t, tName } = useTranslation();
  const distance = calculateDistance(driver, passenger);

  return (
    <div
      onClick={() => onSelect(passenger)}
      className={clsx(
        "group cursor-pointer rounded-md border p-2.5 transition-all duration-200",
        isSelected
          ? "border-green-500 bg-green-500/15 shadow-md shadow-green-500/10"
          : "border-slate-700 bg-slate-800/50 hover:border-slate-600 hover:bg-slate-800/70"
      )}
    >
      {/* Header: Icon + Name + Selection Indicator */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {/* Avatar */}
          <div
            className={clsx(
              "flex items-center justify-center w-6 h-6 rounded-full text-xs transition-colors flex-shrink-0",
              isSelected
                ? "bg-green-500 text-white"
                : "bg-slate-700 text-slate-300 group-hover:bg-slate-600"
            )}
          >
            👤
          </div>

          {/* Name and Status */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-slate-100 truncate leading-tight">
              {tName(passenger.displayName)}
            </div>
          </div>
        </div>

        {/* Selection Checkmark */}
        {isSelected && (
          <div className="flex-shrink-0 ml-1">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-[10px] leading-none">✓</span>
            </div>
          </div>
        )}
      </div>

      {/* Details Section */}
      <div
        className={clsx(
          "space-y-1",
          !passenger.orderOptionsActive && "pt-1.5 border-t border-slate-700/50"
        )}
      >
        {/* Distance */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400 leading-tight">
            {t("home.passengerCard.distance")}
          </span>
          <span className="text-[10px] text-slate-200 font-medium leading-tight">
            {distance.toFixed(2)} km
          </span>
        </div>

        {/* Destination (if available) */}
        {passenger.destination && (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 leading-tight">
              {t("home.passengerCard.destination")}
            </span>
            <span className="text-[9px] text-slate-300 font-medium truncate max-w-[100px] leading-tight">
              {passenger.destination.lat.toFixed(3)},{" "}
              {passenger.destination.lng.toFixed(3)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
