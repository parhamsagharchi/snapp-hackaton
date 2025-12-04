import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import logo from "@/assets/images/logo.svg";
import LeafletMap from "@/components/leaflet-map";
import { LeafletMapItems } from "@/components/leaflet-map/components";

const navItems = [
  { to: "/", label: "صفحه اصلی", end: true },
  { to: "/passengers", label: "مسافر‌ها" },
  { to: "/parcels", label: "بسته‌ها" },
  { to: "/driver", label: "راننده" },
  { to: "/settings", label: "تنظیمات" },
  { to: "/algorithm", label: "الگوریتم" },
];

export function Layout() {
  const location = useLocation();
  const isAlgorithmPage = location.pathname === "/algorithm";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      {/* Top header */}
      <header className="bg-primary pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Row 1: navigation + logo */}
          <div className="flex items-center justify-between py-4">
            <nav className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    clsx(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300",
                      isActive
                        ? "bg-white text-primary shadow-lg shadow-white/20"
                        : "border border-white/30 text-white/90 hover:border-white/50 hover:text-white hover:bg-white/5"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <img src={logo} alt="اسنپ" className="h-9" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content with overlap */}
      <main className="-mt-28 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {isAlgorithmPage ? (
            /* Full width for algorithm page */
            <section className="rounded-2xl border border-slate-700/70 bg-slate-800/80 p-3 shadow-xl shadow-black/40 overflow-y-auto max-h-[calc(100vh-200px)]">
              <Outlet />
            </section>
          ) : (
            /* Two sections: Page Content and Map */
            <div className="grid gap-6 lg:grid-cols-[minmax(0,2.25fr)_minmax(0,1.75fr)] w-full">
              {/* Page Content Section */}
              <section className="rounded-2xl border border-slate-700/70 bg-slate-800/80 p-6 shadow-xl shadow-black/40 overflow-y-auto max-h-[calc(100vh-200px)]">
                <Outlet />
              </section>

              {/* Map Section */}
              <section className="rounded-2xl border border-slate-700/10 bg-slate-800/10  shadow-xl shadow-black/40 overflow-hidden sticky top-4">
                <div className="h-full min-h-[600px] w-full">
                  <LeafletMap
                    className="h-full w-full"
                    render={
                      <>
                        <LeafletMapItems.MapClickHandler />
                        <LeafletMapItems.ActivePinMarker />
                        <LeafletMapItems.Markers />
                        <LeafletMapItems.Polygons />
                        <LeafletMapItems.SelectionCircle />
                        <LeafletMapItems.RoutePolyline />
                      </>
                    }
                  />
                </div>
              </section>
            </div>
          )}

          <footer className="mt-10 border-t border-slate-800/80 pt-4 text-xs text-neutral">
            © ۱۴۰۴ هکاتون اسنپ. تمامی حقوق محفوظ است.
          </footer>
        </div>
      </main>
    </div>
  );
}
