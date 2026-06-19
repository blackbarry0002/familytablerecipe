import pasta from "@/assets/recipe-pasta.jpg";
import salad from "@/assets/recipe-salad.jpg";
import pancakes from "@/assets/recipe-pancakes.jpg";
import dessert from "@/assets/recipe-dessert.jpg";
import bowl from "@/assets/recipe-bowl.jpg";
import chicken from "@/assets/recipe-chicken.jpg";
import toast from "@/assets/recipe-toast.jpg";
import bread from "@/assets/recipe-bread.jpg";
import risotto from "@/assets/recipe-risotto.jpg";

export interface Recipe {
  slug: string;
  title: string;
  image: string;
  time: string;
  rating: number;
  category: string;
  saves?: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  story: string;
  ingredients: string[];
  steps: string[];
  tips?: string[];
  nutrition?: { label: string; value: string }[];
}

const base = (
  slug: string,
  title: string,
  image: string,
  time: string,
  rating: number,
  category: string,
  saves: string,
  extra: Partial<Recipe>,
): Recipe => ({
  slug,
  title,
  image,
  time,
  rating,
  category,
  saves,
  servings: 4,
  difficulty: "Easy",
  description: "A warm, family-favorite recipe with simple ingredients and a beautiful presentation.",
  story:
    "This is the kind of dish that turns a regular evening into something memorable — slow, simple, and made to share.",
  ingredients: [
    "Fresh seasonal produce",
    "Cold-pressed olive oil",
    "Sea salt & cracked black pepper",
    "Garlic, finely chopped",
    "A handful of fresh herbs",
  ],
  steps: [
    "Prep your ingredients and bring everything to room temperature.",
    "Warm a heavy pan with olive oil over medium heat.",
    "Cook the aromatics until fragrant, about 2 minutes.",
    "Add the main ingredients and simmer until tender and glossy.",
    "Finish with herbs, a squeeze of lemon, and serve warm at the table.",
  ],
  tips: ["Use the best quality olive oil you have.", "Salt in layers — it builds depth."],
  nutrition: [
    { label: "Calories", value: "420" },
    { label: "Protein", value: "18g" },
    { label: "Carbs", value: "38g" },
    { label: "Fat", value: "22g" },
  ],
  ...extra,
});

export const recipes: Recipe[] = [
  base("tomato-pappardelle", "Slow-Simmered Tomato Pappardelle", pasta, "35 min", 4.9, "Pasta", "1.2k", {
    difficulty: "Medium",
    description: "Hand-cut pappardelle bathed in a long-simmered San Marzano tomato sauce, finished with torn basil and Parmigiano.",
    story: "A pot of crushed San Marzanos, sweet onion, and a long, quiet simmer — the sauce that fills the house and calls everyone to the table a little earlier.",
    ingredients: [
      "400g fresh pappardelle",
      "800g San Marzano tomatoes, crushed",
      "1 large sweet yellow onion, finely diced",
      "4 garlic cloves, sliced",
      "60ml cold-pressed olive oil",
      "A small bunch of basil",
      "60g Parmigiano-Reggiano, grated",
      "Sea salt, cracked pepper",
    ],
    steps: [
      "Warm the olive oil in a heavy pot over medium heat. Cook the onion until soft and translucent, 8 minutes.",
      "Add the garlic and cook for 1 minute, just until fragrant.",
      "Pour in the tomatoes, season generously, and bring to a gentle simmer.",
      "Lower the heat and let the sauce quietly bubble for 25 minutes, stirring now and then.",
      "Cook the pappardelle in heavily salted water until just al dente, then transfer directly into the sauce with a splash of pasta water.",
      "Toss off heat with torn basil and most of the cheese. Plate, finish with more cheese and a thread of oil.",
    ],
  }),
  base("garden-feta-bowl", "Garden Feta & Avocado Bowl", salad, "15 min", 4.7, "Healthy", "860", {
    description: "Crisp cucumber, ripe avocado, herby feta and a bright lemon-olive oil dressing.",
  }),
  base("buttermilk-pancakes", "Buttermilk Berry Pancakes", pancakes, "25 min", 4.8, "Breakfast", "2.1k", {
    description: "Tall, fluffy buttermilk pancakes stacked with seasonal berries and a slow drizzle of maple.",
    ingredients: [
      "250g all-purpose flour",
      "2 tbsp sugar",
      "1 tsp baking soda",
      "1 tsp baking powder",
      "Pinch of salt",
      "350ml buttermilk",
      "2 eggs",
      "60g melted butter",
      "Mixed berries & maple syrup, to serve",
    ],
  }),
  base("chocolate-raspberry-cake", "Dark Chocolate Raspberry Cake", dessert, "1 hr", 4.9, "Desserts", "1.6k", {
    difficulty: "Medium",
    description: "Deep, fudgy chocolate layers with fresh raspberries and a silky ganache.",
  }),
  base("harvest-buddha-bowl", "Harvest Buddha Bowl", bowl, "30 min", 4.8, "Vegetarian", "740", {
    description: "Roasted squash, ancient grains, kale, and a creamy tahini drizzle.",
  }),
  base("lemon-herb-chicken", "Lemon Herb Roast Chicken", chicken, "1h 20", 4.9, "Dinner", "3.4k", {
    difficulty: "Medium",
    description: "A bronzed, herb-rubbed roast chicken with crispy skin and a bright lemon pan sauce.",
  }),
  base("avocado-egg-toast", "Soft Avocado Egg Toast", toast, "10 min", 4.6, "Breakfast", "520", {
    description: "Thick-cut sourdough, smashed avocado, jammy egg and chili flakes.",
  }),
  base("caprese-garden", "Heirloom Caprese Garden", salad, "12 min", 4.7, "Lunch", "410", {
    description: "Heirloom tomatoes, creamy mozzarella, fresh basil and aged balsamic.",
  }),
  base("family-pasta-night", "Family Style Pasta Night", pasta, "45 min", 4.8, "Family", "990", {
    description: "A generous platter pasta meant for the middle of the table.",
  }),
  base("artisan-sourdough", "Slow Artisan Sourdough", bread, "12 hr", 4.9, "Bread", "1.4k", {
    difficulty: "Hard",
    description: "A patient, golden-crust country loaf with an open, tender crumb.",
    story: "Bread is a quiet conversation between flour, water and time — set it in motion the night before, and let your kitchen do the rest.",
  }),
  base("mushroom-risotto", "Wild Mushroom Risotto", risotto, "40 min", 4.8, "Dinner", "1.1k", {
    difficulty: "Medium",
    description: "Creamy arborio with seared wild mushrooms, thyme and a snowfall of Parmigiano.",
  }),
];

export const recipeBySlug = (slug: string) => recipes.find((r) => r.slug === slug);

export const categories = [
  { name: "Breakfast", count: 48, blurb: "Slow weekend mornings start here.", image: pancakes },
  { name: "Lunch", count: 62, blurb: "Bright, quick midday plates.", image: toast },
  { name: "Dinner", count: 94, blurb: "Recipes worth lighting the candles for.", image: chicken },
  { name: "Desserts", count: 37, blurb: "A little something sweet after.", image: dessert },
  { name: "Healthy Meals", count: 56, blurb: "Nourishing, never boring.", image: bowl },
  { name: "Vegetarian", count: 41, blurb: "Plant-forward cooking, family approved.", image: salad },
  { name: "Bread", count: 18, blurb: "Slow loaves, warm crusts.", image: bread },
  { name: "Family Favorites", count: 73, blurb: "The ones everyone asks for again.", image: pasta },
];
