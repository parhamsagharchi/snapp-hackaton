import type { IPassenger, IParcel } from "@/store/map.store";
import type { IMapPin } from "@/store/map.types";
import { calculateDistance } from "@/utils/tsp";

interface SimulationControlsProps {
  simulationActive: boolean;
  selectedPassenger: IPassenger | null;
  selectedParcel: IParcel | null;
  optimizedRoute: IMapPin[] | null;
  onStartSimulation: () => void;
  onStopSimulation: () => void;
  onClearSelection: () => void;
}

export function SimulationControls({
  simulationActive,
  selectedPassenger,
  selectedParcel,
  optimizedRoute,
  onStartSimulation,
  onStopSimulation,
  onClearSelection,
}: SimulationControlsProps) {
  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">
            کنترل شبیه‌سازی
          </h3>
          <p className="mt-0.5 text-xs text-slate-400">
            ابتدا مسافر را انتخاب کنید (انتخاب بسته اختیاری است)
          </p>
        </div>
        <div className="flex gap-1.5">
          {simulationActive ? (
            <button
              onClick={onStopSimulation}
              className="rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-red-700"
            >
              توقف شبیه‌سازی
            </button>
          ) : (
            <button
              onClick={onStartSimulation}
              disabled={!selectedPassenger || !optimizedRoute || optimizedRoute.length === 0}
              className="rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              شروع شبیه‌سازی
            </button>
          )}
          {(selectedPassenger || selectedParcel) && (
            <button
              onClick={onClearSelection}
              className="rounded-md border border-slate-600 bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-600"
            >
              پاک کردن انتخاب‌ها
            </button>
          )}
        </div>
      </div>

      {/* Selected Info */}
      {(selectedPassenger || selectedParcel) && (
        <div className="mt-2 grid gap-2 md:grid-cols-2">
          {selectedPassenger && (
            <div className="rounded-md border border-green-500/30 bg-green-500/10 p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">👤</span>
                <div>
                  <div className="text-xs font-semibold text-green-400">
                    مسافر انتخاب شده
                  </div>
                  <div className="text-xs text-slate-300">
                    {selectedPassenger.displayName}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedParcel && (
            <div className="rounded-md border border-orange-500/30 bg-orange-500/10 p-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">📦</span>
                <div>
                  <div className="text-xs font-semibold text-orange-400">
                    بسته انتخاب شده
                  </div>
                  <div className="text-xs text-slate-300">
                    {selectedParcel.displayName}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Route Info */}
      {optimizedRoute && optimizedRoute.length > 0 && (
        <div className="mt-2 rounded-md border border-blue-500/30 bg-blue-500/10 p-2">
          <div className="text-xs font-semibold text-blue-400">
            مسیر بهینه‌سازی شده
          </div>
          <div className="mt-1 text-xs text-slate-300">
            تعداد نقاط: {optimizedRoute.length} | فاصله کل:{" "}
            {optimizedRoute
              .reduce((sum, point, i, arr) => {
                if (i === 0) return 0;
                return sum + calculateDistance(arr[i - 1], point);
              }, 0)
              .toFixed(2)}{" "}
            کیلومتر
          </div>
        </div>
      )}
    </div>
  );
}
