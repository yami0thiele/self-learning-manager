import React from "react";
import { Menu } from "./menu";
import { cn } from "@/lib/utils";

/**
 * CSS については下記レイアウトからサイドバー部分を除去しただけのもの。
 * https://github.com/salimi-my/shadcn-ui-sidebar
 */
export default function UserPanelLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Menu />
      <main className={
        cn(
          'ml-72',
        )
      }>
        {children}
      </main>
    </>
  )
}
