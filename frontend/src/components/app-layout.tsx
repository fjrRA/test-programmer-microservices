import type {
  ComponentType,
} from "react";

import {
  CircleDollarSign,
  LayoutDashboard,
  LogOut,
  Package,
  ReceiptText,
  ShoppingCart,
  Users,
} from "lucide-react";

import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../auth/use-auth";

type NavigationItem = {
  label: string;
  path: string;

  icon: ComponentType<{
    size?: number;
    className?: string;
  }>;
};

export function AppLayout() {
  const {
    session,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  if (!session) {
    return null;
  }

  const navigationItems:
    NavigationItem[] = [
      {
        label: "Dashboard",
        path: "/app",
        icon: LayoutDashboard,
      },
      {
        label: "Data Produk",
        path: "/app/products",
        icon: Package,
      },
    ];

  if (
    session.user.role === "ADMIN"
  ) {
    navigationItems.push(
      {
        label: "Data Users",
        path: "/app/users",
        icon: Users,
      },
      {
        label: "Pembayaran",
        path: "/app/payments",
        icon: CircleDollarSign,
      },
    );
  }

  if (
    session.user.role ===
    "PEMBELI"
  ) {
    navigationItems.push(
      {
        label: "Keranjang",
        path: "/app/cart",
        icon: ShoppingCart,
      },
      {
        label: "Riwayat",
        path: "/app/transactions",
        icon: ReceiptText,
      },
    );
  }

  function handleLogout(): void {
    logout();

    navigate(
      "/login",
      {
        replace: true,
      },
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="sticky top-0 flex h-screen w-20 shrink-0 flex-col bg-[#123d78] px-3 py-5 text-white shadow-xl lg:w-64 lg:px-4">
        <div className="flex items-center justify-center gap-3 border-b border-white/15 pb-5 lg:justify-start lg:px-2">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white font-black text-[#123d78]">
            MS
          </div>

          <div className="hidden lg:block">
            <p className="font-bold">
              Microservices
            </p>

            <p className="text-xs text-blue-200">
              Management System
            </p>
          </div>
        </div>

        <nav className="mt-6 space-y-2">
          {navigationItems.map(
            (item) => {
              const Icon =
                item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={
                    item.path ===
                    "/app"
                  }
                  title={item.label}
                  className={({
                    isActive,
                  }) =>
                    [
                      "flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition lg:justify-start",
                      isActive
                        ? "bg-white text-[#123d78] shadow-md"
                        : "text-blue-100 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon
                    size={20}
                    className="shrink-0"
                  />

                  <span className="hidden lg:inline">
                    {item.label}
                  </span>
                </NavLink>
              );
            },
          )}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          title="Keluar"
          className="mt-auto flex items-center justify-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-blue-100 transition hover:bg-red-500/20 hover:text-white lg:justify-start"
        >
          <LogOut
            size={20}
            className="shrink-0"
          />

          <span className="hidden lg:inline">
            Keluar
          </span>
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-5 shadow-sm sm:px-7 lg:px-9">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-slate-400 sm:text-xs">
              MANAGEMENT SYSTEM
            </p>

            <p className="mt-1 text-sm font-bold text-slate-800 sm:text-base">
              Fullstack Microservices
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-slate-800">
                {session.user.name}
              </p>

              <p className="text-xs text-slate-500">
                {session.user.email}
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-3 py-1.5 text-[10px] font-bold tracking-wide text-[#174f97] sm:text-xs">
              {session.user.role}
            </span>
          </div>
        </header>

        <main className="p-5 sm:p-7 lg:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
}