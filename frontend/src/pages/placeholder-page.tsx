import {
  Construction,
} from "lucide-react";

type PlaceholderPageProps = {
  title: string;
  description: string;
};

export function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-7">
        <p className="text-xs font-bold tracking-[0.2em] text-[#174f97]">
          MANAGEMENT
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-blue-100 text-[#174f97]">
            <Construction size={27} />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            Halaman dalam proses
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Fitur dan data untuk halaman
            ini akan ditambahkan pada
            tahap frontend berikutnya.
          </p>
        </div>
      </article>
    </section>
  );
}