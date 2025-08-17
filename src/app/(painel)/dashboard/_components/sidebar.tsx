"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function SidebarDashboard({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    {
      title: "Painel",
      items: [
        { href: "/dashboard", label: "Agendamentos", icon: <CalendarCheck2 /> },
        { href: "/dashboard/services", label: "Serviços", icon: <Folder /> },
      ],
    },
    {
      title: "Configurações",
      items: [
        { href: "/dashboard/profile", label: "Meu perfil", icon: <Settings /> },
        { href: "/dashboard/plans", label: "Planos", icon: <Banknote /> },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <aside
        className={clsx(
          "flex flex-col bg-white shadow-xl transition-all duration-300 p-4 h-full",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        {/* Logo */}
        <div className="mb-6 mt-4 flex justify-center">
          {!isCollapsed && (
            <Image
              src={"/logo-odonto.png"}
              alt="Logo OdontoPRO"
              width={200}
              height={200}
              className="rounded-lg transition-transform duration-300 hover:scale-105"
              priority
            />
          )}
        </div>

        {/* Collapse Button */}
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-blue-50 hover:bg-blue-100 text-blue-700 self-end mb-4 rounded-full p-2 transition"
        >
          {!isCollapsed ? (
            <ChevronLeft className="w-6 h-6" />
          ) : (
            <ChevronRight className="w-6 h-6" />
          )}
        </Button>

        {/* Links */}
        <nav className="flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.title}>
              {!isCollapsed && (
                <span className="text-xs text-gray-400 font-semibold uppercase mb-2">
                  {section.title}
                </span>
              )}
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <SidebarLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    pathname={pathname}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile / Main content */}
      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button
                  onClick={() => setIsCollapsed(false)}
                  variant="outline"
                  size="icon"
                >
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <h1 className="text-base md:text-lg font-semibold">
                Menu OdontoPRO
              </h1>
            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black p-4">
              <SheetTitle>OdontoPRO</SheetTitle>
              <SheetDescription>Menu administrativo</SheetDescription>

              <nav className="grid gap-2 text-base pt-5">
                {sections.flatMap((section) =>
                  section.items.map((item) => (
                    <SidebarLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      icon={item.icon}
                      pathname={pathname}
                      isCollapsed={false}
                    />
                  ))
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 py-4 px-2 md:p-6">{children}</main>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  pathname: string;
  isCollapsed: boolean;
}

function SidebarLink({
  href,
  icon,
  label,
  pathname,
  isCollapsed,
}: SidebarLinkProps) {
  const isActive = pathname === href;

  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer relative overflow-hidden",
          {
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md":
              isActive,
            "text-gray-700 hover:bg-blue-50 hover:text-blue-700": !isActive,
          }
        )}
      >
        <span
          className={clsx(
            "w-6 h-6 transition-transform duration-300",
            "group-hover:rotate-12"
          )}
        >
          {icon}
        </span>
        {!isCollapsed && <span className="font-medium">{label}</span>}
      </div>
    </Link>
  );
}
