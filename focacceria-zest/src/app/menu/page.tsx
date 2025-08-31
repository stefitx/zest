import MenuClient from "./MenuClient";
import menu from "../../data/menu.json";

export const metadata = {
  title: "Meniu | Focacceria Zest",
  description: "Meniu focaccia, pinsa & pizza"
};

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

export default function Page() {
  const categories = (menu as { categories: Category[] }).categories;
  return <MenuClient categories={categories} />;
}
