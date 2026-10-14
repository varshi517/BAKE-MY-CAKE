import React from "react";

export default function OrderSuccess({ continueShopping }: { continueShopping: () => void }) {
  return (
<div className="app">
    <div className="order-success-page">
      <div className="success-decoration">
        🍰 ✨ 🧁 ✨ 🍓
      </div>

      <div className="success-icon">
        ✓
      </div>

      <p className="small-heading">
        ORDER RECEIVED
      </p>

      <h1>
        Thank you for choosing
        <span> Bake Palace!</span>
      </h1>

      <p className="success-text">
        Your sweet order has been placed successfully.
        Our bakers are getting everything ready with
        lots of love.
      </p>

      <div className="order-number">
        <span>Order Number</span>
        <strong>
          BP-{Math.floor(10000 + Math.random() * 90000)}
        </strong>
      </div>

      <div className="success-details">
        <div>
          <span>📦</span>
          <strong>Order Confirmed</strong>
        </div>

        <div>
          <span>👩‍🍳</span>
          <strong>Going to the Bakers</strong>
        </div>

        <div>
          <span>💝</span>
          <strong>Made With Love</strong>
        </div>
      </div>

      <button
        className="primary-button"
        onClick={continueShopping}
      >
        Continue Exploring ✨
      </button>
    </div>
  </div>
);
}
