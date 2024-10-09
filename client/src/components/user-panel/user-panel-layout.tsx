import type React from "react";
import { Menu } from "./menu";

/**
 * CSS については下記レイアウトからサイドバー部分を除去しただけのもの。
 * https://github.com/salimi-my/shadcn-ui-sidebar
 */
export default function UserPanelLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Menu />
			<main className="bg-zinc-50 ml-72 h-screen">
				<div className="container pt-8 pb-8 px-4">{children}</div>
			</main>
		</>
	);
}
