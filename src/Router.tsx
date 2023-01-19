import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SuspenseLoader } from "./components/SuspenseLoader";
import { getToken } from "./utils/authUtils";
import useAuth from "./hooks/useAuth";
import { DefaultLayout } from "./layouts/DefaultLayout";

const routesPublic = [
  {
    path: "/signin",
    element: lazy(() => import("./pages/SignIn")),
  },
  {
    path: "/signup",
    element: lazy(() => import("./pages/SignUp")),
  },
];

const routesPrivate = [
  {
    path: "/",
    element: lazy(() => import("./pages/Dashboard")),
    isIndex: true,
  },
  {
    path: "/my-store",
    element: lazy(() => import("./pages/MyStore")),
    isIndex: false,
  },
  {
    path: "/users",
    element: lazy(() => import("./pages/Users")),
    isIndex: false,
  },
  {
    path: "/settings",
    element: lazy(() => import("./pages/Settings")),
    isIndex: false,
  },
];

export function Router() {
  const isAuth = !!getToken();

  return (
    <Routes>
      {isAuth ? (
        <Route path="/" element={<DefaultLayout />}>
          {routesPrivate.map((route, index) => {
            if (route.isIndex) {
              return (
                <Route
                  key={index}
                  index
                  element={
                    <SuspenseLoader>
                      <route.element />
                    </SuspenseLoader>
                  }
                />
              );
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <SuspenseLoader>
                    <route.element />
                  </SuspenseLoader>
                }
              />
            );
          })}
        </Route>
      ) : (
        <Route element={<Navigate to="/signin" />} index />
      )}
      {routesPublic.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            isAuth ? (
              <Navigate to="/" />
            ) : (
              <SuspenseLoader>
                <route.element />
              </SuspenseLoader>
            )
          }
        />
      ))}
      {!isAuth && <Route path="*" element={<Navigate to="/signin" />} />}
    </Routes>
  );
}
