import React from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Treat, CartItem, BakerySpecial } from "./bakeryData";


const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=700&q=80";

export type WhatsBakingProps = {
  bakingCategory: string; setBakingCategory: Dispatch<SetStateAction<string>>;
  filteredBakerySpecials: BakerySpecial[]; favorites: number[];
  toggleFavorite: (id: number) => void; addBakerySpecialToCart: (item: BakerySpecial) => void;
};

export default function WhatsBaking(props: WhatsBakingProps) {
  const { bakingCategory, setBakingCategory, filteredBakerySpecials, favorites, toggleFavorite, addBakerySpecialToCart } = props;
  return (
<section className="whats-baking-section" id="whats-baking">
  <div className="baking-heading">
    <p>BEYOND THE SWEET CLASSICS</p>
    <h2>What’s Baking</h2>
    <span>From savoury bites to sweet delights — there’s always something fresh and delicious!</span>
  </div>

  <div className="baking-categories">
    {["All", "Savoury Bites", "Quick Bites", "Rolls & Wraps", "Bakery Favourites", "Pastries", "Chocolates"].map((category) => (
      <button
        key={category}
        className={bakingCategory === category ? "active-baking-category" : ""}
        onClick={() => setBakingCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>

  <div className="baking-grid">
    {filteredBakerySpecials.map((item) => (
      <div className="baking-card" key={item.id}>
        <div className="baking-image">
          <img
            src={item.image}
            alt={item.name}
            onError={(event) => { event.currentTarget.src = PLACEHOLDER_IMAGE; }}
          />
          <button
            className={favorites.includes(item.id) ? "favorite-button favorite-active" : "favorite-button"}
            onClick={() => toggleFavorite(item.id)}
            aria-label={`Toggle ${item.name} in My Picks`}
          >
            {favorites.includes(item.id) ? "♥" : "♡"}
          </button>
        </div>
        <div className="baking-info">
          <span className="baking-category">{item.category}</span>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="baking-bottom">
            <strong>₹{item.price}</strong>
            <button className="add-button" onClick={() => addBakerySpecialToCart(item)}>+ Add</button>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>


  );
}
