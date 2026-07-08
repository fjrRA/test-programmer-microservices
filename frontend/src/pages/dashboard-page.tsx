import {
  Database,
  KeyRound,
  Network,
  Server,
} from "lucide-react";

import {
  useAuth,
} from "../auth/use-auth";

export function DashboardPage() {
  const {
    session,
  } = useAuth();

  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-7">
        <p className="text-xs font-bold tracking-[0.2em] text-[#174f97]">
          OVERVIEW
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Ringkasan arsitektur dan
          status sistem microservices.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-[#174f97] text-white">
            <KeyRound size={21} />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Login sebagai
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {session?.user.role}
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-[#174f97] text-white">
            <Server size={21} />
          </div>

          <p className="text-sm font-medium text-slate-500">
            API Gateway
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            Port 3000
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:col-span-2 xl:col-span-1">
          <div className="mb-5 grid h-11 w-11 place-items-center rounded-lg bg-[#174f97] text-white">
            <Database size={21} />
          </div>

          <p className="text-sm font-medium text-slate-500">
            Backend Services
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            4 Services
          </p>
        </article>
      </div>

      <article className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
        <div className="flex items-start gap-4">
          <div className="hidden h-11 w-11 shrink-0 place-items-center rounded-lg bg-blue-100 text-[#174f97] sm:grid">
            <Network size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Arsitektur Sistem
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Seluruh request frontend
              masuk melalui API Gateway
              sebelum diteruskan ke
              service terkait.
            </p>
          </div>
        </div>

        <div className="mt-7 overflow-x-auto">
          <div className="flex min-w-max items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-800">
              React Frontend
            </div>

            <span className="font-bold text-[#174f97]">
              →
            </span>

            <div className="rounded-lg border border-blue-200 bg-blue-50 px-5 py-4 text-sm font-bold text-[#174f97]">
              API Gateway
            </div>

            <span className="font-bold text-[#174f97]">
              →
            </span>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-800">
              Microservices
            </div>

            <span className="font-bold text-[#174f97]">
              →
            </span>

            <div className="rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-bold text-slate-800">
              Databases
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}