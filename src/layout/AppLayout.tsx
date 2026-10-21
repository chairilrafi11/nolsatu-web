import {
  IconBook2,
  IconFileCheck,
  IconHome,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout,
  IconMoon,
  IconShieldCheck,
  IconSun,
  IconUsers,
  IconWriting,
} from "@tabler/icons-react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { useAuth } from "@/features/auth/context/AuthProvider";
import { STORAGE_KEYS } from "@/lib/storage/keys";
import { useTheme } from "@/lib/theme/theme";
import { cn } from "@/shared/lib/cn";
import { Avatar } from "@/shared/ui/Avatar";
import { Badge } from "@/shared/ui/Badge";
import { LogoMark } from "@/shared/ui/LogoMark";

type Icon = typeof IconHome;

interface NavEntry {
  label: string;
  to: string;
  icon: Icon;
  exact?: boolean;
  adminOnly?: boolean;
}

const NAV: NavEntry[] = [
  { label: "Dashboard", to: "/", icon: IconHome, exact: true },
  { label: "Track", to: "/tracks", icon: IconBook2 },
  { label: "Submission", to: "/submissions", icon: IconFileCheck },
  { label: "Review", to: "/admin/review", icon: IconShieldCheck, adminOnly: true },
  { label: "Konten", to: "/admin/content", icon: IconWriting, adminOnly: true },
  { label: "Users", to: "/admin/users", icon: IconUsers, adminOnly: true },
];

export function AppLayout() {
  const { user, loading, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [collapsed, setCollapsed] = React.useState(
    () => localStorage.getItem(STORAGE_KEYS.sidebar) === "1",
  );
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.sidebar, collapsed ? "1" : "0");
  }, [collapsed]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span className="size-3 animate-spin rounded-full border-2 border-surface-line-strong border-t-primary" />
          Memuat…
        </div>
      </div>
    );
  }

  const items = NAV.filter((entry) => !entry.adminOnly || user.role === "admin");

  return (
    <div className="flex min-h-[100dvh] bg-surface">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-surface-line bg-surface-raised transition-transform lg:sticky lg:top-0 lg:h-[100dvh] lg:translate-x-0 lg:transition-[width]",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[68px]" : "lg:w-60",
          "w-60",
        )}
      >
        <div className="flex h-14 items-center gap-2.5 border-b border-surface-line px-4">
          <Link to="/" className="flex min-w-0 items-center gap-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-on-primary">
              <LogoMark className="size-4" />
            </span>
            {!collapsed && (
              <span className="truncate text-sm font-extrabold tracking-tight">NolSatu</span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="ml-auto cursor-pointer rounded-md p-1.5 text-on-surface-variant hover:bg-surface-sunken lg:hidden"
            aria-label="Tutup menu"
          >
            <IconLayoutSidebarLeftCollapse size={17} />
          </button>
        </div>

        <nav className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto p-2">
          {items.map((entry) => {
            const active = entry.exact ? path === entry.to : path.startsWith(entry.to);
            return (
              <Link
                key={entry.to}
                to={entry.to}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-xs font-semibold transition-colors",
                  active
                    ? "bg-primary-soft text-on-primary-soft"
                    : "text-on-surface-variant hover:bg-surface-sunken hover:text-on-surface",
                  collapsed && "lg:justify-center lg:px-0",
                )}
                title={collapsed ? entry.label : undefined}
              >
                <entry.icon size={16} className="shrink-0" />
                {!collapsed && <span className="truncate">{entry.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-surface-line p-2">
          <div
            className={cn(
              "flex items-center gap-2 rounded-[10px] bg-surface-sunken/70 p-2",
              collapsed && "lg:justify-center",
            )}
          >
            <Avatar name={user.displayName} size={26} />
            {!collapsed && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-bold">{user.displayName}</span>
                <span className="truncate text-[10px] text-on-surface-faint">
                  {user.role === "admin" ? "Admin" : "Learner"}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
              void navigate({ to: "/signin" });
            }}
            className={cn(
              "mt-1 flex w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-xs font-semibold text-on-surface-variant transition-colors hover:bg-danger-soft hover:text-danger-fg",
              collapsed && "lg:justify-center lg:px-0",
            )}
          >
            <IconLogout size={16} className="shrink-0" />
            {!collapsed && "Keluar"}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 cursor-pointer bg-on-surface/35 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-surface-line bg-surface/90 px-3 backdrop-blur md:px-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="cursor-pointer rounded-md p-2 text-on-surface-variant hover:bg-surface-sunken lg:hidden"
            aria-label="Buka menu"
          >
            <IconLayoutSidebarLeftExpand size={18} />
          </button>
          <button
            type="button"
            onClick={() => setCollapsed((value) => !value)}
            className="hidden cursor-pointer rounded-md p-2 text-on-surface-variant hover:bg-surface-sunken lg:inline-flex"
            aria-label={collapsed ? "Perluas sidebar" : "Perkecil sidebar"}
          >
            {collapsed ? (
              <IconLayoutSidebarLeftExpand size={18} />
            ) : (
              <IconLayoutSidebarLeftCollapse size={18} />
            )}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <Badge status={user.role} dot={false} />
            <button
              type="button"
              onClick={toggle}
              className="cursor-pointer rounded-md p-2 text-on-surface-variant hover:bg-surface-sunken"
              aria-label="Ganti tema"
            >
              {theme === "dark" ? <IconSun size={17} /> : <IconMoon size={17} />}
            </button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 md:px-6 md:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
