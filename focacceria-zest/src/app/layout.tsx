import Image from "next/image";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2">
              {/* Fallback to text if logo missing */}
              <div className="relative h-8 w-8 overflow-hidden">
                <Image src="/logo.svg" alt="Focacceria Zest" fill className="object-contain" />
              </div>
              <span className="font-semibold">Focacceria Zest</span>
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/menu" className="hover:underline">Meniu</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              {/* Delivery links */}
              <a href="https://glovoapp.com/ro/" target="_blank" className="rounded-full border px-3 py-1">Glovo</a>
              <a href="https://wolt.com/" target="_blank" className="rounded-full border px-3 py-1">Wolt</a>
              <a href="https://bolt.eu/ro-ro/food/" target="_blank" className="rounded-full border px-3 py-1">Bolt Food</a>
            </div>
          </nav>
        </header>

        {children}

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-4 text-sm text-gray-600">
            Str. Dezrobirii 178, Craiova • <a href="tel:+40XXXXXXXXX">+40 XXX XXX XXX</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
