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
const Algorithm = lazy(() => import("../pages/algorithm"));

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
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "passengers",
        element: (
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Passengers />
          </Suspense>
        ),
      },
      {
        path: "parcels",
        element: (
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Parcels />
          </Suspense>
        ),
      },
      {
        path: "driver",
        element: (
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Driver />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "algorithm",
        element: (
          <Suspense fallback={<Spinner size="md" color="secondary" />}>
            <Algorithm />
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
