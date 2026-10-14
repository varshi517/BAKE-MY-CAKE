export type Treat = {
  id: number;
  name: string;
  type: "Cake" | "Cookie" | "Brownie";
  price: number;
  eggless: boolean;
  dietaryTags: string[];
  description: string;
  image: string;
  rating?: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  custom?: boolean;
};

export type BakerySpecial = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
};

export const bakerySpecials: BakerySpecial[] = [
  { id: 101, name: "Veg Pizza", category: "Savoury Bites", description: "Fresh vegetable pizza with a cheesy baked crust.", price: 199, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80" },
  { id: 102, name: "Veg Burger", category: "Quick Bites", description: "Crispy vegetable patty with fresh salad and sauces.", price: 149, image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80" },
  { id: 103, name: "Veg Sandwich", category: "Quick Bites", description: "Toasted sandwich packed with fresh vegetables and cheese.", price: 129, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=700&q=80" },
  { id: 104, name: "Veg Puff", category: "Savoury Bites", description: "Golden flaky puff filled with seasoned vegetables.", price: 79, image: "https://polarpuffs-cakes.com/image/cache/catalog/products/pastries/ae2d13eb06e40c2e4d9b2b1d75a2605f-500x500.jpg" },
  { id: 105, name: "Chocolate Pastry", category: "Pastries", description: "Soft chocolate pastry layered with smooth cream.", price: 99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80" },
  {  id: 106,name: "Dil Pasand",category: "Bakery Favourites",description: "A traditional bakery favourite with a sweet coconut and tutti-frutti filling.",price: 69,image: "https://pushmycart.in/cdn/shop/files/img-6897.jpg?v=1726814127&width=1946"},
  { id: 107, name: "Cream Roll", category: "Rolls & Wraps", description: "Crispy pastry roll filled with creamy vanilla filling.", price: 59, image: "https://www.flurys.com/cdn/shop/products/Cream_roll_m_web.jpg?v=1770298448&width=1024" },
  { id: 108, name: "Cream Bun", category: "Bakery Favourites", description: "Soft bakery bun filled with sweet creamy goodness.", price: 49, image: "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy%2Cf_auto%2Cq_auto/ctxnydh9znqjetnu7ugx" },
  { id: 109, name: "Custom Chocolates Box", category: "Chocolates", description: "A beautiful assortment of chocolates prepared as a sweet gift box.", price: 299, image: "https://shopcdnpro.grainajz.com/category/31388/4528/8d40fe191f8a1d085bf5ef85c665496d/chocolate-box-7.jpg" },
  { id: 110, name: "Spring Roll", category: "Rolls & Wraps", description: "Crispy vegetable spring rolls baked fresh for a tasty bite.", price: 99, image: "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/vegetable_loempia.jpg" }
];

export const treatPrices: Record<string, number> = {
  Cake: 699,
  Cookie: 299,
  Brownie: 249,
};

export const flavorPrices: Record<string, number> = {
  Chocolate: 50,
  Vanilla: 40,
  Strawberry: 60,
  Butterscotch: 55,
};

export const fillingPrices: Record<string, number> = {
  "Chocolate Cream": 70,
  "Strawberry Cream": 80,
  "Vanilla Cream": 60,
  "No Filling": 0,
};

export const toppingPrices: Record<string, number> = {
  Strawberries: 60,
  Cherries: 50,
  Sprinkles: 30,
  "Chocolate Drizzle": 45,
  "Cookie Crumbs": 40,
};

export const decorationPrices: Record<string, number> = {
  "Simple & Elegant": 0,
  "Birthday Style": 80,
  "Celebration Style": 100,
  "Premium Decoration": 150,
};
