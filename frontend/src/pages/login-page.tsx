import {
  useState,
} from "react";

import type {
  FormEvent,
} from "react";

import {
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  LockKeyhole,
  Network,
} from "lucide-react";

import {
  useAuth,
} from "../auth/use-auth";

import {
  ApiError,
} from "../lib/api-client";

export function LoginPage() {
  const {
    session,
    login,
  } = useAuth();

  const navigate =
    useNavigate();

  const [
    email,
    setEmail,
  ] = useState(
    "admin@example.com",
  );

  const [
    password,
    setPassword,
  ] = useState(
    "Admin123!",
  );

  const [
    error,
    setError,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  if (session) {
    return (
      <Navigate
        to="/app"
        replace
      />
    );
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email,
        password,
      });

      navigate(
        "/app",
        {
          replace: true,
        },
      );
    } catch (caughtError) {
      if (
        caughtError instanceof
        ApiError
      ) {
        setError(
          caughtError.message,
        );
      } else {
        setError(
          "Terjadi kesalahan saat login.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-slate-100 lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-[#123d78] px-14 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/5" />

        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-black/10" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[#123d78] shadow-lg">
            <Network size={26} />
          </div>

          <div>
            <p className="text-lg font-bold">
              Microservices System
            </p>

            <p className="text-sm text-blue-200">
              Fullstack Developer Test
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-xs font-bold tracking-[0.28em] text-blue-200">
            MANAGEMENT PLATFORM
          </p>

          <h1 className="text-5xl font-bold leading-tight xl:text-6xl">
            Kelola sistem melalui satu
            API Gateway.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-blue-100">
            Authentication, RBAC, data
            master, dan transaksi
            dijalankan melalui layanan
            microservice yang terpisah.
          </p>
        </div>

        <p className="relative z-10 text-sm text-blue-200">
          React · TypeScript · Tailwind
          CSS
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-300/40 sm:p-10"
        >
          <div className="mb-8">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-[#174f97] text-white shadow-md">
              <LockKeyhole size={23} />
            </div>

            <p className="text-xs font-bold tracking-[0.2em] text-[#174f97]">
              ACCOUNT ACCESS
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Login
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Masukkan email dan
              password akun yang telah
              terdaftar.
            </p>
          </div>

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </span>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value,
                  )
                }
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#174f97] focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </span>

              <input
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value,
                  )
                }
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#174f97] focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex w-full items-center justify-center rounded-lg bg-[#174f97] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#123f7a] focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Memproses..."
              : "Masuk"}
          </button>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
              Akun pengujian
            </p>

            <div className="space-y-2 rounded-lg bg-slate-50 p-4 text-xs leading-5 text-slate-600">
              <p>
                <strong className="text-slate-800">
                  ADMIN:
                </strong>{" "}
                admin@example.com
              </p>

              <p>
                <strong className="text-slate-800">
                  PEMBELI:
                </strong>{" "}
                buyer@example.com
              </p>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}