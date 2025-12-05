import type { IDriver, IPassenger } from "@/store/map.store";
import { areCoordinatesEqual } from "@/utils/coordinates";
import { PassengerCard } from "./PassengerCard";

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
      <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-slate-100">
          انتخاب مسافر
        </h3>
        <p className="text-xs text-slate-400">هیچ مسافری موجود نیست</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-4">
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-slate-100 mb-1">
          انتخاب مسافر
        </h3>
        <p className="text-xs text-slate-400">
          {passengers.length} مسافر موجود است
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {passengers.map((passenger, index) => {
          const isSelected = Boolean(
            selectedPassenger &&
              areCoordinatesEqual(selectedPassenger, passenger)
          );

          return (
            <PassengerCard
              key={index}
              passenger={passenger}
              driver={driver}
              isSelected={isSelected}
              onSelect={onSelectPassenger}
            />
          );
        })}
      </div>
    </div>
  );
}
