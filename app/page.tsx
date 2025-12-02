import Counters from "@/components/widgets/Counter";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center gap-12 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-wine dark:text-zinc-50">
            Ulliverset
          </h1>
          <p className="max-w-md text-lg leading-8 dark:text-zinc-400">
            Få (f)ull overstrikkt 🧶
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <Counters />
        </div>
      </main>
    </div>
  );
}
