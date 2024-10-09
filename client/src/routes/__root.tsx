import UserPanelLayout from "@/components/user-panel/user-panel-layout";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			<UserPanelLayout children={<Outlet />} />
			<ReactQueryDevtools />
			<TanStackRouterDevtools />
		</>
	),
});
