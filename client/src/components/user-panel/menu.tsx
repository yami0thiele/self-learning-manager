import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Book, Library } from "lucide-react";
import { cn } from "@/lib/utils";

export function Menu() {
  const location = useLocation();

  const menuList = [
    {
      groupLabel: '蔵書管理',
      menus: [
        {
          href: '/books',
          label: '蔵書一覧',
          icon: Library,
          active: location.pathname === '/books'
        },
        {
          href: '/books/create',
          label: '蔵書登録',
          icon: Book,
          active: location.pathname === '/books/create'
        }
      ]
    }
  ];

  return (
    <aside
      className={
        cn(
          "fixed top-0 left-0 z-20 h-screen bg-background w-72"
        )
      }
    >
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md">
        <nav className="h-full w-full">
          <ul className="flex flex-col items-start space-y-1 px-2">
            {menuList.map(({ groupLabel, menus }, index) => (
              <li className="w-full pt-5" key={index}>
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate"> { groupLabel } </p>
                {menus.map(({ href, label, icon: Icon, active }, index) => (
                  <div className="w-full" key={index}>
                    <Button variant={active ? 'secondary' : 'ghost'} className="w-full justify-start h-10 mb-1" asChild>
                      <Link to={href}>
                        <span className="mr-4"><Icon size={18} /></span>
                        <p className="max-w-[200px] truncate">
                          {label}
                        </p>
                      </Link>
                    </Button>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}
