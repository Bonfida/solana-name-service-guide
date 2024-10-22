import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[1fr_20px] items-center justify-items-center py-12">
      <main className="row-start-1 flex w-[480px] flex-col items-center justify-center gap-y-6">
        <a
          className="w-60 rounded-full border border-white px-4 py-3 text-center"
          href="/account-lookup"
        >
          Account Lookup
        </a>
        <a
          className="w-60 rounded-full border border-white px-4 py-3 text-center"
          href="/domain-lookup"
        >
          Domain Lookup
        </a>
      </main>
      <Footer />
    </div>
  );
}
