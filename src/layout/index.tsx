import { NavLink, Outlet, useLocation } from "react-router-dom";
import clsx from "clsx";
import logo from "@/assets/images/logo.svg";
import hackathonLogo from "@/assets/images/hackathon-logo.webp";
import LeafletMap from "@/components/leaflet-map";
import { LeafletMapItems } from "@/components/leaflet-map/components";
import { isContentOnlyPage } from "./content-only-pages.constant";

const navItems = [
  { to: "/", label: "صفحه اصلی", end: true },
  { to: "/passengers", label: "مسافر‌ها" },
  { to: "/parcels", label: "بسته‌ها" },
  { to: "/driver", label: "راننده" },
  { to: "/settings", label: "تنظیمات" },
  { to: "/algorithm", label: "الگوریتم" },
  { to: "/pitch", label: "ارائه ایده" },
];

export function Layout() {
  const location = useLocation();
  const isContentOnly = isContentOnlyPage(location.pathname);

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
      <main className="-mt-28 pb-12 bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-2">
          {isContentOnly ? (
            /* Content-only pages: full width, page scroll, no box container */
            <div className="w-full">
              <Outlet />
            </div>
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

          <footer className="mt-12 border-t border-slate-700/40 pt-5 pb-6">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              {/* Logo */}
              <img
                src={hackathonLogo}
                alt="لوگوی هکاتون اسنپ"
                className="h-8 w-auto opacity-60 hover:opacity-80 transition-opacity"
              />

              {/* Divider */}
              <div className="hidden sm:block w-px h-6 bg-slate-700/50"></div>

              {/* Team Info */}
              <div className="flex items-center gap-2.5">
                <span className="text-xs text-slate-500">تیم شماره</span>
                <span className="text-base font-bold text-primary">۲۷</span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-sm font-semibold text-slate-300">
                  SnappShare
                </span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
