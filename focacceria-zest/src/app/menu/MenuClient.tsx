'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

/* ---------- Types ---------- */
type Ingredient = { name: string; grams_small?: number; grams_large?: number };
type Item = {
  name: string;
  desc?: string;
  price_small?: string;
  price_large?: string;
  grams_small?: number;
  grams_large?: number;
  tags?: string[];
  image?: string;
  ingredients?: Ingredient[];
  options?: { choose?: number; choose_min?: number; choose_max?: number; from: Ingredient[] };
};
type Category = { name: string; items: Item[] };

/* ---------- Utils ---------- */
function cx(...c: (string | false | undefined)[]) { return c.filter(Boolean).join(" "); }
function useMediaQuery(q: string) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mm = window.matchMedia(q);
    const on = () => setM(mm.matches);
    on(); mm.addEventListener("change", on);
    return () => mm.removeEventListener("change", on);
  }, [q]);
  return m;
}

/* ---------- Shared Bits ---------- */
function Price({ it, compact = false }: { it: Item; compact?: boolean }) {
  if (it.price_small && it.price_large) {
    return (
      <div className={cx("text-right shrink-0 tabular-nums", compact ? "text-sm" : "")}>
        <div className="font-semibold whitespace-nowrap">Mic {it.price_small} lei</div>
        <div className="text-gray-500 whitespace-nowrap">{compact ? "" : "Mare "}{it.price_large} lei</div>
      </div>
    );
  }
  if (it.price_small) return <div className="font-semibold whitespace-nowrap tabular-nums">{it.price_small} lei</div>;
  return null;
}

function IngredientTable({ it }: { it: Item }) {
  if (!it.ingredients && !it.options) return null;
  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      {it.ingredients && it.ingredients.length > 0 && (
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="py-1 text-left font-medium">Ingredient</th>
              <th className="py-1 text-right font-medium">Mic</th>
              <th className="py-1 text-right font-medium">Mare</th>
            </tr>
          </thead>
          <tbody>
            {it.ingredients.map((ing) => (
              <tr key={ing.name} className="border-t">
                <td className="py-1">{ing.name}</td>
                <td className="py-1 text-right">{ing.grams_small ?? "–"}{ing.grams_small ? " g" : ""}</td>
                <td className="py-1 text-right">{ing.grams_large ?? "–"}{ing.grams_large ? " g" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {it.options && (
        <div className="mt-3 text-sm">
          <div className="mb-1 font-medium">
            Opțiuni:{" "}
            {it.options.choose
              ? `alege ${it.options.choose}`
              : `alege ${it.options.choose_min ?? 1}–${it.options.choose_max ?? it.options.from.length}`}
          </div>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {it.options.from.map((opt) => (
              <li key={opt.name} className="flex justify-between border rounded-lg bg-white px-2 py-1">
                <span>{opt.name}</span>
                <span className="text-gray-500">
                  {opt.grams_small ?? "–"}{opt.grams_small ? " g" : ""} / {opt.grams_large ?? "–"}{opt.grams_large ? " g" : ""}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Cards Variant ---------- */
function ItemCard({ it }: { it: Item }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(isDesktop); }, [isDesktop]);

  return (
    <li className="rounded-2xl border p-3 shadow-[0_1px_0_rgba(0,0,0,0.05)] hover:shadow-md transition bg-white">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-4">
        {/* image */}
        {it.image ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-xl ring-1 ring-black/5">
            <Image src={it.image} alt={it.name} fill sizes="96px" className="object-cover" />
          </div>
        ) : (
          <div className="h-24 w-24 rounded-xl bg-gray-100" />
        )}

        {/* text */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{it.name}</h3>
            {it.tags?.includes("veg") && <span className="rounded border px-2 py-0.5 text-xs">veg</span>}
          </div>
          {(it.grams_small || it.grams_large) && (
            <p className="mt-0.5 text-xs text-gray-500">
              {it.grams_small ? `${it.grams_small} g` : ""}{it.grams_small && it.grams_large ? " / " : ""}
              {it.grams_large ? `${it.grams_large} g` : ""}
            </p>
          )}
          <div className={cx("grid transition-all duration-300 ease-in-out",
                            open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0")}>
            <div className="overflow-hidden">
              <IngredientTable it={it} />
            </div>
          </div>
          <div className="mt-2 sm:hidden">
            <button onClick={() => setOpen((v) => !v)} className="text-sm underline underline-offset-2">
              {open ? "Ascunde detalii" : "Vezi ingrediente & grame"}
            </button>
          </div>
        </div>

        {/* price (never overflows) */}
        <Price it={it} />
      </div>
    </li>
  );
}

/* ---------- Compact Variant ---------- */
function ItemRow({ it }: { it: Item }) {
  return (
    <li className="rounded-xl border px-3 py-2 bg-white">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-start">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="truncate">{it.name}</span>
            {it.tags?.includes("veg") && <span className="rounded border px-1.5 py-0.5 text-[10px]">veg</span>}
          </div>
          {(it.grams_small || it.grams_large) && (
            <p className="text-xs text-gray-500">
              {it.grams_small ? `${it.grams_small} g` : ""}{it.grams_small && it.grams_large ? " / " : ""}
              {it.grams_large ? `${it.grams_large} g` : ""}
            </p>
          )}
        </div>
        <Price it={it} compact />
      </div>
    </li>
  );
}

/* ---------- Page ---------- */
export default function MenuClient({ categories }: { categories: Category[] }) {
  const nav = useMemo(
    () => categories.map((c) => ({ id: c.name.toLowerCase().replace(/\s+/g, "-"), label: c.name })),
    [categories]
  );

  const [view, setView] = useState<"cards" | "compact">("cards");

  return (
    <main className="mx-auto max-w-6xl p-6" id="top">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Meniu</h1>

        {/* View toggle */}
        <div className="flex items-center gap-2 rounded-full border p-1">
          <button
            onClick={() => setView("cards")}
            className={cx("rounded-full px-3 py-1 text-sm", view === "cards" && "bg-black text-white")}
          >Carduri</button>
          <button
            onClick={() => setView("compact")}
            className={cx("rounded-full px-3 py-1 text-sm", view === "compact" && "bg-black text-white")}
          >Compact</button>
        </div>
      </div>

      {/* sticky category nav + delivery buttons */}
      <div className="sticky top-[64px] z-10 -mx-6 mt-4 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-3 py-2">
            <ul className="flex gap-2 overflow-x-auto">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="whitespace-nowrap rounded-full border px-3 py-1 text-sm hover:bg-gray-50">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <a href="https://glovoapp.com/ro/" target="_blank" className="rounded-full border px-3 py-1 text-sm">Glovo</a>
              <a href="https://wolt.com/" target="_blank" className="rounded-full border px-3 py-1 text-sm">Wolt</a>
              <a href="https://bolt.eu/ro-ro/food/" target="_blank" className="rounded-full border px-3 py-1 text-sm">Bolt Food</a>
            </div>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="mt-4 space-y-10">
        {categories.map((cat) => {
          const id = cat.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <section key={cat.name} id={id}>
              <h2 className="mb-3 text-xl font-semibold">{cat.name}</h2>
              {view === "cards" ? (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((it) => <ItemCard key={it.name} it={it} />)}
                </ul>
              ) : (
                <ul className="grid gap-2">
                  {cat.items.map((it) => <ItemRow key={it.name} it={it} />)}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <div className="mt-10 text-xs text-gray-500">Prețurile pot varia. Întreabă de ofertele zilei.</div>

      <div className="fixed bottom-5 right-5">
        <a href="#top" className="rounded-full bg-black px-3 py-2 text-white text-sm shadow-lg">↑ Sus</a>
      </div>
    </main>
  );
}
