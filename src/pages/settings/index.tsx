import { PageLayout } from "@/components/shared/layout/PageLayout";
import { useSettingsStore } from "@/store/settings.store";

function SettingPage() {
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );
  const originSelectionRadius = useSettingsStore(
    (state) => state.originSelectionRadius
  );
  const destinationSelectionRadius = useSettingsStore(
    (state) => state.destinationSelectionRadius
  );
  const setRouteOrderPreference = useSettingsStore(
    (state) => state.setRouteOrderPreference
  );
  const setOriginSelectionRadius = useSettingsStore(
    (state) => state.setOriginSelectionRadius
  );
  const setDestinationSelectionRadius = useSettingsStore(
    (state) => state.setDestinationSelectionRadius
  );

  return (
    <PageLayout title="تنظیمات">
      <div className="space-y-3">
        {/* Route Order Preference */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h3 className="mb-2 text-sm font-semibold text-slate-100">
            ترتیب مسیر
          </h3>
          <p className="mb-2 text-xs text-slate-300">
            انتخاب کنید که راننده ابتدا مسافر را سوار کند یا ابتدا بسته را
            بردارد
          </p>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-700/50 bg-slate-800/30 p-2 transition-all hover:bg-slate-800/50">
              <input
                type="radio"
                name="routeOrder"
                value="passenger_first"
                checked={routeOrderPreference === "passenger_first"}
                onChange={(e) =>
                  setRouteOrderPreference(
                    e.target.value as "passenger_first" | "package_first"
                  )
                }
                className="h-3.5 w-3.5 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-100">
                  ابتدا مسافر را سوار کن
                </div>
                <div className="text-xs text-slate-400">
                  راننده ابتدا مسافر را سوار می‌کند، سپس بسته را برمی‌دارد
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-700/50 bg-slate-800/30 p-2 transition-all hover:bg-slate-800/50">
              <input
                type="radio"
                name="routeOrder"
                value="package_first"
                checked={routeOrderPreference === "package_first"}
                onChange={(e) =>
                  setRouteOrderPreference(
                    e.target.value as "passenger_first" | "package_first"
                  )
                }
                className="h-3.5 w-3.5 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-slate-100">
                  ابتدا بسته را بردار
                </div>
                <div className="text-xs text-slate-400">
                  راننده ابتدا بسته را برمی‌دارد، سپس مسافر را سوار می‌کند
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Origin Selection Radius */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h3 className="mb-2 text-sm font-semibold text-slate-100">
            شعاع انتخاب مبدا (بین مبدا مسافر و مبدا بسته)
          </h3>
          <p className="mb-2 text-xs text-slate-300">
            تعیین کنید که مبدا بسته‌ها باید در چه شعاعی از مبدا مسافر باشند
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1000"
                max="2000"
                step="100"
                value={originSelectionRadius}
                onChange={(e) =>
                  setOriginSelectionRadius(Number(e.target.value))
                }
                className="flex-1 cursor-pointer accent-primary"
              />
              <div className="min-w-[70px] text-right text-xs font-medium text-slate-100">
                {(originSelectionRadius / 1000).toFixed(1)} کیلومتر
              </div>
            </div>
            <div className="text-xs text-slate-400">
              محدوده فعلی: {originSelectionRadius.toLocaleString()} متر (
              {(originSelectionRadius / 1000).toFixed(1)} کیلومتر)
            </div>
          </div>
        </div>

        {/* Destination Selection Radius */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3">
          <h3 className="mb-2 text-sm font-semibold text-slate-100">
            شعاع انتخاب مقصد (بین مقصد مسافر و مقصد بسته)
          </h3>
          <p className="mb-2 text-xs text-slate-300">
            تعیین کنید که مقصد بسته‌ها باید در چه شعاعی از مقصد مسافر باشند
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1000"
                max="2000"
                step="100"
                value={destinationSelectionRadius}
                onChange={(e) =>
                  setDestinationSelectionRadius(Number(e.target.value))
                }
                className="flex-1 cursor-pointer accent-primary"
              />
              <div className="min-w-[70px] text-right text-xs font-medium text-slate-100">
                {(destinationSelectionRadius / 1000).toFixed(1)} کیلومتر
              </div>
            </div>
            <div className="text-xs text-slate-400">
              محدوده فعلی: {destinationSelectionRadius.toLocaleString()} متر (
              {(destinationSelectionRadius / 1000).toFixed(1)} کیلومتر)
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SettingPage;
