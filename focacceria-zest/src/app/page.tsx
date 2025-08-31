import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <section className="rounded-2xl border bg-gradient-to-b from-neutral-50 to-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold">
          Focaccia & Pinsa artizanală în Craiova
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Crocantă la exterior, pufoasă la interior. Zilnic, pe Dezrobirii 178.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/menu" className="rounded-xl bg-black px-5 py-3 text-white">
            Vezi Meniul
          </Link>
          <a href="tel:+40XXXXXXXXX" className="rounded-xl border px-5 py-3">Sună acum</a>
          <a href="https://maps.google.com/?q=Strada+Dezrobirii+178+Craiova" className="rounded-xl border px-5 py-3">
            Direcții
          </a>
        </div>
      </section>
    </main>
  );
}
