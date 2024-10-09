import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/book/")({
	component: () => <div>Hello /book/!</div>,
});
