import { PageLayout } from "@/components/shared/layout/PageLayout";
import { useSettingsStore } from "@/store/settings.store";

function SettingPage() {
  const routeOrderPreference = useSettingsStore(
    (state) => state.routeOrderPreference
  );
  const packageSelectionRadius = useSettingsStore(
    (state) => state.packageSelectionRadius
  );
  const setRouteOrderPreference = useSettingsStore(
    (state) => state.setRouteOrderPreference
  );
  const setPackageSelectionRadius = useSettingsStore(
    (state) => state.setPackageSelectionRadius
  );

  return (
    <PageLayout title="تنظیمات">
      <div className="space-y-6">
        {/* Route Order Preference */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">
            ترتیب مسیر
          </h3>
          <p className="mb-4 text-sm text-slate-300">
            انتخاب کنید که راننده ابتدا مسافر را سوار کند یا ابتدا بسته را
            بردارد
          </p>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 transition-all hover:bg-slate-800/50">
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
                className="h-4 w-4 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-slate-100">
                  ابتدا مسافر را سوار کن
                </div>
                <div className="text-xs text-slate-400">
                  راننده ابتدا مسافر را سوار می‌کند، سپس بسته را برمی‌دارد
                </div>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/30 p-4 transition-all hover:bg-slate-800/50">
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
                className="h-4 w-4 cursor-pointer accent-primary"
              />
              <div className="flex-1">
                <div className="font-medium text-slate-100">
                  ابتدا بسته را بردار
                </div>
                <div className="text-xs text-slate-400">
                  راننده ابتدا بسته را برمی‌دارد، سپس مسافر را سوار می‌کند
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Package Selection Radius */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">
            شعاع انتخاب بسته
          </h3>
          <p className="mb-4 text-sm text-slate-300">
            تعیین کنید که بسته‌ها در چه شعاعی از مسافر قابل انتخاب باشند
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1000"
                max="2000"
                step="100"
                value={packageSelectionRadius}
                onChange={(e) =>
                  setPackageSelectionRadius(Number(e.target.value))
                }
                className="flex-1 cursor-pointer accent-primary"
              />
              <div className="min-w-[80px] text-right text-sm font-medium text-slate-100">
                {(packageSelectionRadius / 1000).toFixed(1)} کیلومتر
              </div>
            </div>
            <div className="text-xs text-slate-400">
              محدوده فعلی: {packageSelectionRadius.toLocaleString()} متر (
              {(packageSelectionRadius / 1000).toFixed(1)} کیلومتر)
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SettingPage;
