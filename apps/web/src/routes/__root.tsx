import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="mx-auto min-h-screen max-w-3xl p-6">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  ),
});
