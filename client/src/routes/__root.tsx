import type { QueryClient } from "@tanstack/react-query";
import {
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import UserPanelLayout from "@/components/user-panel/user-panel-layout";

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: () => (
		<>
			<UserPanelLayout children={<Outlet />}/>
			<ReactQueryDevtools />
			<TanStackRouterDevtools />
		</>
	),
});
