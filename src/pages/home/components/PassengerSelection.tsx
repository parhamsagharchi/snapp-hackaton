import type { IDriver, IPassenger } from "@/store/map.store";
import { calculateDistance } from "@/utils/tsp";
import { areCoordinatesEqual } from "@/utils/coordinates";

interface PassengerSelectionProps {
  driver: IDriver;
  passengers: IPassenger[];
  selectedPassenger: IPassenger | null;
  onSelectPassenger: (passenger: IPassenger) => void;
}

export function PassengerSelection({
  driver,
  passengers,
  selectedPassenger,
  onSelectPassenger,
}: PassengerSelectionProps) {
  if (passengers.length === 0) {
    return (
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
        <h3 className="mb-2 text-sm font-semibold text-slate-100">
          انتخاب مسافر
        </h3>
        <p className="text-xs text-slate-400">
          هیچ مسافر مناسبی موجود نیست (مسافران با گزینه‌های سفارش فعال نمایش
          داده نمی‌شوند)
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
      <h3 className="mb-2 text-sm font-semibold text-slate-100">
        انتخاب مسافر
      </h3>
      <div className="grid gap-1.5 md:grid-cols-2 lg:grid-cols-3">
        {passengers.map((passenger, index) => {
          const isSelected =
            selectedPassenger && areCoordinatesEqual(selectedPassenger, passenger);
          const distance = calculateDistance(driver, passenger);

          return (
            <div
              key={index}
              onClick={() => onSelectPassenger(passenger)}
              className={`cursor-pointer rounded-md border p-2 transition-all ${
                isSelected
                  ? "border-green-500 bg-green-500/20"
                  : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">👤</span>
                  <div>
                    <div className="text-xs font-medium text-slate-100">
                      {passenger.displayName}
                    </div>
                    <div className="text-xs text-slate-400">
                      فاصله: {distance.toFixed(2)} کیلومتر
                    </div>
                  </div>
                </div>
                {isSelected && (
                  <span className="text-xs text-green-400">✓</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
