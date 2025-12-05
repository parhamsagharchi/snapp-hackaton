import { Spinner } from "@/components/spinner";
import { Layout } from "@/layout";

import { Suspense, lazy } from "react";
import { useRoutes } from "react-router-dom";

// بارگذاری تنبل صفحات
const Home = lazy(() => import("../pages/home"));
const Settings = lazy(() => import("../pages/settings"));
const Passengers = lazy(() => import("../pages/passengers"));
const Parcels = lazy(() => import("../pages/parcels"));
const Driver = lazy(() => import("../pages/driver"));
const Pitch = lazy(() => import("../pages/pitch"));

/**
 * پیکربندی مسیرها
 */
const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Home />
          </Suspense>
        ),
      },
      {
        path: "passengers",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Passengers />
          </Suspense>
        ),
      },
      {
        path: "parcels",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Parcels />
          </Suspense>
        ),
      },
      {
        path: "driver",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Driver />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "pitch",
        element: (
          <Suspense
            fallback={<Spinner size="lg" color="secondary" fullScreen />}
          >
            <Pitch />
          </Suspense>
        ),
      },
    ],
  },
];

function Router() {
  return useRoutes(routes);
}

export default Router;
