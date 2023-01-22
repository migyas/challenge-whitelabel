import {lazy, Suspense} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import SuspenseLoader from '@/components/SuspenseLoader';
import {DefaultLayout} from '@/layouts/DefaultLayout';
import useUser from './hooks/useUser';

const routesPublic = [
  {
    path: '/signin',
    element: lazy(() => import('@/pages/SignIn')),
  },
  {
    path: '/signup',
    element: lazy(() => import('@/pages/SignUp')),
  },
];

const routesPrivate = [
  {
    path: '/operation',
    element: lazy(() => import('@/pages/Operation')),
    isIndex: false,
  },
  {
    path: '/my-store',
    element: lazy(() => import('@/pages/MyStore')),
    isIndex: false,
  },
  {
    path: '/',
    element: lazy(() => import('@/pages/Users')),
    isIndex: true,
  },
  {
    path: '/settings',
    element: lazy(() => import('@/pages/Settings')),
    isIndex: false,
  },
];

export function Router() {
  const {userLogged} = useUser();

  return (
    <Routes>
      {userLogged ? (
        <Route path="/" element={<DefaultLayout />}>
          {routesPrivate.map((route, index) => {
            if (route.isIndex) {
              return (
                <Route
                  key={index}
                  index
                  element={
                    <Suspense fallback={<SuspenseLoader />}>
                      <route.element />
                    </Suspense>
                  }
                />
              );
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<SuspenseLoader />}>
                    <route.element getUserLoggedPermission={userLogged.nivel} />
                  </Suspense>
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
            !!userLogged ? (
              <Navigate to="/users" />
            ) : (
              <Suspense fallback={<SuspenseLoader />}>
                <route.element />
              </Suspense>
            )
          }
        />
      ))}
      {!userLogged ? (
        <Route path="*" element={<Navigate to="/signin" />} />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}
