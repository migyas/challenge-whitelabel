import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div>
      Hello World!
      <Outlet />
    </div>
  );
}
