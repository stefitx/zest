'use client';

import Image from "next/image";
import { useState } from "react";

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

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

function totalGrams(it: Item, size: "small" | "large") {
  const direct = size === "small" ? it.grams_small : it.grams_large;
  if (typeof direct === "number") return direct;
  if (!it.ingredients) return undefined;
  const sum = it.ingredients.reduce(
    (acc, ing) => acc + (size === "small" ? (ing.grams_small ?? 0) : (ing.grams_large ?? 0)), 0
  );
  return sum || undefined;
}

function PriceLine({ it }: { it: Item }) {
  const ps = it.price_small ? `${it.price_small} lei` : undefined;
  const pl = it.price_large ? `${it.price_large} lei` : undefined;
  const gs = totalGrams(it, "small");
  const gl = totalGrams(it, "large");
  const left  = ps ? `${ps}${gs ? ` (${gs} g)` : ""}` : undefined;
  const right = pl ? `${pl}${gl ? ` (${gl} g)` : ""}` : undefined;

  return (
    <div className="text-right text-sm tabular-nums sm:whitespace-nowrap whitespace-normal">
      {[left, right].filter(Boolean).join(" / ")}
    </div>
  );
}

function IngredientTable({ it }: { it: Item }) {
  if (!it.ingredients && !it.options) return null;
  return (
    <div className="mt-3 rounded-xl bg-gray-50 p-3">
      {it.ingredients && it.ingredients.length > 0 && (
        <div className="overflow-x-auto">
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
        </div>
      )}
      {it.options && (
        <div className="mt-3 text-sm">
          <div className="mb-1 font-medium">
            Opțiuni:{" "}
            {it.options.choose
              ? `alege ${it.options.choose}`
              : `alege ${it.options.choose_min ?? 1}–${it.options.choose_max ?? it.options.from.length}`}
          </div>
          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2 list-none p-0 m-0">
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

function ItemCard({ it }: { it: Item }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="list-none rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow">
      <button
        className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {it.image ? (
          <Image src={it.image} alt={it.name} width={96} height={96}
                 className="h-24 w-24 rounded-xl object-cover ring-1 ring-black/5" />
        ) : (
          <div className="h-24 w-24 rounded-xl bg-gray-100" />
        )}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-medium">{it.name}</h3>
            {it.tags?.includes("veg") && <span className="rounded border px-2 py-0.5 text-xs">veg</span>}
          </div>
          {it.desc && <p className="text-sm text-gray-600">{it.desc}</p>}
        </div>

        <PriceLine it={it} />
      </button>

      <div className={cx("grid transition-all duration-300 ease-in-out",
                         open ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <IngredientTable it={it} />
        </div>
      </div>
    </li>
  );
}

export default function MenuClient({ categories }: { categories: Category[] }) {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-3xl font-semibold">Meniu</h1>
      <div className="space-y-10">
        {categories.map((cat) => (
          <section key={cat.name}>
            <h2 className="mb-3 text-xl font-semibold">{cat.name}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 p-0 m-0">
              {cat.items.map((it) => <ItemCard key={it.name} it={it} />)}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-10 text-xs text-gray-500">Prețurile pot varia. Întreabă de ofertele zilei.</p>
    </main>
  );
}
