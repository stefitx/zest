import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400","500","600","700"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className={`${sora.className} min-h-screen`}>
        <header className="border-b">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Focacceria Zest" width={32} height={32} className="rounded-md object-contain" />
              <span className="font-semibold">Focacceria Zest</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm">
              <Link href="/menu" className="hover:underline">Meniu</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-16 border-t">
          <div className="mx-auto max-w-6xl p-4 text-sm text-gray-600">
            Str. Dezrobirii 178, Craiova • <a href="tel:+40XXXXXXXXX" className="underline">+40 XXX XXX XXX</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
