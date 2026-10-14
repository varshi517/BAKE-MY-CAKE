import { useEffect, useMemo, useState } from "react";
import type { Treat, CartItem, BakerySpecial } from "./bakeryData";
import {bakerySpecials,treatPrices,flavorPrices,fillingPrices,toppingPrices,decorationPrices,} from "./bakeryData";
import useFetch from "./useFetch";

export default function useBakeryState() {

  /* =========================
     CATALOG + REQUIRED FILTERS
  ========================= */

  const { data: catalogData, loading, error } =
    useFetch<Treat[]>("/treats.json");

  const treats = catalogData ?? [];

  const [selectedType, setSelectedType] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [showPicksOnly, setShowPicksOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");


  /* =========================
     FAVORITES
  ========================= */

  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem("bakePalaceFavorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  /* =========================
     CART
  ========================= */

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("bakePalaceCart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);


  /* =========================
     CREATE YOUR OWN
  ========================= */

  const [customTreat, setCustomTreat] = useState("Cake");
  const [customFlavor, setCustomFlavor] = useState("Chocolate");
  const [secondFlavor, setSecondFlavor] = useState("Strawberry");
  const [halfAndHalf, setHalfAndHalf] = useState(false);
  const [customFilling, setCustomFilling] = useState("Chocolate Cream");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [decoration, setDecoration] = useState("Simple & Elegant");
  const [personalMessage, setPersonalMessage] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");


  /* =========================
     WHAT'S BAKING
  ========================= */

  const [bakingCategory, setBakingCategory] = useState("All");

  const filteredBakerySpecials = bakerySpecials.filter((item) =>
    bakingCategory === "All" || item.category === bakingCategory
  );


  /* =========================
     LOCAL STORAGE
  ========================= */

  useEffect(() => {
    localStorage.setItem(
      "bakePalaceFavorites",
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      "bakePalaceCart",
      JSON.stringify(cart)
    );
  }, [cart]);


  /* =========================
     FILTER + SEARCH + SORT
  ========================= */

  const filteredTreats = useMemo(() => {
    const result = treats.filter((treat) => {

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        treat.name.toLowerCase().includes(search) ||
        treat.description.toLowerCase().includes(search);

      const matchesType =
        selectedType === "All" ||
        treat.type === selectedType;

      const matchesEggless =
        !egglessOnly || treat.eggless;

      const matchesPicks =
        !showPicksOnly ||
        favorites.includes(treat.id);

      return (
        matchesSearch &&
        matchesType &&
        matchesEggless &&
        matchesPicks
      );
    });

    if (sortOrder === "low") {
      return [...result].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOrder === "high") {
      return [...result].sort(
        (a, b) => b.price - a.price
      );
    }

    return result;
  }, [
    treats,
    searchTerm,
    selectedType,
    egglessOnly,
    showPicksOnly,
    favorites,
    sortOrder,
  ]);


  /* =========================
     INSIGHTS
  ========================= */

  // Normal treats selected in My Picks
  const pickedTreats = treats.filter((treat) =>
    favorites.includes(treat.id)
  );

  // What's Baking items selected in My Picks
  const pickedBakerySpecials = bakerySpecials.filter((item) =>
    favorites.includes(item.id)
  );

  // Total number of selected items
  const totalPickedItems =
    pickedTreats.length +
    pickedBakerySpecials.length;

  // Total price of all selected items
  const totalPickedPrice =
    pickedTreats.reduce(
      (sum, item) => sum + item.price,
      0
    ) +
    pickedBakerySpecials.reduce(
      (sum, item) => sum + item.price,
      0
    );

  // Average price of all selected items
  const averagePickPrice = totalPickedItems
    ? Math.round(
        totalPickedPrice / totalPickedItems
      )
    : 0;


  // Count normal treat types and bakery categories
  const typeCounts: Record<string, number> = {};

  pickedTreats.forEach((treat) => {
    typeCounts[treat.type] =
      (typeCounts[treat.type] || 0) + 1;
  });

  pickedBakerySpecials.forEach((item) => {
    typeCounts[item.category] =
      (typeCounts[item.category] || 0) + 1;
  });


  // Most picked type/category
  const mostPickedType = totalPickedItems
    ? Object.entries(typeCounts).sort(
        (a, b) => b[1] - a[1]
      )[0][0]
    : "—";


  // Total catalog = normal treats + What's Baking items
  const totalCount =
    treats.length +
    bakerySpecials.length;

  // Number of selected items
  const pickedCount =
    pickedTreats.length +
    pickedBakerySpecials.length;


  // Percentage of complete catalog saved
  const pickPercentage = totalCount
    ? Math.round(
        (pickedCount / totalCount) * 100
      )
    : 0;


  /* =========================
     MESSAGE
  ========================= */

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };


  /* =========================
     CART FUNCTIONS
  ========================= */

  const addToCart = (treat: Treat) => {

    setCart((currentCart) => {

      const existingItem = currentCart.find(
        (item) => item.id === treat.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === treat.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: treat.id,
          name: treat.name,
          price: treat.price,
          image: treat.image,
          quantity: 1,
        },
      ];
    });

    showMessage(
      `${treat.name} added to your Sweet Basket!`
    );
  };


  const increaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  const decreaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };


  const removeFromCart = (id: number) => {

    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    );

    showMessage(
      "Treat removed from your Sweet Basket."
    );
  };


  /* =========================
     FAVORITES
  ========================= */

  const toggleFavorite = (id: number) => {

    setFavorites((currentFavorites) => {

      if (currentFavorites.includes(id)) {

        showMessage(
          "Removed from My Picks."
        );

        return currentFavorites.filter(
          (favoriteId) => favoriteId !== id
        );
      }

      showMessage(
        "Added to My Picks! 💕"
      );

      return [
        ...currentFavorites,
        id,
      ];
    });
  };


  const resetFilters = () => {

    setSearchTerm("");
    setSelectedType("All");
    setEgglessOnly(false);
    setShowPicksOnly(false);
    setSortOrder("default");
  };


  /* =========================
     WHAT'S BAKING CART
  ========================= */

  const addBakerySpecialToCart = (
    item: BakerySpecial
  ) => {

    setCart((currentCart) => {

      const existingItem =
        currentCart.find(
          (cartItem) =>
            cartItem.id === item.id
        );

      if (existingItem) {

        return currentCart.map(
          (cartItem) =>
            cartItem.id === item.id
              ? {
                  ...cartItem,
                  quantity:
                    cartItem.quantity + 1,
                }
              : cartItem
        );
      }

      return [
        ...currentCart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
        },
      ];
    });

    showMessage(
      `${item.name} added to your Sweet Basket!`
    );
  };


  /* =========================
     CUSTOM BUILDER
  ========================= */

  const toggleTopping = (
    topping: string
  ) => {

    setSelectedToppings(
      (currentToppings) => {

        if (
          currentToppings.includes(topping)
        ) {

          return currentToppings.filter(
            (item) => item !== topping
          );
        }

        return [
          ...currentToppings,
          topping,
        ];
      }
    );
  };


  const customPrice =
    treatPrices[customTreat] +
    flavorPrices[customFlavor] +
    (
      halfAndHalf
        ? flavorPrices[secondFlavor]
        : 0
    ) +
    fillingPrices[customFilling] +
    selectedToppings.reduce(
      (total, topping) =>
        total +
        toppingPrices[topping],
      0
    ) +
    decorationPrices[decoration];


  const addCustomBakeToCart = () => {

    const customName = halfAndHalf
      ? `Custom ${customTreat} - ${customFlavor} + ${secondFlavor}`
      : `Custom ${customTreat} - ${customFlavor}`;

    const customId = Date.now();

    setCart((currentCart) => [

      ...currentCart,

      {
        id: customId,
        name: customName,
        price: customPrice,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
        quantity: 1,
        custom: true,
      },

    ]);

    showMessage(
      "Your custom creation was added to the Sweet Basket!"
    );
  };


  /* =========================
     CART TOTALS
  ========================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  const subtotal = cart.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );


  const deliveryFee =
    cart.length > 0
      ? 49
      : 0;


  const total =
    subtotal + deliveryFee;


  /* =========================
     PLACE ORDER
  ========================= */

  const placeOrder = () => {

    if (cart.length === 0) {

      showMessage(
        "Your Sweet Basket is empty. Add a treat first!"
      );

      return;
    }

    setOrderPlaced(true);
    setCart([]);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  const continueShopping = () => {

    setOrderPlaced(false);

    setTimeout(() => {

      document
        .getElementById("cakes")
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 100);
  };


  /* =========================
     RETURN ALL STATE + FUNCTIONS
  ========================= */

  return {

    treats,
    loading,
    error,

    selectedType,
    setSelectedType,

    searchTerm,
    setSearchTerm,

    egglessOnly,
    setEgglessOnly,

    showPicksOnly,
    setShowPicksOnly,

    sortOrder,
    setSortOrder,

    favorites,

    cart,

    message,

    orderPlaced,


    /* CREATE YOUR OWN */

    customTreat,
    setCustomTreat,

    customFlavor,
    setCustomFlavor,

    secondFlavor,
    setSecondFlavor,

    halfAndHalf,
    setHalfAndHalf,

    customFilling,
    setCustomFilling,

    selectedToppings,

    decoration,
    setDecoration,

    personalMessage,
    setPersonalMessage,

    specialInstructions,
    setSpecialInstructions,


    /* WHAT'S BAKING */

    bakerySpecials,

    bakingCategory,
    setBakingCategory,

    filteredBakerySpecials,

    filteredTreats,


    /* INSIGHTS */

    mostPickedType,
    averagePickPrice,
    pickedTreats,
    pickedCount,
    totalCount,
    pickPercentage,


    /* CUSTOM PRICE */

    customPrice,


    /* CART TOTALS */

    cartCount,
    subtotal,
    deliveryFee,
    total,


    /* FUNCTIONS */

    toggleFavorite,
    addToCart,
    resetFilters,

    addBakerySpecialToCart,

    toggleTopping,

    addCustomBakeToCart,

    increaseQuantity,
    decreaseQuantity,

    removeFromCart,

    placeOrder,
    continueShopping,
  };
}