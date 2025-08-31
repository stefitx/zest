export const metadata = { title: "Contact | Focacceria Zest" };

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-3xl font-semibold">Contact</h1>
      <p>Str. Dezrobirii 178, Craiova</p>
      <p className="mb-6">
        <a className="underline" href="tel:+40XXXXXXXXX">+40 XXX XXX XXX</a>
      </p>

      <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border">
        <iframe
          title="Hartă"
          src="https://www.google.com/maps?q=Strada+Dezrobirii+178+Craiova&output=embed"
          className="h-full w-full"
          loading="lazy"
        />
      </div>
    </main>
  );
}
