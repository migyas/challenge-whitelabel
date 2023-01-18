import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));

// const routesDashboard = [
//   {
//     path: "/usuarios",
//     element: <Dashboard />,
//     isIndex: true,
//     isPrivate: true,
//   },
// ];

export function Router() {
  return (
    <Routes>
      <Route element={<Navigate to="/signin" />} index />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/dashboard" element={<DefaultLayout />}>
        <Route index element={<Dashboard />} />
        {/* <Route path="/" element={<SignIn />} /> */}
        {/* <Route path="/history" element={<History />} /> */}
      </Route>
    </Routes>
  );
}
